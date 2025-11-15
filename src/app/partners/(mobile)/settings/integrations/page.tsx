import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function SettingsIntegrationsPage() {
  return renderSettingsRouteBySlug("integrations");
}
