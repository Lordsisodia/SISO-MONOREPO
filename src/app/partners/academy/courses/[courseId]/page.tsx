import { CourseDetailScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseDetailScreen";

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  return <CourseDetailScreen courseId={params.courseId} />;
}
