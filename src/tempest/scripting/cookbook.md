---
title: Scripting cookbook
description: Copy-paste recipes for Tempest Lua mods, from renaming players and hooking natives to spawning actors, key bindings, and sharing code between mods.
---

# Cookbook

Short, complete recipes. Each one is a script you can drop into a mod's `scripts/` folder.

## Run something once a match starts

Scripts run at load, in the lobby, before a player exists. Wait for the local player:

```lua
local done = false
tempest.on("PostRender", function()
  local pc = tempest.local_player()
  if done or not pc then return end
  done = true
  print("in a match as " .. tostring(pc))
end)
```

## Rename players as they join

```lua
tempest.on("TgGame.TgGame.PostLogin", function(game, params)
  local pri = params.NewPlayer.PlayerReplicationInfo
  if pri then pri.PlayerName = "Kyiro" end
end)
```

## Cancel or rewrite a call

```lua
-- Block a console command, rewrite another.
tempest.before("Engine.PlayerController.ConsoleCommand", function(pc, params)
  if params.Command == "disconnect" then return false end
  if params.Command == "fps" then params.Command = "stat fps" end
end)
```

## Call functions

```lua
local pc = tempest.local_player()
pc:ClientMessage("hello")                       -- a script event
local name = pc:GetHumanReadableName()           -- return values come back
local controller = pc:GetALocalPlayerController() -- natives too
```

Find out what a function takes before calling it:

```lua
for _, p in ipairs(pc.Spawn:params()) do
  print(p.name, p.kind, p.out and "out" or "", p.ret and "return" or "")
end
```

## Teleport the pawn

```lua
tempest.command("up", function(pc)
  local pawn = pc.Pawn
  if not pawn then return end
  local l = pawn.Location
  pawn.Location = { x = l.x, y = l.y, z = l.z + 500 }
end, "hop up")
```

## Walk an array of structs

```lua
local binds = tempest.local_player().PlayerInput.Bindings
for i, b in binds:items() do
  if b.Command:find("Jump") then print(i, b.Name, "->", b.Command) end
end
```

## Read a native map

```lua
local hud = tempest.local_player().myHUD
if hud and hud.m_pMovie then
  for name, scene in hud.m_pMovie:map("m_Scenes"):pairs() do
    print(name, scene)
  end
end
```

## Spawn an actor in front of the player

```lua
tempest.command("spawn", function(pc, rest, argv)
  local l = pc.Pawn.Location
  local actor = tempest.spawn(argv[1] or "Engine.KActorSpawnable", { x = l.x + 200, y = l.y, z = l.z })
  pc:ClientMessage("spawned " .. tostring(actor))
end, "spawn <Pkg.Class>")
```

## Key bindings

```lua
tempest.on_key("F5", function()
  local pc = tempest.local_player()
  if pc then pc:ClientMessage("F5") end
end)

tempest.on_key("Ctrl+F5", function()
  -- ...
  return true  -- the game never sees Ctrl+F5
end)
```

## A settings panel

```lua
local panel = { open = false, speed = 1.0, godmode = false }

tempest.on_key("Insert", function()
  panel.open = not panel.open
  ui.capture(panel.open)
  return true
end)

ui.on_draw(function()
  if not panel.open then return end
  local still_open = ui.window("Settings", { open = true }, function()
    panel.speed = ui.slider_float("Speed", panel.speed, 0.5, 3, "%.1fx")
    panel.godmode = ui.checkbox("God mode", panel.godmode)
    local pawn = tempest.local_player() and tempest.local_player().Pawn
    if pawn and ui.button("Apply") then
      pawn.GroundSpeed = 600 * panel.speed
    end
  end)
  if still_open == false then panel.open = false ui.capture(false) end
end)
```

## Draw over the game

No window, no mouse: draw lists paint straight onto the screen.

```lua
ui.on_draw(function()
  local pc = tempest.local_player()
  if not pc or not pc.Pawn then return end
  local w, h = ui.screen()
  ui.fg.text(8, h - 24, ui.rgb(0xffffff, 0.8), "health %d", pc.Pawn.Health)
  ui.fg.circle(w / 2, h / 2, 5, ui.rgb(0x00ff00), 0, 2)
end)
```

## Share code between mods

```lua
-- mod "util-mod", scripts/main.lua
local fmt = require("lib.format")        -- scripts/lib/format.lua, same sandbox
tempest.export("banner", fmt.banner)
```

```lua
-- any other mod
local banner = tempest.import("banner")
if banner then print(banner("hi")) end
```

Declare the dependency so `util-mod` always loads first:

```toml
# manifest.toml of the consuming mod
[scripting]
after = ["util-mod"]
```

## Find what fires

```lua
tempest.trace("Tick", 3)          -- which objects tick, with their DeltaTime
tempest.trace("TakeDamage", 5)    -- damage events and their params
```

## Hook a C++ function by address

`memory.hook` detours anything with an address, not only UnrealScript functions. A native's C++
implementation is the easiest to find: every `UFunction` object stores it in its `Func` field.

```lua
local fn = tempest.find_object("Function Engine.PlayerController.ConsoleCommand")
local entry = memory.read_ptr(fn:ptr() + 0xF0)          -- UFunction.Func on 8.1

local id = memory.hook(entry, function(original, this, frame, result)
  print("ConsoleCommand on " .. tostring(tempest.object(this)))
  return original()                                      -- pass through unchanged
end, { args = 3 })

tempest.command("stop_tracing", function() memory.unhook(id) end)
```

For a function found by signature, scan for it and hook the first hit:

```lua
local target = memory.scan("48 89 5C 24 ? 57 48 83 EC 30 48 8B D9 ...")[1]
memory.hook(target, function(original, a, b)
  local r = original(a, b)
  if r == 0 then print("call failed") end
  return r
end, { args = 2 })
```

Arguments are integers (registers and stack slots), so read strings with `memory.read_wstr(ptr)`
and wrap object pointers with `tempest.object(ptr)`. See the
[`memory` reference](./api/memory#address-hooks) for the rules on `original`, return values and
threads.

## Enable the game console

The shipping game does not create its console. A mod can, the way TgMod does:

```lua
local viewport = tempest.engine().GameViewport
if not viewport.ViewportConsole then
  local console = tempest.new("Engine.Console", viewport)
  viewport.ViewportConsole = console
  viewport:InsertInteraction(console, 0)   -- first, so the UI does not eat the key
  console.ConsoleKey = "F2"
  console.TypeKey = "Tab"
end
```
