import { ProjectCard } from "@/components/projects/ProjectCard";
import { getProjects } from "@/services/projects.service";

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <main className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-surface p-6 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              Your active projects
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Browse current work, launch new reviews, and keep feedback
              organized in one place.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              12 projects
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              48 comments
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              6 reviews
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
}
