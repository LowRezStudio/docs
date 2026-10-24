---
title: Mod repository
description: What Tempest mods are, what they can change in Paladins, and how to browse, install and publish them through mods.lowrezstudio.com.
---

# Mod repository

[mods.lowrezstudio.com](https://mods.lowrezstudio.com) is where Tempest mods are published. The
launcher reads it directly, so installing a mod is one click, and publishers upload their `.tempest`
packages there for review.

## What a mod is

A Tempest mod is a `.tempest` package: a folder with a `manifest.toml` that gives the mod its id,
name, version and authors, packed into a single file. Inside, a mod can ship any mix of:

- **Game files**: textures, sounds, UPK packages and config files that replace or add to the
  game's own. Skin packs and sound swaps are asset mods.
- **Lua scripts**: a `scripts/` folder run by the [Lua scripting](/lua/introduction) runtime,
  with live access to the game's objects. Scripts can hook game functions, add console commands
  and key bindings, and draw an in-game UI.
- **DLLs**: native code the launcher loads into the game.

Older package formats (native packages, asset and voice packs) still install alongside the
current ones.

## Mods and instances

Mods are installed per instance, so each Paladins patch you have downloaded keeps its own set.
Every version of a mod in the repository lists the patches it is compatible with, and the launcher
only offers mods that match the instance you are browsing from. Installed mods can be enabled
and disabled without removing them, and the launcher tells you when a newer version is available.

## Safety

Mods with Lua scripts or DLLs run code on your machine, so they must be signed by their publisher,
and a moderator reads the code before the mod is listed. Asset-only mods are published straight
away. The launcher shows who signed each mod and asks before installing one from a signer the team
has not vetted.

## Guides

- [Installing mods](/mods/installing): from the launcher, the website or the command line.
- [Publishing mods](/mods/publishing): pack, sign and upload your own `.tempest` package.
- [Trust and moderation](/mods/trust): signer labels, the review queue and reporting a mod.
- [Command line](/tempest/cli): the `tempest mod` commands for managing mods from a terminal.

Want to write a script mod? Start with [Lua scripting](/lua/introduction). New mods are also
featured on the [blog](/blog/).
