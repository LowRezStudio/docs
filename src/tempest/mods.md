---
title: Mod repository
description: Browse, install and publish Tempest mods through mods.lowrezstudio.com, from the launcher or the command line.
---

# Mod repository

[mods.lowrezstudio.com](https://mods.lowrezstudio.com) is where Tempest mods are published. The
launcher reads it directly, so installing a mod is one click, and publishers upload their `.tempest`
packages there for review.

## Installing mods

- **From the launcher**: open an instance and switch to the **Browse** tab. It only shows mods
  compatible with that instance's patch. Installed mods that have a newer version show an
  **Update** button, and a popup lists all available updates when you open the instance.
  Open a mod's details to read its readme, see every version and downgrade if you need to.
- **From the website**: every mod page has **Install in Tempest**, which opens the launcher through
  a `tempest://install` link, and a **Download** button for the package itself.
- **From the command line**: `tempest mod install <game folder> <mod id>` fetches the newest
  version compatible with the instance (`--patch 0.57` to pick a patch, `<id>@1.2.0` for an exact
  version). `tempest mod search <words>` searches the repository.

The repository URL is configurable in the launcher under **Settings → Advanced**.

## The command line

The launcher bundles the Tempest CLI and makes it available in your terminal as `tempest`:
Windows and Linux set it up automatically the first time the launcher runs, and on macOS you
can install it from **Settings → Advanced → Terminal command** (it may ask for administrator
permission to place it in `/usr/local/bin`).

With it you can manage mods without the launcher, and script your own workflows:

```text
tempest mod list <game folder>          installed mods
tempest mod install <game folder> x     install a .tempest file or repository id
tempest mod remove <game folder> <name> remove a mod
tempest mod enable/disable ...          toggle a mod
tempest mod search <words>              search the repository
tempest mod login / publish ...         publish to the repository (see below)
tempest marshal ...                     token/assembly tooling used by instance setup
```

Run `tempest --help` and `tempest mod --help` for the full reference. If the command is not
found after installing the launcher, reinstall it from **Settings → Advanced** and open a new
terminal.

## Trust

Every package with Lua scripts or DLLs must be signed, and the repository checks the signature
against the publisher's registered key. Mods are labelled:

- **Tempest team**: signed by a team key, approved automatically.
- **Trusted signer**: a key listed in the launcher's trusted key list.
- **Unknown signer**: a key the team has not vetted. The code was still reviewed by a moderator
  before the mod was listed; the launcher asks before installing it.

Asset-only mods (textures, sounds, UPK and config files) are published immediately. Anything with
code waits in the moderation queue, where a moderator reads every Lua file (with a diff against
the last approved version) before it is listed.

## Publishing

1. **Pack**: `tempest mod pack ./my-mod my-mod.tempest`. The `id` in `manifest.toml` becomes the
   mod's permanent id; it must be lowercase (`my-mod`, not `My Mod`) and every upload needs a
   higher semver `version`.
2. **Sign** (code mods): `tempest mod gen-key` once, then `tempest mod sign my-mod.tempest`.
3. **Sign in** on the website with GitHub or Discord and accept the publishing terms.
4. **Register your key** under **Settings → Signing keys**: paste the `tempest.pub` content, then
   prove you hold the private key by signing the challenge the page shows with
   `tempest mod sign-text "<challenge>"` and pasting the signature. Only verified keys count.
5. **Upload**: drop the package on **Publish a mod**, pick the compatible patches (a range such as
   "0.56 and later", or specific patches) and add a summary, tags and a changelog. Or from the
   command line: create an API key under **Settings → API keys**, then

    ```
    tempest mod login tm_live_…
    tempest mod publish my-mod.tempest --from 0.56 --summary "What it does" --tags hud,overlay
    ```

The dashboard shows each version's status: **pending review**, **changes requested** (read the
moderator's note, fix, upload a higher version), **approved** or **rejected**. Packages are limited
to 500 MB.

For a new version of an existing mod, use **New version** on the mod page: compatibility and the
listing are prefilled from the current one, only the changelog is new.

## Reporting a mod

Every mod page has **Report this mod**. Reports are anonymous; moderators see the reason and
your note.
