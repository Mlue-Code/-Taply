import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard?filter=projects", label: "Projects" },
  { href: "/dashboard?filter=reviews", label: "Reviews" },
];

export function Sidebar() {
  return (
    <aside className="border-r border-white/10 bg-[linear-gradient(180deg,rgba(12,18,31,.95),rgba(10,16,28,.7))] px-6 py-6">
      <div className="sticky top-6 space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">
            Navigation
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Taply</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Review projects, open designs, and collect client notes.
          </p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">
          Share a review link to gather feedback without extra logins.
        </div>
      </div>
    </aside>
  );
}
