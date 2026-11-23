import { getPosts } from "@/lib/blog";
import { site } from "@/content/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export async function GET() {
  const posts = await getPosts();
  const items = posts.map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/blog/${p.slug}</link>
      <guid>${site.url}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${esc(site.name)}'s blog</title>
  <link>${site.url}/blog</link>
  <description>What I'm building and learning.</description>${items}
</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
