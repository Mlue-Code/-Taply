import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import AssetIcon from "@/components/shared/AssetIcon";
import ghostIcon from "../../public/Icon-assets/ghost.svg";
import messageTextIcon from "../../public/Icon-assets/message-text.svg";
import linkIcon from "../../public/Icon-assets/link.svg";
import folderOpenIcon from "../../public/Icon-assets/folder-open.svg";
import fluentCheckBox from "../../public/Icon-assets/fluent_checkbox.svg";

export const metadata: Metadata = {
  title: "How It Works | Taply",
  description:
    "A detailed guide to how Taply works for designers, clients, and review sessions.",
};

function SectionBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[18px] border border-[#ece6ff] bg-white p-6 shadow-[0_14px_30px_rgba(58,20,126,0.06)] sm:p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7a2bf8]">{eyebrow}</p>
      <h2 className="mt-3 text-[28px] font-semibold leading-tight text-[#1f1d25] sm:text-[32px]">{title}</h2>
      <div className="mt-5 text-[15px] leading-7 text-[#6f6b78]">{children}</div>
    </section>
  );
}

function StepItem({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4 rounded-[14px] border border-[#f0e9ff] bg-[#fbf9ff] p-4">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
        {index}
      </span>
      <div>
        <h3 className="text-[15px] font-semibold text-[#1f1d25]">{title}</h3>
        <p className="mt-1 text-[14px] leading-6 text-[#7b7487]">{description}</p>
      </div>
    </li>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#fbfbff] text-[#1c1340]">
      <Navbar
        variant="home"
        actionLabel="Start Now"
        actionHref="/workspace"
        actionIcon={<IconArrowRight size={12} stroke={2.4} />}
      />

      <section className="mx-auto w-full max-w-[1110px] px-4 pb-16 pt-10 xl:px-0">
        <div className="rounded-[24px] border border-[#ece6ff] bg-white px-6 py-8 shadow-[0_20px_50px_rgba(58,20,126,0.08)] sm:px-8 sm:py-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f4efff] px-4 py-2 text-[12px] font-semibold text-[#7a2bf8]">
            <AssetIcon src={ghostIcon} className="h-[14px] w-[14px]" />
            Taply Guide
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="max-w-[760px] text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1f1d25] sm:text-[56px]">
                How Taply works for designers, clients, and review teams
              </h1>
              <p className="mt-5 max-w-[760px] text-[16px] leading-7 text-[#6f6b78] sm:text-[17px]">
                Taply is a feedback workspace for design review. Designers upload their work, create a shareable review
                session, and clients leave clear feedback directly on the design. The result is a cleaner workflow, fewer vague
                comments, and faster design decisions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/workspace"
                  className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-primary px-5 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(112,33,248,0.22)] transition hover:bg-primary-strong"
                >
                  Go to Workspace
                  <IconArrowRight size={14} stroke={2.4} />
                </Link>
                <a
                  href="#designer-flow"
                  className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-[#e1d8f5] bg-white px-5 text-[14px] font-semibold text-[#2a2830] transition hover:border-[#c9b6ff]"
                >
                  Read the flow
                </a>
              </div>
            </div>

            <aside className="rounded-[20px] border border-[#ece6ff] bg-[#faf8ff] p-5">
              <h2 className="text-[18px] font-semibold text-[#1f1d25]">Quick summary</h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-[14px] leading-6 text-[#6f6b78]">
                  <AssetIcon src={folderOpenIcon} className="mt-[2px] h-[18px] w-[18px]" />
                  Designers create projects and upload designs.
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-6 text-[#6f6b78]">
                  <AssetIcon src={linkIcon} className="mt-[2px] h-[18px] w-[18px]" />
                  A session link is generated for clients to open.
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-6 text-[#6f6b78]">
                  <AssetIcon src={messageTextIcon} className="mt-[2px] h-[18px] w-[18px]" />
                  Clients add feedback by clicking on the design.
                </li>
                <li className="flex items-start gap-3 text-[14px] leading-6 text-[#6f6b78]">
                  <AssetIcon src={fluentCheckBox} className="mt-[2px] h-[18px] w-[18px]" />
                  Designers review comments, markers, and insights in one place.
                </li>
              </ul>
            </aside>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <SectionBlock eyebrow="Designer Flow" title="What the designer does">
            <div id="designer-flow" className="space-y-4">
              <p>
                The designer starts in the workspace. They create a project, upload one or more design files, and name the
                project so the team can recognize it later.
              </p>
              <p>
                Once the designs are ready, the designer creates a review session. Taply generates a shareable client link,
                and that link opens the client review page.
              </p>
              <p>
                On the designer side, the project page shows uploaded designs, review sessions, and feedback summaries. This is
                where the designer can keep everything organized and return to the same project later.
              </p>
            </div>
          </SectionBlock>

          <SectionBlock eyebrow="Client Flow" title="What the client does">
            <p>
              The client does not need to sign in. They open the review link, see the design on screen, pick a tool from the
              toolbar, and click directly on the design to leave feedback.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <IconCheck size={18} className="mt-[2px] shrink-0 text-[#7a2bf8]" />
                <span>Use the toolbar to choose what kind of action to perform.</span>
              </li>
              <li className="flex gap-3">
                <IconCheck size={18} className="mt-[2px] shrink-0 text-[#7a2bf8]" />
                <span>Tap or click the design to place a comment at the exact position.</span>
              </li>
              <li className="flex gap-3">
                <IconCheck size={18} className="mt-[2px] shrink-0 text-[#7a2bf8]" />
                <span>Submit the comment and keep moving through the design or switch to the next one.</span>
              </li>
            </ul>
          </SectionBlock>

          <SectionBlock eyebrow="Review Session" title="What happens inside a session">
            <p>
              A review session is the shared review room for a project. It contains the selected designs, the public link, and
              all submitted feedback for that round.
            </p>
            <p className="mt-4">
              If a project has multiple designs, the client can move between them one by one. Taply keeps the feedback tied to
              the exact design so the designer knows which image each comment belongs to.
            </p>
            <p className="mt-4">
              The session page also lets the designer see the list of feedback, read comments, and understand which design is
              getting which type of response.
            </p>
          </SectionBlock>

          <SectionBlock eyebrow="Feedback Tools" title="How the toolbar works">
            <p>
              The toolbar gives the client simple actions for the design. In the current MVP, the main goal is to make feedback
              easy to place and easy to understand.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <IconCheck size={18} className="mt-[2px] shrink-0 text-[#7a2bf8]" />
                <span>Cursor for normal browsing and selection.</span>
              </li>
              <li className="flex gap-3">
                <IconCheck size={18} className="mt-[2px] shrink-0 text-[#7a2bf8]" />
                <span>Add and Comment for placing feedback on the design.</span>
              </li>
              <li className="flex gap-3">
                <IconCheck size={18} className="mt-[2px] shrink-0 text-[#7a2bf8]" />
                <span>Pin for quick marker-style feedback.</span>
              </li>
              <li className="flex gap-3">
                <IconCheck size={18} className="mt-[2px] shrink-0 text-[#7a2bf8]" />
                <span>Pen for freehand markup where it is useful.</span>
              </li>
            </ul>
          </SectionBlock>

          <SectionBlock eyebrow="Storage" title="Where Taply keeps your data">
            <p>
              Taply uses browser state for fast UI updates, and the backend stores designs and feedback in the shared review
              data source. That means the designer can return to a project later and still see the collected feedback.
            </p>
            <p className="mt-4">
              In the MVP, local state is also used so the workspace stays responsive while you create projects, upload designs,
              and start sessions. The goal is to keep the workflow light and fast for day-to-day review.
            </p>
          </SectionBlock>
        </div>

        <section className="mt-8 rounded-[20px] border border-[#ece6ff] bg-[#faf8ff] px-6 py-8 shadow-[0_14px_30px_rgba(58,20,126,0.06)] sm:px-8">
          <h2 className="text-[24px] font-semibold text-[#1f1d25]">The complete flow in one view</h2>
          <ol className="mt-5 grid gap-4 lg:grid-cols-3">
            <StepItem
              index="1"
              title="Create a project"
              description="The designer starts with a project name and description so the team knows what they are reviewing."
            />
            <StepItem
              index="2"
              title="Upload designs and create a session"
              description="Design files are added, a review session is created, and the shareable client link is generated."
            />
            <StepItem
              index="3"
              title="Clients leave feedback"
              description="Clients open the link, use the review tools, and leave comments on exact parts of the design."
            />
          </ol>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[20px] border border-[#ece6ff] bg-white p-6 shadow-[0_14px_30px_rgba(58,20,126,0.06)]">
            <h2 className="text-[22px] font-semibold text-[#1f1d25]">Why Taply exists</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6f6b78]">
              Taply is meant to solve a simple problem: design feedback is often unclear. Instead of long messages like
              &quot;move this a bit&quot; or screenshots with no context, Taply lets people point to the exact area they mean.
              That makes feedback easier to understand, easier to organize, and easier to act on.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#6f6b78]">
              For designers, that means faster revisions. For clients, it means a very simple interface. For the product team,
              it means a clearer path from upload to approval.
            </p>
          </div>

          <div className="rounded-[20px] border border-[#ece6ff] bg-[linear-gradient(180deg,#7a2bf8_0%,#5f17e8_100%)] p-6 text-white shadow-[0_18px_40px_rgba(112,33,248,0.22)]">
            <h2 className="text-[22px] font-semibold">Current MVP scope</h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-7 text-white/90">
              <li>Upload design images</li>
              <li>Generate a shareable review link</li>
              <li>Click or tap on the design</li>
              <li>Add simple textual feedback</li>
              <li>Display markers and comments</li>
              <li>Keep the flow simple for both designers and clients</li>
            </ul>
          </div>
        </section>
      </section>

      <SiteFooter variant="home" />
    </main>
  );
}
