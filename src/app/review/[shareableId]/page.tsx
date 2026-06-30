import ReviewProjectView from "@/components/workspace/ReviewProjectView";
import ReviewSessionView from "@/components/review/ReviewSessionView";

type ReviewShareablePageProps = {
  params: Promise<{ shareableId: string }>;
  searchParams: Promise<{
    view?: string | string[];
    name?: string | string[];
    description?: string | string[];
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

  if (view === "session") {
    return <ReviewSessionView shareableId={resolvedParams.shareableId} />;
  }

  return <ReviewProjectView projectName={projectName} projectDescription={projectDescription} />;
}
