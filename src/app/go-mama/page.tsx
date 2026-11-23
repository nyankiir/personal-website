import Link from "next/link";
import { projects, site } from "@/content/site";

export const metadata = {
  title: "go-mama: partner with us",
  description: "A support app for moms through pregnancy and after birth, with a care team that notices. Looking for partners.",
};

const gomama = projects.find((p) => p.slug === "go-mama")!;

const FEATURES = [
  { who: "For moms", color: "rose", emoji: "🤱🏾", items: [
    "A daily self-care and baby-care schedule that changes after birth",
    "One-tap feed logging with “next feed around…”",
    "A daily mood check-in with an “I need help now” button that alerts her care team",
    "A daily affirmation and tips from other moms, matched to what she needs this week",
  ] },
  { who: "For care workers", color: "lavender", emoji: "🩺", items: [
    "A caseload sorted by who needs attention first",
    "Flags for asked for help, stopped logging, several low-mood days in a row, gone quiet, due soon",
    "A 14-day view of each mom, plus private care notes and outreach logging",
  ] },
  { who: "For everyone", color: "mint", emoji: "📍", items: [
    "Nearby clinics and support on a map (location is never stored)",
    "Danger signs and the local crisis line, never behind a login",
    "Online group support sessions with live chat",
  ] },
] as const;

const ASKS = [
  { emoji: "🏥", title: "Clinics & health organizations", text: "List your services, co-host support sessions, and help us reach moms in your region." },
  { emoji: "🤝🏾", title: "Community health & care-worker groups", text: "Pilot the care-team dashboard with a small caseload and tell us what's missing." },
  { emoji: "👩🏾‍⚕️", title: "Clinicians", text: "Review the danger signs, default routines and affirmations before anything reaches a mom." },
  { emoji: "🗣️", title: "Translators", text: "Help bring go-mama to moms in Kiswahili, Arabic and other languages." },
  { emoji: "📱", title: "SMS / WhatsApp & technical partners", text: "Help “I need help now” reach a person even when nobody has the app open." },
];

export default function GoMama() {
  const contact = site.email ? `mailto:${site.email}?subject=Partnering%20on%20go-mama` : site.links[0]?.href;
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link href="/#projects" className="text-sm font-bold text-muted hover:text-ink">← All projects</Link>

      <header className="mt-8">
        <p className="text-sm font-extrabold uppercase tracking-widest text-rose-ink">Looking for partners</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-tight sm:text-6xl" style={{ fontVariationSettings: '"SOFT" 100' }}>
          go-mama <span aria-hidden>🤱🏾</span>
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-muted">
          Support for moms, especially low- and middle-income moms, through pregnancy and the months after birth,
          with a care team that notices when someone goes quiet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {contact && <a href={contact} className="rounded-full bg-ink px-6 py-3 font-bold text-paper hover:-translate-y-0.5">Partner with us</a>}
          {gomama.demo && <a href={gomama.demo} target="_blank" rel="noreferrer" className="rounded-full bg-rose px-6 py-3 font-bold text-rose-ink hover:-translate-y-0.5">Try the demo ↗</a>}
          {gomama.repo && <a href={gomama.repo} target="_blank" rel="noreferrer" className="rounded-full border border-line bg-card px-6 py-3 font-bold hover:-translate-y-0.5">See the code ↗</a>}
        </div>
      </header>

      <section className="mt-16 rounded-[2rem] bg-butter p-8 sm:p-10">
        <h2 className="font-display text-3xl font-semibold">Why</h2>
        {/* ✏️ Tell your story here: why you started go-mama, and who it's for. */}
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink/85">
          The weeks around birth are when a mom most needs someone checking in, and when she&apos;s least likely to ask.
          go-mama gives her a simple daily routine and a way to say how she&apos;s doing. It gives her care team a view that
          surfaces who needs a call today, so silence doesn&apos;t go unnoticed.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-semibold">What it does</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.who} className={`rounded-3xl p-6 bg-${f.color}`}>
              <p className="text-3xl" aria-hidden>{f.emoji}</p>
              <h3 className={`mt-2 font-display text-xl font-semibold text-${f.color}-ink`}>{f.who}</h3>
              <ul className="mt-3 space-y-2 text-[15px] text-ink/85">
                {f.items.map((i) => <li key={i} className="flex gap-2"><span aria-hidden>•</span>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-line bg-card p-6">
          <h2 className="font-display text-2xl font-semibold">Built to be trusted 🔒</h2>
          <ul className="mt-3 space-y-2 text-muted">
            <li>• A care worker sees a mom&apos;s data only while she&apos;s assigned to them, and she can remove anyone at any time. This is enforced in the database, not just the app.</li>
            <li>• Her location is used to find help nearby and is never stored.</li>
            <li>• Crisis help is public and never behind a login.</li>
            <li>• The “Mama bot” is curated by people, not generated by AI, so crisis wording never changes.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-card p-6">
          <h2 className="font-display text-2xl font-semibold">Where it is now 🛠️</h2>
          <p className="mt-3 text-muted">
            The app is built and working end to end, with sample data. Before real moms use it, we need clinicians to review
            the health content, verified crisis lines for each region, and translations. That&apos;s where partners come in.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-semibold">How you can help</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ASKS.map((a) => (
            <div key={a.title} className="flex gap-4 rounded-3xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <span className="text-3xl" aria-hidden>{a.emoji}</span>
              <div>
                <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-1 text-muted">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] bg-rose p-8 text-center sm:p-12">
        <h2 className="font-display text-4xl font-semibold">Let&apos;s build this together</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/80">If you work with moms, or know someone who does, I&apos;d love to talk.</p>
        {contact && <a href={contact} className="mt-6 inline-block rounded-full bg-ink px-8 py-3 font-bold text-paper hover:-translate-y-0.5">Get in touch</a>}
      </section>
    </div>
  );
}
