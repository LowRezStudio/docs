import fs from "node:fs";
import path from "node:path";
import { normalizePath, type Plugin } from "vite";
import { createContentLoader } from "vitepress";
import { postsGlob } from "../src/blog/posts.glob";

export interface RssPost {
	url: string;
	title: string;
	date: string;
	description?: string;
	tags?: string[];
	author?: string;
	content: string;
}

export interface RssSite {
	url: string;
	title: string;
	description: string;
}

interface VpConfig {
	srcDir: string;
	outDir: string;
	site: { base: string };
}

function getConfig(): VpConfig {
	const config = (globalThis as { VITEPRESS_CONFIG?: VpConfig }).VITEPRESS_CONFIG;
	if (!config) {
		throw new Error("rss: no active vitepress config (VITEPRESS_CONFIG not set)");
	}
	return config;
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function stripHtml(html: string | undefined): string {
	return (html ?? "")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function formatPubDate(date: string): string {
	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString();
}

/**
 * Loads published blog posts (newest first) with rendered HTML, ready for the feed.
 * Shared by the dev-server middleware and the build-time file generation.
 */
export async function loadRssPosts(): Promise<RssPost[]> {
	const config = getConfig();
	const base = config.site.base.replace(/\/$/, "");
	return createContentLoader(postsGlob, {
		render: true,
		transform(raw) {
			return raw
				.filter((post) => !post.frontmatter.draft && post.url !== "/blog/")
				.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
				.map((post) => ({
					url: `${base}${post.url}`,
					title: post.frontmatter.title,
					date: post.frontmatter.date,
					description: post.frontmatter.description ?? post.excerpt,
					tags: post.frontmatter.tags,
					author: post.frontmatter.author,
					content: post.html ?? "",
				}));
		},
	}).load();
}

export function generateRss(posts: RssPost[], site: RssSite): string {
	const items = posts
		.map((post) => {
			const link = `${site.url}${post.url}`;
			const description = stripHtml(post.description) || post.title;
			const categories = (post.tags ?? [])
				.map((tag) => `    <category>${escapeXml(tag)}</category>`)
				.join("\n");
			const author = post.author ? `    <author>${escapeXml(post.author)}</author>` : "";

			return [
				"  <item>",
				`    <title>${escapeXml(post.title)}</title>`,
				`    <link>${escapeXml(link)}</link>`,
				`    <guid isPermaLink="true">${escapeXml(link)}</guid>`,
				`    <pubDate>${formatPubDate(post.date)}</pubDate>`,
				`    <description>${escapeXml(description)}</description>`,
				`    <content:encoded><![CDATA[${post.content}]]></content:encoded>`,
				categories,
				author,
				"  </item>",
			]
				.filter((line) => line !== "")
				.join("\n");
		})
		.join("\n");

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
		"  <channel>",
		`    <title>${escapeXml(site.title)}</title>`,
		`    <link>${escapeXml(site.url)}</link>`,
		`    <description>${escapeXml(site.description)}</description>`,
		"    <language>en-US</language>",
		`    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
		"    <generator>VitePress</generator>",
		items,
		"  </channel>",
		"</rss>",
		"",
	].join("\n");
}

/**
 * Vite plugin that makes `/rss.xml` work in `vitepress dev` (served as real XML,
 * regenerated when a blog post changes) and writes it into the build output.
 */
export function rssPlugin(site: RssSite): Plugin {
	let cached: string | null = null;

	const generate = async (): Promise<string> => {
		const posts = await loadRssPosts();
		return generateRss(posts, site);
	};

	return {
		name: "lowrezstudio:rss",

		configureServer(server) {
			// Drop the cache when a blog post is edited so the next request is fresh.
			server.watcher.on("change", (file) => {
				if (
					typeof file === "string" &&
					file.endsWith(".md") &&
					normalizePath(file).includes(`/blog/`)
				) {
					cached = null;
				}
			});

			server.middlewares.use(async (req, res, next) => {
				const base = getConfig().site.base;
				const pathname = (req.url ?? "").split("?")[0];
				const path = base === "/" ? pathname : pathname.slice(base.length - 1);

				if (path !== "/rss.xml" && path !== "/rss.xml/") {
					return next();
				}

				try {
					const rss = (cached ??= await generate());
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
					res.setHeader("Cache-Control", "no-cache");
					res.end(rss);
				} catch (error) {
					next(error instanceof Error ? error : new Error(String(error)));
				}
			});
		},

		async closeBundle() {
			const config = getConfig();
			const rss = await generate();
			await fs.promises.mkdir(config.outDir, { recursive: true });
			await fs.promises.writeFile(path.join(config.outDir, "rss.xml"), rss);
		},
	};
}
