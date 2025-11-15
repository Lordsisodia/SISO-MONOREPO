import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";

type DirectorySearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  activeFilter: "all" | "unread" | "bots" | "leaders";
  onFilterChange: (value: "all" | "unread" | "bots" | "leaders") => void;
  isFilterTrayOpen: boolean;
  onToggleFilters: () => void;
};

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "bots", label: "Bots" },
  { id: "leaders", label: "Leads" },
] as const;

export function DirectorySearchBar({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  isFilterTrayOpen,
  onToggleFilters,
}: DirectorySearchBarProps) {
  return (
    <div className="mb-2 space-y-1.5">
      <label className="sr-only" htmlFor="messages-search">
        Search conversations
      </label>
      <div className="flex items-center gap-2 rounded-full border border-siso-border bg-siso-bg-tertiary/70 px-3 py-2">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-siso-text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-2-2" strokeLinecap="round" />
        </svg>
        <input
          id="messages-search"
          type="text"
          placeholder="Search friends & messages"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full border-none bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none"
        />
        <button
          type="button"
          className={cn(
            "rounded-full p-1.5 transition",
            isFilterTrayOpen ? "text-siso-orange" : "text-siso-text-muted hover:text-siso-orange",
          )}
          onClick={onToggleFilters}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>
      {isFilterTrayOpen && (
        <div className="flex flex-wrap gap-2 text-[11px]">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={cn(
                "rounded-full border px-3 py-1 transition",
                activeFilter === filter.id
                  ? "border-siso-orange bg-siso-orange/20 text-siso-orange"
                  : "border-siso-border/70 text-siso-text-muted hover:border-siso-border",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
