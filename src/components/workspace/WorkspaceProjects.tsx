import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import folderOpenIcon from "../../public/Icon-assets/folder-open.svg";

type WorkspaceProjectsProps = {
  onNewProjectClick: () => void;
};

export default function WorkspaceProjects({ onNewProjectClick }: WorkspaceProjectsProps) {
  return (
    <section className="mt-[72px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[20px] font-medium text-[#0f0f16]">Projects</h2>

        <button
          type="button"
          onClick={onNewProjectClick}
          className="inline-flex h-[48px] items-center gap-2 rounded-[11px] bg-[linear-gradient(180deg,#7a2bf8_0%,#6d20f5_100%)] px-[22px] text-[14px] font-semibold text-white shadow-[0_14px_24px_rgba(112,33,248,0.22)]"
        >
          <IconPlus size={16} stroke={2} />
          <span>New Project</span>
        </button>
      </div>

      <div className="mt-[18px] rounded-[13px] border-[2px] border-dashed border-[#7c43ff]/90 bg-[linear-gradient(180deg,rgba(250,248,255,0.98),rgba(248,244,255,0.98))]">
        <div className="flex min-h-[302px] flex-col items-center justify-center rounded-[11px] text-center">
          <div className="mb-[10px] flex h-[58px] w-[58px] items-center justify-center rounded-[14px] text-[rgba(178,137,255,0.6)]">
            <Image src={folderOpenIcon} alt="Folder" width={60} height={60} />
          </div>
          <h3 className="m-0 text-[16px] font-medium text-[#121212]">No projects yet</h3>
          <p className="mt-2.5 max-w-[290px] text-[11px] text-[#818181]">
            Create your first project to start collecting feedback
          </p>
          <button
            type="button"
            onClick={onNewProjectClick}
            className="mt-[27px] inline-flex h-[44px] items-center rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] px-[22px] text-[14px] font-semibold text-white"
          >
            New Project
          </button>
        </div>
      </div>
    </section>
  );
}
