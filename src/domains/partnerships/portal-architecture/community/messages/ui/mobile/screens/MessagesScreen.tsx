"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { mockThreads } from "../fixtures/message-fixtures";
import { mockConversation } from "../fixtures/conversation-fixtures";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { DirectoryOverlay } from "../components/DirectoryOverlay";
import { ChatViewport } from "../components/ChatViewport";
import { ComposerBar } from "../components/ComposerBar";
import { ConversationTimeline } from "../components/conversation/ConversationTimeline";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";

interface MessagesScreenProps {
  initialThreadId?: string;
}

export function MessagesScreen({ initialThreadId }: MessagesScreenProps = {}) {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [composerHeight, setComposerHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const [isThreadInfoOpen, setIsThreadInfoOpen] = useState(false);
  const { setImmersiveMode, setActiveTab, isImmersiveMode, openDrawer } = useMobileNavigation();

  useEffect(() => {
    setActiveTab("messages", { immersive: true });
  }, [setActiveTab]);

  useEffect(() => {
    if (!activeThread && mockThreads.length > 0) {
      const fallback = initialThreadId ?? mockThreads[0].id;
      setActiveThread(fallback);
      setImmersiveMode(true);
      setActiveTab("messages", { immersive: true });
    }
  }, [activeThread, initialThreadId, setActiveTab, setImmersiveMode]);

  const activeThreadData = useMemo(
    () => mockThreads.find((thread) => thread.id === activeThread),
    [activeThread],
  );

  const avatarLabel = useMemo(() => {
    if (!activeThreadData?.name) return "SA";
    return activeThreadData.name
      .split(" ")
      .map((segment) => segment.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [activeThreadData]);

  const outgoingRequests = useMemo(
    () => [
      { id: "req-1", name: "Nova Carter", note: "Brand assets approval pending" },
      { id: "req-2", name: "Leo Summers", note: "Invited to SISO Collective" },
    ],
    [],
  );

  const blockedUsers = useMemo(
    () =>
      [] as Array<{
        id: string;
        name: string;
        note?: string;
      }>,
    [],
  );

  const openDirectory = () => {
    setIsDirectoryOpen(true);
    setIsThreadInfoOpen(false);
    setImmersiveMode(false);
    setActiveTab("messages", { immersive: false });
  };

  const closeDirectory = () => {
    setIsDirectoryOpen(false);
    setImmersiveMode(true);
    setActiveTab("messages", { immersive: true });
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThread(threadId);
    setIsThreadInfoOpen(false);
    closeDirectory();
  };

  const threadInfoProfiles = useMemo(
    () => ({
      saved: {
        name: "Saved Messages",
        bio: "Your private space to stash links, scripts, and notes.",
        contactNumber: "—",
        website: "siso.agency",
        tier: "Internal",
        clientsReferred: 0,
        partnerSince: "Aug 2024",
      },
      captain: {
        name: "Rauzas | Captain",
        bio: "Partnership captain keeping weekly targets on track.",
        contactNumber: "+1 (555) 210-7788",
        website: "captains.siso.agency",
        tier: "Tier A",
        clientsReferred: 14,
        partnerSince: "Jan 2023",
      },
      guide: {
        name: "HQ Guide",
        bio: "Automated HQ assistant for rituals and quick answers.",
        contactNumber: "+1 (555) 300-1122",
        website: "guide.siso.agency",
        tier: "Assistant",
        clientsReferred: 6,
        partnerSince: "Oct 2023",
      },
    }),
    [],
  );

  const currentThreadInfo = activeThread ? threadInfoProfiles[activeThread as keyof typeof threadInfoProfiles] ?? null : null;

  useEffect(() => {
    if (!currentThreadInfo) {
      setIsThreadInfoOpen(false);
    }
  }, [currentThreadInfo]);

  useLayoutEffect(() => {
    const measure = () => {
      const navValue = getComputedStyle(document.documentElement).getPropertyValue("--mobile-nav-height");
      const parsed = parseFloat(navValue);
      setNavHeight(Number.isFinite(parsed) ? parsed : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      const navValue = getComputedStyle(document.documentElement).getPropertyValue("--mobile-nav-height");
      const parsed = parseFloat(navValue);
      setNavHeight(Number.isFinite(parsed) ? parsed : 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [isImmersiveMode, isDirectoryOpen]);

  return (
    <section className="relative flex flex-1 flex-col px-3 pt-1.5 pb-0 font-sans">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col">
        <ChatViewport
          isDirectoryOpen={isDirectoryOpen}
          onOpenDirectory={openDirectory}
          threadName={activeThreadData?.name ?? "SISO Agency"}
          threadStatus="Active now"
          avatarLabel={avatarLabel}
          contentOffset={composerHeight + navHeight + 6}
          onToggleThreadInfo={() => setIsThreadInfoOpen((prev) => !prev)}
          isThreadInfoOpen={isThreadInfoOpen}
          threadInfo={currentThreadInfo}
          onOpenAppDrawer={openDrawer}
        >
          <div className="mb-4 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-siso-text-primary/80">
              {activeThreadData?.name ?? "SISO Agency"}
            </h2>
            <p className="text-xs text-siso-text-muted">This is the start of your conversation</p>
          </div>
          <ConversationTimeline messages={mockConversation} />
        </ChatViewport>

        {!isDirectoryOpen && (
          <ComposerBar onHeightChange={setComposerHeight} bottomOffset={navHeight} />
        )}

        {currentThreadInfo && isThreadInfoOpen && (
          <div
            className="fixed inset-0 z-[110] flex items-start justify-center bg-black/70 px-4 py-12"
            onClick={() => setIsThreadInfoOpen(false)}
          >
            <div
              className="w-full max-w-md rounded-[32px] border border-siso-border/60 bg-siso-bg-tertiary/95 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-siso-text-primary">{currentThreadInfo.name}</p>
                  <p className="text-sm text-siso-text-muted">{currentThreadInfo.bio}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsThreadInfoOpen(false)}
                  className="text-siso-text-muted transition hover:text-siso-orange"
                  aria-label="Close profile panel"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-3xl border border-siso-border/60 bg-siso-bg-secondary/80 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">Tier</p>
                  <p className="text-lg font-semibold text-siso-text-primary">{currentThreadInfo.tier}</p>
                </div>
                <div className="rounded-3xl border border-siso-border/60 bg-siso-bg-secondary/80 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">Clients Referred</p>
                  <p className="text-lg font-semibold text-siso-orange">{currentThreadInfo.clientsReferred}</p>
                </div>
                <div className="rounded-3xl border border-siso-border/60 bg-siso-bg-secondary/80 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">Partner Since</p>
                  <p className="text-base font-medium text-siso-text-primary">{currentThreadInfo.partnerSince}</p>
                </div>
                <div className="rounded-3xl border border-siso-border/60 bg-siso-bg-secondary/80 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">Website</p>
                  <p className="truncate text-sm text-siso-orange">{currentThreadInfo.website}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="rounded-3xl border border-siso-border/60 bg-siso-bg-secondary/80 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">Contact</p>
                  <p className="text-base font-medium text-siso-text-primary">{currentThreadInfo.contactNumber}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <DirectoryOverlay
          isOpen={isDirectoryOpen}
          onClose={closeDirectory}
          threads={mockThreads}
          activeThreadId={activeThread}
          onSelectThread={handleSelectThread}
          outgoingRequests={outgoingRequests}
          blockedUsers={blockedUsers}
        />
      </div>
    </section>
  );
}
