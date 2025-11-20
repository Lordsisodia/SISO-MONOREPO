"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { DirectoryOverlayProps } from "./DirectoryOverlay";

const LazyDirectoryOverlay = dynamic(() =>
  import("./DirectoryOverlay").then((mod) => ({
    default: mod.DirectoryOverlay,
  })),
);

export function DirectoryOverlayHydrator(props: DirectoryOverlayProps) {
  if (!props.isOpen) {
    return null;
  }

  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-black/30" aria-hidden="true" />}>
      <LazyDirectoryOverlay {...props} />
    </Suspense>
  );
}
