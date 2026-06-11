import { FeedbackPin } from "./FeedbackPin";
import type { FeedbackPin as FeedbackPinType } from "@/types/api.types";

type InteractiveFeedbackCanvasProps = {
  pins: FeedbackPinType[];
};

export function InteractiveFeedbackCanvas({
  pins,
}: InteractiveFeedbackCanvasProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-surface p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
            Feedback canvas
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Leave comments on the design
          </h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          {pins.length} pins
        </div>
      </div>

      <div className="relative mt-6 min-h-[32rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,.95),rgba(2,6,23,.9))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,.18),transparent_30%)]" />
        <div className="absolute inset-6 rounded-[1.5rem] border border-dashed border-white/10" />
        <div className="absolute inset-10 rounded-[1.2rem] border border-white/5 bg-white/5" />
        <div className="absolute left-10 top-10 right-10 bottom-10 rounded-[1rem] bg-slate-950/55" />
        {pins.map((pin) => (
          <FeedbackPin key={pin.id} pin={pin} />
        ))}
      </div>
    </section>
  );
}
