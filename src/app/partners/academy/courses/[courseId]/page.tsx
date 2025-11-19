import type { Metadata } from "next";
import { CourseProgramScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseProgramScreen";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { courseId: string } }): Metadata {
  return {
    title: `${params.courseId.replace(/-/g, " ")} • SISO Partner Academy`,
  };
}

export default function CourseProgramPage({ params }: { params: { courseId: string } }) {
  return <CourseProgramScreen courseId={params.courseId} />;
}
