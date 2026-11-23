"use client";
import { useState } from "react";
import Link from "next/link";

export type PostCard = {
  slug: string; title: string; date: string; dateLabel: string; summary: string;
  tags: string[]; minutes: number; thumb: string | null; isVideo: boolean;
};

const TINTS = ["bg-lavender", "bg-mint", "bg-peach", "bg-sky", "bg-rose", "bg-butter"];
const FILTERS = [
  { key: "all", label: "All" },
  { key: "written", label: "✍🏾 Written" },
  { key: "video", label: "🎥 Videos" },
] as const;

export function BlogList({ posts }: { posts: PostCard[] }) {
  const [f, setF] = useState<(typeof FILTERS)[number]["key"]>("all");
  const shown = posts.filter((p) => f === "all" || (f === "video") === p.isVideo);
  return (
    <>
      <div role="group" aria-label="Filter posts" className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((x) => (
          <button key={x.key} onClick={() => setF(x.key)} aria-pressed={f === x.key}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              f === x.key ? "border-ink bg-ink text-paper" : "border-line bg-card hover:bg-lavender"}`}>
            {x.label}
          </button>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="mt-8 rounded-3xl bg-card p-6 text-center text-muted">
          {f === "video" ? "No videos yet. The first one is coming soon 🎬" : "Nothing here yet."}
        </p>
      )}
      <ul className="mt-6 space-y-4">
        {shown.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex flex-col gap-5 rounded-3xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row">
              {p.isVideo ? (
                <span className={`relative grid aspect-video w-full shrink-0 place-items-center overflow-hidden rounded-2xl sm:w-48 ${TINTS[i % TINTS.length]}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.thumb && <img src={p.thumb} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />}
                  <span aria-hidden className="relative grid size-12 place-items-center rounded-full bg-card/90 text-lg shadow-md transition group-hover:scale-110">▶</span>
                </span>
              ) : (
                <span aria-hidden className={`hidden w-2 shrink-0 rounded-full sm:block ${TINTS[i % TINTS.length]}`} />
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  {p.dateLabel} · {p.isVideo ? "🎥 Video" : `${p.minutes} min read`}
                </p>
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
    </>
  );
}
