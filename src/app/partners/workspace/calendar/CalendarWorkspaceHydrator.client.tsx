"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";

const LazyCalendarWorkspaceScreen = dynamic(() =>
  import("@/domains/partnerships/portal-architecture/workspace/calendar/ui").then((mod) => ({
    default: mod.CalendarWorkspaceScreen,
  })),
);

export function CalendarWorkspaceHydrator() {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "200px 0px" });

  return (
    <div ref={ref} aria-live="polite">
      {hydrated ? (
        <Suspense fallback={<CalendarFallback />}>
          <LazyCalendarWorkspaceScreen />
        </Suspense>
      ) : (
        <CalendarFallback />
      )}
    </div>
  );
}

function CalendarFallback() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
      Loading calendar…
    </div>
  );
}
