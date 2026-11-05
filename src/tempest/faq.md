---
title: FAQ
description: Answers to common Tempest launcher questions. Download and repair patches, import a Paladins install, install mods, join or host a private server, and fix common problems.
---

# FAQ

Quick answers to the questions that come up most often. Follow the links for the full guides.

## Getting started

### What is Tempest?

Tempest is the community Paladins launcher built by [LowRezStudio](https://lowrezstudio.com). It
downloads and runs any Paladins release from 2016 to 2026, installs mods, and sets up private
servers. It is a community project, not affiliated with Hi-Rez Studios.

### What is an instance?

An instance is one Paladins patch with its own game files, mods, launch options and settings. Keep
as many side by side as you like; installing a mod on one does not touch the others.

### What is Tempest Legacy?

Tempest Legacy is the previous launcher. Its documentation is archived under
[Tempest Legacy](/tempest-legacy/introduction). Use the current launcher for new installs; the
legacy pages are still there for the old console commands and VPN-based multiplayer setup.

### How do I install Tempest?

Download the latest build from the
[Tempest releases page](https://github.com/LowRezStudio/Tempest/releases): an installer on
Windows, a `.dmg` on macOS, and an AppImage, `.deb` or `.rpm` on Linux. Run it and follow onboarding:
pick a language and username, import any Paladins installs it finds, and optionally download a first
patch.

### Which platforms are supported?

The launcher ships for Windows, macOS and Linux. On macOS and Linux, Paladins runs through Wine or
Proton; choose the runtime under **Settings → Wine**. On Linux you can also use Gamescope and the
Steam runtime.

### Do I need to own Paladins?

No. Tempest downloads archived patches itself. Only the live 8.1 patch uses a real account; choose
Steam, Epic Games or Hi-Rez when you add it. If you already have Paladins installed, import it
instead of downloading another copy.

### How do I download a patch?

In **Library**, choose **New Instance → Download a patch**, pick the patch and press **Download**.
Name it and choose an install folder if you want; otherwise it goes to the default instance folder
from onboarding (**Settings → General**). Progress and queued downloads are in **Downloads**.

### How do I import my existing Paladins install?

Choose **New Instance → Import a folder**. Tempest scans Steam, Epic Games, Hi-Rez installs and your
drives, lists what it finds, and identifies each build. Importing uses the folder where it is.
Tempest only imports builds it knows exactly; if a folder is unrecognised, download that patch
through Tempest instead.

### How do I launch the game and log in?

Open the instance and press **Play**. Archived patches use a local login: type any username and
password and choose **Log in**. The client can sit on "Logging in" for a moment before the menu
appears. Patch 8.1 is the live game, so sign in with the Steam, Epic Games or Hi-Rez account you
chose when adding it.

### How do I update or repair a patch?

**Verify** from the instance's **⋯** menu compares every file with the patch's download and fetches
anything missing or damaged. If Tempest's own setup files are the problem, choose **Run Setup** from
the same menu; that reinstalls the bundled mod and rebuilds the data Tempest needs to launch the
instance.

### How do I update the launcher?

Tempest checks for updates on its own. On Windows it downloads and installs them; on Linux and macOS,
update the package you installed it from. You can also check from **Settings → About → Check for
Updates**.

### How do I remove a patch?

Use **Delete Instance** in the instance's **⋯** menu. You can remove it from the library (the game
folder and mods stay on disk), remove it and uninstall its mods, or delete the whole game folder.

## Multiplayer

### Which patch do I need for multiplayer?

0.57. The server browser and hosting are experimental and currently only support 0.57; other
patches are for singleplayer, mods and revisiting old versions.

### How do I join a server?

Open **Servers** and pick a server from **Internet** for public games or **LAN** for local ones. If
the server is not listed, choose **Join server** and enter its address and port; the default port is
50051. Team and champion selection happen in the launcher lobby.

### How do I host a server?

Download a 0.57 instance, then open **Servers → Host server**. Choose the instance, server name,
gamemode and optional password, and decide whether it is public. Under **Advanced** you can set
player and spectator limits, tags, the join port, the game server port and UPnP. Start the server and
share the address with your players; public servers appear in the server browser.

### Do I still need RAdmin VPN?

Not for normal play. RAdmin was the workaround in Tempest Legacy before the launcher had a server
browser and host wizard. Use the server list or **Join server** first. If your network cannot accept
direct connections, enable UPnP or forward the ports, or use a VPN as before.

## Mods

### How do I install a mod?

Open the instance and switch to **Discover**, which only lists mods compatible with that patch. Open
a mod and choose **Install**; updates show an **Update** button. You can also drag a `.tempest` file
onto the instance, use **Install Mod…** in the instance menu, or choose **Install in Tempest** on
[mods.lowrezstudio.com](https://mods.lowrezstudio.com). If the game is running, most installs wait
until you close it.

### Why can't I find a mod?

**Discover** only shows versions that list the instance's patch as compatible, and some mods support
only specific patches. Check the mod's page for its versions, and make sure the instance is on a
supported patch. If it is installed but not working, check that it is enabled and that any
dependencies are installed and enabled too.

### Windows Security blocked Tempest's mod files. What do I do?

Tempest injects mod code into the game, and antivirus heuristics sometimes treat that injector as
malware. The launcher detects Windows Security blocks and offers to add the needed exclusions; accept
the administrator prompt. If you use another antivirus, add the same folders to its exclusion list.
You can also launch without mod DLLs to play unmodded.

### Are mods safe to install?

Mods that contain Lua scripts or DLLs can run code on your machine, so they must be signed and are
reviewed before listing. The launcher labels the signer and warns before installing code from a
signer the team has not vetted. Asset-only mods are published without review. Read
[Trust and moderation](/mods/trust) before installing anything you are unsure about.

### Do mods change my game files?

Yes, but only inside that instance. The launcher backs up each game file before a mod changes it,
rebuilds patched files when the enabled mods change, and **Verify** can restore a clean copy. Other
instances are untouched.

## Troubleshooting

### Where are the logs?

Open **Logs** in the sidebar. The filters split game launch, lobby, downloads, setup and mod output.
When asking for help, include the launcher version from **Settings → About** and the relevant log
lines.

### The game won't start or keeps crashing.

Check the **Logs** tab first, then **Verify** the instance. If you added mods recently, disable them
and try again; the antivirus dialog can also launch without DLLs. On 10th–12th-generation Intel CPUs,
keep **OpenSSL ICAPIcap fix** enabled under **Settings → Launching**. If it still fails, ask in
Discord with the log.

### Tempest can't identify my Paladins folder.

Tempest only imports builds it can identify exactly, so a modified, merged or unknown build is
refused. Download that patch through Tempest instead, or point Tempest at an untouched install of a
known patch.

### Where can I get help?

Ask in the [community Discord](https://discord.gg/YPXJEaNPPe) or open an issue on
[GitHub](https://github.com/LowRezStudio/Tempest/issues). Include what you were doing, the patch and
launcher version, and any log lines from **Logs**.
