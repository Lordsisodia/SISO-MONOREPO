import type { ReactNode } from "react";
import { cn } from "@/domains/shared/utils/cn";

interface ScreenViewportProps {
  children: ReactNode;
  isImmersive?: boolean;
  hasBottomNav?: boolean;
}

export function ScreenViewport({ children, isImmersive, hasBottomNav }: ScreenViewportProps) {
  // Bottom padding is entirely controlled by the active screen unless the nav
  // rail is visible, in which case we leave a small gutter for the spotlight UI.
  const paddingClass = hasBottomNav ? "pb-2" : "pb-0";

  return (
    <main
      className={cn(
        "relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-siso-bg-primary",
        paddingClass,
      )}
    >
      {children}
    </main>
  );
}
