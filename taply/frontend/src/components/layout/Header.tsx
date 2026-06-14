import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-surface/80 px-6 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">
            Taply
          </p>
          <h2 className="text-lg font-semibold text-white">Workspace</h2>
        </div>
        <nav className="flex items-center gap-3 text-sm text-slate-300">
          <Link
            href="/dashboard"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/5"
          >
            Dashboard
          </Link>
          <Link
            href="/"
            className="rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/15"
          >
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
