import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/services/projects.service";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-surface p-6 shadow-xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
          Project
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          {project.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          {project.description}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Latest design</h2>
          <div className="mt-4 h-80 rounded-3xl border border-dashed border-white/15 bg-slate-950/60" />
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Actions</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>Invite teammates to review this project.</p>
            <p>Generate a shareable review link.</p>
            <p>Track open feedback items and resolutions.</p>
          </div>
          <Link
            href={`/review/${project.shareableId}`}
            className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            Open review
          </Link>
        </div>
      </section>
    </main>
  );
}
