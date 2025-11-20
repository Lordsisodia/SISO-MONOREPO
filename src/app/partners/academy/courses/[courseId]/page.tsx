import type { Metadata } from "next";
import { CourseProgramScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseProgramScreen";

export const metadata: Metadata = {
  title: "SISO Partner Academy • Course",
};

export default async function CourseProgramPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return <CourseProgramScreen courseId={courseId} />;
}
