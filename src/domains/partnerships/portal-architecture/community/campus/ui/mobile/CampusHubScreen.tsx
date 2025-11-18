"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { cn } from "@/domains/shared/utils/cn";
import { Button } from "@/components/ui/button";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import {
  heroCopy,
  hubAnnouncements,
  hubMetrics,
  hubNavCards,
  onboardingSteps,
  supportLinks,
} from "./partnershipHubData";

export function CampusHubScreen() {
  const { openDrawer, isDrawerOpen } = useMobileNavigation();
  const router = useRouter();

  const completedSteps = useMemo(() => onboardingSteps.slice(0, 2).map((step) => step.id), []);
  const heroMetricValue = `${completedSteps.length}/${onboardingSteps.length}`;
  const HeroIcon = heroCopy.icon;

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <section className="flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <header className="sticky top-0 z-20 rounded-b-2xl border-b border-siso-border/70 bg-siso-bg-tertiary/85 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Open campus drawer"
            className="inline-flex items-center gap-2 text-siso-text-primary transition hover:text-siso-orange"
            onClick={openDrawer}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h12" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wide text-siso-text-muted">Menu</span>
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] uppercase tracking-[0.4em] text-siso-text-muted">Now Viewing</span>
            <span className="text-lg font-semibold text-white">Partnership Hub</span>
          </div>

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-siso-text-muted">SISO</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <div>
            <HighlightCard
              color="orange"
              title={heroCopy.title}
              description={heroCopy.description}
              metricValue={heroMetricValue}
              metricLabel={heroCopy.metricLabel}
              buttonText={heroCopy.primaryCta.label}
              onButtonClick={() => handleNavigate(heroCopy.primaryCta.href)}
              icon={null}
              titleClassName="uppercase tracking-[0.35em] text-white"
              descriptionClassName="text-sm"
              hideDivider
              showCornerIcon={false}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
                onClick={() => handleNavigate(heroCopy.secondaryCta.href)}
              >
                {heroCopy.secondaryCta.label}
              </Button>
            </div>
          </div>

          <SettingsGroupCallout
            icon={<HeroIcon className="h-4 w-4 text-siso-orange" />}
            title="Launch checklist"
            subtitle="Complete these five steps to unlock all partner programs."
            showChevron={false}
          >
            <div className="space-y-3">
              {onboardingSteps.map((step) => {
                const completed = completedSteps.includes(step.id);
                return (
                  <div
                    key={step.id}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {completed ? "✓ " : null}
                        {step.title}
                      </p>
                      <p className="text-xs text-siso-text-muted">{step.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="border border-white/10 text-white"
                        onClick={() => handleNavigate(step.href)}
                      >
                        {step.actionLabel}
                      </Button>
                      <span
                        className={cn(
                          "text-[11px] uppercase tracking-[0.35em]",
                          completed ? "text-siso-orange" : "text-siso-text-muted",
                        )}
                      >
                        {completed ? "Completed" : "Queued"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </SettingsGroupCallout>

          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-siso-text-muted">Explore pages</p>
                <p className="text-sm text-siso-text-muted">Every partner surface explained in one place.</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="border border-white/10 text-white hover:border-white/30"
                onClick={() => handleNavigate("/partners/academy/my-progress")}
              >
                View roadmap
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {hubNavCards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => handleNavigate(card.href)}
                    className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-siso-orange hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-siso-orange">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{card.title}</p>
                        <p className="text-xs text-siso-text-muted">{card.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em]">
                      <span className="text-siso-text-muted">{card.badge}</span>
                      <span className="text-siso-orange">Open</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-siso-text-muted">Account health</p>
              <span className="text-[11px] text-siso-text-muted">Updated 2 hours ago</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {hubMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.35em] text-siso-text-muted">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                  <p className="text-xs text-siso-text-muted">{metric.helper}</p>
                </div>
              ))}
            </div>
          </section>

          <SettingsGroupCallout
            icon={<HeroIcon className="h-4 w-4 text-siso-orange" />}
            title="Announcements"
            subtitle="Stay ahead on releases, playbooks, and live broadcasts."
            showChevron={false}
          >
            <div className="space-y-3">
              {hubAnnouncements.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <span className="text-[11px] uppercase tracking-[0.35em] text-siso-text-muted">{item.timestamp}</span>
                  </div>
                  <p className="mt-2 text-sm text-siso-text-muted">{item.body}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 border border-white/10 text-white hover:border-white/30"
                    onClick={() => handleNavigate(item.href)}
                  >
                    {item.ctaLabel}
                  </Button>
                </article>
              ))}
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout
            icon={<HeroIcon className="h-4 w-4 text-siso-orange" />}
            title="Need help?"
            subtitle="Book a session, open docs, or ping Partner Success."
            showChevron={false}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {supportLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div key={link.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-siso-orange">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{link.title}</p>
                        <p className="text-xs text-siso-text-muted">{link.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 border border-white/10 text-white hover:border-white/30"
                      onClick={() => handleNavigate(link.href)}
                    >
                      {link.actionLabel}
                    </Button>
                  </div>
                );
              })}
            </div>
          </SettingsGroupCallout>
        </div>
      </div>

      {isDrawerOpen && (
        <footer
          className={cn(
            "mt-auto flex items-center gap-3 border-t border-siso-border bg-siso-bg-primary/95 px-4 py-3",
            "mb-[calc(env(safe-area-inset-bottom,0px)+78px)]",
          )}
        >
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-primary"
            aria-label="Open composer attachments"
          >
            +
          </button>
          <div className="flex-1 rounded-full border border-siso-border bg-siso-bg-secondary px-4 py-2 text-sm text-siso-text-muted">
            Message # ⭐ | intro-yourself
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-siso-orange text-siso-text-primary"
            aria-label="Send message"
          >
            ⬆
          </button>
        </footer>
      )}
    </section>
  );
}
