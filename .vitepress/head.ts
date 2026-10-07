import { loadFeedPosts, type FeedPost } from "./feeds";
import { LOGO_URL, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from "./site";
import type { HeadConfig, TransformContext } from "vitepress";

/**
 * Source path (e.g. "blog/2026-08/14-docs-revamped.md") to clean URL path.
 * Must match the `cleanUrls` site option and the host's *.html redirect, or
 * canonical and OG URLs point at a redirect and search signals split.
 */
function pageUrl(relativePath: string, base: string): string {
	const url = relativePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "");
	const withBase = `${base.replace(/\/$/, "")}${url}`;
	return withBase.startsWith("/") ? withBase || "/" : `/${withBase}`;
}

function isBlogPost(relativePath: string): boolean {
	return relativePath.startsWith("blog/") && relativePath !== "blog/index.md";
}

function absoluteUrl(path: string | undefined, fallback: string): string {
	if (!path) return fallback;
	return /^https?:\/\//i.test(path) ? path : `${SITE_URL}${path}`;
}

function toIso(value: string | number | null | undefined): string | undefined {
	if (typeof value === "number") {
		return Number.isNaN(value) ? undefined : new Date(value).toISOString();
	}
	if (typeof value === "string") {
		const time = +new Date(value);
		return Number.isNaN(time) ? undefined : new Date(time).toISOString();
	}
	return undefined;
}

/** Newest first, loaded once per build. Parsing and sorting live in the RSS loader. */
let postsCache: Promise<FeedPost[]> | undefined;
function blogPosts(): Promise<FeedPost[]> {
	postsCache ??= loadFeedPosts();
	return postsCache;
}

