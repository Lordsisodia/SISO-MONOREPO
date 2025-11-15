import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function PartnerAgreementPage() {
  return renderSettingsRouteBySlug("legal/partner-agreement");
}
