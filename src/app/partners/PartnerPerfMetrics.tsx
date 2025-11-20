"use client";

import { useEffect } from "react";
import { onCLS, onINP, onLCP } from "web-vitals";

const METRIC_CHANNEL = "[partners-perf]";

type MetricPayload = Record<string, unknown> | number | string;

function logMetric(label: string, payload: MetricPayload) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(METRIC_CHANNEL, label, payload);
  }
  // TODO: pipe to analytics endpoint when available
}

export function PartnerPerfMetrics() {
  useEffect(() => {
    if (typeof performance === "undefined") return;
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navEntry) {
      logMetric("domContentLoaded", Math.round(navEntry.domContentLoadedEventEnd));
    }
    logMetric("hydrationComplete", Math.round(performance.now()));

    const onFirstInteraction = (event: Event) => {
      logMetric("firstInteraction", {
        type: event.type,
        ts: Math.round(performance.now()),
      });
    };

    const listenerOptions: AddEventListenerOptions = { once: true, capture: true };
    window.addEventListener("pointerdown", onFirstInteraction, listenerOptions);

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction, listenerOptions);
    };
  }, []);

  useEffect(() => {
    type LCPEntry = PerformanceEntry & { element?: Element };
    onLCP((metric) => {
      const lastEntry = metric.entries[metric.entries.length - 1] as LCPEntry | undefined;
      logMetric("LCP", {
        value: Math.round(metric.value),
        element: lastEntry?.element ? (lastEntry.element as Element).tagName : undefined,
      });
    });
    onINP((metric) => {
      logMetric("INP", Math.round(metric.value));
    });
    onCLS((metric) => {
      logMetric("CLS", metric.value);
    });
  }, []);

  return null;
}

export default PartnerPerfMetrics;
