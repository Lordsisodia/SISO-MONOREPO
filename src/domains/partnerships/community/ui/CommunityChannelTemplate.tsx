import {
  AlertCircle,
  ArrowUpRight,
  Info,
  Link as LinkIcon,
  Lock,
  Paperclip,
  Reply,
  SendHorizontal,
  SmilePlus,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type CommunityChannelPreset,
  type ChannelMessage,
} from "@/domains/partnerships/community/data/channelPresets";

const relativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

interface CommunityChannelTemplateProps {
  channel: CommunityChannelPreset;
}

export function CommunityChannelTemplate({ channel }: CommunityChannelTemplateProps) {
  return (
    <div className="min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-8">
        <section className="flex-1 space-y-6">
          <ChannelHero channel={channel} />
          {channel.announcement ? (
            <AnnouncementCard
              title={channel.announcement.title}
              body={channel.announcement.body}
              pill={channel.announcement.pill}
            />
          ) : null}
          <Composer access={channel.access} composer={channel.composer} />
          <div className="space-y-4">
            {channel.messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        </section>

        <aside className="w-full max-w-xl space-y-6">
          <PinnedPanel pinned={channel.pinned} />
          <GuidelinePanel guidelines={channel.guidelines} />
          <QuickLinkPanel links={channel.quickLinks} />
        </aside>
      </div>
    </div>
  );
}

const ChannelHero = ({ channel }: { channel: CommunityChannelPreset }) => (
  <header className="rounded-3xl border border-siso-border/40 bg-gradient-to-br from-siso-bg-secondary/70 to-siso-bg-tertiary/60 p-6 shadow-siso backdrop-blur">
    <div className="flex flex-wrap items-center gap-3">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-3 text-white">
        <channel.icon className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{channel.label}</h1>
        <p className="text-sm text-siso-text-muted">{channel.description}</p>
      </div>
      <span
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold",
          channel.access === "post"
            ? "bg-emerald-400/10 text-emerald-300"
            : "bg-amber-500/10 text-amber-300",
        )}
      >
        {channel.access === "post" ? "Posting enabled" : "Read only"}
      </span>
    </div>
    {channel.highlights.length ? (
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {channel.highlights.map((stat) => (
          <div
            key={`${channel.id}-${stat.label}`}
            className="rounded-2xl border border-siso-border/40 bg-siso-bg-primary/50 p-4"
          >
            <dt className="text-xs uppercase tracking-wide text-siso-text-muted">
              {stat.label}
            </dt>
            <dd className="mt-1 text-lg font-semibold text-white">{stat.value}</dd>
            {stat.change ? (
              <p className="text-xs text-siso-text-muted">{stat.change}</p>
            ) : null}
          </div>
        ))}
      </dl>
    ) : null}
  </header>
);

const AnnouncementCard = ({
  title,
  body,
  pill,
}: {
  title: string;
  body: string;
  pill?: string;
}) => (
  <div className="rounded-3xl border border-siso-border/40 bg-gradient-to-r from-siso-red/10 via-siso-orange/10 to-transparent p-5 text-white shadow-siso">
    <div className="flex items-center gap-2 text-sm font-semibold uppercase text-siso-orange">
      <AlertCircle className="h-4 w-4" />
      {pill || "Heads up"}
    </div>
    <h2 className="mt-2 text-xl font-semibold">{title}</h2>
    <p className="text-sm text-siso-text-secondary">{body}</p>
  </div>
);

const Composer = ({
  access,
  composer,
}: {
  access: CommunityChannelPreset["access"];
  composer: CommunityChannelPreset["composer"];
}) => {
  const locked = access === "read-only";
  return (
    <div className="rounded-3xl border border-siso-border/40 bg-siso-bg-secondary/60 p-5 shadow-siso">
      <div className="flex items-center gap-2 text-sm font-semibold text-siso-text-secondary">
        {locked ? <Lock className="h-4 w-4 text-amber-300" /> : <UsersRound className="h-4 w-4 text-emerald-300" />}
        {locked ? "Posting locked" : "Start a new thread"}
      </div>
      <div className="mt-3 rounded-2xl border border-siso-border/40 bg-siso-bg-primary/60">
        <textarea
          placeholder={composer.placeholder}
          disabled={locked}
          className="h-28 w-full resize-none rounded-2xl bg-transparent p-4 text-sm placeholder:text-siso-text-muted focus:outline-none"
        />
        <div className="flex items-center justify-between border-t border-siso-border/30 px-4 py-3">
          <div className="flex items-center gap-2 text-siso-text-muted">
            <button className="rounded-full p-2 hover:bg-white/5" disabled={locked}>
              <Paperclip className="h-4 w-4" />
            </button>
            <button className="rounded-full p-2 hover:bg-white/5" disabled={locked}>
              <SmilePlus className="h-4 w-4" />
            </button>
          </div>
          <button
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
              locked
                ? "bg-white/10 text-siso-text-muted"
                : "bg-white text-black hover:bg-slate-100",
            )}
            disabled={locked}
          >
            <SendHorizontal className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
      {locked && composer.lockedCopy ? (
        <p className="mt-3 text-sm text-siso-text-muted">{composer.lockedCopy}</p>
      ) : null}
      {!locked && composer.helperText ? (
        <p className="mt-3 text-xs text-siso-text-muted">{composer.helperText}</p>
      ) : null}
    </div>
  );
};

