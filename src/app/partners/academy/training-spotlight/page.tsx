import type { Metadata } from "next";
import { TrainingSpotlightScreen } from "@/domains/partnerships/portal-architecture/academy/ui/training-spotlight/TrainingSpotlightScreen";

export const metadata: Metadata = {
  title: "Training Spotlight • SISO Partner Academy",
  description: "Weekly high-impact lesson callout with reasons, preview, and next steps.",
};

export default function AcademyTrainingSpotlightPage() {
  return <TrainingSpotlightScreen />;
}
