'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconPlus } from "@tabler/icons-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import totaliIcon from "../../public/Icon-assets/folder.svg";
import activeIcon from "../../public/Icon-assets/grammerly.svg";
import totalFeedback from "../../public/Icon-assets/message-text.svg";
import folderOpenIcon from "../../public/Icon-assets/folder-open.svg";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfbff] text-[#1c1340]">
      <Navbar variant="workspace" />

      <div className="mx-auto w-full max-w-[1230px] px-4 pt-[65px] xl:px-0">
        <section
          aria-label="Workspace stats"
          className="grid gap-6 xl:grid-cols-3 xl:gap-[56px] xl:px-[106px]"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex min-h-[146px] items-center justify-between rounded-[13px] border border-[rgba(112,33,248,0.055)] bg-[linear-gradient(180deg,rgba(122,83,255,0.05),rgba(122,83,255,0.03))] px-6 py-7"
            >
              <div>
                <p className="mb-[18px] text-[13px] font-medium text-[#6d6880]">
                  {stat.label}
                </p>
                <p className="text-[34px] font-normal leading-none text-[#727082]">
                  {stat.value}
                </p>
              </div>
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            </article>
          ))}
        </section>

        <section className="mt-[78px] xl:px-[106px]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[20px] font-medium text-[#0f0f16]">Projects</h2>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex h-[48px] items-center gap-2 rounded-[11px] bg-[linear-gradient(180deg,#7a2bf8_0%,#6d20f5_100%)] px-[22px] text-[14px] font-semibold text-white shadow-[0_14px_24px_rgba(112,33,248,0.22)]"
            >
              <IconPlus size={16} stroke={2} />
              <span>New Project</span>
            </button>
          </div>

          <div className="mt-[29px] flex min-h-[332px] flex-col items-center justify-center rounded-[13px] border-2 border-dashed border-[#7c43ff] bg-[linear-gradient(180deg,rgba(250,248,255,0.98),rgba(248,244,255,0.98))] text-center">
            <div className="mb-[10px] flex h-[58px] w-[58px] items-center justify-center rounded-[14px] text-[rgba(178,137,255,0.6)]">
              <Image src={folderOpenIcon} alt="Folder" width={60} height={60} />
            </div>
            <h3 className="m-0 text-[16px] font-medium text-[#121212]">No projects yet</h3>
            <p className="mt-2.5 max-w-[290px] text-[12px] text-[#818181]">
              Create your first project to start collecting feedback
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-[27px] inline-flex h-[44px] items-center rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] px-[22px] text-[14px] font-semibold text-white"
            >
              New Project
            </button>
          </div>
        </section>
      </div>

      <SiteFooter variant="workspace" />

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(45,43,58,0.46)] px-4"
          role="presentation"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-project-title"
            className="w-full max-w-[588px] overflow-hidden rounded-[14px] bg-white shadow-[0_20px_70px_rgba(14,8,32,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-[#e9e3f4] px-8 py-8">
              <h3 id="create-project-title" className="text-[31px] font-semibold leading-none text-[#121212]">
                Create Project
              </h3>
            </div>

            <div className="px-8 py-8">
              <label className="block">
                <span className="mb-2 block text-[16px] font-medium text-[#141414]">
                  Project Name
                </span>
                <input
                  type="text"
                  placeholder="Website Redesign"
                  className="h-[63px] w-full rounded-[13px] border border-[#d8c5ff] bg-[#f8f4ff] px-4 text-[15px] text-[#1a1722] outline-none placeholder:text-[#9a94a7] focus:border-[#b997ff]"
                />
              </label>

              <label className="mt-6 block">
                <span className="mb-2 block text-[16px] font-medium text-[#141414]">
                  Description
                </span>
                <textarea
                  rows={6}
                  placeholder="Describe your project..."
                  className="h-[163px] w-full resize-none rounded-[13px] border border-[#d8c5ff] bg-[#f8f4ff] px-4 py-4 text-[15px] text-[#1a1722] outline-none placeholder:text-[#9a94a7] focus:border-[#b997ff]"
                />
              </label>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-[49px] rounded-[11px] border border-[#e3dfe8] bg-white text-[21px] font-medium text-[#6f6b78] shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="h-[49px] rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] text-[21px] font-medium text-white shadow-[0_14px_24px_rgba(112,33,248,0.22)]"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
