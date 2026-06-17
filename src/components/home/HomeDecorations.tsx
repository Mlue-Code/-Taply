import AssetIcon from "../shared/AssetIcon";
import blob1 from "../../public/assets/Blob1.svg";
import blob4 from "../../public/assets/Blob4.svg";

export default function HomeDecorations() {
  return (
    <>
      <AssetIcon
        src={blob4}
        className="pointer-events-none absolute left-[-132px] top-[240px] h-[273px] w-[261px]"
      />

      <AssetIcon
        src={blob1}
        className="pointer-events-none absolute right-[-128px] top-[340px] h-[266px] w-[266px]"
      />
    </>
  );
}
