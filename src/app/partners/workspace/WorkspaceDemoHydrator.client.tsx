"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";

const LazyWorkspaceDemoClient = dynamic(() =>
  import("@/domains/partnerships/workspace/ui/WorkspaceDemoClient").then((mod) => ({
    default: mod.WorkspaceDemoClient,
  })),
);

type DemoCategory = { id: string; label: string; channels: Array<{ id?: string; label?: string }> };

interface WorkspaceDemoHydratorProps {
  categories: DemoCategory[];
}

export function WorkspaceDemoHydrator({ categories }: WorkspaceDemoHydratorProps) {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "200px 0px" });

  return (
    <div ref={ref} aria-live="polite">
      {hydrated ? (
        <Suspense fallback={<WorkspaceDemoFallback />}>
          <LazyWorkspaceDemoClient categories={categories} />
        </Suspense>
      ) : (
        <WorkspaceDemoFallback />
      )}
    </div>
  );
}

function WorkspaceDemoFallback() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
      Loading workspace demo…
    </div>
  );
}
