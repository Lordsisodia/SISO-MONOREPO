import { demoChannelCategories } from "@/domains/partnerships/workspace/application/demo-channel-registry";
import { WorkspaceDemoClient } from "@/domains/partnerships/workspace/ui/WorkspaceDemoClient";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PartnersWorkspacePage() {
  const router = useRouter();
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title="Workspace Dashboard"
          description="Plan your day: calendar, office hours, tasks, and notes in one place."
          metricValue="2"
          metricLabel="urgent tasks"
          buttonText="Open calendar"
          onButtonClick={() => router.push("/partners/workspace/calendar")}
          icon={<span className="text-xl">🗓️</span>}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout icon={<span className="text-xl">🛠️</span>} title="Quick tools" subtitle="Jump to where you need work." showChevron={false}>
          <div className="space-y-3 text-xs text-siso-text-muted">
            <Link href="/partners/workspace/tasks" className="text-siso-orange block">Tasks</Link>
            <Link href="/partners/workspace/notes/my-notes" className="text-siso-orange block">My Notes</Link>
            <Link href="/partners/workspace/files/my-files" className="text-siso-orange block">My Files</Link>
          </div>
        </SettingsGroupCallout>

        <WorkspaceDemoClient categories={demoChannelCategories} />
      </div>
    </PartnersPageShell>
  );
}
