import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.SidebarMulti = {
	"/tempest": [
		{
			text: "Introduction",
			link: "/tempest/introduction",
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
					text: "Getting Started",
					link: "/udk/getting-started",
				},
				{
					text: "Resources",
					link: "/udk/resources",
				},
			],
		},
		{
			text: "Setup",
			collapsed: false,
			items: [
				{
					text: "Prerequisites",
					link: "/udk/prerequisites",
				},
				{
					text: "Installation",
					link: "/udk/installation",
				},
			],
		},
		{
			text: "UnrealScript",
			collapsed: false,
			items: [],
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
