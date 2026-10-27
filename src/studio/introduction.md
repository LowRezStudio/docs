---
title: Tempest Studio
description: Tempest Studio is a desktop editor for Paladins packages, textures, meshes, sounds, scripts and the game's content database, and it builds the result into a launcher mod.
---

# Tempest Studio

Tempest Studio is a desktop editor for the game's files. It opens the UPK packages of a Paladins
install, previews and replaces their assets, edits the content database (`assembly.dat`) and the
language files, and builds your changes into a `.tempest` mod the launcher can install. It runs on
Windows, macOS and Linux.

## Install

Download the latest **Tempest Studio** build from the
[Tempest releases](https://github.com/LowRezStudio/Tempest/releases): the `.exe` installer on
Windows, the `.dmg` on macOS, an AppImage, `.deb` or `.rpm` on Linux. The Studio is a separate app
from the launcher, but it uses the same mod format and the same signing key.

You also need a Paladins install. Any instance the launcher downloaded works: the Studio opens its
`ChaosGame/CookedPCConsole` folder, which holds every package of the game.

## Three ways to start

The welcome screen offers:

- **New mod project**: the recommended way to make a mod. A short wizard names the mod, picks the
  game folder and creates a project folder that keeps your edits until you come back. See
  [Your first mod](/studio/first-mod).
- **Open a project**: reopens a project (a `.twrk` file) where you left it.
- **Or just look around**: open a game folder or a single `.upk` file to browse and preview assets
  without making a mod.

Below them are your recent projects and game folders. The × next to an entry takes it off the list,
and **Clear** empties a list; the files themselves are not touched. A project that was moved or
deleted is taken off the list when you try to open it.

## How the Studio thinks about your changes

The Studio never changes the game's files behind your back. When you edit something, the change
lives in the Studio:

- **In a mod project** it is kept in the project file, which saves itself. The game folder stays
  untouched, so you can always compare with the original and build a clean mod.
- **Without a project** the file shows as _unsaved_ until you **Save** it into the game folder,
  **Export a copy** elsewhere, or **Discard** it.

When the mod is ready, the [mod cooker](/studio/mod-cooker) turns each changed game file into a
[delta](/mods/deltas): only the objects and table rows you changed. Deltas let your mod sit next to
other mods that edit the same files.

## Guide

- [Your first mod](/studio/first-mod): a walkthrough from an empty project to an installed mod.
- [The interface](/studio/interface): the header, views, tabs, the command palette and the panes.
- [Projects and saving](/studio/projects): what is saved where, undo, discard, workspace files and
  crash recovery.
- [Packages](/studio/packages): browsing packages and editing textures, materials, meshes, sounds,
  Wwise audio, particles, UI movies and scripts.
- [Assembly](/studio/assembly): champions, devices, cards, items, skins and their texts.
- [Building mods](/studio/mod-cooker): the mod cooker, signing, installing and publishing.
- [Keyboard shortcuts](/studio/shortcuts).
- [Automation](/studio/automation): let an AI assistant drive the Studio through MCP.
