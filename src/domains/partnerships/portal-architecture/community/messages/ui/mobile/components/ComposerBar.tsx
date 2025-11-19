import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/domains/shared/utils/cn";
import { AnimatedGlowingSearchBar } from "@/components/ui/animated-glowing-search-bar";

type ComposerBarProps = {
  onHeightChange?: (height: number) => void;
  bottomOffset?: number;
  maxWidthClassName?: string;
  showAttachmentButton?: boolean;
  showEmojiButton?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onSend?: () => void;
  sendDisabled?: boolean;
  rightSlot?: React.ReactNode;
  inputDisabled?: boolean;
  topSlot?: React.ReactNode;
};

export function ComposerBar({
  onHeightChange,
  bottomOffset = 0,
  maxWidthClassName = "max-w-md",
  showAttachmentButton = true,
  showEmojiButton = true,
  inputPlaceholder = "Message SISO Agency",
  inputValue,
  onInputChange,
  onSend,
  sendDisabled,
  rightSlot,
  inputDisabled = false,
  topSlot,
}: ComposerBarProps) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onHeightChange) return;
    const node = barRef.current;
    if (!node) return;

    const emit = () => onHeightChange(node.offsetHeight);
    emit();

    const resizeObserver = new ResizeObserver(emit);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [onHeightChange]);

  return (
    <footer
      ref={barRef}
      className="fixed inset-x-0 z-[75] rounded-t-2xl border border-white/10 bg-siso-bg-tertiary/90 backdrop-blur"
      style={{
        bottom: bottomOffset,
        boxShadow: "0 -18px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.22)",
      }}
    >
      <div className={cn("relative mx-auto w-full", maxWidthClassName)}>
        {topSlot ? (
          <div className="pointer-events-none absolute inset-x-0 -top-[64px] px-3.5">
            <div className="mb-3">{topSlot}</div>
          </div>
        ) : null}
        <div className="flex w-full items-center gap-3 px-3.5 pt-2.5 pb-[calc(env(safe-area-inset-bottom,0px)+8px)]">
          {showAttachmentButton ? (
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-primary"
              aria-label="Add attachment"
          >
            +
          </button>
        ) : null}
        <div className="flex flex-1">
          <AnimatedGlowingSearchBar
            placeholder={inputPlaceholder}
            wrapperClassName="w-full"
            className="text-base font-sans"
            value={inputValue}
            onChange={(event) => onInputChange?.(event.target.value)}
            disabled={inputDisabled}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSend?.();
              }
            }}
          />
        </div>
        {rightSlot}
        {showEmojiButton ? (
          <button
            type="button"
            className="text-siso-text-muted transition hover:text-siso-orange"
            aria-label="Insert emoji"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 10h.01M15 10h.01" strokeLinecap="round" />
              <path d="M8.5 14c.6 1.2 2.1 2 3.5 2s2.9-.8 3.5-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
        {onSend ? (
          <button
            type="button"
            className="rounded-full bg-siso-orange px-3 py-1 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={onSend}
            disabled={sendDisabled}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        ) : null}
        </div>
      </div>
    </footer>
  );
}
