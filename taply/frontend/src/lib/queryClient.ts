export const queryKeys = {
  projects: ["projects"] as const,
  designs: ["designs"] as const,
  sessions: ["sessions"] as const,
  feedback: ["feedback"] as const,
};

export const queryDefaults = {
  staleTime: 30_000,
  gcTime: 5 * 60_000,
};
