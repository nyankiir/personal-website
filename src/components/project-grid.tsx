"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import type { Project, ProjectTag } from "@/content/site";

const TAGS: ("All" | ProjectTag)[] = ["All", "Health", "Impact", "AI / ML", "Systems", "Tools"];

const STATUS: Record<Project["status"], string> = {
  Live: "🟢 Live", Building: "🛠️ Building", Shipped: "✨ Shipped", Learning: "📚 Learning", Cofounder: "🌱 Cofounder",
};

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const shown = tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag));
  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button key={t} onClick={() => setTag(t)} aria-pressed={tag === t}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              tag === t ? "border-ink bg-ink text-paper" : "border-line bg-card hover:-translate-y-0.5 hover:bg-lavender"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => <ProjectCard key={p.slug} p={p} delay={i * 60} />)}
      </div>
    </>
  );
}

function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // Tilt toward the pointer, like picking up a card.
  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-4px)`;
  }
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="rise flex flex-col rounded-3xl border border-line bg-card p-5 shadow-[0_1px_0_var(--line)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-xl"
      style={{ animationDelay: `${delay}ms`, willChange: "transform" }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={`grid size-14 place-items-center rounded-2xl text-3xl bg-${p.color}`} aria-hidden>{p.emoji}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold bg-${p.color} text-${p.color}-ink`}>{STATUS[p.status]}</span>
      </div>
      <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.blurb}</p>

      {open && (
        <ul className="mt-3 space-y-1.5 text-sm">
          {p.details.map((d) => (
            <li key={d} className="flex gap-2"><span aria-hidden className={`text-${p.color}-ink`}>✦</span><span>{d}</span></li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => <span key={s} className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-semibold text-muted">{s}</span>)}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm font-bold">
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className={`text-${p.color}-ink hover:underline`}>
          {open ? "Less" : "What's inside"}
        </button>
        {p.page && <Link href={p.page} className={`text-${p.color}-ink hover:underline`}>Story & partners →</Link>}
        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className={`text-${p.color}-ink hover:underline`}>Live demo ↗</a>}
        {p.website && <a href={p.website} target="_blank" rel="noreferrer" className={`text-${p.color}-ink hover:underline`}>Website ↗</a>}
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="ml-auto text-muted hover:text-ink">Code ↗</a>}
      </div>
    </article>
  );
}

// Tailwind only generates classes it can see in source, so list the dynamic ones:
// bg-rose bg-lavender bg-mint bg-peach bg-sky bg-butter
// text-rose-ink text-lavender-ink text-mint-ink text-peach-ink text-sky-ink text-butter-ink
