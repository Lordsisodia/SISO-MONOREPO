"use client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Info as InfoIcon } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/domains/shared/utils/cn";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";

interface SettingsDetailLayoutProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  wrapContent?: boolean;
  contentClassName?: string;
  backHref?: string | null;
  backLabel?: string;
  compactHeader?: boolean; // reduce default top padding and hide background pattern
  hideHeader?: boolean; // suppress visual header block
  srTitle?: string; // render visually-hidden h1 when header is hidden
  showBackground?: boolean; // show FallingPattern behind content
}

export function SettingsDetailLayout({
  title,
  description,
  icon,
  children,
  wrapContent = true,
  contentClassName,
  backHref = "/partners/settings",
  backLabel = "Back to settings",
  compactHeader = false,
  hideHeader = false,
  srTitle,
  showBackground = true,
}: SettingsDetailLayoutProps) {
  const [info, setInfo] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const onInfo = (e: Event) => {
      const ev = e as CustomEvent<{ title: string; content: string }>;
      setInfo({ title: ev.detail.title, content: ev.detail.content });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfo(null);
    };
    window.addEventListener("siso:info", onInfo as any);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("siso:info", onInfo as any);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const content = wrapContent ? (
    <article
      className={cn(
        "rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4 text-sm text-siso-text-muted",
        contentClassName,
      )}
    >
      {children ?? <p>Configuration coming soon.</p>}
    </article>
  ) : (
    children ?? (
      <article
        className={cn(
          "rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4 text-sm text-siso-text-muted",
          contentClassName,
        )}
      >
        Configuration coming soon.
      </article>
    )
  );

  const showHeader = !hideHeader && Boolean(title || description || icon || backHref);

  return (
    <section
      className={cn(
        "relative flex flex-1 flex-col gap-4 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen",
        compactHeader ? "pt-4" : "pt-8",
      )}
    >
      {showBackground && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>
      )}
      {showHeader ? (
        <header className="relative z-10 space-y-3">
          <div className="flex min-w-0 items-center gap-3">
            {backHref ? (
            <Link
              href={backHref}
              className="inline-flex h-8 w-8 items-center justify-center text-siso-text-muted transition hover:text-siso-text-primary -ml-2"
              aria-label={backLabel}
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            ) : null}
            {icon}
            <h1 className="truncate whitespace-nowrap text-siso-text-primary uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]">{title}</h1>
          </div>
          <div className="h-1 rounded-full bg-gradient-to-r from-[var(--siso-red)] via-[var(--siso-orange)] to-[#ffd166] shadow-[0_0_12px_rgba(255,138,0,0.45)]" />
          {description ? <p className="text-xs text-siso-text-muted">{description}</p> : null}
        </header>
      ) : null}

      {hideHeader && (srTitle || title) ? <h1 className="sr-only">{srTitle || title}</h1> : null}

      <div className="relative z-10">
        {content}
      </div>

      {info ? (
        <div className="fixed inset-0 z-[99]" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setInfo(null)}
            aria-label="Dismiss info overlay"
          />
          <div
            className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border border-[rgba(255,167,38,0.32)] bg-[#0b0b0b] p-4 shadow-2xl"
            style={{ boxShadow: "0 -12px 30px rgba(0,0,0,0.6)" }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ color: "var(--siso-orange)" }}>
                <InfoIcon size={16} />
              </span>
              <h3 className="text-[15px] font-semibold text-siso-text-primary">{info.title}</h3>
            </div>
            <p className="mb-3 text-[13px] text-neutral-300 leading-snug">{info.content}</p>
            <button
              className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-white"
              style={{ background: "var(--siso-gradient-primary)" }}
              onClick={() => setInfo(null)}
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
