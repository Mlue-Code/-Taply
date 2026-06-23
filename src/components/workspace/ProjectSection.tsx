import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type ProjectSectionProps = {
  title: string;
  actionLabel: string;
  actionHref: string;
  actionLeadingIcon: ReactNode;
  icon: StaticImageData;
  emptyTitle: string;
  description: string;
  buttonLabel?: string;
  buttonLeadingIcon?: ReactNode;
  actionClassName: string;
  buttonClassName?: string;
  showButton?: boolean;
  actionOnClick?: () => void;
  buttonOnClick?: () => void;
  className?: string;
};

export default function ProjectSection({
  title,
  actionLabel,
  actionHref,
  actionLeadingIcon,
  icon,
  emptyTitle,
  description,
  buttonLabel,
  buttonLeadingIcon,
  actionClassName,
  buttonClassName,
  showButton = true,
  actionOnClick,
  buttonOnClick,
  className = "mt-[72px]",
}: ProjectSectionProps) {
  return (
    <section className={className}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[20px] font-medium text-[#0f0f16]">{title}</h2>

        {actionOnClick ? (
          <button type="button" onClick={actionOnClick} className={actionClassName}>
            {actionLeadingIcon}
            <span className="text-white">{actionLabel}</span>
          </button>
        ) : (
          <Link href={actionHref} className={actionClassName}>
            {actionLeadingIcon}
            <span className="text-white">{actionLabel}</span>
          </Link>
        )}
      </div>

      <div className="mt-[18px] rounded-[13px] border-[2px] border-dashed border-[#7c43ff]/90 bg-[linear-gradient(180deg,rgba(250,248,255,0.98),rgba(248,244,255,0.98))]">
        <div className="flex min-h-[302px] flex-col items-center justify-center rounded-[11px] text-center">
          <div className="mb-[10px] flex h-[58px] w-[58px] items-center justify-center rounded-[14px] text-[rgba(178,137,255,0.6)]">
            <Image src={icon} alt={emptyTitle} width={60} height={60} />
          </div>
          <h3 className="m-0 text-[16px] font-medium text-[#121212]">{emptyTitle}</h3>
          <p className="mt-2.5 max-w-[290px] text-[11px] text-[#818181]">{description}</p>
          {showButton ? (
            buttonOnClick ? (
              <button type="button" onClick={buttonOnClick} className={buttonClassName}>
                {buttonLeadingIcon}
                <span className="text-white">{buttonLabel}</span>
              </button>
            ) : (
              <Link href={actionHref} className={buttonClassName}>
                {buttonLeadingIcon}
                <span className="text-white">{buttonLabel}</span>
              </Link>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
