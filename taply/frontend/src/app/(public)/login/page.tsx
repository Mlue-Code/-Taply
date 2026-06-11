import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
      <section className="w-full rounded-[2rem] border border-white/10 bg-surface p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold text-white">Sign in</h1>
          <p className="text-sm leading-6 text-slate-300">
            Access your projects, reviews, and design feedback.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-slate-200">Email</span>
            <input
              type="email"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="you@company.com"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-200">Password</span>
            <input
              type="password"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-300">
          New to Taply?{" "}
          <Link href="/register" className="text-cyan-200 hover:text-cyan-100">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
