---
title: Publishing mods
description: Pack, sign and upload a Tempest mod to mods.lowrezstudio.com with the Mod Cooker or the tempest command line.
---

# Publishing mods

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

Packages with Lua scripts or DLLs go through moderation before they are listed; see
[Trust and moderation](/mods/trust).
