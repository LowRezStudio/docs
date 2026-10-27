---
title: Tempest Studio
description: Tempest Studio is a desktop editor for Paladins packages, textures, meshes, sounds, scripts and the game's content database.
---

# Tempest Studio

Tempest Studio is a desktop editor for the game's files. It opens the UPK packages of a Paladins
install, previews and replaces their assets, edits the content database (`assembly.dat`) and the
language files, and exports the result as a launcher mod. It runs on Windows, macOS and Linux.

Download it from the
[Tempest releases](https://github.com/LowRezStudio/Tempest/releases) (look for **Tempest Studio**).

## Getting started

Open a game folder (the `CookedPCConsole` folder of an instance) from the welcome screen. The left
pane lists its packages; pick one to see its exports as a tree and select an export to inspect it.
You can also open a single `.upk` from anywhere with **Open file** or by opening it from your file
manager.

Changes stay in memory until you **Save** (in place, compressed like the original) or **Save as**.
**Undo** (Ctrl+Z) keeps the last 50 changes per package, even after saving. **Discard** reloads the
package from disk. **New window** (Ctrl+Shift+N) opens another game folder side by side.

## Packages

- **Properties**: every property of an export, editable, with references as links. Back and
  Forward (Alt+←/→ or the mouse side buttons) retrace the links you followed.
- **Textures**: preview any mip, export to PNG or DDS, replace from PNG or DDS.
- **Materials**: a lit preview with the resolved textures, the parent chain and the parameters.
  Scalar and vector parameters are editable.
- **Meshes**: a 3D viewer (LOD, textures, wireframe, skeleton). Export to glTF, FBX or OBJ, and
  replace from the same formats, static and skeletal.
- **Sounds**: play, export, replace (Ogg, WAV, wem) and edit: trim, fade, gain, normalise.
- **Wwise audio**: events and banks show what they play; media can be played, exported, replaced
  and edited the same way.
- **Particles**: a live preview of a particle system and a curve editor for its modules.
- **Movies** (Scaleform UI): edit text fields and ActionScript strings, rename image references.
- **Scripts**: a **Source** tab on classes and functions shows the decompiled UnrealScript. Edit it
  and **Compile** to rebuild the package.
- **Search** across every package of the folder, **Replace** (Ctrl+H) text and references across a
  package, and **Batch import** a folder of `<package>.<object>.<ext>` files in one go.
- **Replace…** on any export also accepts its raw serialized data, the inverse of Extract raw.

## Assembly

The **Assembly** mode edits `assembly.dat` and the `Lang_*.dat` files: champions, devices, items,
cards, skins and their texts in every language. The grid filters and sorts, id columns link to the
rows they reference, and the row pane edits every field and its messages.

- **New content…** clones a champion, device, card, item or skin with fresh ids and new name and
  description messages. Set an **id range** in the dialog so mods made by different people never
  use the same ids.
- **Champion Vendor…** lists champions missing from the vendor table (a champion without an entry
  never shows in the lobby) and adds them.

## Exporting a mod

**Export mod…** (Assembly) and **Mod folder** (Packages) write a launcher mod folder with a
`manifest.toml` and your changes. Wherever the Studio recorded the original file, changes are
written as [deltas](/mods/deltas), so your mod only carries what you changed and can be installed
next to other mods editing the same files. For new champions and devices the export also writes
script stubs, a `scripts/main.lua` and the rows a private server needs.

Pack and publish the folder as described in [Publishing mods](/mods/publishing).

## Automation

The plug icon in the toolbar starts an MCP server on `127.0.0.1`, so an AI assistant such as Claude
Code can drive the Studio: open packages, call any backend method, take screenshots. The dialog shows
the command to register it.
