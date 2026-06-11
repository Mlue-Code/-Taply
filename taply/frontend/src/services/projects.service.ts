import type { Project } from "@/types/api.types";

const projects: Project[] = [
  {
    id: "project_1",
    name: "Landing page refresh",
    description: "Redesign the public landing page for a cleaner conversion flow.",
    status: "In review",
    designCount: 4,
    updatedAt: "2 hours ago",
    shareableId: "share_abc123",
  },
  {
    id: "project_2",
    name: "Mobile onboarding",
    description: "Validate the onboarding experience with product and design.",
    status: "Draft",
    designCount: 2,
    updatedAt: "Yesterday",
    shareableId: "share_def456",
  },
  {
    id: "project_3",
    name: "Client dashboard",
    description: "Collect feedback on dashboard layouts and reporting widgets.",
    status: "Approved",
    designCount: 5,
    updatedAt: "3 days ago",
    shareableId: "share_xyz789",
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  return projects.find((project) => project.id === id) ?? null;
}
