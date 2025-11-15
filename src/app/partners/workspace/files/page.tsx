import type { Metadata } from "next";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Workspace Files • SISO Partners",
  description: "Unified workspace storage for personal, client, and shared documents.",
};

const fileSegments = [
  {
    id: "my-files",
    title: "My Files",
    badge: "Private",
    description: "Personal drafts, meeting notes, and uploads only you can access.",
    helper: "1.8 GB of 5 GB",
    actions: [
      { label: "Open drive", variant: "default" as const },
      { label: "Upload", variant: "outline" as const },
    ],
  },
  {
    id: "client-files",
    title: "Client Files",
    badge: "Deals",
    description: "Structure collateral per opportunity with version history + approvals.",
    helper: "6 clients updated this week",
    actions: [
      { label: "View boards", variant: "default" as const },
      { label: "Request doc", variant: "outline" as const },
    ],
  },
  {
    id: "shared-files",
    title: "Shared Files",
    badge: "Team",
    description: "Partner-ready decks, playbooks, and assets managed by SISO Ops.",
    helper: "12 live links • 2 expiring soon",
    actions: [
      { label: "Browse library", variant: "default" as const },
      { label: "Manage access", variant: "outline" as const },
    ],
  },
];

const storageStats = [
  { label: "Storage used", value: "7.2 GB", helper: "of 20 GB allocation" },
  { label: "Client uploads", value: "18", helper: "+4 vs last week" },
  { label: "Shared links", value: "12", helper: "2 expiring" },
];

const recentActivity = [
  { id: "act-1", title: "Uploaded retail pitch kit", location: "Shared Files", timestamp: "3m ago" },
  { id: "act-2", title: "Helix Labs NDA signed", location: "Client Files", timestamp: "22m ago" },
  { id: "act-3", title: "Draft scope saved", location: "My Files", timestamp: "1h ago" },
];

export default function PartnersWorkspaceFilesPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <div className="space-y-6 p-4 text-white lg:p-8">
        <HighlightCard
          color="orange"
          title="Workspace files hub"
          description="Manage private drafts, deal folders, and shared partner assets without bouncing between routes."
          metricValue="3"
          metricLabel="spaces unified"
          buttonText="Upload file"
          onButtonClick={() => {
            if (typeof window !== "undefined") {
              document.getElementById("my-files")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          icon={<span className="text-xl">📂</span>}
          hideDivider
          titleClassName="uppercase tracking-[0.3em]"
          descriptionClassName="text-sm"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fileSegments.map((segment) => (
            <FileSegmentCard key={segment.id} segment={segment} />
          ))}
        </div>

        <SettingsGroupCallout icon={<span className="text-lg">📦</span>} title="Storage health" subtitle="Sync drives + monitor limits" showChevron={false}>
          <div className="grid gap-3 md:grid-cols-3">
            {storageStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.helper}</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<span className="text-lg">📄</span>} title="Recent activity" subtitle="Everything synced back to Pipeline" showChevron={false}>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{activity.title}</p>
                <p className="text-xs text-white/70">{activity.location}</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </PartnersPageShell>
  );
}

function FileSegmentCard({
  segment,
}: {
  segment: (typeof fileSegments)[number];
}) {
  return (
    <article id={segment.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{segment.title}</p>
          <p className="text-sm text-white/70">{segment.description}</p>
        </div>
        <Badge className="bg-white/15 text-white">{segment.badge}</Badge>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/60">{segment.helper}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {segment.actions.map((action) => (
          <Button
            key={`${segment.id}-${action.label}`}
            size="sm"
            variant={action.variant}
            className={action.variant === 'default' ? 'bg-white text-black hover:bg-white/90' : 'border-white/30 text-white hover:bg-white/10'}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </article>
  );
}
