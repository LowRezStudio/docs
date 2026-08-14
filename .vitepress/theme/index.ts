import MapIds from "./components/MapIds.vue";
import MultiplayerArgs from "./components/MultiplayerArgs.vue";
import MultiplayerArgsForm from "./components/MultiplayerArgsForm.vue";
import Layout from "./Layout.vue";
// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import "./style.css";

export default {
	Layout,
	enhanceApp({ app, router, siteData }) {
		app.component("MultiplayerArgs", MultiplayerArgs);
		app.component("MultiplayerArgsForm", MultiplayerArgsForm);
		app.component("MapIds", MapIds);
	},
} satisfies Theme;