const MessageCard = ({ message }: { message: ChannelMessage }) => (
  <article className="rounded-3xl border border-siso-border/40 bg-siso-bg-secondary/40 p-5 shadow-siso">
    <header className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
        {message.author.avatarInitials}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-white">{message.author.name}</p>
          {message.author.isTeam ? (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-siso-orange">
              SISO Team
            </span>
          ) : null}
          {message.author.tier ? (
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-siso-text-muted">
              {message.author.tier}
            </span>
          ) : null}
          <span className="text-xs text-siso-text-muted">{relativeTime(message.timestamp)}</span>
        </div>
        {message.author.role ? (
          <p className="text-xs text-siso-text-muted">{message.author.role}</p>
        ) : null}
      </div>
    </header>
    <p className="mt-4 text-sm leading-relaxed text-siso-text-primary">{message.content}</p>
    {message.tags?.length ? (
      <div className="mt-3 flex flex-wrap gap-2">
        {message.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-siso-border/40 px-2 py-0.5 text-xs text-siso-text-muted">
            #{tag}
          </span>
        ))}
      </div>
    ) : null}
    <footer className="mt-4 flex flex-wrap items-center gap-3 text-xs text-siso-text-muted">
      {message.reactions?.map((reaction) => (
        <button
          key={reaction.emoji}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-3 py-1",
            reaction.highlighted ? "border-emerald-400/50 text-emerald-200" : "border-siso-border/40",
          )}
        >
          <span>{reaction.emoji}</span>
          {reaction.count}
        </button>
      ))}
      {message.replies ? (
        <button className="inline-flex items-center gap-1 rounded-full border border-siso-border/40 px-3 py-1">
          <Reply className="h-3.5 w-3.5" />
          {message.replies} replies
        </button>
      ) : null}
      <button className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1 text-white/70 hover:bg-white/5">
        <BookmarkIcon />
        Save thread
      </button>
    </footer>
  </article>
);

const BookmarkIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 4h10a1 1 0 0 1 1 1v15l-6-3-6 3V5a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PinnedPanel = ({ pinned }: { pinned: CommunityChannelPreset["pinned"] }) => {
  if (!pinned.length) return null;
  return (
    <div className="rounded-3xl border border-siso-border/40 bg-siso-bg-secondary/40 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Info className="h-4 w-4" />
        Pinned Highlights
      </div>
      <div className="mt-4 space-y-4">
        {pinned.map((pin) => (
          <div key={pin.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">{pin.title}</p>
            <p className="mt-1 text-xs text-siso-text-muted">{pin.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-siso-text-muted">
              <span>{pin.author}</span>
              <span>•</span>
              <span>{relativeTime(pin.timestamp)}</span>
            </div>
            {pin.tags?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {pin.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-siso-text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

const GuidelinePanel = ({ guidelines }: { guidelines: CommunityChannelPreset["guidelines"] }) => {
  if (!guidelines.length) return null;
  return (
    <div className="rounded-3xl border border-siso-border/40 bg-siso-bg-secondary/40 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <AlertCircle className="h-4 w-4" />
        Posting guardrails
      </div>
      <div className="mt-4 space-y-3">
        {guidelines.map((rule) => (
          <div key={rule.title} className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">{rule.title}</p>
            <p className="text-xs text-siso-text-muted">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickLinkPanel = ({ links }: { links: CommunityChannelPreset["quickLinks"] }) => {
  if (!links.length) return null;
  return (
    <div className="rounded-3xl border border-siso-border/40 bg-siso-bg-secondary/40 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <LinkIcon className="h-4 w-4" />
        Quick links
      </div>
      <div className="mt-4 space-y-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 hover:border-white/20"
          >
            <div>
              <p className="text-sm font-semibold text-white">{link.label}</p>
              <p className="text-xs text-siso-text-muted">{link.description}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-siso-text-muted group-hover:text-white" />
          </a>
        ))}
      </div>
    </div>
  );
};
