import { useMemo } from "react";
import { usePersistentState } from "@/hooks/usePersistentState";

export type WorkspaceProject = {
  id: string;
  name: string;
  description: string;
  slug: string;
  reviewUrl: string;
  createdAt: string;
};

const WORKSPACE_PROJECTS_STORAGE_KEY = "taply-workspace:projects";

function makeWorkspaceId() {
  return globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeProjectSlug(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled-project"
  );
}

export function useWorkspaceProjects() {
  const { setValue, value: projects } = usePersistentState<WorkspaceProject[]>(WORKSPACE_PROJECTS_STORAGE_KEY, []);

  const stats = useMemo(
    () => [
      {
        label: "Total Project",
        value: String(projects.length),
      },
    ],
    [projects.length],
  );

  const createProject = (projectName: string, projectDescription: string) => {
    const name = projectName.trim() || "Untitled Project";
    const description = projectDescription.trim();
    const slug = normalizeProjectSlug(name);
    const reviewUrl = `/review/${slug}?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`;

    const createdProject: WorkspaceProject = {
      id: makeWorkspaceId(),
      name,
      description,
      slug,
      reviewUrl,
      createdAt: new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    };

    setValue((current) => [createdProject, ...current]);

    return { createdProject, reviewUrl };
  };

  return {
    projects,
    createProject,
    setProjects: setValue,
    totalProjects: projects.length,
    workspaceStats: stats,
  };
}
