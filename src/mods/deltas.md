---
title: Mod deltas
description: How Tempest mods change only the objects and table rows they touch, so several mods can edit the same game file, and how to make deltas with Tempest Studio or the upk tool.
---

# Mod deltas

A mod can change a game file in two ways:

- **Whole file**: `files/<game path>` replaces the file. Two mods that replace the same file
  conflict, and only one of them can win.
- **Delta**: `deltas/<game path>.tdelta` holds only what the mod added, changed or removed. Several
  mods can delta the same file.

Prefer deltas. A skin mod that changes three textures in a package and a balance mod that edits one
device row in `assembly.dat` can both be installed next to any other mod touching those files.
Deltas are also small: a texture swap in a 30 MB package ships as the texture alone.

## What can be a delta

| File                                                     | Keyed by                                                               |
| -------------------------------------------------------- | ---------------------------------------------------------------------- |
| UPK packages (`.upk`), content and script packages alike | The object's path, such as `skinicon_kasumi.collection_kasumi_default` |
| `assembly.dat`                                           | The id column of each table, such as `ITEM_ID`                         |
| `Lang_<LANG>.dat` language files                         | The message id                                                         |

Objects and rows are never matched by position, so a delta still applies after another mod added or
removed objects in the same file. Anything else (Wwise `.pck` files, configuration files, movies
outside packages) ships whole under `files/`.

A package delta keeps every reference by path. An object that points at another object, in the same
package or elsewhere, still points at it after the delta is applied, wherever that object ended up in
the table. Script packages work too: a recompiled `ChaosGame.upk` delta holds only the classes that
changed.

## How small a delta is

A delta carries as little as the change needs:

- **Property changes** carry only the properties that changed. Changing one number in a class
  default takes under a kilobyte, where the whole object took 20 KB. When the delta is applied the
  properties are merged into the object as it is then, so two mods that change different
  properties of the same object both keep their changes.
- **Changed meshes and textures** are compressed against the original object. A texture with a
  small area repainted costs 3 KB instead of 22 KB, and a replaced mesh about a third of its size.
  This needs the game's original object, which the launcher keeps; if the game file is a different
  version, that object is left unchanged and the launcher says so.
- **Everything else** is compressed with LZMA, the strongest general-purpose compressor.

| Change                                | Before (in the mod zip) | Now     |
| ------------------------------------- | ----------------------- | ------- |
| One property of a class default       | 5.3 KB                  | 0.7 KB  |
| A texture with a small area repainted | 22 KB                   | 3.2 KB  |
| A texture replaced whole              | 17 KB                   | 13.5 KB |
| Maeve's body mesh replaced by another | 1.1 MB                  | 0.42 MB |

Mods made this way need an up-to-date launcher; older ones refuse them with a message to update
Tempest.

## Shared objects

When a mod changes the same object the same way in several files, each delta would carry its own
copy. That happens often: a champion's mesh is cooked into the champion's package and into the
packages of the devices that use it. Large objects (16 KiB and more) are therefore stored once, as
**shared object files**, and every delta that needs one refers to it by its hash:

```text
my-mod/
├── deltas/ChaosGame/CookedPCConsole/
│   ├── MAEVE_ASSETS_SF.upk.tdelta          9 KB
│   └── DEVICE16218_ASSETS_SF.upk.tdelta    9 KB
└── shared/
    └── 09bd8f…49ed.tobj                   1.8 MB   Maeve's body mesh, used by both
```

Replacing Maeve's body mesh in both packages makes a 1.8 MB mod instead of 3.6 MB. A shared
object file holds the object alone, without anything specific to the package it came from, so the
same object gives the same file wherever it was cooked. Each delta still says where the object goes
and what it refers to in its own package.

