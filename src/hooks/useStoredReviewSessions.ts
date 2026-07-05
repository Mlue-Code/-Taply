"use client";

import { useEffect, useState } from "react";
import { readStoredReviewSessions, type StoredReviewSession } from "@/lib/review-session-storage";

export function useStoredReviewSessions() {
  const [sessions, setSessions] = useState<StoredReviewSession[]>([]);

  useEffect(() => {
    const syncSessions = () => {
      setSessions(readStoredReviewSessions());
    };

    syncSessions();

    window.addEventListener("storage", syncSessions);
    return () => {
      window.removeEventListener("storage", syncSessions);
    };
  }, []);

  const totalFeedback = sessions.reduce((count, session) => count + session.feedback.length, 0);

  return {
    sessions,
    totalFeedback,
  };
}
