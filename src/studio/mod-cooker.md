---
title: Building mods
description: The Tempest Studio mod cooker - choosing what goes in a mod, deltas or whole files, details, signing, building, installing and publishing.
---

# Building mods

The mod cooker (**Build mod** in the header, or Ctrl+3) turns your edits into a `.tempest` package
the launcher installs. A mod is the list of game files it changes, plus any extra files such as Lua
scripts or DLLs.

The page has three parts, top to bottom: **What goes in**, **Details** and **Build**. **Refresh**
looks for new changes and files.

## What goes in

### Game files you changed

Each changed game file is one line: its name, where the changes come from, and the number of objects
or rows it changes. Click the number to see them (for example _3 changed: skinicon_kasumi.…_). Files
whose edits were undone, so they no longer differ from the original, are left out.

The **…** menu on each line:

| Action                                                   | What it does                                                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Show the changes**                                     | Lists the objects or rows the mod changes, adds or removes.                                                       |
| **Leave it out of the mod** / **Put it back in the mod** | Keeps the file out of the mod without losing your edits.                                                          |
| **Ship the whole file** / **Ship only my changes**       | Switches between a whole-file copy and a delta (below).                                                           |
| **Discard my edits to this file…**                       | Throws the edits away and reloads the game's file, after asking.                                                  |
| **Remove from the project** / **Remove from the list**   | The file is no longer part of the mod. Nothing is deleted; a file saved in place comes back if you save it again. |
| **Forget the copy …**                                    | Removes an exported copy from the list. The file stays where it is.                                               |

### Where the changes come from

A game file can have changes from several places:

- **Unsaved edits** in the Studio (in a project, all your edits are these).
- **Saved in place**: the game folder's file, saved by the Studio since it recorded the original.
- **An exported copy**: a file written with **Export a copy…**, or a modified `.upk` or `.dat` you
  added with **Add files…**. Added files are matched to the game file of the same name.

Wwise `.pck` files (edited in the Wwise views) always ship whole.

When there are several, **Take the changes from** picks one. The default is the unsaved edits, then
the newest copy, then the in-place save.

### Deltas or whole files

By default every game file ships as a [delta](/mods/deltas): only the objects or rows you changed.
Deltas combine with other mods that edit the same file, so keep them unless you have a reason not to.
**Ship the whole file** replaces the game's file entirely; it conflicts with any other mod that
changes that file.

