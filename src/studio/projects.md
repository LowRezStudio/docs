---
title: Projects and saving
description: Where Tempest Studio keeps your edits - mod projects, saving into the game folder, exported copies, undo, discard, workspace files and crash recovery.
---

# Projects and saving

An edit in the Studio first lives in memory. What happens next depends on whether you work in a mod
project. If you are making a mod, use a project: it is the simplest and the safest.

## Mod projects

A project is a folder with three things in it:

| Path         | What it holds                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<id>.twrk`  | The project file: every edited package and `.dat` file (as [deltas](/mods/deltas) against the game folder's files), the mod details, your open tabs, history and pane layout. |
| `mod-files/` | Files shipped with the mod exactly as laid out: `scripts/main.lua`, `dlls/64/…`, `files/ChaosGame/…`. A README inside explains the layout.                                    |
| `builds/`    | The `.tempest` files you build, named `<id>-<version>.tempest`.                                                                                                               |

Create one with **New mod project** (welcome screen or the project menu). In a project:

- **Edits save themselves.** About a second and a half after a change, the project file is written.
  The header shows **Edited** while a save is pending, **Saving…**, then **Saved**. If saving fails
  (the folder was moved, the disk is full) it shows **Not saved** in red; Ctrl+S retries.
- **The game folder is never written.** Your edits stay in the project, so the game files remain the
  originals your mod is compared with. When you want to test without building a mod, **Write the
  edits into the game folder** (in the Save menu) overwrites the game's files after asking; the
  Studio remembers the originals first.
- **The project lists only its own files.** The mod cooker shows the game files you edited while
  the project was open, plus the ones you added to it, never unrelated edits made elsewhere.
- **Ctrl+S** saves the project immediately. Closing the project or opening another one finishes a
  pending save first.

To continue later, open the `.twrk` from the welcome screen, the project menu's recent list, **Open
project…** (Ctrl+Alt+O) or your file manager. The game folder opens, the edits are applied again and
you land where you were. **Close the project** returns to plain editing; the project stays saved.

::: tip
Moving the project folder is fine. The project file refers to the game folder by its path, so if the
game moves, the Studio asks where it is now.
:::

## Without a project

When you open a game folder directly, edited files are marked _unsaved_ and the header's main button
is **Save**:

- **Save** (Ctrl+S) writes the current file into the game folder, compressed like the original. The
  first time a file is saved in place, the Studio records what the original looked like, so the mod
  cooker can still make a delta later.
- **Export a copy…** (Ctrl+Shift+S) writes the file somewhere else. The edits stay unsaved in the
  Studio, and the copy is remembered as a modified version of its game file, so it shows up in the
  mod cooker.
- **Save all into the game folder** saves every unsaved file.
- **Save as a workspace file** (Ctrl+Alt+S) keeps everything for later without touching the game
  folder (see below).

## Undo and discard

- **Undo** (Ctrl+Z, outside text fields) reverts the last change of the current file. Each package
  keeps its last 50 changes, and undo still works after saving: undoing a saved change marks the
  file edited again. The history is lost when the package is closed or the Studio quits.
- **Discard** (header button) throws away every edit to the current file and reloads it from disk.
- **Discard all changes** (Save menu, or the edited-files list) does the same for every file.
- The mod cooker's **…** menu on a file has **Discard my edits to this file…**.

Every discard asks first. Discarding in a project also removes the edits from the project file.

## Workspace files

A `.twrk` file holds a whole working session: the unsaved packages and `.dat` files, and where you
were (the open package and object, the assembly table and row, tabs, history, panes, the mod
details). A mod project is a linked workspace file with a folder around it; you can also save one on
its own with **Save as a workspace file**. The first time, you choose the kind:

- **Linked**: small (kilobytes). It stores [deltas](/mods/deltas) against the game folder's files, so
  it only opens on a game folder with the same files. Script packages, and files whose delta could
  not be made cleanly, are stored whole.
- **Portable**: every changed file whole, plus packages opened from outside the game folder and the
  recorded originals. Larger, but it opens on another computer or another copy of the game.

Opening a workspace file reopens its game folder, applies the changes in memory (one undo step,
"load workspace") and restores where you were.

## Crash recovery

While anything is unsaved, the Studio writes a recovery copy every two minutes. If it closes
unexpectedly, the next time you open that game folder a banner offers **Restore it**; **Dismiss**
deletes the copy. The copy is removed once everything is saved.
