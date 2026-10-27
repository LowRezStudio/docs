---
title: Publishing mods
description: Pack, sign and upload a Tempest mod to mods.lowrezstudio.com with Tempest Studio, the launcher's Mod Cooker or the tempest command line.
---

# Publishing mods

## With Tempest Studio

If you made your changes in [Tempest Studio](/studio/introduction), build the mod there: the
[mod cooker](/studio/mod-cooker) ships each changed game file as a [delta](/mods/deltas), signs the
package with your key, installs it to try it, and publishes it once you add an API key (steps 3 and 4
below still apply).

## With the launcher's Mod Cooker

The launcher's **Mod Cooker** is the easiest way to get a signed package. Turn on **Mod developer**
in the settings, open **Cook Mod** in the sidebar, drop your files (or an old v1 package) in, and
cook. You get a signed `.tempest` file ready to upload.

## With the command line

1. Pack the mod with `tempest mod pack ./my-mod my-mod.tempest`. The `id` in `manifest.toml`
   becomes the mod's permanent id. It has to be lowercase (`my-mod`, not `My Mod`), and each upload
   needs a higher semver `version` than the last.
2. Sign it if it contains code: run `tempest mod gen-key` once, then
   `tempest mod sign my-mod.tempest`.
3. Sign in on the website with GitHub or Discord and accept the publishing terms.
4. Register your key under **Settings → Signing keys** by pasting the contents of `tempest.pub`.
   The page then shows a challenge; sign it and paste the signature back to prove you hold the
   private key. Only verified keys count. You can sign the challenge in the launcher under
   **Settings → Mod Publishing → Verify Key**, or from the command line:

    ```
    tempest mod sign-text "<challenge>"
    ```

5. Upload the package. Publishing from the launcher is turned off for now (it sits behind a
   `mod-publishing` feature flag), so drop your package on **Publish a mod** on the website. Pick
   the patches it works with, either a range such as "0.56 and later" or specific patches, and add
   a summary, tags and a changelog. The command line can still publish once you create an API key
   under **Settings → API keys**:

    ```
    tempest mod login tm_live_…
    tempest mod publish my-mod.tempest --from 0.56 --summary "What it does" --tags hud,overlay
    ```

## After uploading

The dashboard shows where each version stands: **pending review**, **approved**, **rejected**, or
**changes requested**. For changes requested, read the moderator's note, fix the mod and upload a
higher version. Packages can be up to 500 MB.

To release a new version of an existing mod, use **New version** on its page. The compatibility and
listing carry over from the current version, so you only write the changelog.

Packages with Lua scripts or DLLs are reviewed before they're listed. See
[Trust and moderation](/mods/trust) for how that works.
