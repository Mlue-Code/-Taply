import AssetIcon from "../shared/AssetIcon";
import arrowRight from "../../public/Icon-assets/arrow-right.svg";
import logo from "../../public/Taply assets/main logo.svg";

export default function CtaSection() {
  return (
    <section className="relative z-10 mt-28 overflow-visible py-20 text-center">
      <div className="relative z-10 flex flex-col items-center px-6">
        <AssetIcon src={logo} alt="Taply" className="h-12 w-auto" />

        <h2 className="mt-8 text-[48px] font-semibold text-[#1f1d25]">
          Ready to collect better feedback?
        </h2>

        <p className="mt-4 text-[24px] text-[#7a7683]">
          Join designers who are getting precise, actionable feedback from their
          clients
        </p>

        <a
          href="#"
          className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-primary px-6 py-3 text-sm font-semibold text-white"
          style={{ color: "#ffffff" }}
        >
          Start for free
          <AssetIcon src={arrowRight} className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
