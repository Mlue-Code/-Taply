import { IconPlus } from "@tabler/icons-react";
import WorkspaceProjectCard from "@/components/workspace/WorkspaceProjectCard";
import type { WorkspaceProject } from "@/hooks/useWorkspaceProjects";

type WorkspaceProjectsProps = {
  onDeleteProject: (project: WorkspaceProject) => void;
  onNewProjectClick: () => void;
  onProjectClick: (project: WorkspaceProject) => void;
  projects: WorkspaceProject[];
};

export default function WorkspaceProjects({
  onDeleteProject,
  onNewProjectClick,
  onProjectClick,
  projects,
}: WorkspaceProjectsProps) {
  return (
    <section className="mt-[72px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[20px] font-semibold text-[#0f0f16]">Projects</h2>

        <button
          type="button"
          onClick={onNewProjectClick}
          className="inline-flex h-[48px] items-center gap-2 rounded-[11px] bg-[linear-gradient(180deg,#7a2bf8_0%,#6d20f5_100%)] px-[22px] text-[14px] font-semibold text-white"
        >
          <IconPlus size={16} stroke={2} />
          <span className="text-white">New Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="mt-[18px] rounded-[13px] border-[2px] border-dashed border-[#7c43ff]/90 bg-[linear-gradient(180deg,rgba(250,248,255,0.98),rgba(248,244,255,0.98))]">
          <div className="flex min-h-[302px] flex-col items-center justify-center rounded-[11px] text-center">
            <h3 className="m-0 text-[16px] font-medium text-[#121212]">No projects yet</h3>
            <p className="mt-2.5 max-w-[290px] text-[11px] text-[#818181]">
              Create your first project to start collecting feedback
            </p>
            <button
              type="button"
              onClick={onNewProjectClick}
              className="mt-[27px] inline-flex h-[44px] items-center rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] px-[22px] text-[14px] font-semibold text-white"
            >
              <span className="text-white">New Project</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-[18px]">
          <div className="mb-4 text-[14px] text-[#6d6880]">
            {projects.length} project{projects.length === 1 ? "" : "s"} created
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <WorkspaceProjectCard
                key={project.id}
                project={project}
                onClick={onProjectClick}
                onDelete={onDeleteProject}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
