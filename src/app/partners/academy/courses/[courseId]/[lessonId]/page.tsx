import type { Metadata } from "next";
import { CourseLessonScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseLessonScreen";

export async function generateMetadata({ params }: { params: { courseId: string; lessonId: string } }): Promise<Metadata> {
  return {
    title: `${params.lessonId.replace(/-/g, " ")} • SISO Lesson`,
    description: "Lesson view with preview, assets, and actions.",
  };
}

export default function CourseLessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  return <CourseLessonScreen courseId={params.courseId} lessonId={params.lessonId} />;
}
