---
title: memory API reference
description: Raw memory reads, writes, signature scanning, address hooks, and raw calls from Lua in Tempest.Scripting, for anything reflection does not describe.
---

# `memory`

Raw access to the game process. Reflection covers almost everything; reach for this table only
for data reflection does not describe (a struct returned as an address, native-only fields,
pattern scanning) or for C++ code that is not a UnrealScript function at all (address hooks and
raw calls). Addresses are integers. Reads return `nil` for a null address or an unreadable page;
writes return `false` on failure.

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

## Address hooks

`tempest.before` and `tempest.on` hook UnrealScript functions by name. Everything else in the
executable (engine C++ such as package loading, the Hi-Rez network layer, a native's own
implementation) has no name at runtime, only an address. `memory.hook` detours such a function
once you have its address, from `memory.scan`, from a pointer the game stores (a vtable slot, a
`UFunction`'s `Func` field), or from your own reverse engineering.

### `memory.hook(addr, fn, opts)` → id

Replaces the function at `addr` with `fn`. The handler receives the function's arguments as
integers and a callable `original`:

```lua
local id = memory.hook(addr, function(original, this, name, flags)
  print(string.format("called with %s", memory.read_wstr(name)))
  local result = original(this, name, 0)   -- run the real function with a changed third argument
  return result                            -- the caller gets this
end, { args = 3 })
```

- `opts.args` is how many arguments the handler sees (default 4, at most 8). On Win64 these are
  the integer registers RCX, RDX, R8, R9 and then the caller's stack slots, whatever the real
  function declares. For a C++ method, `this` is the first argument. Float arguments and float
  results travel in XMM registers and are not visible.
- `original(...)` runs the real function (or the next hook on the same address). Arguments that
  are `nil` or missing keep the caller's values, so `original()` is a plain pass-through. It is
  only valid while the handler runs; stash it and calling it later raises.
- The handler's return value decides what the caller gets: an integer (or a boolean or an Object,
  taken as its pointer) becomes the result; `nil` means "whatever `original` returned", or, when
  `original` was never called, the hook runs it for you with the incoming arguments. A Lua error
  in the handler is logged and the call goes through untouched.

Several mods can hook the same address; the newest handler runs first and reaches the older ones
through `original`. There is no limit on how many addresses can be hooked: each one gets a small
stub generated at runtime. A hooked address stays bound to its stub after `memory.unhook`
(disabled) and is reused by the next hook on it.

The target must be a function entry point: the detour relocates the first few instructions, and
`memory.hook` raises when they cannot be moved (a jump target, a very short function) or when
the address is not readable code.

Handlers run on **whatever thread called the function**, not necessarily the game thread, and
they hold the Lua lock while they run. Keep them short, avoid touching game objects from a hook
on render or loading code, and do not hook hot paths such as the allocator: every call makes a
round trip through Lua.

### `memory.unhook(id)` → boolean

Removes a hook; `false` when the id is unknown. A mod's hooks are also removed when the mod is
reloaded.

### `memory.hooks()` → `{ { id, addr, mod }, ... }`

Every active address hook. `tempest.status().address_hooks` is the same list.

## Raw calls

### `memory.call(addr, ...)` → integer

Calls the function at `addr` with up to eight integer arguments (booleans and Objects are
accepted and passed as `1`/`0` and the object pointer) and returns its integer result. Floats are
not supported in either direction. Calling a hooked address runs its hooks, like any other
caller would.

```lua
local load_package = memory.scan("...")[1]          -- a resolved engine function
local path = memory.alloc(1024)
memory.write_wstr(path, [[C:\Games\Paladins\ChaosGame\CookedPCConsole\MyMod.upk]])
local pkg = tempest.object(memory.call(load_package, 0, path, 0))
memory.free(path)
```

### Buffers for pointer arguments

| function                     | effect                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `memory.alloc(size)`         | a zeroed buffer of `size` bytes (1 byte to 16 MiB); returns its address      |
| `memory.free(addr)`          | releases a buffer from `memory.alloc`; `false` if it was not one             |
| `memory.write_str(addr, s)`  | writes `s` as a NUL-terminated ANSI string                                   |
| `memory.write_wstr(addr, s)` | writes `s` as a NUL-terminated UTF-16 string (what `TCHAR*` parameters take) |

The writers return `false` instead of faulting when the destination is neither one of these
buffers nor committed memory. `tempest.object(ptr)` turns a `UObject*` that came back from a
call or a hook argument into an [Object](./objects#object) proxy.

## Example: a struct reflection returns as an address

```lua
local addr = pawn.SomeNativeStruct      -- an integer when the struct has no script fields
local hp = memory.read_f32(addr + 0x10)
memory.write_f32(addr + 0x10, hp * 2)
```

`obj:prop("SomeNativeStruct")` reports the property's offset and size, which helps compute such
addresses; `obj:ptr()` gives the object's base.
