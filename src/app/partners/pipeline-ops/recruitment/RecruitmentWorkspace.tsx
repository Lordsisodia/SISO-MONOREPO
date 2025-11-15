"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import type { RecruitmentInvite } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { cn } from "@/lib/utils";
import { ArrowRight, DollarSign, Filter, Link as LinkIcon, Mail, Share2, Sparkles, Target, TrendingUp, Users } from "lucide-react";

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

export function RecruitmentWorkspace({ invites }: RecruitmentWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newInvite, setNewInvite] = useState({ name: "", email: "", share: "200" });
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

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
    const overrideEarnings = 24800; // placeholder metric
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
    setNewInvite({ name: "", email: "", share: newInvite.share });
  };

  return (
    <main className="min-h-screen bg-[#03040A] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-8">
        <Card className="overflow-hidden border-white/10 bg-gradient-to-r from-[#101828] via-[#0B0F1F] to-[#06070D] text-white">
          <CardContent className="flex flex-col gap-8 px-8 py-10 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4">
              <Badge variant="outline" className="border-white/30 bg-white/5 text-white">
                Grow Team · Recruitment
              </Badge>
              <div>
                <h1 className="text-3xl font-semibold sm:text-4xl">Recruit Partner Team</h1>
                <p className="mt-3 text-base text-white/70">
                  Send invites, watch pending recruits, and track override earnings in one workspace.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-siso-orange text-black hover:bg-orange-400">
                  <Sparkles className="h-4 w-4" />
                  Invite partner
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View team earnings
                </Button>
              </div>
            </div>
            <div className="grid flex-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
              <HeroStat label="Invites" value={stats.total.toString()} helper="All time" icon={Users} />
              <HeroStat label="Pending" value={stats.pending.toString()} helper="Awaiting acceptance" icon={Target} />
              <HeroStat label="Override" value={`$${stats.overrideEarnings.toLocaleString()}`} helper="Paid to date" icon={DollarSign} />
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-6">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Send invite</CardTitle>
                <CardDescription className="text-white/70">Personalized referral for new partners</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendInvite} className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Name</Label>
                    <Input
                      value={newInvite.name}
                      onChange={(event) => setNewInvite((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Alex Carter"
                      className="mt-2 border-white/10 bg-black/40 text-white"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Email</Label>
                    <Input
                      type="email"
                      value={newInvite.email}
                      onChange={(event) => setNewInvite((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="alex@siso.partners"
                      className="mt-2 border-white/10 bg-black/40 text-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Override (bps)</Label>
                    <Select value={newInvite.share} onValueChange={(value) => setNewInvite((prev) => ({ ...prev, share: value }))}>
                      <SelectTrigger className="mt-2 w-full border-white/10 bg-black/40 text-left text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#070A12] text-white">
                        {["150", "200", "250", "300"].map((bps) => (
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
                    {inviteSuccess && <p className="text-sm text-emerald-300">{inviteSuccess}</p>}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <CardTitle className="text-base">Invites</CardTitle>
                  <CardDescription className="text-white/70">Manage pending and accepted recruits</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Filter className="h-4 w-4" />
                  {filteredInvites.length} results
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <div className="overflow-auto rounded-3xl border border-white/10">
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
                          <td className="px-4 py-3">{new Date(invite.sentAt).toLocaleDateString()}</td>
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
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-8">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Referral link</CardTitle>
                <CardDescription className="text-white/70">Share with potential partners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
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
                <Timeline items={funnelTimeline} showTimestamps={false} />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Pending recruits</CardTitle>
                <CardDescription className="text-white/70">Follow up on invites</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                {pendingInvites.length === 0 && <p className="text-xs text-white/60">All invites handled!</p>}
                {pendingInvites.map((invite) => (
                  <div key={invite.id} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{invite.partnerName}</span>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        Sent {new Date(invite.sentAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60">{invite.email}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 w-full border border-white/10 text-xs text-white">
                      Send reminder
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Team structure</CardTitle>
                <CardDescription className="text-white/70">View direct recruits</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 space-y-3 pr-2 text-sm">
                  {teamStructure.map((node) => (
                    <div key={node.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="font-semibold text-white">{node.name}</p>
                      <p className="text-xs text-white/60">{node.tier} · ${node.earnings.toLocaleString()} overrides</p>
                      <div className="mt-3 space-y-2">
                        {node.recruits.map((recruit) => (
                          <div key={recruit.id} className="rounded-xl border border-white/5 bg-black/20 px-3 py-2">
                            <div className="flex items-center justify-between">
                              <span>{recruit.name}</span>
                              <Badge variant="outline" className="border-white/20 text-white/70">
                                {recruit.tier}
                              </Badge>
                            </div>
                            <p className="text-xs text-white/60">{recruit.deals} deals · ${recruit.earnings.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Recruitment resources</CardTitle>
                <CardDescription className="text-white/70">Assets from the spec</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                {recruitmentResources.map((resource) => (
                  <div key={resource.id} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                    <p className="font-semibold text-white">{resource.label}</p>
                    <p className="text-xs text-white/60">{resource.description}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 w-full border border-white/10 text-xs text-white">
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Recruitment goals</CardTitle>
                <CardDescription className="text-white/70">Track progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <GoalRow label="Recruits" value={stats.accepted} target={15} />
                <GoalRow label="Pending" value={stats.pending} target={5} />
                <GoalRow label="Override" value={stats.overrideEarnings} target={35000} isCurrency />
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

function GoalRow({ label, value, target, isCurrency }: { label: string; value: number; target: number; isCurrency?: boolean }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-semibold text-white">{isCurrency ? `$${value.toLocaleString()}` : value} / {isCurrency ? `$${target.toLocaleString()}` : target}</span>
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
