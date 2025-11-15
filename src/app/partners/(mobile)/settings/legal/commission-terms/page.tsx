import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function CommissionTermsPage() {
  return renderSettingsRouteBySlug("legal/commission-terms");
}
