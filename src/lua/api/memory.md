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

- `opts.args` is how many arguments the handler sees (default 4, at most 8), or a list of kinds,
  one per position: `"int"` (also `"ptr"`), `"f32"`, `"f64"`. On Win64 integers travel in RCX, RDX,
  R8, R9 and then the caller's stack slots; a float at position 0 to 3 travels in XMM0 to XMM3 and
  is read from there when the position is declared as a float. For a C++ method, `this` is the
  first argument.
- `opts.conv` is the calling convention, which matters on the **Win32** client only (Win64 has a
  single one and ignores it): `"cdecl"` (default) and `"stdcall"` pass everything on the stack,
  `"thiscall"` passes `this` in ECX, `"fastcall"` the first two integers in ECX and EDX. The eight
  visible positions are stack dwords there, an `f64` taking two of them, and the convention also
  decides who pops the arguments, so every hook on one address must declare the same `conv`,
  `args` and `ret`.
- `opts.ret` types the result: `"int"` (default), `"f32"` or `"f64"`. A float result is placed in
  XMM0 on Win64 and in ST(0) on Win32, where the caller expects it.

```lua
-- float __fastcall GetDamageScale(APawn* self, float base, int type)
memory.hook(addr, function(original, self, base, kind)
  return original(self, base * 2, kind)       -- base arrives from XMM1 as a Lua number
end, { args = { "ptr", "f32", "int" }, ret = "f32" })
```

- `original(...)` runs the real function (or the next hook on the same address). Arguments that
  are `nil` or missing keep the caller's values, so `original()` is a plain pass-through. It is
  only valid while the handler runs; stash it and calling it later raises.
- The handler's return value decides what the caller gets: a number (or a boolean or an Object,
  taken as its pointer) becomes the result, converted by `opts.ret`; `nil` means "whatever
  `original` returned", or, when `original` was never called, the hook runs it for you with the
  incoming arguments. A Lua error in the handler is logged and the call goes through untouched.

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

### `memory.hooks()` → `{ { id, addr, mod, args, conv }, ... }`

Every active address hook. `tempest.status().address_hooks` is the same list.

## Raw calls

### `memory.call(addr, ...)` → number

Calls the function at `addr` with up to eight arguments: integers, booleans (`1`/`0`), Objects
(their pointer), and `memory.f32(x)` / `memory.f64(x)` for floats, which go to the XMM register
of their position on Win64 and to the stack on Win32. The result is an integer unless the last
argument is a table with `ret = "f32"` or `ret = "f64"`; the same table takes `conv` for the Win32
calling convention (`"cdecl"` default, `"stdcall"`, `"thiscall"` with `this` as the first
argument, `"fastcall"`). Calling a hooked address runs its hooks, like any other caller would.

```lua
local scaled = memory.call(scale_fn, pawn, memory.f32(1.5), { ret = "f32" })
local name = memory.call(get_name, actor, buf, { conv = "thiscall" })   -- actor->GetName(buf) on Win32
```

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

## Typed access

### `memory.read_c(addr, ctype)` / `memory.write_c(addr, ctype, value)`

Read or write through a LuaJIT FFI type after checking that the bytes are readable:
`memory.read_c(p, "uint64_t")` returns an exact 64-bit value as cdata (the plain readers return
doubles, exact only up to 2^53), `memory.read_c(p, "ImVec2")` a struct, and any type declared
with `ffi.cdef` works. `memory.readable(addr, len)` is the check on its own.

## Example: a struct reflection returns as an address

```lua
local addr = pawn.SomeNativeStruct      -- an integer when the struct has no script fields
local hp = memory.read_f32(addr + 0x10)
memory.write_f32(addr + 0x10, hp * 2)
```

`obj:prop("SomeNativeStruct")` reports the property's offset and size, which helps compute such
addresses; `obj:ptr()` gives the object's base.
