"use client";

import Link from "next/link";
import { ChevronLeft, Clock } from "lucide-react";
import { SettingsDetailLayout } from "../components/SettingsDetailLayout";

type ComingSoonProps = {
  title?: string;
  description?: string;
};

export default function ComingSoonView({ title = "Coming Soon", description }: ComingSoonProps) {
  return (
    <SettingsDetailLayout title="" description="" wrapContent={false} backHref={null}>
      <div className="space-y-4 pb-32 text-siso-text-primary">
        <div className="relative rounded-[26px] border border-white/10 bg-siso-bg-secondary p-5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
        <Link
          href="/partners/settings"
          className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
          aria-label="Back to settings"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      </div>
          <div className="pl-12">
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold uppercase tracking-[0.2em] text-siso-text-primary">{title}</h2>
            {description ? (
              <p className="text-xs text-siso-text-muted">{description}</p>
            ) : (
              <p className="text-xs text-siso-text-muted">This settings area is not available yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm text-siso-text-muted">
          We’re putting the finishing touches on this page. Check back soon or explore other settings.
        </div>
      </div>
    </SettingsDetailLayout>
  );
}

export { ComingSoonView };
