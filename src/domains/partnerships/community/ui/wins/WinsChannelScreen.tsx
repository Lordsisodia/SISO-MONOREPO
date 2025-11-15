import { CommunityChannelScreen, type CommunityChannelScreenConfig } from "@/domains/partnerships/community/ui/general-chat/GeneralChatScreen";
import { communityChannels } from "@/domains/partnerships/community/data/channelPresets";

const channel = communityChannels.wins;

const winsChannelConfig: CommunityChannelScreenConfig = {
  channelId: "wins",
  threadName: "# wins",
  avatarLabel: "WN",
  hero: {
    icon: <channel.icon className="h-4 w-4" />,
    title: "Celebrate wins",
    subtitle: channel.description,
    body: "Share the before/after, outcome, and lessons. Posting unlocks once you reach Active tier after the intro challenge.",
    pill: "Read-only",
  },
  highlightsSubtitle: "Channel pulse",
  guidelinesSubtitle: "Win-sharing best practices",
  quickLinksSubtitle: "Helpful shortcuts",
  pinnedSubtitle: "Pinned reminders",
  composerMode: "locked",
};

export function WinsChannelScreen() {
  return <CommunityChannelScreen config={winsChannelConfig} />;
}
