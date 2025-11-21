"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  ProspectLifecycleStatus,
  ProspectSummary,
} from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { ProspectCardGrid } from "./ProspectCardGrid";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Users2, Filter, Paperclip } from "lucide-react";
import { CustomDropdown } from "@/domains/partnerships/portal-architecture/settings/general/ui/CustomDropdown";

export interface ProspectsWorkspaceProps {
  initialProspects: ProspectSummary[];
}

const lifecycleOrder: ProspectLifecycleStatus[] = ["potential", "onboarded", "active", "complete"];

const lifecycleMeta: Record<ProspectLifecycleStatus, { label: string; helper: string; indicator: string }> = {
  potential: {
    label: "Potential",
    helper: "Logged but not onboarded",
    indicator: "bg-orange-300",
  },
  onboarded: {
    label: "Onboarded",
    helper: "Completed intake",
    indicator: "bg-amber-200",
  },
  active: {
    label: "Active",
    helper: "In motion with SISO",
    indicator: "bg-emerald-300",
  },
  complete: {
    label: "Complete",
    helper: "Won / handoff ready",
    indicator: "bg-sky-300",
  },
};

type ProspectFilterValue = ProspectLifecycleStatus | "all";

type ProspectFilterOption = {
  value: ProspectFilterValue;
  label: string;
  description: string;
};

const FILTER_OPTIONS: ProspectFilterOption[] = [
  {
    value: "all",
    label: "All prospects",
    description: "Show every lifecycle bucket",
  },
  ...lifecycleOrder.map((status) => ({
    value: status,
    label: lifecycleMeta[status].label,
    description: lifecycleMeta[status].helper,
  })),
];

const resourceLinks = [
  { title: "Pipeline handoff checklist", description: "Confirm ops, contracts, and kickoff owners before marking complete." },
  { title: "Prospecting email kit", description: "Swipe copy blocks for nudges, recaps, and demo reminders." },
  { title: "Stage definitions", description: "Keep the lifecycle consistent across partners.", href: "/partners/pipeline-ops" },
];

export function ProspectsWorkspace({ initialProspects }: ProspectsWorkspaceProps) {
  const [statusFilter, setStatusFilter] = useState<ProspectFilterValue>("all");

  const lifecycleCounts = useMemo(
    () =>
      initialProspects.reduce(
        (acc, prospect) => {
          acc[prospect.status] += 1;
          return acc;
        },
        {
          potential: 0,
          onboarded: 0,
          active: 0,
          complete: 0,
        } as Record<ProspectLifecycleStatus, number>,
      ),
    [initialProspects],
  );

  const filteredProspects = useMemo(
    () => (statusFilter === "all" ? initialProspects : initialProspects.filter((prospect) => prospect.status === statusFilter)),
    [initialProspects, statusFilter],
  );

  const activeFilterOption = FILTER_OPTIONS.find((option) => option.value === statusFilter);
  const activeFilterLabel = activeFilterOption?.label ?? "All prospects";
  const activeFilterDescription = activeFilterOption?.description ?? "Show every lifecycle bucket";

  const handleStatusChange = (nextValue: string) => {
    const matched = FILTER_OPTIONS.find((option) => option.value === nextValue);
    setStatusFilter(matched ? matched.value : "all");
  };

  const totalProspects = lifecycleOrder.reduce((sum, status) => sum + lifecycleCounts[status], 0);
  const graphSegments = lifecycleOrder.map((status) => {
    const count = lifecycleCounts[status];
    const percentage = totalProspects === 0 ? 0 : Math.round((count / totalProspects) * 100);
    return {
      status,
      count,
      percentage,
    };
  });

  return (
    <section className="w-full space-y-6 text-white">
      <SettingsGroupCallout
        icon={<Users2 className="h-4 w-4" />}
        title="Lifecycle snapshot"
        subtitle="Keep a quick read on how prospects are distributed across their journey."
        showChevron={false}
      >
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/60">
              <span>Lifecycle mix</span>
              <span className="text-xs font-semibold tracking-normal text-white/80">{totalProspects} total</span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/5" aria-label="Lifecycle distribution graph">
              <div className="flex h-full w-full">
                {graphSegments.map((segment) => {
                  const widthPercent = totalProspects === 0 ? 25 : (segment.count / Math.max(totalProspects, 1)) * 100;
                  return (
                    <span
                      key={segment.status}
                      className={`${lifecycleMeta[segment.status].indicator} block h-full shrink-0`}
                      style={{ width: `${widthPercent}%` }}
                      aria-label={`${lifecycleMeta[segment.status].label}: ${segment.count} prospects (${segment.percentage}%)`}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-3 grid gap-2 text-[11px] text-white/80 sm:grid-cols-2">
              {graphSegments.map((segment) => (
                <div key={segment.status} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-white">
                      <span className={`h-2 w-2 rounded-full ${lifecycleMeta[segment.status].indicator}`} aria-hidden="true" />
                      <span className="font-semibold uppercase tracking-[0.25em] text-white/80">{lifecycleMeta[segment.status].label}</span>
                      <span className="text-white/50">·</span>
                      <span className="font-semibold text-white">{segment.count}</span>
                    </div>
                    <p className="text-[11px] text-white/60">{lifecycleMeta[segment.status].helper}</p>
                  </div>
                  <span className="text-sm font-semibold text-white">{segment.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout
        icon={<Filter className="h-4 w-4" />}
        title="Prospect filters"
        subtitle="Slice the list by lifecycle so you can focus the right follow-up."
        showChevron={false}
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Lifecycle status</p>
            <span className="text-[11px] font-semibold text-white/70">{filteredProspects.length} prospect{filteredProspects.length === 1 ? "" : "s"}</span>
          </div>
          <CustomDropdown
            options={FILTER_OPTIONS}
            value={statusFilter}
            onChange={handleStatusChange}
            className="mt-3"
            allowCustom={false}
          />
          <p className="mt-2 text-xs text-white/70">{activeFilterDescription}</p>
        </div>
      </SettingsGroupCallout>

      <ProspectCardGrid prospects={filteredProspects} activeFilterLabel={activeFilterLabel} />

      <SettingsGroupCallout icon={<Paperclip className="h-4 w-4" />} title="Quick resources" subtitle="Drop in collateral or reference guides without leaving this page." showChevron={false}>
        <div className="space-y-3 text-sm text-white/80">
          {resourceLinks.map((resource) => (
            <div key={resource.title} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-white">{resource.title}</p>
              <p className="text-xs text-white/60">{resource.description}</p>
              {resource.href ? (
                <Link href={resource.href} className="text-[11px] uppercase tracking-[0.35em] text-siso-orange">
                  Open
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </SettingsGroupCallout>
    </section>
  );
}
