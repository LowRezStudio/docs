---
title: tempest API reference
description: Reference for the tempest table in Tempest.Scripting. Hooks, calls, object lookup, construction, spawning, mods, and diagnostics.
---

# `tempest`

The main API table. Everything here is available to every mod. All functions that return objects
return `nil` when nothing was found.

## Status and logging

### `tempest.version`

The runtime version string.

### `tempest.log(msg)`

Writes a line to the log and the console window. `print(...)` does the same with its arguments
joined by tabs, prefixed with the mod id.

### `tempest.status()`

Returns a table describing what the runtime resolved:

| field                        | meaning                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| `gobjects`, `gnames`         | addresses of the object and name tables, `nil` if unresolved      |
| `gnames_ok`, `gobjects_ok`   | the live self-test passed (`GNames[0] == "None"`, objects decode) |
| `hook_installed`             | `ProcessEvent` is hooked                                          |
| `script_hook_installed`      | `ProcessInternal` is hooked                                       |
| `key_hook_installed`         | the window procedure is hooked                                    |
| `game_thread`                | id of the game thread once known                                  |
| `object_count`, `name_count` | current sizes of the two tables                                   |
| `notes`                      | list of strings explaining anything that failed                   |
| `subscriptions`              | map of hook id → `"[mod] before Spec"` strings                    |
| `native_hooks`               | full names of natives currently hooked                            |
| `address_hooks`              | `{ id, addr, mod }` entries, one per `memory.hook`                |
| `lua_natives`                | full names of the `dllimport` functions bound to Lua              |
| `mods`                       | ids of loaded mods                                                |
| `dev_mods`                   | ids of the mods loaded from the dev folder                        |

Other fields (`engine`, `process_event`, `process_internal`, `gmalloc`, `gnatives`, `xor_mask`,
`runtime_uc_flags`, `gpropaddr`) are addresses for debugging.

### `tempest.trace(spec, n)`

Logs the first `n` (default 5) firings of the event `spec` with the firing object and its
parameters, then unsubscribes. Returns the hook id. The fastest way to discover what an event
carries:

```lua
tempest.trace("PostRender", 3)
-- [lua] trace PostRender: Object(0x... TgGameViewportClient ...) Params(Canvas=Object(...))
```

## Hooks

### `tempest.on(spec, fn)` → id

