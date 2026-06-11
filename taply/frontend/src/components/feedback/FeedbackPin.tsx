import type { FeedbackPin as FeedbackPinType } from "@/types/api.types";

type FeedbackPinProps = {
  pin: FeedbackPinType;
};

export function FeedbackPin({ pin }: FeedbackPinProps) {
  return (
    <button
      type="button"
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-cyan-300 px-3 py-1 text-xs font-medium text-slate-950 shadow-lg shadow-cyan-950/30"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
      }}
    >
      {pin.label}
    </button>
  );
}
