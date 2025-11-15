import type { Metadata } from "next";
import { PitchKitScreen } from "@/domains/partnerships/portal-architecture/academy/ui/pitch-kit/PitchKitScreen";

export const metadata: Metadata = {
  title: "Pitch Kit • SISO Partner Academy",
  description: "Ready-to-share sales materials & templates for partners.",
};

export default function AcademyPitchKitPage() {
  return <PitchKitScreen />;
}
