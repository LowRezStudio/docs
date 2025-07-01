# FAQ / Common Issues

Here are some of the most frequently asked questions.

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
1. Download the [TempestMp Mod](https://cdn.discordapp.com/attachments/1377178319107129344/1387080142697922710/TempestMp.upk?ex=6865450c&is=6863f38c&hm=61ad36d83ad351f2ddd6fa0450176064bee3632a21dba4866702b0ddf0c52b86&) and the [Server DLL](https://cdn.discordapp.com/attachments/1377178319107129344/1386381265867112680/TempestMod57.dll?ex=6864b46b&is=686362eb&hm=b6cc7ae8e8f21e9e4ef099184fd087549a7640725913dd2419f31f4114bfc313&)
2. Make sure you are logged in `RAdmin VPN`
> The Network name is `paladinskana` and the Password is `kana123`
3. Load the [TempestMp Mod](https://cdn.discordapp.com/attachments/1377178319107129344/1387080142697922710/TempestMp.upk?ex=6865450c&is=6863f38c&hm=61ad36d83ad351f2ddd6fa0450176064bee3632a21dba4866702b0ddf0c52b86&) using the Mod Loader and make sure `Enable Console` is checked.
4. Then, in the launch options at the top of the setting, enter the `server` launch argument followed by the map, gamemode and allowedChampions.
> Example Launch Args: `server IMM_P_Igloo_v02?game=TempestMp.Siege?allowedChampions=barik,bombking,lian,maeve,zhin,lex,inara,jenos,shalin -log`
::: warning
Make sure you have `-log` at the end<br>
While there is no limit on how much champions server hosters can precache, We recommend that you avoid going above 10.<br>
As of right now, only `Siege` is supported.
:::
5. As soon as the server log appears, pause it by selecting any text in the console window.
6. Use an injector to inject the [Server DLL](https://cdn.discordapp.com/attachments/1377178319107129344/1386381265867112680/TempestMod57.dll?ex=6864b46b&is=686362eb&hm=b6cc7ae8e8f21e9e4ef099184fd087549a7640725913dd2419f31f4114bfc313&).
> We recommend Cheat Engine or Process Hacker.
7. Unpause the server by right clicking in the console window. You can then share your RAdmin ip to anyone.
## Can you balance the game, like change champions damage, health etc?
Short answer: No<br>
Long answer: Yes, but it requires going through the [assembly](/marshal/files/assembly) file to make changes about a specific value for a specific champion which is tedious to do and not a priority, then everyone needs to have the same [assembly](/marshal/files/assembly) file 