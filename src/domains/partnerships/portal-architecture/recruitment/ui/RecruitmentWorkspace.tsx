'use client';

import { useCallback, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import type { RecruitmentInvite } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  DollarSign,
  Filter,
  Link as LinkIcon,
  Mail,
  Search,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const teamStructure = [
  {
    id: "owner",
    name: "You",
    tier: "Performer",
    earnings: 18450,
    recruits: [
      { id: "p1", name: "Lisa Ortega", tier: "Active", deals: 4, earnings: 6200 },
      { id: "p2", name: "Chase Reed", tier: "Starter", deals: 2, earnings: 1800 },
      { id: "p3", name: "Harper Singh", tier: "Active", deals: 5, earnings: 7600 },
    ],
  },
];

const recruitmentResources = [
  { id: "email", label: "Email templates", description: "High-converting outreach copy" },
  { id: "social", label: "Social graphics", description: "Share-ready carousel + story" },
  { id: "deck", label: "Partner deck", description: "Explain SISO program" },
];

const funnelTimeline: TimelineItem[] = [
  {
    id: "invited",
    title: "Invited",
    description: "Send personal invite",
    status: "completed",
  },
  {
    id: "engaged",
    title: "Engaged",
    description: "Partner booked orientation",
    status: "active",
  },
  {
    id: "active",
    title: "Active",
    description: "Logged first client",
    status: "pending",
  },
];

export interface RecruitmentWorkspaceProps {
  invites: RecruitmentInvite[];
}

const inviteDateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });

const formatInviteDate = (sentAt: string): string => {
  try {
    return inviteDateFormatter.format(new Date(sentAt));
  } catch (error) {
    return sentAt;
  }
};

