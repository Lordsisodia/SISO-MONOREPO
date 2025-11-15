import type { Metadata } from "next";
import { GettingStartedScreen } from "@/domains/partnerships/portal-architecture/academy/ui/getting-started/GettingStartedScreen";

export const metadata: Metadata = {
  title: "Getting Started • SISO Partner Academy",
  description: "Start the Academy onboarding checklist with the first lesson, office hours, and Saved Docs.",
};

export default function AcademyGettingStartedPage() {
  return <GettingStartedScreen />;
}
