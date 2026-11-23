import { BlogList } from "@/components/blog-list";
import { fmtDate, getPosts } from "@/lib/blog";
import { parseVideo } from "@/lib/video";

export const metadata = { title: "Blog", description: "Notes and videos on what I'm building and learning." };

export default async function Blog() {
  const posts = (await getPosts()).map((p) => {
    const v = parseVideo(p.video);
    return {
      slug: p.slug, title: p.title, date: p.date, dateLabel: fmtDate(p.date), summary: p.summary,
      tags: p.tags, minutes: p.minutes, isVideo: Boolean(v), thumb: v?.thumb ?? null,
    };
  });
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-extrabold uppercase tracking-widest text-accent">Notes from the journey</p>
      <h1 className="mt-1 font-display text-5xl font-semibold" style={{ fontVariationSettings: '"SOFT" 100' }}>The blog 📓</h1>
      <p className="mt-3 text-lg text-muted">
        What I&apos;m building, what I&apos;m learning, and what broke along the way, in writing and on video.
      </p>
      <BlogList posts={posts} />
    </div>
  );
}
