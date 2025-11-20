import type { Metadata } from "next";
import { CourseLessonScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseLessonScreen";

export const metadata: Metadata = {
  title: "SISO Lesson • Partner Academy",
  description: "Lesson view with preview, assets, and actions.",
};

export default async function CourseLessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const { courseId, lessonId } = await params;
  return <CourseLessonScreen courseId={courseId} lessonId={lessonId} />;
}
