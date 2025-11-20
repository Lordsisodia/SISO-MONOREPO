"use client";

import { useEffect, useMemo, useState } from "react";
import type { DealSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const boardColumns: Array<{ id: DealSummary["stage"]; label: string }> = [
  { id: "qualified", label: "Qualified" },
  { id: "discovery" as DealSummary["stage"], label: "Discovery" },
  { id: "proposal", label: "Proposal" },
  { id: "negotiation", label: "Negotiation" },
  { id: "closing" as DealSummary["stage"], label: "Closing" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];

const statusBadges: Record<string, string> = {
  on_track: "border-emerald-500/50 text-emerald-200",
  risk: "border-amber-400/50 text-amber-200",
  stalled: "border-rose-400/50 text-rose-200",
};

const stageStatusCopy: Record<string, string> = {
  qualified: "Awaiting discovery roadmap",
  discovery: "Needs scoping workshop",
  proposal: "Deck in review with SISO",
  negotiation: "Terms under revision",
  closing: "Signature routing",
  won: "Implementation kickoff",
  lost: "Archive insights",
};

interface ActiveDealsBoardProps {
  deals: DealSummary[];
}

export function ActiveDealsBoard({ deals }: ActiveDealsBoardProps) {
  const [selectedStage, setSelectedStage] = useState<DealSummary["stage"] | "qualified">("qualified");

  useEffect(() => {
    if (deals.length === 0) return;
    const hasStage = deals.some((deal) => deal.stage === selectedStage);
    if (!hasStage) {
      setSelectedStage(deals[0].stage);
    }
  }, [deals, selectedStage]);

  const groupedDeals = useMemo(() => {
    return boardColumns.map((column) => ({
      ...column,
      deals: deals.filter((deal) => deal.stage === column.id),
    }));
  }, [deals]);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
        <span>Stage board</span>
        <span>{deals.length} deals in motion</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {groupedDeals.map((column) => (
          <button
            key={column.id}
            type="button"
            onClick={() => setSelectedStage(column.id)}
            className={cn(
              "rounded-full border px-4 py-1 text-xs uppercase tracking-[0.35em] transition",
              selectedStage === column.id ? "border-siso-orange bg-siso-orange/10 text-white" : "border-white/20 text-white/50",
            )}
          >
            {column.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {groupedDeals
          .filter((column) => column.id === selectedStage)
          .map((column) => (
            <div key={column.id} className="min-w-[260px] shrink-0">
              <Card className="border-white/10 bg-white/5">
                <CardHeader className="flex flex-col gap-1">
                  <CardTitle className="text-base text-white">{column.label}</CardTitle>
                  <CardDescription className="text-white/60">
                    {stageStatusCopy[column.id] ?? "In motion"} • {column.deals.length} deal{column.deals.length === 1 ? "" : "s"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {column.deals.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-xs text-white/40">No deals yet</p>
                  )}
                  {column.deals.map((deal) => (
                    <div key={deal.id} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm">
                      <div className="flex items-center justify-between text-white">
                        <span className="font-semibold">{deal.company}</span>
                        <span className="text-xs text-white/60">{formatCurrency(deal.amount)}</span>
                      </div>
                      <div className="mt-1 text-xs text-white/60">{deal.owner}</div>
                      <div className="mt-2 flex items-center justify-between text-xs text-white/60">
                        <span>{deal.agingDays}d aging</span>
                        <Badge className={cn("border text-[10px]", statusBadges[deal.health])}>
                          {deal.health === "risk" ? "Risk" : deal.health === "stalled" ? "Stalled" : "On Track"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    </section>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
