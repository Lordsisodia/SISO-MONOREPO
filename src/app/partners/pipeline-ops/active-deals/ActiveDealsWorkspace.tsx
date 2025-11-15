"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import type { DealSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Briefcase, DollarSign, FileText, Filter, MessageSquare, Search, Sparkles, Target } from "lucide-react";

const boardColumns: Array<{ id: DealSummary["stage"]; label: string; accent: string }> = [
  { id: "qualified", label: "Qualified", accent: "text-sky-300" },
  { id: "discovery", label: "Discovery", accent: "text-cyan-300" },
  { id: "proposal", label: "Proposal", accent: "text-blue-200" },
  { id: "negotiation", label: "Negotiation", accent: "text-amber-300" },
  { id: "closing", label: "Closing", accent: "text-fuchsia-200" },
  { id: "won", label: "Won", accent: "text-emerald-300" },
  { id: "lost", label: "Lost", accent: "text-rose-300" },
];

const stageStatusCopy: Record<string, string> = {
  qualified: "Awaiting discovery roadmap",
  discovery: "Needs scoping workshop",
  proposal: "Deck in review with SISO",
  negotiation: "Terms under revision",
  closing: "Signature routing",
  won: "Implementation kickoff",
  lost: "Archive insights",
};

const nextStepCopy: Record<string, string> = {
  qualified: "Schedule discovery call",
  discovery: "Upload requirements doc",
  proposal: "Share proposal with client",
  negotiation: "Review legal redlines",
  closing: "Confirm payment rails",
  won: "Send onboarding package",
  lost: "Log learnings",
};

const statusBadges: Record<string, string> = {
  on_track: "border-emerald-500/50 text-emerald-200",
  risk: "border-amber-400/50 text-amber-200",
  stalled: "border-rose-400/50 text-rose-200",
};

export interface ActiveDealsWorkspaceProps {
  initialDeals: DealSummary[];
}

