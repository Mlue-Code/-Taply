import AssetIcon from "../shared/AssetIcon";
import githubIcon from "../../public/Icon-assets/github.svg";
import linkedinIcon from "../../public/Icon-assets/linkden.svg";
import telegramIcon from "../../public/Icon-assets/telegram.svg";
import star from "../../public/Icon-assets/star.svg";

export default function SocialLinks() {
  const iconClass = "block h-6 w-6";

  return (
    <div className="mt-10 flex items-center justify-center gap-5">
      <AssetIcon src={linkedinIcon} alt="LinkedIn" className={iconClass} />
      <AssetIcon src={telegramIcon} alt="Telegram" className={iconClass} />

      <div className="flex items-center gap-2">
        <AssetIcon src={githubIcon} alt="GitHub" className={iconClass} />

        <span className="inline-flex h-6 items-center gap-1 rounded-[8px] bg-[#c9c9c9] px-4 text-[15px] font-semibold leading-none !text-white">
          34
          <AssetIcon src={star} className="block h-[13px] w-[13px]" />
        </span>
      </div>
    </div>
  );
}
