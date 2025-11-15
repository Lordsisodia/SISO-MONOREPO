import { SettingsDetailLayout } from "../../../settings/components/SettingsDetailLayout";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";

const updates: TimelineItem[] = [
  { id: "tier", title: "Tier Progress", description: "Tier tracker moved to Earnings → Tier Progress.", timestamp: "Nov 11" },
  { id: "pipeline", title: "Pipeline Ops", description: "Prospects and Active Deals routes now live.", timestamp: "Nov 10" },
];

export function WhatsNewView() {
  return (
    <SettingsDetailLayout
      title="Announcements"
      description="Release notes and program announcements."
      icon={<span className="text-lg">✨</span>}
    >
      <Timeline items={updates} />
    </SettingsDetailLayout>
  );
}
