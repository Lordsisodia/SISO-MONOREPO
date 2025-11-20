import { headers } from "next/headers";

type HeadersLike = Awaited<ReturnType<typeof headers>>;

export function getRequestBaseUrl(): string {
  try {
    const h = headers() as unknown as HeadersLike;
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      return `${proto}://${host}`;
    }
  } catch {
    // headers() throws when called outside a request context (e.g., during static builds)
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
