import { useEffect, useMemo, useState } from "react";
import { DirectoryHeader } from "./directory/DirectoryHeader";
import { DirectorySearchBar } from "./directory/DirectorySearchBar";
import { DirectorySections } from "./directory/DirectorySections";
import { DirectoryPanelDialog } from "./directory/DirectoryPanelDialog";

export type DirectoryPanel = "all" | "outgoing" | "blocked" | null;

export type ThreadOverview = {
  id: string;
  name: string;
  preview: string;
  unreadCount?: number;
  badge?: string;
  lastMessageAt?: string;
  category?: string;
  presence?: "online" | "idle" | "offline";
  status?: "active" | "draft" | "submitted" | "needs-info";
};

type DirectoryItem = {
  id: string;
  name: string;
  note?: string;
};

type DirectoryFilter = "all" | "unread" | "bots" | "leaders" | "drafts" | "submitted" | "needs-info";
type DirectoryVariant = "messages" | "client-submissions";

export type DirectoryOverlayProps = {
  isOpen: boolean;
  threads: ThreadOverview[];
  activeThreadId: string | null;
  onClose: () => void;
  onSelectThread: (threadId: string) => void;
  outgoingRequests: DirectoryItem[];
  blockedUsers: DirectoryItem[];
  variant?: DirectoryVariant;
};

export function DirectoryOverlay({
  isOpen,
  threads,
  activeThreadId,
  onClose,
  onSelectThread,
  outgoingRequests,
  blockedUsers,
  variant = "messages",
}: DirectoryOverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<DirectoryPanel>(null);
  const [search, setSearch] = useState("");
  const [panelSearch, setPanelSearch] = useState("");
  const [isFilterTrayOpen, setIsFilterTrayOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>("all");

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
      setActivePanel(null);
      setSearch("");
      setPanelSearch("");
      setIsFilterTrayOpen(false);
      setActiveFilter("all");
    }
  }, [isOpen]);

  const matchesFilter = (thread: ThreadOverview) => {
    if (variant === "client-submissions") {
      switch (activeFilter) {
        case "drafts":
          return thread.status === "draft";
        case "submitted":
          return thread.status === "submitted";
        case "needs-info":
          return thread.status === "needs-info";
        default:
          return true;
      }
    }

    switch (activeFilter) {
      case "unread":
        return Boolean(thread.unreadCount);
      case "bots":
        return thread.badge?.toLowerCase() === "bot";
      case "leaders":
        return Boolean(thread.badge?.toLowerCase().includes("captain"));
      default:
        return true;
    }
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredThreads = useMemo(() => {
    if (activePanel) return [];
    return threads.filter((thread) => {
      const matchesText =
        !normalizedSearch ||
        thread.name.toLowerCase().includes(normalizedSearch) ||
        thread.preview.toLowerCase().includes(normalizedSearch);
      return matchesText && matchesFilter(thread);
    });
  }, [threads, normalizedSearch, activeFilter, activePanel]);

  const sectionOrder = useMemo(
    () =>
      variant === "client-submissions"
        ? ["Active Intake", "Saved Drafts", "Needs Attention", "Submitted"]
        : ["Pinned", "Recent"],
    [variant],
  );

  const threadSections = useMemo(() => {
    if (activePanel) return [];
    const grouped = new Map<string, ThreadOverview[]>();
    filteredThreads.forEach((thread) => {
      const fallbackCategory = variant === "client-submissions" ? "Saved Drafts" : "Recent";
      const key = thread.category ?? fallbackCategory;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(thread);
    });
    const ordered: Array<{ label: string; entries: ThreadOverview[] }> = [];
    sectionOrder.forEach((label) => {
      if (grouped.has(label)) {
        ordered.push({ label, entries: grouped.get(label)! });
        grouped.delete(label);
      }
    });
    grouped.forEach((entries, label) => {
      ordered.push({ label, entries });
    });
    return ordered;
  }, [filteredThreads, activePanel, sectionOrder, variant]);

  const panelData = useMemo(() => {
    switch (activePanel) {
      case "outgoing":
        return {
          title: "Outgoing Requests",
          description: "Pending friendship or collaboration requests you have sent.",
          entries: outgoingRequests,
          emptyLabel: "No pending requests",
          searchPlaceholder: "Search outgoing requests",
        };
      case "blocked":
        return {
          title: "Blocked Contacts",
          description: "Users you have muted or blocked from your workspace.",
          entries: blockedUsers,
          emptyLabel: "You haven't blocked anyone yet",
          searchPlaceholder: "Search blocked users",
        };
      case "all":
        return {
          title: "All Contacts",
          description: "Full directory of recent conversations and connections.",
          entries: threads.map(({ id, name, preview }) => ({ id, name, note: preview })),
          emptyLabel: "No contacts available",
          searchPlaceholder: "Search contacts",
        };
      default:
        return null;
    }
  }, [activePanel, blockedUsers, outgoingRequests, threads]);

  const headerConfig = useMemo(
    () =>
      variant === "client-submissions"
        ? {
            title: "Client Submissions",
            description: "",
            menuOptions: [],
            searchPlaceholder: "Search submissions",
            color: "orange" as const,
          }
        : {
            title: "Messages & Friends",
            description: "",
            menuOptions: undefined,
            searchPlaceholder: "Search friends & messages",
            color: "orange" as const,
          },
    [variant],
  );

  const filterOptions =
    variant === "client-submissions"
      ? [
          { id: "all", label: "All" },
          { id: "drafts", label: "Drafts" },
          { id: "submitted", label: "Submitted" },
          { id: "needs-info", label: "Needs Info" },
        ]
      : undefined;

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-[65] flex">
        <aside className="relative h-full w-[90%] max-w-md overflow-y-auto border-r border-siso-border bg-siso-bg-secondary shadow-[12px_0_40px_rgba(0,0,0,0.35)]">
          <div className="flex min-h-full flex-col gap-2.5 px-5 py-4 pr-5">
            <DirectoryHeader
              isMenuOpen={isMenuOpen}
              onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
              onSelectPanel={(panel) => {
                setIsMenuOpen(false);
                setActivePanel(panel);
                setPanelSearch("");
              }}
              title={headerConfig.title}
              description={headerConfig.description}
              menuOptions={headerConfig.menuOptions}
              color={headerConfig.color}
            />
            <DirectorySearchBar
              search={search}
              onSearchChange={setSearch}
              activeFilter={activeFilter}
              onFilterChange={(value) => setActiveFilter(value as DirectoryFilter)}
              isFilterTrayOpen={isFilterTrayOpen}
              onToggleFilters={() => setIsFilterTrayOpen((prev) => !prev)}
              searchPlaceholder={headerConfig.searchPlaceholder}
              filterOptions={filterOptions}
            />
            {!activePanel && (
              <DirectorySections
                sections={threadSections.map(({ label, entries }) => ({ label, entries }))}
                activeThreadId={activeThreadId}
                onSelectThread={onSelectThread}
              />
            )}
          </div>
        </aside>
        <button type="button" aria-label="Close overlay" className="flex-1 bg-black/55" onClick={onClose} />
      </div>

      {activePanel && panelData && (
        <DirectoryPanelDialog
          panel={activePanel}
          panelData={panelData}
          panelSearch={panelSearch}
          onPanelSearchChange={setPanelSearch}
          onClose={() => setActivePanel(null)}
        />
      )}
    </>
  );
}
