"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HighlightCard as GradientHighlightCard } from "@/components/ui/card-5-static";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/domains/shared/utils/cn";
import { ArrowRight, Bell, CheckSquare, ClipboardList, Clock, ListChecks, Sparkles, Users, Zap } from "lucide-react";

const dueTodayTasks = [
  {
    id: "task_prospect",
    title: "Follow up: Brookstone Bikes",
    context: "Pipeline • Prospect",
    due: "11:00 AM",
    priority: "high",
    tags: ["call", "pipeline"],
  },
  {
    id: "task_recruit",
    title: "Send invite reminder to Harper",
    context: "Recruitment",
    due: "1:30 PM",
    priority: "medium",
    tags: ["recruitment"],
  },
  {
    id: "task_docs",
    title: "Upload portfolio asset for fintech webinar",
    context: "Workspace • Files",
    due: "4:00 PM",
    priority: "low",
    tags: ["content"],
  },
];

const backlogColumns = [
  {
    id: "next",
    title: "Next 3 days",
    tasks: [
      {
        title: "prep deck for BetaOps demo",
        due: "Tomorrow 9 AM",
        owner: "You",
        context: "Pipeline",
      },
      {
        title: "QA automation checklist",
        due: "Friday",
        owner: "SISO Ops",
        context: "Automation",
      },
    ],
  },
  {
    id: "week",
    title: "Later this week",
    tasks: [
      {
        title: "Recruiting sync with Harper",
        due: "Sat",
        owner: "You",
        context: "Recruitment",
      },
    ],
  },
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      {
        title: "Audit archived deals",
        due: "—",
        owner: "SISO Ops",
        context: "Pipeline",
      },
      {
        title: "Draft automation for NPS follow-up",
        due: "—",
        owner: "Automation",
        context: "Workflow",
      },
    ],
  },
];

const automationRules = [
  { id: "auto_followup", name: "Auto follow-up (48h)", enabled: true, description: "Pings prospects if no reply" },
  { id: "auto_checklist", name: "Client prep checklist", enabled: true, description: "Creates prep list when deal hits Discovery" },
  { id: "auto_reminder", name: "Invite reminder", enabled: false, description: "Texts recruits 24h before call" },
];

const delegationRows = [
  { assignee: "Avery", task: "Prepare Brookstone quote", due: "Today", status: "In progress" },
  { assignee: "Jordan", task: "Review earnings dashboard", due: "Tomorrow", status: "Pending" },
];

const activityTimeline = [
  {
    id: "act1",
    title: "Task completed",
    description: "Harper sent recruiting invites",
    timestamp: new Date().toISOString(),
    status: "completed",
  },
  {
    id: "act2",
    title: "Automation triggered",
    description: "Follow-up email scheduled for Brookstone",
    timestamp: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    status: "active",
  },
  {
    id: "act3",
    title: "Task reassigned",
    description: "SISO Ops now owns BetaOps deck",
    timestamp: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    status: "pending",
  },
];

