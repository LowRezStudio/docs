---
title: FAQ
description: Answers to common Tempest launcher questions. Install and repair patches, import a Paladins install, use mods, join or host a 0.57 server, read logs, and understand how Tempest handles cheating.
---

# FAQ

This page covers the current launcher. The older one is archived under
[Tempest Legacy](/tempest-legacy/introduction).

## Getting started

### What is Tempest?

Tempest is the community Paladins launcher. It downloads and launches any Paladins patch from 2016
to 2026, keeps each patch as its own instance, installs mods from the mod repository, and hosts or
joins 0.57 private servers. It also includes a
download manager, process logs, and the `tempest` command line tool. It is a community project, not
affiliated with Hi-Rez Studios.

### What is an instance?

An instance is one Paladins patch with its own game folder, mods, launch options and settings. Keep
as many side by side as you like; they all appear in the sidebar. Installing a mod or changing a
setting in one does not touch the others.

### What is Tempest Legacy?

Tempest Legacy is the previous launcher. Its documentation is archived under
[Tempest Legacy](/tempest-legacy/introduction). Use the current launcher for new installs; the
legacy pages are still there for the old console commands and manual launch arguments.

### How do I install Tempest?

Download the latest build from the
[Tempest releases page](https://github.com/LowRezStudio/Tempest/releases): an installer on Windows,
a `.dmg` on macOS, and an AppImage, `.deb` or `.rpm` on Linux. Run it and follow onboarding: choose a
language and username, import any Paladins installs it finds, and optionally download a first patch.
If you already have Paladins, onboarding can import it and skip the download.

### Which platforms are supported?

The launcher ships for Windows, macOS and Linux. On macOS and Linux, Paladins runs through Wine; on
Linux you can use Proton instead. Choose the runtime under **Settings → Wine**. Linux also supports
Gamescope and the Steam runtime.

### Do I need to own Paladins?

No. Tempest downloads archived patches itself. Only the live 8.1 patch uses a real account; choose
Steam, Epic Games or Hi-Rez when you add it. If you already have Paladins installed, import it
instead of downloading another copy.

### How do I download a patch?

In **Library**, choose **New Instance → Download a patch**, pick the patch, and press **Download**.
You can name the instance and choose an install folder; otherwise it goes to the default instance
folder from onboarding (**Settings → General**). Downloads run one at a time and appear in
**Downloads**, with progress, speed and any errors. If one fails, press **Retry** on its row.

If the normal download does not work, open the patch picker and expand **Download with
DepotDownloader instead**. It gives you a command that fetches the same files through your own Steam
account; import the folder when it finishes.

### How do I import my existing Paladins install?

Choose **New Instance → Import a folder**. Tempest scans Steam, Epic Games, Hi-Rez installs and your
drives, lists what it finds, and identifies each build. You can pick several folders at once, and the
files stay where they are. Tempest only imports builds it knows exactly; if a folder is
unrecognised, download that patch through Tempest instead.

### How do I launch the game and log in?

Open the instance and press **Play**. Archived patches use a local login: type any username and
password and choose **Log in**. The client can sit on "Logging in" for a moment before the menu
appears. Patch 8.1 is the live game, so sign in with the Steam, Epic Games or Hi-Rez account you
chose when adding it.

### How do I update or repair a patch?

**Verify** from the instance's **⋯** menu compares every file with the patch's download and fetches
anything missing or damaged; progress and the repaired file count appear in **Downloads**. If
Tempest's own setup files are the problem, choose **Run Setup** from the same menu; that reinstalls
the bundled mod and rebuilds the data Tempest needs to launch the instance. Verify needs an instance
whose patch Tempest recognises.

### How do I update the launcher?

Tempest checks for updates on its own. On Windows, and on Linux installs that can update themselves
(AppImage and `.deb`/`.rpm` packages with a supported package manager), it downloads and installs the
update. On macOS, download the new version from the releases page. You can also check from
**Settings → About → Check for Updates**.

### How do I remove a patch?

Use **Delete Instance** in the instance's **⋯** menu. You can remove it from the library (the game
folder and mods stay on disk), remove it and uninstall its mods, or delete the whole game folder.

### Is there a command line?

Yes. The launcher installs a `tempest` command for managing mods, searching and publishing to the
repository, and the tooling used during instance setup. If the command is missing, install it from
**Settings → Terminal command**. See [Command line](/tempest/cli) for the full reference.

### How does Tempest deal with cheats?

**Skipping the anti-cheat does not make cheating easier, and Tempest blocks cheats from loading
through the launcher.**

EAC, the game's official anti-cheat, is no longer active anywhere: its heartbeat is gone, and it
no longer even loads. There is nothing for Tempest to disable. It skips launching EAC because
starting it would only waste time.

To keep cheats out, the launcher is stricter about code than a normal mod loader. Code mods must be
signed, and unsigned DLLs are never injected. Before every launch the launcher rechecks installed
files against their signed checksums, and disables any mod that was edited after install or whose key
was revoked.

