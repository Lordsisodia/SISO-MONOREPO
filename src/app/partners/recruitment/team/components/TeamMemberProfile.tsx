"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { TeamMember } from "@/domains/partnerships/recruitment/team/data/members";
import { Mail, MessageCircle, Phone, Sparkles, Target, Users } from "lucide-react";

const trainingStatusStyles: Record<string, string> = {
  clear: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
  due: "border-amber-400/40 bg-amber-500/10 text-amber-200",
  blocked: "border-rose-400/40 bg-rose-500/10 text-rose-200",
};

export function TeamMemberProfile({ member }: { member: TeamMember }) {
  const metrics = [
    { label: "Invites this month", value: member.invitesThisMonth.toString(), description: "Live outreach sequences" },
    { label: "Referrals YTD", value: member.referralsYtd.toString(), description: "Approved + paid" },
    { label: "Active deals", value: member.liveDeals.toString(), description: "In pipeline ops" },
    { label: "Readiness", value: member.readiness, description: member.mentorStatus },
  ];

  return (
    <div className="space-y-6">
      <SettingsGroupCallout icon={<Users className="h-4 w-4" />} title="Summary" subtitle="Coverage, readiness, and focus." showChevron={false}>
        <div className="space-y-4 text-sm text-white/80">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white/10 text-white">{member.tier}</Badge>
            <Badge variant="outline" className="border-white/20 text-white">
              {member.status}
            </Badge>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/60">{member.timezone}</span>
          </div>
          <p className="text-lg font-semibold text-white">{member.name}</p>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">{member.role}</p>
          <p>{member.bio}</p>
          <div className="grid gap-3 text-xs text-white/70 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Focus</p>
              <p className="mt-1 text-sm text-white">{member.focus}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Coverage</p>
              <p className="mt-1 text-sm text-white">{member.coverage}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Readiness</p>
              <p className="mt-1 text-sm text-white">{member.readiness}</p>
              <p className="text-[11px] text-white/60">{member.mentorStatus}</p>
            </div>
          </div>
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Performance snapshot" subtitle="Proactive signals for the pod" showChevron={false}>
        <div className="grid gap-3 text-white grid-cols-2 max-[340px]:grid-cols-1 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">{metric.label}</p>
              <p className="text-3xl font-semibold leading-tight">{metric.value}</p>
              <p className="text-xs text-white/70">{metric.description}</p>
            </article>
          ))}
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Target className="h-4 w-4" />} title="Next actions" subtitle="Keep the rep unblocked" showChevron={false}>
        <div className="space-y-3">
          {member.actions.map((action) => (
            <div key={action.id} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{action.title}</p>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">{action.due}</span>
              </div>
              <p className="text-xs text-white/60">Owner: {action.owner}</p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{action.type}</p>
            </div>
          ))}
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Target className="h-4 w-4" />} title="Training & readiness" subtitle="Compliance + academy checkpoints" showChevron={false}>
        <div className="space-y-3">
          {member.training.map((item) => (
            <div key={item.id} className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-white">{item.label}</p>
                <p className="text-xs text-white/60">{item.detail}</p>
              </div>
              <Badge variant="outline" className={`w-fit ${trainingStatusStyles[item.status] ?? "text-white"}`}>
                {item.status === "clear" ? "Clear" : item.status === "due" ? "Due" : "Blocked"}
              </Badge>
            </div>
          ))}
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Wins & notes" subtitle="Remind the pod why they lead." showChevron={false}>
        <div className="space-y-3 text-sm text-white/80">
          <ul className="list-disc space-y-1 pl-5">
            {member.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </div>
      </SettingsGroupCallout>

      <SettingsGroupCallout icon={<Mail className="h-4 w-4" />} title="Contact & support" subtitle="Drop assets or get them help fast." showChevron={false}>
        <div className="grid gap-3 text-sm text-white/80 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Email</p>
            <p className="mt-1 text-white">{member.contact.email}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Phone</p>
            <p className="mt-1 text-white">{member.contact.phone}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Slack</p>
            <p className="mt-1 text-white">{member.contact.slack}</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <Button size="sm" className="flex items-center gap-2 bg-white text-black hover:bg-white/90">
              <MessageCircle className="h-4 w-4" /> DM
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> Call
            </Button>
          </div>
        </div>
      </SettingsGroupCallout>
    </div>
  );
}
