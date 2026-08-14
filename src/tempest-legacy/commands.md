---
description: A list of console commands, gamemodes and maps available in Paladins.
---

# Commands

Activate the console by pressing F2 when in game with the `Enable Console` option checked in the launcher.

## _Useful_ commands

- `disconnect` - Return to login screen
- `changetaskforce <TEAM>` - Assigns you to the given team (usually 1 or 2)
- `god` - Toggles godmode
- `cooldown` - Removes cooldowns
- `fillenergy` - Gives ultimate
- `switchclass <CHAMPION>` - Changes champion
- `spawnbot <CHAMPION> <TEAM> <AMOUNT>` - Spawns bots
- `ghost` - Allows you to move through walls
- `walk` - Returns you to normal state, opposite of `ghost`
- `EDBN <DEVICE> <SLOT>` - Equip Device By Name, lets you equip a device[^1]
- `TEDBN <DEVICE> <SLOT>` - Target Equip Device By Name, lets you equip a device[^1] on another player
- `Pushscene` - UIHome (when used at the login screen, allows you to see the game menus)
- `Popscene` - For UI soft locks
- `Set3p` - Third person
- `Set1p` - First person
- `freezeai` - Freezes all bots
- `allowmount 1` - Alpha animations

## Map files

::: warning
This list is incomplete.
:::

**Command:** `switchlevel <MAPNAME>?game=<GAMEMODE>`

These map names correspond to the given `.upk` files in `ChaosGame/CookedPCConsole`.

<MapIds/>

### Battlegrounds

- `BG_P`

## Gamemodes

::: warning
This list is FAR from complete and varies between patches as well.
:::

### Siege:

- `TgGame.TgGame_ChaosSiege_CaptureAndPayload`
- `TgGame.TgGame_Paladins_Siege`

### Payload

- `TgGame.TgGame_Paladins_Payload`

### Onslaught

- `TgGame.TgGame_Paladins_Onslaught`

### Battlegrounds:

- `TgGame.TgGame_Royale`

## Inventory Slots

| Slot | Device                |
| :--- | :-------------------- |
| 1    | Primary               |
| 2    | Ultimate              |
| 3    | "Q Ability"           |
| 4    | "F Ability"           |
| 5    | None                  |
| 6    | None                  |
| 7    | Emote                 |
| 8    | Item 1                |
| 9    | Item 2                |
| 10   | Item 3                |
| 11   | Item 4                |
| 12   | None                  |
| 13   | Regeneration Passive  |
| 14   | None                  |
| 15   | Energy Charge Passive |
| 16   | Alt Fire              |
| 17   | Spray                 |
| 18   | None                  |
| 19   | Loadout card 1        |
| 20   | Loadout card 2        |
| 21   | Loadout card 3        |
| 22   | Loadout card 4        |
| 23   | Horse                 |
| 24   | Combo                 |
| 25   | None                  |
| 26   | Talent                |

## Definitions

[^1]: A device can be a weapon, ability, card or talent
