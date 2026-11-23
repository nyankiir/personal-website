import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";

const LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/#now", label: "Now" },
  { href: "/#interests", label: "Into" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2 font-display text-xl font-semibold">
          <span aria-hidden className="grid size-9 place-items-center rounded-full bg-lavender text-base transition group-hover:rotate-[20deg] group-hover:bg-rose">✿</span>
          {site.name.toLowerCase()}
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className="hidden rounded-full px-3 py-1.5 text-sm font-semibold text-muted transition hover:bg-lavender hover:text-ink sm:inline-block">
              {l.label}
            </Link>
          ))}
          <Link href="/blog" className="rounded-full px-3 py-1.5 text-sm font-semibold text-muted hover:bg-lavender sm:hidden">Blog</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted">
        <p>Made with care (and a lot of pastel) by {site.name} · {new Date().getFullYear()}</p>
        <div className="flex gap-4">
          {site.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="font-semibold hover:text-ink">{l.label}</a>)}
          <Link href="/blog/rss.xml" className="font-semibold hover:text-ink">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
