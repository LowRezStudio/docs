---
title: Console commands and input reference
description: Define in-game console commands and key, mouse, and wheel bindings from Lua with Tempest.Scripting.
---

# Console commands and input

## Console commands

### `tempest.command(name, fn, help)`

Registers an in-game console command. When the player types `name ...` in the game console (or a
script calls `pc:ConsoleCommand("name ...")`), `fn(pc, rest, argv)` runs with the local
controller, the raw remainder of the line, and the remainder split on spaces. Matching is
case-insensitive. The command never reaches the engine, so no cheat manager or `exec` function is
involved.

```lua
tempest.command("tp", function(pc, rest, argv)
  local pawn = pc.Pawn
  if not pawn then pc:ClientMessage("no pawn") return end
  local l = pawn.Location
  pawn.Location = { x = l.x + (tonumber(argv[1]) or 0), y = l.y + (tonumber(argv[2]) or 0), z = l.z + (tonumber(argv[3]) or 0) }
end, "tp dx dy dz")
```

Registering a name another mod already uses replaces it and logs a warning.

### `tempest.commands()`

Returns `{ { name, help }, ... }` sorted by name.

### Built-in commands

| command                   | effect                                                |
| ------------------------- | ----------------------------------------------------- |
| `tempest_help`            | lists every Lua command in chat                       |
| `tempest_reload [mod-id]` | reloads all mods, or one                              |
| `tempest_config`          | where the settings and mod config files are           |
| `lua <code>`              | runs a Lua chunk; `lua =<expr>` prints the expression |
| `ui_demo`                 | toggles Dear ImGui's demo window                      |
| `ui_status`               | UI backend and frame counters                         |
| `ui_capture [0\|1]`       | gives the mouse to the UI, or back to the game        |

### Enabling the game console

The shipping game does not create its console. A mod can enable it the way TgMod does, by
constructing an `Engine.Console` and registering it as the first viewport interaction; see the
[cookbook](/tempest/scripting/cookbook#enable-the-game-console). The console then opens with the
key set as `ConsoleKey` (F2 in that recipe) and the single-line prompt with `TypeKey` (Tab).

## Key bindings

### `tempest.on_key(spec, fn, opts)` → id

Calls `fn()` when the key combination `spec` is pressed. Return `true` from `fn` to swallow the
event so the game never sees it.

```lua
tempest.on_key("F5", function() print("F5") end)
tempest.on_key("Ctrl+Shift+T", function() ... return true end)
tempest.on_key("F6", function() print("released") end, { up = true })
tempest.on_key("Space", function() ... end, { ["repeat"] = true })
tempest.on_key("WheelDown", function() ... end)
```

`spec` combines any of `Ctrl`, `Shift`, `Alt` with one key name:

- letters `A`..`Z`, digits `0`..`9`, `F1`..`F24`, `NumPad0`..`NumPad9`
- `Space`, `Enter`, `Tab`, `Escape`, `Backspace`, `Insert`, `Delete`, `Home`, `End`, `PageUp`,
  `PageDown`, `Left`, `Right`, `Up`, `Down`
- `Tilde`, `Minus`, `Equals`, `LeftBracket`, `RightBracket`, `Semicolon`, `Quote`, `Comma`,
  `Period`, `Slash`, `Backslash`, `CapsLock`, `NumLock`, `ScrollLock`, `Pause`
- `MouseLeft`, `MouseRight`, `MouseMiddle`, `Mouse4`, `Mouse5`, `WheelUp`, `WheelDown`

Options: `{ up = true }` fires on release instead of press; `{ ["repeat"] = true }` also fires on
keyboard auto-repeat. Handlers run on the game thread. Gamepad input is not available.

### `tempest.off_key(id)`

Removes a binding. A mod's bindings are also removed when that mod reloads.
