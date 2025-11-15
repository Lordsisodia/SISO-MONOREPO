export function formatDateShort(date: Date): string {
  // Stable, SSR-safe formatting: fixed locale + UTC to avoid server/client timezone drift
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

