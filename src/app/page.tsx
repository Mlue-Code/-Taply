import Link from "next/link";
import githubIcon from "../public/Icon-assets/github.svg";
import linkedinIcon from "../public/Icon-assets/linkden.svg";
import telegramIcon from "../public/Icon-assets/telegram.svg";
import arrowDownIcon from "../public/Icon-assets/arrow-down.svg";
import profileUser from "../public/Icon-assets/profile-2user.svg";
import diagram from "../public/Icon-assets/diagram.svg";
import link from "../public/Icon-assets/link.svg";
import star from "../public/Icon-assets/star.svg";
import logo from "../public/Taply assets/main logo.svg";
import lovely from "../public/Icon-assets/lovely.svg";
import arrowRight from "../public/Icon-assets/arrow-right.svg";
import ghost from "../public/Icon-assets/ghost.svg";
import fluentCheckBox from "../public/Icon-assets/fluent_checkbox.svg";
import blob1 from "../public/assets/Blob1.svg";
import blob2 from "../public/assets/Blob2.svg";
import blob3 from "../public/assets/Blob3.svg";
import blob4 from "../public/assets/Blob4.svg";
const features = [
  {
    title: "Direct Interaction",
    description:
      "Clients tap directly on designs to leave feedback. No more vague comments or confusing screenshots.",
    icon: profileUser,
    iconAlt: "",
    tone: "violet",
  },
  {
    title: "Smart Analytics",
    description:
      "Automatically categorize feedback, identify patterns, and spot the most critical issues.",
    icon: diagram,
    iconAlt: "",
    tone: "lime",
  },
  {
    title: "Simple Sharing",
    description:
      "Generate review links in seconds. No login required for clients. Works on any device.",
    icon: link,
    iconAlt: "",
    tone: "yellow",
  },
];

const designerSteps = [
  "Upload your designs",
  "Create a review session",
  "Share the link with clients",
  "Receive organized feedback",
  "Analyze insights and patterns",
  "Resolve issues efficiently",
];

const clientSteps = [
  "Open the review link",
  "Tap anywhere on the design",
  "Select sentiment",
  "Choose issue category",
  "Add optional comments",
  "Done! No signup required",
];

function AssetIcon({
  src,
  alt = "",
  className,
}: {
  src: string | { src: string };
  alt?: string;
  className?: string;
}) {
  const imageSrc = typeof src === "string" ? src : src.src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={className}
      draggable={false}
    />
  );
}


