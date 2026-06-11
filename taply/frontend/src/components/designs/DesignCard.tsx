import type { Design } from "@/types/api.types";

type DesignCardProps = {
  design: Design;
};

export function DesignCard({ design }: DesignCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
      <div className="h-44 rounded-2xl border border-white/10 bg-slate-950/50" />
      <h3 className="mt-4 text-base font-semibold text-white">{design.name}</h3>
      <p className="mt-2 text-sm text-slate-300">{design.description}</p>
    </article>
  );
}
