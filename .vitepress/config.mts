import footnote from "markdown-it-footnote";
import { defineConfig } from "vitepress";
import { feedsPlugin } from "./feeds";
import sidebar from "./sidebar";
import type { HeadConfig } from "vitepress";

// Absolute site URL used for RSS links, sitemap and canonical URLs.
// Override for CI/local previews with SITE_URL.
const SITE_URL = (process.env.SITE_URL ?? "https://docs.lowrezstudio.com").replace(/\/$/, "");
const SITE_NAME = "Tempest";
const LOGO_URL = `${SITE_URL}/tempest-logo.png`;

/** Resolves site-relative paths (e.g. "/guide.jpg") to absolute URLs. */
function absoluteUrl(path: string | undefined, fallback: string): string {
	if (!path) return fallback;
	return /^https?:\/\//i.test(path) ? path : `${SITE_URL}${path}`;
}

/**
 * Converts a page's source path (e.g. "blog/2026-08/14-docs-revamped.md")
 * to its URL path. Mirrors VitePress's own sitemap logic.
 */
function pageUrl(relativePath: string, base: string): string {
	const url = relativePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, ".html");
	const withBase = `${base.replace(/\/$/, "")}${url}`;
	return withBase.startsWith("/") ? withBase : `/${withBase}`;
}

function isBlogPost(relativePath: string): boolean {
	return relativePath.startsWith("blog/") && relativePath !== "blog/index.md";
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

// https://vitepress.dev/reference/site-config
export default defineConfig({
	srcDir: "src",
	lang: "en-US",
	title: SITE_NAME,
	description: `Documentation on Tempest and Paladins mod making.`,
	// Compute per-page last-modified timestamps from git (used for
	// article:modified_time and sitemap lastmod).
	lastUpdated: true,
	head: [
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
		[
			"link",
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Ubuntu+Sans+Mono:wght@400;500;600;700&display=swap",
			},
		],
		["link", { rel: "icon", href: "/favicon.ico" }],
		["link", { rel: "apple-touch-icon", href: "/tempest-logo.png" }],
		["meta", { name: "robots", content: "index, follow, max-image-preview:large" }],
		[
			"link",
			{
				rel: "alternate",
				type: "application/rss+xml",
				title: "Tempest Blog",
				href: `${SITE_URL}/rss.xml`,
			},
		],
		[
			"link",
			{
				rel: "alternate",
				type: "application/atom+xml",
				title: "Tempest Blog (Atom)",
				href: `${SITE_URL}/atom.xml`,
			},
		],
	],
	// https://vitepress.dev/reference/default-theme-config
	themeConfig: {
		logo: "/tempest-logo.png",
		nav: [
			{ text: "Launcher", link: "/tempest/introduction" },
			{ text: "UDK", link: "/udk/getting-started" },
			{ text: "Marshal", link: "/marshal/introduction" },
			{ text: "Blog", link: "/blog/" },
		],
		sidebar,
		socialLinks: [
			{ icon: "discord", link: "https://discord.gg/YPXJEaNPPe" },
			{ icon: "github", link: "https://github.com/LowRezStudio" },
		],

		search: {
			provider: "local",
		},
	},
	markdown: {
		config: (md) => {
			md.use(footnote);
		},
	},
	// Built-in sitemap generation (sitemap.xml at build time).
	sitemap: {
		hostname: SITE_URL,
	},
	vite: {
		plugins: [
			feedsPlugin({
				url: SITE_URL,
				title: "Tempest Blog",
				description: `Documentation on Tempest and Paladins mod making.`,
				logo: LOGO_URL,
				author: "LowRezStudio Team",
			}),
		],
	},
	transformHead: ({ pageData, siteData, title, description }) => {
		const head: HeadConfig[] = [];
		const { frontmatter, relativePath } = pageData;
		const post = isBlogPost(relativePath);
		const url = `${SITE_URL}${pageUrl(relativePath, siteData.base)}`;
		const image = absoluteUrl(frontmatter.image, LOGO_URL);
		const published = toIso(frontmatter.date);
		const modified = toIso(pageData.lastUpdated) ?? published;
		const isArticle = post && published !== undefined;

		head.push(["meta", { property: "theme-color", content: "#33b6b1" }]);

		// Canonical URL
		head.push(["link", { rel: "canonical", href: url }]);

		// Open Graph
		head.push(["meta", { property: "og:site_name", content: SITE_NAME }]);
		head.push(["meta", { property: "og:locale", content: "en_US" }]);
		head.push(["meta", { property: "og:type", content: isArticle ? "article" : "website" }]);
		head.push(["meta", { property: "og:url", content: url }]);
		head.push(["meta", { property: "og:title", content: title }]);
		head.push(["meta", { property: "og:description", content: description }]);
		head.push(["meta", { property: "og:image", content: image }]);
		head.push(["meta", { property: "og:image:alt", content: title }]);

		// Twitter Card
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

		// Article metadata (blog posts only)
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

		// Structured data (JSON-LD)
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
					publisher: {
						"@type": "Organization",
						name: "LowRezStudio",
						url: SITE_URL,
						logo: { "@type": "ImageObject", url: LOGO_URL },
					},
					mainEntityOfPage: { "@type": "WebPage", "@id": url },
					url,
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
					url: `${SITE_URL}/`,
					description,
				}),
			]);
			head.push([
				"script",
				{ type: "application/ld+json" },
				JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Organization",
					name: "LowRezStudio",
					url: SITE_URL,
					logo: { "@type": "ImageObject", url: LOGO_URL },
				}),
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
				}),
			]);
		}

		return head;
	},
});
