---
title: Scripting concepts
description: How Tempest.Scripting represents game objects, resolves properties, hooks functions, schedules work on the game thread, and isolates mods.
---

# Concepts

## Objects and reflection

Every UnrealScript object is reachable from Lua as an **Object** proxy: a handle to the live
`UObject`. Properties resolve through the game's own reflection (`UClass` → `UProperty`), so
`pc.Pawn` looks up the `Pawn` property on the controller's class at runtime and reads the right
offset. Nothing about game classes is baked into the runtime, which is why it survives patches
that move fields around.

Reads give you Lua values for simple kinds and live proxies for compound ones:

| UnrealScript     | Lua                                                          |
| ---------------- | ------------------------------------------------------------ |
| `int`, `byte`    | integer                                                      |
| `float`          | number                                                       |
| `bool`           | boolean                                                      |
| `name`, `string` | string                                                       |
| object reference | Object proxy, or `nil` when none                             |
| `Vector`         | table `{ x, y, z }` (a copy)                                 |
| `Rotator`        | table `{ pitch, yaw, roll }` (a copy)                        |
| any other struct | [Struct](/lua/api/objects#struct) proxy (live) |
| `array<T>`       | [Array](/lua/api/objects#array) proxy (live)   |
| `Map{K, V}`      | [Map](/lua/api/objects#map) proxy (live)       |

Writes go the other way with the same rules. Names follow `FName` rules and compare
case-insensitively (`engine.MaxSmoothedFramerate` finds `MaxSmoothedFrameRate`). An unknown
property reads as `nil` and logs once; writing one raises a Lua error, so typos fail loudly.

Functions resolve the same way: `pc.ClientMessage` is a bound function and `pc:ClientMessage("hi")`
calls it. Script and native functions both work.

## Hooks

A hook attaches to a function by name:

```lua
tempest.before("TgGame.TgGame.PostLogin", function(game, params) ... end)
tempest.on("TgGame.TgGame.PostLogin", function(game, params) ... end)
```

`before` runs before the game's own code, `on` after it. Both receive the object the function ran
on and a **Params** proxy over the live argument frame. A `before` handler can change arguments
by assigning to `params`, and can `return false` to cancel the call entirely (set
`params.ReturnValue` first if the caller expects one). An `on` handler can read
`params.ReturnValue`.

The spec decides what matches:

- `"Package.Class.Func"` binds to that exact function and fires whenever its body runs, including
  inside a `Super` chain.
- `"Func"` matches any function with that name, on any class, and fires once per logical call
  (the outermost frame of a `Super` chain). Natives of that name are hooked one by one, and the
  runtime rescans for more as classes load.

Under the hood three entry points are hooked so that nothing is missed: `ProcessEvent` for
events the engine raises, `ProcessInternal` for every UnrealScript function body, and a per-function
replacement for natives. Calls made from Lua bypass the first but still reach the other two, so a
hooked native sees calls made with `obj:Func()` too. `out` parameters of every kind, strings and
arrays included, are written back to the caller's variables with assignment semantics.

Hooks also run the other way round: a mod's own UnrealScript package can declare bodiless
`dllimport` functions and have Lua implement them with
[`tempest.native`](./api/tempest#tempest-native-spec-fn-id), so script code calls into Lua like
any other function.

Engine code that is not a UnrealScript function has no name to hook by. For that there is
[`memory.hook(addr, fn)`](./api/memory#address-hooks): an inline detour on a raw address, with
the handler receiving the integer arguments and an `original` to call through. It is the escape
hatch for C++ internals (package loading, the network layer, a native's implementation) and
comes with fewer guarantees than the named hooks: no parameter names or types, no floats, and
the handler runs on whichever thread made the call.

## Threads

The game runs its logic on one thread, and scripts should touch game objects only from there.
Your scripts are loaded on it (the runtime queues them to the first event once the engine is up),
and hook handlers run on it. Code that starts elsewhere, such as the DLL's console REPL, is
queued and executes at the next event; `tempest.queue(fn)` does the same for your own code, and
`tempest.on_game_thread()` tells you where you are. Key bindings and console commands dispatch on
the game thread as well. The one exception is `memory.hook`: its handlers run on the thread that
called the hooked function, which is the game thread only when that function is.

## The UI frame

[`ui.on_draw`](/lua/api/ui) handlers are game-thread code too. Each frame the game
presents asks for one UI frame; the game thread builds it at its next engine event by running every
draw handler, and the render thread draws the finished result. So a draw handler may read
properties and call functions like any hook, and the render thread never runs Lua. The cost is one
frame of latency between a widget and the screen, which is invisible in practice.

## Mods and sandboxes

At startup the runtime finds every enabled mod next to its own and runs each one's `scripts/`
in a private environment. Globals a mod sets are invisible to other mods; reads fall through to
the API and the standard library. `MOD` holds the mod's id, and `require("a.b")` loads
`scripts/a/b.lua` from the same mod into the same sandbox; a name with no such file falls through
to the built-in modules, so `require("ffi")` and `require("bit")` work.

To share something, use the `shared` table or the explicit pair:

```lua
-- in mod "my-lib"
tempest.export("greet", function(pc) pc:ClientMessage("hi") end)

-- in another mod, any time later
local greet = tempest.import("greet")
```

Mods load alphabetically by id. A mod that needs another one loaded first says so in its
`manifest.toml`:

```toml
[scripting]
after = ["my-lib"]
```

Hooks, commands and key bindings remember which mod registered them. Errors in a handler are
logged with the mod's id, and `tempest.reload("my-lib")` drops only that mod's registrations
before running it again.

## Mod configuration

Each mod has one editable config file. For an installed mod it is
`<game>/ChaosGame/Config/mods/<mod-id>.toml`, next to the game's own `.ini` files; for a dev mod it
is the `config.toml` in the mod folder, so everything about a dev mod stays in one place.
`tempest.config(defaults)` returns it as a table: the defaults you pass, overridden by the mod's
`config.toml`, overridden (installed mods) by the user's file. The editable file is created from
the merged values the first time, so there is always something to edit, and saving it by hand
reloads the mod (`reload_on_config = false` in the settings turns that off). A save the mod makes
itself with `tempest.save_config` never triggers a reload, so a settings panel can write its
values freely.

```lua
local cfg = tempest.config({
  enabled = true,
  speed = 1.0,
  keys = { toggle = "Insert" },
})
tempest.on_key(cfg.keys.toggle, function() ... end)
```

`tempest.save_config(cfg)` writes changes back (from a settings panel, say).

## Memory ownership

Strings and arrays written from Lua are allocated with the engine's allocator, so the game can
free or grow them later. The runtime does not run a garbage collector for game objects: an object
you construct with `tempest.new` stays alive only while something in the game references it, so
assign it to a property right away. `memory.*` is the escape hatch for anything reflection does not
describe; it reads and writes raw addresses with no checks beyond page readability.
