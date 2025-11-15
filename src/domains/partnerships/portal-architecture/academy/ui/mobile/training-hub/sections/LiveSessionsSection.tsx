import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { LiveSession } from "../data";
import { CalendarClock } from "lucide-react";

interface LiveSessionsSectionProps {
  sessions: LiveSession[];
}

function buttonLabel(status: LiveSession["status"]) {
  if (status === "open") return "Join";
  if (status === "rsvp") return "RSVP";
  return "Watch replay";
}

export function LiveSessionsSection({ sessions }: LiveSessionsSectionProps) {
  return (
    <SettingsGroupCallout
      icon={<CalendarClock className="h-4 w-4" />}
      title="Live sessions"
      subtitle="Office hours and webinars"
      showChevron={false}
    >
      <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
        {sessions.map((s) => (
          <article key={s.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{s.title}</h3>
            <p className="text-xs text-siso-text-muted">{new Date(s.date).toLocaleString()}</p>
            <div className="mt-3">
              <button type="button" className="rounded-full border border-siso-border px-3 py-1 text-xs text-siso-text-muted">
                {buttonLabel(s.status)}
              </button>
            </div>
          </article>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}
