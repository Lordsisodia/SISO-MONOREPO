import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function UpdatesChangesPolicyPage() {
  return renderSettingsRouteBySlug("legal/updates-changes-policy");
}
