'use client';

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import CreateProjectModal from "@/components/workspace/CreateProjectModal";
import WorkspaceProjects from "@/components/workspace/WorkspaceProjects";
import WorkspaceStats from "@/components/workspace/WorkspaceStats";
import { useWorkspaceProjects } from "@/hooks/useWorkspaceProjects";
import totaliIcon from "../../public/Icon-assets/folder.svg";
import activeIcon from "../../public/Icon-assets/grammerly.svg";
import totalFeedback from "../../public/Icon-assets/message-text.svg";

export default function WorkspacePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const { projects, createProject } = useWorkspaceProjects();

  const stats = useMemo(
    () => [
      {
        label: "Total Project",
        value: String(projects.length),
        icon: totaliIcon,
      },
      {
        label: "Active Sessions",
        value: "0",
        icon: activeIcon,
      },
      {
        label: "Total Feedback",
        value: "0",
        icon: totalFeedback,
      },
    ],
    [projects.length],
  );

  const handleCreateProject = () => {
    const { reviewUrl } = createProject(projectName, projectDescription);
    setIsModalOpen(false);
    router.push(reviewUrl);
  };

  return (
    <main className="min-h-screen bg-[#fbfbff] text-[#1c1340]">
      <Navbar variant="workspace" />

      <div className="mx-auto w-full max-w-[1110px] px-4 pt-[65px] pb-[56px] xl:px-0">
        <WorkspaceStats stats={stats} />
        <WorkspaceProjects
          projects={projects}
          onNewProjectClick={() => setIsModalOpen(true)}
          onProjectClick={(project) => router.push(project.reviewUrl)}
        />
      </div>

      <SiteFooter variant="workspace" />

      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={projectName}
        projectDescription={projectDescription}
        onProjectNameChange={setProjectName}
        onProjectDescriptionChange={setProjectDescription}
        onCreate={handleCreateProject}
      />
    </main>
  );
}
