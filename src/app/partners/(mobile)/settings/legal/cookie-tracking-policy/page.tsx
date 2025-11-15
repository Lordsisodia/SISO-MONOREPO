import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function CookieTrackingPolicyPage() {
  return renderSettingsRouteBySlug("legal/cookie-tracking-policy");
}
