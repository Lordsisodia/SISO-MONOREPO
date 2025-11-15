import { Clock3, Pin } from "lucide-react";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { ThreadOverview } from "../DirectoryOverlay";
import { ThreadRow } from "./ThreadRow";

type ThreadSection = {
  label: string;
  entries: ThreadOverview[];
};

type DirectorySectionsProps = {
  sections: ThreadSection[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
};

export function DirectorySections({ sections, activeThreadId, onSelectThread }: DirectorySectionsProps) {
  const sectionConfig = (label: string) => {
    switch (label.toLowerCase()) {
      case "pinned":
        return {
          icon: <Pin className="h-4 w-4" />,
          title: "Pinned",
          subtitle: "Keep these threads within one tap.",
          emptyCopy: "No pinned threads yet.",
        };
      case "recent":
        return {
          icon: <Clock3 className="h-4 w-4" />,
          title: "Recent",
          subtitle: "Latest chats and automations you touched.",
          emptyCopy: "No recent conversations.",
        };
      default:
        return {
          icon: <Clock3 className="h-4 w-4" />,
          title: label,
          subtitle: undefined,
          emptyCopy: "Nothing to show yet.",
        };
    }
  };

  return (
    <div className="space-y-3">
      {sections.length > 0 ? (
        sections.map(({ label, entries }) => (
          <SettingsGroupCallout
            key={label}
            icon={sectionConfig(label).icon}
            title={sectionConfig(label).title}
            subtitle={sectionConfig(label).subtitle}
            showChevron={false}
          >
            <div className="rounded-[22px] border border-white/10 bg-white/5 px-3 py-3">
              {entries.length ? (
                <div className="space-y-1">
                  {entries.map((thread) => (
                    <ThreadRow
                      key={thread.id}
                      thread={thread}
                      isActive={thread.id === activeThreadId}
                      onSelect={() => onSelectThread(thread.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4 text-center text-xs text-siso-text-muted">
                  {sectionConfig(label).emptyCopy}
                </div>
              )}
            </div>
          </SettingsGroupCallout>
        ))
      ) : (
        <div className="rounded-3xl border border-dashed border-siso-border/80 bg-siso-bg-secondary/60 px-4 py-5 text-center text-sm text-siso-text-muted">
          You’re all caught up.
          <button type="button" className="ml-1 text-siso-orange underline-offset-4 hover:underline">
            Discover new partners
          </button>
        </div>
      )}
    </div>
  );
}
