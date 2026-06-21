import AssetIcon from "../shared/AssetIcon";
import blob2 from "../../public/assets/Blob2.svg";
import blob3 from "../../public/assets/Blob3.svg";

export default function SectionDecorations() {
  return (
    <>
      <AssetIcon
        src={blob2}
        className="pointer-events-none absolute left-[-92px] top-[1462px] z-0 h-[236px] w-[224px]"
      />

      <AssetIcon
        src={blob3}
        className="pointer-events-none absolute right-[-74px] top-[1238px] z-0 h-[236px] w-[226px]"
      />
    </>
  );
}
