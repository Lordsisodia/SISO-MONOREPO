import Link from "next/link";
import { demoChannelCategories } from "@/domains/partnerships/workspace/application/demo-channel-registry";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { WorkspaceDemoHydrator } from "./WorkspaceDemoHydrator.client";

export default function PartnersWorkspacePage() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title="Workspace Dashboard"
          description="Plan your day: calendar, office hours, tasks, and notes in one place."
          metricValue="2"
          metricLabel="urgent tasks"
          buttonText="Open calendar"
          buttonHref="/partners/workspace/calendar"
          icon={<span className="text-xl">🗓️</span>}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout icon={<span className="text-xl">🛠️</span>} title="Quick tools" subtitle="Jump to where you need work." showChevron={false}>
          <div className="space-y-3 text-xs text-siso-text-muted">
            <Link href="/partners/workspace/tasks" className="text-siso-orange block">Tasks</Link>
            <Link href="/partners/workspace/notes/my-notes" className="text-siso-orange block">My Notes</Link>
            <Link href="/partners/workspace/files" className="text-siso-orange block">Files</Link>
          </div>
        </SettingsGroupCallout>

        <WorkspaceDemoHydrator categories={demoChannelCategories} />
      </div>
    </LazyPartnersPageShell>
  );
}
