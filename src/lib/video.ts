// Turns a video link into something we can embed. Supports YouTube (incl.
// Shorts), Vimeo, Loom, and video files you put in public/videos/.

export type Video =
  | { kind: "embed"; src: string; title: string; thumb: string | null; vertical: boolean }
  | { kind: "file"; src: string; title: string; thumb: null; vertical: false };

export function parseVideo(raw: string | undefined | null): Video | null {
  const url = (raw ?? "").trim();
  if (!url) return null;

  if (/^\/videos\/.+\.(mp4|webm|mov|m4v)$/i.test(url) || /^https?:\/\/\S+\.(mp4|webm|m4v)(\?\S*)?$/i.test(url)) {
    return { kind: "file", src: url, title: "Video", thumb: null, vertical: false };
  }
  let u: URL;
  try { u = new URL(url); } catch { return null; }
  const host = u.hostname.replace(/^www\.|^m\./, "");

  let yt: string | null = null;
  if (host === "youtu.be") yt = u.pathname.slice(1);
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    yt = u.searchParams.get("v") ?? u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]+)/)?.[1] ?? null;
  }
  if (yt && /^[\w-]{6,}$/.test(yt)) {
    return {
      kind: "embed",
      // nocookie: no tracking cookies until someone presses play
      src: `https://www.youtube-nocookie.com/embed/${yt}?rel=0`,
      title: "YouTube video",
      thumb: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
      vertical: u.pathname.startsWith("/shorts/"),
    };
  }
  const vimeo = host === "vimeo.com" ? u.pathname.match(/^\/(\d+)/)?.[1] : null;
  if (vimeo) return { kind: "embed", src: `https://player.vimeo.com/video/${vimeo}?dnt=1`, title: "Vimeo video", thumb: null, vertical: false };
  const loom = host === "loom.com" ? u.pathname.match(/^\/(?:share|embed)\/([\w]+)/)?.[1] : null;
  if (loom) return { kind: "embed", src: `https://www.loom.com/embed/${loom}`, title: "Loom video", thumb: null, vertical: false };
  return null;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** HTML for a player, used both for featured videos and videos inside a post. */
export function videoHtml(v: Video, title = v.title) {
  const frame = `class="video-frame${v.vertical ? " vertical" : ""}"`;
  if (v.kind === "file") {
    return `<div ${frame}><video src="${esc(v.src)}" controls playsinline preload="metadata" aria-label="${esc(title)}"></video></div>`;
  }
  return `<div ${frame}><iframe src="${esc(v.src)}" title="${esc(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
}
