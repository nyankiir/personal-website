"use client";
import { useEffect, useRef, useState } from "react";

const COLORS = ["rose", "lavender", "mint", "peach", "sky", "butter"] as const;

// Deterministic "random" layout so server and browser agree.
function layout(n: number, seed: number, cols = 3) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, (_, i) => ({
    x: ((i % cols) + 0.15 + rnd() * 0.5) / cols,
    y: (Math.floor(i / cols) + 0.15 + rnd() * 0.45) / Math.ceil(n / cols),
    r: (rnd() - 0.5) * 18,
  }));
}

/** Interests as stickers you can pick up and move around. */
export function Stickers({ items }: { items: { label: string; emoji: string }[] }) {
  const board = useRef<HTMLDivElement>(null);
  const [seed, setSeed] = useState(7);
  const [pos, setPos] = useState(() => layout(items.length, 7));
  const [top, setTop] = useState<number[]>(items.map((_, i) => i));
  const drag = useRef<{ i: number; dx: number; dy: number } | null>(null);
  const cols = useRef(3);

  // Narrow screens get two columns so stickers don't pile up or hang off the edge.
  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const c = e.contentRect.width < 560 ? 2 : 3;
      if (c !== cols.current) { cols.current = c; setPos(layout(items.length, seed, c)); }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length, seed]);

  function down(i: number, e: React.PointerEvent<HTMLButtonElement>) {
    const el = e.currentTarget.getBoundingClientRect();
    drag.current = { i, dx: e.clientX - el.left, dy: e.clientY - el.top };
    e.currentTarget.setPointerCapture(e.pointerId);
    setTop((t) => [...t.filter((x) => x !== i), i]);
  }
  function move(e: React.PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d || !board.current) return;
    const b = board.current.getBoundingClientRect();
    const w = e.currentTarget.offsetWidth, h = e.currentTarget.offsetHeight;
    const x = Math.min(Math.max(e.clientX - b.left - d.dx, 0), b.width - w) / b.width;
    const y = Math.min(Math.max(e.clientY - b.top - d.dy, 0), b.height - h) / b.height;
    setPos((p) => p.map((q, k) => (k === d.i ? { ...q, x, y } : q)));
  }
  const up = () => { drag.current = null; };

  function shuffle() {
    const s = seed * 31 + 11;
    setSeed(s);
    setPos(layout(items.length, s, cols.current));
  }

  return (
    <div>
      <div ref={board} className="relative h-[26rem] overflow-hidden rounded-[2rem] border-2 border-dashed border-line bg-card/60 sm:h-[22rem]">
        {items.map((it, i) => {
          const c = COLORS[i % COLORS.length];
          return (
            <button
              key={it.label}
              onPointerDown={(e) => down(i, e)}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
              className={`absolute flex touch-none cursor-grab items-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold sm:px-4 sm:py-2.5 sm:text-sm shadow-md transition-[transform,box-shadow] duration-150 select-none hover:scale-105 hover:shadow-lg active:cursor-grabbing active:scale-110 bg-${c} text-${c}-ink`}
              style={{
                left: `${pos[i].x * 100}%`, top: `${pos[i].y * 100}%`,
                transform: `rotate(${pos[i].r}deg)`, zIndex: top.indexOf(i) + 1,
                maxWidth: "48%",
              }}
            >
              <span aria-hidden className="text-xl">{it.emoji}</span>{it.label}
            </button>
          );
        })}
        <p className="pointer-events-none absolute bottom-3 left-4 text-xs font-semibold text-muted">drag me around ✋🏾</p>
      </div>
      <button onClick={shuffle} className="mt-3 rounded-full border border-line bg-card px-4 py-1.5 text-sm font-semibold hover:bg-butter">
        🎲 Shake it up
      </button>
    </div>
  );
}
