import { useEffect, useMemo, useState } from "react";
import type { DesignItem } from "@/components/workspace/ReviewProjectView";
import type { GetDesignResponse } from "@/types/taply";

export type ReviewSessionData = {
  shareableId: string;
  sessionName: string;
  projectName: string;
  projectDescription: string;
  selectedDesignIds: string[];
  designs: DesignItem[];
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
      const storedSession =
        typeof window !== "undefined"
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
          sessionName: defaults.sessionName || "Client Review - round 1",
          projectName: defaults.projectName || "Project name",
          projectDescription: defaults.projectDescription || "",
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
