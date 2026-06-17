import Link from "next/link";
import AssetIcon from "../shared/AssetIcon";
import arrowDownIcon from "../../public/Icon-assets/arrow-down.svg";
import logo from "../../public/Taply assets/main logo.svg";
import lovely from "../../public/Icon-assets/lovely.svg";
import arrowRight from "../../public/Icon-assets/arrow-right.svg";

export default function Navbar() {
  return (
    <header className="relative z-10 border-b border-border-subtle bg-white/90">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-0" aria-label="Taply home">
          <AssetIcon src={logo} alt="Taply" className="h-[42px] w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-medium text-[#15131b] md:flex">
          <a href="#supporters">Supporters</a>
          <AssetIcon src={lovely} className="h-[18px] w-[18px]" />
          <a href="#more" className="inline-flex items-center gap-2">
            More
            <AssetIcon src={arrowDownIcon} className="h-[18px] w-[18px]" />
          </a>
        </nav>

        <a
          href="#how-it-works"
          className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-4 text-[14px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.24)] transition hover:bg-primary-strong"
          style={{ color: "#ffffff" }}
        >
          Start
          <AssetIcon src={arrowRight} className="h-[15px] w-[15px]" />
        </a>
      </div>
    </header>
  );
}
