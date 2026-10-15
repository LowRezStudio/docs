---
title: Scripting limitations and troubleshooting
description: What Tempest.Scripting cannot do yet, and how to read its log when something does not resolve or a script misbehaves.
---

# Limitations and troubleshooting

## Limitations

- **Paladins 8.1 Win64 only.** The five engine signatures and the engine-core layouts are pinned
  to that build. On another version the log says which signature failed, and nothing hooks.
- **Maps cannot grow.** `map:set` replaces the value of an existing key; inserting keys would need
  the engine's set re-hash.
- **`out` parameters of hooked natives** are written back for plain kinds (numbers, names,
  objects, vectors). String and array `out` parameters are not.
- **Spawning** follows engine rules: `bStatic` and `bNoDelete` classes (lights, static meshes)
  return `nil`. Use the `*Spawnable` classes or a class of your own.
- **Unqualified hooks (`"Func"`) do not catch natives.** Natives are hooked per function and need
  `"Package.Class.Func"`.
- **64 native hooks** at a time per process.
- **Input** covers keyboard, mouse buttons and wheel. No gamepad.
- **No DLL unload.** The runtime stays until the game exits; scripts reload, the DLL does not.
- **One runtime per process.** If several mods ship the DLL, the first one loaded runs everything
  and the others log that they are idle.

## Troubleshooting

The log is `%TEMP%\tempest-scripting.log`. The console window shows the same lines. (Both can be
changed through the environment the game is launched with: `TEMPEST_SCRIPT_LOG=<path>` and
`TEMPEST_SCRIPT_CONSOLE=0`; a configuration file is planned.)

| symptom                                                                  | what it means                                                                                    |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| no log file at all                                                       | the DLL was not loaded; check the launcher's `[inject]` line and that the mod is enabled         |
| `xor signature not found` or any `... signature not found`               | wrong game version, or the executable changed                                                    |
| `GNames never became readable`                                           | the anti-cheat key table did not decode; game version mismatch                                   |
| `GEngine still null; running scripts anyway`                             | the game took more than two minutes to load the Engine package                                   |
| `ProcessInternal unresolved`                                             | script-function hooks are off; only engine events hook                                           |
| `cannot hook native X: has out params and GPropAddr is not resolved yet` | retried automatically once the game thread runs; a later line says `(deferred)` when it succeeds |
| `GPropAddr probe found nothing`                                          | out-param natives stay unhookable on this build                                                  |
| `[mod] handler for X failed: ...`                                        | a Lua error in that mod's hook; the call itself still ran                                        |
| `X has no property \`Y\``                                                | typo, or the property only exists on a subclass; check `obj:class():path()` and `obj:prop("Y")`  |
| `no game window yet; will keep looking`                                  | key bindings wait for the game window; normal during startup                                     |
| `another Tempest.Scripting instance already runs`                        | a second mod ships the DLL; harmless                                                             |
| `[VEH][crash] ACCESS_VIOLATION ...`                                      | the game faulted; the address and the last script line before it narrow it down                  |

Useful checks from the DLL console or `lua` in the game console:

```lua
=tempest.status().notes            -- anything that failed to resolve
=tempest.status().subscriptions    -- every hook, with its owning mod
=tempest.status().native_hooks     -- natives currently hooked
=tempest.local_player()            -- nil outside a match
=tempest.local_player():prop("Pawn")
```

## Reporting a problem

Attach the log from the start of the session, the mod's scripts, and the game version. The
`resolve` lines at the top identify the build; the last lines before a crash identify the script.
