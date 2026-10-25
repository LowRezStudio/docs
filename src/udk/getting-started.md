---
title: Getting started with UDK modding
description: Set up UDK 2013 for Paladins modding. Prerequisites, installing UDK, creating a mod package, and editor setup for UnrealScript.
---

# Getting started with UDK

Paladins runs on Unreal Engine 3, and the Unreal Development Kit (UDK) is the public release of
that engine. You use it to compile UnrealScript mods against the game's classes and to work with
the game's `.upk` packages, for example to edit animations. This page sets up the environment, and
[Hello World](/udk/hello-world) walks through a first mod.

If you only need to change how the game behaves while it runs, [Lua scripting](/lua/introduction)
is simpler: no compiler and no UDK project.

## Prerequisites

Use Windows if you can. UDK should run under WINE, but if something breaks there, you're on your
own.

You'll need:

- [UDK 2013-BETA2](https://mega.nz/file/I3gFiZqZ#WuOehV5pcQJsxGPLSTRh8SimAJKh8o_nC1JMj0IbHqU)
- Basic knowledge of [Unreal Script](https://docs.unrealengine.com/udk/Three/UnrealScriptHome.html)

## Installation

1. Run the UDK installer and finish the setup. The source code ends up in
   `C:\UDK\<PROJECT>\Development\Src`. Each folder in there is a package, with a `Classes` folder
   holding its `.uc` files.
2. Create a package named after your mod, with a `Classes` folder inside it.

## Editor setup

Visual Studio Code works well. [This extension](https://marketplace.visualstudio.com/items?itemName=EliotVU.uc)
adds UnrealScript syntax highlighting and code completion.

## Tempest Launcher

You don't need it, but [Tempest Legacy](/tempest-legacy/introduction) speeds up development: its
developer mode compiles your scripts and adds the mod to the game for you.
[Hello World](/udk/hello-world) shows how to set it up.

## Next steps

- [Hello World](/udk/hello-world): compile and test your first mod.
- [Decompiling scripts](/udk/decompilation): read the game's own UnrealScript from its `.upk` files.
- [Editing animations](/udk/edit-animations): export an animation, edit it in Blender and inject it
  back.
- [Resources](/udk/resources): documentation, tutorials and community servers.