[Tempest Studio](/studio/mod-cooker) shares an object automatically when two or more files of the
mod use it, and its build log says how much it saved. The cooker shares an object only when two or more files of the mod contain it, and only when that
makes the whole mod smaller: an object compresses better next to the objects like it in its own
file, so sharing everything would make the mod bigger. For the Cassie Bow mod (five packages) this
gives 63.8 MB, against 74.6 MB without sharing.

## Making deltas

### With Tempest Studio

[Tempest Studio](/studio/introduction) makes deltas for you. Edit the files, open the
[mod cooker](/studio/mod-cooker) and build: every game file you changed ships as a delta unless you
choose **Ship the whole file**. The cooker shows what each delta holds before you build.

A delta is a comparison with the original file. The Studio takes the original from, in order:

1. its own record, made before it first saved the file into the game folder;
2. the launcher's backup of the file, made when an installed mod first changed it;
3. the game folder's own file.

The third is the usual case, so build from an unmodified game folder. If you edited the game's files
by other means, run **Verify** on the instance in the launcher first. Working in a
[mod project](/studio/projects) avoids the problem entirely: the project never writes into the game
folder.

### With the command line

The `upk` tool that ships with the launcher and the Studio makes and applies deltas:

```text
upk delta create <original> <edited> -o <out.tdelta>   make a delta (original may be a digest)
upk delta apply <file> <delta>... -o <out>            apply deltas in order
upk delta info <delta>                                list what a delta changes
upk delta digest <file> -o <digest.json>              record a file's per-object hashes
upk delta verify <original> <edited>                  create, apply and compare (a self-test)
```

Add `--shared <mod>/shared` to `upk delta create` to write large objects as shared object files into
the mod's `shared/` folder (`--share` embeds them in the delta instead). Run it for every file of the
mod with the same folder: an object already there is not written again.

Run it on files from the game's `CookedPCConsole` folder: the tool needs the game's `Core.upk` next to
the first package to read its classes, and warns when it meets a class it does not know. A digest
(`upk delta digest`) stands in for the original when you only kept per-object hashes of it.

Put each delta in your mod folder under `deltas/`, with the game path of the file plus `.tdelta`:

```text
my-mod/
├── manifest.toml
└── deltas/
    └── ChaosGame/
        ├── CookedPCConsole/
        │   ├── assembly.dat.tdelta
        │   └── BODY_TYPE_UI_SF.upk.tdelta
        └── Localization/INT/Lang_INT.dat.tdelta
```

Deltas are signed like any other file in the package. Recompiled script packages are not treated as
code by the signing policy.

## How the launcher applies them

The game file is rebuilt as the original plus every enabled mod's delta, in install order. This
happens after every install, removal, enable and disable, and at launch. The mod list shows
**Patching game files** with a percentage while it works. When nothing changed since the last rebuild
it costs one hash check per file.

The original is backed up the first time a delta touches a file (in the instance's
`.tempest/v2/backup/` folder) and restored once no delta is left. If one mod replaces the file whole,
that copy is used as the base and deltas from other mods are applied on top.

The launcher also writes the hash of every rebuilt script package into the game when it starts it,
so the game accepts modified script packages (Windows only for now).

## Conflicts

Conflicts are checked per object, not per file. When two mods change the same object or row, the
launcher shows the usual prompt: replace the other mod, or stack them. Stacked mods apply in install
order, so the last one installed wins on the objects they share and both keep everything else.

Each changed object in a delta remembers what the original looked like. If a mod changes an object
that another mod changed first, the change is still applied and the CLI prints a `[deltas] note:`
line so you know the two mods overlap.

## Troubleshooting

- **The game shows the original after installing**: check that the mod is enabled and launch the
  game from the launcher, which rebuilds modded files before starting it. A failed rebuild is
  reported with the file and the error.
- **A delta touches objects you did not change**: the original the delta was compared with was not
  the game's. Restore the game folder (**Verify** the instance in the launcher) and build again.
- **`[deltas] note:` lines at launch**: two enabled mods change the same objects. The last one
  installed wins on those objects.
