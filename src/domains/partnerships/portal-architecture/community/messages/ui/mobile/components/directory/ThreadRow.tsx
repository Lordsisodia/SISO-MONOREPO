import { cn } from "@/domains/shared/utils/cn";

interface ThreadRowProps {
  thread: ThreadOverview;
  isActive: boolean;
  onSelect: () => void;
}

export function ThreadRow({ thread, isActive, onSelect }: ThreadRowProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition",
        isActive ? "bg-siso-orange/10 text-siso-text-primary" : "text-siso-text-secondary hover:bg-siso-bg-tertiary/70",
      )}
      onClick={onSelect}
    >
      <div
        className={cn(
          "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full",
          isActive ? "bg-siso-orange/40 text-siso-orange" : "bg-siso-bg-tertiary text-siso-text-muted",
        )}
      >
        {thread.name.charAt(0)}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-sm font-semibold">
          {thread.name}
          {thread.badge ? <span className="ml-1 text-xs text-siso-orange">{thread.badge}</span> : null}
        </p>
        <p className="truncate text-xs text-siso-text-muted">{thread.preview}</p>
      </div>
      {thread.unreadCount ? (
        <span className="rounded-full bg-siso-red/20 px-2 py-1 text-xs text-siso-red">{thread.unreadCount}</span>
      ) : null}
    </button>
  );
}
