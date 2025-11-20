"use client";

import dynamic from "next/dynamic";
import type { MobileShellProps } from "./MobileShell";

const ClientMobileShell = dynamic(
  () => import("./MobileShell").then((mod) => mod.MobileShell),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Preparing mobile shell…</p>
      </div>
    ),
  },
);

export function LazyMobileShell(props: MobileShellProps) {
  return <ClientMobileShell {...props} />;
}

export default LazyMobileShell;
