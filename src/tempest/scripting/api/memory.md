---
title: memory API reference
description: Raw memory reads, writes, and signature scanning from Lua in Tempest.Scripting, for anything reflection does not describe.
---

# `memory`

Raw access to the game process. Reflection covers almost everything; reach for this table only
for data reflection does not describe (a struct returned as an address, native-only fields, or
pattern scanning). Addresses are integers. Reads return `nil` for a null address or an unreadable
page; writes return `false` on failure.

## Module

| function        | returns                        |
| --------------- | ------------------------------ |
| `memory.base()` | base address of `Paladins.exe` |
| `memory.size()` | its image size                 |

## Reads

`memory.read_u8(addr)`, `read_u16`, `read_u32`, `read_u64`, `read_i8`, `read_i16`, `read_i32`,
`read_i64`, `read_f32`, `read_f64`, `read_ptr`.

| function                      | returns                                                      |
| ----------------------------- | ------------------------------------------------------------ |
| `memory.read_str(addr, max)`  | NUL-terminated ANSI string, at most `max` (256) bytes        |
| `memory.read_wstr(addr, max)` | NUL-terminated UTF-16 string, at most `max` (256) code units |

## Writes

`memory.write_u8(addr, v)`, `write_u16`, `write_u32`, `write_u64`, `write_i32`, `write_i64`,
`write_f32`, `write_f64`.

## Scanning

### `memory.scan(pattern, limit)` → integer[]

Finds `pattern` in the executable image and returns up to `limit` (default 16) absolute addresses.
The pattern is space-separated hex bytes with `?` wildcards, the usual IDA style:

```lua
local hits = memory.scan("48 8B 05 ? ? ? ? 4C 8B 04 0A")
```

Only committed, readable pages are scanned.

## Example: a struct reflection returns as an address

```lua
local addr = pawn.SomeNativeStruct      -- an integer when the struct has no script fields
local hp = memory.read_f32(addr + 0x10)
memory.write_f32(addr + 0x10, hp * 2)
```

`obj:prop("SomeNativeStruct")` reports the property's offset and size, which helps compute such
addresses; `obj:ptr()` gives the object's base.
