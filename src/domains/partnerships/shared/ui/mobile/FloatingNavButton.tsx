"use client";

import { Menu as MenuIcon } from "lucide-react";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { cn } from "@/domains/shared/utils/cn";

export function FloatingNavButton({ className }: { className?: string }) {
  const { openDrawer } = useMobileNavigation();
  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label="Open navigation"
      className={cn(
        "fixed right-5 top-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-black/50 text-white shadow-lg backdrop-blur transition hover:border-white hover:bg-black/70",
        className,
      )}
    >
      <MenuIcon className="h-5 w-5" />
    </button>
  );
}
