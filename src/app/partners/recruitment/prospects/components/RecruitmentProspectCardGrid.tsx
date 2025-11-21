"use client";

import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Sparkles } from "lucide-react";
import type { RecruitmentProspect } from "../types";
import { RecruitmentProspectCard } from "./RecruitmentProspectCard";

interface RecruitmentProspectCardGridProps {
  prospects: RecruitmentProspect[];
  totalCount: number;
  activeFilterLabel: string;
}

export function RecruitmentProspectCardGrid({ prospects, totalCount, activeFilterLabel }: RecruitmentProspectCardGridProps) {
  const hasProspects = prospects.length > 0;
  const filterCopy =
    activeFilterLabel.toLowerCase() === "all prospects"
      ? "Tap into each recruit for invite history, compliance, and override context."
      : `Filtered by ${activeFilterLabel.toLowerCase()}.`;
  const subtitle = filterCopy;

  return (
    <section className="mt-4">
      <SettingsGroupCallout
        icon={<Sparkles className="h-4 w-4 text-siso-orange" />}
        title="Prospect roster"
        subtitle={subtitle}
        showChevron={false}
        endBadge={
          <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/70">
            {prospects.length}/{totalCount}
          </span>
        }
      >
        <div className="mt-3 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {hasProspects ? (
            prospects.map((prospect) => <RecruitmentProspectCard key={prospect.id} prospect={prospect} />)
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-white/60">
              {activeFilterLabel.toLowerCase() === "all prospects"
                ? "No recruits logged yet."
                : `No ${activeFilterLabel.toLowerCase()} recruits yet.`}
            </div>
          )}
        </div>
      </SettingsGroupCallout>
    </section>
  );
}
