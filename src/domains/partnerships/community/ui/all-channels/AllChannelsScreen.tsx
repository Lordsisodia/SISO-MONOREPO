"use client";

import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, BookOpen, Hash, Sparkles, UsersRound } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import {
  communityChannels,
  type CommunityChannelId,
} from "@/domains/partnerships/community/data/channelPresets";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

const directoryChannels: Array<{ id: CommunityChannelId; href: string }> = [
  { id: "general", href: "/partners/community/channels/general-chat" },
  { id: "wins", href: "/partners/community/channels/wins" },
  { id: "announcements", href: "/partners/community/announcements" },
];

const requestedChannelIdeas = [
  {
    id: "latam",
    label: "LATAM founders",
    description: "Regional room for Spanish + Portuguese-speaking partners to swap GTM plays.",
    votes: 142,
    trend: "up" as const,
  },
  {
    id: "public-sector",
    label: "Public sector",
    description: "Share procurement templates, compliance tips, and GovTech stories.",
    votes: 87,
    trend: "steady" as const,
  },
  {
    id: "solo-studios",
    label: "Solo studios",
    description: "Support pod for 1-2 person teams scaling ops without hiring.",
    votes: 63,
    trend: "down" as const,
  },
];

const playbookCards = [
  {
    tag: "# general-chat",
    title: "Thread format that gets answers",
    description: "Lead with context, include an ask, and close with the outcome to get faster responses.",
  },
  {
    tag: "# wins",
    title: "Win template cheat sheet",
    description: "Budget, hook, and asset links—the 3 elements that unlock badges fast.",
  },
  {
    tag: "Announcements",
    title: "Acknowledge & follow up",
    description: "Log read receipts and route questions without cluttering the thread.",
  },
  {
    tag: "Beta rooms",
    title: "Pilot etiquette",
    description: "Share experiments, flag blockers, and tag ops so betas move faster.",
  },
];

export function AllChannelsScreen() {
  const directory = directoryChannels.map((channel) => ({
    ...channel,
    data: communityChannels[channel.id],
  }));

  const requested = requestedChannelIdeas;

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "community" }}>
      <AllChannelsContent directory={directory} requested={requested} />
    </PartnersPageShell>
  );
}

type DirectoryEntry = { id: CommunityChannelId; href: string; data: (typeof communityChannels)[CommunityChannelId] };

function AllChannelsContent({ directory, requested }: { directory: DirectoryEntry[]; requested: RequestedChannel[] }) {
  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <HeroPanel />

        <SettingsGroupCallout
          icon={<UsersRound className="h-4 w-4" />}
          title="Core spaces"
          subtitle="Channels every partner starts with"
          showChevron={false}
        >
          <div className="space-y-3">
            {directory.map(({ id, href, data }) => (
              <ChannelDirectoryRow key={id} channelId={id} href={href} label={data.label} />
            ))}
          </div>
        </SettingsGroupCallout>

        <RequestedChannelsPanel requested={requested} />

        <ChannelPlaybooksPanel />

        <SuggestChannelPanel />
      </div>
    </section>
  );
}

type ChannelDirectoryRowProps = {
  channelId: CommunityChannelId;
  href: string;
  label: string;
};

