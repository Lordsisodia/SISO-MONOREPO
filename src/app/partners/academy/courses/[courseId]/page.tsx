import type { Metadata } from "next";
import { CourseDetailScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseDetailScreen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  return {
    title: `${courseId.replace(/-/g, " ")} • SISO Course`,
    description: "Course detail with syllabus and related assets.",
  };
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  return <CourseDetailScreen courseId={params.courseId} />;
}
