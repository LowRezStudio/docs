<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { page } = useData();

const isPost = computed(() => /^blog\/\d{4}-\d{2}\//.test(page.value.relativePath));

const date = computed(() => {
	if (!page.value.frontmatter.date) return "";
	return new Date(page.value.frontmatter.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
});
</script>

<template>
	<div v-if="isPost" class="blog-post-header">
		<a class="blog-post-back" href="/blog/">← Blog</a>
		<img
			v-if="page.frontmatter.image"
			class="blog-post-image"
			:src="page.frontmatter.image"
			alt=""
		/>
		<h1 class="blog-post-title">{{ page.frontmatter.title }}</h1>
		<p v-if="page.frontmatter.description" class="blog-post-description">
			{{ page.frontmatter.description }}
		</p>
		<p class="blog-post-meta">
			<time v-if="date" :datetime="page.frontmatter.date">{{ date }}</time>
			<span v-if="page.frontmatter.author"> · {{ page.frontmatter.author }}</span>
		</p>
		<p v-if="page.frontmatter.tags?.length" class="blog-post-tags">
			<span v-for="tag in page.frontmatter.tags" :key="tag" class="blog-tag">{{ tag }}</span>
		</p>
	</div>
</template>
