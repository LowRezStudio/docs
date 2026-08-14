import fs from "node:fs";
import path from "node:path";
import { normalizePath, type Plugin } from "vite";
import { createContentLoader } from "vitepress";
import { postsGlob } from "../src/blog/posts.glob";

export interface FeedPost {
	url: string;
	title: string;
	date: string;
	description?: string;
	tags?: string[];
	author?: string;
	image?: string;
	content: string;
}

export interface FeedSite {
	url: string;
	title: string;
	description: string;
	/** Absolute URL of a square site logo, surfaced via the RSS channel <image> and Atom <logo>. */
	logo?: string;
	/** Feed-level author name, surfaced via the Atom <author> element. */
	author?: string;
}

interface VpConfig {
	srcDir: string;
	outDir: string;
	site: { base: string };
}

function getConfig(): VpConfig {
	const config = (globalThis as { VITEPRESS_CONFIG?: VpConfig }).VITEPRESS_CONFIG;
	if (!config) {
		throw new Error("feeds: no active vitepress config (VITEPRESS_CONFIG not set)");
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

/** Makes `]]>` inside CDATA safe by splitting the closing sequence. */
function escapeCdata(value: string): string {
	return value.replace(/]]>/g, "]]]]><![CDATA[>");
}

/** Rewrites site-relative href/src to absolute URLs so standalone readers resolve them. */
function absolutizeUrls(html: string, siteUrl: string): string {
	return html.replace(/(\b(?:href|src)=")(\/[^"]*)(")/g, (match, open, value, close) => {
		if (value.startsWith("//")) return match; // protocol-relative: leave alone
		return `${open}${siteUrl}${value}${close}`;
	});
}

function absoluteImage(image: string, siteUrl: string): string {
	return /^https?:\/\//i.test(image) ? image : `${siteUrl}${image}`;
}

function formatPubDate(date: string): string {
	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString();
}

function toIso(date: string): string {
	return new Date(date).toISOString();
}

/**
 * Loads published blog posts (newest first) with rendered HTML, ready for the feeds.
 * Shared by the dev-server middleware and the build-time file generation.
 */
export async function loadFeedPosts(): Promise<FeedPost[]> {
	const config = getConfig();
	const base = config.site.base.replace(/\/$/, "");
	return createContentLoader(postsGlob, {
		render: true,
		transform(raw) {
			return raw
				.filter(
					(post) =>
						!post.frontmatter.draft &&
						post.url !== "/blog/" &&
						!Number.isNaN(+new Date(post.frontmatter.date)),
				)
				.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
				.map((post) => ({
					url: `${base}${post.url}`,
					title: post.frontmatter.title,
					date: post.frontmatter.date,
					description: post.frontmatter.description ?? post.excerpt,
					tags: post.frontmatter.tags,
					author: post.frontmatter.author,
					image: post.frontmatter.image,
					content: post.html ?? "",
				}));
		},
	}).load();
}

export function generateRss(posts: FeedPost[], site: FeedSite): string {
	const feedUrl = `${site.url}/rss.xml`;
	const items = posts
		.map((post) => {
			const link = `${site.url}${post.url}`;
			const description = stripHtml(post.description) || post.title;
			const categories = (post.tags ?? [])
				.map((tag) => `    <category>${escapeXml(tag)}</category>`)
				.join("\n");
			// RSS 2.0 <author> expects an email address; authors here are names,
			// so they belong in the Dublin Core creator element instead.
			const creator = post.author
				? `    <dc:creator>${escapeXml(post.author)}</dc:creator>`
				: "";
			const thumbnail = post.image
				? `    <media:thumbnail url="${escapeXml(absoluteImage(post.image, site.url))}"/>`
				: "";

			return [
				"  <item>",
				`    <title>${escapeXml(post.title)}</title>`,
				`    <link>${escapeXml(link)}</link>`,
				`    <guid isPermaLink="true">${escapeXml(link)}</guid>`,
				`    <pubDate>${formatPubDate(post.date)}</pubDate>`,
				`    <description>${escapeXml(description)}</description>`,
				`    <content:encoded><![CDATA[${escapeCdata(absolutizeUrls(post.content, site.url))}]]></content:encoded>`,
				categories,
				creator,
				thumbnail,
				"  </item>",
			]
				.filter((line) => line !== "")
				.join("\n");
		})
		.join("\n");

	const image = site.logo
		? [
				"    <image>",
				`      <url>${escapeXml(site.logo)}</url>`,
				`      <title>${escapeXml(site.title)}</title>`,
				`      <link>${escapeXml(site.url)}</link>`,
				"    </image>",
			].join("\n")
		: "";

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">',
		"  <channel>",
		`    <title>${escapeXml(site.title)}</title>`,
		`    <link>${escapeXml(site.url)}</link>`,
		`    <description>${escapeXml(site.description)}</description>`,
		`    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
		"    <language>en-US</language>",
		`    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
		"    <ttl>1440</ttl>",
		"    <generator>VitePress</generator>",
		image,
		items,
		"  </channel>",
		"</rss>",
		"",
	].join("\n");
}

