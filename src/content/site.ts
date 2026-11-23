// Everything on the site that isn't a blog post lives here.
// Lines marked ✏️ are guesses or placeholders: make them yours.

export const site = {
  name: "Nyankiir",
  handle: "nyankiir",
  url: "https://nyankiir.vercel.app", // ✏️ your real domain once deployed
  // The hero cycles through these after "I build ".
  rotating: [
    "tools for new moms",
    "ML that shows its work",
    "systems that survive failure",
    "brain–computer interface pipelines",
    "technology more people can use",
  ],
  // One line under the big headline (also used as the site's description).
  intro:
    "Aspiring systems and AI engineer, and firm believer that “it works” should include “for whom?”",
  location: "Harvard · CS & Neuroscience",
  // The "About me" section, one string per paragraph.
  bio: [
    "Hi, I'm Nyankiir, a Harvard student studying Computer Science and Neuroscience, aspiring systems and AI engineer, and firm believer that “it works” should include “for whom?”",
    "I'm interested in healthtech, social impact, and building technology that more people can actually use. I'm a cofounder of RefuTECH Academy, where we're working to expand access to technical education and opportunities for refugee youth.",
    "I'm learning every day, occasionally debugging my own assumptions, and building for access. Take a look at my projects and follow along on my journey.",
  ],
  email: "nyankiirmajok18343@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/nyankiir" },
    // ✏️ { label: "LinkedIn", href: "https://www.linkedin.com/in/…" },
  ],
};

export type ProjectTag = "Health" | "AI / ML" | "Systems" | "Tools" | "Impact";

export type Project = {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  details: string[];
  stack: string[];
  tags: ProjectTag[];
  status: "Live" | "Building" | "Shipped" | "Learning" | "Cofounder";
  color: "rose" | "lavender" | "mint" | "peach" | "sky" | "butter";
  repo?: string;
  demo?: string;
  website?: string;
  page?: string;
};

