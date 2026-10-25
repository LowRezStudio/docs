---
title: Command line
description: The Tempest CLI — install, remove and publish mods from the terminal with the tempest command that ships with the launcher.
---

# Command line

The launcher bundles the Tempest CLI and makes it available in your terminal as `tempest`.

## Installing the command

- **Windows and Linux**: set up automatically the first time the launcher runs. If the command
  is not found, reinstall it from **Settings → Advanced → Terminal command** and open a new
  terminal.
- **macOS**: install it from **Settings → Advanced → Terminal command**. It may ask for
  administrator permission to place the command in `/usr/local/bin`.

The command points at the copy bundled with the launcher, so it stays up to date with the app
and its `mod` commands always match what the launcher does.

## Commands

```text
tempest mod list <game folder>          installed mods
tempest mod install <game folder> x     install a .tempest file or repository id
tempest mod remove <game folder> <name> remove a mod
tempest mod enable/disable ...          toggle a mod
tempest mod search <words>              search the repository
tempest mod login / publish ...         publish to the repository
tempest mod gen-key / sign / sign-text  package signing and key verification
tempest marshal ...                     token/assembly tooling used by instance setup
```

Run `tempest --help` and `tempest mod --help` for the full reference.

## Examples

Install a mod from a file, or the newest repository version compatible with the instance:

```text
tempest mod install "C:\Games\Tempest\0.57" my-mod.tempest
tempest mod install "C:\Games\Tempest\0.57" hud-plus --patch 0.57
```

Pack and publish a mod you are developing (see [publishing mods](/mods/publishing)
for the full publishing flow):

```text
tempest mod pack ./my-mod my-mod.tempest
tempest mod sign my-mod.tempest
tempest mod publish my-mod.tempest --from 0.56 --summary "What it does"
```
