"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { IconPlus } from "@tabler/icons-react";
import Navbar from "@/components/layout/Navbar";
import AssetIcon from "@/components/shared/AssetIcon";
import type { Design, Feedback, GetDesignResponse } from "@/types/taply";
import cursorIcon from "../../public/Icon-assets/cursor.svg";
import arrowDownIcon from "../../public/Icon-assets/arrow-down.svg";
import searchZoomInIcon from "../../public/Icon-assets/search-zoom-in.svg";
import locationIcon from "../../public/Icon-assets/location.svg";
import magicpenIcon from "../../public/Icon-assets/magicpen.svg";
import messageAdd22Icon from "../../public/Icon-assets/message-add22.svg";

type ClientReviewViewProps = {
  shareableId: string;
  sessionName?: string;
};

type DraftFeedback = {
  x: number;
  y: number;
  comment: string;
};

function ToolButton({
  icon,
  active,
  onClick,
  label,
  showChevron,
}: {
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
  label: string;
  showChevron?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-[56px] items-center justify-center gap-1 rounded-[14px] px-4 transition ${
        active ? "bg-[#efe7ff] text-[#6f2cf6]" : "text-[#6f2cf6] hover:bg-[#f3edff]"
      }`}
      aria-label={label}
    >
      {icon}
      {showChevron ? <AssetIcon src={arrowDownIcon} className="h-[14px] w-[14px]" /> : null}
    </button>
  );
}

export default function ClientReviewView({ shareableId, sessionName }: ClientReviewViewProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [design, setDesign] = useState<Design | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionTitle, setSessionTitle] = useState(sessionName || "Session Name");
  const [activeTool, setActiveTool] = useState<"cursor" | "add" | "pin" | "pen" | "comment">("cursor");
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState<DraftFeedback>({ x: 0.5, y: 0.5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    const loadDesign = async () => {
      try {
        const response = await fetch(`/api/designs/${encodeURIComponent(shareableId)}`);
        const result = (await response.json()) as GetDesignResponse & { message?: string };

        if (!response.ok) {
          throw new Error(result.message || "Failed to load design");
        }

        if (!active) {
          return;
        }

        setDesign(result.design);
        setFeedback(result.feedback);
        if (sessionName) {
          setSessionTitle(sessionName);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Design not found.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadDesign();

    return () => {
      active = false;
    };
  }, [sessionName, shareableId]);

  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setDraft((current) => ({ ...current, x, y }));
    setComposerOpen(true);
  };

  const handleSubmit = async () => {
    if (!design || !draft.comment.trim() || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designId: design.id,
          comment: draft.comment.trim(),
          x: draft.x,
          y: draft.y,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Failed to submit feedback");
      }

      setFeedback((current) => [
        {
          id: result.id,
          comment: result.comment,
          x: result.x,
          y: result.y,
          createdAt: result.createdAt,
        },
        ...current,
      ]);
      setDraft((current) => ({ ...current, comment: "" }));
      setComposerOpen(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTopSubmit = () => {
    if (composerOpen && draft.comment.trim()) {
      void handleSubmit();
      return;
    }

    setComposerOpen(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbfbff]">
        <Navbar variant="home" actionLabel="Submit" actionOnClick={handleTopSubmit} actionIcon={null} />
        <div className="mx-auto flex min-h-[60vh] max-w-[1240px] items-center justify-center px-4">
          <p className="text-[15px] text-[#6f6b78]">Loading review...</p>
        </div>
      </main>
    );
  }

  if (error || !design) {
    return (
      <main className="min-h-screen bg-[#fbfbff]">
        <Navbar variant="home" actionLabel="Submit" actionOnClick={handleTopSubmit} actionIcon={null} />
        <div className="mx-auto flex min-h-[60vh] max-w-[1240px] items-center justify-center px-4">
          <p className="text-[15px] text-[#d92d20]">{error || "Design not found."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfbff] text-[#1c1340]">
      <Navbar variant="home" actionLabel="Submit" actionOnClick={handleTopSubmit} actionIcon={null} />

      <div className="mx-auto w-full max-w-[1110px] px-4 pt-8 pb-20 xl:px-0">
        <div className="relative mx-auto w-full max-w-[1020px]">
          <div className="relative overflow-hidden rounded-[14px] bg-white shadow-[0_18px_40px_rgba(24,18,47,0.1)]">
            <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white px-5 py-3 text-[15px] font-medium text-[#13121a] shadow-[0_8px_24px_rgba(24,18,47,0.12)]">
              <span className="inline-flex items-center gap-2">
                <IconPlus size={16} stroke={2.4} className="text-[#6f2cf6]" />
                {sessionTitle}
              </span>
            </div>

            <div className="absolute right-5 top-10 z-10 rounded-[14px] bg-[#f5f2ff] px-5 py-4 shadow-[0_12px_26px_rgba(24,18,47,0.12)]">
              <div className="flex items-center gap-10 text-[#6f2cf6]">
                <div className="inline-flex items-center gap-1.5 text-[18px] font-medium">
                  50%
                  <AssetIcon src={arrowDownIcon} className="h-[14px] w-[14px]" />
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <span className="h-3 w-3 rounded-[4px] bg-[#6f2cf6]" />
                  <span className="h-3 w-3 rounded-[4px] bg-[#b787ff]" />
                  <span className="h-3 w-3 rounded-[4px] bg-[#b787ff]" />
                  <span className="h-3 w-3 rounded-[4px] bg-[#6f2cf6]" />
                </div>
              </div>
            </div>

            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={design.imageUrl}
                alt={design.shareableId}
                className="h-[792px] w-full bg-white object-cover"
                onClick={handleImageClick}
              />

              {feedback.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-[#6f2cf6] text-[12px] font-semibold text-white shadow-[0_10px_18px_rgba(111,44,246,0.28)]"
                  style={{
                    left: `${item.x * 100}%`,
                    top: `${item.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={item.comment}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-[14px] bg-[#f2ebff] px-5 py-4 shadow-[0_12px_24px_rgba(24,18,47,0.14)]">
              <ToolButton
                label="Cursor"
                icon={<AssetIcon src={cursorIcon} className="h-[34px] w-[34px]" />}
                active={activeTool === "cursor"}
                onClick={() => setActiveTool("cursor")}
                showChevron
              />
              <ToolButton
                label="Add"
                icon={<AssetIcon src={messageAdd22Icon} className="h-[34px] w-[34px]" />}
                active={activeTool === "add"}
                onClick={() => setActiveTool("add")}
              />
              <ToolButton
                label="Pin"
                icon={<AssetIcon src={locationIcon} className="h-[34px] w-[34px]" />}
                active={activeTool === "pin"}
                onClick={() => setActiveTool("pin")}
              />
              <ToolButton
                label="Pen"
                icon={<AssetIcon src={magicpenIcon} className="h-[34px] w-[34px]" />}
                active={activeTool === "pen"}
                onClick={() => setActiveTool("pen")}
                showChevron
              />
              <ToolButton
                label="Comment"
                icon={<AssetIcon src={searchZoomInIcon} className="h-[34px] w-[34px]" />}
                active={activeTool === "comment"}
                onClick={() => setActiveTool("comment")}
                showChevron
              />
            </div>
          </div>
        </div>
      </div>

      {composerOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(45,43,58,0.45)] px-4"
          role="presentation"
          onClick={() => setComposerOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Leave feedback"
            className="w-full max-w-[520px] rounded-[16px] bg-white p-6 shadow-[0_20px_70px_rgba(14,8,32,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[22px] font-semibold text-[#121212]">Leave feedback</h3>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="text-[14px] text-[#6f6b78]"
              >
                Close
              </button>
            </div>

            <p className="mt-2 text-[12px] text-[#818181]">
              {Math.round(draft.x * 100)}% x, {Math.round(draft.y * 100)}% y
            </p>

            <textarea
              value={draft.comment}
              onChange={(event) => setDraft((current) => ({ ...current, comment: event.target.value }))}
              rows={5}
              className="mt-4 w-full resize-none rounded-[13px] border border-[#d8c5ff] bg-[#f8f4ff] px-4 py-3 text-[15px] text-[#1a1722] outline-none placeholder:text-[#9a94a7] focus:border-[#b997ff]"
              placeholder="Write your feedback..."
              maxLength={500}
            />

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="h-[42px] rounded-[11px] border border-[#e3dfe8] bg-white px-5 text-[14px] font-medium text-[#6f6b78]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!draft.comment.trim() || submitting}
                className="h-[42px] rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] px-5 text-[14px] font-semibold text-white shadow-[0_14px_24px_rgba(112,33,248,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
