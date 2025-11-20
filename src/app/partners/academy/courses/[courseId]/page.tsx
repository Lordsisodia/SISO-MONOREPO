import type { Metadata } from "next";
import { CourseProgramScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseProgramScreen";

export const metadata: Metadata = {
  title: "SISO Partner Academy • Course",
};

type CourseParams = { courseId: string };

export default async function CourseProgramPage({ params }: { params: Promise<CourseParams> }) {
  const { courseId } = await params;
  return <CourseProgramScreen courseId={courseId} />;
}
