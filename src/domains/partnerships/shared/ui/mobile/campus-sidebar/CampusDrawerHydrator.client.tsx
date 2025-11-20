"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";

const LazyCampusDrawer = dynamic(() =>
  import("./CampusDrawer").then((mod) => ({ default: mod.CampusDrawer })),
);

export function CampusDrawerHydrator() {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "0px 0px 0px 0px" });

  return (
    <div ref={ref} className="fixed inset-0 z-40 pointer-events-none" aria-hidden={!hydrated}>
      {hydrated ? (
        <Suspense fallback={<div className="sr-only" aria-hidden="true" />}> 
          <LazyCampusDrawer />
        </Suspense>
      ) : null}
    </div>
  );
}
