---
title: Mod deltas
description: How Tempest mods change only the objects and table rows they touch, so several mods can edit the same game file.
---

# Mod deltas

A mod can change a game file in two ways:

- **Whole file**: `files/<game path>` replaces the file. Two mods that replace the same file
  conflict, and only one of them can win.
- **Delta**: `deltas/<game path>.tdelta` holds only what the mod added, changed or removed. Objects
  in a UPK package are keyed by their path, rows in `assembly.dat` and the `Lang_*.dat` files by
  their id column, never by position. Several mods can delta the same file.

Prefer deltas. A skin mod that changes three textures in a package and a balance mod that edits one
device row in `assembly.dat` can both be installed next to any other mod touching those files.

## How the launcher applies them

The game file is rebuilt as the original file plus every enabled mod's delta, in install order. This
happens after every install, removal, enable and disable, and at launch. When nothing changed since
the last rebuild it costs one hash check.

The original is backed up the first time a delta touches a file and restored once no delta is left.
If one mod replaces the file whole, that copy is used as the base and deltas from other mods are
applied on top.

## Conflicts

Conflicts are checked per object, not per file. When two mods change the same object or row, the
launcher shows the usual prompt: replace the other mod, or stack them. Stacked mods apply in install
order, so the last one installed wins on the objects they share and both keep everything else.

If a mod changes an object that another mod changed first, the change is still applied and the CLI
prints a `[deltas] note:` line so you know the two mods overlap.

## Making deltas

[Tempest Studio](/studio/introduction) writes deltas for you. It records each file the first time
you save it in place, and **Export mod…** and **Mod folder** then write deltas against that record
instead of copying the whole file. If the Studio never saw the original (for example, you edited a
file that was already modified), it falls back to a whole-file copy.

From the command line, the `upk` tool that ships with the launcher and the Studio does the same:

```text
upk delta create <original> <edited> -o <out.tdelta>   make a delta (original may be a digest)
upk delta apply <file> <delta>... -o <out>            apply deltas in order
upk delta info <delta>                                list what a delta changes
upk delta digest <file> -o <digest.json>              record a file's per-object hashes
upk delta verify <original> <edited>                  create + apply + compare (a self-test)
```

Put the result in your mod folder under `deltas/` with the game path of the file plus `.tdelta`,
for example `deltas/ChaosGame/CookedPCConsole/assembly.dat.tdelta`. Deltas are signed like any
other file in the package, and recompiled script packages are not treated as code.
