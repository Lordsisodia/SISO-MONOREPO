import { useEffect, useMemo, useState } from "react";
import { MessageSquare, X } from "lucide-react";
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
  category?: "Pinned" | "Recent";
  presence?: "online" | "idle" | "offline";
};

type DirectoryItem = {
  id: string;
  name: string;
  note?: string;
};

type DirectoryOverlayProps = {
  isOpen: boolean;
  threads: ThreadOverview[];
  activeThreadId: string | null;
  onClose: () => void;
  onSelectThread: (threadId: string) => void;
  outgoingRequests: DirectoryItem[];
  blockedUsers: DirectoryItem[];
};

export function DirectoryOverlay({
  isOpen,
  threads,
  activeThreadId,
  onClose,
  onSelectThread,
  outgoingRequests,
  blockedUsers,
}: DirectoryOverlayProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<DirectoryPanel>(null);
  const [search, setSearch] = useState("");
  const [panelSearch, setPanelSearch] = useState("");
  const [isFilterTrayOpen, setIsFilterTrayOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "bots" | "leaders">("all");

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

  const threadSections = useMemo(() => {
    if (activePanel) return [];
    const grouped = new Map<string, ThreadOverview[]>();
    const order = ["Pinned", "Recent"];
    filteredThreads.forEach((thread) => {
      const key = thread.category ?? "Recent";
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(thread);
    });
    return order
      .filter((label) => grouped.has(label))
      .map((label) => ({ label, entries: grouped.get(label)! }));
  }, [filteredThreads, activePanel]);

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
            />
            <DirectorySearchBar
              search={search}
              onSearchChange={setSearch}
              activeFilter={activeFilter}
              onFilterChange={(value) => setActiveFilter(value)}
              isFilterTrayOpen={isFilterTrayOpen}
              onToggleFilters={() => setIsFilterTrayOpen((prev) => !prev)}
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
