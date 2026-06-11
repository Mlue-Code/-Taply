import type { FeedbackItem } from "@/types/api.types";

const feedback: FeedbackItem[] = [
  {
    id: "feedback_1",
    author: "Mina",
    message: "Can we move the CTA slightly higher?",
    createdAt: "10 minutes ago",
  },
];

export async function getFeedbackItems(): Promise<FeedbackItem[]> {
  return feedback;
}
