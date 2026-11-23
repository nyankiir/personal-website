import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { parseVideo, videoHtml } from "@/lib/video";

// Blog posts are Markdown files in content/blog. The file name is the URL.

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  minutes: number;
  video: string | null; // featured video link from frontmatter
  body: string; // markdown
};

const DIR = path.join(process.cwd(), "content/blog");

function parse(slug: string, raw: string): Post & { draft: boolean } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  for (const line of (m?.[1] ?? "").split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  const body = m?.[2] ?? raw;
  const tags = (meta.tags ?? "").replace(/^\[|\]$/g, "").split(",").map((t) => t.trim()).filter(Boolean);
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "1970-01-01",
    summary: meta.summary ?? "",
    tags,
    minutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
    video: parseVideo(meta.video) ? meta.video : null,
    body,
    draft: meta.draft === "true",
  };
}

export async function getPosts(): Promise<Post[]> {
  const files = await fs.readdir(DIR).catch(() => []);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .map(async (f) => parse(f.replace(/\.md$/, ""), await fs.readFile(path.join(DIR, f), "utf8"))),
  );
  return posts.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug) ?? null;
}

/**
 * Markdown → HTML. Posts are your own files, so their HTML is trusted.
 * A line that is only a video link (YouTube, Vimeo, Loom, /videos/…) becomes a player.
 */
export function render(md: string) {
  let inCode = false;
  const withVideos = md.split("\n").map((line) => {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode) return line;
    const v = parseVideo(line.trim().replace(/^<|>$/g, ""));
    return v ? `\n${videoHtml(v)}\n` : line;
  }).join("\n");
  return marked.parse(withVideos, { async: false, gfm: true });
}

export function fmtDate(d: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${d}T00:00:00Z`));
}
