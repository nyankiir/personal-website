import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="wiggle text-7xl" aria-hidden>🫙</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">This jar is empty</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist (yet).</p>
      <Link href="/" className="mt-6 rounded-full bg-ink px-6 py-3 font-bold text-paper">Take me home</Link>
    </div>
  );
}
