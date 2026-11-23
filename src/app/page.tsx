import Link from "next/link";
import { ConfettiWave } from "@/components/confetti-wave";
import { Jar } from "@/components/jar";
import { ProjectGrid } from "@/components/project-grid";
import { Stickers } from "@/components/stickers";
import { Typewriter } from "@/components/typewriter";
import { fmtDate, getPosts } from "@/lib/blog";
import { interests, now, projects, site } from "@/content/site";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="flex min-h-[78vh] flex-col justify-center py-16">
        <p className="rise mb-4 text-lg font-bold text-muted" style={{ fontVariationSettings: '"SOFT" 100' }}>
          <ConfettiWave /> Hi, I&apos;m {site.name}{site.location ? ` · ${site.location}` : ""}
        </p>
        <h1 className="rise font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
          style={{ animationDelay: "80ms", fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
          I build<br /><Typewriter phrases={site.rotating} />
        </h1>
        <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={{ animationDelay: "160ms" }}>
          {site.intro}
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
          <a href="#projects" className="rounded-full bg-ink px-6 py-3 font-bold text-paper transition hover:-translate-y-0.5 hover:shadow-lg">See my projects</a>
          <Link href="/go-mama" className="rounded-full bg-rose px-6 py-3 font-bold text-rose-ink transition hover:-translate-y-0.5 hover:shadow-lg">🤱🏾 Partner on go-mama</Link>
          <Link href="/blog" className="rounded-full border border-line bg-card px-6 py-3 font-bold transition hover:-translate-y-0.5 hover:bg-butter">Read the blog</Link>
        </div>
      </section>

      {/* go-mama callout */}
      <section className="mb-24 overflow-hidden rounded-[2rem] bg-rose p-6 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="text-6xl" aria-hidden>🤱🏾</div>
          <div className="flex-1">
            <p className="text-sm font-extrabold uppercase tracking-widest text-rose-ink">Looking for partners</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">go-mama: no mom should go quiet unnoticed.</h2>
            <p className="mt-2 max-w-2xl text-ink/80">
              A support app for moms through pregnancy and after birth, built with care workers in mind. I&apos;m looking for clinics, NGOs,
              clinicians and translators to help bring it to the moms who need it.
            </p>
          </div>
          <Link href="/go-mama" className="shrink-0 self-start rounded-full bg-ink px-6 py-3 font-bold text-paper transition hover:-translate-y-0.5 sm:self-center">
            Learn more →
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-24 py-8">
        <SectionTitle kicker="Things I've made" title="Projects" emoji="🧩" />
        <ProjectGrid projects={projects} />
      </section>

      {/* Now */}
      <section id="now" className="scroll-mt-24 py-20">
        <SectionTitle kicker="What's filling my jars" title="Right now" emoji="🫙"
          sub="What I'm working on these days. Each jar shows roughly how far along it is." />
        <div className="grid gap-4 sm:grid-cols-2">
          {now.map((n, i) => (
            <div key={n.title} className="flex items-center gap-5 rounded-3xl border border-line bg-card p-5 transition hover:-translate-y-1 hover:shadow-lg">
              <Jar id={`now-${i}`} level={n.progress} color={n.color} />
              <div>
                <h3 className="font-display text-xl font-semibold">{n.title}</h3>
                <p className="mt-1 text-muted">{n.note}</p>
                <p className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-bold bg-${n.color} text-${n.color}-ink`}>{n.progress}% there</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="scroll-mt-24 py-8">
        <SectionTitle kicker="Rabbit holes" title="Things I'm into" emoji="✨" sub="Go on, rearrange them." />
        <Stickers items={interests} />
      </section>

      {/* Blog */}
      <section className="py-20">
        <SectionTitle kicker="Notes from the journey" title="From the blog" emoji="📓" />
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`}
              className={`group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-lg ${["bg-lavender", "bg-mint", "bg-peach"][i % 3]}`}>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{fmtDate(p.date)} · {p.minutes} min</p>
              <h3 className="mt-2 font-display text-2xl font-semibold group-hover:underline">{p.title}</h3>
              <p className="mt-2 text-ink/75">{p.summary}</p>
            </Link>
          ))}
        </div>
        <Link href="/blog" className="mt-6 inline-block font-bold text-accent hover:underline">All posts →</Link>
      </section>

      {/* Contact */}
      <section className="rounded-[2rem] bg-lavender p-8 text-center sm:p-12">
        <h2 className="font-display text-4xl font-semibold">Let&apos;s talk ☕</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/80">
          About go-mama, an internship, a project you think I&apos;d love, or just to say hi.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {site.email && <a href={`mailto:${site.email}`} className="rounded-full bg-ink px-6 py-3 font-bold text-paper hover:-translate-y-0.5">Email me</a>}
          {site.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-full bg-card px-6 py-3 font-bold hover:-translate-y-0.5">{l.label} ↗</a>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ kicker, title, emoji, sub }: { kicker: string; title: string; emoji: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-extrabold uppercase tracking-widest text-accent">{kicker}</p>
      <h2 className="mt-1 flex items-center gap-3 font-display text-4xl font-semibold sm:text-5xl" style={{ fontVariationSettings: '"SOFT" 100' }}>
        {title} <span aria-hidden className="wiggle inline-block text-3xl">{emoji}</span>
      </h2>
      {sub && <p className="mt-2 text-muted">{sub}</p>}
    </div>
  );
}
