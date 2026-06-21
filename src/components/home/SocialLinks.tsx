import AssetIcon from "../shared/AssetIcon";
import githubIcon from "../../public/Icon-assets/github.svg";
import linkedinIcon from "../../public/Icon-assets/linkden.svg";
import telegramIcon from "../../public/Icon-assets/telegram.svg";
import star from "../../public/Icon-assets/star.svg";

export default function SocialLinks() {
  const iconClass = "block h-[19px] w-[19px]";

  return (
    <div className="mt-10 flex items-center justify-center gap-4 opacity-70">
      <AssetIcon src={linkedinIcon} alt="LinkedIn" className={iconClass} />
      <AssetIcon src={telegramIcon} alt="Telegram" className={iconClass} />

      <div className="flex items-center gap-2">
        <AssetIcon src={githubIcon} alt="GitHub" className={iconClass} />

        <span className="inline-flex h-[20px] items-center gap-1 rounded-[6px] bg-[#c9c9c9] px-3 text-[12px] font-semibold leading-none !text-white">
          34
          <AssetIcon src={star} className="block h-[11px] w-[11px]" />
        </span>
      </div>
    </div>
  );
}
