import { Megaphone } from "lucide-react";
import {
  CommunityChannelScreen,
  type CommunityChannelScreenConfig,
} from "@/domains/partnerships/community/ui/general-chat";

const announcementsConfig: CommunityChannelScreenConfig = {
  channelId: "announcements",
  threadName: "Announcements",
  avatarLabel: "AN",
  hero: {
    icon: <Megaphone className="h-4 w-4" />,
    title: "Program announcements",
    subtitle: "Official SISO updates, release notes, and program alerts.",
    body: "Only the SISO team can post here. Follow up in #general-chat if you need clarity.",
    pill: "Team only",
  },
  highlightsSubtitle: "Signal from HQ",
  guidelinesSubtitle: "How to acknowledge updates",
  quickLinksSubtitle: "Docs & changelog",
  pinnedSubtitle: "Pinned updates",
  composerMode: "locked",
};

export function AnnouncementsScreen() {
  return <CommunityChannelScreen config={announcementsConfig} />;
}
