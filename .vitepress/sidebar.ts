import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.SidebarMulti = {
	"/tempest/": [
		{
			text: "Introduction",
			link: "/tempest/introduction",
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
			text: "Developer Mode",
			link: "/tempest-legacy/udk",
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
					text: "Tempest Launcher",
					link: "/tempest-legacy/changelogtl",
				},
				{
					text: "TempestMp",
					link: "/tempest-legacy/changelogtmp",
				},
			],
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
				{
					text: "Hello World",
					link: "/udk/hello-world",
				},
			],
		},
		{
			text: "Topics",
			collapsed: false,
			items: [
				{
					text: "Decompiling scripts",
					link: "/udk/decompilation",
				},
			],
		},
		{
			text: "UnrealScript",
			collapsed: false,
			items: [],
		},
	],
	"/marshal": [
		{
			text: "Introduction",
			link: "/marshal/introduction",
		},
		{
			text: "Resources",
			link: "/marshal/resources",
		},
		{
			text: "Encryption",
			collapsed: false,
			items: [
				{
					text: "Introduction",
					link: "/marshal/encryption/introduction",
				},
				{
					text: "Salsa20",
					link: "/marshal/encryption/salsa",
				},
				{
					text: "Diffie-Hellman",
					link: "/marshal/encryption/hellman",
				},
			],
		},
		{
			text: "Parsing",
			collapsed: false,
			items: [
				{
					text: "Introduction",
					link: "/marshal/parsing/introduction",
				},
				{
					text: "Deserialization",
					link: "/marshal/parsing/deserialization",
				},
				{
					text: "Serialization",
					link: "/marshal/parsing/serialization",
				},
			],
		},
		{
			text: "Files",
			collapsed: false,
			items: [
				{
					text: "assembly.dat",
					link: "/marshal/files/assembly",
				},
				{
					text: "lang.dat",
					link: "/marshal/files/lang",
				},
			],
		},
		{
			text: "Servers",
			collapsed: false,
			items: [
				{
					text: "Login Server",
					link: "/marshal/servers/login-server",
				},
				{
					text: "Game Server",
					link: "/marshal/servers/game-server",
				},
			],
		},
		{
			text: "Packets",
			collapsed: false,
			items: [
				{
					text: "HELLO",
					link: "/marshal/packets/hello",
				},
			],
		},
	],
};

export default sidebar;
