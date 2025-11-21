"use client";

import Link from "next/link";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { RecruitmentProspect } from "../types";
import { Calendar, FileText, Mail, MapPin, MessageCircle, Sparkles, Target, Users2 } from "lucide-react";

const complianceTone: Record<RecruitmentProspect["complianceStatus"], string> = {
  pending: "text-amber-200 bg-amber-500/10 border-amber-300/40",
  cleared: "text-emerald-200 bg-emerald-500/10 border-emerald-300/40",
  blocked: "text-rose-200 bg-rose-500/10 border-rose-400/40",
};

export function RecruitmentProspectProfile({ prospect }: { prospect: RecruitmentProspect }) {
  const progressPct = Math.round(prospect.progress * 100);
  const stats = [
    { label: "Deals closed", value: prospect.dealsClosed.toString(), helper: "Before official activation" },
    { label: "Revenue to date", value: `$${prospect.revenueToDate.toLocaleString()}`, helper: "Approved + paid" },
    { label: "Override", value: `${prospect.overrideBps} bps`, helper: "Proposed split" },
  ];

  return (
    <div className="space-y-6">
      <SettingsGroupCallout icon={<Users2 className="h-4 w-4" />} title="Prospect summary" subtitle="Contact, mentor, and sourcing" showChevron={false}>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-sm text-white/80">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white/10 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.25em] text-white">{prospect.tier}</Badge>
            <Badge className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-[0.25em] ${complianceTone[prospect.complianceStatus]}`}>
              {prospect.complianceStatus === "pending" ? "Compliance pending" : prospect.complianceStatus === "cleared" ? "Compliance cleared" : "Needs attention"}
            </Badge>
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.25em] text-white/60">
              {prospect.segment}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-semibold text-white">{prospect.candidateName}</p>
            <p className="text-sm text-white/70">{prospect.email}</p>
          </div>
          <div className="mt-4 grid gap-3 text-xs text-white/70 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Referral source</p>
              <p className="mt-1 text-sm text-white">{prospect.referralSource}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Mentor</p>
              <p className="mt-1 text-sm text-white">{prospect.mentor}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Timezone</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-white">
                <MapPin className="h-4 w-4" /> {prospect.timezone}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Last contact</p>
              <p className="mt-1 text-sm text-white">{prospect.lastContactAgo}</p>
            </div>
          </div>
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Performance snapshot" subtitle="Signals before activation" showChevron={false}>
        <div className="grid gap-3 text-white sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              <p className="text-xs text-white/70">{stat.helper}</p>
            </article>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Activation progress</p>
          <div className="mt-2 flex items-center gap-3">
            <Progress value={progressPct} className="h-2 flex-1 bg-white/10" />
            <span className="text-sm font-semibold">{progressPct}%</span>
          </div>
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Target className="h-4 w-4" />} title="Next actions" subtitle="Tackle the blockers" showChevron={false}>
        <div className="space-y-3">
          {prospect.tasks.map((task) => (
            <div key={task.id} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{task.title}</p>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">Due {task.due}</span>
              </div>
              <p className="text-xs text-white/60">Owner: {task.owner}</p>
              <p className="text-[11px] text-white/60">Status: {task.complete ? "Complete" : "Open"}</p>
            </div>
          ))}
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Calendar className="h-4 w-4" />} title="Timeline" subtitle="Invite flow checkpoints" showChevron={false}>
        <div className="grid gap-3 text-sm text-white/80 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Invite sent</p>
            <p className="mt-1 text-white">{new Date(prospect.inviteSentOn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Last action</p>
            <p className="mt-1 text-white">{prospect.lastAction}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Next action</p>
            <p className="mt-1 text-white">{prospect.nextAction}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Mentor</p>
            <p className="mt-1 text-white">{prospect.mentor}</p>
          </div>
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<FileText className="h-4 w-4" />} title="Attachments & notes" subtitle="Drop context before the next touch" showChevron={false}>
        <div className="space-y-4 text-sm text-white/80">
          <div className="space-y-2">
            {prospect.attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <span>{attachment.name}</span>
                <span className="text-xs text-white/60">{attachment.size}</span>
              </div>
            ))}
          </div>
          <ul className="list-disc space-y-1 pl-5">
            {prospect.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </SettingsGroupCallout>

      {/* Reach out section removed per latest design feedback */}
    </div>
  );
}
