'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import CreateProjectModal from "@/components/workspace/CreateProjectModal";
import WorkspaceProjects from "@/components/workspace/WorkspaceProjects";
import WorkspaceStats from "@/components/workspace/WorkspaceStats";
import totaliIcon from "../../public/Icon-assets/folder.svg";
import activeIcon from "../../public/Icon-assets/grammerly.svg";
import totalFeedback from "../../public/Icon-assets/message-text.svg";

const stats = [
  {
    label: "Total Project",
    value: "0",
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
];

export default function WorkspacePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = () => {
    const name = projectName.trim() || "Untitled Project";
    const slug = name
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const projectSlug = slug || "untitled-project";
    const url = `/review/${projectSlug}?name=${encodeURIComponent(name)}&description=${encodeURIComponent(projectDescription.trim())}`;

    setIsModalOpen(false);
    router.push(url);
  };

  return (
    <main className="min-h-screen bg-[#fbfbff] text-[#1c1340]">
      <Navbar variant="workspace" />

      <div className="mx-auto w-full max-w-[1110px] px-4 pt-[65px] pb-[128px] xl:px-0">
        <WorkspaceStats stats={stats} />
        <WorkspaceProjects onNewProjectClick={() => setIsModalOpen(true)} />
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
