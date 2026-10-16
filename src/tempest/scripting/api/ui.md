---
title: ui API reference (Dear ImGui)
description: Draw an in-game UI from Lua with Tempest.Scripting. Windows, widgets, tables, draw lists, mouse capture, and the raw Dear ImGui API through LuaJIT's FFI.
---

# `ui`

Dear ImGui, rendered on the game's own D3D11 (or D3D9) device. A mod registers a draw handler,
draws widgets inside it every frame, and gets Lua values back. No pointers, no manual memory.

```lua
local open, volume = false, 0.5

tempest.on_key("Insert", function()
  open = not open
  ui.capture(open)           -- the mouse goes to the UI while the panel is open
  return true
end)

ui.on_draw(function()
  if not open then return end
  ui.set_next_window_size(300, 160, ui.Cond.FirstUseEver)
  local still_open = ui.window("My Mod", { open = true }, function()
    ui.text("fps %.0f", ui.framerate())
    volume = ui.slider_float("Volume", volume, 0, 1)
    if ui.button("Say hi") then tempest.local_player():ClientMessage("hi") end
  end)
  if still_open == false then open = false ui.capture(false) end
end)
```

## How it runs

Every rendered frame, the game thread builds one UI frame at its next engine event and calls every
`ui.on_draw` handler in registration order. Handlers therefore run on the game thread, where game
objects are safe to read and call. The render thread only draws the finished frame. Widgets are
valid inside a draw handler and nowhere else; calling one elsewhere raises.

A handler that raises a Lua error is logged once per distinct message, with the mod id, and
ImGui's error recovery closes whatever windows it left open, so one broken mod does not take the
UI down.

