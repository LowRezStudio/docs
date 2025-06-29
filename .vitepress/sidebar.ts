import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.SidebarMulti = {
	"/udk": [
		{
			text: "Setup",
			collapsed: false,
			items: [
				{
					text: "Prerequisites"
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
