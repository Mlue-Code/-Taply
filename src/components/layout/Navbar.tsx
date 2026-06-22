import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import AssetIcon from "../shared/AssetIcon";
import arrowDownIcon from "../../public/Icon-assets/arrow-down.svg";
import arrowRight from "../../public/Icon-assets/arrow-right.svg";
import logo from "../../public/Taply assets/main logo.svg";
import lovely from "../../public/Icon-assets/lovely.svg";

type NavbarProps = {
  variant?: "home" | "workspace";
};

export default function Navbar({ variant = "home" }: NavbarProps) {
  const isWorkspace = variant === "workspace";

  return (
    <header className="relative z-10 border-b border-[#e9e5f0] bg-white/90">
      <div
        className={`mx-auto flex items-center justify-between px-4 sm:px-6 ${
          isWorkspace ? "h-[78px] max-w-[1230px] lg:px-6" : "h-[58px] max-w-[1110px] lg:px-0"
        }`}
      >
        <Link href="/" className="flex items-center gap-0" aria-label="Taply home">
          <AssetIcon
            src={logo}
            alt="Taply"
            className={isWorkspace ? "h-[42px] w-auto" : "h-[31px] w-auto"}
          />
        </Link>

        <nav
          className={`hidden items-center font-medium text-[#15131b] md:flex ${
            isWorkspace ? "gap-8 text-[15px]" : "gap-7 text-[12px]"
          }`}
        >
          <a href="#supporters">Supporters</a>
          <AssetIcon src={lovely} className={isWorkspace ? "h-[16px] w-[16px]" : "h-[14px] w-[14px]"} />
          <a href="#more" className="inline-flex items-center gap-2">
            More
            <AssetIcon
              src={arrowDownIcon}
              className={isWorkspace ? "h-[16px] w-[16px]" : "h-[14px] w-[14px]"}
            />
          </a>
        </nav>

        {isWorkspace ? (
          <Link
            href="/"
            className="inline-flex h-[34px] items-center gap-2 rounded-[10px] bg-primary px-4 text-[13px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.24)] transition hover:bg-primary-strong"
            style={{ color: "#ffffff" }}
          >
            <IconArrowLeft size={14} stroke={2.2} />
            Back
          </Link>
        ) : (
          <a
            href="/workspace"
            className="inline-flex h-[28px] items-center gap-2 rounded-[8px] bg-primary px-4 text-[12px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.24)] transition hover:bg-primary-strong"
            style={{ color: "#ffffff" }}
          >
            Start
            <AssetIcon src={arrowRight} className="h-[12px] w-[12px]" />
          </a>
        )}
      </div>
    </header>
  );
}
