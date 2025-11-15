"use client";

import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod: any = await import("web-vitals");
        const { onCLS, onLCP, onTTFB, onINP } = mod;
        const maybeOnFID = mod.onFID as undefined | ((cb: any) => void);
        const endpoint = process.env.NEXT_PUBLIC_VITALS_ENDPOINT || "/api/vitals";
        const log = (metric: any) => {
          if (cancelled) return;
          // eslint-disable-next-line no-console
          console.log("[WebVitals]", metric.name, Math.round(metric.value), metric);
          if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
            try {
              const blob = new Blob([JSON.stringify(metric)], { type: 'application/json' });
              (navigator as any).sendBeacon(endpoint, blob);
            } catch {}
          }
        };
        onCLS?.(log);
        onLCP?.(log);
        onTTFB?.(log);
        onINP?.(log);
        // onFID existed in v4; noop in v5
        maybeOnFID?.(log);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[WebVitals] init failed", err);
      }
    })();
    return () => { cancelled = true; };
  }, []);
  return null;
}
