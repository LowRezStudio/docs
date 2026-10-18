---
title: Lua scripting
description: Tempest.Scripting is a LuaJIT modding runtime for Paladins. Hook game functions, read and write any object, call UnrealScript and native functions, draw an in-game UI, and ship mods with no compiler.
---

# Lua scripting

Tempest.Scripting is a LuaJIT runtime (Lua 5.1 with the 5.2 extensions, `ffi` and `bit`
included) that the launcher injects into Paladins alongside V2 mods.
It gives a script live access to the game's UnrealScript object model without a UDK project,
a compiler, or any hard-coded offsets.

With it a mod can:

- read and write any property of any object through the game's own reflection data
- call any UnrealScript or native function
- hook functions before or after they run, change their arguments, or cancel them
- construct objects, spawn actors, and iterate arrays and maps
- add console commands and key bindings
- draw an in-game UI with Dear ImGui: windows, widgets, tables, overlays
- share values with other Lua mods

Scripts reload while the game runs, so iteration is edit, save, reload.

## How it fits with Tempest

A Lua mod is a regular Tempest mod: a folder with a `manifest.toml` and a `scripts/` directory,
packed into a `.tempest` file with the CLI and installed through the launcher. The runtime itself
is installed the same way, once: its package carries `dlls/64/Tempest.Scripting64.dll` for the
Win64 client and `dlls/32/Tempest.Scripting32.dll` for the Win32 client, and the launcher injects
the one matching the game executable at launch. The runtime then runs the scripts of **every**
enabled mod. Script mods do not bundle the DLL.

```text
my-first-mod/
  manifest.toml
  scripts/
    main.lua
    lib/helpers.lua      loaded with require("lib.helpers")
```

Each mod runs in its own sandbox. Globals a script sets stay private to its mod; the API,
the standard library, and the `shared` table are visible to all.

## Supported game versions

The runtime is built for the Paladins **8.1** client, Win64 and Win32, and has also been run on
the **0.57 (OB57)** Win32 client. Engine addresses are found by signature scanning at startup
and game-class layouts are read from live reflection, so other versions may well work: the log
says at startup which signatures resolved, and nothing hooks when one is missing. Scripts are the
same on both clients; the only visible differences are in `memory.hook` / `memory.call`, which
need the calling convention on Win32 (see the [`memory` reference](/tempest/scripting/api/memory)),
and `tempest.status().arch`, which tells a script where it runs.

## Where to go next

- [Getting started](/tempest/scripting/getting-started) walks through a first mod, the console,
  reloading, and editor completion.
- [Concepts](/tempest/scripting/concepts) explains objects, hooks, threads, and the sandbox.
- The API reference: [`tempest`](/tempest/scripting/api/tempest),
  [objects and containers](/tempest/scripting/api/objects),
  [console and input](/tempest/scripting/api/console-and-input),
  [`memory`](/tempest/scripting/api/memory), [`ui`](/tempest/scripting/api/ui).
- [Cookbook](/tempest/scripting/cookbook) has copy-paste recipes.
- [Limitations and troubleshooting](/tempest/scripting/limitations) lists what does not work and
  how to read the log.
