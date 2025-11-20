"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";

const LazyClientNotesWorkspace = dynamic(() =>
  import("./ClientNotesWorkspace").then((mod) => ({ default: mod.ClientNotesWorkspace })),
);

export function ClientNotesHydrator() {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "200px 0px" });

  return (
    <div ref={ref} aria-live="polite">
      {hydrated ? (
        <Suspense fallback={<ClientNotesFallback />}>
          <LazyClientNotesWorkspace />
        </Suspense>
      ) : (
        <ClientNotesFallback />
      )}
    </div>
  );
}

function ClientNotesFallback() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
      Loading client notes…
    </div>
  );
}
