---
title: The interface
description: The Tempest Studio window - header, views, tabs, panes, the command palette and the status bar.
---

# The interface

```text
┌ header: project menu · save state · Back/Forward · palette · Undo · edited files · Discard · Save/Build ┐
│ activity │ tabs                                                                                       │
│   bar    ├────────────────────────────────────────────────────────────────────────────────────────────┤
│          │ the current view: Packages, Assembly, Maps or Build the mod                                │
├──────────┴────────────────────────────────────────────────────────────────────────────────────────────┤
│ status bar: the open file, its size and state                                                         │
└───────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Header

From left to right:

- **Project menu**: in a mod project it shows the project name (with a hammer icon), otherwise the
  game folder. It holds **New mod project**, **Open project…**, the recent projects, **Open game
  folder…**, **Open package file…**, **New window**, and in a project **Show the project folder**
  and **Close the project**.
- **Save state** (projects only): **Saved**, **Saving…**, **Edited** (a save is coming in a moment)
  or **Not saved** in red when the project could not be written. Hover it for details; Ctrl+S
  retries.
- **Back / Forward**: retrace where you went, across packages and assembly rows alike. Alt+← and
  Alt+→ or the mouse side buttons do the same.
- **The search field** opens the command palette (see below).
- **Undo** reverts the last change of the file you are looking at; hover it to see what it undoes.
- **Edited files**: the number of files with edits. Click it for the list; each entry opens its file.
  In a project it reads _edited_ (kept in the project); without a project it reads _unsaved_.
- **Discard** throws away the edits to the current file, after asking.
- **Build mod** (in a project) opens the mod cooker. Without a project the button is **Save**, which
  writes the current file into the game folder. The arrow next to it has every save and discard
  action, each with a line explaining what it does.
- The sun/moon button switches between the dark and light theme.

## Views

The activity bar on the left switches between the views:

| View              | Shortcut | What it is for                                                                       |
| ----------------- | -------- | ------------------------------------------------------------------------------------ |
| **Packages**      | Ctrl+1   | Browse the game's packages and edit their objects. See [Packages](/studio/packages). |
| **Assembly**      | Ctrl+2   | Edit `assembly.dat` and the language files. See [Assembly](/studio/assembly).        |
| **Maps**          | Ctrl+4   | A map in 3D, its actors and its Kismet. See [Maps](/studio/maps).                    |
| **Build the mod** | Ctrl+3   | The mod cooker. See [Building mods](/studio/mod-cooker).                             |

Below them are **Search every package** (Ctrl+F), **Wwise audio**, and the **Tools** menu (for packages: find and replace, batch import, verify, rewrite, export class
sources, prepare a mod folder; for the assembly: new content, Champion Vendor, skin collections, export a mod,
reload). At the
bottom are the MCP server, the keyboard shortcut list (F1) and **Settings** (Ctrl+,).

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

- **Ctrl+K** (or Ctrl+Shift+P): run a command. Type `>` in the palette for the same.
- **Ctrl+P**: go to a package or an assembly table.
- **Ctrl+Shift+O**: go to an object of the open package, or filter the rows of the open table. Type
  `@` in the palette for the same.

Ctrl+Enter opens the result in a new tab. Commands show their shortcut, so the palette is also the
easiest way to learn them.

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
