---
title: Installing mods
description: Install Tempest mods from the launcher, the mods.lowrezstudio.com website or the tempest command line, and keep them up to date.
---

# Installing mods

## From the launcher

Open an instance and switch to the **Browse** tab, which only lists mods compatible with that
instance's patch. When an installed mod has a newer version it shows an **Update** button, and
opening the instance brings up a popup with every available update. A mod's details page has its
readme and the full version list, so you can downgrade if you need to.

The launcher uses mods.lowrezstudio.com by default. You can point it at another repository under
**Settings → Advanced**.

## From the website

Every mod page has an **Install in Tempest** button that opens the launcher through a
`tempest://install` link. **Download** gives you the package file instead.

## From the command line

The launcher bundles the Tempest CLI as `tempest`. [Command line](/tempest/cli) covers setup and
the full command reference. To install the newest version compatible with an instance:

```text
tempest mod install <game folder> <mod id>
```

Add `--patch 0.57` to target a specific patch, or write `<id>@1.2.0` to pin an exact version.
`tempest mod search <words>` searches the repository.

## Signed mods

Mods that contain code are signed by their publisher. [Trust and moderation](/mods/trust) explains
the signer labels the launcher shows.
