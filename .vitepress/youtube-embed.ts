import type { MarkdownRenderer } from "vitepress";

/**
 * Markdown-it rule: a paragraph holding nothing but a YouTube link becomes an
 * embed, and the link text becomes the player title.
 *
 *     [Watch a match](https://www.youtube.com/watch?v=0AN90Jux5Wk)
 *
 * Inline links, playlists and channels keep rendering as links.
 */

/** `watch?v=`, `youtu.be/`, `/embed/`, `/shorts/`, `/live/`; ids are 11 chars. */
const VIDEO =
	/^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;

export function youtubeEmbed(md: MarkdownRenderer): void {
	md.core.ruler.after("inline", "youtube_embed", ({ tokens }) => {
		for (let i = 0; i < tokens.length; i++) {
			const [open, inline, close] = tokens.slice(i, i + 3);
			if (open?.type !== "paragraph_open" || inline.type !== "inline") continue;
			if (close?.type !== "paragraph_close") continue;

			const children = inline.children ?? [];
			const [head, ...tail] = children;
			if (head?.type !== "link_open" || tail.at(-1)?.type !== "link_close") continue;

			const href = head.attrs?.find(([name]) => name === "href")?.[1] ?? "";
			const id = href.match(VIDEO)?.[1];
			if (!id) continue;

			const label = tail
				.map((token) => token.content)
				.join("")
				.trim();
			open.type = "html_block";
			open.content =
				`<figure class="youtube-embed">` +
				`<iframe src="https://www.youtube-nocookie.com/embed/${id}"` +
				` title="${md.utils.escapeHtml(!label || label === href ? "YouTube video" : label)}"` +
				` loading="lazy" referrerpolicy="strict-origin-when-cross-origin"` +
				` allowfullscreen></iframe></figure>\n`;
			tokens.splice(i + 1, 2);
		}
	});
}
