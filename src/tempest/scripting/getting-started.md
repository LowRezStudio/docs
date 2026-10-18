---
title: Getting started with Lua scripting
description: Create your first Tempest Lua mod for Paladins, pack and install it, reload it while the game runs, use the console, and set up editor completion.
---

# Getting started

## 1. Install the runtime

Install the Tempest.Scripting runtime through the launcher like any other mod, then launch the
game. A console window opens next to it, and the same lines go to
`%TEMP%\tempest-scripting.log` (started fresh each run; the previous run is kept as
`tempest-scripting.prev.log`). A healthy start looks like this:

```text
[resolve] GNames/GObjects live
[hook] ProcessEvent detour live at 0x...
[resolve] GEngine live; objects=139788 names=139379
[hook] ProcessInternal detour live at 0x...
[loader] 1 mod(s): ...
[boot] ready
```

Any `NOTE:` or `... not found` line means something did not resolve; see
[troubleshooting](/tempest/scripting/limitations#troubleshooting).

## 2. Write a mod

A mod is a folder, anywhere on disk, with a `manifest.toml` and a `scripts/` directory:

```text
my-first-mod/
  manifest.toml
  scripts/
    main.lua
```

```toml
[mod]
id = "my-first-mod"
name = "My First Mod"
version = "0.1.0"
authors = ["you"]
```

```lua
-- scripts/main.lua
print("[" .. MOD .. "] loaded")

-- Runs after the game's PostLogin: greet the joining player.
tempest.on("TgGame.TgGame.PostLogin", function(game, params)
  local pc = params.NewPlayer
  pc:ClientMessage("welcome, " .. tostring(pc.PlayerReplicationInfo.PlayerName))
end)

-- A console command: type `hello Tom` in the game console.
tempest.command("hello", function(pc, rest, argv)
  pc:ClientMessage("hello " .. (argv[1] or "world"))
end, "hello [name]")
```

Scripts in a mod run alphabetically. Everything printed with `print` lands in the log and the
console window, prefixed with the mod id.

## 3. Develop in the game folder

For quick iteration, skip packing: put the mod folder in `<game>/mods/`:

```text
<game>/mods/my-first-mod/scripts/main.lua
```

The runtime loads every folder there like an installed mod (`manifest.toml` is optional; the
folder name is the id without one) and **reloads the mod whenever you save a file in it**, with a
chat message to confirm. A dev mod with the same id as an installed mod replaces it, so you can
iterate on a released mod in place. The runtime also drops `types/` and a `.luarc.json` into
`<game>/mods/`, so opening that folder in VS Code gives completion right away.

Both the dev folder and hot reload are settings in `<game>/ChaosGame/Config/tempest.toml`, which
the runtime writes with comments on first run:

```toml
[runtime]
console = true            # console window + Lua REPL
jit = true
trace_calls = false       # log every obj:Func() / tempest.new from Lua (crash triage)
[dev]
mods = "mods"             # the dev folder, relative to the game folder
hot_reload = true
reload_on_config = true   # hand edits of a config file reload its mod
hot_reload_delay_ms = 300
[mods]
configs = "ChaosGame/Config/mods"
[ui]
scale = 1.0
```

`tempest_config` in the game console prints where these files are. The repository ships two
dev mods to start from: `examples/hot-reload` (a counter that shows reloads happening) and
`examples/fps-limit` (a slider for the frame-rate cap, kept in the mod's config).

## 4. Pack and install

Pack the folder with the Tempest CLI:

```text
tempest mod pack my-first-mod my-first-mod.tempest
```

Then install the `.tempest` file in the launcher: drag it onto the launcher, double-click it, or
pick it from the mods screen. Launch the game and look for `[my-first-mod] loaded` in the log.

To update a mod, pack and install it again; the launcher replaces the previous version.

## 5. Iterate while the game runs

Dev mods reload themselves on save. Installed mods reload from the game console (F2 when the
console mod is enabled):

```text
tempest_reload                reload every mod
tempest_reload my-first-mod   reload one mod (its hooks, commands and keys are dropped first)
lua print(tempest.mods())     run Lua from the game console
lua =tempest.local_player()   print an expression
```

The runtime's own console window is a Lua REPL as well: type `tempest.reload()` or
`=tempest.status().notes` there. Lines run on the game thread.

A new version of the runtime DLL does need a game restart.

## 6. Editor completion

`types/tempest.d.lua` in the
[Tempest.Scripting repository](https://github.com/LowRezStudio) describes the whole API for the
[Lua Language Server](https://luals.github.io/). Copy it into your mod next to a `.luarc.json`:

```json
{
	"runtime.version": "LuaJIT",
	"workspace.library": ["types"],
	"diagnostics.globals": ["MOD", "shared"]
}
```

Open the mod folder in VS Code with the Lua extension and `tempest.*`, `memory.*`, `ui.*`,
objects, arrays and maps complete. `types/imgui.d.lua` next to it covers the raw Dear ImGui API
(`ui.C.*`).

For the game's own classes, run `tempest.dump_sdk("C:/path/to/my-first-mod/types/sdk")` once from
the console (or bind it to a key with `tempest.on_key`). It writes one `<Package>.lua` per package,
generated from live reflection: every class with its fields and functions, typed.
`tempest.local_player()` is then an `Engine.PlayerController`, and `pc.Pawn.Location` completes.

Hook handlers receive the generic `Object`, so tell the language server what it is:

```lua
tempest.on("PostRender", function(this, params)
  ---@cast this Engine.HUD
  local pc = this.PlayerOwner   -- completes as Engine.PlayerController
end)
```

## 7. Explore

Type `ui_demo` in the game console to open Dear ImGui's demo window: every widget the
[`ui`](/tempest/scripting/api/ui) module can draw, with the mouse.

`tempest.trace("PostRender", 5)` logs the first five firings of an event with the object and its
parameters, which is the quickest way to find out what fires and with what. `obj:prop("Name")`
describes a property, `obj.Func:params()` lists a function's parameters, and
`tempest.status()` reports what resolved.
