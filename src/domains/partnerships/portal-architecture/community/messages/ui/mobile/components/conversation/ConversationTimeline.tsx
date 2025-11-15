import { useMemo } from "react";
import type { ConversationMessage } from "../../fixtures/conversation-fixtures";
import { cn } from "@/domains/shared/utils/cn";

interface ConversationTimelineProps {
  messages: ConversationMessage[];
  showDayDividers?: boolean;
  dayLabelFormatter?: (date: Date) => string;
}

type DayGroup = {
  key: string;
  label?: string;
  showDivider: boolean;
  messages: ConversationMessage[];
};

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const dayKey = (date: Date) => date.toISOString().slice(0, 10);

export function ConversationTimeline({
  messages,
  showDayDividers = true,
  dayLabelFormatter,
}: ConversationTimelineProps) {
  const groups = useMemo<DayGroup[]>(() => {
    if (!messages.length) return [];

    if (!showDayDividers) {
      return [{ key: "all", showDivider: false, messages }];
    }

    const buckets: DayGroup[] = [];
    const bucketLookup = new Map<string, DayGroup>();

    messages.forEach((message, index) => {
      const sentAt = message.sentAt ? new Date(message.sentAt) : null;
      if (!sentAt || Number.isNaN(sentAt.getTime())) {
        const last = buckets[buckets.length - 1];
        if (last) {
          last.messages.push(message);
        } else {
          buckets.push({ key: `fallback-${index}`, showDivider: false, messages: [message] });
        }
        return;
      }

      const key = dayKey(sentAt);
      let group = bucketLookup.get(key);
      if (!group) {
        group = {
          key,
          showDivider: true,
          label: dayLabelFormatter ? dayLabelFormatter(sentAt) : dayFormatter.format(sentAt),
          messages: [],
        };
        bucketLookup.set(key, group);
        buckets.push(group);
      }
      group.messages.push(message);
    });

    return buckets;
  }, [messages, showDayDividers, dayLabelFormatter]);

  const renderMessage = (
    message: ConversationMessage,
    previous?: ConversationMessage,
  ) => {
    const isOutgoing = message.direction === "outgoing";
    const isSameAuthor = Boolean(
      previous && previous.authorName === message.authorName && previous.direction === message.direction,
    );

    return (
      <div
        key={message.id}
        className={cn(
          "flex items-start gap-2",
          isOutgoing ? "justify-end" : "justify-start",
          isSameAuthor ? "mt-1.5" : "mt-3",
        )}
      >
        <div
          className={cn(
            "mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold uppercase",
            isOutgoing ? "order-2" : "order-1",
            isOutgoing
              ? "border-siso-orange/40 bg-siso-orange/20 text-siso-text-primary"
              : "border-siso-orange/20 bg-siso-orange/15 text-siso-orange",
          )}
        >
          {message.authorInitials}
        </div>
        <div
          className={cn(
            "flex max-w-[78%] flex-col gap-1",
            isOutgoing ? "items-end order-1 text-right" : "items-start order-2 text-left",
          )}
        >
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-siso-text-muted">
            <span className="text-siso-text-primary">{message.authorName}</span>
            <span>{message.timestamp}</span>
          </div>
          <div
            className={cn(
              "rounded-3xl px-4 py-1.5 text-sm shadow-[0_6px_20px_rgba(0,0,0,0.35)]",
              isOutgoing
                ? "rounded-br border border-siso-orange/30 bg-siso-orange text-[#0f0800]"
                : "rounded-bl border border-siso-border/40 bg-siso-bg-secondary text-siso-text-primary",
            )}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-5 overflow-y-auto pr-0 font-sans" style={{ paddingBottom: 16 }}>
      {groups.map((group) => (
        <div key={group.key} className="space-y-2.5">
          {group.showDivider && group.label ? <DayDivider label={group.label} /> : null}
          {group.messages.map((message, index) => renderMessage(message, group.messages[index - 1]))}
        </div>
      ))}
    </div>
  );
}

function DayDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="flex-1 h-px bg-white/10" aria-hidden />
      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">{label}</span>
      <span className="flex-1 h-px bg-white/10" aria-hidden />
    </div>
  );
}
