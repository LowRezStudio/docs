---
title: Game data API reference (assembly, lang)
description: Query Paladins' assembly.dat (items, devices, champions, skins, resources) and the Lang files (every name and description) from a Lua mod with Tempest.Scripting.
---

# `assembly` and `lang`

Available since Tempest Scripting **1.1.0**. A mod that uses them should declare
`dependencies = ["tempest-scripting>=1.1.0"]` in its `manifest.toml`.

Most of what the game knows about its content lives in two kinds of data file:

- `ChaosGame/CookedPCConsole/assembly.dat`: items, devices, champions (bots), skins, effects,
  loot tables, resources and so on, as `DATA_SET_*` tables of rows.
- `ChaosGame/Localization/<EXT>/Lang_<EXT>.dat`: the text of every name and description. Rows
  in assembly.dat point at it through their `*_MSG_ID` fields.

`assembly` and `lang` read these files, as they are installed, so changes made by installed
mods are included. They are the same files the [Studio](/studio/assembly) edits, with the same table
and field names.

```lua
local item = assembly.find("ITEMS", "ITEM_ID", 7204)
print(item.ITEM_ID, lang.message(item.NAME_MSG_ID))

-- Every champion and its devices.
for _, bot in ipairs(assembly.find_all("BOTS", "BOT_TYPE_VALUE_ID", 10849)) do
	print(bot.BOT_ID, lang.message(bot.NAME_MSG_ID))
	for _, slot in ipairs(bot.DATA_SET_BOT_DEVICES or {}) do
		local device = assembly.find("DEVICES", "DEVICE_ID", slot.DEVICE_ID)
		print("  ", slot.DEVICE_ID, device and lang.message(device.NAME_MSG_ID))
	end
end
```

## Rows

A lookup returns rows. Read a field by name: `row.ITEM_ID`, `row.NAME_MSG_ID`.

- A field name that does not exist at all (a typo) raises an error. A real field that this row
  does not have is `nil`.
- Numbers come back as Lua numbers, strings as strings, GUIDs as
  `"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"` strings and blobs as byte strings.
- A nested table (`bot.DATA_SET_BOT_DEVICES`, `device.DATA_SET_DEVICE_MODES`) is an array of
  rows.
- `row:has("FIELD")` tells whether the row has a field; `row:fields()` copies the whole row
  into a plain table (nested tables included), for `pairs` or `json.encode`.
- Two lookups that find the same row return rows that compare equal (`==`).

## `assembly`

Table names can be given with or without their `DATA_SET_` prefix: `"ITEMS"` and
`"DATA_SET_ITEMS"` are the same table.

| function                               | returns                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| `assembly.find(set, field, value)`     | the first row where `field == value`, or `nil`           |
| `assembly.find(set, { F = v, ... })`   | the first row matching every field                       |
| `assembly.find_all(set, field, value)` | every matching row (also takes a table of fields)        |
| `assembly.rows(set)`                   | every row of the table                                   |
| `assembly.sets()`                      | `{ { name, rows }, ... }`: the tables in the file        |
| `assembly.get(field)`                  | a top-level value, such as `"DB_VERSION"`                |
| `assembly.version()`                   | the game version the file was built for (`"8.1.5839.0"`) |
| `assembly.load()`                      | `true`, or `nil` and why (missing file, for example)     |
| `assembly.unload()`                    | frees the file; the next lookup reads it again           |
| `assembly.path()`                      | where the file is read from                              |

## `lang`

Every `lang` function takes the language last, and it is optional. By default it is the game's
language (the `-language=XXX` the game was started with, else `INT`).

| function                                                    | returns                                                    |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| `lang.message(id, ext?)`                                    | the text of message `id`, or `nil`                         |
| `lang.find(field, value, ext?)`                             | the first message row matching, or `nil`                   |
| `lang.find_all(field, value, ext?)`                         | every matching message row                                 |
| `lang.rows(ext?)`                                           | every message row: `MSG_ID`, `NAME`, `MESSAGE`, `LANG_ID`… |
| `lang.get(field, ext?)`                                     | a top-level value: `"EXT_NAME"`, `"CULTURE_CODE"`          |
| `lang.language()`                                           | the game's language, such as `"INT"`                       |
| `lang.languages()`                                          | the languages installed: `{ "CHN", "DEU", "FRA", ... }`    |
| `lang.load(ext?)` / `lang.unload(ext?)` / `lang.path(ext?)` | as for `assembly`                                          |

```lua
print(lang.message(bot.NAME_MSG_ID, "FRA"))
```

## Cost

A file is read the first time a mod asks for it (on 8.1, about 70 ms for assembly.dat and 15 ms
for Lang_INT.dat) and then stays loaded, shared by every mod. It takes about its file size in
memory: 21 MB for assembly.dat, 15 MB for Lang_INT.dat. Do the first lookup at a quiet moment,
such as when your script loads, not in the middle of a match. Call `unload()` once you are done
with a file.

The first lookup by a given table and field builds an index of that field, so later lookups by
it are instant. `find` with a table of fields uses the index of one field and checks the others
row by row.

On older clients (0.x) the files use different field numbering. The runtime reads the field
names from the game's own `MctsInterface.dll`, so the same names work there.
