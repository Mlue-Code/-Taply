import Link from "next/link";
import AssetIcon from "../shared/AssetIcon";
import leftIcon from "../../public/Icon-assets/left.svg";
import trashIcon from "../../public/Icon-assets/trash.svg";

type ProjectHeaderBarProps = {
  onDelete?: () => void;
  title: string;
  description: string;
};

export default function ProjectHeaderBar({ onDelete, title, description }: ProjectHeaderBarProps) {
  return (
    <section className="border-b border-[#e9e5f0] bg-white">
      <div className="mx-auto flex h-[76px] w-full max-w-[1110px] items-center justify-between px-4 xl:px-0">
        <div className="flex items-center gap-4">
          <Link
            href="/workspace"
            aria-label="Back to workspace"
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] text-[#111111]"
          >
            <AssetIcon src={leftIcon} className="h-[36px] w-[36px]" />
          </Link>

          <div className="pt-[1px]">
            <h1 className="text-[27px] font-semibold leading-none text-[#111111]">
              {title}
            </h1>
            <p className="mt-[4px] text-[14px] font-normal leading-none text-[#9a9a9a]">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDelete}
          disabled={!onDelete}
          className="inline-flex items-center gap-2 text-[18px] font-medium text-[#ff2b1f]"
        >
          <AssetIcon src={trashIcon} className="h-[18px] w-[18px]" />
          <span>Delete</span>
        </button>
      </div>
    </section>
  );
}
