import type { Metadata } from "next";
import { CourseDetailScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseDetailScreen";

export async function generateMetadata({ params }: { params: { courseId: string } }): Promise<Metadata> {
  return {
    title: `${params.courseId.replace(/-/g, " ")} • SISO Course`,
    description: "Course detail with syllabus and related assets.",
  };
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  return <CourseDetailScreen courseId={params.courseId} />;
}
