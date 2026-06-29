"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { IconChevronLeft, IconCopy, IconPlus } from "@tabler/icons-react";
import Navbar from "@/components/layout/Navbar";
import AssetIcon from "@/components/shared/AssetIcon";
import type { DesignItem } from "@/components/workspace/ReviewProjectView";
import messages3Icon from "../../public/Icon-assets/messages-3.svg";
import likeIcon from "../../public/Icon-assets/like.svg";
import dangerIcon from "../../public/Icon-assets/danger.svg";
import tickCircleIcon from "../../public/Icon-assets/tick-circle.svg";
import infoCircleIcon from "../../public/Icon-assets/info-circle.svg";

type ReviewSessionData = {
  shareableId: string;
  sessionName: string;
  projectName: string;
  projectDescription: string;
  selectedDesignIds: string[];
  designs: DesignItem[];
};

type ReviewSessionViewProps = {
  shareableId: string;
};

function StatCard({
  title,
  value,
  icon,
  tone,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  tone: string;
}) {
  return (
    <div className={`flex h-[130px] min-h-[130px] w-full flex-col justify-between rounded-[12px] px-5 py-4 ${tone}`}>
      <div className="text-[17px] font-medium text-[#6a6a6a]">{title}</div>
      <div className="flex items-start justify-between gap-3">
        <div className="text-[46px] font-medium leading-none text-[#6c25f5]">{value}</div>
        <div className="-mt-4 text-[#6c25f5]">{icon}</div>
      </div>
    </div>
  );
}

export default function ReviewSessionView({ shareableId }: ReviewSessionViewProps) {
  const [session] = useState<ReviewSessionData | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.sessionStorage.getItem(`taply-review-session:${shareableId}`);
    if (stored) {
      try {
        return JSON.parse(stored) as ReviewSessionData;
      } catch {
        // Fall through to fallback rendering.
      }
    }

    return {
      shareableId,
      sessionName: "Client Review - round 1",
      projectName: "Project name",
      projectDescription: "",
      selectedDesignIds: [],
      designs: [],
    };
  });
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `/review/${shareableId}?view=session`;
    }

    return `${window.location.origin}/review/${shareableId}?view=session`;
  }, [shareableId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Ignore clipboard failures.
    }
  };

  if (!session) {
    return null;
  }

  const feedbackStats = [
    {
      title: "Total Feedback",
      value: "0",
      icon: <AssetIcon src={messages3Icon} className="h-[42px] w-[42px]" />,
      tone: "bg-[#f5f0ff]",
    },
    {
      title: "Positive",
      value: "0",
      icon: <AssetIcon src={likeIcon} className="h-[42px] w-[42px]" />,
      tone: "bg-[#dbe7ff]",
    },
    {
      title: "Needs Change",
      value: "0",
      icon: <AssetIcon src={dangerIcon} className="h-[42px] w-[42px]" />,
      tone: "bg-[#f8dfe4]",
    },
    {
      title: "Resolved",
      value: "0",
      icon: <AssetIcon src={tickCircleIcon} className="h-[42px] w-[42px]" />,
      tone: "bg-[#d9eee7]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fbfbff] text-[#13121a]">
      <Navbar variant="home" actionLabel="+ New Session" actionHref={`/review/${shareableId}`} actionIcon={<IconPlus size={12} stroke={2.4} />} />

      <section className="border-b border-[#e9e5f0] bg-white">
        <div className="mx-auto flex h-[76px] w-full max-w-[1240px] items-center justify-between px-4 xl:px-0">
          <div className="flex items-center gap-4">
            <Link
              href={`/review/${shareableId}`}
              aria-label="Back"
              className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] text-[#111111]"
            >
              <IconChevronLeft size={34} stroke={1.8} />
            </Link>

            <div className="pt-[1px]">
              <h1 className="text-[27px] font-semibold leading-none text-[#111111]">
                {session.sessionName}
              </h1>
              <p className="mt-[4px] text-[14px] font-normal leading-none text-[#9a9a9a]">
                {session.projectName}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f9d8] px-4 py-2 text-[18px] font-medium text-[#90c500]">
            <span className="h-3 w-3 rounded-full bg-[#b9dd0b]" />
            active
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1240px] px-4 pb-[80px] pt-[41px] xl:px-0">
        <section className="rounded-[12px] bg-[#6f22f6] px-6 py-6 text-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[22px] font-medium">Share this review</h2>
              <p className="mt-2 text-[14px] text-white/90">Send this link to clients to collect feedback</p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-[40px] items-center gap-2 rounded-[12px] bg-white px-4 text-[14px] font-medium text-[#6f22f6] transition hover:opacity-95"
            >
              <IconCopy size={18} stroke={1.8} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-5 rounded-[12px] bg-[#b787ff] px-6 py-4 text-[14px] text-white/90">
            {shareUrl}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))]">
          {feedbackStats.map((item) => (
            <StatCard key={item.title} title={item.title} value={item.value} icon={item.icon} tone={item.tone} />
          ))}
        </section>

        <section className="mt-14">
          <h2 className="text-[22px] font-medium text-[#111111]">Feedback Details</h2>

          <div className="mt-5 flex min-h-[335px] flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#dccfff] bg-[#faf7ff] text-center">
            <AssetIcon src={infoCircleIcon} className="h-[52px] w-[52px]" />
            <h3 className="mt-5 text-[18px] font-medium text-[#111111]">No feedback yet</h3>
            <p className="mt-2 text-[12px] text-[#777]">Share the review link to start collecting feedback</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[22px] font-medium text-[#111111]">Insights</h2>

          <div className="mt-5 rounded-[14px] border-2 border-[#d7c4ff] bg-[#faf7ff] px-8 py-6">
            <h3 className="text-[18px] font-semibold text-[#6f22f6]">Top Issues</h3>
            <p className="mt-4 text-[20px] font-normal text-[#8c8c8c]">No categorized feedback yet</p>
          </div>
        </section>
      </div>
    </main>
  );
}
