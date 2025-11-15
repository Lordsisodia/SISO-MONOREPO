import { renderSettingsRouteBySlug } from "@/domains/partnerships/portal-architecture/settings/route-renderers";

export default async function TermsOfServicePage() {
  return renderSettingsRouteBySlug("legal/terms-of-service");
}
