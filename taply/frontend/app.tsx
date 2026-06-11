import Link from "next/link";

export default function FrontendApp() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
          Frontend scaffold
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Taply frontend structure</h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          The `frontend/src` tree is now in place so the app can evolve into a
          separate Next.js frontend if you decide to mount it independently.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-cyan-300 px-4 py-2 font-medium text-slate-950"
          >
            Open app root
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/15 px-4 py-2 font-medium text-white"
          >
            Dashboard preview
          </Link>
        </div>
      </div>
    </main>
  );
}
