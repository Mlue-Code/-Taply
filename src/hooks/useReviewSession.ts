import { useEffect, useMemo, useState } from "react";
import type { Feedback, GetDesignResponse } from "@/types/taply";
import type { StoredReviewDesign } from "@/lib/review-session-storage";
import { readStoredReviewSession } from "@/lib/review-session-storage";

export type ReviewSessionData = {
  shareableId: string;
  sessionName: string;
  projectName: string;
  projectDescription: string;
  selectedDesignIds: string[];
  designs: StoredReviewDesign[];
  feedback: Feedback[];
};

type ReviewSessionDefaults = {
  sessionName?: string;
  projectName?: string;
  projectDescription?: string;
};

export function useReviewSession(shareableId: string, defaults: ReviewSessionDefaults = {}) {
  const [session, setSession] = useState<ReviewSessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const storedSession = readStoredReviewSession(shareableId);

      try {
        const response = await fetch(`/api/designs/${encodeURIComponent(shareableId)}`, {
          cache: "no-store",
        });
        const result = (await response.json()) as GetDesignResponse & { message?: string };

        if (!response.ok) {
          throw new Error(result.message || "Failed to load design");
        }

        if (!active) {
          return;
        }

        const fallbackSession: ReviewSessionData = {
          shareableId,
          sessionName: defaults.sessionName || storedSession?.sessionName || "Client Review - round 1",
          projectName: defaults.projectName || storedSession?.projectName || "Project name",
          projectDescription: defaults.projectDescription || storedSession?.projectDescription || "",
          selectedDesignIds: storedSession?.selectedDesignIds || [result.design.id],
          designs:
            storedSession?.designs?.length
              ? storedSession.designs
              : [
                  {
                    id: result.design.id,
                    shareableId: result.design.shareableId,
                    name: result.design.name,
                    uploadedAt: result.design.createdAt,
                    previewUrl: result.design.imageUrl,
                    imageUrl: result.design.imageUrl,
                  },
          ],
          feedback: result.feedback,
        };

        if (active) {
          setSession(fallbackSession);
        }
      } catch {
        if (active) {
          setSession(storedSession);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadSession();

    const refreshInterval = window.setInterval(() => {
      void loadSession();
    }, 4000);

    return () => {
      active = false;
      window.clearInterval(refreshInterval);
    };
  }, [defaults.projectDescription, defaults.projectName, defaults.sessionName, shareableId]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `/review/${shareableId}?view=client`;
    }

    const title = session?.sessionName ?? defaults.sessionName ?? "Session Name";
    return `${window.location.origin}/review/${shareableId}?view=client&sessionName=${encodeURIComponent(title)}`;
  }, [defaults.sessionName, session?.sessionName, shareableId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Ignore clipboard failures.
    }
  };

  return {
    copied,
    handleCopy,
    loading,
    session,
    shareUrl,
  };
}
