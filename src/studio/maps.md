---
title: Maps
description: The Tempest Studio map view - a map and its sublevels in 3D, the actors it places, moving them, and its Kismet sequences.
---

# Maps

The map view (the map icon in the activity bar, or Ctrl+4) shows a map in 3D with everything it
places: meshes, player starts, spawn points, bot and deployable factories, capture points, payload
paths, jump pads, triggers, blocking and other volumes, lights, sounds, emitters and navigation
points. You can move, rotate and scale what it places and edit every property, and read and rewire
its Kismet.

## Opening a map

The side bar lists the playable maps: the packages that stream sublevels (`TD_Abyss_P`,
`SG_SerpentBeach_P`…). Untick **Playable maps only** to see every package with a level in it. Pick
one and the Studio reads the map and every sublevel it streams (art, collision, lighting, AI,
skybox, effects…). That takes about half a second for most maps; the meshes then load in the
background (the counter at the bottom left).

The side bar then shows:

- **Levels**: the map's packages. The eye hides a level, the graph icon opens its Kismet. A dot means
  the level has unsaved edits.
- **Show**: which kinds of actors are drawn. Blocking volumes, navigation and level info start
  hidden.
- The **outliner**: every actor of the visible levels, with a filter. Click one to select it,
  double-click to frame it.

## Moving around

| Input      | What it does                                        |
| ---------- | --------------------------------------------------- |
| Left drag  | Orbit                                               |
| Right drag | Pan; hold it and press W A S D (Q E down/up) to fly |
| Wheel      | Zoom                                                |
| Click      | Select the actor under the pointer                  |
| F          | Frame the selection                                 |
| W / E / R  | Move, rotate or scale with the gizmo                |
| Q          | Select only (no gizmo)                              |
| Escape     | Deselect                                            |

The toolbar picks the shading: **Lit**, **Unlit**, **No textures** or **Wireframe**. Player starts
take their team's colour; volumes are drawn as outlines; a light's reach shows when it is selected.

## Editing

Drag the gizmo, then release: the Studio writes the actor's `Location`, `Rotation` and
`DrawScale3D` into its level package. Meshes that the cooker gathered into a
`StaticMeshCollectionActor` (most of a map's art) are moved through their own component's
`Translation`, `Rotation` and `Scale3D` instead. The inspector on the right shows the selected
actor's properties; edit any of them like in the Packages view.

These are ordinary package edits: Ctrl+Z takes them back, Save (Ctrl+S) writes the changed level
packages, they go into your project and the [mod cooker](/studio/mod-cooker) ships them as deltas
of the level packages.

::: warning What the game does not recompute
Cooked maps carry data that was computed from where things were when the map was built, and the
Studio does not rebuild it:

- **Lighting and shadows are baked**: a moved mesh keeps its old light map, so it can look too dark
  or too bright, and the shadow it used to cast stays where it was.
- **Bot navigation** (the Havok nav mesh and the path network) is not rebuilt: moving navigation
  points or blocking the way can break bot pathing.
- **BSP collision** cannot change. Blocking volumes and meshes move with their collision.

Adding and removing actors is not available yet.
:::

## Heavy walls

**Heavy walls** in the toolbar colours everything flagged `m_bCanBaseOn` False: a "rooftop" that
champions slide off instead of standing on. Each face is coloured by its slope: roofs and floors grey
(where the flag belongs), slopes orange, and walls red. Red walls are the
[heavy walls](/blog/2026-10/21-heavy-walls): walls flagged as rooftops by mistake. Flagged blocking
volumes are shown even when volumes are hidden, see-through. Tick **X-ray** to draw each flagged
object in one flat colour instead (meshes red, volumes yellow), seen through everything in front of
it: quick to spot every flagged object on a map. Tick **rooftops** above the outliner to
list only the flagged actors.

The inspector's **Can be stood on** switch sets the flag. For a mesh the cooker gathered into a
collection the flag belongs to the collection actor, so it changes for every mesh of that
collection.

## Exporting

**Export** in the toolbar writes the map as one **GLB** (glTF, metres) or **FBX** (centimetres), Y
up, for Blender or another engine. Both open in Blender's FBX importers (the classic and the newer
one). By default it takes the levels and kinds of actors the view
shows. Each mesh is stored once and placed by an object per placement (Blender imports them as
linked duplicates), grouped by level, with materials and textures embedded (up to 512², 1024²,
2048² or full size). **Volumes as meshes** adds the shapes of volumes. Abyss exports in about three
seconds.

## Kismet

**Kismet** in the toolbar (or a level's graph icon) shows the level's sequences as a graph:
events (red), actions (blue), conditions (yellow), sub-sequences (purple) and variables (circles).
The cooker strips the node positions, so the Studio rebuilds the layout from the connector
positions the cooker kept; nodes it cannot place sit in a row below. Comment boxes are listed above
the graph.

| Input                                   | What it does                                         |
| --------------------------------------- | ---------------------------------------------------- |
| Drag the background, wheel              | Pan, zoom                                            |
| Drag a node's title                     | Move it (only in this view: positions are not saved) |
| Drag an output to an input              | Link them                                            |
| Drag a variable connector to a variable | Link the variable                                    |
| Click a link, then Delete; or Alt+click | Break the link                                       |
| Double-click a sub-sequence             | Go into it (the breadcrumb goes back)                |
| F                                       | Fit the graph                                        |

**Adding nodes**: the list offers every kind of node the game's maps use (Delay, Toggle, Touch, Bot
Spawned, Level Loaded, Ak Post Event…), with how often each is used. The new node is a copy of one
of them with its links and title removed. Anything it pointed at that the level does not have is
cleared. If an actor of this level is selected in the 3D view, a new event fires from it (it is
added to the actor's `GeneratedEvents`) and a new object variable holds it. Then link it like any
other node. Deleting a node also removes every link to it.

Kismet runs on the server and in the client, so a mod that changes it must be installed on both.

Select a node to see and edit its properties on the right. An event fired by an actor names it:
**show it** jumps to the actor in the 3D view.

## Matinee

Matinee timelines move things: gates, doors, platforms, cutscene cameras. Double-click a Matinee
node in Kismet (or **Open in Matinee** in its properties) to open its timeline under the 3D view:

- **Groups and tracks**: each group with the actors it drives, and every key list of its tracks:
  movement (`PosTrack` positions, `EulerTrack` rotations, or one curve per axis), property curves,
  events, camera cuts, toggles and sounds.
- **Preview**: play (Space) or drag on the ruler to scrub. The driven actors move in the 3D view and
  every movement draws its path. The preview interpolates linearly between keys; the game uses the
  keys' curve modes.
- **Editing**: click a key to edit its time and value in the bar above the tracks, or drag it along
  the timeline (it stays between its neighbours). Double-click a row to add a key there (a copy of
  the key before it). Delete removes the selected key.

A movement keyed relative to the actor (`IMF_RelativeToInitial`) is drawn from where the actor
stands, so moving the actor moves its path too. Matinees fed by a named variable are resolved like
the game resolves them, by name.

## Automation

The MCP server's `studio_map` tool lists, opens and inspects maps, lists actors by kind, selects and
moves them, hides kinds and levels, lists and fixes heavy walls, exports the map, reads Kismet
sequences, links, unlinks, adds and removes nodes, and opens and edits Matinee timelines. See
[Automation](/studio/automation).
