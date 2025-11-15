import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function ServiceLevelAgreementPage() {
  return renderSettingsRouteBySlug("legal/service-level-agreement");
}