export function ActiveDealsWorkspace({ initialDeals }: ActiveDealsWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<DealSummary["stage"] | "all">("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [selectedDealId, setSelectedDealId] = useState<string | null>(initialDeals[0]?.id ?? null);
  const [noteDraft, setNoteDraft] = useState("");

  const owners = useMemo(() => Array.from(new Set(initialDeals.map((deal) => deal.owner))), [initialDeals]);

  const filteredDeals = useMemo(() => {
    return initialDeals.filter((deal) => {
      const matchesStage = stageFilter === "all" ? true : deal.stage === stageFilter;
      const matchesOwner = ownerFilter === "all" ? true : deal.owner === ownerFilter;
      const matchesSearch = search.length === 0 ? true : deal.company.toLowerCase().includes(search.toLowerCase());
      return matchesStage && matchesOwner && matchesSearch;
    });
  }, [initialDeals, stageFilter, ownerFilter, search]);

  useEffect(() => {
    if (filteredDeals.length === 0) {
      setSelectedDealId(null);
      return;
    }
    if (!selectedDealId || !filteredDeals.some((deal) => deal.id === selectedDealId)) {
      setSelectedDealId(filteredDeals[0].id);
    }
  }, [filteredDeals, selectedDealId]);

  const selectedDeal = filteredDeals.find((deal) => deal.id === selectedDealId) ?? null;

  const pipelineValue = useMemo(() => filteredDeals.reduce((sum, deal) => sum + deal.amount, 0), [filteredDeals]);
  const commissionValue = useMemo(() => Math.round(pipelineValue * 0.12), [pipelineValue]);

  const healthSummary = useMemo(() => {
    return filteredDeals.reduce(
      (acc, deal) => {
        acc[deal.health] = (acc[deal.health] ?? 0) + 1;
        return acc;
      },
      {} as Record<DealSummary["health"], number>,
    );
  }, [filteredDeals]);

  const groupedDeals = useMemo(() => {
    return boardColumns.map((column) => ({
      ...column,
      deals: filteredDeals.filter((deal) => deal.stage === column.id),
    }));
  }, [filteredDeals]);

  const timelineItems: TimelineItem[] = selectedDeal
    ? [
        {
          id: "stage",
          title: `Stage · ${formatStage(selectedDeal.stage)}`,
          description: stageStatusCopy[selectedDeal.stage] ?? "In motion",
          timestamp: selectedDeal.lastActivityAt,
          status: "active",
        },
        {
          id: "activity",
          title: "Last Activity",
          description: new Date(selectedDeal.lastActivityAt).toLocaleString(),
          status: "completed",
        },
        {
          id: "next",
          title: "Next Step",
          description: nextStepCopy[selectedDeal.stage] ?? "Add next step",
          status: "pending",
        },
      ]
    : [];

  const nextSteps = selectedDeal
    ? [
        {
          id: "ns1",
          title: nextStepCopy[selectedDeal.stage] ?? "Define next step",
          due: addDays(new Date(), 3),
          owner: selectedDeal.owner,
        },
        {
          id: "ns2",
          title: "Update client on deliverables",
          due: addDays(new Date(), 6),
          owner: "SISO Pod",
        },
      ]
    : [];

  const comments = useMemo(
    () => [
      {
        id: "c1",
        author: "SISO Ops",
        message: "Demo build ETA 3 days. Need updated logo.",
        timestamp: "Nov 12, 10:05 AM",
      },
      {
        id: "c2",
        author: "Partner",
        message: "Client confirmed decision makers available next Tuesday.",
        timestamp: "Nov 11, 4:17 PM",
      },
    ],
    [],
  );

  return (
    <main className="min-h-screen bg-[#03040A] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-8">
        <Card className="overflow-hidden border-white/10 bg-gradient-to-r from-[#101828] via-[#0B1020] to-[#06080F] text-white">
          <CardContent className="flex flex-col gap-8 px-8 py-10 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4">
              <Badge variant="outline" className="border-white/30 bg-white/5 text-white">
                Pipeline Ops · Active Deals
              </Badge>
              <div>
                <h1 className="text-3xl font-semibold sm:text-4xl">Active Deals</h1>
                <p className="mt-3 text-base text-white/70">
                  Monitor SISO status updates, next steps, and commission forecasts for every in-flight opportunity.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-siso-orange text-black hover:bg-orange-400">
                  <Sparkles className="h-4 w-4" />
                  Request SISO help
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Log new note
                </Button>
              </div>
            </div>
            <div className="grid flex-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
              <HeroStat label="Pipeline" value={formatCurrency(pipelineValue)} helper="Filtered total" icon={Briefcase} />
              <HeroStat label="Expected commission" value={formatCurrency(commissionValue)} helper="12% est." icon={DollarSign} />
              <HeroStat label="At risk" value={`${healthSummary.risk ?? 0}`} helper="Deals flagged" icon={Target} />
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <section>
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <CardTitle className="text-base">Filters</CardTitle>
                  <CardDescription className="text-white/70">Stage, owner, and keyword search</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-white/60">
                  <Filter className="h-4 w-4" />
                  <span>{filteredDeals.length} deals</span>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Search</Label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                    <Search className="h-4 w-4 text-white/40" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search company"
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Stage</Label>
                  <Select value={stageFilter} onValueChange={(value) => setStageFilter(value as typeof stageFilter)}>
                    <SelectTrigger className="mt-2 w-full text-left text-white">
                      <SelectValue placeholder="All stages" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#070A12] text-white">
                      <SelectItem value="all">All stages</SelectItem>
                      {boardColumns.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {column.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Owner</Label>
                  <Select value={ownerFilter} onValueChange={(value) => setOwnerFilter(value)}>
                    <SelectTrigger className="mt-2 w-full text-left text-white">
                      <SelectValue placeholder="All owners" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#070A12] text-white">
                      <SelectItem value="all">All owners</SelectItem>
                      {owners.map((owner) => (
                        <SelectItem key={owner} value={owner}>
                          {owner}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid gap-4 overflow-x-auto lg:grid-cols-3 xl:grid-cols-4">
              {groupedDeals.map((column) => (
                <Card key={column.id} className="min-w-[220px] border-white/10 bg-white/5">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-semibold text-white">{column.label}</p>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        {column.deals.length}
                      </Badge>
                    </div>
                    <p className={cn("text-xs uppercase tracking-[0.3em]", column.accent)}>{column.id}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {column.deals.length === 0 && (
                      <p className="rounded-2xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-white/50">
                        No deals here yet
                      </p>
                    )}
                    {column.deals.map((deal) => (
                      <button
                        type="button"
                        onClick={() => setSelectedDealId(deal.id)}
                        key={deal.id}
                        className={cn(
                          "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                          selectedDealId === deal.id
                            ? "border-siso-orange bg-siso-orange/10"
                            : "border-white/10 bg-black/20 hover:border-white/30",
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-white">{deal.company}</p>
                          <p className="text-xs text-white/60">{formatCurrency(deal.amount)}</p>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-white/60">
                          <span>{deal.owner}</span>
                          <span>{deal.agingDays} days aging</span>
                        </div>
                        <Badge className={cn("mt-3 border text-[11px]", statusBadges[deal.health])}>
                          {deal.health === "risk" ? "Risk" : deal.health === "stalled" ? "Stalled" : "On Track"}
                        </Badge>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-8">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Deal detail</CardTitle>
                <CardDescription className="text-white/70">SISO status + commission tracker</CardDescription>
              </CardHeader>
              {selectedDeal ? (
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Company</p>
                    <p className="text-lg font-semibold text-white">{selectedDeal.company}</p>
                    <p className="text-sm text-white/60">{selectedDeal.owner}</p>
                  </div>
                  <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/30 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      <Badge className="border-white/20 bg-white/5 text-white/80">{stageStatusCopy[selectedDeal.stage]}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Value</span>
                      <span className="font-semibold">{formatCurrency(selectedDeal.amount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Commission</span>
                      <span className="font-semibold">{formatCurrency(Math.round(selectedDeal.amount * 0.12))}</span>
                    </div>
                  </div>
                  <Timeline items={timelineItems} showTimestamps={false} />
                </CardContent>
              ) : (
                <CardContent>
                  <p className="text-sm text-white/60">No deal selected. Choose a card from the board.</p>
                </CardContent>
              )}
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Next steps</CardTitle>
                <CardDescription className="text-white/70">From portal plan spec</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/80">
                {nextSteps.map((step) => (
                  <div key={step.id} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-white">{step.title}</p>
                      <Badge variant="outline" className="border-white/10 text-white/70">
                        {step.owner}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60">Due {step.due.toLocaleDateString()}</p>
                    <Button variant="ghost" className="mt-2 h-8 w-full border border-white/10 text-xs text-white" size="sm">
                      Mark done
                    </Button>
                  </div>
                ))}
                {nextSteps.length === 0 && <p className="text-xs text-white/60">Add a next step from the board.</p>}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Team comments</CardTitle>
                <CardDescription className="text-white/70">SISO + partner thread</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-40 space-y-3 pr-2">
                  {comments.map((comment) => (
                    <div key={comment.id} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm">
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span className="font-semibold text-white">{comment.author}</span>
                        <span>{comment.timestamp}</span>
                      </div>
                      <p className="mt-2 text-white/80">{comment.message}</p>
                    </div>
                  ))}
                </ScrollArea>
                <Textarea
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  rows={3}
                  placeholder="Leave a note for SISO"
                  className="mt-4 border-white/10 bg-black/40 text-sm"
                />
                <Button className="mt-2 w-full gap-2 bg-siso-orange text-black hover:bg-orange-400">
                  <MessageSquare className="h-4 w-4" />
                  Share update
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Attachments</CardTitle>
                <CardDescription className="text-white/70">Recent docs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                {["Proposal v2.pdf", "Asset Checklist.docx", "Client Brief.md"].map((doc) => (
                  <div key={doc} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-siso-orange" />
                      <span>{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-white">
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function HeroStat({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-white/60">{helper}</p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatStage(stage: string) {
  return stage.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}