export function generateAtom(posts: FeedPost[], site: FeedSite): string {
	const feedUrl = `${site.url}/atom.xml`;
	// Atom requires <updated>; the newest post's date is the most meaningful value.
	const updated = posts[0] ? toIso(posts[0].date) : new Date().toISOString();

	const entries = posts
		.map((post) => {
			const link = `${site.url}${post.url}`;
			const published = toIso(post.date);
			const summary = stripHtml(post.description) || post.title;
			const categories = (post.tags ?? [])
				.map((tag) => `    <category term="${escapeXml(tag)}"/>`)
				.join("\n");
			const author = post.author
				? [
						"    <author>",
						`      <name>${escapeXml(post.author)}</name>`,
						"    </author>",
					].join("\n")
				: "";
			const thumbnail = post.image
				? `    <media:thumbnail url="${escapeXml(absoluteImage(post.image, site.url))}"/>`
				: "";

			return [
				"  <entry>",
				`    <title>${escapeXml(post.title)}</title>`,
				`    <link rel="alternate" type="text/html" href="${escapeXml(link)}"/>`,
				`    <id>${escapeXml(link)}</id>`,
				`    <published>${published}</published>`,
				`    <updated>${published}</updated>`,
				author,
				categories,
				`    <summary type="text">${escapeXml(summary)}</summary>`,
				`    <content type="html">${escapeXml(absolutizeUrls(post.content, site.url))}</content>`,
				thumbnail,
				"  </entry>",
			]
				.filter((line) => line !== "")
				.join("\n");
		})
		.join("\n");

	const logo = site.logo
		? [`  <icon>${escapeXml(site.logo)}</icon>`, `  <logo>${escapeXml(site.logo)}</logo>`].join(
				"\n",
			)
		: "";

	return [
		'<?xml version="1.0" encoding="utf-8"?>',
		'<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xml:lang="en-US">',
		`  <title>${escapeXml(site.title)}</title>`,
		`  <subtitle>${escapeXml(site.description)}</subtitle>`,
		`  <link href="${escapeXml(site.url)}"/>`,
		`  <link href="${escapeXml(feedUrl)}" rel="self" type="application/atom+xml"/>`,
		`  <id>${escapeXml(site.url)}</id>`,
		`  <updated>${updated}</updated>`,
		site.author ? `  <author><name>${escapeXml(site.author)}</name></author>` : "",
		"  <generator>VitePress</generator>",
		logo,
		entries,
		"</feed>",
		"",
	]
		.filter((line) => line !== "")
		.join("\n");
}

const FEED_PATHS: Record<string, "rss" | "atom"> = {
	"/rss.xml": "rss",
	"/atom.xml": "atom",
};

const FEED_TYPES: Record<"rss" | "atom", string> = {
	rss: "application/rss+xml; charset=utf-8",
	atom: "application/atom+xml; charset=utf-8",
};

/**
 * Vite plugin that makes `/rss.xml` and `/atom.xml` work in `vitepress dev`
 * (served as real XML, regenerated when a blog post changes) and writes them
 * into the build output.
 */
export function feedsPlugin(site: FeedSite): Plugin {
	let cached: { rss: string; atom: string } | null = null;

	const generate = async (): Promise<{ rss: string; atom: string }> => {
		const posts = await loadFeedPosts();
		return {
			rss: generateRss(posts, site),
			atom: generateAtom(posts, site),
		};
	};

	return {
		name: "lowrezstudio:feeds",

		configureServer(server) {
			// Drop the cache when a blog post is added, edited or removed
			// so the next request is fresh.
			const invalidate = (file: unknown) => {
				if (
					typeof file === "string" &&
					file.endsWith(".md") &&
					normalizePath(file).includes(`/blog/`)
				) {
					cached = null;
				}
			};
			server.watcher.on("change", invalidate);
			server.watcher.on("add", invalidate);
			server.watcher.on("unlink", invalidate);

			server.middlewares.use(async (req, res, next) => {
				const base = getConfig().site.base;
				const pathname = (req.url ?? "").split("?")[0];
				const path = base === "/" ? pathname : pathname.slice(base.length - 1);

				const feed = FEED_PATHS[path] ?? FEED_PATHS[path.replace(/\/$/, "")];
				if (!feed) {
					return next();
				}

				try {
					const feeds = (cached ??= await generate());
					res.statusCode = 200;
					res.setHeader("Content-Type", FEED_TYPES[feed]);
					res.setHeader("Cache-Control", "no-cache");
					res.end(feeds[feed]);
				} catch (error) {
					next(error instanceof Error ? error : new Error(String(error)));
				}
			});
		},

		async closeBundle() {
			const config = getConfig();
			const feeds = await generate();
			await fs.promises.mkdir(config.outDir, { recursive: true });
			for (const name of ["rss", "atom"] as const) {
				await fs.promises.writeFile(path.join(config.outDir, `${name}.xml`), feeds[name]);
			}
		},
	};
}
