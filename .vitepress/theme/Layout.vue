<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import BlogPostMeta from "./components/BlogPostMeta.vue";
import CustomFooter from "./components/CustomFooter.vue";

const { Layout } = DefaultTheme;
</script>

<template>
	<Layout>
		<template #doc-before>
			<BlogPostMeta />
		</template>
		<template #layout-bottom>
			<CustomFooter />
		</template>
	</Layout>
</template>
