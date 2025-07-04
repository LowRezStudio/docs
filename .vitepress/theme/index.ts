// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import MultiplayerArgs from "./components/MultiplayerArgs.vue";
import MultiplayerArgsForm from "./components/MultiplayerArgsForm.vue";
import "./style.css";

export default {
	extends: DefaultTheme,
	enhanceApp({ app, router, siteData }) {
		app.component("MultiplayerArgs", MultiplayerArgs);
		app.component("MultiplayerArgsForm", MultiplayerArgsForm);
	},
} satisfies Theme;
