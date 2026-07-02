import ReviewProjectView from "@/components/workspace/ReviewProjectView";
import ReviewSessionView from "@/components/review/ReviewSessionView";
import ClientReviewView from "@/components/review/ClientReviewView";

type ReviewShareablePageProps = {
  params: Promise<{ shareableId: string }>;
  searchParams: Promise<{
    view?: string | string[];
    name?: string | string[];
    description?: string | string[];
    sessionName?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReviewShareablePage({ params, searchParams }: ReviewShareablePageProps) {
  const [resolvedParams, query] = await Promise.all([params, searchParams]);
  const view = firstValue(query.view);
  const projectName = firstValue(query.name) || "Project Name";
  const projectDescription = firstValue(query.description) || "Descriptions...";
  const sessionName = firstValue(query.sessionName);

  if (view === "session") {
    return (
      <ReviewSessionView
        shareableId={resolvedParams.shareableId}
        sessionName={sessionName || undefined}
        projectName={projectName}
        projectDescription={projectDescription}
      />
    );
  }

  if (view === "client") {
    return <ClientReviewView shareableId={resolvedParams.shareableId} sessionName={sessionName || undefined} />;
  }

  return <ReviewProjectView projectName={projectName} projectDescription={projectDescription} />;
}
