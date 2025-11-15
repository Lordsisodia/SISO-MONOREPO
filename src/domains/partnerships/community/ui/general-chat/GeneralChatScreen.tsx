"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ChatViewport } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ChatViewport";
import { ComposerBar } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ComposerBar";
import { ConversationTimeline } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/conversation/ConversationTimeline";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { CommunityNavLayer } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import {
  communityChannels,
  type CommunityChannelId,
  type CommunityChannelPreset,
} from "@/domains/partnerships/community/data/channelPresets";
import type { ConversationMessage } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/fixtures/conversation-fixtures";
import { ExternalLink, Megaphone, UsersRound, ListChecks, Bookmark } from "lucide-react";
import Link from "next/link";
import { MobileNavigationProvider, useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

const localeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const formatTimestamp = (iso: string): string => localeFormatter.format(new Date(iso));

const CampusDrawer = dynamic(
  () => import("@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusDrawer").then((m) => m.CampusDrawer),
  { ssr: false, loading: () => null },
);

const toConversationMessages = (channel: CommunityChannelPreset): ConversationMessage[] =>
  channel.messages.map((message) => ({
    id: message.id,
    authorName: message.author.name,
    authorInitials: message.author.avatarInitials,
    content: message.content,
    timestamp: formatTimestamp(message.timestamp),
    sentAt: message.timestamp,
    direction: "incoming",
  }));

export type CommunityChannelScreenConfig = {
  channelId: CommunityChannelId;
  threadName: string;
  avatarLabel: string;
  hero: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    body: string;
    pill?: string;
  };
  highlightsSubtitle: string;
  guidelinesSubtitle: string;
  quickLinksSubtitle: string;
  pinnedSubtitle?: string;
  composerMode: "enabled" | "locked";
};

const generalChannelConfig: CommunityChannelScreenConfig = {
  channelId: "general",
  threadName: "General Chat",
  avatarLabel: "GC",
  hero: {
    icon: <Megaphone className="h-4 w-4" />,
    title: "Community broadcast",
    subtitle: "Program-wide channel for quick wins, questions, and daily stand-ups.",
    body: "Drop updates, shoutouts, and questions for the entire program.",
  },
  highlightsSubtitle: "Pulse of General Chat",
  guidelinesSubtitle: "Keep threads crisp and helpful",
  quickLinksSubtitle: "Jump into the supporting docs",
  pinnedSubtitle: "Keep these handy",
  composerMode: "enabled",
};

export function GeneralChatScreen() {
  return <CommunityChannelScreen config={generalChannelConfig} />;
}

export function CommunityChannelScreen({ config }: { config: CommunityChannelScreenConfig }) {
  const channel = communityChannels[config.channelId];
  const navState = useMemo(
    () => ({ activeTab: "messages", previousTab: "messages", isImmersiveMode: true }),
    [],
  );

  return (
    <MobileNavigationProvider initialState={navState}>
      <CommunityNavLayer showFloatingNavButton={false}>
        <ChannelView channel={channel} config={config} />
      </CommunityNavLayer>
    </MobileNavigationProvider>
  );
}

type ChannelViewProps = {
  channel: CommunityChannelPreset;
  config: CommunityChannelScreenConfig;
};

function ChannelView({ channel, config }: ChannelViewProps) {
  const [composerHeight, setComposerHeight] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { openDrawer, isDrawerOpen } = useMobileNavigation();

  const mappedConversation = useMemo(() => toConversationMessages(channel), [channel]);
  const threadStatus = channel.highlights[0]?.value ?? "Active now";

  return (
    <>
      {isDrawerOpen ? <CampusDrawer /> : null}
      <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-3 pt-1.5">
        <ChatViewport
          isDirectoryOpen={isDetailsOpen}
          onOpenDirectory={() => setIsDetailsOpen(true)}
          threadName={config.threadName}
          threadStatus={threadStatus}
          avatarLabel={config.avatarLabel}
          contentOffset={composerHeight + 24}
          onOpenAppDrawer={openDrawer}
        >
          <SettingsGroupCallout
            icon={config.hero.icon}
            title={config.hero.title}
            subtitle={config.hero.subtitle}
            showChevron={false}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
              {config.hero.pill ? (
                <span className="mb-2 inline-flex items-center rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-white/80">
                  {config.hero.pill}
                </span>
              ) : null}
              <p className="text-xs text-siso-text-muted">{config.hero.body}</p>
            </div>
          </SettingsGroupCallout>
          <ConversationTimeline messages={mappedConversation} />
        </ChatViewport>

        {config.composerMode === "enabled" ? (
          <ComposerBar onHeightChange={setComposerHeight} />
        ) : (
          <ReadOnlyComposerNotice
            message={channel.composer.lockedCopy ?? "Only SISO staff can post here."}
            helperText={channel.composer.helperText}
            onHeightChange={setComposerHeight}
          />
        )}
      </div>

        <ChannelDetailsOverlay
          channel={channel}
          config={config}
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </section>
    </>
  );
}

