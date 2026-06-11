import { InteractiveFeedbackCanvas } from "@/components/feedback/InteractiveFeedbackCanvas";
import { getReviewSessionByShareableId } from "@/services/sessions.service";

type ReviewPageProps = {
  params: Promise<{
    shareableId: string;
  }>;
};

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { shareableId } = await params;
  const session = await getReviewSessionByShareableId(shareableId);

  return (
    <main className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-surface p-6 shadow-xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
          Review session
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          {session.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          {session.description}
        </p>
      </section>

      <InteractiveFeedbackCanvas pins={session.pins} />
    </main>
  );
}
