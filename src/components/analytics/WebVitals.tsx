"use client";

import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // web-vitals v5 exposes onCLS, onLCP, onTTFB, onINP
        // onFID was removed in v5; keep a safe fallback if present.
        const mod: any = await import("web-vitals");
        const { onCLS, onLCP, onTTFB, onINP } = mod;
        const maybeOnFID = mod.onFID as undefined | ((cb: any) => void);
        const log = (metric: any) => {
          if (cancelled) return;
          // eslint-disable-next-line no-console
          console.log("[WebVitals]", metric.name, Math.round(metric.value), metric);
        };
        onCLS?.(log);
        onLCP?.(log);
        onTTFB?.(log);
        onINP?.(log);
        // Call onFID only if this version still exports it (v4)
        maybeOnFID?.(log);
      } catch (err) {
        // Swallow vitals errors in dev; never break the app
        // eslint-disable-next-line no-console
        console.warn("WebVitals init failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
