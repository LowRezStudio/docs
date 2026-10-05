#!/usr/bin/env node
/**
 * Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam,
 * Naver, ...) so new and updated pages are discovered without waiting for a
 * crawl. Google does not support IndexNow; use Search Console for Google.
 *
 * Run after a deploy, once the new pages are reachable:
 *
 *   pnpm indexnow
 *   SITE_URL=https://staging.example.com pnpm indexnow
 *
 * The key file (`src/public/<key>.txt`) must be deployed and reachable at
 * `${SITE_URL}/<key>.txt` before the request will be accepted.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = (process.env.SITE_URL ?? "https://docs.lowrezstudio.com").replace(/\/$/, "");
const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "public");

const keyFile = fs.readdirSync(publicDir).find((name) => /^[a-f0-9]{8,128}\.txt$/.test(name));

if (!keyFile) {
	console.error("indexnow: no IndexNow key file found in src/public (expected <key>.txt)");
	process.exit(1);
}

const key = keyFile.replace(/\.txt$/, "");
const sitemapUrl = process.argv[2] ?? `${SITE_URL}/sitemap.xml`;

const response = await fetch(sitemapUrl);
if (!response.ok) {
	console.error(`indexnow: failed to fetch sitemap (${response.status} ${response.statusText})`);
	process.exit(1);
}

const xml = await response.text();
const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) => match[1]);

if (urlList.length === 0) {
	console.error("indexnow: sitemap contained no <loc> URLs");
	process.exit(1);
}

const result = await fetch("https://api.indexnow.org/indexnow", {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify({
		host: new URL(SITE_URL).host,
		key,
		keyLocation: `${SITE_URL}/${keyFile}`,
		urlList,
	}),
});

// IndexNow returns 200 (accepted) or 202 (accepted, pending key validation).
if (result.status === 200 || result.status === 202) {
	console.log(`indexnow: submitted ${urlList.length} URLs (${result.status})`);
} else {
	console.error(`indexnow: submission failed (${result.status} ${result.statusText})`);
	process.exit(1);
}
