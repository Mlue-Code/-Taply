import AssetIcon from "../shared/AssetIcon";
import arrowRight from "../../public/Icon-assets/arrow-right.svg";
import ghost from "../../public/Icon-assets/ghost.svg";
import SocialLinks from "./SocialLinks";

export default function HeroSection() {
  return (
    <section className="relative z-10 mx-auto flex max-w-[980px] flex-col items-center px-6 pb-20 pt-16 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-5 py-2 text-[13px] font-semibold text-text-primary">
        <AssetIcon src={ghost} className="h-[15px] w-[15px]" />
        For Designers
      </span>

      <h1 className="mt-9 max-w-[700px] text-[48px] font-semibold leading-[1.05] text-[#1f1d25] md:text-[60px]">
        <span className="text-primary">Get clear feedback</span> without
        <br />
        long explanations
      </h1>

      <p className="mt-7 max-w-[660px] text-[17px] leading-[1.45] text-[#85828b]">
        Let your clients simply tap on your design and show exactly what they
        like or want to change - no confusion, no endless revisions.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#how-it-works"
          className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-5 text-[14px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.26)] transition hover:bg-primary-strong"
          style={{ color: "#ffffff" }}
        >
          Get Started
          <AssetIcon src={arrowRight} className="h-[15px] w-[15px]" />
        </a>
        <a
          href="#how-it-works"
          className="inline-flex h-10 items-center rounded-[10px] border border-[#d8d6de] bg-white px-5 text-[14px] font-semibold text-[#2a2830] transition hover:border-border-strong"
        >
          See How it works
        </a>
      </div>

      <SocialLinks />
    </section>
  );
}
