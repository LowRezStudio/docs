---
title: Trust and moderation
description: How the Tempest mod repository signs, labels and reviews mods, and how to report one.
---

# Trust and moderation

## Signing

Every package with Lua scripts or DLLs has to be signed, and the repository checks the signature
against the publisher's registered key. Each mod gets one of three labels based on who signed it:

- **Tempest team** mods are signed with a team key and approved automatically.
- **Trusted signer** mods are signed with a key on the launcher's trusted key list.
- **Unknown signer** mods use a key the team hasn't vetted. A moderator still reviewed the code
  before listing the mod, and the launcher asks you before installing it.

## Review

Asset-only mods (textures, sounds, UPK and config files) are published immediately. Anything with
code waits in the moderation queue until a moderator has read every Lua file, compared against the
last approved version.

## Reporting a mod

Use **Report this mod** on the mod's page. Reports are anonymous: moderators see the reason you pick
and your note, not who sent it.
