"use client";

import type { ComponentType, FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  LifeBuoy,
  Mail,
  Megaphone,
  MessageSquare,
  Send,
  Sparkles,
  Star,
} from "lucide-react";

import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { cn } from "@/domains/shared/utils/cn";

type IconComponent = ComponentType<{ className?: string }>;

type FeedbackCategory = {
  id: string;
  label: string;
  description: string;
  icon: IconComponent;
  sla: string;
};

type SupportChannel = {
  id: string;
  label: string;
  description: string;
  meta: string;
  icon: IconComponent;
};

type SupportThread = {
  id: string;
  title: string;
  status: "resolved" | "investigating" | "queued";
  updated: string;
  category: string;
};

const feedbackCategories: FeedbackCategory[] = [
  {
    id: "bug",
    label: "Bug report",
    description: "UI glitches, access issues, or data mismatches.",
    icon: AlertTriangle,
    sla: "First reply &lt; 4h",
  },
  {
    id: "request",
    label: "Feature request",
    description: "Workflow tweaks or roadmap-worthy ideas.",
    icon: Sparkles,
    sla: "Review during Tues roadmap",
  },
  {
    id: "praise",
    label: "Partner shoutout",
    description: "Celebrate a win, teammate, or success story.",
    icon: Star,
    sla: "Shared in #partner-wins daily",
  },
  {
    id: "help",
    label: "Concierge help",
    description: "Need a human or live troubleshooting right now.",
    icon: LifeBuoy,
    sla: "Live handoff &lt; 15m",
  },
];

const supportChannels: SupportChannel[] = [
  {
    id: "chat",
    label: "Partner Desk",
    description: "Live Slack triage with concierge engineers.",
    meta: "Weekdays · 7a–7p PT",
    icon: MessageSquare,
  },
  {
    id: "email",
    label: "partners@siso.co",
    description: "Async thread drops into Salesforce + Jira.",
    meta: "Avg reply 3h 52m",
    icon: Mail,
  },
  {
    id: "office-hours",
    label: "Office hours",
    description: "15-min Zoom with Solutions team.",
    meta: "Thursdays · 10a PT",
    icon: Megaphone,
  },
];

const supportStats = [
  { id: "reply", label: "Avg first reply", value: "42m", meta: "Last 7 days" },
  { id: "resolved", label: "Tickets cleared", value: "18", meta: "This week" },
  { id: "csat", label: "CSAT", value: "4.8/5", meta: "Post-call" },
];

const recentThreads: SupportThread[] = [
  {
    id: "ops-2316",
    title: "Tier progress not syncing to wallet",
    status: "resolved",
    updated: "Nov 11 · 09:34",
    category: "bug",
  },
  {
    id: "req-9821",
    title: "Need sandbox access for new pod",
    status: "investigating",
    updated: "Nov 10 · 17:08",
    category: "request",
  },
  {
    id: "win-4470",
    title: "Studio West closed $68K expansion",
    status: "queued",
    updated: "Nov 9 · 12:26",
    category: "praise",
  },
];

const ratingScale = [1, 2, 3, 4, 5];

const statusStyles: Record<SupportThread["status"], { label: string; className: string }> = {
  resolved: { label: "Resolved", className: "border-emerald-400/40 text-emerald-300" },
  investigating: { label: "Investigating", className: "border-amber-300/40 text-amber-200" },
  queued: { label: "Queued", className: "border-siso-border/70 text-siso-text-muted" },
};

