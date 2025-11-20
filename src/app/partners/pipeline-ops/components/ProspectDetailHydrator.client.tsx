"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";

const LazyProspectDetailWorkspace = dynamic(
  () =>
    import("./ProspectDetailWorkspace").then((mod) => ({
      default: mod.ProspectDetailWorkspace,
    })),
  { ssr: false, loading: () => null },
);

export function ProspectDetailHydrator({ prospect }: { prospect: ProspectSummary }) {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "200px 0px" });

  return (
    <div ref={ref} aria-live="polite">
      {hydrated ? (
        <Suspense fallback={<ProspectDetailFallback />}>
          <LazyProspectDetailWorkspace prospect={prospect} />
        </Suspense>
      ) : (
        <ProspectDetailFallback />
      )}
    </div>
  );
}

function ProspectDetailFallback() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/60">
      Loading prospect workspace…
    </div>
  );
}
