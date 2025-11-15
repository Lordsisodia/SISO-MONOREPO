import type { Metadata } from "next";
import { CourseCatalogScreen } from "@/domains/partnerships/portal-architecture/academy/ui/courses/CourseCatalogScreen";

export const metadata: Metadata = {
  title: "Courses • SISO Partner Academy",
  description: "Searchable catalog of academy courses, progress, and related assets.",
};

export default function AcademyCoursesPage() {
  return <CourseCatalogScreen />;
}
