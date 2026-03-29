---
description: Step-by-step instructions for building your first mod
---

# Hello World example

This is a step by step guide to create a simple mod that prints "Hello World" on the screen.
These instructions are based on this [video](https://www.youtube.com/watch?v=RP9UjC4o2nU). You can follow either the video or the written steps below. This tutorial is created for the OB57 version of the game.

## Dummy source files

Parts of Paladins are written in UnrealScript. When making mods, your code may reference classes and functions from the base game. These scripts are stored inside .upk packages located in `<Paladins install folder>/ChaosGame/CookedPCConsole`. Examples include "PlatformCommon.upk" and "TgGame.upk".

However, you **do not need to have the real source code** to compile your mod. You only need to have dummy (stub) source files that only contain class and function definitions. These files are only used during the compilation and do not contain any real implementations.

You can download the OB57 dummy files [from here](https://mega.nz/file/tiAnBJbR#kEWerIEFWajTIzNVhAkmS24Nezccpx9c8f8lbojktlw). Extract and place them into the `Developement\Src` folder and replace any existing files if prompted.

The dummy files need to also be included in the file: `C:\UDK\<UDK project>\UDKGame\Config\DefaultEngine.ini`. Open the file and find the section `[UnrealEd.EditorEngine]`. Add lines to make it look like below:

[UnrealEd.EditorEngine]\
+EditPackages=CustomGame\
+EditPackages=AkAudio\
+EditPackages=PlatformCommon\
+EditPackages=TgGame\
+EditPackages=TgClient

The scripts are compiled in the order that they are listed here.

## Modifying the code to print Hello World

1. Create a folder with your mod name and a Classes folder inside it if you haven't already. 
2. Copy files from the TgMod folder into your folder. We'll use them as a starting point.
3. Open `TgMutator.uc` with any text editor
4. Find the Init() function and modify the messages to your liking. For example:
```
m_TgPC.ClientMessage(">> HELLO WORLD! <<", , 30.0);
```
5. Save the file

## Compiling and testing

The easiest way to compile is using [Tempest](/tempest/introduction):
1. Open the settings menu where you have your builds
2. Enable Developer Mode
3. Under "Projects" add your UDK project folder (for example `C:\UDK\Paladins`)
4. Under "Scripts" add the folder off your mod (for example `C:\UDK\Paladins\Development\Src\MyMod`)
5. Click "Compile"
6. Close the terminal when it finishes 
7. Click Ok in the dialog that opens
8. Tempest automatically adds the mod to your game
8. Launch the game
9. Run the console command `switchlevel BMM_P_v01?game=siege?mutator=MyMod.TgMutator`, replace MyMod with your mod's name.
10. You should see the custom message


The generated mod upk is in the folder `C:\UDK\<UDK project>\UDKGame\Script`