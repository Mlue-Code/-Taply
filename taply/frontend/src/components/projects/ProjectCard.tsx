import Link from "next/link";
import type { Project } from "@/types/api.types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-surface p-5 shadow-lg backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
            {project.status}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {project.name}
          </h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {project.designCount} designs
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {project.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">
          Updated {project.updatedAt}
        </span>
        <Link
          href={`/project/${project.id}`}
          className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
        >
          Open
        </Link>
      </div>
    </article>
  );
}
