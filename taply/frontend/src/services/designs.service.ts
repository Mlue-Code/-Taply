import type { Design } from "@/types/api.types";

const designs: Design[] = [
  {
    id: "design_1",
    name: "Hero concept",
    description: "A bold first-pass layout for the landing page.",
  },
  {
    id: "design_2",
    name: "Mobile navigation",
    description: "Navigation patterns optimized for smaller screens.",
  },
];

export async function getDesigns(): Promise<Design[]> {
  return designs;
}
