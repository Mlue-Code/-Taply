import { usePersistentState } from "@/hooks/usePersistentState";

export type WorkspaceSession = {
  shareableId: string;
  sessionName: string;
  projectName: string;
  projectDescription: string;
  selectedDesignIds: string[];
  createdAt: string;
};

const WORKSPACE_SESSIONS_STORAGE_KEY = "taply-workspace:sessions";

function makeSessionId() {
  return globalThis.crypto?.randomUUID?.() ?? `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useWorkspaceSessions() {
  const { setValue, value: sessions } = usePersistentState<WorkspaceSession[]>(WORKSPACE_SESSIONS_STORAGE_KEY, []);

  const addSession = (session: Omit<WorkspaceSession, "createdAt">) => {
    const createdSession: WorkspaceSession = {
      ...session,
      createdAt: new Date().toISOString(),
      shareableId: session.shareableId || makeSessionId(),
    };

    setValue((current) => [createdSession, ...current]);
    return createdSession;
  };

  return {
    addSession,
    sessions,
    totalSessions: sessions.length,
  };
}
