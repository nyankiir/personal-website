"use client";
import { useState } from "react";

const COLORS = ["var(--rose)", "var(--lavender)", "var(--mint)", "var(--peach)", "var(--sky)", "var(--butter)"];
type Bit = { id: number; x: number; y: number; r: number; c: string; s: number };

// A waving hand that throws pastel confetti when you click it.
export function ConfettiWave() {
  const [bits, setBits] = useState<Bit[]>([]);
  function burst() {
    const base = Date.now();
    const next = Array.from({ length: 28 }, (_, k) => {
      const a = (Math.PI * 2 * k) / 28 + Math.random() * 0.3;
      const d = 60 + Math.random() * 90;
      return { id: base + k, x: Math.cos(a) * d, y: Math.sin(a) * d - 30, r: Math.random() * 360, c: COLORS[k % COLORS.length], s: 6 + Math.random() * 8 };
    });
    setBits(next);
    setTimeout(() => setBits((b) => (b[0]?.id === base ? [] : b)), 900);
  }
  return (
    <button onClick={burst} aria-label="Say hi" className="relative inline-block cursor-pointer select-none">
      <span className="wiggle inline-block origin-[70%_70%]">👋🏾</span>
      {bits.map((b) => (
        <span key={b.id} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: b.s, height: b.s * 0.6, background: b.c,
            ["--tx" as string]: `${b.x}px`, ["--ty" as string]: `${b.y}px`, ["--rot" as string]: `${b.r}deg`,
            animation: "burst 0.85s cubic-bezier(.2,.8,.3,1) forwards",
          }} />
      ))}
    </button>
  );
}
