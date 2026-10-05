---
title: Editing animations
description: Edit in-game animations through Blender and re-inject them in the game
---

# Editing animations inside .upk files

The folder `<Paladins install folder>/ChaosGame/CookedPCConsole` contains compressed `.upk` files. These files contain all animations within the game. This guide explains how to export, edit and inject them.

## Prerequisites

- [Python](https://www.python.org/)
- [Blender](https://www.blender.org/)
- [Unreal PSK/PSA Blender extension](https://extensions.blender.org/add-ons/io-scene-psk-psa/)
- [UPK Explorer](https://www.nexusmods.com/site/mods/587)
- [UE Viewer (umodel64)](https://www.gildor.org/en/projects/umodel)
- [UPK Parser](https://github.com/EliotVU/Unreal-Library)
- [PSA to UPK Injector](https://github.com/sissh/UE3-PSA-to-UPK-Injector)
- Tools to decompress and process Paladins' UPK Files into workable files

## 1. Exporting the animation

1. Export the animation you wish to edit with umodel64.
2. Open your decompressed and processed UPK file with UPK Explorer. Locate the relevant AnimSet and the AnimSequence for your location.
::: tip
AnimSequence objects for 1st person animations are usually located in `DEVICES_{number}_ASSETS_SF.upk` files, under the `AS_WEP_{character}_skin00a_1p` AnimSet object. You have to figure out which number corresponds to your character. The ones for 3rd person animations are located in `ASSETS_{CHARACTER}_SF.upk` files.`
:::
3. Once you've located the AnimSequence, take note of its SequenceName as well as the AnimSet and close UPK Explorer.
4. Open your UPK file with UE Viewer, and navigate until you locate your AnimSequence. Export the current object as a PSK export. You will have two files: the mesh **.psk file** and the animation **.psa file**.

## 2. Editing the animation

1. Open Blender. Make sure you have the PSK/PSA extension installed.
2. Import the PSK file, select your skeleton.
3. Import the PSA file.
4. Select the animation you want to edit and get to work.
::: danger
Do not remove or add bones. You may only change their positions within your animation.
:::
5. Once you're done creating your animation, export your PSA and select all animations.

## 3. Injecting into the UPK

1. Open the command prompt and navigate to the folder where your PSA to UPK injector script is located.
2. Use the following the following command:
    ```bash
    python ue3_psa_upk_injector.py --upk {Workable UPK File} --psa-original {First PSA export file} --psa-modified {Edited PSA file} --sequence {SequenceName} --animset {AnimSet} --out {Output UPK file}
    ```
    This command will run the injection script and will output a UPK File. You may verify your animation was properly injected through UE Viewer.
4. Compress the output UPK with UPK Parser. You now have a mod you may cook with Tempest.