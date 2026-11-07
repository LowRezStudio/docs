---
title: Maps
description: The Tempest Studio map view - a map and its sublevels in 3D, adding, moving and deleting actors, collision and volume shapes, light baking, the bots' nav mesh, Kismet and Matinee.
---

# Maps

The map view (the map icon in the activity bar, or Ctrl+4) shows a map in 3D with everything it
places: meshes, player starts, spawn points, bot and deployable factories, capture points, payload
paths, jump pads, triggers, blocking and other volumes, lights, sounds, emitters and navigation
points. You can add, move, rotate, scale and delete what it places and edit every property, shape
volumes and see what collides, bake lighting, edit the bots' nav mesh, rewire Kismet and edit
Matinee timelines.

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

| Input       | What it does                                                |
| ----------- | ----------------------------------------------------------- |
| Left drag   | Orbit                                                       |
| Right drag  | Look around; hold it and press W A S D (Q E down/up) to fly |
| Middle drag | Pan                                                         |
| Arrows      | Fly without the mouse (Page Up/Down: up/down)               |
| Wheel       | Zoom                                                        |
| Click       | Select the actor under the pointer                          |
| F           | Frame the selection                                         |
| W / E / R   | Move, rotate or scale with the gizmo                        |
| Q           | Select only (no gizmo)                                      |
| Escape      | Deselect                                                    |
| Shift+A     | [Add an actor](#adding-and-removing-actors)                 |
| Ctrl+D      | Duplicate the selected actor                                |
| Delete      | Delete the selected actor                                   |

Flying follows the physical keys, so on an AZERTY keyboard it is Z Q S D.

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
Cooked maps carry data that was computed from where things were when the map was built:

- **Lighting and shadows are baked**: a moved or added mesh keeps its old light map (or has none),
  so it can look too dark or too bright, and the shadow it used to cast stays where it was.
  [Bake lighting](#lighting) gives it its own.
- **Bot navigation** (the Havok nav mesh and the path network) is not rebuilt: moving navigation
  points or blocking the way can break bot pathing. You can [edit the nav mesh](#nav-mesh) by
  hand; nothing regenerates it.
- **Collision** moves with blocking volumes and meshes. The maps have no BSP collision.
  :::

## Adding and removing actors

**Actor** in the toolbar (or Shift+A) adds an actor where the view is looking, into the level you
pick (the selected actor's by default). Three tabs:

- **Copy**: every kind of actor the game's maps place (player starts, jump pads, capture points,
  volumes, lights, sounds…). The new actor is a copy of one of them, with its settings. Examples
  from this map come first; a copy from another map brings its meshes, materials and textures
  along, and its links to that map's actors and Kismet are dropped.
- **New**: any actor class the game allows in a level (about 300), with the class's default
  settings. Set what it needs (mesh, target, team…) in the inspector. A new volume is a 256-unit
  cube until you [shape it](#collision-and-volume-shapes).
- **Mesh**: pick any static mesh of the game folder; it is placed as a new mesh actor, copied into
  the level with its materials and textures when it lives elsewhere.

**Duplicate** (Ctrl+D, or the copy button in the inspector) copies the selected actor next to it;
it also works on a single mesh of a collection. **Delete** (the Delete key, the bin in the toolbar
or the inspector) removes the selected actor after asking, and clears every reference to it, Kismet
included. A level's WorldInfo cannot be deleted.

New actors get a name of their own and are added to the level's lists (navigation points, cover,
pylons) like the editor does. Adding and deleting are ordinary edits: Ctrl+Z takes them back.

::: info Client and server
A mod changes the client's packages. An actor that matters for gameplay (a player start, a jump pad,
a blocking volume) also has to be in the server's map, or players see something the server does not
know about.
:::

## Collision and volume shapes

**Collision** in the toolbar draws what players and shots hit, over the scene or alone (**Only**):

| Colour | Blocks                                  |
| ------ | --------------------------------------- |
| Pink   | Players and shots                       |
| Orange | Players only (most blocking volumes)    |
| Cyan   | Shots only                              |
| Grey   | Nothing (hidden with **Blocking only**) |

Volumes that block nothing (triggers, reverb, AI volumes…) are coloured by kind instead.

Volumes are drawn as the convex shapes the game tests against, meshes as their simple collision (or
their triangles when they use them). Select a mesh to see its collision switches as toggles and what
players and shots test; a mesh that asks for simple collision but has none blocks nothing, and the
inspector says so (23 of the 84 meshes of Abyss).

Select a volume (blocking, trigger, kill, reverb… any kind) to change its shape in the inspector's
**Shape** panel: a box, cylinder, cone or sphere (hollow ones too) with their sizes, a mesh's
outline or bounds, or a table of points. The Studio rebuilds the volume's brush and the convex
shapes the game collides with the way the Unreal editor does, splitting a concave shape into
several. Shipped blocking volumes block players but not shots; a new one blocks both until you turn
its `BlockZeroExtent` off.

## Lighting

Maps keep their lighting baked into light map textures. **Light** in the toolbar bakes new ones:

- **Edited**: the meshes added or moved since the map was opened (the usual choice, under a second).
- **Selected**: the selected mesh or actor.
- **Levels**: every mesh of the ticked levels (slow: about 15 seconds for Abyss's walls).

The baker takes the map's static lights (point, spot, directional and sky) and casts shadows
against every level of the map, and stores the result the way the game's own lighting is stored:
new light map textures in the level, the meshes pointed at them. The dialog shows the selected
mesh's light map, with an exposure slider. A bake is one edit per level: Ctrl+Z takes it back.

It bakes direct light only, so shadowed areas come out darker than the shipped lighting, which
also bounces light around. **Indirect rays** adds a rough one-bounce approximation, which tends to
come out too bright in open areas. Light for moving objects (characters) and meshes without light
map coordinates are not baked.

## Nav mesh

Bots walk on a Havok nav mesh. **Nav mesh** in the toolbar draws it over the map: faces coloured by
region or cluster, borders in red, jump links as arcs; **X-ray** shows it through walls. The panel
lists its size and switches what a click picks: actors, faces or a vertex.

Select faces and **delete** them, **cut** a whole connected region, or drag a **vertex**. Every edit
keeps the mesh valid and is one undo step; Save writes it with the level.

::: warning Not regenerated
The Studio cannot build a nav mesh from the level's geometry yet, and the cluster graph bots use
for long trips is not updated after an edit. Small edits (closing off an area, removing a ledge)
are fine; large ones can make bots take odd routes. The nav mesh only matters where bots play
(the server).
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
node in Kismet, pick one of the level's timelines in the picker above the timeline, or press
**New** to make one (it moves the actor selected in the 3D view). The timeline opens under the 3D
view:

- **Groups and tracks**: each group with the actors it drives and its tracks. Add, rename
  (double-click), recolour and remove groups; **link** the actor selected in the 3D view to a group
  (or unlink it). Add any kind of track the game uses: movement, camera cuts, fades, events,
  sounds and Wwise events, animations, toggles, property curves (brightness, colour, scale…) and
  material parameters; turn tracks on or off, remove them.
- **Keys**: click a key to edit its time, value, curve mode, tangents and fields in the strip under
  the timeline, or drag it along the timeline. Double-click a row, or press **K**, to add a key at
  the playhead. Delete removes the selected key.
- **Curve editor**: open a track's curves to drag keys and their tangent handles, pick each key's
  mode (linear, auto, user, break, constant), zoom and fit. Auto tangents are recomputed like the
  game computes them.
- **Preview**: play (Space), loop, play only the section, change the preview speed, or drag on the
  ruler. Driven actors move in the 3D view along their drawn paths, scale tracks scale them, light
  tracks tint their markers and toggles hide them. The curves are evaluated the way the game
  evaluates them.
- **Recording movement**: while the Matinee view is open, moving a driven actor with the gizmo keys
  its movement at the playhead instead of moving where it stands.
- **Action** settings: looping, play rate, rewinding and the other switches of the Matinee node;
  the timeline's length and section.

A movement keyed relative to the actor (`IMF_RelativeToInitial`) is drawn from where the actor
stands, so moving the actor moves its path too. Static actors (most of a map's art) do not move in
game, whatever the timeline says.

## Automation

The MCP server's `studio_map` tool lists, opens and inspects maps, lists actors by kind, selects,
moves, adds and deletes them, hides kinds and levels, lists and fixes heavy walls, shows collision
and shapes volumes, bakes lighting, shows and edits the nav mesh, exports the map, reads Kismet
sequences, links, unlinks, adds and removes nodes, and creates and edits Matinee timelines (groups,
tracks, keys, curve modes). See
[Automation](/studio/automation).
