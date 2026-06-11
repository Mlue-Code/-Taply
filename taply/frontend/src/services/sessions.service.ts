import type { ReviewSession } from "@/types/api.types";

const sessions: ReviewSession[] = [
  {
    id: "session_1",
    shareableId: "share_abc123",
    title: "Landing page refresh review",
    description: "Review the latest hero, CTA, and layout direction.",
    pins: [
      { id: "pin_1", x: 28, y: 34, label: "Header" },
      { id: "pin_2", x: 66, y: 58, label: "CTA" },
      { id: "pin_3", x: 42, y: 72, label: "Spacing" },
    ],
  },
];

export async function getReviewSessionByShareableId(
  shareableId: string,
): Promise<ReviewSession> {
  return (
    sessions.find((session) => session.shareableId === shareableId) ?? {
      id: "fallback_session",
      shareableId,
      title: "Untitled review session",
      description: "No review data is available yet.",
      pins: [],
    }
  );
}
