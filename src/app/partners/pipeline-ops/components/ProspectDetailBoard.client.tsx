"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { ProspectSummary, PipelineStage } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Link2, MessageSquare, Paperclip, Plus, Send, Upload, Users, Sparkles } from "lucide-react";

const stageOrder: PipelineStage[] = ["prospect", "qualified", "proposal", "negotiation", "won", "lost"];
const stageLabels: Record<PipelineStage, string> = {
  prospect: "Prospect",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

const stageDescriptions: Record<PipelineStage, string> = {
  prospect: "Lead logged — awaiting discovery",
  qualified: "Discovery complete, scoping next",
  proposal: "Proposal drafted or in review",
  negotiation: "Pricing, terms, or scope under revision",
  won: "Ready to hand off to Active Deals",
  lost: "Archived and optionally recycled",
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
};

const nextStepDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function ProspectDetailBoard({ prospect }: { prospect: ProspectSummary }) {
  const initialStage: PipelineStage = stageOrder.includes(prospect.stage as PipelineStage)
    ? (prospect.stage as PipelineStage)
    : "prospect";

  const [stage] = useState<PipelineStage>(initialStage);
  const updatedLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(prospect.updatedAt)),
    [prospect.updatedAt],
  );
  const [confidence, setConfidence] = useState(Math.round(prospect.confidence * 100));
  const [nextAction, setNextAction] = useState(prospect.nextAction ?? "Send follow-up");
  const [companyType, setCompanyType] = useState(prospect.tags?.[0] ?? "Consumer brand");
  const [website, setWebsite] = useState(`https://${prospect.company.replace(/\s+/g, "").toLowerCase()}.com`);
  const [socialHandle, setSocialHandle] = useState(`@${prospect.company.replace(/\s+/g, "").toLowerCase()}`);
  const [appPlanLink, setAppPlanLink] = useState("https://docs.siso.so/app-plan-demo");
  const [budgetNotes, setBudgetNotes] = useState("$120K platform + $15K ops retainer");
  const [firstContact, setFirstContact] = useState("2025-10-28");
  const [timelineNotes, setTimelineNotes] = useState("Kickoff Jan · Launch Apr");
  const [noteDraft, setNoteDraft] = useState("");

  const initialNextSteps = useMemo(
    () => [
      {
        id: "ns_current",
        title: prospect.nextAction ?? "Send follow-up",
        due: addDays(new Date(), 3),
        owner: prospect.owner,
        complete: false,
      },
      {
        id: "ns_demo",
        title: "Schedule scoping workshop",
        due: addDays(new Date(), 7),
        owner: prospect.owner,
        complete: false,
      },
    ],
    [prospect.nextAction, prospect.owner],
  );
  const [nextSteps, setNextSteps] = useState(initialNextSteps);

  const initialActivities = useMemo(
    () => [
      {
        id: "act1",
        author: prospect.owner,
        message: "Logged discovery call and captured requirements.",
        timestamp: "Nov 11, 2:14 PM",
      },
      {
        id: "act2",
        author: "You",
        message: "Shared portfolio links and pricing bands.",
        timestamp: "Nov 9, 5:42 PM",
      },
    ],
    [prospect.owner],
  );
  const [activities, setActivities] = useState(initialActivities);

  const attachments = useMemo(
    () => [
      { id: "doc1", name: "Discovery notes.pdf", size: "420 KB" },
      { id: "doc2", name: "Pricing bands.xlsx", size: "88 KB" },
    ],
    [],
  );

  const handleToggleStep = (id: string) => {
    setNextSteps((steps) => steps.map((step) => (step.id === id ? { ...step, complete: !step.complete } : step)));
  };

  const handleAddNote = () => {
    if (!noteDraft.trim()) return;
    setActivities((activity) => [
      {
        id: `act_${Date.now()}`,
        author: "You",
        message: noteDraft.trim(),
        timestamp: new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      },
      ...activity,
    ]);
    setNoteDraft("");
  };

  return (
    <div className="space-y-6">
      <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Prospect summary" subtitle="Keep context, stage, and owner info in one glance." showChevron={false}>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Company</p>
                <h2 className="text-3xl font-semibold text-white">{prospect.company}</h2>
                <a href={`mailto:${prospect.contactEmail}`} className="text-sm text-white/70 hover:text-white">
                  {prospect.contactName} · {prospect.contactEmail}
                </a>
              </div>
              <div className="space-y-2 text-right">
                <Badge className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em]">{stageLabels[stage]}</Badge>
                <p className="text-[11px] text-white/60">{stageDescriptions[stage]}</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Company type
                <input value={companyType} onChange={(event) => setCompanyType(event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
              </label>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Updated
                <input readOnly value={updatedLabel} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/80" />
              </label>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Website / social
                <div className="mt-1 flex flex-col gap-2">
                  <input value={website} onChange={(event) => setWebsite(event.target.value)} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
                  <input value={socialHandle} onChange={(event) => setSocialHandle(event.target.value)} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
                </div>
              </label>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Stage
                <div className="mt-1 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80">{stageLabels[stage]}</div>
              </label>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Confidence
                <div className="mt-2 flex items-center gap-3">
                  <input type="range" min={10} max={95} step={1} value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} className="flex-1 accent-siso-orange" />
                  <span className="text-sm text-white">{confidence}%</span>
                </div>
              </label>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Owner
                <input value={prospect.owner} readOnly className="mt-1 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/80" />
              </label>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Next action
                <input value={nextAction} onChange={(event) => setNextAction(event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="gap-2 bg-siso-orange text-black hover:bg-orange-400">
                Promote to Active Deal
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Share summary
              </Button>
            </div>
          </div>
        </section>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Link2 className="h-4 w-4" />} title="Deal logistics" subtitle="Budget, timelines, and app plan references" showChevron={false}>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-xs uppercase tracking-[0.35em] text-white/50">
              App plan link
              <input value={appPlanLink} onChange={(event) => setAppPlanLink(event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
            </label>
            <label className="text-xs uppercase tracking-[0.35em] text-white/50">
            Budget summary
            <textarea value={budgetNotes} onChange={(event) => setBudgetNotes(event.target.value)} rows={2} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
          </label>
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">
            First contact
            <input type="date" value={firstContact} onChange={(event) => setFirstContact(event.target.value)} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
          </label>
            <label className="text-xs uppercase tracking-[0.35em] text-white/50">
              Timeline notes
              <textarea value={timelineNotes} onChange={(event) => setTimelineNotes(event.target.value)} rows={2} className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white" />
            </label>
          </div>
        </div>
      </SettingsGroupCallout>

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsGroupCallout icon={<ArrowRight className="h-4 w-4" />} title="Next steps" subtitle="Keep each stage moving with due dates" showChevron={false}>
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
            {nextSteps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => handleToggleStep(step.id)}
                className={cn(
                  "w-full rounded-2xl border px-3 py-3 text-left text-sm transition",
                  step.complete ? "border-siso-orange bg-siso-orange/10" : "border-white/10 bg-black/30",
                )}
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{step.owner}</span>
                  <span>Due {nextStepDateFormatter.format(step.due)}</span>
                </div>
                <p className="mt-2 text-white">{step.title}</p>
                <p className="text-xs text-white/60">{step.complete ? "Marked complete" : "Tap to mark complete"}</p>
              </button>
            ))}
            <Button variant="ghost" className="w-full gap-2 border border-dashed border-white/20 text-white" size="sm">
              <Plus className="h-4 w-4" /> Add step
            </Button>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<MessageSquare className="h-4 w-4" />} title="Activity" subtitle="Notes, calls, and emails appear here" showChevron={false}>
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="space-y-2">
              <textarea
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                rows={2}
                placeholder="Log a quick update"
                className="w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white"
              />
              <Button size="sm" className="w-full gap-2 bg-white/20 text-white hover:bg-white/30" onClick={handleAddNote}>
                <Send className="h-4 w-4" /> Post update
              </Button>
            </div>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>{activity.author}</span>
                    <span>{activity.timestamp}</span>
                  </div>
                  <p className="mt-2 text-white/80">{activity.message}</p>
                </div>
              ))}
            </div>
          </div>
        </SettingsGroupCallout>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsGroupCallout icon={<Users className="h-4 w-4" />} title="Stakeholders" subtitle="Buying committee members" showChevron={false}>
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <p className="font-semibold">{prospect.contactName}</p>
              <p className="text-xs text-white/60">Primary contact · {prospect.contactEmail}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="font-semibold">Alex Jordan</p>
              <p className="text-xs text-white/60">CTO · alex@{prospect.company.toLowerCase().split(" ").join("")}.com</p>
            </div>
            <Button variant="ghost" size="sm" className="w-full gap-2 border border-dashed border-white/20 text-white">
              <Users className="h-4 w-4" /> Add stakeholder
            </Button>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<Paperclip className="h-4 w-4" />} title="Files" subtitle="Proposals, notes, and uploads" showChevron={false}>
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
            {attachments.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-siso-orange" />
                  <span>{file.name}</span>
                </div>
                <span className="text-xs text-white/60">{file.size}</span>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full gap-2 border border-dashed border-white/20 text-white">
              <Upload className="h-4 w-4" /> Upload file
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </div>
  );
}
