---
title: Packages
description: Browsing Paladins UPK packages in Tempest Studio and editing their textures, materials, meshes, animations, sounds, Wwise audio, particles, UI movies, properties and scripts.
---

# Packages

The **Packages** view (Ctrl+1) has three panes:

1. **Packages**: every package of the game folder. Filter by name, and narrow to **Content**,
   **Maps** or **Script** packages. A dot means the package has edits, **copy** marks one with an exported
   copy, **ext** a package opened from outside the game folder.
2. **Exports**: the objects of the selected package as a tree (groups, then objects). Filter by
   path or by class. The ⓘ button shows the package's summary, imports and name table.
3. **The inspector**: the selected object.

Arrow keys move through both lists: Up/Down select, Right expands a group or enters it, Left
collapses it or goes to its parent, Home/End jump to the ends.

Packages are opened as needed and stay in memory while they have edits. Opening a 65,000-object
script package takes under a second.

## The inspector

The header shows the object's path, class, size and flags. Its toolbar:

| Button        | What it does                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Export**    | Writes the asset to a file: PNG/DDS for textures, glTF/FBX/OBJ for meshes, glTF/FBX for animations, Ogg/WAV for sounds, GFX for movies. |
| **Replace…**  | Replaces the asset from a file (see below), or its raw serialized data on the **Raw payload** tab.                                      |
| **Raw**       | Extracts the object's raw serialized data, for tools that work on bytes.                                                                |
| **Rename**    | Renames the object; references to it follow.                                                                                            |
| **Duplicate** | Copies the object next to it as `…_copy` (Ctrl+D). Sub-objects are not copied.                                                          |
| **Copy to…**  | Copies the object, and optionally its sub-objects, into another package.                                                                |
| **Delete…**   | Turns the object and its sub-objects into empty placeholders and clears references to them.                                             |
| **file**      | Shows the package file in your file manager.                                                                                            |

The tabs:

- **Preview**: what the object looks like or sounds like (below).
- **Properties**: every property, editable in place. References are links (Ctrl+click opens a new
  tab). Arrays have add, duplicate and remove buttons; top-level properties have a reset to the
  default.
- **Native**: what the engine stores outside the properties (the native payload type and size).
- **References**: what this object uses and what uses it.
- **Dump**: the object as text, for reading or copying.
- **Source**: on classes, functions, states, structs and enums, the decompiled UnrealScript (see
  Scripts below).

## Textures

The preview shows any mip, zoomed to fit or at actual size, over a checkerboard or a plain
background. **Replace…** takes a PNG or DDS. A PNG is re-encoded to the texture's pixel format (or
the one you pick); a DDS in a supported format is stored as is. The mip chain is kept like the
original, generated in full, or reduced to the top level. The new image is stored inside the package,
so the texture cache files (`.tfc`) never need editing.

## Materials

Materials and material instances preview on a lit sphere, cube or plane with their base colour,
normal and emissive maps. The side panel lists the parent chain, every texture (click to open it) and
the parameters: scalars and vectors are editable. Editing an instance adds an override to it; editing
a material changes its default.

## Meshes

Static and skeletal meshes open in a 3D viewer: orbit with the mouse, switch LODs, toggle textures,
wireframe, the skeleton and the grid, change the background, and **Fit** to frame the model.

- **Export** writes glTF (`.glb`, metres), FBX (centimetres, textures embedded, skeleton and skin)
  or OBJ. Exported skeletons point their bones along the limbs, so they look right in Blender.
- **Replace…** takes glTF, GLB, FBX or OBJ for static and skeletal meshes. Keep the skeleton of the
  original for skeletal meshes.

## Animations

Select an animation sequence (`AnimSequence`, inside an `AnimSet`), or the AnimSet to pick among its
sequences, and it plays on its character:
the AnimSet's preview mesh by default, or any mesh with the same bones from the picker above the
viewer.

- **Play/pause**, drag the slider to scrub frame by frame, change the **speed**, turn **loop** off,
  and show the **skeleton**.
- The strip under the slider shows the animation's **notifies** (sounds, effects and other events
  the game fires at a moment of the animation). Drag one to move it. Right-click one to copy it at
  the playhead, move it there, open its object or remove it.
- **Edit the sequence** has three tools:
    - **Trim** keeps a range of frames. Use the arrow buttons to take the start or end from the playhead.
    - **Retime** changes the length. The same motion plays faster or slower, and the notifies follow.
    - **Rate scale** sets how fast the game plays the animation (1 means as authored).
- **Export** writes the mesh, its skeleton and the animation as glTF (`.glb`) or FBX, ready for
  Blender. Tick **Every sequence of the AnimSet** to put all of the set's animations in one file,
  each named after its sequence (an AnimSet itself exports all of them by default).
- **Replace…** loads the motion from a glTF/GLB or FBX file. If the file has several animations, pick
  one. Bones are matched by name, so animate the exported skeleton. Notifies are moved to fit the
  new length. Tick **Every sequence of the AnimSet** (always on when you replace an AnimSet) to
  load every animation of the file into the sequence with the same name: the dialog lists which
  animation goes where, and animations with no sequence of their name are skipped. In Blender, set the scene to 30 fps and the frame range to the action before
  exporting.

Every change can be undone and is saved with the package.

## Sounds

Sound waves have a player and an **Edit** button. The editor shows the waveform: drag to select,
then trim, fade in or out, change the gain, normalise, switch mono/stereo and pick the Vorbis
quality. Play the result, then **Apply and replace**. **Replace…** takes Ogg (stored as is), WAV and
Wwise `.wem` files.

