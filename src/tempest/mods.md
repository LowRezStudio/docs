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

The launcher bundles the Tempest CLI so you can manage mods from a terminal as `tempest` —
see [Command line](/tempest/cli) for setup and the command reference. In short:

- `tempest mod install <game folder> <mod id>` fetches the newest version compatible with the
  instance (`--patch 0.57` to pick a patch, `<id>@1.2.0` for an exact version).
- `tempest mod search <words>` searches the repository.

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

The easiest way to get a signed package is the launcher's **Mod Cooker**: enable **Mod developer**
in the settings, open **Cook Mod** in the sidebar, drop your files (or an old v1 package) in, and
cook — it produces a signed `.tempest` ready to upload. The command line works too:

1. **Pack**: `tempest mod pack ./my-mod my-mod.tempest`. The `id` in `manifest.toml` becomes the
   mod's permanent id; it must be lowercase (`my-mod`, not `My Mod`) and every upload needs a
   higher semver `version`.
2. **Sign** (code mods): `tempest mod gen-key` once, then `tempest mod sign my-mod.tempest`.
3. **Sign in** on the website with GitHub or Discord and accept the publishing terms.
4. **Register your key** under **Settings → Signing keys**: paste the `tempest.pub` content, then
   prove you hold the private key by signing the challenge the page shows and pasting the
   signature. Only verified keys count. You can sign the challenge from the launcher
   (**Settings → Mod Publishing → Verify Key**, paste the challenge and copy the signature
   back) or the command line:

    ```
    tempest mod sign-text "<challenge>"
    ```

5. **Upload**: publishing from the launcher is disabled for now (a `mod-publishing` feature
   flag turn-on away), so download your package and drop it on **Publish a mod** by hand. Pick
   the compatible patches (a range such as "0.56 and later", or specific patches) and add a
   summary, tags and a changelog. Command line publishing still works: create an API key under
   **Settings → API keys**, then

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
