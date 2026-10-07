import footnote from "markdown-it-footnote";
import { defineConfig } from "vitepress";
import { feedsPlugin } from "./feeds";
import { transformHead } from "./head";
import sidebar from "./sidebar";
import { LOGO_URL, SITE_NAME, SITE_URL } from "./site";
import { youtubeEmbed } from "./youtube-embed";

/** Placeholder pages with no content yet, as sitemap paths without leading slash. */
const SITEMAP_EXCLUDED_PAGES = new Set([
	"marshal/files/assembly",
	"marshal/files/lang",
	"marshal/packets/hello",
	"marshal/parsing/deserialization",
	"marshal/parsing/introduction",
	"marshal/parsing/serialization",
	"marshal/servers/game-server",
	"marshal/servers/login-server",
]);

// https://vitepress.dev/reference/site-config
export default defineConfig({
	srcDir: "src",
	lang: "en-US",
	title: SITE_NAME,
	description: `Documentation on Tempest and Paladins mod making.`,
	// Git-based lastmod, consumed by article:modified_time and the sitemap.
	lastUpdated: true,
	// The host redirects *.html to clean URLs, so canonical, OG and sitemap URLs
	// must use the clean form or search signals split across both variants.
	cleanUrls: true,
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
			{ text: "LowRezStudio", link: "https://lowrezstudio.com" },
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
			md.use(youtubeEmbed);
		},
	},
	sitemap: {
		hostname: SITE_URL,
		// Date-only lastmod; a full timestamp adds nothing for search freshness.
		lastmodDateOnly: true,
		// tempest-legacy is deprecated and the listed pages are empty placeholders.
		// Both stay reachable through navigation, just not advertised to search engines.
		transformItems: (items) =>
			items.filter((item) => {
				const url = item.url.replace(/^\/+|\/+$/g, "");
				return !url.startsWith("tempest-legacy/") && !SITEMAP_EXCLUDED_PAGES.has(url);
			}),
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
	transformHead,
});
