/**
 * Site origin behind canonical/OG URLs, RSS links and the sitemap. Override
 * with SITE_URL when building for CI or a preview host.
 */
export const SITE_URL = (process.env.SITE_URL ?? "https://docs.lowrezstudio.com").replace(
	/\/$/,
	"",
);
export const SITE_NAME = "Tempest";
export const LOGO_URL = `${SITE_URL}/tempest-logo.png`;

/** Surfaced to search engines as schema.org `sameAs`. */
export const SOCIAL_PROFILES = ["https://github.com/LowRezStudio", "https://discord.gg/YPXJEaNPPe"];