## Wwise audio

Most of the game's voice lines and effects are Wwise media in `.pck` files next to the packages.
Selecting an `AkEvent` or `AkBank` object shows what it plays: each media file can be played,
exported (Ogg, WAV, wem), replaced (Ogg, WAV, wem) and edited with the same editor.

The **Wwise audio** button in the activity bar browses every `.pck` of the game folder; selecting an
event filters the media it plays. Replacing or editing a media file is an edit of its `.pck` like
any other: it stays unsaved (and in your project) until you save, and goes into the mod as the
whole `.pck` (Wwise packages have no delta). **Discard** brings back the game's audio.

## Particles

Particle systems, emitters and modules preview the whole effect, simulated live: sprites with their
material and sub-UV sheets, mesh particles, spawn rates and bursts, lifetime, size, colour,
velocity, acceleration, rotation and orbit. Beams, ribbons, collision and events are listed as not
simulated.

The game stores each module's curves as baked lookup tables. Select a module to edit them in the
curve editor: drag the points, resample, scale the time, or type the values. The preview follows as
you edit; **Apply** writes the table into the module.

## UI movies

Scaleform movies (`SwfMovie`, the game's menus and HUD) open in a movie editor laid out like
FFDec: the movie's resources on the left, the stage in the middle with the timeline under it, and
the properties of what is selected on the right.

- **The tree** lists the movie, its root frames, every character by kind (shapes, sprites, texts,
  fonts, images, sounds…, named by their linkage name when they have one) and the tag views. Type in
  the filter to find an id or a name.
- **Movie** plays the whole movie, with its shared libraries, fonts and images taken from the game
  folder.
- **The stage** shows a frame or a character. Click an object to select it (Alt+click cycles through
  the ones underneath), drag to move it, arrows nudge it (Shift: 10 px). Press **Q** for the
  transform tool: corners and edges scale (Shift keeps proportions, Alt scales from the centre), the
  knob rotates. Double-click or Enter goes inside a clip, Backspace goes back up.
- **The timeline** lists the objects of the current frame, with a frame strip, labels and frame
  scripts when there are several frames. The eye hides a layer from the stage (only in the editor,
  the movie is not changed), which helps with menus full of hidden states.
- **Properties** edit the selected object (name, position, scale, rotation, skew, alpha) or the
  open character:
    - shapes: fill and line colours, line widths, or **Replace with SVG**;
    - text fields: every property (font, size, colour, alignment, margins, wrapping…) and the initial
      text;
    - static texts: the characters and colour of each line;
    - fonts: add characters from a TrueType/OpenType file, or export the font as TrueType;
    - sounds and binary data: export them;
    - sprites and frames: export as SVG, as PNG at any scale, or every frame as numbered PNGs.
- **Scripts** lists every ActionScript 2 script (classes, frame scripts, clip events, buttons) as
  decompiled ActionScript or as P-code. Edit either: **Check** compiles without writing, **Stage**
  keeps the change with the other pending edits. Parts the decompiler cannot turn into ActionScript
  stay as P-code blocks inside the source.
- **Images** shows the pictures the movie uses. Replace one with a PNG or DDS (it keeps the size the
  movie draws it at), export it, or open its texture. **Add image** puts a new picture in the movie
  and on the current frame.
- **Texts**, **Linkage** and **Tags** list the initial texts, what the movie exports and imports, and
  every tag of the file.

Edits stay pending until **Apply** writes them into the package as one step that can be undone.
Adding or replacing an image is written at once.

## Scripts

Script packages (`ChaosGame.upk`, `TgGame.upk` and the like) hold the game's compiled UnrealScript.
On a class or anything inside one, the **Source** tab shows the decompiled class. Edit it and click
**Compile**: the whole package is rebuilt from source with your class swapped in, the result
replaces the package in memory, and it is saved or built into a mod like any other edit. Compiling
needs the package to have no other pending edits, so save or discard property edits first.

**Export the class sources of this script package…** (Tools) writes every class as a `.uc` file.

::: info
The game checks the hash of its script packages. The launcher writes the hash of every script
package a mod replaces into the game when it starts it, so recompiled packages load. This works on
Windows; on Wine the launcher prints a notice.
:::

## Searching and bulk edits

- **Search every package** (Ctrl+F): finds objects by path in every package of the folder, optionally
  of one class. The first search indexes the folder (a few seconds), later ones are instant.
- **Find and replace** (Ctrl+H): finds text in every string, name, enum value and reference of the
  open package, optionally in object names too, shows a preview table, then replaces all.
- **Batch import** (Tools): imports a folder of files named `<package>.<object>.<ext>`, for example
  `BODY_TYPE_UI_SF.skinicon_kasumi.collection_kasumi_default.png`. Each file is matched to its object
  and imported by type. When the files touch several packages you choose which ones to change. The
  imports are edits like **Replace…**: unsaved (and kept in your project) until you save, undone in
  one step per package, and part of the mod like any other edit.

## Other tools

- **Verify this package**: reads and rewrites every object and reports anything that does not come
  back identical. Useful before trusting an edit to a rare object type.
- **Rewrite this package compressed / uncompressed**: writes the package with or without the game's
  compression.
- **Prepare a mod folder from packages**: the older way to make a mod folder from saved packages.
  The [mod cooker](/studio/mod-cooker) replaces it for most uses.
