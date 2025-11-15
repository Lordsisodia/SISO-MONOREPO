"use client";

import Link from "next/link";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { FileText, ChevronLeft, ChevronRight, BookOpen, Users, CreditCard, ShieldCheck, Cookie, History, Shield } from "lucide-react";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import { InfoButton } from "@/components/ui/info-button";

const docIconFor = (id: string) => {
  const common = "h-6 w-6";
  switch (id) {
    case "terms":
      return <BookOpen className={common} />;
    case "partner-agreement":
      return <Users className={common} />;
    case "commission-terms":
      return <CreditCard className={common} />;
    case "service-level-agreement":
      return <ShieldCheck className={common} />;
    case "cookie-tracking-policy":
      return <Cookie className={common} />;
    case "updates-changes-policy":
      return <History className={common} />;
    case "compliance-regulatory":
      return <Shield className={common} />;
    default:
      return <FileText className={common} />;
  }
};
const legalDocuments = [
  {
    id: "terms",
    title: "Terms of Service",
    description: "Review our terms and conditions for using the platform",
    href: "/partners/settings/legal/terms-of-service",
    status: "Last updated: Jan 2024"
  },
  {
    id: "partner-agreement",
    title: "Partner Agreement",
    description: "Partnership terms, commission structures, and obligations",
    href: "/partners/legal/partner-agreement",
    status: "Required for all partners"
  },
  {
    id: "commission-terms",
    title: "Commission & Payment Terms",
    description: "Commission tiers, payment schedules, and tax responsibilities",
    href: "/partners/legal/commission-terms",
    status: "Last updated: Nov 2024"
  },
  {
    id: "service-level-agreement",
    title: "Service Level Agreement",
    description: "Uptime guarantees, support levels, and response times",
    href: "/partners/legal/service-level-agreement",
    status: "Last updated: Nov 2024"
  },
  {
    id: "cookie-tracking-policy",
    title: "Cookie & Tracking Policy",
    description: "Analytics tracking, marketing cookies, and preferences",
    href: "/partners/legal/cookie-tracking-policy",
    status: "Last updated: Nov 2024"
  },
  {
    id: "updates-changes-policy",
    title: "Updates & Changes Policy",
    description: "Version tracking, notifications, and re-acknowledgment requirements",
    href: "/partners/legal/updates-changes-policy",
    status: "Last updated: Nov 2024"
  },
  {
    id: "compliance-regulatory",
    title: "Compliance & Regulatory",
    description: "International requirements, AML/KYC, and industry rules",
    href: "/partners/legal/compliance-regulatory",
    status: "Last updated: Nov 2024"
  }
];

export function LegalSettingsScreen() {
  return (
    <>
      <style jsx global>{``}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
        compactHeader
        hideHeader
        srTitle="Legal Settings"
      >
        <div className="legal-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Standalone orange hero */}
          <div className="relative min-h-[128px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <Link
                href="/partners/settings"
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
                aria-label="Back to settings"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </div>
            <HighlightCard
              color="orange"
              className="w-full pl-12"
              title="Legal"
              description="Terms, Privacy Policy, Partner Agreement & Compliance"
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
              icon={<FileText className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
            />
          </div>

          {/* Outer callout wraps just the legal documents and its header with icon (like General) */}
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <div className="px-1">
              <div className="flex items-start gap-3 justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">Legal Documents</p>
                  <p className="text-xs text-siso-text-muted">Review our terms, privacy policy, and agreements.</p>
                </div>
                <InfoButton label="About legal docs" content="Read the terms and policies that govern use of the platform and partnerships." side="bottom" />
              </div>
            </div>
            <ScrimList className="mt-3" ariaLabel="Legal documents list">
              {legalDocuments.map(({ id, title, description, status, href }) => (
                <Link key={id} href={href} className="block">
                  <ScrimList.Row>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
                      {docIconFor(id)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-siso-text-primary">{title}</p>
                        <InfoButton
                          label={`${title} info`}
                          content={description}
                          side="bottom"
                        />
                      </div>
                      <p className="text-xs text-siso-text-muted">{description}</p>
                      <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{status}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-siso-text-muted" aria-hidden="true" />
                  </ScrimList.Row>
                </Link>
              ))}
            </ScrimList>
          </div>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
