import Image, { type StaticImageData } from "next/image";

type WorkspaceStat = {
  label: string;
  value: string;
  icon: StaticImageData;
};

type WorkspaceStatsProps = {
  stats: WorkspaceStat[];
};

export default function WorkspaceStats({ stats }: WorkspaceStatsProps) {
  return (
    <section
      aria-label="Workspace stats"
      className="flex flex-col gap-4 xl:flex-row xl:justify-start xl:gap-[32px]"
    >
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="flex min-h-[146px] w-full items-center justify-between rounded-[13px] border border-[rgba(112,33,248,0.055)] bg-[linear-gradient(180deg,rgba(122,83,255,0.05),rgba(122,83,255,0.03))] px-6 py-7 xl:w-[291px] xl:flex-none"
        >
          <div>
            <p className="mb-[18px] text-[13px] font-medium text-[#6d6880]">
              {stat.label}
            </p>
            <p className="text-[34px] font-normal leading-none text-[#727082]">
              {stat.value}
            </p>
          </div>
          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full">
            <Image
              src={stat.icon}
              alt={stat.label}
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </article>
      ))}
    </section>
  );
}