Lua and DLL mods also wait for a moderator to read them before they appear in **Discover**.

None of this detects an aimbot or wallhack that someone runs outside the launcher. Tempest has no
feature for loading arbitrary DLLs from another player or server, but a cheater can still bring their
own tool.

## Mods

### How do I install a mod?

Open the instance and switch to **Discover**, which only lists mods compatible with that patch. Open
a mod and choose **Install**; updates show an **Update** button. You can also drop a `.tempest`,
`.zip`, `.upk` or `.pck` file anywhere on the instance's **Mods** page, use **Install Mod…** in the
instance menu, or choose **Install in Tempest** on
[mods.lowrezstudio.com](https://mods.lowrezstudio.com).

If the game is running, most installs wait until you close it. A mod that only contains Lua scripts
can install immediately and reload in the running game. Installed mods can be disabled without
removing them.

### How do mod updates work?

Tempest checks for new versions when you return to the launcher and installs them automatically by
default. Turn that off with **Settings → General → Automatically install updates**. While the game is
open, updates download and wait; Lua-only mods get an **Install and reload** button so they can be
applied without restarting.

### Why can't I find a mod?

**Discover** hides mods for other patches by default and only shows versions that list the instance's
patch as compatible. Use **Show them** to include other patches, and check the mod's version list on
its page. If a mod is installed but not working, check that it is enabled and that any dependencies
are installed and enabled too.

### Windows Security blocked Tempest's mod files. What do I do?

Tempest injects mod code into the game, and antivirus heuristics sometimes treat that injector as
malware. The launcher detects Windows Security blocks and offers to add the needed exclusions; accept
the administrator prompt. If you use another antivirus, add the same folders to its exclusion list.
You can also launch without mod DLLs to play unmodded.

### Are mods safe to install?

Mods that contain Lua scripts or DLLs run code on your machine, so they must be signed: trusted keys
install normally, unverified keys need you to accept a warning, and unsigned code is refused. The
installer also refuses paths outside the game and mod folder. At launch, installed mods are checked
against their signed checksums, and anything modified or revoked is disabled. Asset-only mods are not
reviewed.

The badge tells you what you are installing: **Official**, **Verified author**, **Reviewed**,
**Signed**, **Unsigned** or **Key revoked**. Read
[Trust and moderation](/mods/trust) before installing anything you are unsure about.

### Why was my mod disabled?

The launcher disables a mod when its files no longer match the signed checksums, or when its signing
key has been revoked. That usually means the mod was edited after it was installed. Reinstall the
mod from **Discover** instead of changing its files by hand.

### Do mods change my game files?

Yes, but only inside that instance. The launcher backs up each game file before a mod changes it,
rebuilds patched files when the enabled mods change, and **Verify** can restore a clean copy. Other
instances are untouched.

### Can I advertise my mod on Reddit?

Yes. On Reddit you can make one post a day.
The limit applies to Reddit posts, not to uploads on the mod repository. Reddit posts follow the same
[publishing rules](/mods/publishing#before-publishing) as mods on the repository.

## Troubleshooting

### Where are the logs?

It depends on which part is failing:

- **Launcher, downloads, setup or mod install:** open **Logs** in the sidebar. The tabs split the
  output by source: **Launch**, **Lobby**, **Rigby** (downloads), **Rigby Queue**, **Mods** and
  **Setup**. The search box filters the visible lines, and **Copy All** copies what is currently
  shown.
- **Game launch or crash:** open `Documents\My Games\Paladins\ChaosGame\Logs`. `Launch.log` is the
  current session, or the latest one if the game is closed. A second game window can write
  `Launch_2.log`; `Launch-backup*.log` files are older sessions. Archived instances use their own
  home folder, so if that folder is empty, look for `ChaosGame\Logs` under the instance's home folder
  instead of `Paladins`.
- **MCTS:** `<Paladins install>\Binaries\Logs`.
- **Lua mods:** `%TEMP%\tempest-scripting.log`, plus the console window next to the game. On Linux
  and macOS that file is inside the game's Wine prefix.

When asking for help, include the launcher version from **Settings → About**, the patch you were
using, what you did just before the problem, and the matching log.

### The game won't start or keeps crashing.

Check the **Logs** tab first, then **Verify** the instance. If you added mods recently, disable them
and try again; the antivirus dialog can also launch without DLLs. On 10th to 12th generation Intel CPUs,
keep **OpenSSL ICAPIcap fix** enabled under **Settings → Launching**. If it still fails, ask in
Discord with the log.

### Tempest can't identify my Paladins folder.

Tempest only imports builds it can identify exactly, so a modified, merged or unknown build is
refused. Download that patch through Tempest instead, or point Tempest at an untouched install of a
known patch.

### Where can I get help?

Ask in the [community Discord](https://discord.gg/YPXJEaNPPe) or open an issue on
[GitHub](https://github.com/LowRezStudio/Tempest/issues). For a specific mod, open it in **Discover**
and choose **Get help**; that starts an anonymous report thread in Discord. Include your launcher
version, patch and log lines.
