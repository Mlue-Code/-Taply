import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import vector from "../public/Icon-assets/Vector.svg";
import vector2 from "../public/Icon-assets/Vector 2.svg";
import vector3 from "../public/Icon-assets/Vector 3.svg";
import groupImage from "../public/Icon-assets/Group.svg";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <Navbar variant="home" actionLabel="Report" actionHref="/" actionIcon={null} />

      <section className="relative min-h-[calc(100vh-58px)] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[104px] z-30 h-[150px]">
          <div className="absolute left-1/2 top-0 -translate-x-[318px] rotate-[12deg]">
            <Image src={vector} alt="" className="h-[16px] w-auto" />
          </div>
          <div className="absolute left-1/2 top-[26px] translate-x-[304px] rotate-[12deg]">
            <Image src={vector} alt="" className="h-[16px] w-auto" />
          </div>
          <div className="absolute left-1/2 top-[122px] -translate-x-[332px] rotate-[12deg]">
            <Image src={vector} alt="" className="h-[12px] w-auto" />
          </div>
        </div>

        <div className="relative z-20 mx-auto flex w-full max-w-[1110px] flex-col items-center px-4 pt-[136px] text-center xl:px-0">
          <h1 className="max-w-[860px] text-[68px] font-normal leading-[0.94] tracking-[-0.045em] text-[#111111]">
            404 - Page Not Found
          </h1>

          <p className="mt-4 max-w-[760px] text-[21px] font-normal leading-[1.18] tracking-[-0.02em] text-[#8d8a84]">
            Sorry, we couldn&apos;t find the page you were looking for. It may have been moved, deleted, or the URL might be incorrect
          </p>

          <div className="mt-[108px] flex flex-col items-center">
            <div className="relative h-[226px] w-[226px] sm:h-[238px] sm:w-[238px]">
              <Image src={groupImage} alt="404 illustration" fill className="object-contain" priority />
            </div>

            <Link
              href="/"
              className="mt-[30px] inline-flex h-[44px] items-center justify-center rounded-[10px] bg-[#f2eff6] px-12 text-[17px] font-medium text-[#7a2bf8] transition hover:bg-[#eae6f1]"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[430px] overflow-hidden">
          <div className="absolute inset-x-0 bottom-[105px] h-[200px] overflow-hidden">
            <Image src={vector2} alt="" fill className="object-cover object-bottom" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[205px] overflow-hidden">
            <Image src={vector3} alt="" fill className="object-cover object-bottom" />
          </div>
        </div>
      </section>
    </main>
  );
}
