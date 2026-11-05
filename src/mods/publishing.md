---
title: Publishing mods
description: Pack, sign and upload a Tempest mod to mods.lowrezstudio.com with Tempest Studio, the launcher's Mod Cooker or the tempest command line.
---

# Publishing mods

## Before publishing

These rules apply to every mod published on
[mods.lowrezstudio.com](https://mods.lowrezstudio.com), including its page and everything uploaded
with it: models, skins, textures, maps, UI, screenshots, previews, title, description and tags. We do
not tolerate cheating or nudity.

### No cheating, hacking or exploits

A mod must:

- fix a bug, or add custom content such as a texture, skin, map, voice line, sound or another custom
  element;
- not give a direct gameplay advantage;
- not provide a way to obtain locked content such as skins, borders, titles or other cosmetics;
- not grant or modify in-game currency.

A mod page must not advertise or link to cheats, hacks, exploits, hacking software, piracy or
copyright infringement, link to suspicious files or sites, use link shorteners, or show or teach a
glitch that gives a gameplay advantage.

### No nudity or sexual content

This covers the mod itself and its screenshots, previews, title, description and tags. Mods that
change how characters look are judged on how the character ends up looking in game as well as on the
files they contain.

- **No pornography.** No nudity, sexual acts, explicit descriptions, or touching or stimulating
  genitals, even through clothing. Objects that resemble genitals or are used for sexual purposes,
  such as adult toys, whips or paddles, are also not allowed.
- **Clothing.** Swimwear and underwear are generally allowed. Sexual lace lingerie, garter belts,
  sexual full-body suits and masks are not. Clothing must cover female nipples, at least 50% of each
  breast and butt cheek, and all genitals. Subtle bumps or wedges are fine; literal outlines are not.
- **Positions and angles.** No upskirt shots (drawn or in-game), no "from below while standing" or
  "from behind while lying down or bending over" angles, no spreading or raising the legs above the
  waist, and no sexual restraint such as leashes, collars or being tied up.
- **Body proportions and focus.** Body changes are allowed but must stay realistic. Do not exaggerate
  proportions, expose or focus on specific body parts (especially genitals), or use the title or
  description to draw attention to them.
- **Page text and links.** Sexually inappropriate or disrespectful text on the mod page is not
  allowed. Do not link to explicit content; if a link is not needed to use the mod, leave it out.

There is no mature-content exception: if it would not be safe to show in public, it does not belong
on the repository. Every submission is judged case by case, and a mod that breaks these rules is
rejected or removed.

### Ownership

Do not upload someone else's work as your own. If you believe a mod uses your content without
permission, report it to the moderation team with proof of ownership. We review the report and remove
content that infringes copyright.

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
