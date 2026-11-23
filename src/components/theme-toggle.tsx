"use client";
import { useSyncExternalStore } from "react";

// Runs before React (inlined in <head>) so the page never flashes the wrong theme.
export const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

function current(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => { mo.disconnect(); mq.removeEventListener("change", cb); };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, current, () => null);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem("theme", next); } catch {}
      }}
      aria-label={`Switch to ${next} mode`}
      className="grid size-10 place-items-center rounded-full border border-line bg-card text-lg transition hover:rotate-12 hover:scale-110"
    >
      <span aria-hidden>{theme === "dark" ? "🌙" : theme === "light" ? "☀️" : ""}</span>
    </button>
  );
}
