"use client";

import { useState } from "react";

type CreateProjectModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onCreate?: (name: string) => void;
};

export function CreateProjectModal({
  isOpen = true,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) {
    return null;
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface p-6 shadow-xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Create project</h2>
          <p className="mt-1 text-sm text-slate-300">
            Start a new workspace for feedback and design reviews.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:bg-white/5"
        >
          Close
        </button>
      </div>

      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onCreate?.(name);
          setName("");
        }}
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Website redesign"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        />
        <button
          type="submit"
          className="rounded-2xl bg-cyan-300 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-200"
        >
          Create
        </button>
      </form>
    </div>
  );
}