The window procedure feeds ImGui every message, so hovering works while the game plays. Nothing is
taken from the game until a mod calls [`ui.capture(true)`](#ui-capture-on).

## Frame handlers

### `ui.on_draw(fn)` → id

Registers `fn()` to run every frame. Returns an id for `ui.off_draw`. A mod's handlers are removed
when that mod reloads.

### `ui.off_draw(id)`

### `ui.ready()` → boolean

`true` once the renderer backend initialised (after the first frame the game presented). Handlers
registered before that simply start running when it is.

### `ui.backend()` → string

`"d3d11"`, `"d3d9"`, or `""` before the first frame.

### `ui.stats()` → table

`{ built, rendered, vertices, lists }`: frames built by the game thread, frames drawn by the render
thread, and the size of the last frame. `ui_status` prints the same in chat.

## Input

### `ui.capture(on)`

Gives the mouse to the UI: ImGui draws its own cursor, mouse messages stop reaching the game, keys
stop reaching it while a text field is active, and the local player's look input is parked with
`IgnoreLookInput(true)`. `ui.capture(false)` undoes all of it. Key bindings made with
`tempest.on_key` keep firing while captured, so a toggle key works from inside a menu.

### `ui.capturing()` → boolean

### `ui.want()` → mouse, keyboard, text

ImGui's `WantCaptureMouse`, `WantCaptureKeyboard` and `WantTextInput` flags for the current frame.

### `ui.key_down(key)`, `ui.key_pressed(key, repeat)`, `ui.key_released(key)`

Key state as ImGui sees it, with `key` from `ui.Key` (`ui.Key.Escape`, `ui.Key.F5`, `ui.Key.A`).

### `ui.mouse_down(button)`, `ui.mouse_clicked(button, repeat)`, `ui.mouse_released(button)`

`button` is 0 (left), 1 (right) or 2 (middle).

### `ui.mouse()` → x, y

### `ui.screen()` → width, height

## Windows and layout

### `ui.window(title, fn)` / `ui.window(title, opts, fn)` → open

Begins a window, runs `fn()` while it is visible (not collapsed or clipped), and always ends it.
`opts` is `{ open = true, flags = ui.WindowFlags.NoResize + ui.WindowFlags.NoCollapse }`; with
`open` given, the window gets a close button and the call returns `false` the frame it is clicked.
Flags add together.

`ui.begin_window(title, open, flags)` → `visible, open` and `ui.end_window()` are the raw pair for
code that cannot use a closure.

### `ui.child(id, w, h, fn)` / `ui.child(id, w, h, opts, fn)`

A scrolling region inside the current window. `0` for a size means "the rest of the window".
`opts` takes `child_flags` and `flags`.

### Positioning

`ui.set_next_window_pos(x, y, cond, pivot_x, pivot_y)`, `ui.set_next_window_size(w, h, cond)`,
`ui.set_next_window_collapsed(bool, cond)`, `ui.set_next_window_focus()`,
`ui.set_next_window_bg_alpha(a)`, `ui.set_next_item_width(w)`, `ui.set_next_item_open(bool, cond)`.
`cond` is `ui.Cond.Always` (default), `Once`, `FirstUseEver` or `Appearing`.

`ui.window_pos()`, `ui.window_size()`, `ui.window_width()`, `ui.window_height()`,
`ui.content_region_avail()`, `ui.cursor_pos()`, `ui.set_cursor_pos(x, y)`,
`ui.cursor_screen_pos()`, `ui.set_cursor_screen_pos(x, y)`, `ui.scroll_y()`, `ui.set_scroll_y(y)`,
`ui.scroll_max_y()`, `ui.set_scroll_here_y(ratio)`, `ui.is_window_hovered(flags)`,
`ui.is_window_focused(flags)`, `ui.is_window_collapsed()`.

### Layout

`ui.separator()`, `ui.separator_text(label)`, `ui.same_line(offset, spacing)`, `ui.new_line()`,
`ui.spacing()`, `ui.dummy(w, h)`, `ui.indent(w)`, `ui.unindent(w)`, `ui.group(fn)`,
`ui.align_text_to_frame_padding()`, `ui.text_line_height()`, `ui.frame_height()`,
`ui.calc_text_size(text)` → `w, h`.

### Ids and style

Two widgets with the same label in one window need distinct ids: `ui.push_id(id)` /
`ui.pop_id()`, or a `##suffix` on the label (`"Delete##3"`), or `"Visible text###stable-id"`.

`ui.push_color(ui.Col.Text, r, g, b, a)` / `ui.pop_color(n)`,
`ui.push_var(ui.StyleVar.Alpha, 0.5)` or `ui.push_var(ui.StyleVar.WindowPadding, x, y)` /
`ui.pop_var(n)`, `ui.push_item_width(w)` / `ui.pop_item_width()`,
`ui.push_text_wrap_pos(x)` / `ui.pop_text_wrap_pos()`, `ui.begin_disabled(bool)` /
`ui.end_disabled()`.

`ui.scale(s)` scales the default font and every padding together (for high-DPI displays);
`ui.style()` and `ui.io()` return the raw `ImGuiStyle` and `ImGuiIO` structs for anything else.

## Text

`ui.text(s, ...)`, `ui.text_colored(r, g, b, a, s, ...)`, `ui.text_disabled(s, ...)`,
`ui.text_wrapped(s, ...)`, `ui.label_text(label, s, ...)`, `ui.bullet_text(s, ...)`, `ui.bullet()`.
Extra arguments go through `string.format`; a lone `s` is printed as is, `%` included.

## Widgets

Every widget returns the new value and a `changed` boolean, so the usual shape is
`state.x = ui.slider_float("X", state.x, 0, 1)`.

| function                                                  | returns                  |
| --------------------------------------------------------- | ------------------------ |
| `ui.button(label, w, h)`                                  | clicked                  |
| `ui.small_button(label)`                                  | clicked                  |
| `ui.invisible_button(id, w, h, flags)`                    | clicked                  |
| `ui.arrow_button(id, ui.Dir.Left)`                        | clicked                  |
| `ui.checkbox(label, value)`                               | value, changed           |
| `ui.radio(label, active)`                                 | clicked                  |
| `ui.radio_value(label, current, value)`                   | current, clicked         |
| `ui.selectable(label, selected, flags, w, h)`             | clicked                  |
| `ui.progress_bar(fraction, w, h, overlay)`                |                          |
| `ui.slider_float(label, v, min, max, format, flags)`      | v, changed               |
| `ui.slider_int(label, v, min, max, format, flags)`        | v, changed               |
| `ui.slider_angle(label, radians, min_deg, max_deg)`       | radians, changed         |
| `ui.drag_float(label, v, speed, min, max, format, flags)` | v, changed               |
| `ui.drag_int(label, v, speed, min, max, format, flags)`   | v, changed               |
| `ui.slider_floats(label, {x, y, z}, min, max)`            | values, changed          |
| `ui.drag_floats(label, {x, y, z}, speed, min, max)`       | values, changed          |
| `ui.input_floats(label, {x, y, z}, format)`               | values, changed          |
| `ui.input_text(label, value, maxlen, flags)`              | value, changed           |
| `ui.input_text_with_hint(label, hint, value, maxlen)`     | value, changed           |
| `ui.input_text_multiline(label, value, w, h, maxlen)`     | value, changed           |
| `ui.input_int(label, v, step, step_fast, flags)`          | v, changed               |
| `ui.input_float(label, v, step, step_fast, format)`       | v, changed               |
| `ui.combo(label, index, items, height)`                   | index (1-based), changed |
| `ui.list_box(label, index, items, height)`                | index (1-based), changed |
| `ui.color_edit(label, {r, g, b, a}, flags)`               | color, changed           |
| `ui.color_picker(label, {r, g, b, a}, flags)`             | color, changed           |
| `ui.color_button(id, r, g, b, a, flags, w, h)`            | clicked                  |
| `ui.plot_lines(label, values, opts)`                      |                          |
| `ui.plot_histogram(label, values, opts)`                  |                          |

`format` strings are printf-style (`"%.2f"`, `"%d%%"`). Flags come from `ui.SliderFlags`,
`ui.InputTextFlags`, `ui.ColorEditFlags` and `ui.SelectableFlags`. `maxlen` defaults to 255
characters (4095 for multiline).

## Trees, tabs, menus, popups

Each takes a function and handles the matching `End` call itself, even when the function raises.

```lua
ui.collapsing_header("Advanced")            -- → open; draw below it when true
ui.tree("Node", function() ui.text("leaf") end)
ui.tab_bar("tabs", function()
  ui.tab_item("One", function() ... end)
  ui.tab_item("Two", { open = true }, function() ... end)   -- closable tab
end)
ui.menu_bar(function()                       -- window needs ui.WindowFlags.MenuBar
  ui.menu("File", function()
    if ui.menu_item("Quit", "Ctrl+Q") then ... end
  end)
end)
ui.main_menu_bar(function() ... end)
if ui.button("Delete") then ui.open_popup("confirm") end
ui.popup_modal("confirm", function()
  ui.text("Sure?")
  if ui.button("Yes") then ui.close_current_popup() end
end)
ui.popup("menu", function() ... end)           -- after ui.open_popup("menu")
ui.popup_context_item("ctx", function() ... end)  -- right-click on the previous item
```

`ui.tree_node(label, flags)` / `ui.tree_pop()` and `ui.open_popup(id)` /
`ui.close_current_popup()` are the raw forms.

## Tables

```lua
ui.table("scores", 3, { flags = ui.TableFlags.Borders + ui.TableFlags.RowBg }, function()
  ui.table_setup_column("Player")
  ui.table_setup_column("Kills")
  ui.table_setup_column("Deaths")
  ui.table_headers_row()
  for _, row in ipairs(rows) do
    ui.table_next_row()
    ui.table_next_column() ui.text(row.name)
    ui.table_next_column() ui.text("%d", row.kills)
    ui.table_next_column() ui.text("%d", row.deaths)
  end
end)
```

Also `ui.table_setup_scroll_freeze(cols, rows)`, `ui.table_set_column_index(i)`,
`ui.table_column_index()`, `ui.table_row_index()`, `ui.table_set_bg_color(target, color, column)`.

## Item queries and tooltips

`ui.is_item_hovered(flags)`, `ui.is_item_active()`, `ui.is_item_focused()`,
`ui.is_item_clicked(button)`, `ui.is_item_visible()`, `ui.is_item_edited()`,
`ui.is_item_activated()`, `ui.is_item_deactivated()`, `ui.is_item_deactivated_after_edit()`,
`ui.is_any_item_hovered()`, `ui.is_any_item_active()`, `ui.item_rect_min()`, `ui.item_rect_max()`,
`ui.item_rect_size()`, `ui.set_item_default_focus()`, `ui.set_keyboard_focus_here(offset)`.

`ui.set_tooltip(s, ...)` shows a text tooltip when the previous item is hovered;
`ui.tooltip(fn)` draws arbitrary content in it.

## Draw lists

Lines, shapes and text anywhere on screen, without a window. `ui.fg` draws over everything,
`ui.bg` behind every window, `ui.dl` into the current window. Colors are packed integers from
`ui.color(r, g, b, a)` (0..1 floats) or `ui.rgb(0xRRGGBB, alpha)`.

```lua
ui.on_draw(function()
  local w, h = ui.screen()
  ui.fg.circle(w / 2, h / 2, 6, ui.rgb(0x00ff00), 0, 2)           -- crosshair ring
  ui.fg.text(8, h - 24, ui.rgb(0xffffff, 0.8), "%.0f fps", ui.framerate())
  ui.bg.rect_filled(0, 0, 200, 40, ui.color(0, 0, 0, 0.5), 4)
end)
```

| function                                                    |
| ----------------------------------------------------------- |
| `line(x1, y1, x2, y2, color, thickness)`                    |
| `rect(x1, y1, x2, y2, color, rounding, thickness, flags)`   |
| `rect_filled(x1, y1, x2, y2, color, rounding, flags)`       |
| `circle(x, y, radius, color, segments, thickness)`          |
| `circle_filled(x, y, radius, color, segments)`              |
| `triangle(x1, y1, x2, y2, x3, y3, color, thickness)`        |
| `triangle_filled(x1, y1, x2, y2, x3, y3, color)`            |
| `text(x, y, color, s, ...)`                                 |
| `text_sized(size, x, y, color, s, ...)`                     |
| `polyline({x1, y1, x2, y2, ...}, color, closed, thickness)` |
| `list()` → the raw `ImDrawList*` for `ui.C.ImDrawList_*`    |

## Enums

Every Dear ImGui enum is a table on `ui`, with the `ImGui`/`Im` prefix and the trailing underscore
removed: `ImGuiWindowFlags_NoTitleBar` is `ui.WindowFlags.NoTitleBar`, `ImGuiCol_Text` is
`ui.Col.Text`, `ImGuiKey_F5` is `ui.Key.F5`. Flags are plain integers; add them.

## Raw API: `ui.C`

`ui.C` is the complete [cimgui](https://github.com/cimgui/cimgui) API (Dear ImGui 1.91.9) bound
through LuaJIT's FFI: `ui.C.igBegin(...)`, `ui.C.ImDrawList_AddBezierCubic(...)`, and so on. Use it
for anything the curated layer does not cover. Arguments follow the C signatures: `ImVec2` by value
(`ui.vec2(x, y)`), out-parameters as cdata (`local v = require("ffi").new("bool[1]")`), strings as
Lua strings. `types/imgui.d.lua` ships with the runtime for editor completion of every function.

```lua
local ffi = require("ffi")
local size = ffi.new("ImVec2")
ui.C.igGetWindowSize(size)
ui.C.igTextUnformatted("raw", nil)
```

## Fonts

`ui.add_font(path, size, opts)` loads a TTF at `size` pixels and returns an `ImFont` to use with
`ui.push_font(font)` / `ui.pop_font()`, `ui.with_font(font, fn)` or `ui.set_default_font(font)`.
`ui.add_font(nil, size)` is the built-in font at another size. `opts.merge = true` adds the glyphs
to the previous font (icon fonts), with `opts.ranges = "icons"` (the private-use block most icon
fonts use) or `{ first, last, ... }` pairs. Add fonts at load time: the font texture is rebuilt by
the render thread before the next frame, so the font is usable from then on.

```lua
local big = ui.add_font("C:/Windows/Fonts/segoeui.ttf", 28)
local icons = ui.add_font("C:/Games/Paladins/mods/my-mod/icons.ttf", 16, { merge = true, ranges = "icons" })
ui.on_draw(function()
  ui.window("Title", function()
    ui.with_font(big, function() ui.text("Headline") end)
  end)
end)
```

## Images

`ui.load_image(path)` decodes a PNG, JPEG, BMP or TGA and returns an image with `width`, `height`,
`img:ready()` (the render thread uploads it on the next frame) and `img:free()`.
`ui.image_from_rgba(w, h, bytes)` takes raw RGBA8 pixels. Draw with `ui.image(img, w, h)` (a blank
placeholder until uploaded), `ui.image_button(id, img, w, h)` or `ui.fg.image(img, x1, y1, x2, y2,
tint)` and its `bg`/`dl` siblings.

## Layout file

Window positions and sizes persist in `<game>/ChaosGame/Config/tempest-ui.ini`, outside any
checksummed mod folder.

## Built-in commands

| command             | effect                                            |
| ------------------- | ------------------------------------------------- |
| `ui_demo`           | toggles Dear ImGui's demo window (with the mouse) |
| `ui_status`         | backend, capture state, frames built and rendered |
| `ui_capture [0\|1]` | `ui.capture` from the console                     |

