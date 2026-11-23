import Link from "next/link";
import { fmtDate, getPosts } from "@/lib/blog";

export const metadata = { title: "Blog", description: "Notes on what I'm building and learning." };

const TINTS = ["bg-lavender", "bg-mint", "bg-peach", "bg-sky", "bg-rose", "bg-butter"];

export default async function Blog() {
  const posts = await getPosts();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-extrabold uppercase tracking-widest text-accent">Notes from the journey</p>
      <h1 className="mt-1 font-display text-5xl font-semibold" style={{ fontVariationSettings: '"SOFT" 100' }}>The blog 📓</h1>
      <p className="mt-3 text-lg text-muted">What I&apos;m building, what I&apos;m learning, and what broke along the way.</p>
      <ul className="mt-10 space-y-4">
        {posts.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex gap-5 rounded-3xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <span aria-hidden className={`hidden w-2 shrink-0 rounded-full sm:block ${TINTS[i % TINTS.length]}`} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{fmtDate(p.date)} · {p.minutes} min read</p>
                <h2 className="mt-1 font-display text-2xl font-semibold group-hover:underline">{p.title}</h2>
                <p className="mt-1 text-muted">{p.summary}</p>
                {p.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => <span key={t} className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-semibold text-muted">#{t}</span>)}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
