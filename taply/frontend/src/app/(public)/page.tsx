import Link from "next/link";

function LogoMark() {
  return (
    <svg viewBox="0 0 44 44" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="taply-logo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B76DFF" />
          <stop offset="100%" stopColor="#7021F8" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="42" height="42" rx="12" fill="url(#taply-logo)" />
      <path
        d="M13 28.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V31"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M20.5 15v13.5M27 20v8.5M33 24.5V31"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="20.5" cy="13" r="2.2" fill="#fff" />
      <circle cx="27" cy="18" r="2.2" fill="#fff" />
      <circle cx="33" cy="22.5" r="2.2" fill="#fff" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        d="M12 20s-6.3-3.95-8.2-7.68C2.43 8.6 4 6 6.65 6c1.44 0 2.48.72 3.05 1.56C10.27 6.72 11.31 6 12.75 6c2.65 0 4.22 2.6 2.85 6.32C18.3 16.05 12 20 12 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        d="m7 10 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" aria-hidden="true">
      <path
        d="M7 12h10m-4-4 4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[8px] w-[8px]" aria-hidden="true">
      <path
        d="M6.7 1.2 2.8 6h2.4L5.1 10.8 9 6H6.6l.1-4.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[8px] w-[8px]" aria-hidden="true">
      <path
        d="M2.2 6.3 4.7 8.8 9.8 3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[8px] w-[8px]" aria-hidden="true">
      <path
        d="M6 1.3c1.8 0 3.2 1.4 3.2 3.2S7.8 7.7 6 7.7 2.8 6.3 2.8 4.5 4.2 1.3 6 1.3Z"
        fill="currentColor"
      />
      <path
        d="M6 7.5v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#cbcbcb]">
      <span className="translate-y-[1px] text-[19px] font-semibold leading-none text-white">
        in
      </span>
    </span>
  );
}

function TelegramIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbcbcb] text-white">
      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden="true">
        <path
          d="M4.6 12.5 18.9 5.7 15.1 18.3 11.9 14l-3.6 3 .8-4.1-4.5-.4Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function GithubIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cbcbcb] text-white">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
        <path
          d="M12 4.5c-4 0-7.3 3.2-7.3 7.3 0 3.3 2.1 6.1 5 7 .4.1.5-.1.5-.4v-1.4c-2 .4-2.4-.8-2.4-.8-.3-.7-.8-.9-1-.9-.7-.5.1-.5.1-.5.8.1 1.2.9 1.2.9.7 1.1 1.9.9 2.4.7.1-.4.3-.8.6-1-1.5-.2-3.1-.8-3.1-3.5 0-.8.3-1.4.8-2-.1-.2-.4-.9.1-1.9 0 0 .7-.2 2 .8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.3-1 2-.8 2-.8.5 1 .2 1.7.1 1.9.5.6.8 1.2.8 2 0 2.7-1.6 3.3-3.2 3.5.3.3.6.8.6 1.5v2.3c0 .2.1.4.5.4 2.9-.9 5-3.7 5-7 0-4.1-3.3-7.3-7.3-7.3Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" aria-hidden="true">
      <path
        d="M6 1.2 6.9 4.1 9.8 5 6.9 5.9 6 8.8 5.1 5.9 2.2 5 5.1 4.1 6 1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FeatureIcon({ type }: { type: "people" | "chart" | "link" }) {
  if (type === "people") {
    return (
      <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
        <circle cx="13" cy="13" r="5" fill="#8D5CFF" />
        <circle cx="23.5" cy="15" r="4" fill="#7A3CF5" />
        <path
          d="M7 29c.5-4.4 4.1-7.5 8.2-7.5S22.9 24.6 23.4 29"
          fill="#8D5CFF"
        />
        <path
          d="M18.5 29c.3-2.6 2.4-4.7 5.1-4.7 2.7 0 4.8 2.1 5.1 4.7"
          fill="#7A3CF5"
        />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
        <path d="M8 27h20" stroke="#8EDB50" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M10 25V14M16 25V18M22 25V11"
          stroke="#8EDB50"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10 20l6-5 4 2 6-9"
          fill="none"
          stroke="#5FAF26"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <rect x="6" y="14" width="24" height="8" rx="4" fill="#E5B700" />
      <rect x="15" y="12" width="6" height="12" rx="3" fill="#C49500" />
      <circle cx="12" cy="18" r="2" fill="#FFF0B6" />
      <circle cx="24" cy="18" r="2" fill="#FFF0B6" />
    </svg>
  );
}

function SectionBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f1ff] px-6 py-2 text-[14px] font-semibold text-[#2a2a34] shadow-[0_2px_10px_rgba(112,33,248,0.04)]">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[10px] text-primary">
        <BadgeIcon />
      </span>
      For Designers
    </div>
  );
}

function PurpleBlob({
  className,
  flipped = false,
}: {
  className: string;
  flipped?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 261 273"
      className={className}
      aria-hidden="true"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M199.5 2.5c40 0 61 32.2 61 72v34.4c0 31.2-16.5 43.5-28.7 61.8-13 19.6-21.2 50-43.5 76.5-22.8 27-61.4 25.3-92.5 20.4-31.7-5-57.7-24.9-74.7-52.3C4 190 1 165.5 1 128.5c0-38 7.9-66.1 30-91.5C57.9 9 102 2.5 139.6 2.5h59.9Z"
        fill="#7021F8"
      />
    </svg>
  );
}

const features = [
  {
    title: "Direct Interaction",
    description:
      "Clients tap directly on designs to leave feedback. No more vague comments or confusing screenshots.",
    icon: "people" as const,
    accent: "#efe6ff",
  },
  {
    title: "Smart Analytics",
    description:
      "Automatically categorize feedback, identify patterns, and spot the most critical issues.",
    icon: "chart" as const,
    accent: "#def1b0",
  },
  {
    title: "Simple Sharing",
    description:
      "Generate review links in seconds. No login required for clients. Works on any device.",
    icon: "link" as const,
    accent: "#ffe26a",
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
  "Select sentiment (like / dislike / unsure)",
  "Choose issue category",
  "Add optional comments",
  "Done! No signup required",
];

export default function PublicHomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbfbfd] text-foreground">
      <PurpleBlob className="pointer-events-none absolute left-[-86px] top-[78px] h-[273px] w-[261px]" />
      <div className="pointer-events-none absolute right-[-128px] top-[106px] h-[266px] w-[266px] rounded-full bg-primary" />
      <PurpleBlob className="pointer-events-none absolute left-[-96px] bottom-[140px] h-[150px] w-[144px] opacity-100" />
      <PurpleBlob className="pointer-events-none absolute right-[-98px] bottom-[112px] h-[150px] w-[144px] opacity-100" flipped />

      <header className="border-b border-border/80 bg-white/90">
        <div className="mx-auto flex h-[60px] w-full max-w-[1412px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10">
              <LogoMark />
            </div>
            <span className="text-[30px] font-semibold tracking-[-0.06em] text-primary">
              taply
            </span>
          </Link>

          <nav className="hidden items-center gap-11 text-[15px] text-[#2a2a2f] md:flex">
            <Link href="#supporters" className="transition hover:text-primary">
              Supporters
            </Link>
            <HeartIcon />
            <Link
              href="#more"
              className="flex items-center gap-2 transition hover:text-primary"
            >
              <span>More</span>
              <ChevronDownIcon />
            </Link>
          </nav>

          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-[12px] bg-primary px-4 pr-5 pl-4 text-[16px] font-semibold text-white shadow-[0_10px_24px_rgba(112,33,248,0.26)] transition hover:bg-primary-strong"
          >
            <span className="flex items-center gap-2">
              <span>Start</span>
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-[1020px] flex-col items-center px-6 pt-[45px] text-center">
        <SectionBadge />

        <h1 className="mt-[34px] max-w-[890px] text-[53px] font-bold leading-[1.02] tracking-[-0.06em] text-[#24222b] md:text-[58px]">
          <span className="text-primary">Get clear feedback</span> without
          <br />
          long explanations
        </h1>

        <p className="mt-[24px] max-w-[652px] text-[18px] leading-[1.24] tracking-[-0.02em] text-[#8a8a8f] md:text-[19px]">
          Let your clients simply tap on your design and show exactly what
          they like or want to change - no confusion, no endless revisions.
        </p>

        <div className="mt-[25px] flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex h-9 items-center rounded-[9px] bg-primary px-5 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(112,33,248,0.28)] transition hover:bg-primary-strong"
          >
            Get Started
            <ArrowRightIcon />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-9 items-center rounded-[9px] border border-[#d9d9d9] bg-white px-5 text-[13px] font-semibold text-[#3b3b40] shadow-[0_4px_10px_rgba(0,0,0,0.02)] transition hover:border-border-strong"
          >
            See How it works
          </Link>
        </div>

        <div className="mt-[40px] flex items-center gap-[22px] text-[#cbcbcd]">
          <LinkedinIcon />
          <TelegramIcon />
          <GithubIcon />
          <span className="flex h-10 items-center gap-[6px] rounded-[11px] bg-[#cbcbcb] px-3 text-[14px] font-medium text-[#f7f7f7]">
            34 <SparkIcon />
          </span>
        </div>
      </section>

      <section className="mx-auto mt-[38px] grid w-full max-w-[1200px] gap-6 px-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-[20px] border border-[#dfd2ff] bg-[#fcfbff] px-6 py-5 shadow-[0_1px_0_rgba(255,255,255,0.8),0_10px_22px_rgba(67,40,130,0.05)]"
          >
            <div
              className="h-[32px] w-[32px] rounded-[9px] p-[4px]"
              style={{ backgroundColor: feature.accent }}
            >
              <FeatureIcon type={feature.icon} />
            </div>
            <h2 className="mt-4 text-[19px] font-semibold tracking-[-0.04em] text-[#25232b]">
              {feature.title}
            </h2>
            <p className="mt-2 text-[15px] leading-[1.25] tracking-[-0.01em] text-[#7f7d86]">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <section
        id="how-it-works"
        className="mx-auto mt-[60px] w-full max-w-[1200px] px-6 pb-[60px]"
      >
        <div className="rounded-[12px] border border-[#ece4ff] bg-[#faf8ff] px-6 py-12 shadow-[0_10px_24px_rgba(91,60,160,0.04)] md:px-10">
          <h2 className="text-center text-[36px] font-medium tracking-[-0.05em] text-[#25232b] md:text-[38px]">
            How it works
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-[19px] font-semibold tracking-[-0.03em] text-[#25232b]">
                For Designers
              </h3>
              <ol className="mt-3 space-y-3">
                {designerSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-2 text-[18px] text-[#7d7c85]"
                  >
                    <span className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-[3px] bg-primary text-[10px] font-semibold leading-none text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-[19px] font-semibold tracking-[-0.03em] text-[#25232b]">
                For Clients
              </h3>
              <ol className="mt-3 space-y-3">
                {clientSteps.map((step) => (
                  <li
                    key={step}
                    className="flex items-center gap-2 text-[18px] text-[#7d7c85]"
                  >
                    <span className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-[3px] bg-success text-white">
                      <CheckIcon />
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[980px] flex-col items-center px-6 pb-[54px] text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <LogoMark />
        </div>
        <h2 className="text-[31px] font-semibold tracking-[-0.05em] text-[#24222b] md:text-[32px]">
          Ready to collect better feedback?
        </h2>
        <p className="mt-3 max-w-[750px] text-[19px] leading-[1.3] tracking-[-0.02em] text-[#8d8d91]">
          Join designers who are getting precise, actionable feedback from
          their clients.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex h-9 items-center rounded-[9px] bg-primary px-4 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(112,33,248,0.28)] transition hover:bg-primary-strong"
        >
          Start for free
          <ArrowRightIcon />
        </Link>
      </section>

      <footer className="relative mt-[6px]">
        <div className="mx-auto w-full max-w-[1236px] px-6 pb-6">
          <div className="relative rounded-t-[18px] rounded-b-[8px] bg-primary px-8 pt-10 pb-8 text-white shadow-[0_18px_40px_rgba(112,33,248,0.24)]">
            <div className="absolute left-1/2 top-[-17px] flex h-[30px] w-[50px] -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_20px_rgba(112,33,248,0.22)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="m6 14 6-6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="text-center text-[15px] text-white/80">
              Developed by Mlue Code
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-[16px] font-semibold text-white/90">
              <Link href="#about">About</Link>
              <Link href="#services">Other services</Link>
              <Link href="#support">Support</Link>
              <Link href="#contact">Contact us</Link>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-4 text-[14px] text-white/75">
              <Link href="#terms">Terms & Conditions</Link>
              <span aria-hidden>|</span>
              <Link href="#privacy">Privacy policy</Link>
              <span aria-hidden>|</span>
              <Link href="#licenses">Licenses</Link>
            </div>

            <p className="mt-4 text-center text-[14px] tracking-[0.12em] text-white/75">
              (c) 2026 Taply All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