Large objects you changed the same way in several files, such as a mesh cooked into more than one
package, are stored once in the mod and shared by every delta that needs them. The build log says
how much that saved. See [Shared objects](/mods/deltas#shared-objects).

A delta is made by comparing your version with the original. The cooker takes the original from, in
order: the record the Studio made before the file was first saved in place, the launcher's backup of
the file (made when a mod first touched it), or the game folder's own file. That last one is the
normal case: the game folder is assumed to hold the original files. If you edited the game folder by
other means, restore it (**Verify** the instance in the launcher) before building.

### Extra files

- **Add files…** adds Lua scripts (placed under `scripts/`), DLLs (under `dlls/64/`) or any other
  file. Each line shows where the file goes inside the mod, and you can change it.
- **A whole folder** adds a folder.
- In a project, everything in `mod-files/` ships as laid out. **Open folder** opens it. Put
  `scripts/main.lua` there for a [Lua](/lua/introduction) mod, `dlls/64/` and `dlls/32/` for native
  code, `files/ChaosGame/…` for any game file to ship whole.

## Details

| Field       | Notes                                                                                                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**    | What players see.                                                                                                                                                                                             |
| **Mod id**  | The permanent id on the repository and in other mods' dependencies: 2 to 64 lowercase letters, digits, dots, dashes or underscores. Made from the name unless you type one. Never change it after publishing. |
| **Version** | [Semantic versioning](https://semver.org): `1.0.0`, `1.2.0-beta.1`. Something like `v1.2` is flagged with a one-click fix (**Use 1.2.0**). Every upload needs a higher version than the last.                 |
| **Authors** | Everyone who made the mod, each with an optional link.                                                                                                                                                        |

## Listing

What the mod repository shows. Only needed to publish.

- **Summary**: one line, up to 140 characters, shown in the list of mods.
- **Tags**: comma-separated, for example `skin, maeve`.
- **Source code**: an optional link to where the mod's source lives.
- **Needs other mods**: dependencies, one per line: a mod id, then optionally a version requirement
  (`some-mod>=1.0.0`, `^2`, `~1.2`, `>=1.0 <2.0`). `tempest` is the launcher (`tempest>=1.4.3`).
  Lines that are not valid are pointed out before you build. When the mod has Lua scripts,
  `tempest-scripting>=1.0.0` (the Lua runtime) is added for you.

## Icon and readme

- **Icon**: a square PNG, up to 1 MB, shown in the launcher and on the website. Anything else (a
  renamed JPEG, a larger file) is refused with the reason.
- **Readme**: Markdown, shown on the mod's page and in the launcher: what it does, what it needs,
  known issues.

The details are kept in the project (or per game folder without a project).

## Build

The Build card lists what is still missing in plain words (a name, a valid version, at least one
file), then the **Build** button.

**Signing**: mods with Lua scripts or DLLs must be signed, and the launcher refuses unsigned ones;
the Build card says so when such a mod has no key yet. Create the key under
[Signing and publishing](#signing-and-publishing).

**Compression** chooses between the smallest mod and a faster build:

| Choice                      | What it does                                                                         | Cassie Bow (5 packages) |
| --------------------------- | ------------------------------------------------------------------------------------ | ----------------------- |
| **Smallest file** (default) | LZMA: the smallest download, slower to build. Best for publishing.                   | 61 MB in 22 s           |
| **Faster build**            | zstd: builds several times faster, the mod is about 30 % bigger. Good while testing. | 79 MB in 9 s            |

Both install the same way and give the same result in game.

**Build** writes the folder, packs it and signs it. Every core works on it, and files that did not change since the last build in this session are reused, so building again after a small change only redoes what changed. In a project the result goes to
`builds/<id>-<version>.tempest`, and the cooker asks before replacing a version you already built.
Without a project it asks where to save it. **Save a copy…** writes the built package somewhere
else. The build log under the button shows every step.

## Install and test

- **Install to try it** installs the built mod into the game folder you are editing, with the
  launcher's installer, replacing an older version of it. If the game folder holds in-place edits
  of files the mod changes, the cooker warns you first: the mod would be applied on top of them.
- **Install elsewhere…** installs into another game folder.

Start the game from the launcher to test. The launcher shows the mod in the instance's mod list,
where you can disable or remove it.

## Publish

**Publish…** (next to the built package) uploads it to the mod repository, like the launcher's
cooker:

- the **summary** (needed for a new mod), up to 140 characters;
- the **game patches** it works with: a list (`8.1, 8.2`), or a range (from `8.1`, to nothing for
  "and later");
- **what changed** in this version (optional for the first one).

Tags and the source link come from the listing. Only signed mods can be published. Without an API
key, or with one the repository refuses, the dialog asks for one and publishes right after. The
result is shown in the dialog: **published** (with a link to the mod's page), **queued for review**
(a new mod is reviewed before it is listed; your dashboard on the website shows the outcome), or
**not accepted** with the reasons; warnings are listed either way.

## Signing and publishing

The bottom of the Mod view manages what publishing needs. Both are stored on this computer and
shared with the launcher, so setting them up in one sets up the other.

- **Signing key**: shows your key (name and fingerprint), or **Create my key** with the name shown
  next to your signature. **Verify on the website** signs the text the website gives you under
  **Settings → Signing keys**; paste the signature back there to prove the key is yours. Keep a copy
  of the key: a new key is a new identity. See [Trust and moderation](/mods/trust).
- **Mod repository**: your API key (masked) with **Replace** and **Forget**, or a field to **Log
  in** with one. **Get an API key** opens the website's settings.

See [Publishing mods](/mods/publishing).
