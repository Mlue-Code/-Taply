import AssetIcon from "../shared/AssetIcon";
import blob2 from "../../public/assets/Blob2.svg";
import blob3 from "../../public/assets/Blob3.svg";

export default function SectionDecorations() {
  return (
    <>
      <AssetIcon
        src={blob2}
        className="pointer-events-none absolute left-[-10px] top-[300px] z-0 h-[228px] w-[218px]"
      />

      <AssetIcon
        src={blob3}
        className="pointer-events-none absolute right-[-70px] top-[760px] z-0 h-[228px] w-[8px]"
      />
    </>
  );
}
