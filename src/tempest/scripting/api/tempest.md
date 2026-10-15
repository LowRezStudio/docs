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
| `mods`                       | ids of loaded mods                                                |

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

`spec` is either `"Package.Class.Func"` (that exact function, required for natives) or `"Func"`
(any class, once per logical call). See [Concepts](/tempest/scripting/concepts#hooks) for the
matching rules.

Handlers run on the game thread. A Lua error inside one is logged with the mod id and never
reaches the game.

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

### `tempest.spawn(class, location, rotation, owner, context)` → Object

Spawns an actor through `Actor.Spawn`. `context` is the actor to spawn from (default: the local
player controller); `location` and `rotation` default to the context's. Classes marked `bStatic`
or `bNoDelete` (all lights, static meshes, notes) cannot be spawned at runtime and yield `nil`;
the `*Spawnable` classes exist for this purpose.

```lua
local l = pc.Pawn.Location
tempest.spawn("Engine.KActorSpawnable", { x = l.x + 200, y = l.y, z = l.z })
```

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

| name      | description                                                      |
| --------- | ---------------------------------------------------------------- |
| `MOD`     | id of the mod the script belongs to                              |
| `shared`  | table visible to every mod (see `export` / `import`)             |
| `require` | loads `scripts/<name>.lua` from the same mod (`.` becomes `/`)   |
| `memory`  | raw memory access, see [`memory`](/tempest/scripting/api/memory) |
