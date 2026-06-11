import Link from "next/link";

const highlights = [
  "Project-based feedback",
  "Shareable review links",
  "Design uploads and annotations",
];

export default function PublicHomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-10 lg:px-10">
      <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,18,32,.92),rgba(14,25,44,.72))] p-6 shadow-2xl shadow-sky-950/20 backdrop-blur md:grid-cols-[1.2fr_.8fr] md:p-10">
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            Taply review workspace
          </div>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Keep design feedback in one calm, shareable place.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              Taply is the lightweight review flow for projects, designs, and
              client feedback. Upload a design, pin notes on top, and send a
              link anyone can review without friction.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-full bg-cyan-300 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-200"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-slate-300">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
            <span>Preview</span>
            <span className="font-mono text-cyan-200">shareableId_82f1</span>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(125,211,252,.15),rgba(255,255,255,.03))] p-5">
            <div className="h-56 rounded-2xl border border-dashed border-cyan-200/30 bg-slate-900/70" />
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded-full bg-white/70" />
              <div className="h-3 w-1/2 rounded-full bg-white/25" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                Projects
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                Reviews
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                Feedback
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
