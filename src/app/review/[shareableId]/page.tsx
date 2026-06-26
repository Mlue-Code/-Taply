import ReviewProjectView from "@/components/workspace/ReviewProjectView";

type ReviewShareablePageProps = {
  params: Promise<{ shareableId: string }>;
  searchParams: Promise<{
    name?: string | string[];
    description?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReviewShareablePage({
  searchParams,
}: ReviewShareablePageProps) {
  const params = await searchParams;
  const projectName = firstValue(params.name) || "Project Name";
  const projectDescription = firstValue(params.description) || "Descriptions...";

  return <ReviewProjectView projectName={projectName} projectDescription={projectDescription} />;
}
