import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function ComplianceRegulatoryPage() {
  return renderSettingsRouteBySlug("legal/compliance-regulatory");
}
