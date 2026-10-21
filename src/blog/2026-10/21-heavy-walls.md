---
title: "Heavy Walls: Solved"
description: "The Heavy Wall is a bug that has been plaguing paladins maps for 10 years"
date: "2026-10-21T12:00:00+01:00"
tags:
    - live
    - mods
    - investigation
---

The hitbox visualiser mod for Tempest, released by **Shiro**, has revealed the cause of a strange Paladins bug known as **heavy walls**. The issue has plagued the game since its inception, but its cause turns out to be surprisingly simple.

## First, rooftop physics

Paladins surfaces have a special boolean property called `m_bCanBaseOn`. When a surface is set to `False`, rooftop physics are enabled, preventing champions from standing on it.

The visualiser highlights surfaces with rooftop physics in **grey**. On **Stone Keep Classic**, the roofs shown here are correctly flagged: champions cannot stand on these surfaces.

<figure class="img-overlay">
	<img src="/blog/2026-10/stone-keep-classic-rooftops-heavy-walls-1.png" alt="Tempest visualiser view of Stone Keep Classic, with rooftops and a large wall highlighted in grey" loading="lazy" />
	<figcaption class="img-overlay-tag">Stone Keep Classic</figcaption>
</figure>

## Why some walls feel heavy

While exploring the highlighted surfaces, we were surprised to find walls marked as rooftops too. That made no sense: champions can’t stand on top of a vertical wall.

<figure class="img-overlay">
	<img src="/blog/2026-10/stone-keep-classic-rooftops-heavy-walls-2.png" alt="Tempest visualiser view of Stone Keep Classic, showing vertical walls and tree geometry highlighted in grey" loading="lazy" />
	<figcaption class="img-overlay-tag">Stone Keep Classic</figcaption>
</figure>

But in every case we investigated, the walls with this rooftop setting were the same walls players describe as **heavy**.

<div class="heavy-walls-callout">
	<span class="heavy-walls-callout-label">The cause</span>
	<p><strong>Heavy walls are walls accidentally programmed as rooftops.</strong></p>
</div>

Sometimes this happens because an object, such as a tree, is made from a single piece of geometry. Instead of flagging only its top as a rooftop, the setting gets applied to the entire object. Other times, it appears to be a straightforward mistake.

## Brightmarsh: no heavy walls found

Brightmarsh is the map we’ve confirmed without heavy walls — possibly the only one in the game. Here, the rooftop setting appears on rooftops where it belongs, rather than across vertical walls. It’s a carefully made map, and a fan favourite for a reason.

<figure class="img-overlay">
	<img src="/blog/2026-10/brightmarsh-no-heavy-walls.png" alt="Tempest visualiser view of Brightmarsh, showing rooftop surfaces highlighted in grey without heavy walls" loading="lazy" />
	<figcaption class="img-overlay-tag">Brightmarsh</figcaption>
</figure>

## A decade-old bug, explained

The bug that has plagued Paladins for ten years comes down to a simple programming error: some walls were given rooftop physics. Based on what the visualiser reveals, correcting the flag could take only a few hours.

<style>
.heavy-walls-callout {
	margin: 2rem 0;
	padding: 1.25rem 1.5rem;
	border: 1px solid rgba(73, 160, 105, 0.32);
	border-left: 4px solid #49a069;
	border-radius: 10px;
	background: rgba(73, 160, 105, 0.08);
}
.heavy-walls-callout-label {
	color: #318252;
	font-weight: 700;
}
.heavy-walls-callout p {
	margin: 0.4rem 0 0;
}
</style>
