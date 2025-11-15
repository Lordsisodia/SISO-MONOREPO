import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const communityWidgets = [
  { title: "Messages", description: "Direct chats and threads with partners.", href: "/partners/community/messages" },
  { title: "Training Spotlight", description: "Weekly high-impact lesson.", href: "/partners/academy/training-spotlight" },
  { title: "Help Center", description: "FAQ, troubleshooting, and support inbox.", href: "/partners/community/help" },
];

export default function CommunityDashboardPage() {
  const router = useRouter();
  return (
    <PartnersPageShell>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title="Community Dashboard"
          description="See the social pulse, pinned guidelines, and quick ways to ask for help."
          metricValue="3"
          metricLabel="active threads"
          buttonText="Open #general-chat"
          onButtonClick={() => router.push("/partners/community/channels/general-chat")}
          icon={<span className="text-xl">💬</span>}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout icon={<span className="text-xl">✨</span>} title="Quick links" subtitle="Dive into the most active spots." showChevron={false}>
          <div className="space-y-3">
            {communityWidgets.map((widget) => (
              <div key={widget.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{widget.title}</p>
                  <p className="text-xs text-siso-text-muted">{widget.description}</p>
                </div>
                <Link href={widget.href} className="text-siso-orange text-[11px] uppercase tracking-[0.4em]">
                  Open
                </Link>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<span className="text-xl">📌</span>} title="Highlights" subtitle="Pinned, wins, and announcements" showChevron={false}>
          <div className="text-xs text-siso-text-muted space-y-2">
            <p>Wins posted this week: 4</p>
            <p>Announcements: 2 unread</p>
            <Button variant="outline" size="sm" className="border border-white/10">
              <Link href="/partners/community/announcements">View announcements</Link>
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </PartnersPageShell>
  );
}
