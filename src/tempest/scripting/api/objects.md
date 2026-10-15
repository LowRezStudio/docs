---
title: Objects and containers reference
description: Reference for the Object, Method, Params, Struct, Array, and Map proxies that Tempest.Scripting exposes over live Paladins game memory.
---

# Objects and containers

Proxies are handles into live game memory. They are cheap to create, compare by address, and
never copy data unless the type says so (Vector and Rotator come back as plain tables).

## Object

A `UObject`. Returned by every lookup, every object-typed property, and as `this` in handlers.

### Properties

```lua
pc.Pawn                       -- read: Object, nil, number, string, table or proxy by kind
pc.Pawn.Location              -- Vector -> { x, y, z } (a copy)
pawn.Location = { x = 1, y = 2, z = 3 }
pri.PlayerName = "Kyiro"      -- strings grow through the engine allocator
pc.bGodMode = true            -- bitfield bools write in place
weapon.Owner = pc             -- object references take an Object or nil
```

An unknown property reads as `nil` and logs once per call site; assigning to one raises an error.
Assigning a table to a struct property sets its fields one by one; assigning another Struct proxy
of the same type copies it.

### Functions

```lua
pc:ClientMessage("hi")                  -- call by name, colon syntax
local name = pc:GetHumanReadableName()  -- return value comes back
local a, b = obj:SomeFunc(x)            -- return value first, then out params
pc:call("ClientMessage", "hi")          -- same, when the name is dynamic
```

`obj.Func` without a call gives a [Method](#method). Omitted trailing optional arguments get their
UnrealScript defaults; passing `nil` passes a zero value. String arguments are engine-allocated for
the call.

### Methods

| method                | returns                                                                   |
| --------------------- | ------------------------------------------------------------------------- |
| `obj:ptr()`           | address as an integer                                                     |
| `obj:name()`          | object name, e.g. `TgPlayerController_0`                                  |
| `obj:path()`          | `Outer.Name` path, e.g. `Engine.PlayerController`                         |
| `obj:full_name()`     | `Class Outer.Name`, e.g. `Class Engine.PlayerController`                  |
| `obj:class()`         | the class object                                                          |
| `obj:outer()`         | the outer object                                                          |
| `obj:is_a(class)`     | `true` if the object's class derives from `"Pkg.Class"` or a class object |
| `obj:has(name)`       | `true` if the class declares a property or function `name`                |
| `obj:prop(name)`      | `{ class, kind, offset, size, ext, ext_name }` for a property, or `nil`   |
| `obj:call(name, ...)` | calls function `name`                                                     |
| `obj:map(name, k, v)` | a [Map](#map) over a `var native Map{}` property, see below               |

`tostring(obj)` is `Object(0x... <full name>)`. Two proxies are equal when they point at the same
object.

## Method

A function bound to an object, from `obj.Func`. Call it with a colon: `obj:Func(...)`.

| method       | returns                                                      |
| ------------ | ------------------------------------------------------------ |
| `m:native()` | `true` for native (C++) functions                            |
| `m:params()` | list of `{ name, kind, out, ret }` describing each parameter |

## Params

The argument frame of a hooked call, passed as the second handler argument. It is live: in a
`before` handler, assignments change what the game sees.

```lua
tempest.before("Engine.PlayerController.ConsoleCommand", function(pc, params)
  print(params.Command)          -- by name
  print(params[1])               -- by 1-based position
  params.Command = "stat fps"    -- rewrite before the native runs
end)

tempest.on("Engine.Controller.GetHumanReadableName", function(c, params)
  print(params.ReturnValue)      -- readable after the call
end)
```

| field / expression   | meaning                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `params.Name`        | the parameter called `Name`                                            |
| `params[i]`          | the i-th parameter in declaration order                                |
| `params.names`       | list of parameter names                                                |
| `params.ReturnValue` | the return value (readable in `on`; settable in a cancelling `before`) |
| `#params`            | number of parameters                                                   |

`tostring(params)` prints every parameter with its current value, which `tempest.trace` uses.

## Struct

A live view of a struct property other than Vector and Rotator, for example a key binding entry
or a damage event.

```lua
local b = pc.PlayerInput.Bindings[1]   -- Struct(KeyBind)
print(b.Name, b.Command)
b.Command = "Jump"
for _, f in ipairs(b:fields()) do print(f) end
```

| method        | returns                                     |
| ------------- | ------------------------------------------- |
| `s.Field`     | field read, same kinds as object properties |
| `s.Field = v` | field write                                 |
| `s:fields()`  | field names in declaration order            |
| `s:size()`    | struct size in bytes                        |
| `s:addr()`    | address                                     |

Assigning a table to a struct-typed property or array element sets the listed fields.

## Array

A live view of a `TArray`. Indexing is 1-based like Lua.

```lua
local binds = pc.PlayerInput.Bindings
print(#binds)
print(binds[1].Name)
for i, b in ipairs(binds) do ... end       -- or binds:items()
binds[1] = { Name = "F1", Command = "Jump" }
binds:add({ Name = "F2", Command = "Fire" })   -- grows through the engine allocator
binds:remove(#binds)
binds:clear()
```

| expression      | meaning                                                                   |
| --------------- | ------------------------------------------------------------------------- |
| `#arr`          | element count                                                             |
| `arr[i]`        | element `i` (Object, Struct, number, string... by element kind)           |
| `arr[i] = v`    | overwrite element `i`                                                     |
| `arr:add(v)`    | append; with no argument appends a zeroed element; returns the new length |
| `arr:remove(i)` | remove element `i`, shifting the rest                                     |
| `arr:clear()`   | remove everything                                                         |
| `arr:items()`   | iterator for `for i, v in arr:items() do`                                 |
| `arr:kind()`    | element kind name                                                         |
| `arr:addr()`    | address                                                                   |

Elements of arrays of structs are Struct proxies into the array's storage. Hold on to the index
rather than the proxy across `add` calls, since growth can move the storage.

## Map

A view of a `TMap`. Reads are complete; writes are limited to replacing the value of an existing
key, because inserting would require re-hashing the engine's set.

```lua
-- Most Paladins maps are declared `var native Map{...}`; reflection records no pair
-- types for those, so name them (defaults: "name" keys, "object" values).
local scenes = hud.m_pMovie:map("m_Scenes", "name", "object")
print(#scenes)
print(scenes["UIHudCenter"])          -- or scenes:get("UIHudCenter")
for k, v in scenes:pairs() do print(k, v) end
scenes:set("UIHudCenter", otherScene) -- existing keys only
```

Kinds accepted by `obj:map`: `int`, `float`, `byte`, `name`, `str`, `object`, and
`struct:Pkg.Name`. Maps whose pair types reflection does know are returned directly by `obj.Prop`.

| expression                 | meaning                                 |
| -------------------------- | --------------------------------------- |
| `#map`                     | number of live entries                  |
| `map[key]`, `map:get(key)` | value for `key`, or `nil`               |
| `map:pairs()`              | iterator over a snapshot of the entries |
| `map:set(key, v)`          | overwrite the value of an existing key  |
| `map:addr()`               | address                                 |
