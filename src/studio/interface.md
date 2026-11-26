---
title: The interface
description: The Tempest Studio window - header, views, tabs, panes, the command palette and the status bar.
---

# The interface

![Tempest Studio with a mod open: the header on top, the activity bar on the left, the game files, the objects of a package, and a selected texture with its preview and properties](/studio/interface.webp)

The header runs along the top, the activity bar down the left side, and the current view fills the
rest. The status bar at the bottom shows the open file, its object count and how long it took to
read.

## Header

From left to right:

- **Back / Forward**: retrace where you went, across packages, game data rows and maps alike.
  Alt+← and Alt+→ or the mouse side buttons do the same.
- **Game folder** (the game's version, here _8.1_): open another game folder or a recent one.
- **Your mod**: its name and save state (**saving…**, **saved**, or **not saved** in red when the
  mod could not be written). Its menu has **Save now**, **Build the mod…**, **Show the mod's
  folder**, **Open mod-files/**, and **Discard all changes…**. Before you name a mod, your changes
  go into an unnamed draft, and the menu offers **Name this mod…** or **Open a mod…**. See
  [Projects and saving](/studio/projects).
- **Create** (Ctrl+N): make something new, a skin, an ability, a texture or a sound, with a
  step-by-step wizard.
- **The search field** (Ctrl+K) finds champions, game data tables, game files, UI movies, objects
  and commands (see [Command palette](#command-palette)).
- **Undo / Redo** (Ctrl+Z, Ctrl+Shift+Z) take back the last change of what you are looking at, or
  put it back.
- **Changes (n)**: the files with changes. Click it for the list; open a file from it, or throw its
  changes away.
- **Build mod** (Ctrl+6) opens the mod cooker: what your changes become, with build, install and
  publish.

## Views

The activity bar on the left switches between the views:

| View       | Shortcut | What it is for                                                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| **Start**  | Alt+1    | What do you want to change: champions' looks, stats, sounds, maps, menus, or something new.                        |
| **Champs** | Ctrl+1   | Each champion's skins, abilities, cards, talents and game files.                                                   |
| **Files**  | Ctrl+2   | Every package: textures, meshes, materials, sounds, UI and scripts. See [Packages](/studio/packages).              |
| **Data**   | Ctrl+3   | The content tables (items, abilities, cards, skins, loot…) and the game's texts. See [Assembly](/studio/assembly). |
| **Sounds** | Ctrl+4   | Every sound bank, or a champion's or item's sounds: listen, edit, export and replace.                              |
| **Maps**   | Ctrl+5   | A map in 3D with its scripts (Kismet) and cutscenes (Matinee). See [Maps](/studio/maps).                           |
| **Mod**    | Ctrl+6   | The mod cooker. See [Building mods](/studio/mod-cooker).                                                           |

At the bottom are the keyboard shortcut list (**Keys**, F1) and **Settings** (Ctrl+,). Tools that
work on the open package or the game data (find and replace, batch import, check a package, new
content, the champion vendor, skin collections…) are commands: find them in the command palette.

## Tabs

Every tab remembers one place: an object of a package, a table (and row) of the assembly, a map
(with its selected actor or Kismet sequence) or the mod cooker. Moving around, switching views
included, changes the current tab, so a tab left on the mod cooker comes back to it. To keep a place and open another next to it, **Ctrl+click** (or
middle-click) a package, an object, a reference, a search result or a usage: it opens in a new tab.

Ctrl+T duplicates the tab, Ctrl+W closes it, Ctrl+Tab and Ctrl+Shift+Tab cycle through them. A dot
on a tab means its file has edits.

## Right-click menus

Right-click (or press the keyboard's menu key, or Shift+F10) for the actions of what is under the
pointer:

| Where                           | What the menu offers                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A package                       | Open, open in a new tab, export a copy or discard its edits, copy its path, show it in the file manager.                                                                       |
| An object of the export tree    | Open in a new tab, export, replace, extract the raw data, rename, duplicate, copy to another package, delete, copy its path.                                                   |
| A tab                           | Close, close the other tabs, close the tabs to the right, duplicate.                                                                                                           |
| An assembly row                 | Edit the cell, copy the value, copy the rows (or as TSV), paste, duplicate, new row, open in a new tab, delete. Right-clicking one of several marked rows acts on all of them. |
| An assembly table               | Open, open in a new tab, copy its name, show the file.                                                                                                                         |
| A file in the mod cooker        | The same actions as its **…** button.                                                                                                                                          |
| A search result                 | Open, open in a new tab, copy the object path, show the package.                                                                                                               |
| A recent project or game folder | Open (or in a new window), show it in the file manager, copy its path, remove it from the list.                                                                                |

## Command palette

Everything the Studio can do is a command, and the palette finds them by name:

- **Ctrl+K**: search champions, game data tables, game files, UI movies, objects and commands at
  once.
- **Ctrl+Shift+P**: run a command, filtered by name.
- **Ctrl+P**: go to a package or a game data table.
- **Ctrl+Shift+O**: go to an object of the open package, or in the game data the rows containing a
  text.
- **Ctrl+Shift+F**: search every package of the folder for objects by name. **Ctrl+F** filters what
  is on screen (the package's objects, the table's rows, the map's actors, the sound events).

On macOS, use Cmd instead of Ctrl. Commands show their shortcut, so the palette is also the easiest
way to learn them.

## Panes

Views are made of panes. Drag a border to resize it (or focus it and use the arrow keys);
double-click resets it. Sizes are remembered. **Ctrl+B** hides the left pane and **Ctrl+J** the
details pane. In a narrow window (under about 1100 pixels) the side panes become overlays.

**Ctrl+=**, **Ctrl+-** and **Ctrl+0** zoom the whole interface, which helps on small or very large
screens.

## Windows

**New window** (Ctrl+Shift+N) opens a second window, which can work on another game folder or
project. A `.upk` or `.twrk` file opened from your file manager goes to the window in front.

## Confirmations and notifications

Anything that throws work away (discarding edits, deleting objects or rows, replacing an existing
build) asks first in a dialog. Results and errors appear as notifications in the corner; errors stay
longer, and every notification can be closed.

## Settings

**Settings** (the gear at the bottom of the activity bar, or Ctrl+,) holds:

- **Updates**: your version, **Check now**, and whether to check when the Studio starts. When a new
  version is out it shows what changed, **Download**, then **Restart to update**.
- **Appearance**: dark or light theme, and the zoom of the whole window.
- **Warnings**: turn the warning before saving into the game folder back on (or off).
- **Signing and publishing**: your signing key and mod repository API key, the same as in the
  [mod cooker](/studio/mod-cooker#signing-and-publishing).
- **Automation**: the [MCP server](/studio/automation).
- **Recent lists**: clear the recent projects or game folders.
