---
title: "The Hat Meta: 2026"
description: "A new Tempest mod visualises Paladins hitboxes, revealing how the hat meta makes some skins pay-to-win and others pay-to-lose."
image: /blog/2026-10/18-hitboxes-skins-pay-to-win/04-dredge-front.png
date: "2026-10-18T12:00:00+02:00"
tags:
    - live
    - mods
---

Paladins has a new meta in 2026 — the **hat meta**. Shiro built a private Tempest mod
that visualises every hitbox, and it finally shows how Paladins hit registration works.

<div class="meta-panel">
	<ul class="meta-timeline">
		<li>2016: Mobility Meta</li>
		<li>2018: Burst Meta</li>
		<li>2020: CC Meta</li>
		<li>2021: Pocket Meta</li>
		<li>2022: Double Support Meta</li>
		<li>2023: Controller Meta</li>
		<li class="meta-current">2026: Hat Meta</li>
	</ul>
</div>

## How hitboxes work

> - Every champion is wrapped in one large pill (cylinder) used for all hitscan and projectile
>   detection. A single simple shape probably keeps hit registration efficient. Unlike most
>   games, Paladins does **no** precision follow-up — any hit on the cylinder is a body shot.
> - The pill ignores animations except the champion moving around the map. It doubles as the
>   geometry collision shape, and each champion's pill is a different size.
> - Inside it are accurate, animated "bones" for the body. They don't affect gameplay — except
>   the head bone. After the cylinder is hit, a second check decides whether the head was hit.

<figure class="img-overlay">
	<img src="/blog/2026-10/18-hitboxes-skins-pay-to-win/01-cylinder.png" alt="The cylinder hitbox surrounding two champions" />
	<figcaption class="img-overlay-tag">One cylinder wraps each champion</figcaption>
</figure>

<figure class="img-overlay">
	<img src="/blog/2026-10/18-hitboxes-skins-pay-to-win/02-bones.png" alt="The bones inside the cylinder, following the champion's animations" />
	<figcaption class="img-overlay-tag">Animated bones track the body</figcaption>
</figure>

## The two problems

> - A head bone outside the cylinder means you can't headshot at all.
> - Another bone blocking the head bone turns a headshot into a body shot.

<figure class="img-overlay">
	<img src="/blog/2026-10/18-hitboxes-skins-pay-to-win/03-head-bone-outside.png" alt="Andro's head bone positioned outside the cylinder, making headshots impossible" />
	<figcaption class="img-overlay-tag">Head bone escapes the cylinder</figcaption>
</figure>

## Pay to win

Older teams added checks to stop skin bones from blocking headshots; newer devs didn't know
they needed to. So many skins **block headshots (pay to win)**, while others strip the bones
around the head and make you **easier to headshot (pay to lose)**. That's **The Hat Meta**.

### Pay to lose

> - Drake Azaan
> - Dragonette Betty
> - Buccaneer + Omega Dredge
> - Weiss Schnee + Demons + Shrines Furia
> - Yang Xiao Long + Steel Forged + Dragon Forged + Warder Imani
> - Exarch Jenos
> - Spirited + Lovestruck Kasumi
> - Pumpkin patch Rei

### Pay to win

> - Dragonborn Moji
> - Abysal Lord Drogoz
> - Soul Eater Jenos
> - Dragon Forged Barik

<figure class="img-overlay">
	<img src="/blog/2026-10/18-hitboxes-skins-pay-to-win/04-dredge-front.png" alt="Default Dredge and Buccaneer Dredge side by side from the front" />
	<figcaption class="img-overlay-tag">Buccaneer Dredge loses his hat</figcaption>
</figure>

<figure class="img-overlay">
	<img src="/blog/2026-10/18-hitboxes-skins-pay-to-win/05-dredge-back.png" alt="Default Dredge and Buccaneer Dredge side by side from behind" />
	<figcaption class="img-overlay-tag">Back view: Full hat protection</figcaption>
</figure>
