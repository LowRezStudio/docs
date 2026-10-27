---
title: Assembly
description: Editing Paladins' content database (assembly.dat) and language files in Tempest Studio - champions, devices, cards, items, skins and their texts.
---

# Assembly

The **Assembly** view (Ctrl+2) edits the game's content database, `assembly.dat`, and the language
files `Localization/<LANG>/Lang_<LANG>.dat`. Champions, abilities (devices), cards and talents,
items, skins, loot tables and their names and descriptions in every language all live there.

## Layout

- **Left**: every file with its header (database and game version) and its tables, with row counts.
  Pick a table to open it.
- **Middle**: the grid, 200 rows per page.
- **Right**: the selected row with every field, and **Used by**: every row of the file that refers to
  it.

## Reading the grid

- **Filter rows** matches any cell. Click a column header to sort.
- `*_ID` columns are links to the row they name (Ctrl+click opens a new tab). Back and Forward
  retrace them.
- `*_VALUE_ID` cells show the meaning of the value next to it (for example `217 Device`), and
  `*_MSG_ID` cells show the English text of the message.
- Nested row sets (a device's modes, a bot's devices) open in place; the breadcrumbs above the grid
  lead back.
- The id and name columns stay pinned while you scroll sideways. The column button hides columns per
  table, and the choice is remembered.

## Editing

The grid has a cell cursor. Move it with the arrow keys or Tab. **Enter**, **F2** or typing starts
editing; Enter commits and moves down, Tab moves right, Esc cancels. **Space** toggles a flag.
`*_VALUE_ID` editors suggest the valid values. Double-clicking a cell also edits it.

In the row pane every field is editable: flags as toggles, long strings as text areas. Each
`*_MSG_ID` shows its message in every language, editable in place.

To edit many rows at once, mark them with Ctrl+click, Shift+click or Shift+arrows: an edit to one
marked row sets the same value on every marked row.

## Adding and removing rows

- **New row** (Ctrl+Shift+Enter) appends an empty row shaped like the last one.
- **Duplicate** (Ctrl+D) appends a copy of the selected row.
- **Ctrl+C** copies the marked rows as JSON; **Ctrl+V** in the same table appends them. **Copy as
  TSV** pastes into a spreadsheet.
- **Delete…** removes the marked rows after asking.

New rows always go at the end. Their id gets a fresh value, nested row sets are renumbered so they
point at the new row, and each `*_MSG_ID` gets a new message with the same text in every language,
so editing the copy's name never renames the original.

### Id range

Ids are global: two mods that both add item `40001` cannot be installed together. Set your own
**id range** in the New content dialog (for example 900000 to 909999). Every id the Studio allocates
for you then comes from that range. Agree on ranges with other modders you work with.

## New content

**New content…** (above the grid) creates a playable thing from a template, with fresh ids and new
name and description messages in every language:

- **Device or card/talent**: the device rows and its item, attached to the champion (`REF_BOT_ID`)
  and slot you choose.
- **Item**, with its skin row.
- **Champion**: the bot, one device per ability slot, the Character Class and Weapon items, a default
  skin, and an entry in the Champion Vendor so the champion is listed.

### Champion Vendor

The client builds the champion list (lobby and champion select, offline too) from the active entries
of loot table 475, the Champion Vendor, not from the bots. A champion without an entry never appears.
**Champion Vendor…** shows how many entries are active against the 60 buttons of the in-match
selector, lists the champions missing from it, and **Add** creates their entry.

## Saving and building

Undo (Ctrl+Z), Discard and Save act on the `.dat` files while the Assembly view is active. In a mod
project the edits are kept in the project like package edits. The [mod cooker](/studio/mod-cooker)
ships them as row deltas: only the rows you added, changed or removed, keyed by id, so your mod
combines with other mods that edit the same files.

**Export a mod from the assembly changes…** writes a mod folder for new champions and abilities:
the deltas, a `paserver.json` with what a private server must answer for the new champion,
`scripts/main.lua` handlers and UnrealScript stubs for the new devices, and a README with the build
steps.
