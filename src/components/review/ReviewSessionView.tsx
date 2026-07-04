"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { IconChevronLeft, IconCopy, IconPlus } from "@tabler/icons-react";
import Navbar from "@/components/layout/Navbar";
import AssetIcon from "@/components/shared/AssetIcon";
import type { DesignItem } from "@/components/workspace/ReviewProjectView";
import type { GetDesignResponse } from "@/types/taply";
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
  sessionName?: string;
  projectName?: string;
  projectDescription?: string;
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

export default function ReviewSessionView({
  shareableId,
  sessionName,
  projectName,
  projectDescription,
}: ReviewSessionViewProps) {
  const [session, setSession] = useState<ReviewSessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const storedSession = typeof window !== "undefined"
        ? window.localStorage.getItem(`taply-review-session:${shareableId}`)
        : null;

      if (storedSession) {
        try {
          const parsed = JSON.parse(storedSession) as ReviewSessionData;
          if (active) {
            setSession(parsed);
            setLoading(false);
          }
          return;
        } catch {
          // fall through to backend fallback
        }
      }

      try {
        const response = await fetch(`/api/designs/${encodeURIComponent(shareableId)}`);
        const result = (await response.json()) as GetDesignResponse & { message?: string };

        if (!response.ok) {
          throw new Error(result.message || "Failed to load design");
        }

        if (!active) {
          return;
        }

        setSession({
          shareableId,
          sessionName: sessionName || "Client Review - round 1",
          projectName: projectName || "Project name",
          projectDescription: projectDescription || "",
          selectedDesignIds: [result.design.id],
          designs: [
            {
              id: result.design.id,
              shareableId: result.design.shareableId,
              name: result.design.shareableId,
              uploadedAt: result.design.createdAt,
              previewUrl: result.design.imageUrl,
              imageUrl: result.design.imageUrl,
            },
          ],
        });
      } catch {
        if (active) {
          setSession(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadSession();

    return () => {
      active = false;
    };
  }, [projectDescription, projectName, sessionName, shareableId]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `/review/${shareableId}?view=client`;
    }

    const title = session?.sessionName ?? sessionName ?? "Session Name";
    return `${window.location.origin}/review/${shareableId}?view=client&sessionName=${encodeURIComponent(title)}`;
  }, [session?.sessionName, sessionName, shareableId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Ignore clipboard failures.
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbfbff]">
        <Navbar
          variant="home"
          actionLabel="New Session"
          actionHref={`/review/${shareableId}`}
          actionIcon={<IconPlus size={12} stroke={2.4} />}
        />
        <div className="mx-auto flex min-h-[60vh] max-w-[1240px] items-center justify-center px-4">
          <p className="text-[15px] text-[#6f6b78]">Loading review...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#fbfbff]">
        <Navbar
          variant="home"
          actionLabel="New Session"
          actionHref={`/review/${shareableId}`}
          actionIcon={<IconPlus size={12} stroke={2.4} />}
        />
        <div className="mx-auto flex min-h-[60vh] max-w-[1240px] items-center justify-center px-4">
          <p className="text-[15px] text-[#d92d20]">Design not found.</p>
        </div>
      </main>
    );
  }

  const design = session.designs[0] ?? null;

  if (!design) {
    return (
      <main className="min-h-screen bg-[#fbfbff]">
        <Navbar
          variant="home"
          actionLabel="New Session"
          actionHref={`/review/${shareableId}`}
          actionIcon={<IconPlus size={12} stroke={2.4} />}
        />
        <div className="mx-auto flex min-h-[60vh] max-w-[1240px] items-center justify-center px-4">
          <p className="text-[15px] text-[#d92d20]">Design not found.</p>
        </div>
      </main>
    );
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
      <Navbar
        variant="home"
        actionLabel="New Session"
        actionHref={`/review/${shareableId}`}
        actionIcon={<IconPlus size={12} stroke={2.4} />}
      />

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
          <h2 className="text-[22px] font-medium text-[#111111]">Selected Designs</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,392px)]">
            {session.designs.map((item) => (
              <article
                key={item.id}
                className="flex h-[304px] w-full flex-col overflow-hidden rounded-[13px] border border-[#ece6f7] bg-white shadow-[0_16px_34px_rgba(26,15,54,0.12)]"
              >
                <div className="relative h-[232px] overflow-hidden bg-[#f7f2ff]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.previewUrl} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="px-4 py-4">
                  <h3 className="truncate text-[16px] font-semibold text-[#121212]">{item.name}</h3>
                  <p className="mt-1 text-[12px] text-[#8a8494]">Uploaded {item.uploadedAt}</p>
                </div>
              </article>
            ))}
          </div>
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
