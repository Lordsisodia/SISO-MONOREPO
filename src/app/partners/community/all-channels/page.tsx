import type { Metadata } from "next";
import { AllChannelsScreen } from "@/domains/partnerships/community/ui/all-channels";

export const metadata: Metadata = {
  title: "All Channels • SISO Partner Community",
  description: "Directory of partner community spaces, plus what's launching next.",
};

export default function PartnersCommunityAllChannelsPage() {
  return <AllChannelsScreen />;
}
