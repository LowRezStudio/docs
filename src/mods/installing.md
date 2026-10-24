---
title: Installing mods
description: Install Tempest mods from the launcher, the mods.lowrezstudio.com website or the tempest command line, and keep them up to date.
---

# Installing mods

- **From the launcher**: open an instance and switch to the **Browse** tab. It only shows mods
  compatible with that instance's patch. Installed mods that have a newer version show an
  **Update** button, and a popup lists all available updates when you open the instance.
  Open a mod's details to read its readme, see every version and downgrade if you need to.
- **From the website**: every mod page has **Install in Tempest**, which opens the launcher through
  a `tempest://install` link, and a **Download** button for the package itself.
- **From the command line**: the launcher bundles the Tempest CLI as `tempest` (see
  [Command line](/tempest/cli) for setup and the command reference).
  `tempest mod install <game folder> <mod id>` fetches the newest version compatible with the
  instance (`--patch 0.57` to pick a patch, `<id>@1.2.0` for an exact version).
  `tempest mod search <words>` searches the repository.

The repository URL is configurable in the launcher under **Settings → Advanced**.

Mods with code come from signed packages; see [Trust and moderation](/mods/trust) for what the
signer labels mean.
