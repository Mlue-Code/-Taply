import { useMemo } from "react";
import { usePersistentState } from "@/hooks/usePersistentState";
import {
  removeStoredReviewSessionsByProject,
} from "@/lib/review-session-storage";

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

  const removeProject = (projectId: string) => {
    const projectToRemove = projects.find((project) => project.id === projectId);

    setValue((current) => current.filter((project) => project.id !== projectId));

    if (!projectToRemove || typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(`taply-project-designs:${projectToRemove.slug}`);
    removeStoredReviewSessionsByProject(projectToRemove.name, projectToRemove.description);
  };

  const removeProjectBySlug = (slug: string) => {
    const projectToRemove = projects.find((project) => project.slug === slug);

    setValue((current) => current.filter((project) => project.slug !== slug));

    if (!projectToRemove || typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(`taply-project-designs:${projectToRemove.slug}`);
    removeStoredReviewSessionsByProject(projectToRemove.name, projectToRemove.description);
  };

  return {
    projects,
    createProject,
    removeProject,
    removeProjectBySlug,
    setProjects: setValue,
    totalProjects: projects.length,
    workspaceStats: stats,
  };
}
