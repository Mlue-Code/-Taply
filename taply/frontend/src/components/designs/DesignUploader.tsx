"use client";

import { useState } from "react";

type DesignUploaderProps = {
  onUpload?: (fileName: string) => void;
};

export function DesignUploader({ onUpload }: DesignUploaderProps) {
  const [fileName, setFileName] = useState("No file selected");

  return (
    <label className="block rounded-[2rem] border border-dashed border-cyan-300/25 bg-white/5 p-6">
      <span className="text-sm uppercase tracking-[0.3em] text-cyan-200">
        Upload design
      </span>
      <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/50 p-6 text-sm text-slate-300">
        <p>Drop a file or choose one to start a new review session.</p>
        <p className="mt-3 font-mono text-xs text-cyan-100">{fileName}</p>
      </div>
      <input
        type="file"
        className="mt-4 block w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:font-medium file:text-slate-950 hover:file:bg-cyan-200"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) {
            return;
          }
          setFileName(file.name);
          onUpload?.(file.name);
        }}
      />
    </label>
  );
}
