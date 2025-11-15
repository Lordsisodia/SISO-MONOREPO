"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { SubmitClientForm } from "@/domains/partnerships/portal-architecture/pipeline-ops/ui/SubmitClientForm";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  Filter,
  Flame,
  Plus,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const stageColumns: Array<{ id: "prospect" | "qualified" | "demo_ready" | "negotiating"; label: string; accent: string }> = [
  { id: "prospect", label: "Prospecting", accent: "text-sky-300" },
  { id: "qualified", label: "Qualified", accent: "text-emerald-300" },
  { id: "demo_ready", label: "Demo Ready", accent: "text-indigo-300" },
  { id: "negotiating", label: "Negotiating", accent: "text-amber-300" },
];

const stageCopy: Record<string, string> = {
  prospect: "Gather intel and log call notes",
  qualified: "Prep next meeting + assets",
  demo_ready: "Align demo + success criteria",
  negotiating: "Share pricing + objection handling",
};

const temperatureStyles: Record<string, string> = {
  hot: "border-rose-300 text-rose-200",
  warm: "border-amber-300 text-amber-200",
  cold: "border-white/20 text-white/70",
};

export interface ProspectsWorkspaceProps {
  initialProspects: ProspectSummary[];
}

export function ProspectsWorkspace({ initialProspects }: ProspectsWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [tempFilter, setTempFilter] = useState<string>("all");
  const [selectedProspectId, setSelectedProspectId] = useState<string | null>(initialProspects[0]?.id ?? null);
  const [viewMode, setViewMode] = useState<"board" | "table">("board");
  const [noteDraft, setNoteDraft] = useState("");

  const owners = useMemo(() => Array.from(new Set(initialProspects.map((prospect) => prospect.owner))), [initialProspects]);

  const filteredProspects = useMemo(() => {
    return initialProspects
      .filter((prospect) =>
        search.length === 0
          ? true
          : prospect.company.toLowerCase().includes(search.toLowerCase()) || prospect.contactName.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((prospect) => (stageFilter === "all" ? true : deriveBoardStage(prospect) === stageFilter))
      .filter((prospect) => (ownerFilter === "all" ? true : prospect.owner === ownerFilter))
      .filter((prospect) => (tempFilter === "all" ? true : classifyTemperature(prospect.confidence) === tempFilter));
  }, [initialProspects, search, stageFilter, ownerFilter, tempFilter]);

  const selectedProspect = filteredProspects.find((prospect) => prospect.id === selectedProspectId) ?? filteredProspects[0] ?? null;

  const totalLeadValue = useMemo(() => filteredProspects.length, [filteredProspects]);
  const hotLeads = useMemo(() => filteredProspects.filter((p) => classifyTemperature(p.confidence) === "hot").length, [filteredProspects]);
  const conversionEstimate = useMemo(() => Math.round((hotLeads / Math.max(1, filteredProspects.length)) * 75), [filteredProspects.length, hotLeads]);

  const boardData = useMemo(() => {
    return stageColumns.map((column) => ({
      ...column,
      prospects: filteredProspects.filter((prospect) => deriveBoardStage(prospect) === column.id),
    }));
  }, [filteredProspects]);

  const timelineItems: TimelineItem[] = selectedProspect
    ? [
        {
          id: "stage",
          title: deriveBoardStage(selectedProspect).replace(/_/g, " "),
          description: stageCopy[deriveBoardStage(selectedProspect)] ?? "",
          status: "active",
          timestamp: selectedProspect.updatedAt,
        },
        {
          id: "contact",
          title: "Last touch",
          description: new Date(selectedProspect.updatedAt).toLocaleString(),
          status: "completed",
        },
        {
          id: "next",
          title: "Next action",
          description: selectedProspect.nextAction ?? "Define next step",
          status: "pending",
        },
      ]
    : [];

  const tasks = selectedProspect
    ? [
        { id: "task1", label: "Send prospecting deck", due: addDays(new Date(), 1) },
        { id: "task2", label: "Prep agenda for discovery call", due: addDays(new Date(), 3) },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#04040A] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-8">
        <Card className="overflow-hidden border-white/10 bg-gradient-to-r from-[#101828] via-[#0A0F1F] to-[#05070D] text-white">
          <CardContent className="flex flex-col gap-8 px-8 py-10 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4">
              <Badge variant="outline" className="border-white/30 bg-white/5 text-white">
                Pipeline Ops · My Prospects
              </Badge>
              <div>
                <h1 className="text-3xl font-semibold sm:text-4xl">My Prospects</h1>
                <p className="mt-3 text-base text-white/70">
                  Qualify leads, log next actions, and convert your best opportunities into active deals.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-siso-orange text-black hover:bg-orange-400">
                  <Plus className="h-4 w-4" />
                  Add prospect
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View Submit Client
                </Button>
              </div>
            </div>
            <div className="grid flex-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
              <HeroStat label="Leads" value={totalLeadValue.toString()} helper="Filtered" icon={Briefcase} />
              <HeroStat label="Hot" value={hotLeads.toString()} helper="Confidence ≥ 70%" icon={Flame} />
              <HeroStat label="Conversion" value={`${conversionEstimate}%`} helper="Forecast" icon={TrendingUp} />
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <section>
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <CardTitle className="text-base">Filters</CardTitle>
                  <CardDescription className="text-white/70">Stage, owner, lead temperature</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Filter className="h-4 w-4" />
                  {filteredProspects.length} prospects
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Search</Label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                    <Search className="h-4 w-4 text-white/40" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Company or contact"
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Stage</Label>
                  <Select value={stageFilter} onValueChange={(value) => setStageFilter(value)}>
                    <SelectTrigger className="mt-2 w-full text-left text-white">
                      <SelectValue placeholder="All stages" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#070A12] text-white">
                      <SelectItem value="all">All stages</SelectItem>
                      {stageColumns.map((column) => (
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
                <div>
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Temperature</Label>
                  <Select value={tempFilter} onValueChange={(value) => setTempFilter(value)}>
                    <SelectTrigger className="mt-2 w-full text-left text-white">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#070A12] text-white">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-white/10 bg-white/5">
              <CardHeader className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Pipeline view</CardTitle>
                  <CardDescription className="text-white/70">Drag-friendly layout for prospect stages</CardDescription>
                </div>
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
                  <TabsList className="bg-black/40 text-white/60">
                    <TabsTrigger value="board" className="data-[state=active]:bg-white data-[state=active]:text-black">
                      Board
                    </TabsTrigger>
                    <TabsTrigger value="table" className="data-[state=active]:bg-white data-[state=active]:text-black">
                      Table
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {viewMode === "board" ? (
                  <div className="grid gap-4 overflow-x-auto lg:grid-cols-4">
                    {boardData.map((column) => (
                      <Card key={column.id} className="min-w-[220px] border-white/10 bg-black/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between text-sm">
                            <p className="font-semibold text-white">{column.label}</p>
                            <Badge variant="outline" className="border-white/20 text-white/70">
                              {column.prospects.length}
                            </Badge>
                          </div>
                          <p className={cn("text-xs uppercase tracking-[0.3em]", column.accent)}>{column.id}</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {column.prospects.length === 0 && (
                            <p className="rounded-2xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-white/50">
                              No prospects
                            </p>
                          )}
                          {column.prospects.map((prospect) => (
                            <button
                              type="button"
                              key={prospect.id}
                              onClick={() => setSelectedProspectId(prospect.id)}
                              className={cn(
                                "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                                selectedProspect?.id === prospect.id
                                  ? "border-siso-orange bg-siso-orange/10"
                                  : "border-white/10 bg-black/20 hover:border-white/30",
                              )}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold text-white">{prospect.company}</p>
                                <span className="text-xs text-white/60">{Math.round(prospect.confidence * 100)}%</span>
                              </div>
                              <p className="text-xs text-white/60">{prospect.contactName}</p>
                              <Badge className={cn("mt-3 border text-[11px]", temperatureStyles[classifyTemperature(prospect.confidence)])}>
                                {classifyTemperature(prospect.confidence)}
                              </Badge>
                            </button>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-white/80">
                      <thead className="text-xs uppercase tracking-[0.3em] text-white/50">
                        <tr>
                          <th className="px-3 py-2 text-left">Company</th>
                          <th className="px-3 py-2 text-left">Contact</th>
                          <th className="px-3 py-2 text-left">Stage</th>
                          <th className="px-3 py-2 text-left">Confidence</th>
                          <th className="px-3 py-2 text-left">Next action</th>
                          <th className="px-3 py-2 text-left">Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProspects.map((prospect) => (
                          <tr key={prospect.id} className="border-t border-white/5">
                            <td className="px-3 py-2 font-medium text-white">{prospect.company}</td>
                            <td className="px-3 py-2">{prospect.contactName}</td>
                            <td className="px-3 py-2">{deriveBoardStage(prospect)}</td>
                            <td className="px-3 py-2">{Math.round(prospect.confidence * 100)}%</td>
                            <td className="px-3 py-2">{prospect.nextAction ?? "–"}</td>
                            <td className="px-3 py-2">{prospect.owner}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-8">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Prospect detail</CardTitle>
                <CardDescription className="text-white/70">Contact, tags, timeline</CardDescription>
              </CardHeader>
              {selectedProspect ? (
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Company</p>
                    <p className="text-lg font-semibold text-white">{selectedProspect.company}</p>
                    <p className="text-sm text-white/60">{selectedProspect.contactName}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedProspect.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-white/20 text-white/70">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Confidence</span>
                      <span className="font-semibold">{Math.round(selectedProspect.confidence * 100)}%</span>
                    </div>
                    <Progress value={selectedProspect.confidence * 100} className="mt-2" />
                    <div className="mt-3 flex items-center justify-between">
                      <span>Stage</span>
                      <Badge className="border-white/10 bg-white/5 text-white/80">{deriveBoardStage(selectedProspect)}</Badge>
                    </div>
                  </div>
                  <Timeline items={timelineItems} showTimestamps={false} />
                </CardContent>
              ) : (
                <CardContent>
                  <p className="text-sm text-white/60">No prospect selected. Pick one from the board.</p>
                </CardContent>
              )}
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Due today</CardTitle>
                <CardDescription className="text-white/70">Complete nudges from the spec</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                {tasks.map((task) => (
                  <div key={task.id} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{task.label}</p>
                      <Badge variant="outline" className="border-white/10 text-white/70">
                        Due {task.due.toLocaleDateString()}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 w-full border border-white/10 text-xs text-white">
                      Mark complete
                    </Button>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-xs text-white/60">Assign an action from the board.</p>}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Automation</CardTitle>
                <CardDescription className="text-white/70">Drip + reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                <AutomationRow title="Nurture touch" status="Running" icon={Sparkles} />
                <AutomationRow title="Reminder ping" status="Scheduled" icon={Calendar} />
                <AutomationRow title="Research pack" status="Draft" icon={BookOpen} />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base">Ready to submit?</CardTitle>
                  <CardDescription className="text-white/70">Use the quick intake</CardDescription>
                </div>
                <Sparkles className="h-5 w-5 text-siso-orange" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[420px] pr-2">
                  <SubmitClientForm />
                </ScrollArea>
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

function AutomationRow({ title, status, icon: Icon }: { title: string; status: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-siso-orange" />
        <span>{title}</span>
      </div>
      <Badge variant="outline" className="border-white/20 text-white/70">
        {status}
      </Badge>
    </div>
  );
}

function deriveBoardStage(prospect: ProspectSummary): "prospect" | "qualified" | "demo_ready" | "negotiating" {
  if (prospect.stage === "prospect") return "prospect";
  if (prospect.confidence >= 0.85) return "negotiating";
  if (prospect.confidence >= 0.65) return "demo_ready";
  return "qualified";
}

function classifyTemperature(confidence: number) {
  if (confidence >= 0.7) return "hot" as const;
  if (confidence >= 0.4) return "warm" as const;
  return "cold" as const;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}