function SocialLinks() {
  const iconClass = "block h-6 w-6";

  return (
    <div className="mt-10 flex items-center justify-center gap-6">
      <AssetIcon src={linkedinIcon} alt="LinkedIn" className={iconClass} />
      <AssetIcon src={telegramIcon} alt="Telegram" className={iconClass} />
      <AssetIcon src={githubIcon} alt="GitHub" className={iconClass} />
      <span className="inline-flex h-6 items-center gap-1 rounded-[8px] bg-[#c9c9c9] px-2 text-[15px] font-semibold leading-none !text-white">
        34
        <AssetIcon src= {star} className="block h-[13px] w-[13px]" />
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-base text-text-primary">
      <AssetIcon
  src={blob4}
  className="pointer-events-none absolute left-[-132px] top-[240px] h-[273px] w-[261px]"
/>

<AssetIcon
  src={blob1}
  className="pointer-events-none absolute right-[-128px] top-[108px] h-[266px] w-[266px]"
/>


      <header className="relative z-10 border-b border-border-subtle bg-white/90">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-0" aria-label="Taply home">
            <AssetIcon src= {logo} alt="Taply" className="h-[42px] w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 text-[15px] font-medium text-[#15131b] md:flex">
            <a href="#supporters">Supporters</a>
            <AssetIcon src= {lovely} className="h-[18px] w-[18px]" />
            <a href="#more" className="inline-flex items-center gap-2">
              More
              <AssetIcon
              src={arrowDownIcon}
              className="h-[18px] w-[18px]"
              />
            </a>
          </nav>

          <a
            href="#how-it-works"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-4 text-[14px] font-semibold !text-white shadow-[0_10px_24px_rgba(112,33,248,0.24)] transition hover:bg-primary-strong"
            style={{ color: "#ffffff" }}
          >
            Start
            <AssetIcon src= {arrowRight} className="h-[15px] w-[15px]" />
          </a>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex max-w-[980px] flex-col items-center px-6 pb-20 pt-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-5 py-2 text-[13px] font-semibold text-text-primary">
          <AssetIcon src= {ghost} className="h-[15px] w-[15px]" />
          For Designers
          
        </span>

        <h1 className="mt-9 max-w-[760px] text-[48px] font-bold leading-[1.05] text-[#1f1d25] md:text-[60px]">
          <span className="text-primary">Get clear feedback</span> without long
          explanations
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
            <AssetIcon src= {arrowRight} className="h-[15px] w-[15px]" />
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

      <section className="relative z-10 mx-auto grid max-w-[1120px] gap-6 px-6 md:grid-cols-3 lg:px-10">
        {features.map((feature) => {
          const iconClass =
            feature.tone === "violet"
              ? "bg-violet-100 text-primary"
              : feature.tone === "lime"
                ? "bg-lime-200 text-lime-900"
                : "bg-[#ffd200] text-[#7a5a00]";

          return (
            <article
              key={feature.title}
              className="rounded-[12px] border border-border-default bg-[#fcfbff] p-6 shadow-[0_10px_22px_rgba(67,40,130,0.05)]"
            >
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-[8px] ${iconClass}`}>
                <AssetIcon src={feature.icon} alt={feature.iconAlt} className="h-[22px] w-[22px]" />
              </span>
              <h2 className="mt-5 text-[24px] font-semibold leading-tight text-[#22202a]">
                {feature.title}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.35] text-[#77737f]">
                {feature.description}
              </p>
            </article>
          );
        })}
      </section>

      <section id="how-it-works" className="relative z-10 mx-auto mt-24 max-w-[1120px] px-6 pb-24 lg:px-10">
        <div className="rounded-[12px] border border-border-subtle bg-bg-subtle px-8 py-16">
          <h2 className="text-center text-[38px] font-semibold leading-tight text-[#22202a]">
            How it works
          </h2>

          <div className="mx-auto mt-12 grid max-w-[860px] gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-[20px] font-semibold text-[#22202a]">
                For Designers
              </h3>
              <ol className="mt-5 space-y-4">
                {designerSteps.map((step, index) => (
                  <li key={step} className="flex items-center gap-2 text-[16px] text-[#77737f]">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-primary text-[10px] font-semibold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-[20px] font-semibold text-[#22202a]">
                For Clients
              </h3>
              <ol className="mt-5 space-y-4">
  {clientSteps.map((step) => (
    <li
      key={step}
      className="flex items-center gap-2 text-[16px] text-[#77737f]"
    >
      <AssetIcon
        src={fluentCheckBox}
        className="h-5 w-5 shrink-0"
      />
      {step}
    </li>
  ))}
</ol>
            </div>
          </div>
        </div>
      </section>

      <AssetIcon
        src={blob2}
        className="pointer-events-none absolute left-[-10px] top-[300px] z-0 h-[228px] w-[218px]"
      />

      <AssetIcon
        src={blob3}
        className="pointer-events-none absolute right-[-70px] top-[760px] z-0 h-[228px] w-[8px]"
      />

<section className="relative z-10 mt-28 overflow-visible py-20 text-center">

  <div className="relative z-10 flex flex-col items-center px-6">
    <AssetIcon
      src={logo}
      alt="Taply"
      className="h-12 w-auto"
    />

    <h2 className="mt-8 text-[48px] font-bold text-[#1f1d25]">
      Ready to collect better feedback?
    </h2>

    <p className="mt-4 text-[20px] text-[#7a7683]">
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
<footer className="relative z-10 mx-auto max-w-[1120px] px-6 pb-0 lg:px-10">
  <div className="relative rounded-t-[20px] bg-primary px-8 py-12 text-center text-white">

    
    <div className="absolute left-1/2 top-[-12px] flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary">
      ^
    </div>

    <p className="text-[13px] text-white/80">
      Developed by Mlue Code
    </p>

    <nav className="mt-6 flex flex-wrap items-center justify-center gap-8 text-[14px]">
      <a href="#about">About</a>
      <a href="#services">Other services</a>
      <a href="#support">Support</a>
      <a href="#contact">Contact us</a>
    </nav>

    <nav className="mt-16 flex flex-wrap items-center justify-center gap-4 text-[14px] text-white/90">
      <a href="/terms">Terms & Conditions</a>

      <span>|</span>

      <a href="/privacy">Privacy policy</a>

      <span>|</span>

      <a href="/licenses">Licenses</a>
    </nav>

    <p className="mt-4 text-[14px] text-white/80">
      © 2026 Taply All rights reserved
    </p>
  </div>
</footer>
    </main>
  );
}