export function TasksWorkspaceScreen() {
  const completionRate = useMemo(() => 78, []);
  const overdueCount = useMemo(() => 2, []);
  const slaRisk = useMemo(() => 1, []);

  return (
    <section className="min-h-screen bg-[#03040f] pb-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-12">
        <GradientHighlightCard
          color="orange"
          title="Workspace tasks"
          description="See every due action, nudges, and automations connected to Pipeline Ops."
          metricValue={`${dueTodayTasks.length}`}
          metricLabel="tasks due today"
          buttonText="Open checklist"
          onButtonClick={() => document?.getElementById("due-today")?.scrollIntoView({ behavior: "smooth" })}
          icon={<ClipboardList className="h-5 w-5" />}
          hideDivider
          hideFooter
          className="w-full pr-16"
          showCornerIcon={false}
        >
          <div />
        </GradientHighlightCard>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4 text-siso-orange" />}
          title="Task pulse"
          subtitle="Completion, overdue, SLA risk"
          showChevron={false}
        >
          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-3">
            <MetricTile label="Completion" value={`${completionRate}%`} helper="Past 7 days" />
            <MetricTile label="Overdue" value={`${overdueCount}`} helper="Need attention" tone="warning" />
            <MetricTile label="SLA risk" value={`${slaRisk}`} helper="Due within 2h" tone="danger" />
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<ListChecks className="h-4 w-4 text-siso-orange" />}
          title="Filters"
          subtitle="Switch scopes and priorities"
          showChevron={false}
        >
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap gap-3 text-sm">
              {['Today', 'Week', 'Delegated', 'All'].map((view) => (
                <Button key={view} variant={view === 'Today' ? 'default' : 'outline'} className={cn('rounded-2xl', view === 'Today' ? 'bg-white text-black' : 'border-white/30 text-white')}>
                  {view}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              {['Pipeline', 'Recruitment', 'Earnings', 'Automation'].map((filter) => (
                <Badge key={filter} className="bg-white/15 text-white">{filter}</Badge>
              ))}
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<CheckSquare className="h-4 w-4 text-siso-orange" />}
          title="Due today"
          subtitle="Auto-sorted by priority"
          showChevron={false}
        >
          <div id="due-today" className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
            {dueTodayTasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-lg font-semibold text-white">{task.title}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{task.context}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Clock className="h-4 w-4" /> {task.due}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                  {task.tags.map((tag) => (
                    <Badge key={tag} className="bg-white/15 text-white">#{tag}</Badge>
                  ))}
                  <span className={cn('rounded-full px-2 py-0.5 text-[11px] uppercase tracking-[0.2em]', task.priority === 'high' ? 'bg-rose-500/30 text-rose-100' : 'bg-white/10 text-white')}>
                    {task.priority}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" className="rounded-2xl bg-white text-black hover:bg-white/90">Complete</Button>
                  <Button size="sm" variant="outline" className="rounded-2xl border-white/30 text-white hover:bg-white/10">Snooze</Button>
                  <Button size="sm" variant="outline" className="rounded-2xl border-white/30 text-white hover:bg-white/10">Reassign</Button>
                </div>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<ClipboardList className="h-4 w-4 text-siso-orange" />}
          title="Upcoming & backlog"
          subtitle="Grouped view"
          showChevron={false}
        >
          <div className="grid gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-3">
            {backlogColumns.map((column) => (
              <div key={column.id} className="space-y-3 rounded-2xl border border-white/10 bg-black/15 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{column.title}</p>
                {column.tasks.map((task, idx) => (
                  <div key={`${column.id}_${idx}`} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                    <p className="font-semibold text-white">{task.title}</p>
                    <p className="text-white/70">{task.context}</p>
                    <p className="text-xs text-white/60">{task.owner} • {task.due}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4 text-siso-orange" />}
          title="Automations"
          subtitle="Workflow rules powering tasks"
          showChevron={false}
        >
          <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
            {automationRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3">
                <div>
                  <p className="font-semibold text-white">{rule.name}</p>
                  <p className="text-sm text-white/70">{rule.description}</p>
                </div>
                <Switch checked={rule.enabled} aria-label={`Toggle ${rule.name}`} />
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Users className="h-4 w-4 text-siso-orange" />}
          title="Delegated tasks"
          subtitle="What your team owes you"
          showChevron={false}
        >
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="text-xs uppercase tracking-[0.3em] text-white/60">
                <tr>
                  <th className="px-2 py-2">Assignee</th>
                  <th className="px-2 py-2">Task</th>
                  <th className="px-2 py-2">Due</th>
                  <th className="px-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {delegationRows.map((row) => (
                  <tr key={`${row.assignee}-${row.task}`} className="border-t border-white/10">
                    <td className="px-2 py-2">{row.assignee}</td>
                    <td className="px-2 py-2">{row.task}</td>
                    <td className="px-2 py-2">{row.due}</td>
                    <td className="px-2 py-2">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Bell className="h-4 w-4 text-siso-orange" />}
          title="Activity"
          subtitle="Latest task updates"
          showChevron={false}
        >
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <Timeline items={activityTimeline} showTimestamps={false} className="text-white" />
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Zap className="h-4 w-4 text-siso-orange" />}
          title="Quick actions"
          subtitle="What do you want to do next?"
          showChevron={false}
        >
          <div className="flex flex-wrap gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
            {[
              { label: "Add task", icon: <Sparkles className="h-4 w-4" /> },
              { label: "Bulk import", icon: <ArrowRight className="h-4 w-4" /> },
              { label: "Build automation", icon: <Zap className="h-4 w-4" /> },
            ].map((action) => (
              <Button key={action.label} variant="outline" className="rounded-2xl border-white/30 text-white hover:bg-white/10">
                <span className="mr-2 text-siso-orange">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </section>
  );
}

function MetricTile({ label, value, helper, tone = "default" }: { label: string; value: string; helper?: string; tone?: "default" | "warning" | "danger" }) {
  const toneClasses = {
    default: "border-white/10 bg-black/15 text-white",
    warning: "border-amber-400/40 bg-amber-500/20 text-amber-50",
    danger: "border-rose-500/40 bg-rose-500/20 text-rose-50",
  };
  return (
    <div className={cn("rounded-2xl border p-4", toneClasses[tone])}>
      <p className="text-[11px] uppercase tracking-[0.3em] opacity-80">{label}</p>
      <p className="text-3xl font-semibold">{value}</p>
      {helper ? <p className="text-sm opacity-80">{helper}</p> : null}
    </div>
  );
}
