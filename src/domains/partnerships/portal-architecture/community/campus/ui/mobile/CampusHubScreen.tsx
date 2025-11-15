"use client";

import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { cn } from "@/domains/shared/utils/cn";

const pinMessage = {
  title: "Pinned Message",
  body: "**THIS IS THE CHANNEL TO INTRODUCE YOURSELF**",
};

const feed = [
  {
    id: "msg-1",
    author: "WolfyBands",
    badges: "✝ 🦄 🏆 ⚡",
    timestamp: "Today at 6:20 AM",
    title: "WELCOME TO HUSTLERS CAMPUS",
    body: `Whether you're flipping products or running neighborhood services, this is where cash flow begins.\n\nHere, you're not just learning... *you're executing.*\n\nEvery lesson is verified, every strategy works if you work.\n\n• You're starting in the trenches.\n• You're heading to the penthouse.\n(You'll understand once you start showing up to live calls.)\n\n**Your Mission Today:**\n1️⃣ Complete the #✅ | daily-checklist\n2️⃣ TAKE ACTION\n\n💬 Pick your path:\nNeighborhood Hustles? Jump into #🏠 | service-biz-chat\nFlipping? Head to #🎯 | flipping-chat`,
  },
];

export function CampusHubScreen() {
  const { openDrawer, isDrawerOpen } = useMobileNavigation();

  return (
    <section className="flex min-h-screen flex-col bg-siso-bg-primary">
      <header className="sticky top-0 z-20 border-b border-siso-border/70 bg-siso-bg-tertiary/85 px-4 py-3 backdrop-blur rounded-b-2xl">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Open campus drawer"
            className="inline-flex items-center gap-2 text-siso-text-primary transition hover:text-siso-orange"
            onClick={openDrawer}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h12" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wide text-siso-text-muted">Menu</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-widest text-siso-text-muted">Now Viewing</span>
            <span className="text-lg font-semibold text-siso-text-primary">Hustlers Campus</span>
          </div>

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-siso-text-muted">SISO-R</span>
        </div>
      </header>

      <div className="mx-4 mb-3 rounded-3xl border border-siso-border bg-siso-bg-secondary p-3 text-sm text-siso-text-secondary">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-medium text-siso-text-primary">{pinMessage.title}</span>
          <button className="text-xs text-siso-text-muted" type="button" aria-label="Dismiss pinned message">
            ✕
          </button>
        </div>
        <p>{pinMessage.body}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {feed.map((message) => (
          <article key={message.id} className="mb-6 rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <header className="mb-3 flex items-center gap-3">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-siso-bg-tertiary" />
              <div>
                <div className="flex items-center gap-2 text-sm text-siso-text-primary">
                  <span className="font-semibold">{message.author}</span>
                  <span className="text-xs text-siso-text-muted">{message.badges}</span>
                </div>
                <p className="text-xs text-siso-text-muted">{message.timestamp}</p>
              </div>
            </header>
            <h2 className="mb-3 text-lg font-semibold text-siso-text-primary">{message.title}</h2>
            <div className="space-y-3 whitespace-pre-line text-sm text-siso-text-secondary">
              {message.body.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      {isDrawerOpen && (
        <footer
          className={cn(
            "mt-auto flex items-center gap-3 border-t border-siso-border bg-siso-bg-primary/95 px-4 py-3",
            "mb-[calc(env(safe-area-inset-bottom,0px)+78px)]",
          )}
        >
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-primary"
            aria-label="Open composer attachments"
          >
            +
          </button>
          <div className="flex-1 rounded-full border border-siso-border bg-siso-bg-secondary px-4 py-2 text-sm text-siso-text-muted">
            Message # ⭐ | intro-yourself
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-siso-orange text-siso-text-primary"
            aria-label="Send message"
          >
            ⬆
          </button>
        </footer>
      )}
    </section>
  );
}
