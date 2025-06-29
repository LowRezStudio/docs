import { defineConfig } from "vitepress";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	srcDir: "src",
	title: "Paladins Mods",
	description: "Documentation on Paladins mod making",
	// https://vitepress.dev/reference/default-theme-config
	themeConfig: {
		logo: "/logo.png",
		nav: [
<<<<<<< HEAD
			{ text: "UDK", link: "/udk/getting-started" },
			{ text: "UnrealScript", link: "/unrealscript" },
=======
			{ text: "Tempest", link: "/tempest" },
			{ text: "UDK", link: "/udk" },
>>>>>>> ad9d098df1ff2ac412a04d2942e4282fae8f807c
			{ text: "Marshal", link: "/marshal" },
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
});
