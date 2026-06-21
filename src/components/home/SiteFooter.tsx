import AssetIcon from "../shared/AssetIcon";
import arrowUp from "../../public/Icon-assets/arrow-up.svg";

type SiteFooterProps = {
  variant?: "home" | "workspace";
};

export default function SiteFooter({ variant = "home" }: SiteFooterProps) {
  const isWorkspace = variant === "workspace";

  return (
    <footer
      className={`relative z-10 mx-auto pb-0 ${
        isWorkspace ? "mt-[116px] max-w-[1230px] px-0" : "max-w-[1110px] px-6 lg:px-0"
      }`}
    >
      <div className="relative rounded-t-[12px] bg-primary px-8 py-12 text-center text-white">
        <div className="absolute left-1/2 top-[-12px] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary">
          <AssetIcon src={arrowUp} alt="" />
        </div>

        <p className="text-[13px] text-white/80">Developed by Mlue Code</p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-8 text-[14px]">
          <a href="#about">About</a>
          <a href="#services">Other services</a>
          <a href="#support">Support</a>
          <a href="#contact">Contact us</a>
        </nav>

        <nav className="mt-16 flex flex-wrap items-center justify-center gap-4 text-[14px] text-white/90">
          <a href="/terms">Terms & Conditions</a>
          <span>|</span>
          <a href="/privacy">Privacy policy</a>
          <span>|</span>
          <a href="/licenses">Licenses</a>
        </nav>

        <p className="mt-4 text-[14px] text-white/80">© 2026 Taply All rights reserved</p>
      </div>
    </footer>
  );
}
