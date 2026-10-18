---
title: Scripting limitations and troubleshooting
description: What Tempest.Scripting cannot do yet, and how to read its log when something does not resolve or a script misbehaves.
---

# Limitations and troubleshooting

## Limitations

- **Paladins 8.1 (Win64 and Win32) and OB57 (Win32) are the tested versions.** Engine signatures
  and engine-core layouts are pinned per client; other versions may work but are untested. On a
  version where a signature fails the log says which one, and nothing hooks.
- **Win32 panics end the game.** The 32-bit DLL is built with `panic = "abort"` (its toolchain
  cannot unwind Rust panics), so an internal runtime fault closes the game instead of being
  logged. Lua errors are unaffected on both clients.
- **Maps cannot grow.** `map:set` replaces the value of an existing key; inserting keys would need
  the engine's set re-hash.
- **Spawning** follows engine rules by default: `bStatic` and `bNoDelete` classes (lights, static
  meshes) return `nil`. `tempest.spawn(..., { force = true })` lifts the two flags around the call.
- **`dllimport` parameters are what UDK allows**: `int`, `float`, `byte`, `bool`, `string` and
  structs of those. For object references give the function a stub body instead of `dllimport`;
  `tempest.native` handles both.
- **Address hooks need the signature.** `memory.hook` sees integers unless a position is declared
  `f32`/`f64`; floats past the fourth argument come from stack slots. On Win32 the hook also needs
  the calling convention (`opts.conv`), and every hook on one address must declare the same one.
  Handlers run on the calling thread, not necessarily the game thread.
- **Input** covers keyboard, mouse buttons and wheel. No gamepad.
- **Numbers are doubles** (LuaJIT). Addresses and object pointers are exact, but
  `memory.read_u64` of arbitrary data loses precision above 2^53 (use `ffi` for 64-bit arithmetic),
  and `tostring` prints a large address in exponent form: format addresses with `%x`.
- **UI** widgets are only valid inside a draw handler (immediate mode). The Win64 client renders
  with D3D11, the Win32 client with D3D9; both are supported.
- **No DLL unload.** The runtime stays until the game exits; scripts reload, the DLL does not.
- **One runtime per process.** If several mods ship the DLL, the first one loaded runs everything
  and the others log that they are idle.

## Troubleshooting

The log is `%TEMP%\tempest-scripting.log`. The console window shows the same lines. Both are
settings in `<game>/ChaosGame/Config/tempest.toml` (`[runtime] log` and `console`); the environment
variables `TEMPEST_SCRIPT_LOG=<path>` and `TEMPEST_SCRIPT_CONSOLE=0` override them.

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
| `memory.hook: cannot detour 0x...`                                       | the address is not a relocatable function entry (mid-function, jump target, too short)           |
| `X has no Lua implementation (tempest.native); returning zero`           | a `dllimport` function ran before (or without) a `tempest.native` handler for it                 |
| `[mod] hook #N on 0x... failed: ...`                                     | a Lua error in an address hook; the original function ran instead                                |
| `address hook on 0x... panicked; running the original`                   | a runtime bug in the hook path; the game call still went through, please report the log          |
| `X has no property \`Y\``                                                | typo, or the property only exists on a subclass; check `obj:class():path()` and `obj:prop("Y")`  |
| `no game window yet; will keep looking`                                  | key bindings wait for the game window; normal during startup                                     |
| `waiting for d3d9.dll or d3d11.dll to load`                              | the UI hooks poll for the renderer; `IDXGISwapChain::Present detour live` follows                |
| `[mod] draw handler #N failed: ...`                                      | a Lua error in a `ui.on_draw` handler; logged once per distinct message, the UI keeps running    |
| `imgui assertion failed: ...`                                            | an internal ImGui assertion, logged instead of aborting; please report the log                   |
| `another Tempest.Scripting instance already runs`                        | a second mod ships the DLL; harmless                                                             |
| `game folder unknown ...; using defaults`                                | the DLL was not injected from `<game>/Binaries/Win64` or `Win32`; set `TEMPEST_GAME_DIR`         |
| `[hot] <file> changed (<mod>)`                                           | hot reload noticed a save; the mod reloads after the quiet period                                |
| `[config] [mod] wrote defaults to ...`                                   | first run of a mod that calls `tempest.config`; edit that file                                   |
| `[VEH][crash] ACCESS_VIOLATION ...`                                      | the game faulted; the address and the last script line before it narrow it down                  |

Useful checks from the DLL console or `lua` in the game console:

```lua
=tempest.status().notes            -- anything that failed to resolve
=tempest.status().subscriptions    -- every hook, with its owning mod
=tempest.status().native_hooks     -- natives currently hooked
=memory.hooks()                    -- address hooks, with their owning mod
=ui.stats()                        -- UI frames built vs rendered (ui_status in the game console)
=tempest.local_player()            -- nil outside a match
=tempest.local_player():prop("Pawn")
```

## Reporting a problem

Attach the log from the start of the session (`tempest-scripting.prev.log` if the game was
restarted since), the mod's scripts, and the game version. The
`resolve` lines at the top identify the build; the last lines before a crash identify the script.
