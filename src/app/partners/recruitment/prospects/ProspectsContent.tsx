"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";
import { CustomDropdown } from "@/domains/partnerships/portal-architecture/settings/general/ui/CustomDropdown";
import { RecruitmentProspectCardGrid } from "./components/RecruitmentProspectCardGrid";
import type { RecruitmentSegmentFilter, SegmentOption, RecruitmentProspect } from "./types";
import { ArrowLeft, Calculator, Compass, Paperclip, Users2 } from "lucide-react";
import { recruitmentProspects } from "@/domains/partnerships/recruitment/prospects/data/prospects";

const pipelineHero = {
  title: "Recruitment pipeline",
  description: "Qualified recruits currently in motion.",
};

const recruitmentSegmentOptions: SegmentOption[] = [
  { value: "all", label: "All prospects", description: "View the entire recruitment queue." },
  { value: "potential", label: "Potential", description: "Early interest, needs outreach." },
  { value: "onboarding", label: "Onboarding", description: "Compliance + orientation in progress." },
  { value: "active", label: "Active", description: "Producing invites and referrals now." },
  { value: "dormant", label: "Dormant", description: "Stalled; needs new incentive." },
];

const lifecycleMeta: Record<RecruitmentProspect["segment"], { label: string; helper: string; indicator: string }> = {
  potential: { label: "Potential", helper: "Logged but not onboarded", indicator: "bg-orange-300" },
  onboarding: { label: "Onboarding", helper: "Compliance + orientation in progress", indicator: "bg-amber-200" },
  active: { label: "Active", helper: "Producing invites now", indicator: "bg-emerald-300" },
  dormant: { label: "Dormant", helper: "Needs new incentive", indicator: "bg-white/40" },
};

const resourceLinks = [
  { title: "Invite template", description: "Copy/paste outreach with incentive reminders." },
  { title: "Recruiting FAQ", description: "Answer common partner questions instantly." },
  { title: "Override calculator", description: "Estimate payouts per recruit.", href: "/partners/earnings/overview" },
];

export function RecruitmentProspectsContent() {
  const [segmentFilter, setSegmentFilter] = useState<RecruitmentSegmentFilter>("all");

  const filteredProspects = useMemo(
    () => (segmentFilter === "all" ? recruitmentProspects : recruitmentProspects.filter((prospect) => prospect.segment === segmentFilter)),
    [segmentFilter],
  );

  const totalProspects = recruitmentProspects.length;
  const segmentCounts = recruitmentProspects.reduce(
    (acc, prospect) => {
      acc[prospect.segment] += 1;
      return acc;
    },
    {
      potential: 0,
      onboarding: 0,
      active: 0,
      dormant: 0,
    },
  );

  const lifecycleSegments = (Object.keys(segmentCounts) as RecruitmentProspect["segment"][]).map((segment) => {
    const count = segmentCounts[segment];
    const percentage = totalProspects === 0 ? 0 : Math.round((count / totalProspects) * 100);
    const widthPercent = totalProspects === 0 ? 25 : (count / totalProspects) * 100;
    return {
      segment,
      count,
      percentage,
      widthPercent,
    };
  });

  const activeSegment = recruitmentSegmentOptions.find((option) => option.value === segmentFilter) ?? recruitmentSegmentOptions[0];

  const handleSegmentChange = (value: string) => {
    const next = recruitmentSegmentOptions.find((option) => option.value === value);
    setSegmentFilter(next ? next.value : "all");
  };

  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <section className="relative min-h-screen overflow-hidden bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.4, height: "120%" }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
        </div>

        <div className="relative z-10 space-y-6 p-4 lg:p-8">
          <div className="relative min-h-[128px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <Link
                href="/partners/recruitment"
                aria-label="Back to recruitment dashboard"
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
            <HighlightCard
              color="orange"
              title={pipelineHero.title}
              description={pipelineHero.description}
              icon={<Compass className="h-5 w-5" />}
              hideDivider
              showCornerIcon={false}
              titleClassName="uppercase tracking-[0.35em] text-white"
              descriptionClassName="text-sm"
              className="w-full pl-12"
            />
          </div>

          <SettingsGroupCallout icon={<Users2 className="h-4 w-4" />} title="Lifecycle snapshot" subtitle="See how recruits spread across their journey." showChevron={false}>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/60">
                  <span>Lifecycle mix</span>
                  <span className="text-xs font-semibold tracking-normal text-white/80">{totalProspects} total</span>
                </div>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/5" aria-label="Recruitment lifecycle distribution">
                  <div className="flex h-full w-full">
                    {lifecycleSegments.map((segment) => (
                      <span
                        key={segment.segment}
                        className={`${lifecycleMeta[segment.segment].indicator} block h-full shrink-0`}
                        style={{ width: `${segment.widthPercent}%` }}
                        aria-label={`${lifecycleMeta[segment.segment].label}: ${segment.count} recruits (${segment.percentage}%)`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-3 grid gap-2 text-[11px] text-white/80 sm:grid-cols-2">
                  {lifecycleSegments.map((segment) => (
                    <div key={segment.segment} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <span className={`h-2 w-2 rounded-full ${lifecycleMeta[segment.segment].indicator}`} aria-hidden="true" />
                          <span className="font-semibold uppercase tracking-[0.25em] text-white/80">{lifecycleMeta[segment.segment].label}</span>
                        </div>
                        <p className="text-[11px] text-white/60">{lifecycleMeta[segment.segment].helper}</p>
                      </div>
                      <span className="text-sm font-semibold text-white">{segment.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<Calculator className="h-4 w-4" />} title="Prospect filters" subtitle="Match the list to the lifecycle you want to inspect." showChevron={false}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Lifecycle stage</p>
                <span className="text-[11px] font-semibold text-white/70">
                  {filteredProspects.length} recruit{filteredProspects.length === 1 ? "" : "s"}
                </span>
              </div>
              <CustomDropdown
                options={recruitmentSegmentOptions}
                value={segmentFilter}
                onChange={handleSegmentChange}
                className="mt-3"
                allowCustom={false}
              />
              <p className="mt-2 text-xs text-white/70">{activeSegment.description}</p>
            </div>
          </SettingsGroupCallout>

          <RecruitmentProspectCardGrid prospects={filteredProspects} totalCount={totalProspects} activeFilterLabel={activeSegment.label} />

          <div className="grid gap-4">
            <SettingsGroupCallout icon={<Paperclip className="h-4 w-4" />} title="Quick resources" subtitle="Attach collateral before the next touch." showChevron={false}>
              <div className="space-y-3 text-sm text-white/70">
                {resourceLinks.map((resource) => (
                  <div key={resource.title} className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <p className="text-white">{resource.title}</p>
                    <p className="text-xs text-white/60">{resource.description}</p>
                    {resource.href ? (
                      <Link href={resource.href} className="text-[11px] uppercase tracking-[0.4em] text-siso-orange">
                        Open
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </SettingsGroupCallout>
          </div>
        </div>
      </section>
    </LazyPartnersPageShell>
  );
}

export default RecruitmentProspectsContent;
