import { defineConfig, HeadConfig } from "vitepress";
import sidebar from "./sidebar";
import footnote from "markdown-it-footnote";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	srcDir: "src",
	lang: "en-US",
	title: "Paladins Docs",
	description: `Documentation on Paladins mod making.`,
	// https://vitepress.dev/reference/default-theme-config
	themeConfig: {
		logo: "/logo.png",
		nav: [
			{ text: "Tempest", link: "/tempest/introduction" },
			{ text: "UDK", link: "/udk/getting-started" },
			{ text: "Marshal", link: "/marshal/introduction" },
			{ text: "API Reference", link: "/api-reference" },
		],
		sidebar,
		socialLinks: [
			{ icon: "discord", link: "https://discord.gg/YPXJEaNPPe" },
			{ icon: "github", link: "https://github.com/LowRezStudio" },
		],
		footer: {
			message: "Made by Tom, Kyiro, Cinnamon, Kana and whoever else!",
		},
		search: {
			provider: "local",
		},
	},
	markdown: {
		config: (md) => {
			md.use(footnote);
		},
	},
	transformHead: ({ pageData }) => {
		const head: HeadConfig[] = [];

		head.push(["meta", { property: "theme-color", content: "#33b6b1" }]);
		head.push([
			"meta",
			{
				property: "og:title",
				content: !!pageData.title?.length
					? `${pageData.title} - Paladins Documentation`
					: "Paladins Documentation",
			},
		]);
		head.push(["meta", { property: "og:image", content: "/logo.png" }]);

		if (pageData.frontmatter.description) {
			head.push([
				"meta",
				{
					property: "og:description",
					content: pageData.frontmatter.description,
				},
			]);
		}

		return head;
	},
});
