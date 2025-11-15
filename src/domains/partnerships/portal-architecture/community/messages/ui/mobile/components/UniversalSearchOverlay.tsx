import { useEffect, useRef } from "react";
import { Filter, History, Search, X } from "lucide-react";

interface UniversalSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UniversalSearchOverlay({ isOpen, onClose }: UniversalSearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    return undefined;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-3xl border border-siso-border/70 bg-siso-bg-primary/95 p-5 shadow-[0_25px_65px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-black uppercase tracking-[0.08em] text-siso-text-primary/90">Universal Search</h2>
          <button
            type="button"
            className="rounded-full p-1.5 text-siso-text-muted transition hover:text-siso-orange"
            aria-label="Close universal search"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-siso-border/70 bg-siso-bg-secondary/80 px-3 py-2">
          <Search className="h-4 w-4 text-siso-text-muted" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search everything..."
            className="w-full border-none bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none"
          />
          <button
            type="button"
            className="rounded-full border border-siso-border/60 p-2 text-siso-text-muted transition hover:border-siso-orange hover:text-siso-orange"
            aria-label="Filter search"
          >
            <Filter className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-siso-border/60 p-2 text-siso-text-muted transition hover:border-siso-orange hover:text-siso-orange"
            aria-label="View recent searches"
          >
            <History className="h-4 w-4" />
          </button>
        </div>

        <section>
          <header className="mb-3 text-xs font-semibold uppercase tracking-wide text-siso-text-muted">
            Recently Viewed
          </header>
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-siso-border/70 bg-siso-bg-secondary/60 px-6 py-8 text-center text-siso-text-muted">
            <Search className="h-6 w-6 text-siso-text-muted" />
            <p className="text-sm font-medium">No recently viewed items</p>
            <p className="text-xs text-siso-text-muted/80">Results you open will appear here</p>
          </div>
        </section>
      </div>
    </div>
  );
}