export async function transformHead({
	pageData,
	siteData,
	title,
	description,
}: TransformContext): Promise<HeadConfig[]> {
	const head: HeadConfig[] = [];
	const { frontmatter, relativePath } = pageData;
	const post = isBlogPost(relativePath);
	const url = `${SITE_URL}${pageUrl(relativePath, siteData.base)}`;
	const image = absoluteUrl(frontmatter.image, LOGO_URL);
	const published = toIso(frontmatter.date);
	const modified = toIso(pageData.lastUpdated) ?? published;
	const isArticle = post && published !== undefined;

	head.push(["meta", { property: "theme-color", content: "#33b6b1" }]);
	head.push(["link", { rel: "canonical", href: url }]);

	head.push(["meta", { property: "og:site_name", content: SITE_NAME }]);
	head.push(["meta", { property: "og:locale", content: "en_US" }]);
	head.push(["meta", { property: "og:type", content: isArticle ? "article" : "website" }]);
	head.push(["meta", { property: "og:url", content: url }]);
	head.push(["meta", { property: "og:title", content: title }]);
	head.push(["meta", { property: "og:description", content: description }]);
	head.push(["meta", { property: "og:image", content: image }]);
	head.push(["meta", { property: "og:image:alt", content: title }]);

	head.push([
		"meta",
		{
			name: "twitter:card",
			content: frontmatter.image ? "summary_large_image" : "summary",
		},
	]);
	head.push(["meta", { name: "twitter:title", content: title }]);
	head.push(["meta", { name: "twitter:description", content: description }]);
	head.push(["meta", { name: "twitter:image", content: image }]);
	head.push(["meta", { name: "twitter:image:alt", content: title }]);

	// Discord link preview: server-rendered JSON in <head> (Discord's crawler runs
	// no JS) capped at 3,000 bytes, so the payload stays title, description, image.
	// `<` is escaped so a "</script>" in a title can't end the tag early.
	// ponytail: one shared layout; per-page payloads only if the default unfurls badly
	const embedComponents: object[] = [
		{
			type: 9,
			components: [{ type: 10, content: `# [${title}](${url})\n${description}` }],
			accessory: { type: 11, media: { url: image } },
		},
	];

	// Buttons must be link style (5) with no keys beyond the allowed set; any
	// other key or style invalidates the whole payload.
	if (relativePath === "index.md") {
		const latest = (await blogPosts())[0];
		if (latest) {
			const postUrl = `${SITE_URL}${latest.url}`;
			// A Media Gallery renders the image full width, where a Section's
			// thumbnail accessory would shrink it to a small square.
			embedComponents.push(
				{ type: 14, divider: true, spacing: 2 },
				{ type: 10, content: "-# Latest blog post" },
				{
					type: 10,
					content: `## **[${latest.title}](${postUrl})**${latest.description ? `\n${latest.description}` : ""}`,
				},
				{
					// <t:unix:format> renders as a localized date for each viewer.
					type: 10,
					content: `-# <t:${Math.floor(new Date(latest.date).getTime() / 1000)}:D>`,
				},
			);
			if (latest.image) {
				embedComponents.push({
					type: 12,
					items: [
						{
							media: { url: absoluteUrl(latest.image, LOGO_URL) },
							description: latest.title,
						},
					],
				});
			}
			embedComponents.push({ type: 14, divider: true, spacing: 1 });
		}

		embedComponents.push({
			type: 1,
			components: [
				{
					type: 2,
					style: 5,
					url: `${SITE_URL}/tempest/introduction`,
					label: "Get Tempest",
				},
				{ type: 2, style: 5, url: `${SITE_URL}/blog/`, label: "Blog" },
				{ type: 2, style: 5, url: "https://discord.gg/YPXJEaNPPe", label: "Discord" },
			],
		});
	}

	// Lists the 5 newest posts; the rest are counted in subtext.
	if (relativePath === "blog/index.md") {
		const posts = await blogPosts();
		const shown = posts.slice(0, 5);
		if (shown.length) {
			embedComponents.push(
				{ type: 14, divider: true, spacing: 2 },
				{
					type: 10,
					content: shown
						.map((post) => `- [${post.title}](${SITE_URL}${post.url})`)
						.join("\n"),
				},
			);
			const rest = posts.length - shown.length;
			if (rest > 0) {
				embedComponents.push({ type: 10, content: `-# ${rest} posts more...` });
			}
		}
	}

	head.push([
		"script",
		{ id: "discord:component-embed", type: "application/json" },
		JSON.stringify({
			component: { type: 17, accent_color: 0x33b6b1, components: embedComponents },
		}).replace(/</g, "\\u003c"),
	]);

	if (isArticle) {
		head.push(["meta", { property: "article:published_time", content: published }]);
		if (modified) {
			head.push(["meta", { property: "article:modified_time", content: modified }]);
		}
		if (frontmatter.author) {
			head.push(["meta", { property: "article:author", content: frontmatter.author }]);
		}
		head.push(["meta", { property: "article:section", content: "Blog" }]);
		for (const tag of frontmatter.tags ?? []) {
			head.push(["meta", { property: "article:tag", content: tag }]);
		}
	}

	const organization = {
		"@type": "Organization",
		name: "LowRezStudio",
		url: SITE_URL,
		logo: { "@type": "ImageObject", url: LOGO_URL },
		sameAs: SOCIAL_PROFILES,
	};

	if (isArticle) {
		head.push([
			"script",
			{ type: "application/ld+json" },
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: pageData.title,
				description,
				image: [image],
				datePublished: published,
				dateModified: modified,
				author: {
					"@type": "Organization",
					name: frontmatter.author ?? "LowRezStudio Team",
				},
				publisher: organization,
				mainEntityOfPage: { "@type": "WebPage", "@id": url },
				url,
				inLanguage: "en-US",
				isPartOf: {
					"@type": "Blog",
					name: `${SITE_NAME} Blog`,
					url: `${SITE_URL}/blog/`,
				},
				...(frontmatter.tags?.length ? { keywords: frontmatter.tags.join(", ") } : {}),
				articleSection: "Blog",
			}),
		]);
	} else if (relativePath === "index.md") {
		head.push([
			"script",
			{ type: "application/ld+json" },
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: SITE_NAME,
				alternateName: "Paladins Modding Documentation",
				url: `${SITE_URL}/`,
				description,
				inLanguage: "en-US",
				publisher: organization,
			}),
		]);
		head.push([
			"script",
			{ type: "application/ld+json" },
			JSON.stringify({ "@context": "https://schema.org", ...organization }),
		]);
	} else if (relativePath === "blog/index.md") {
		head.push([
			"script",
			{ type: "application/ld+json" },
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Blog",
				name: `${SITE_NAME} Blog`,
				url,
				description: pageData.description ?? description,
				inLanguage: "en-US",
				publisher: organization,
			}),
		]);
	} else {
		head.push([
			"script",
			{ type: "application/ld+json" },
			JSON.stringify({
				"@context": "https://schema.org",
				"@type": "TechArticle",
				headline: pageData.title,
				description,
				url,
				mainEntityOfPage: { "@type": "WebPage", "@id": url },
				...(modified ? { dateModified: modified } : {}),
				inLanguage: "en-US",
				publisher: organization,
				isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` },
			}),
		]);

		// The launcher intro doubles as the product landing page.
		if (relativePath === "tempest/introduction.md") {
			head.push([
				"script",
				{ type: "application/ld+json" },
				JSON.stringify({
					"@context": "https://schema.org",
					"@type": "SoftwareApplication",
					name: "Tempest",
					applicationCategory: "GameApplication",
					operatingSystem: "Windows",
					url,
					description,
					offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
					publisher: organization,
				}),
			]);
		}
	}

	return head;
}
