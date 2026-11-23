"use client";
import { useEffect, useRef } from "react";

// Soft colour blobs behind the page that lean gently toward the cursor.
const BLOBS = [
  { c: "var(--lavender)", s: 520, x: "8%", y: "-6%", d: 0, k: 0.04 },
  { c: "var(--rose)", s: 420, x: "62%", y: "4%", d: -6, k: -0.03 },
  { c: "var(--mint)", s: 380, x: "30%", y: "38%", d: -11, k: 0.025 },
  { c: "var(--peach)", s: 340, x: "78%", y: "52%", d: -3, k: -0.035 },
  { c: "var(--sky)", s: 300, x: "-4%", y: "64%", d: -8, k: 0.03 },
];

export function Blobs() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--mx", String(e.clientX - innerWidth / 2));
        ref.current?.style.setProperty("--my", String(e.clientY - innerHeight / 2));
      });
    };
    addEventListener("pointermove", onMove);
    return () => { removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {BLOBS.map((b, i) => (
        <div key={i} className="absolute transition-transform duration-700 ease-out"
          style={{ left: b.x, top: b.y, transform: `translate(calc(var(--mx, 0) * ${b.k}px), calc(var(--my, 0) * ${b.k}px))` }}>
          <div className="blob rounded-full opacity-70 blur-3xl"
            style={{ width: b.s, height: b.s, background: b.c, animationDelay: `${b.d}s` }} />
        </div>
      ))}
    </div>
  );
}
