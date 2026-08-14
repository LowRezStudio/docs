---
title: Blog
description: News and updates from the LowRezStudio team.
---

<script setup>
import { data as posts } from "./posts.data.ts";

function formatDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
</script>

<h1>Blog</h1>

<p class="blog-description">
	News and updates from the LowRezStudio team.
	<a href="/rss.xml">Subscribe via RSS.</a>
</p>

<p v-if="!posts.length" class="blog-empty">No posts yet.</p>

<ul v-else class="blog-list">
	<li v-for="post in posts" :key="post.url" class="blog-list-item">
		<a class="blog-list-link" :href="post.url">
			<img
				v-if="post.image"
				class="blog-list-image"
				:src="post.image"
				alt=""
				loading="lazy"
			/>
			<div class="blog-list-content">
				<h2 class="blog-list-title">{{ post.title }}</h2>
				<p class="blog-list-meta">
					<time :datetime="post.date">{{ formatDate(post.date) }}</time>
					<span v-if="post.author"> · {{ post.author }}</span>
					<span v-if="post.tags?.length"> · {{ post.tags.join(", ") }}</span>
				</p>
				<p v-if="post.excerpt" class="blog-list-excerpt">{{ post.excerpt }}</p>
			</div>
		</a>
	</li>
</ul>
