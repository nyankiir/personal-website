# Personal site

Soft, playful personal site: projects, what I'm working on now, interests, a blog,
and a partner page for go-mama. Next.js 16 + Tailwind v4, fully static.

```bash
npm install
npm run dev        # http://localhost:3020
```

## Editing

- **Everything except blog posts** is in `src/content/site.ts`: your name, intro,
  links, projects, the "Right now" jars (`progress` 0–100), and interests.
  Lines marked ✏️ are placeholders to make your own.
- **go-mama page**: `src/app/go-mama/page.tsx`. Write your own "Why" story there.
  Once go-mama is on Vercel, put its URL in `demo:` in `site.ts` and a "Try the demo" button appears.
- **Set `email`** in `site.ts` to turn on the "Email me" / "Partner with us" buttons.

## Writing a blog post

Add `content/blog/my-post.md` (the file name becomes `/blog/my-post`):

```md
---
title: What I learned building a job queue
date: 2026-11-20
summary: One sentence for the list page.
tags: [systems, learning]
---

Write in Markdown here.
```

**Video posts:** add `video: https://youtu.be/…` to the frontmatter for a video post (player at the top, listed under 🎥 Videos with a thumbnail). Or put a video link on its own line anywhere in a post to embed it there. YouTube (incl. Shorts), Vimeo, Loom, and files in `public/videos/` all work. Keep files small (GitHub's limit is 100 MB); upload longer videos to YouTube as *unlisted*.

`draft: true` or a file name starting with `_` keeps a post unpublished.
`content/blog/_template.md` has post ideas drawn from your projects. RSS lives at `/blog/rss.xml`.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project** → import it → **Deploy** (no settings or env vars needed).
3. Put the real URL in `site.url` in `site.ts`. Optionally add a custom domain in Vercel.

Every push to `main` redeploys. Publishing a post = add a file and push.
