"use client";
import Link from "next/link";
import Plan from "@/components/ui/agent-plan";
import { SettingsDetailLayout } from "@/domains/partnerships/portal-architecture/settings/components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { ClipboardList, ChevronLeft } from "lucide-react";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";

export function ChecklistPanel() {
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
        srTitle="Partner Checklist"
      >
        <div className="checklist-panel-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Checklist Header Card */}
          <div className="relative min-h-[128px]">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <HighlightCard
              color="orange"
              className="w-full pl-12 checklist-card"
              title="Partner Checklist"
              description="Track onboarding, payout readiness, and enablement tasks"
              icon={<ClipboardList className="h-5 w-5" />}
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
            />
          </div>

          {/* Checklist Content */}
          <div className="space-y-8 pb-32 text-siso-text-primary">
            <SettingsGroupCallout
              icon={<ClipboardList className="h-4 w-4" />}
              title="Your Progress"
              subtitle="Complete tasks to activate your partnership"
              showChevron={false}
            >
              <Plan />
            </SettingsGroupCallout>
          </div>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
