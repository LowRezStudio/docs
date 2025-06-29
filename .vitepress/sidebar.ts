import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.SidebarMulti = {
	"/tempest": [
		{
			text: "Introduction",
			link: "/tempest/",
		},
		{
			text: "Developer Mode",
			link: "/tempest/udk",
		},
		{
			text: "Credits",
			link: "/tempest/credits",
		},
	],
	"/udk": [
		{
			text: "Setup",
			collapsed: false,
			items: [
				{
					text: "Prerequisites",
				},
			],
		},
	],
	"/api-reference": [
		{
			text: "TgGame.upk",
			collapsed: false,
			items: [
				{
					text: "TgGame",
				},
				{
					text: "TgPawn",
				},
				{
					text: "TgPlayerController",
				},
				{
					text: "TgRepInfo_Player",
				},
			],
		},
		{
			text: "TgClient.upk",
			collapsed: false,
			items: [
				{
					text: "TgGameViewportClient",
				},
			],
		},
	],
};

export default sidebar;
