import type { DefaultTheme } from "vitepress";

/** Shared by /mods/, /lua/ and /udk/ so the Mods nav section reads as one area. */
const modsSidebar: DefaultTheme.SidebarItem[] = [
	{
		text: "Installing mods",
		collapsed: false,
		items: [
			{
				text: "Mod repository",
				link: "/mods/introduction",
			},
			{
				text: "Installing mods",
				link: "/mods/installing",
			},
			{
				text: "Trust and moderation",
				link: "/mods/trust",
			},
		],
	},
	{
		text: "Making mods",
		collapsed: false,
		items: [
			{
				text: "Publishing mods",
				link: "/mods/publishing",
			},
			{
				text: "Mod deltas",
				link: "/mods/deltas",
			},
			{
				text: "Tempest Studio",
				collapsed: false,
				items: [
					{ text: "Introduction", link: "/studio/introduction" },
					{ text: "Your first mod", link: "/studio/first-mod" },
					{ text: "The interface", link: "/studio/interface" },
					{ text: "Projects and saving", link: "/studio/projects" },
					{ text: "Packages", link: "/studio/packages" },
					{ text: "Assembly", link: "/studio/assembly" },
					{ text: "Building mods", link: "/studio/mod-cooker" },
					{ text: "Keyboard shortcuts", link: "/studio/shortcuts" },
					{ text: "Automation", link: "/studio/automation" },
				],
			},
			{
				text: "Lua scripting",
				collapsed: true,
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
					{
						text: "Scripting API",
						collapsed: true,
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
			},
			{
				text: "UDK",
				collapsed: true,
				items: [
					{
						text: "Getting Started",
						link: "/udk/getting-started",
					},
					{
						text: "Hello World",
						link: "/udk/hello-world",
					},
					{
						text: "Decompiling scripts",
						link: "/udk/decompilation",
					},
					{
						text: "Editing animations",
						link: "/udk/edit-animations",
					},
					{
						text: "Resources",
						link: "/udk/resources",
					},
				],
			},
		],
	},
];

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
	"/mods/": modsSidebar,
	"/lua/": modsSidebar,
	"/udk/": modsSidebar,
	"/studio/": modsSidebar,
};

export default sidebar;
