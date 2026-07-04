import { IconTrash } from "@tabler/icons-react";
import type { WorkspaceProject } from "@/hooks/useWorkspaceProjects";

type WorkspaceProjectCardProps = {
  onDelete: (project: WorkspaceProject) => void;
  project: WorkspaceProject;
  onClick: (project: WorkspaceProject) => void;
};

export default function WorkspaceProjectCard({ project, onClick, onDelete }: WorkspaceProjectCardProps) {
  return (
    <div
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(project);
        }
      }}
      className="group relative flex min-h-[148px] flex-col justify-between rounded-[13px] border border-[#ece6f7] bg-white p-4 text-left shadow-[0_12px_28px_rgba(26,15,54,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(26,15,54,0.12)]"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(project);
        }}
        aria-label={`Delete ${project.name}`}
        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1f1] text-[#e04b4b] transition hover:bg-[#ffe2e2]"
      >
        <IconTrash size={14} stroke={2} />
      </button>

      <div>
        <h3 className="truncate text-[16px] font-semibold text-[#121212]">{project.name}</h3>
        <p className="mt-1 line-clamp-2 text-[12px] text-[#6f6b78]">
          {project.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 text-[11px] text-[#8a8494]">
        <span>Created {project.createdAt}</span>
        <span className="font-medium text-[#6f2cf6] transition group-hover:translate-x-0.5">View</span>
      </div>
    </div>
  );
}