export const projects: Project[] = [
  {
    slug: "go-mama",
    name: "go-mama",
    emoji: "🤱🏾",
    blurb: "Support for moms, especially in low- and middle-income settings, through pregnancy and the months after birth, with a care team that notices when someone goes quiet.",
    details: [
      "Daily self-care and baby-care schedule, one-tap feed logging, mood check-ins with an “I need help now” button",
      "Map of nearby clinics and support (location never stored), crisis help that's never behind a login",
      "Care-worker caseload sorted by urgency: flags like stopped logging, low mood, due soon, computed in SQL",
      "All access control enforced with Postgres row-level security",
    ],
    stack: ["Next.js 16", "Supabase", "Postgres RLS", "Realtime", "Leaflet"],
    tags: ["Health", "Tools", "Impact"],
    status: "Building",
    color: "rose",
    // repo: "https://github.com/nyankiir/go-mama", // ✏️ uncomment once the repo is public
    demo: "", // ✏️ your Vercel URL once it's deployed
    page: "/go-mama",
  },
  {
    slug: "refutech",
    name: "RefuTECH Academy",
    emoji: "🎓",
    blurb: "I'm a cofounder of RefuTECH Academy, where we're working to expand access to technical education and opportunities for refugee youth.",
    details: [
      "✏️ Add what RefuTECH does: programs, who you've taught, partners, what's next",
    ],
    stack: ["Education", "Access", "Community"],
    tags: ["Impact"],
    status: "Cofounder",
    color: "butter",
    // ✏️ website: "https://…",
  },
  {
    slug: "substitute-doctor",
    name: "substitute-doctor",
    emoji: "🩺",
    blurb: "A maternal-health assistant model for go-mama: triage moms' messages, answer routine questions from trusted sources, and escalate danger signs to a human.",
    details: [
      "An 8-phase plan from data pipeline and baselines to a tiny GPT trained from scratch, a LoRA fine-tune, and a safety-first triage agent",
      "Built as a learning project: every phase documents what we did and why",
    ],
    stack: ["Python", "PyTorch", "LoRA", "Evaluation"],
    tags: ["Health", "AI / ML"],
    status: "Learning",
    color: "lavender",
  },
  {
    slug: "biorag",
    name: "biorag",
    emoji: "🔬",
    blurb: "Retrieval-augmented QA over biomedical literature where every sentence is checked against the source it cites.",
    details: [
      "Hybrid lexical + dense retrieval",
      "Per-answer verification: citations must resolve, content words and every number must appear in the evidence",
      "An eval harness that separates retrieval failures from generation failures, runs in CI with no API key",
    ],
    stack: ["Python", "RAG", "BM25 + dense", "CI"],
    tags: ["AI / ML", "Health"],
    status: "Shipped",
    color: "mint",
    repo: "https://github.com/nyankiir/biorag",
  },
  {
    slug: "neurodecode",
    name: "neurodecode",
    emoji: "🧠",
    blurb: "Reproducible EEG motor-imagery decoding: is this person imagining moving their left hand or their right?",
    details: [
      "CSP, filter-bank CSP, Riemannian tangent space and EEGNet, implemented from the linear algebra up",
      "Within-subject vs. leave-one-subject-out evaluation, with statistical comparison",
      "Simulated data in CI; PhysioNet's 109-subject dataset locally",
    ],
    stack: ["Python", "NumPy", "PyTorch", "Signal processing"],
    tags: ["AI / ML", "Health"],
    status: "Shipped",
    color: "sky",
    repo: "https://github.com/nyankiir/neurodecode",
  },
  {
    slug: "forgeq",
    name: "forgeq",
    emoji: "⚙️",
    blurb: "A durable job queue that behaves correctly when workers die. One SQLite file, no broker to run.",
    details: [
      "Leases with visibility timeouts, so a crashed worker's job comes back on its own",
      "Exponential backoff with full jitter, a dead-letter queue, idempotency keys",
      "HTTP API, worker SDK and CLI",
    ],
    stack: ["Python", "SQLite", "HTTP", "Docker"],
    tags: ["Systems"],
    status: "Shipped",
    color: "lavender",
    repo: "https://github.com/nyankiir/forgeq",
  },
  {
    slug: "jars",
    name: "Jars",
    emoji: "🫙",
    blurb: "My personal planner: every task is a jar that fills as I make progress, with my calendar and meeting links alongside.",
    details: [
      "Alerts when a deadline is two days out and the jar is still empty, or when I haven't looked at something in a while",
      "Reads Google Calendar, finds the Zoom/Meet link, and nudges me before meetings",
    ],
    stack: ["Next.js", "Supabase", "Google Calendar API"],
    tags: ["Tools"],
    status: "Building",
    color: "peach",
  },
];

// The "Now" section: what's on your plate. Each one is drawn as a jar.
// ✏️ Update these whenever things change; `progress` is 0–100.
export const now = [
  { title: "Launching go-mama", note: "Deploying to Vercel and looking for partners", progress: 70, color: "rose" },
  { title: "substitute-doctor", note: "Phase 1 of 8: building the data pipeline", progress: 15, color: "lavender" },
  { title: "Technical interview prep", note: "Graphs, DP, and mock interviews", progress: 40, color: "sky" },
  { title: "Jars", note: "Next up: importing assignments from Canvas", progress: 60, color: "peach" },
] as const;

// Drag-able stickers in the "Things I'm into" section.
// ✏️ Add your non-tech interests too: music, sports, food, books…
export const interests = [
  { label: "Women's healthcare access", emoji: "🌍" },
  { label: "Healthtech", emoji: "🩺" },
  { label: "Social impact", emoji: "💛" },
  { label: "Tech education for refugee youth", emoji: "🎓" },
  { label: "Neuroscience", emoji: "🧬" },
  { label: "ML you can verify", emoji: "✅" },
  { label: "Brain–computer interfaces", emoji: "🧠" },
  { label: "Reliable systems", emoji: "🛠️" },
  { label: "Building for access", emoji: "🤝" },
  { label: "Learning in public", emoji: "📓" },
  { label: "Open source", emoji: "💚" },
];
