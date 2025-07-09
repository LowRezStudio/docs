---
description: A list of frequently asked questions about Tempest Launcher, including troubleshooting tips and guides for multiplayer.
---

# FAQ / Common Issues

Here are some of the most frequently asked questions.

## What is Tempest?

The [Tempest Launcher](/tempest/introduction) is a community-driven project created in order to preserve Paladins and ensure that the game remains playable both in singleplayer and multiplayer on community-hosted modded servers, even if official support ends.

## How do I get in game once I launched?

Make sure `Enable Console` is checked in the launcher settings, at the login screen type anything into the user and pass and click login. Once it says `Logging in`, press `F1` on your keyboard.

## I can't install any version, the download arrow button does nothing

Make sure you've selected a `Build Directory`, this will define where the builds are downloaded

## How do I participate in a playtest?

1. First of all you need to have `OB 57` downloaded<br>
2. Then you'll need to download a program called `RAdmin VPN` and join the network, to do that once you installed it, open it and go into `Network -> Join Network`
   > The Network name is `paladinskana` and the Password is `kana123`
3. Then on Tempest settings, make sure `Enable Console` is checked and load the multiplayer mod (the upk file) that you've downloaded using the + icon next to Mod Loader
4. Then, in the launch options at the top of the setting, enter the ip address of the host followed by the parameters for your name and champion
   > Example Launch Args: `26.203.83.83?name=Cinnamon?class=shalin`

## How do I host a server?

1. Download the [TempestMp Mod](/tempest/changelogtmp) and the [Server DLL](https://cdn.discordapp.com/attachments/1377178319107129344/1390765366904360980/TempestMod57.dll?ex=686f616e&is=686e0fee&hm=77cb90f996aaf5dccf41db6a7ceb8b57096f53688288ce2770b8e9e746bfa17b&)
2. Make sure you are logged in `RAdmin VPN`
   > The Network name is `paladinskana` and the Password is `kana123`
3. Load the [TempestMp Mod](/tempest/changelogtmp) using the Mod Loader and make sure `Enable Console` is checked.
4. Then, in the launch options at the top of the setting, enter the `server` launch argument followed by the map, gamemode and allowedChampions.
   > Example Launch Args: `server IMM_P_Igloo_v02?game=TempestMp.Siege?allowedChampions=barik,bombking,lian,maeve,zhin,lex,inara,jenos,shalin -log`
   > ::: warning
   > Make sure you have `-log` at the end<br>
   > While there is no limit on how much champions server hosters can precache, We recommend that you avoid going above 10.<br>
   > As of right now, only `Siege` is supported.
   > :::
5. As soon as the server log appears, pause it by selecting any text in the console window.
6. Use an injector to inject the [Server DLL](https://cdn.discordapp.com/attachments/1377178319107129344/1390765366904360980/TempestMod57.dll?ex=686f616e&is=686e0fee&hm=77cb90f996aaf5dccf41db6a7ceb8b57096f53688288ce2770b8e9e746bfa17b&).
   > We recommend Cheat Engine or Process Hacker.
7. Unpause the server by right clicking in the console window. You can then share your RAdmin ip to anyone.

## Can you balance the game, like change champions damage, health etc?

Short answer: No<br>
Long answer: Yes, but it requires going through the [assembly](/marshal/files/assembly) file to make changes about a specific value for a specific champion which is tedious to do and not a priority, then everyone needs to have the same [assembly](/marshal/files/assembly) file