export function ProvideFeedbackView() {
  const [categoryId, setCategoryId] = useState(feedbackCategories[0].id);
  const [selectedChannel, setSelectedChannel] = useState(supportChannels[0].id);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("partner@siso.co");
  const [sentiment, setSentiment] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedCategory = useMemo(
    () => feedbackCategories.find((category) => category.id === categoryId) ?? feedbackCategories[0],
    [categoryId],
  );

  const submitDisabled = isSubmitting || !subject.trim() || !details.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitDisabled) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setSubject("");
      setDetails("");
    }, 600);
  }

  function resetSubmitted() {
    if (submitted) {
      setSubmitted(false);
    }
  }

  return (
    <SettingsDetailLayout
      title="Partner Support"
      description="Log issues, request features, or shout out wins. Everything routes into the Partner Desk."
      icon={<LifeBuoy className="h-5 w-5 text-siso-orange" />}
      wrapContent={false}
      backHref="/partners"
      backLabel="Back to hub"
    >
      <div className="space-y-5 text-siso-text-primary">
        <section className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/60 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Partner desk</p>
                <p className="text-lg font-semibold text-white">Live concierge coverage</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-siso-border/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:border-siso-orange hover:text-siso-orange"
              >
                Open chat
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {supportStats.map((stat) => (
                <article
                  key={stat.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-siso-text-primary"
                >
                  <p className="text-[11px] uppercase tracking-[0.25em] text-siso-text-muted">{stat.label}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-[11px] text-siso-text-muted">{stat.meta}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {supportChannels.map((channel) => {
                const Icon = channel.icon;
                const isActive = selectedChannel === channel.id;
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => {
                      setSelectedChannel(channel.id);
                      resetSubmitted();
                    }}
                    className={cn(
                      "flex flex-col gap-2 rounded-2xl border px-3 py-3 text-left transition",
                      isActive
                        ? "border-siso-orange/70 bg-siso-bg-primary/80 text-white"
                        : "border-white/10 bg-white/5 text-siso-text-primary hover:border-white/30",
                    )}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      {channel.label}
                    </div>
                    <p className="text-xs text-siso-text-muted">{channel.description}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-siso-text-muted">{channel.meta}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Select a category</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {feedbackCategories.map((category) => {
              const Icon = category.icon;
              const isActive = category.id === categoryId;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setCategoryId(category.id);
                    resetSubmitted();
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-3xl border p-4 text-left transition",
                    isActive
                      ? "border-siso-orange/70 bg-siso-bg-secondary/80"
                      : "border-siso-border/50 bg-siso-bg-secondary/40 hover:border-siso-border",
                  )}
                >
                  <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", isActive ? "bg-siso-orange/10 text-siso-orange" : "bg-white/5 text-siso-text-muted")}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold tracking-[0.15em] text-siso-text-primary">{category.label}</p>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-siso-text-muted">
                        {category.sla}
                      </span>
                    </div>
                    <p className="text-xs text-siso-text-muted">{category.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/80 p-4">
          <header className="mb-4 space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">Compose update</p>
            <div className="text-sm text-siso-text-muted">
              Routed as <span className="font-semibold text-siso-text-primary">{selectedCategory.label}</span> via {selectedChannel}.
            </div>
          </header>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-xs uppercase tracking-[0.2em] text-siso-text-muted">
                Contact email
                <input
                  type="email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange/70 focus:outline-none"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    resetSubmitted();
                  }}
                  required
                />
              </label>
              <label className="space-y-1 text-xs uppercase tracking-[0.2em] text-siso-text-muted">
                Subject
                <input
                  type="text"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange/70 focus:outline-none"
                  value={subject}
                  onChange={(event) => {
                    setSubject(event.target.value);
                    resetSubmitted();
                  }}
                  placeholder="e.g. Tier payout stuck at pending"
                  required
                />
              </label>
            </div>

            <label className="space-y-1 text-xs uppercase tracking-[0.2em] text-siso-text-muted">
              Details
              <textarea
                className="h-36 w-full rounded-3xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange/70 focus:outline-none"
                value={details}
                onChange={(event) => {
                  setDetails(event.target.value);
                  resetSubmitted();
                }}
                placeholder="Share steps to reproduce, expected outcome, and attachments."
                required
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-white/15 px-3 py-2 text-xs text-siso-text-muted">
              <Clock className="h-4 w-4" />
              <span>Hours of impact</span>
              <div className="flex items-center gap-1">
                {ratingScale.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Impact level ${value}`}
                    onClick={() => {
                      setSentiment(value);
                      resetSubmitted();
                    }}
                    className="rounded-full border border-white/10 p-1 text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange"
                  >
                    <Star className={cn("h-4 w-4", value <= sentiment ? "fill-siso-orange text-siso-orange" : "text-white/30")}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Signals severity for triage</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-siso-orange px-5 py-2 text-sm font-semibold text-black disabled:opacity-50"
                disabled={submitDisabled}
              >
                {isSubmitting ? "Sending" : submitted ? "Logged" : "Send update"}
                <Send className="h-4 w-4" />
              </button>
              {submitted ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200">
                  <CheckCircle2 className="h-4 w-4" />
                  Routed to Partner Desk · tracking #{selectedCategory.id}
                </div>
              ) : (
                <p className="text-xs text-siso-text-muted">Feedback auto-tags with workspace + partner metadata.</p>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/60 p-4">
          <header className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">Recent threads</p>
              <p className="text-sm text-siso-text-muted">Snapshots from the last 72 hours.</p>
            </div>
            <button className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">
              View all
            </button>
          </header>

          <ul className="space-y-2">
            {recentThreads.map((thread) => {
              const badge = statusStyles[thread.status];
              return (
                <li key={thread.id} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{thread.title}</p>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-siso-text-muted">{thread.updated}</p>
                    </div>
                    <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.25em]", badge.className)}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">
                    <span>#{thread.id}</span>
                    <span>•</span>
                    <span>{thread.category}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </SettingsDetailLayout>
  );
}
