import { createContentLoader } from "vitepress";
import { postsGlob } from "./posts.glob";

export interface BlogPost {
	url: string;
	title: string;
	date: string;
	description?: string;
	image?: string;
	tags?: string[];
	author?: string;
	excerpt?: string;
}

function decodeHtmlEntities(value: string): string {
	const entities: Record<string, string> = {
		amp: "&",
		lt: "<",
		gt: ">",
		quot: '"',
		apos: "'",
		zerowidthspace: "\u200b",
	};

	return value.replace(/&(#x[\da-f]+|#\d+|[a-z][a-z\d]+);/gi, (entity, reference: string) => {
		if (reference.startsWith("#")) {
			const codePoint =
				reference[1].toLowerCase() === "x"
					? Number.parseInt(reference.slice(2), 16)
					: Number.parseInt(reference.slice(1), 10);
			return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity;
		}

		return entities[reference.toLowerCase()] ?? entity;
	});
}

function plainTextExcerpt(html: string | undefined): string | undefined {
	if (!html) return undefined;

	return decodeHtmlEntities(
		html
			.replace(/<[^>]+>/g, " ")
			.replace(/\s+/g, " ")
			.trim(),
	);
}

export default createContentLoader(postsGlob, {
	excerpt: true,
	transform(raw): BlogPost[] {
		return raw
			.filter((post) => !post.frontmatter.draft && post.url !== "/blog/")
			.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
			.map((post) => ({
				url: post.url,
				title: post.frontmatter.title,
				date: post.frontmatter.date,
				description: post.frontmatter.description,
				image: post.frontmatter.image,
				tags: post.frontmatter.tags,
				author: post.frontmatter.author,
				excerpt: post.frontmatter.description ?? plainTextExcerpt(post.excerpt),
			}));
	},
});
