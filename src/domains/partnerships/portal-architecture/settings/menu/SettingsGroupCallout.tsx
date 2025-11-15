"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type SettingsGroupCalloutProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  afterTitle?: ReactNode;
  endBadge?: ReactNode;
  children?: ReactNode;
  showChevron?: boolean;
};

export function SettingsGroupCallout({ icon, title, subtitle, afterTitle, endBadge, children, showChevron = true }: SettingsGroupCalloutProps) {
  return (
    <section>
      {/* Outer darker callout wrapper (matches General) */}
      <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        {/* Header row inside the outer callout */}
        <div className="flex items-start justify-between gap-3 px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
              {icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-primary">{title}</p>
                {afterTitle ?? null}
              </div>
              {subtitle ? (
                <p className="text-xs text-siso-text-muted leading-snug max-w-[60ch]">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2 pr-1">
            {endBadge ? <span>{endBadge}</span> : null}
            {showChevron ? (
              <ChevronRight className="h-4 w-4 text-siso-text-muted" aria-hidden="true" />
            ) : null}
          </div>
        </div>
        {/* Inner content (scrim with dividers) */}
        <div className="px-3 pb-3">
          {children}
        </div>
      </div>
    </section>
  );
}

type SettingsTitleCalloutProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
};

export function SettingsTitleCallout({ icon, title, subtitle }: SettingsTitleCalloutProps) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-start gap-3 px-4 py-4">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
          {icon}
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-primary">{title}</p>
          {subtitle ? (
            <p className="text-xs text-siso-text-muted leading-snug max-w-[60ch]">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
