// Shared between posts.data.ts (blog listing) and .vitepress/config.mts (RSS build hook).
// Note: keep this free of `createContentLoader` calls — the config imports it
// before the VitePress process is active.
// Matches blog/index.md too; the index page is filtered out in the loader transforms.
export const postsGlob = "blog/**/*.md";
