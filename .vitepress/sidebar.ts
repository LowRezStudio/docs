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
<<<<<<< HEAD
					text: "Prerequisites", link: "/udk/prerequisites"
				},
				{
					text: "Installation", link: "/udk/installation"
				}
			]
		}
=======
					text: "Prerequisites",
				},
			],
		},
>>>>>>> ad9d098df1ff2ac412a04d2942e4282fae8f807c
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
