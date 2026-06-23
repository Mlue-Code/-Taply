import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import AssetIcon from "../shared/AssetIcon";
import arrowDownIcon from "../../public/Icon-assets/arrow-down.svg";
import arrowLeftIcon from "../../public/Icon-assets/arrow-left.svg";
import arrowRight from "../../public/Icon-assets/arrow-right.svg";
import logo from "../../public/Taply assets/main logo.svg";
import lovely from "../../public/Icon-assets/lovely.svg";

type NavbarProps = {
  variant?: "home" | "workspace" | "project";
};

export default function Navbar({ variant = "home" }: NavbarProps) {
  const isWorkspace = variant === "workspace";
  const isProject = variant === "project";

  return (
    <header className="relative z-10 border-b border-[#e9e5f0] bg-white/90">
      <div
        className={`mx-auto flex items-center justify-between px-4 sm:px-6 ${
          isWorkspace ? "h-[58px] max-w-[1110px] lg:px-0" : "h-[58px] max-w-[1110px] lg:px-0"
        }`}
      >
        <Link href="/" className="flex items-center gap-0" aria-label="Taply home">
          <AssetIcon
            src={logo}
            alt="Taply"
            className="h-[31px] w-auto"
          />
        </Link>

        <nav
          className={`hidden items-center font-medium text-[#15131b] md:flex ${
            isWorkspace ? "gap-7 text-[12px]" : "gap-7 text-[12px]"
          }`}
        >
          <a href="#supporters">Supporters</a>
          <AssetIcon src={lovely} className="h-[14px] w-[14px]" />
          <a href="#more" className="inline-flex items-center gap-2">
            More
            <AssetIcon src={arrowDownIcon} className="h-[14px] w-[14px]" />
          </a>
        </nav>

        {isWorkspace ? (
          <Link
            href="/"
            className="inline-flex h-[28px] items-center gap-2 rounded-[8px] bg-primary px-4 text-[12px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.24)] transition hover:bg-primary-strong"
            style={{ color: "#ffffff" }}
          >
            <AssetIcon src={arrowLeftIcon} className="h-[12px] w-[12px] text-white" />
            Back
          </Link>
        ) : isProject ? (
          <Link
            href="/review/new"
            className="inline-flex h-[28px] items-center gap-2 rounded-[8px] bg-primary px-4 text-[12px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.24)] transition hover:bg-primary-strong"
            style={{ color: "#ffffff" }}
          >
            <IconPlus size={12} stroke={2.4} />
            <span className="text-white">New Project</span>
          </Link>
        ) : (
          <a
            href="/workspace"
            className="inline-flex h-[28px] items-center gap-2 rounded-[8px] bg-primary px-4 text-[12px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.24)] transition hover:bg-primary-strong"
            style={{ color: "#ffffff" }}
          >
            <span className="text-white">Start</span>
            <AssetIcon src={arrowRight} className="h-[12px] w-[12px]" />
          </a>
        )}
      </div>
    </header>
  );
}
