---
title: Trust and moderation
description: How the Tempest mod repository signs, labels and reviews mods, and how to report one.
---

# Trust and moderation

Every package with Lua scripts or DLLs must be signed, and the repository checks the signature
against the publisher's registered key. Mods are labelled:

- **Tempest team**: signed by a team key, approved automatically.
- **Trusted signer**: a key listed in the launcher's trusted key list.
- **Unknown signer**: a key the team has not vetted. The code was still reviewed by a moderator
  before the mod was listed; the launcher asks before installing it.

Asset-only mods (textures, sounds, UPK and config files) are published immediately. Anything with
code waits in the moderation queue, where a moderator reads every Lua file (with a diff against
the last approved version) before it is listed.

## Reporting a mod

Every mod page has **Report this mod**. Reports are anonymous; moderators see the reason and
your note.
