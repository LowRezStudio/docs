---
title: Mod repository
description: What Tempest mods are, what they can change in Paladins, and how to browse, install and publish them through mods.lowrezstudio.com.
---

# Mod repository

Tempest mods are published on [mods.lowrezstudio.com](https://mods.lowrezstudio.com). The launcher
reads the repository directly, so you can install a mod in one click. Publishers upload their
`.tempest` packages there for review.

## What a mod is

A Tempest mod is a `.tempest` package. It starts as a folder with a `manifest.toml` that sets the
mod's id, name, version and authors, and gets packed into a single file. A mod can ship any mix of
these:

- Game files: textures, sounds, UPK packages and config files that replace or add to the game's
  own. Skin packs and sound swaps are asset mods.
- Lua scripts in a `scripts/` folder, run by the [Lua scripting](/lua/introduction) runtime with
  live access to the game's objects. Scripts can hook game functions, add console commands and key
  bindings, and draw an in-game UI.
- DLLs, native code the launcher loads into the game.

Older package formats (native packages, asset packs and voice packs) still install next to the
current ones.

## Mods and instances

Each Paladins patch you download is its own instance with its own set of mods. Every version of a
mod in the repository lists the patches it works with, and the launcher only offers mods that
match the instance you're browsing from. You can disable an installed mod without removing it, and
the launcher tells you when a newer version is out.

## Safety

Lua scripts and DLLs run code on your machine. Mods that contain them have to be signed by their
publisher, and a moderator reads the code before the mod is listed. Asset-only mods go live right
away. The launcher shows who signed each mod and asks before installing one from a signer the team
hasn't vetted.

## Guides

- [Installing mods](/mods/installing) from the launcher, the website or the command line.
- [Publishing mods](/mods/publishing): pack, sign and upload your own `.tempest` package.
- [Trust and moderation](/mods/trust) explains the signer labels, the review queue and how to
  report a mod.
- [Mod deltas](/mods/deltas): how several mods can edit the same game file.
- [Tempest Studio](/studio/introduction), the editor for packages and the content database.
- [Command line](/tempest/cli) lists the `tempest mod` commands for managing mods from a terminal.

To make your own mods, start with [Lua scripting](/lua/introduction), which hooks the live game
without a compiler, or [UDK](/udk/getting-started) for UnrealScript and custom animations. New mods
also get written up on the [blog](/blog/).
