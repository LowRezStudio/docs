import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.SidebarMulti = {
	"/tempest/": [
		{
			text: "Introduction",
			link: "/tempest/introduction",
		},
		{
			text: "Command line",
			link: "/tempest/cli",
		},
		{
			text: "Tempest Legacy",
			link: "/tempest-legacy/introduction",
		},
	],
	"/tempest-legacy": [
		{
			text: "Introduction",
			link: "/tempest-legacy/introduction",
		},
		{
			text: "Commands",
			link: "/tempest-legacy/commands",
		},
		{
			text: "Multiplayer Arguments",
			link: "/tempest-legacy/multiplayer-args",
		},
		{
			text: "FAQ",
			link: "/tempest-legacy/faq",
		},
		{
			text: "Credits",
			link: "/tempest-legacy/credits",
		},
		{
			text: "Changelog",
			collapsed: false,
			items: [
				{
					text: "TempestMp",
					link: "/tempest-legacy/changelogtmp",
				},
			],
		},
	],
	"/lua/": [
		{
			text: "Lua Scripting",
			collapsed: false,
			items: [
				{
					text: "Introduction",
					link: "/lua/introduction",
				},
				{
					text: "Getting Started",
					link: "/lua/getting-started",
				},
				{
					text: "Concepts",
					link: "/lua/concepts",
				},
				{
					text: "Cookbook",
					link: "/lua/cookbook",
				},
				{
					text: "Limitations & Troubleshooting",
					link: "/lua/limitations",
				},
			],
		},
		{
			text: "Scripting API",
			collapsed: false,
			items: [
				{
					text: "tempest",
					link: "/lua/api/tempest",
				},
				{
					text: "Objects & Containers",
					link: "/lua/api/objects",
				},
				{
					text: "Console & Input",
					link: "/lua/api/console-and-input",
				},
				{
					text: "memory",
					link: "/lua/api/memory",
				},
				{
					text: "ui (Dear ImGui)",
					link: "/lua/api/ui",
				},
			],
		},
	],
	"/mods/": [
		{
			text: "Mod repository",
			link: "/mods/introduction",
		},
		{
			text: "Installing mods",
			link: "/mods/installing",
		},
		{
			text: "Publishing mods",
			link: "/mods/publishing",
		},
		{
			text: "Trust and moderation",
			link: "/mods/trust",
		},
	],
};

export default sidebar;
