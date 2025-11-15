import type { Metadata } from "next";
import { WinsChannelScreen } from "@/domains/partnerships/community/ui/wins/WinsChannelScreen";
import { communityChannels } from "@/domains/partnerships/community/data/channelPresets";

const channel = communityChannels.wins;

export const metadata: Metadata = {
  title: "# wins • SISO Partner Community",
  description: channel.description,
};

export default function PartnersCommunityWinsPage() {
  return <WinsChannelScreen />;
}
