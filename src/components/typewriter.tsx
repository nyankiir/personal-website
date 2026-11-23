"use client";
import { useEffect, useState } from "react";

// Types each phrase, pauses, deletes it, moves on.
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(phrases[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setI((x) => (x + 1) % phrases.length), 3000);
      return () => clearTimeout(t);
    }
    const word = phrases[i];
    const t = setTimeout(() => {
      if (!deleting && n === word.length) setDeleting(true);
      else if (deleting && n === 0) { setDeleting(false); setI((x) => (x + 1) % phrases.length); }
      else setN((x) => x + (deleting ? -1 : 1));
    }, !deleting && n === word.length ? 1800 : deleting ? 28 : 55);
    return () => clearTimeout(t);
  }, [i, n, deleting, phrases]);

  const text = phrases[i].slice(0, n);
  return (
    <span className="inline-block min-h-[2.1em] sm:min-h-0">
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden className="bg-gradient-to-r from-rose-ink via-lavender-ink to-sky-ink bg-clip-text text-transparent">
        {text}
      </span>
      <span aria-hidden className="ml-0.5 inline-block w-[3px] animate-pulse bg-lavender-ink align-baseline" style={{ height: "0.9em" }} />
    </span>
  );
}
