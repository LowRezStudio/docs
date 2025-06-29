import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.SidebarMulti = {
	"/udk": [
		{
			text: "Introduction",
			collapsed: false,
			items: [
				{
					text: "Getting Started", link: "/udk/getting-started"
				}
			]
		},
		{
			text: "Setup",
			collapsed: false,
			items: [
				{
					text: "Prerequisites", link: "/udk/prerequisites"
				},
				{
					text: "Installation", link: "/udk/installation"
				}
			]
		}
	],
	"/api-reference": [
		{
			text: "TgGame.upk",
			collapsed: false,
			items: [
				{
					text: "TgGame"
				},
				{
					text: "TgPawn"
				},
				{
					text: "TgPlayerController"
				},
				{
					text: "TgRepInfo_Player"
				}
			]
		},
		{
			text: "TgClient.upk",
			collapsed: false,
			items: [
				{
					text: "TgGameViewportClient"
				}
			]
		}
	]
};

export default sidebar;