Runs `fn(this, params)` **after** the function `spec` executed. `this` is the object it ran on;
`params` is a [Params](/tempest/scripting/api/objects#params) proxy, including `ReturnValue`.

### `tempest.before(spec, fn)` → id

Runs `fn(this, params)` **before** the function executes. Assign to `params` to change what the
game sees. Return `false` to skip the original call; set `params.ReturnValue` first if the caller
uses it. Any other return value lets the call proceed.

`spec` is either `"Package.Class.Func"` (that exact function) or `"Func"` (any class, once per
logical call). Both catch natives: a bare name hooks every native of that name on loaded classes
and keeps looking as new classes load. See [Concepts](/tempest/scripting/concepts#hooks) for the
matching rules.

Handlers run on the game thread. A Lua error inside one is logged with the mod id and never
reaches the game.

### `tempest.native(spec, fn)` → id

Implements an UnrealScript function of your own package in Lua. The package declares the
function without a body, as a `dllimport` function of a `DLLBind` class (UDK compiles this, no
C++ needed):

```unrealscript
class TmLuaGame extends TgGame_Paladins_ShootingRange DLLBind(TempestScripting);

dllimport final function int LuaAdd(int A, int B);
dllimport final function bool LuaOnPlayerSpawned(int PlayerId, out Vector Boost);
```

The runtime binds every `dllimport` function it finds to Lua when scripts load, and
`tempest.native` supplies the body:

```lua
tempest.native("TmLuaTest.TmLuaGame.LuaAdd", function(game, params)
  return params.A + params.B                 -- the return value
end)
tempest.native("TmLuaTest.TmLuaGame.LuaOnPlayerSpawned", function(game, params)
  params.Boost = { x = 0, y = 0, z = 600 }   -- `out` parameters: assign into params
  return true
end)
```

`fn(this, params)` runs in place of the function, from UnrealScript, from the engine, or from
Lua (`game:LuaAdd(1, 2)`). Its return value becomes the result; `out` parameters are whatever it
assigned into `params`. A `dllimport` function with no handler returns zero or an empty value and
logs once. The DLL name in `DLLBind` is only a label; the game never loads it. Returns a hook id
that `tempest.off` removes.

UDK limits `dllimport` parameters to `int`, `float`, `byte`, `bool`, `string` and structs of
those: no object references. For those, declare an ordinary function with a stub body instead;
`tempest.native` implements it the same way, with any UnrealScript types, and the body is what
runs when no Lua handler is registered:

```unrealscript
function string LuaDescribe(Actor A) { return "(not implemented in Lua)"; }
function bool LuaControllerOf(Pawn P, out Controller C) { return false; }
```

```lua
tempest.native("TmLuaTest.TmLuaGame.LuaDescribe", function(game, params)
  return params.A:full_name()
end)
tempest.native("TmLuaTest.TmLuaGame.LuaControllerOf", function(game, params)
  params.C = params.P.Controller       -- `out` object reference
  return params.C ~= nil
end)
```

`tempest.native` refuses a native that already has a C++ implementation; hook those with
`tempest.before`.

### `tempest.off(id)`

Removes a hook returned by `on`, `before`, or `trace`.

## Threads

### `tempest.queue(fn)`

Runs `fn()` on the game thread at the next event. Use it from the DLL console or any code that
did not start on the game thread.

### `tempest.on_game_thread()` → boolean

## Finding objects

### `tempest.find_class(path)` → Object

The class object for `"Package.Class"`, for example `tempest.find_class("TgGame.TgPlayerController")`.
Cached after the first lookup.

### `tempest.find_object(full_name)` → Object

The first object whose full name matches, for example `"Class TgGame.TgGame"` or
`"TgPlayerController shootingrange_p.TheWorld.PersistentLevel.TgPlayerController_1"`. Scans the
whole object table; cache the result.

### `tempest.objects(limit)` → Object[]

The first `limit` (default 64) live objects. For exploration only.

### `tempest.engine()` → Object

The `UEngine` instance (`Engine.Engine`).

### `tempest.local_player()` → Object

The local `PlayerController` (`Engine.PlayerController`), or `nil` in menus. Most gameplay scripts
start from here: `pc.Pawn`, `pc.PlayerReplicationInfo`, `pc.myHUD`, `pc.PlayerInput`.

### `tempest.object(ptr)` → Object

Wraps a raw `UObject*` address, such as an argument of a [`memory.hook`](./memory#address-hooks)
handler or the result of `memory.call`, as an Object proxy. Returns `nil` when the pointer or its
class pointer is not readable, so a stray integer gives `nil` rather than a crash. It does not
prove the memory is an object: use it on values you know hold one.

## Creating objects

### `tempest.new(class, outer, name)` → Object

Constructs a new object of `class` (a path string or a class object) with `outer` as its outer,
optionally named. Runs the engine's own `new` operator, so config defaults and constructors apply.
Returns `nil` and logs the reason when the engine refuses: abstract classes, and Actor subclasses,
which must be spawned.

```lua
local console = tempest.new("Engine.Console", viewport)
viewport.ViewportConsole = console           -- keep it referenced
viewport:InsertInteraction(console, 0)
```

### `tempest.spawn(class, location, rotation, owner, context, opts)` → Object

Spawns an actor through `Actor.Spawn`. `context` is the actor to spawn from (default: the local
player controller); `location` and `rotation` default to the context's. Classes marked `bStatic`
or `bNoDelete` (all lights, static meshes, notes) are refused by the engine and yield `nil`;
`opts = { force = true }` clears both flags on the class default object around the call so they
spawn anyway (the new actor keeps the flags and behaves like a placed one).

```lua
local l = pc.Pawn.Location
tempest.spawn("Engine.KActorSpawnable", { x = l.x + 200, y = l.y, z = l.z })
tempest.spawn("Engine.PointLight", { x = l.x, y = l.y, z = l.z + 300 }, nil, nil, nil, { force = true })
```

### `tempest.default_object(class)` → Object

The class default object (`Default__Name`) of a class path or class object: the per-class flags
and default property values the engine consults. `nil` when the class is not loaded.

## Mods

### `tempest.mod()` → string

Id of the mod whose script or handler is running.

### `tempest.mods()` → string[]

Ids of all loaded mods, in load order.

### `tempest.export(name, value)` / `tempest.import(name)`

Publish a value for other mods, or fetch one. Values live in the global `shared` table, which can
also be used directly; `export` additionally records the provider in `shared.__providers`, and
`import` logs a hint when the name is not provided yet (load order matters, see
[`[scripting] after`](/tempest/scripting/concepts#mods-and-sandboxes)).

### `tempest.config(defaults)` → table

This mod's configuration: `defaults`, then the mod's `config.toml`, then (installed mods) the
user's `<game>/ChaosGame/Config/mods/<mod-id>.toml`, deep-merged in that order. The editable file
(a dev mod's `config.toml`, an installed mod's user file) is written with the merged values when it
does not exist. Values are strings, numbers, booleans and tables
(arrays or maps). See [Concepts](/tempest/scripting/concepts#mod-configuration).

### `tempest.save_config(table)` → path

Writes the mod's config file (the table replaces it). The watcher then reloads the mod, so write
the complete config rather than a fragment.

### `tempest.config_path()` → string

### `tempest.settings()` → table

The runtime settings from `<game>/ChaosGame/Config/tempest.toml`, read-only: `path`, `game_dir`,
`log`, `console`, `jit`, `dev_mods`, `hot_reload`, `hot_reload_delay_ms`, `mod_configs`,
`ui_scale`. `tempest.game_dir()` returns the game folder alone.

### `tempest.toast(msg)`

Logs `msg` and shows it in chat when a local player exists.

### `tempest.reload(mod_id)`

Re-runs every mod (with no argument) or one mod. The reloaded mods' hooks, commands and key
bindings are removed first, so nothing fires twice. A full reload also resets `shared`.

## Console, input, editor

Documented on their own pages:

- [`tempest.command`, `tempest.commands`](/tempest/scripting/api/console-and-input#console-commands)
- [`tempest.on_key`, `tempest.off_key`](/tempest/scripting/api/console-and-input#key-bindings)
- `tempest.dump_sdk(dir)`: writes Lua Language Server stubs for every game class and struct, one
  file per package, into `dir` (default `<mod>/types/sdk`). Returns the number of classes and
  files. Takes a few seconds; see [Getting started](/tempest/scripting/getting-started#_4-editor-completion).

## Globals

| name      | description                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| `MOD`     | id of the mod the script belongs to                                                                          |
| `shared`  | table visible to every mod (see `export` / `import`)                                                         |
| `require` | loads `scripts/<name>.lua` from the same mod (`.` becomes `/`), else a built-in module (`ffi`, `bit`, `jit`) |
| `memory`  | raw memory access, see [`memory`](/tempest/scripting/api/memory)                                             |
| `ui`      | the in-game UI, see [`ui`](/tempest/scripting/api/ui)                                                        |
