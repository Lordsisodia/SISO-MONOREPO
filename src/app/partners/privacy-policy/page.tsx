import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function PrivacyPolicyPage() {
  return renderSettingsRouteBySlug("privacy-policy");
}