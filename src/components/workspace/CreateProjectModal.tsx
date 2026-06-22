type CreateProjectModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateProjectModal({ open, onClose }: CreateProjectModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(45,43,58,0.46)] px-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-project-title"
        className="w-full max-w-[588px] overflow-hidden rounded-[14px] bg-white shadow-[0_20px_70px_rgba(14,8,32,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#e9e3f4] px-8 py-8">
          <h3 id="create-project-title" className="text-[31px] font-semibold leading-none text-[#121212]">
            Create Project
          </h3>
        </div>

        <div className="px-8 py-8">
          <label className="block">
            <span className="mb-2 block text-[16px] font-medium text-[#141414]">
              Project Name
            </span>
            <input
              type="text"
              placeholder="Website Redesign"
              className="h-[63px] w-full rounded-[13px] border border-[#d8c5ff] bg-[#f8f4ff] px-4 text-[15px] text-[#1a1722] outline-none placeholder:text-[#9a94a7] focus:border-[#b997ff]"
            />
          </label>

          <label className="mt-6 block">
            <span className="mb-2 block text-[16px] font-medium text-[#141414]">
              Description
            </span>
            <textarea
              rows={6}
              placeholder="Describe your project..."
              className="h-[163px] w-full resize-none rounded-[13px] border border-[#d8c5ff] bg-[#f8f4ff] px-4 py-4 text-[15px] text-[#1a1722] outline-none placeholder:text-[#9a94a7] focus:border-[#b997ff]"
            />
          </label>

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
              className="h-[49px] rounded-[11px] bg-[linear-gradient(180deg,#7d2df8_0%,#6c20f4_100%)] text-[21px] font-medium text-white shadow-[0_14px_24px_rgba(112,33,248,0.22)]"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
