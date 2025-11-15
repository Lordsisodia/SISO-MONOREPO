import type { Metadata } from "next";
import { AnnouncementsScreen } from "@/domains/partnerships/community/ui/announcements";

export const metadata: Metadata = {
  title: "# announcements • SISO Partner Community",
  description: "Official SISO updates, release notes, and program alerts.",
};

export default function PartnersCommunityAnnouncementsPage() {
  return <AnnouncementsScreen />;
}
