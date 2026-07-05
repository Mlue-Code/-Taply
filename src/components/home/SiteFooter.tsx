import Image from "next/image";
import AssetIcon from "../shared/AssetIcon";
import arrowUp from "../../public/Icon-assets/arrow-up.svg";
import footerShape from "../../public/Icon-assets/footer-shape.svg";

type SiteFooterProps = {
  variant?: "home" | "workspace";
};

export default function SiteFooter({ variant = "home" }: SiteFooterProps) {
  const isWorkspace = variant === "workspace";

  return (
    <footer
      className={`relative z-10 mx-auto pb-0 ${
        isWorkspace
          ? "mt-[116px] max-w-[1230px] px-0"
          : "max-w-[1225px] px-6 lg:px-0"
      }`}
    >
      <div className="relative">
        <Image
          src={footerShape}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full pt-2"
          priority
        />
        <div
          className="relative z-10 px-8 pt-24 pb-12 text-center font-sans"
          style={{ color: "var(--bg-subtle)" }}
        >
          <div className="absolute left-1/2 top-[18px] -translate-x-1/2">
            <AssetIcon
              src={arrowUp}
              alt="scroll to top"
              className="h-[20px] w-[20px]"
            />
          </div>

          {/* Developed by */}
          <p className="text-[16px] font-normal">Developed by Mlue Code</p>
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-12 text-[16px]">
            <a
              href="#about"
              className="font-semibold transition-opacity hover:opacity-80"
            >
              About
            </a>
            <a
              href="#services"
              className="font-semibold transition-opacity hover:opacity-80"
            >
              Other services
            </a>
            <a
              href="#support"
              className="font-semibold transition-opacity hover:opacity-80"
            >
              Support
            </a>
            <a
              href="#contact"
              className="font-semibold transition-opacity hover:opacity-80"
            >
              Contact us
            </a>
          </nav>
          <nav className="mt-20 flex flex-wrap items-center justify-center gap-6 text-[16px]">
            <a
              href="/terms"
              className="font-normal transition-opacity hover:opacity-80"
            >
              Terms &amp; Conditions
            </a>
            <span aria-hidden>|</span>
            <a
              href="/privacy"
              className="font-normal transition-opacity hover:opacity-80"
            >
              Privacy policy
            </a>
            <span aria-hidden>|</span>
            <a
              href="/licenses"
              className="font-normal transition-opacity hover:opacity-80"
            >
              Licenses
            </a>
          </nav>

          {/* Copyright */}
          <p className="mt-4 text-[16px] font-normal tracking-[0.07em]">
            © 2026 Taply All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
