"use client";

import { useRef, useState } from "react";

type UploadDesignModalProps = {
  open: boolean;
  onClose: () => void;
  onUpload: (payload: { name: string; file: File }) => void | Promise<void>;
};

function UploadArrowIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-[64px] w-[64px]" aria-hidden="true">
      <path
        d="M24 10v18m0-18 7 7m-7-7-7 7"
        stroke="#7021f8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 22h-1.8A6.7 6.7 0 0 0 8 28.7v4.1A7.2 7.2 0 0 0 15.2 40h17.6A7.2 7.2 0 0 0 40 32.8v-4.1a6.7 6.7 0 0 0-6.7-6.7h-1.8"
        stroke="#7021f8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function stripExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

export default function UploadDesignModal({ open, onClose, onUpload }: UploadDesignModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [designName, setDesignName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (file: File | null | undefined) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Please choose an image smaller than 10MB.");
      return;
    }

    setError(null);
    setSelectedFile(file);
    setDesignName((current) => current || stripExtension(file.name));
  };

  const handleSubmit = async () => {
    if (!selectedFile || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onUpload({
        name: designName.trim() || stripExtension(selectedFile.name),
        file: selectedFile,
      });
      onClose();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(45,43,58,0.46)] px-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-design-title"
        className="w-full max-w-[588px] overflow-hidden rounded-[14px] bg-white shadow-[0_20px_70px_rgba(14,8,32,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#e9e3f4] px-8 py-8">
          <h3 id="upload-design-title" className="text-[31px] font-semibold leading-none text-[#121212]">
            Upload Design
          </h3>
        </div>

        <div className="px-8 py-8">
          <label className="block">
            <span className="mb-2 block text-[16px] font-medium text-[#141414]">Design Name</span>
            <input
              type="text"
              value={designName}
              onChange={(event) => setDesignName(event.target.value)}
              placeholder="Home Page v1.0"
              className="h-[63px] w-full rounded-[13px] border border-[#d8c5ff] bg-[#f8f4ff] px-4 text-[15px] text-[#1a1722] outline-none placeholder:text-[#9a94a7] focus:border-[#b997ff]"
            />
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />

          <button
            type="button"
            onClick={openFilePicker}
            onDragEnter={() => setIsDragging(true)}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              handleFile(event.dataTransfer.files?.[0]);
            }}
            className={`mt-6 flex h-[209px] w-full flex-col items-center justify-center rounded-[13px] border-[2px] border-dashed bg-[#faf8ff] text-center transition ${
              isDragging ? "border-[#7c43ff] bg-[#f4edff]" : "border-[#d8c5ff]"
            }`}
          >
            <UploadArrowIcon />
            <div className="mt-6 text-[16px] font-medium text-[#121212]">
              Click to upload or drag and drop
            </div>
            <div className="mt-1 text-[11px] text-[#818181]">PNG, JPG or SVG (max 10MB)</div>
            {selectedFile ? (
              <div className="mt-3 rounded-full bg-white px-3 py-1 text-[11px] text-[#6f6b78] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                Selected: {selectedFile.name}
              </div>
            ) : null}
          </button>

          {error ? <p className="mt-3 text-[12px] text-[#d92d20]">{error}</p> : null}

          <div className="mt-10 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-[49px] rounded-[11px] border border-[#e3dfe8] bg-white text-[21px] font-medium text-[#6f6b78] shadow-[0_1px_0_rgba(0,0,0,0.03)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedFile || isSubmitting}
              className="h-[49px] rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] text-[21px] font-medium text-white shadow-[0_14px_24px_rgba(112,33,248,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
