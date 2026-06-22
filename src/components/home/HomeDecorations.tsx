import AssetIcon from "../shared/AssetIcon";
import blob1 from "../../public/assets/Blob1.svg";
import blob4 from "../../public/assets/Blob4.svg";

export default function HomeDecorations() {
  return (
    <>
      <AssetIcon
        src={blob4}
        className="pointer-events-none absolute left-[-104px] top-[246px] h-[276px] w-[264px]"
      />

      <AssetIcon
        src={blob1}
        className="pointer-events-none absolute right-[-80px] top-[56px] h-[255px] w-[255px]"
      />
    </>
  );
}