type ChannelDetailsOverlayProps = {
  channel: CommunityChannelPreset;
  config: CommunityChannelScreenConfig;
  open: boolean;
  onClose: () => void;
};

function ChannelDetailsOverlay({ channel, config, open, onClose }: ChannelDetailsOverlayProps) {
  if (!open) return null;
  const ChannelIcon = channel.icon;

  return (
    <div className="fixed inset-0 z-[120] flex">
      <aside className="flex h-full w-[80%] max-w-md flex-col gap-5 overflow-y-auto border-r border-siso-border bg-siso-bg-tertiary/95 px-5 py-6 shadow-[12px_0_45px_rgba(0,0,0,0.55)]">
        <div className="relative">
          <HighlightCard
            color="orange"
            className="w-full"
            title={config.threadName}
            description={channel.description}
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[22px]"
            descriptionClassName="text-xs"
            icon={<ChannelIcon className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
          />
        </div>

        <SettingsGroupCallout
          icon={<UsersRound className="h-4 w-4" />}
          title="Highlights"
          subtitle={config.highlightsSubtitle}
          showChevron={false}
        >
          <div className="grid gap-3">
            {channel.highlights.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-siso-text-muted">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                {stat.change ? <p className="text-xs text-siso-text-muted">{stat.change}</p> : null}
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<ListChecks className="h-4 w-4" />}
          title="Guidelines"
          subtitle={config.guidelinesSubtitle}
          showChevron={false}
        >
          <div className="space-y-3">
            {channel.guidelines.map((guideline) => (
              <div key={guideline.title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-sm font-semibold text-white">{guideline.title}</p>
                <p className="text-xs text-siso-text-muted">{guideline.description}</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Bookmark className="h-4 w-4" />}
          title="Quick links"
          subtitle={config.quickLinksSubtitle}
          showChevron={false}
        >
          <div className="space-y-2">
            {channel.quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-2xl border border-siso-border/40 bg-siso-bg-secondary/40 px-3 py-2 text-sm text-siso-text-primary transition hover:border-siso-orange/60 hover:text-white"
              >
                <span>
                  <span className="block font-semibold">{link.label}</span>
                  <span className="text-xs text-siso-text-muted">{link.description}</span>
                </span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </SettingsGroupCallout>

        {channel.pinned.length ? (
          <SettingsGroupCallout
            icon={<Bookmark className="h-4 w-4" />}
            title="Pinned"
            subtitle={config.pinnedSubtitle ?? "Keep these handy"}
            showChevron={false}
          >
            <div className="space-y-3">
              {channel.pinned.map((pin) => (
                <div key={pin.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{pin.title}</p>
                  <p className="text-xs text-siso-text-muted">{pin.summary}</p>
                  <p className="mt-2 text-[11px] text-siso-text-muted/80">
                    {pin.author} • {formatTimestamp(pin.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          </SettingsGroupCallout>
        ) : null}
      </aside>
      <button type="button" aria-label="Close channel panel" className="flex-1 bg-black/60" onClick={onClose} />
    </div>
  );
}

type ReadOnlyComposerNoticeProps = {
  message: string;
  helperText?: string;
  onHeightChange?: (height: number) => void;
};

function ReadOnlyComposerNotice({ message, helperText, onHeightChange }: ReadOnlyComposerNoticeProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onHeightChange) return;
    const node = ref.current;
    if (!node) return;

    const emit = () => onHeightChange(node.offsetHeight);
    emit();

    const resizeObserver = new ResizeObserver(emit);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [onHeightChange]);

  return (
    <footer
      ref={ref}
      className="fixed inset-x-0 z-[75] rounded-t-2xl border border-white/10 bg-siso-bg-tertiary/90 px-4 py-3 text-center text-sm text-siso-text-muted backdrop-blur"
      style={{
        bottom: 0,
        boxShadow: "0 -18px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.22)",
      }}
    >
      <p className="font-semibold text-white">{message}</p>
      {helperText ? <p className="mt-1 text-xs text-siso-text-muted">{helperText}</p> : null}
    </footer>
  );
}