function ChannelDirectoryRow({ channelId, href, label }: ChannelDirectoryRowProps) {
  const channel = communityChannels[channelId];
  const highlights = channel.highlights.slice(0, 2);
  const firstGuideline = channel.guidelines?.[0];
  const cleanLabel = label.replace(/^#\s*/, "");

  return (
    <Link
      href={href}
      className="group block rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      prefetch={false}
    >
      <div className="flex flex-wrap items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-siso-orange">
          <channel.icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{cleanLabel}</p>
          <p className="text-xs text-siso-text-muted">{channel.description}</p>
        </div>
      </div>

      {highlights.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {highlights.map((stat) => (
            <div
              key={`${channel.id}-${stat.label}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/60">{stat.label}</span>
              <span className="font-semibold text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      ) : null}

      {firstGuideline ? (
        <p className="mt-3 text-[12px] text-siso-text-muted">
          <span className="text-white/70">Pro tip: </span>
          {firstGuideline.title} — {firstGuideline.description}
        </p>
      ) : null}

      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-siso-text-muted">
        <span>Visit channel</span>
        <ArrowUpRight className="h-4 w-4 text-siso-text-muted transition group-hover:text-white" />
      </div>
    </Link>
  );
}

type RequestedChannel = {
  id: string;
  label: string;
  description: string;
  votes: number;
  trend: "up" | "down" | "steady";
};

function RequestedChannelsPanel({ requested }: { requested: RequestedChannel[] }) {
  return (
    <SettingsGroupCallout
      icon={<Hash className="h-4 w-4" />}
      title="Requested channels"
      subtitle="Vote on the next rooms we spin up"
      showChevron={false}
    >
      <div className="space-y-3">
        {requested.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-siso-text-muted"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-siso-text-muted">{item.description}</p>
              </div>
              <VoteBadge votes={item.votes} trend={item.trend} />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-2xl border border-siso-border/60 bg-black/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/70"
              >
                <ArrowUp className="h-4 w-4" /> Upvote
              </button>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-2xl border border-siso-border/40 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-siso-text-muted transition hover:border-white/60 hover:text-white"
              >
                <ArrowDown className="h-4 w-4" /> Downvote
              </button>
            </div>
          </div>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}

function VoteBadge({ votes, trend }: { votes: number; trend: RequestedChannel["trend"] }) {
  const trendIcon = trend === "up" ? "▲" : trend === "down" ? "▼" : "•";
  const trendColor = trend === "up" ? "text-emerald-300" : trend === "down" ? "text-siso-red" : "text-white/60";
  return (
    <div className="rounded-2xl border border-white/15 bg-black/30 px-3 py-1 text-right text-xs text-white/80">
      <p className="text-lg font-semibold text-white">{votes}</p>
      <p className={`${trendColor} text-[11px] uppercase tracking-[0.3em]`}>{trendIcon} votes</p>
    </div>
  );
}

function ChannelPlaybooksPanel() {
  return (
    <SettingsGroupCallout
      icon={<BookOpen className="h-4 w-4" />}
      title="Channel playbooks"
      subtitle="Quick tips to post like a pro"
      showChevron={false}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {playbookCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-siso-text-muted">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-siso-text-muted">{card.tag}</p>
            <h3 className="mt-1 text-base font-semibold text-white">{card.title}</h3>
            <p className="text-xs text-siso-text-muted">{card.description}</p>
            <button type="button" className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-siso-orange hover:text-white">
              View tips →
            </button>
          </div>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}

function SuggestChannelPanel() {
  return (
    <div className="rounded-[26px] border border-dashed border-siso-orange/60 bg-siso-orange/5 p-5 text-sm text-siso-text-primary">
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-siso-orange" />
        <div className="flex-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-siso-orange">Suggest a channel</p>
          <p className="text-sm text-siso-text-muted">
            Have an idea for a space we’re missing? Drop it below and the community team will review it every Friday.
          </p>
          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Working title (e.g., #manufacturing)"
              className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-siso-text-muted focus:border-white/60 focus:outline-none"
            />
            <textarea
              placeholder="What problem would this channel solve?"
              className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-siso-text-muted focus:border-white/60 focus:outline-none"
              rows={3}
            />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl bg-siso-orange px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-black shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition hover:bg-white"
            >
              Submit idea
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const noop = () => {};

function HeroPanel() {
  return (
    <HighlightCard
      color="orange"
      className="w-full pr-16"
      title="Community Channels"
      description="Browse every core room in one place and see what’s launching next."
      hideDivider
      hideFooter
      metricValue=""
      metricLabel=""
      buttonText=""
      onButtonClick={noop}
      icon={<Sparkles className="h-5 w-5" />}
      titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
      descriptionClassName="text-xs"
      showCornerIcon={false}
    />
  );
}
