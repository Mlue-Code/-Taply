import { IconPlus } from "@tabler/icons-react";
import Navbar from "@/components/layout/Navbar";
import AssetIcon from "@/components/shared/AssetIcon";
import ProjectHeaderBar from "@/components/workspace/ProjectHeaderBar";
import ProjectSection from "@/components/workspace/ProjectSection";
import ProjectStats from "@/components/workspace/ProjectStats";
import imageIcon from "../../../public/Icon-assets/image.svg";
import clipboardTextIcon from "../../../public/Icon-assets/clipboard-text.svg";
import directSendIcon from "../../../public/Icon-assets/direct-send.svg";
import sendIcon from "../../../public/Icon-assets/send.svg";
import messageRemoveIcon from "../../../public/Icon-assets/message-remove.svg";
import reviewSessionIcon from "../../../public/Icon-assets/review session.svg";

const stats = [
  {
    label: "Designs",
    value: "0",
    icon: imageIcon,
  },
  {
    label: "Review Sessions",
    value: "0",
    icon: clipboardTextIcon,
    iconClassName: "opacity-50 grayscale",
  },
  {
    label: "Unresolved Feedback",
    value: "0",
    icon: messageRemoveIcon,
  },
];

type ReviewShareablePageProps = {
  params: Promise<{ shareableId: string }>;
  searchParams: Promise<{
    name?: string | string[];
    description?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReviewShareablePage({
  searchParams,
}: ReviewShareablePageProps) {
  const params = await searchParams;
  const projectName = firstValue(params.name) || "Project Name";
  const projectDescription = firstValue(params.description) || "Descriptions...";

  return (
    <main className="min-h-screen bg-[#fbfbff] text-[#1c1340]">
      <Navbar variant="project" />
      <ProjectHeaderBar title={projectName} description={projectDescription} />

      <div className="mx-auto w-full max-w-[1110px] px-4 pt-[65px] pb-[120px] xl:px-0">
        <ProjectStats stats={stats} />

        <ProjectSection
          title="Designs"
          actionLabel="Upload Design"
          actionHref="/review/new"
          actionLeadingIcon={<AssetIcon src={sendIcon} className="h-[24px] w-[24px]" />}
          icon={directSendIcon}
          emptyTitle="No designs yet"
          description="Upload your first design to get started"
          buttonLabel="Drag or Upload you design here "
          actionClassName="inline-flex h-[48px] items-center gap-2 rounded-[11px] bg-[linear-gradient(180deg,#7a2bf8_0%,#6d20f5_100%)] px-[22px] text-[14px] font-semibold text-white shadow-[0_14px_24px_rgba(112,33,248,0.22)]"
          buttonClassName="mt-[27px] inline-flex h-[44px] items-center gap-2 rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] px-[22px] text-[14px] font-semibold text-white"
        />

        <ProjectSection
          className="mt-[72px]"
          title="Review Sessions"
          actionLabel="New Session"
          actionHref="/review/new"
          actionLeadingIcon={<IconPlus size={19} stroke={2} className="text-white" />}
          icon={reviewSessionIcon}
          emptyTitle="No review sessions"
          description="Upload designs first to create a review session"
          actionClassName="inline-flex h-[48px] items-center gap-2 rounded-[11px] bg-[linear-gradient(180deg,#b694ff_0%,#bb9bff_100%)] px-[22px] text-[14px] font-semibold text-white shadow-[0_14px_24px_rgba(178,140,255,0.18)]"
          showButton={false}
        />
      </div>
    </main>
  );
}
