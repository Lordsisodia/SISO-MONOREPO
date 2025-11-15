import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { CertificationBadge } from "../data";
import { Award } from "lucide-react";

interface CertificationsSectionProps {
  badges: CertificationBadge[];
}

export function CertificationsSection({ badges }: CertificationsSectionProps) {
  return (
    <SettingsGroupCallout
      icon={<Award className="h-4 w-4" />}
      title="Certifications"
      subtitle="Milestones that unlock perks"
      showChevron={false}
    >
      <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
        {badges.map((b) => (
          <article key={b.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{b.title}</h3>
            <p className="text-xs text-siso-text-muted">{b.status}</p>
          </article>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}
