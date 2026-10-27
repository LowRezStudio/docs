---
title: Your first mod
description: A walkthrough of Tempest Studio from a new mod project to an installed, signed .tempest mod.
---

# Your first mod

This walkthrough makes a small texture mod: it replaces one skin icon, builds the mod and installs
it to try it in game. The same steps work for any change the Studio can make.

## 1. Create the project

Click **New mod project** on the welcome screen (or in the menu at the top left). The wizard has
three steps:

1. **Your mod**: the name players see, your author name and the version. The mod id (the permanent,
   lowercase name of the mod, like `kasumi-icon`) is made from the name; you can change it later.
   The version uses [semantic versioning](https://semver.org): start at `1.0.0`.
2. **Game folder**: the `CookedPCConsole` folder of the Paladins instance you want to mod. The
   wizard checks that it really is one and lists the folders you used before.
3. **Project folder**: where the project lives. By default it is `Documents/Tempest Mods/<id>`.

**Create project** makes the folder and opens it:

```text
Tempest Mods/kasumi-icon/
├── kasumi-icon.twrk   the project file: your edits and where you were
├── mod-files/         extra files shipped with the mod (scripts, DLLs, anything else)
└── builds/            the .tempest files you build
```

The header now shows the project name with its save state. You never need to save by hand: the
project saves itself a moment after every change and shows **Saved** when it is done.

## 2. Find what to change

Press **Ctrl+F** (Cmd+F on macOS) to search every package of the game. The first search reads every
package's table of contents, which takes a few seconds; later searches are instant. Type part of an
object's path, for example `skinicon_kasumi`, and pick a result. The Studio opens the package and
selects the object.

You can also browse: the **Packages** view lists every package on the left, the selected package's
objects in the middle as a tree, and the selected object on the right. **Ctrl+P** jumps to a package
by name.

## 3. Make the change

With a texture selected, the **Preview** tab shows it. Click **Replace…** in the object's toolbar,
**Browse…** to a PNG or DDS file and confirm. The defaults keep the original's pixel format and mip
chain; a PNG is re-encoded to that format, and the new image is stored inside the package, so no
other file needs changing.

The package now has a dot next to its name in the list and on its tab: it has edits. In a project
those edits are kept in the project file, not written into the game folder. **Ctrl+Z** undoes the
change if you picked the wrong file.

Other things you might change: a sound (**Replace…** with an Ogg or WAV file, or **Edit** to trim
it), a mesh (glTF, FBX or OBJ), any property on the **Properties** tab, or rows of `assembly.dat` in
the **Assembly** view. See [Packages](/studio/packages) and [Assembly](/studio/assembly).

## 4. Build the mod

Click **Build mod** in the header (or press **Ctrl+3**). The mod cooker shows:

- **What goes in**: one line per game file you changed, with the number of objects or rows changed.
  Click the count to see the list. The **…** menu on each line can show the changes, leave the file
  out of the mod, ship it whole, or discard your edits to it.
- **Details**: the name, version, author, icon and description, prefilled from the wizard.
- **Build**: what is still missing, if anything, and the **Build** button.

Mods that ship scripts or DLLs have to be signed. The first time, the cooker offers **Create key**,
which makes your personal signing key; it is reused for every mod after that. A texture mod does not
need it, but signing never hurts.

Click **Build 1.0.0**. The mod is written to `builds/kasumi-icon-1.0.0.tempest`.

## 5. Try it

Click **Install to try it**. The cooker installs the mod into the game folder you are editing, through
the launcher's own installer, so it behaves exactly like a mod installed from the repository. Start
the game from the launcher and check the change. **Install elsewhere…** installs into another game
folder.

To change something, edit again, raise the version (`1.0.1`) and build again. The cooker asks before
replacing a version you already built.

## 6. Come back later

Close the Studio or the project whenever you like: your edits stay in the project. To continue, open the project from the welcome screen's recent
list or with **Open project…** (Ctrl+Alt+O): the game folder, your edits, your open tabs and the mod
details come back as you left them.

## 7. Publish

When the mod is ready for others, open **Publish to mods.lowrezstudio.com** under the Build button,
fill in the patches it works with and a summary, and publish. You need an account and an API key on
the website first: see [Publishing mods](/mods/publishing).
