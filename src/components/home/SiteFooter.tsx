import AssetIcon from "../shared/AssetIcon";
import arrowUp from "../../public/Icon-assets/arrow-up.svg";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto max-w-[1120px] px-6 pb-0 lg:px-10">
      <div className="relative rounded-t-[20px] bg-primary px-8 py-12 text-center text-white">
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

        <p className="mt-4 text-[14px] text-white/80">
          Â© 2026 Taply All rights reserved
        </p>
      </div>
    </footer>
  );
}
