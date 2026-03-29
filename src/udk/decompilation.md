---
description: Instructions on how to decompile scripts inside Paladins .upk files in order to make dummy files.
---

# Decompiling scripts inside .upk files

The folder `<Paladins install folder>/ChaosGame/CookedPCConsole` contains compressed .upk files. Some of the .upk files contain scripts. For this guide, we will use `TgGame.upk`.

## Decompressing

Install the "Unreal Package Decompressor" from https://www.gildor.org/downloads. Run it like this: `decompress.exe -game=smite TgGame.upk`. It will generate a new folder `unpacked` that contains the decompressed files.

## Opening .upk files and decompiling the scripts

Install UE Explorer from https://github.com/UE-Explorer/UE-Explorer/releases. Open the decompressed files with it. It will automatically decompile the scripts.
