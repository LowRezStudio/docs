---
title: Getting started with Lua scripting
description: Create your first Tempest Lua mod for Paladins, pack and install it, reload it while the game runs, use the console, and set up editor completion.
---

# Getting started

## 1. Install the runtime

Install the Tempest.Scripting runtime through the launcher like any other mod, then launch the
game. A console window opens next to it, and the same lines go to
`%TEMP%\tempest-scripting.log`. A healthy start looks like this:

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

## 3. Pack and install

Pack the folder with the Tempest CLI:

```text
tempest mod pack my-first-mod my-first-mod.tempest
```

Then install the `.tempest` file in the launcher: drag it onto the launcher, double-click it, or
pick it from the mods screen. Launch the game and look for `[my-first-mod] loaded` in the log.

To update a mod, pack and install it again; the launcher replaces the previous version.

## 4. Iterate while the game runs

Scripts reload in place, so a script change does not need a game restart. From the game console
(F2 when the console mod is enabled):

```text
tempest_reload                reload every mod
tempest_reload my-first-mod   reload one mod (its hooks, commands and keys are dropped first)
lua print(tempest.mods())     run Lua from the game console
lua =tempest.local_player()   print an expression
```

The runtime's own console window is a Lua REPL as well: type `tempest.reload()` or
`=tempest.status().notes` there. Lines run on the game thread.

A new version of the runtime DLL does need a game restart.

## 5. Editor completion

`types/tempest.d.lua` in the
[Tempest.Scripting repository](https://github.com/LowRezStudio) describes the whole API for the
[Lua Language Server](https://luals.github.io/). Copy it into your mod next to a `.luarc.json`:

```json
{
	"runtime.version": "Lua 5.4",
	"workspace.library": ["types"],
	"diagnostics.globals": ["MOD", "shared"]
}
```

Open the mod folder in VS Code with the Lua extension and `tempest.*`, `memory.*`, objects,
arrays and maps complete.

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

## 6. Explore

`tempest.trace("PostRender", 5)` logs the first five firings of an event with the object and its
parameters, which is the quickest way to find out what fires and with what. `obj:prop("Name")`
describes a property, `obj.Func:params()` lists a function's parameters, and
`tempest.status()` reports what resolved.
