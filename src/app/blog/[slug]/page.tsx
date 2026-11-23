import Link from "next/link";
import { notFound } from "next/navigation";
import { fmtDate, getPost, getPosts, render } from "@/lib/blog";
import { parseVideo, videoHtml } from "@/lib/video";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const video = parseVideo(post.video);
  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/blog" className="text-sm font-bold text-muted hover:text-ink">← All posts</Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-wider text-muted">{fmtDate(post.date)} · {video ? "🎥 Video" : `${post.minutes} min read`}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl" style={{ fontVariationSettings: '"SOFT" 100' }}>
        {post.title}
      </h1>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((t) => <span key={t} className="rounded-full bg-lavender px-3 py-0.5 text-xs font-bold text-lavender-ink">#{t}</span>)}
        </div>
      )}
      {video && <div className="mt-10" dangerouslySetInnerHTML={{ __html: videoHtml(video, post.title) }} />}
      <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: render(post.body) }} />
      <div className="mt-16 rounded-3xl bg-mint p-6 text-center">
        <p className="font-display text-xl font-semibold">Thanks for reading 🌱</p>
        <Link href="/blog" className="mt-2 inline-block font-bold text-mint-ink hover:underline">Read another post →</Link>
      </div>
    </article>
  );
}