export function RecruitmentWorkspace({ invites }: RecruitmentWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newInvite, setNewInvite] = useState({ name: "", email: "", share: "200" });
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);
  const inviteFormRef = useRef<HTMLFormElement | null>(null);

  const handleScrollToForm = useCallback(() => {
    inviteFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filteredInvites = useMemo(() => {
    return invites
      .filter((invite) =>
        search.length === 0
          ? true
          : invite.partnerName.toLowerCase().includes(search.toLowerCase()) || invite.email.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((invite) => (statusFilter === "all" ? true : invite.status === statusFilter));
  }, [invites, search, statusFilter]);

  const stats = useMemo(() => {
    const pending = invites.filter((invite) => invite.status === "pending").length;
    const accepted = invites.filter((invite) => invite.status === "accepted").length;
    const overrideEarnings = 24800;
    return {
      total: invites.length,
      pending,
      accepted,
      overrideEarnings,
    };
  }, [invites]);

  const pendingInvites = invites.filter((invite) => invite.status === "pending");

  const handleSendInvite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInviteSuccess(`Invite sent to ${newInvite.email}. They’ll receive ${newInvite.share} bps overrides.`);
    setNewInvite((prev) => ({ ...prev, name: "", email: "" }));
  };

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <div className="space-y-6 p-4 text-white lg:p-8">
        <HighlightCard
          title="Recruitment Hub"
          description="Invite partners, monitor referrals, and track override earnings in one place."
          metricValue={`${stats.pending}/${stats.total}`}
          metricLabel="Pending / total invites"
          buttonText="New invite"
          onButtonClick={handleScrollToForm}
          icon={<Sparkles className="h-5 w-5" />}
          color="orange"
          className="w-full max-w-none"
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_1fr]">
          <div className="space-y-6">
            <SettingsGroupCallout icon={<Mail className="h-4 w-4" />} title="Send invite" subtitle="Personalized referral for new partners" showChevron={false}>
              <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <form ref={inviteFormRef} onSubmit={handleSendInvite} className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Name</Label>
                    <Input
                      value={newInvite.name}
                      onChange={(event) => setNewInvite((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Alex Carter"
                      className="mt-2 border-white/10 bg-white/5 text-white"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Email</Label>
                    <Input
                      type="email"
                      value={newInvite.email}
                      onChange={(event) => setNewInvite((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="alex@siso.partners"
                      className="mt-2 border-white/10 bg-white/5 text-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Override (bps)</Label>
                    <Select value={newInvite.share} onValueChange={(value) => setNewInvite((prev) => ({ ...prev, share: value }))}>
                      <SelectTrigger className="mt-2 w-full border-white/10 bg-white/5 text-left text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#070A12] text-white">
                        {(["150", "200", "250", "300"] as const).map((bps) => (
                          <SelectItem key={bps} value={bps}>
                            {bps} bps
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-3 flex flex-wrap gap-3">
                    <Button type="submit" className="gap-2 bg-siso-orange text-black hover:bg-orange-400">
                      <Mail className="h-4 w-4" />
                      Send invite
                    </Button>
                    <Button type="button" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={handleScrollToForm}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View team earnings
                    </Button>
                    {inviteSuccess && <p className="text-sm text-emerald-300">{inviteSuccess}</p>}
                  </div>
                </form>

                <div className="grid gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 sm:grid-cols-3">
                  <HeroStat label="Invites" value={stats.total.toString()} helper="All time" icon={Users} />
                  <HeroStat label="Pending" value={stats.pending.toString()} helper="Awaiting acceptance" icon={Target} />
                  <HeroStat label="Override" value={`$${stats.overrideEarnings.toLocaleString()}`} helper="Paid to date" icon={DollarSign} />
                </div>
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<Filter className="h-4 w-4" />}
              title="Recruitment pipeline"
              subtitle="Search, filter, and action every invite"
              showChevron={false}
            >
              <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
                  <div className="inline-flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {filteredInvites.length} results
                  </div>
                  <div className="text-white/70">Accepted: {stats.accepted}</div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Search</Label>
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
                      <Search className="h-4 w-4 text-white/40" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Name or email"
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Status</Label>
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                      <SelectTrigger className="mt-2 w-full border-white/10 bg-black/40 text-left text-white">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#070A12] text-white">
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="rounded-3xl border border-white/10">
                    <table className="w-full text-sm text-white/80">
                      <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-white/50">
                        <tr>
                          <th className="px-4 py-3 text-left">Partner</th>
                          <th className="px-4 py-3 text-left">Email</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Reward</th>
                          <th className="px-4 py-3 text-left">Sent</th>
                          <th className="px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvites.map((invite) => (
                          <tr key={invite.id} className="border-t border-white/5">
                            <td className="px-4 py-3 font-medium text-white">{invite.partnerName}</td>
                            <td className="px-4 py-3">{invite.email}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={cn("border-white/20 text-xs uppercase", badgeForStatus(invite.status))}>
                                {invite.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">{invite.rewardShareBps} bps</td>
                            <td className="px-4 py-3">{formatInviteDate(invite.sentAt)}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="text-xs text-white/80">
                                  Resend
                                </Button>
                                <Button variant="ghost" size="sm" className="text-xs text-white/80">
                                  Cancel
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3 md:hidden">
                  {filteredInvites.map((invite) => (
                    <div key={invite.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-base font-semibold text-white">{invite.partnerName}</p>
                        <Badge variant="outline" className={cn("border-white/20 text-[11px] uppercase", badgeForStatus(invite.status))}>
                          {invite.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/60">{invite.email}</p>
                      <div className="mt-3 grid grid-cols-2 gap-4 text-xs text-white/70">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">Reward</p>
                          <p className="text-sm text-white">{invite.rewardShareBps} bps</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">Sent</p>
                          <p className="text-sm text-white">{formatInviteDate(invite.sentAt)}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button variant="ghost" size="sm" className="flex-1 border border-white/10 text-xs text-white">
                          Resend
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 border border-white/10 text-xs text-white">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SettingsGroupCallout>
          </div>

          <div className="space-y-6">
            <SettingsGroupCallout icon={<LinkIcon className="h-4 w-4" />} title="Referral link" subtitle="Share with potential partners" showChevron={false}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/80">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Personal link</p>
                <p className="mt-2 break-all text-white">https://siso.partners/join/you</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" className="flex-1 border-white/20 text-white">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Copy link
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/20 text-white">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <Timeline items={funnelTimeline} showTimestamps={false} />
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout icon={<Target className="h-4 w-4" />} title="Pending recruits" subtitle="Follow up on invites" showChevron={false}>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/80">
                {pendingInvites.length === 0 && <p className="text-xs text-white/60">All invites handled!</p>}
                {pendingInvites.map((invite) => (
                  <div key={invite.id} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{invite.partnerName}</span>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        Sent {formatInviteDate(invite.sentAt)}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60">{invite.email}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 w-full border border-white/10 text-xs text-white">
                      Send reminder
                    </Button>
                  </div>
                ))}
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout icon={<Users className="h-4 w-4" />} title="Team structure" subtitle="View direct recruits" showChevron={false}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <ScrollArea className="h-64 space-y-3 pr-2 text-sm">
                  {teamStructure.map((node) => (
                    <div key={node.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="font-semibold text-white">{node.name}</p>
                      <p className="text-xs text-white/60">
                        {node.tier} · ${node.earnings.toLocaleString()} overrides
                      </p>
                      <div className="mt-3 space-y-2">
                        {node.recruits.map((recruit) => (
                          <div key={recruit.id} className="rounded-xl border border-white/5 bg-black/20 px-3 py-2">
                            <div className="flex items-center justify-between">
                              <span>{recruit.name}</span>
                              <Badge variant="outline" className="border-white/20 text-white/70">
                                {recruit.tier}
                              </Badge>
                            </div>
                            <p className="text-xs text-white/60">
                              {recruit.deals} deals · ${recruit.earnings.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Recruitment resources" subtitle="Assets from the spec" showChevron={false}>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/80">
                {recruitmentResources.map((resource) => (
                  <div key={resource.id} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                    <p className="font-semibold text-white">{resource.label}</p>
                    <p className="text-xs text-white/60">{resource.description}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 w-full border border-white/10 text-xs text-white">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout icon={<TrendingUp className="h-4 w-4" />} title="Recruitment goals" subtitle="Track progress" showChevron={false}>
              <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <GoalRow label="Recruits" value={stats.accepted} target={15} />
                <GoalRow label="Pending" value={stats.pending} target={5} />
                <GoalRow label="Override" value={stats.overrideEarnings} target={35000} isCurrency />
              </div>
            </SettingsGroupCallout>
          </div>
        </div>
      </div>
    </PartnersPageShell>
  );
}

function HeroStat({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-xs text-white/60">{helper}</p>
    </div>
  );
}

function GoalRow({ label, value, target, isCurrency }: { label: string; value: number; target: number; isCurrency?: boolean }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span className="font-semibold text-white">
          {isCurrency ? `$${value.toLocaleString()}` : value} / {isCurrency ? `$${target.toLocaleString()}` : target}
        </span>
      </div>
      <Progress value={pct} className="mt-2" />
    </div>
  );
}

function badgeForStatus(status: RecruitmentInvite["status"]) {
  switch (status) {
    case "accepted":
      return "border-emerald-400/40 text-emerald-200";
    case "pending":
      return "border-amber-400/40 text-amber-200";
    case "inactive":
      return "border-white/20 text-white/60";
    default:
      return "border-white/20 text-white/70";
  }
}
