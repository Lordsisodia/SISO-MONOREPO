import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { TrackProgress } from "../data";
import { BarChart3 } from "lucide-react";

interface MyProgressSectionProps {
  summaries: TrackProgress[];
}

export function MyProgressSection({ summaries }: MyProgressSectionProps) {
  return (
    <SettingsGroupCallout
      icon={<BarChart3 className="h-4 w-4" />}
      title="My progress"
      subtitle="Track completion by training area"
      showChevron={false}
    >
      <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
        {summaries.map((sum) => (
          <article key={sum.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{sum.label}</h3>
            <div className="mt-2 h-2 w-full rounded-full bg-siso-bg-hover">
              <div className="h-2 rounded-full bg-siso-orange" style={{ width: `${sum.progress}%` }} />
            </div>
            <p className="mt-1 text-xs text-siso-text-muted">{sum.progress}% complete</p>
          </article>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}
