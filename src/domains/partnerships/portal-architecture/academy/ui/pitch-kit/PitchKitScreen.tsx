"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, DownloadCloud, Filter, Layers, Link as LinkIcon, Share2, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { cn } from "@/domains/shared/utils/cn";
import { useRouter } from "next/navigation";

export type PitchKitAssetType = "decks" | "demo-videos" | "case-studies" | "objection-handling" | "brand-kit";

interface PitchAsset {
  id: string;
  title: string;
  summary: string;
  type: PitchKitAssetType;
  status: "public" | "partner-only";
  focus: string;
  relatedProofs: { label: string; href: string }[];
  link: string;
  tags: string[];
}

const assetTypes: { id: PitchKitAssetType; label: string }[] = [
  { id: "decks", label: "Decks" },
  { id: "demo-videos", label: "Demo videos" },
  { id: "case-studies", label: "Case studies" },
  { id: "objection-handling", label: "Objection handling" },
  { id: "brand-kit", label: "Brand kit" },
];

const pitchAssets: PitchAsset[] = [
  {
    id: "deck-manufacturing",
    title: "Manufacturing pitch deck",
    summary: "Positioning, pricing, and ROI highlights for capital-intensive clients.",
    type: "decks",
    status: "partner-only",
    focus: "Great for positioning deals over £50k",
    relatedProofs: [{ label: "Retail Tech Case Study", href: "/partners/academy/portfolio/retail-tech-case-study" }],
    link: "/partners/academy/pitch-kit/decks/manufacturing",
    tags: ["manufacturing", "pricing", "roi"],
  },
  {
    id: "demo-video-automation",
    title: "Automation platform demo",
    summary: "2m walkthrough highlighting automation, dashboards, and ROI metrics.",
    type: "demo-videos",
    status: "public",
    focus: "Drop during discovery to show value quickly",
    relatedProofs: [{ label: "Design Ops Case Study", href: "/partners/academy/portfolio/design-ops-case-study" }],
    link: "/partners/academy/pitch-kit/demo-videos/automation-platform",
    tags: ["automation", "metrics"],
  },
  {
    id: "case-study-retail",
    title: "Retail tech case study",
    summary: "Customer story with before/after revenue impact and testimonials.",
    type: "case-studies",
    status: "partner-only",
    focus: "Proof point for retail / supply chain conversations",
    relatedProofs: [{ label: "Retail Tech Case Study", href: "/partners/academy/portfolio/retail-tech-case-study" }],
    link: "/partners/academy/pitch-kit/case-studies/retail-tech",
    tags: ["retail", "testimonials"],
  },
  {
    id: "objection-handling-price",
    title: "Price objection script",
    summary: "Three flexible replies backed by savings data and alternative offer options.",
    type: "objection-handling",
    status: "public",
    focus: "Use during pricing pushback",
    relatedProofs: [{ label: "ROI calculator", href: "/partners/academy/portfolio/roi-calculator" }],
    link: "/partners/academy/pitch-kit/objection-handling/price",
    tags: ["script", "pricing", "objections"],
  },
  {
    id: "brand-kit-colors",
    title: "Brand kit toolkit",
    summary: "Logos, colors, and messaging snippets aligned with SISO pillars.",
    type: "brand-kit",
    status: "partner-only",
    focus: "Share with prospects needing brand refresh",
    relatedProofs: [{ label: "Brand refresh playbook", href: "/partners/academy/portfolio/brand-refresh" }],
    link: "/partners/academy/pitch-kit/brand-kit/colors",
    tags: ["brand", "kit"],
  },
];

const guideSteps = [
  "Pick the asset type that matches your prospect",
  "Save it to Saved Docs for quick re-use",
  "Copy the link or bundle with proof assets",
];

function AssetCard({ asset, onCopy }: { asset: PitchAsset; onCopy: (value: string) => void }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">{asset.type.replace("-", " ")}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{asset.title}</h3>
          <p className="text-sm text-siso-text-muted">{asset.summary}</p>
        </div>
        <span
          className={cn(
            "rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.3em]",
            asset.status === "public" ? "border-emerald-400 text-emerald-300" : "border-amber-400 text-amber-300",
          )}
        >
          {asset.status === "public" ? "Public" : "Partner"}
        </span>
      </header>
      <p className="mt-3 text-xs text-siso-text-muted">{asset.focus}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {asset.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button asChild variant="secondary" size="sm">
          <Link href={asset.link} className="flex items-center gap-1">
            <DownloadCloud className="h-4 w-4" />
            <span>Open / download</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={() => onCopy(asset.link)}>
          <LinkIcon className="h-3 w-3" />
          <span className="ml-1">Copy link</span>
        </Button>
        <Button variant="ghost" size="sm" className="border border-white/10">
          <Share2 className="h-3 w-3" />
          <span className="ml-1">Save & share</span>
        </Button>
      </div>
      <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-xs">
        <p className="font-semibold text-white">Related proof</p>
        <div className="flex flex-wrap gap-2">
          {asset.relatedProofs.map((proof) => (
            <Link
              key={proof.href}
              href={proof.href}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-orange"
            >
              <ArrowRight className="h-3 w-3" />
              {proof.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export function PitchKitScreen() {
  const [activeType, setActiveType] = useState<PitchKitAssetType>(assetTypes[0].id);
  const filteredAssets = useMemo(() => pitchAssets.filter((asset) => asset.type === activeType), [activeType]);
  const router = useRouter();

  const handleCopy = useCallback((value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  }, []);

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Pitch kit"
          description="Ready-to-share sales materials aligned with your tier."
          metricValue={`${pitchAssets.length}`}
          metricLabel="assets"
          buttonText="Browse decks"
          onButtonClick={() => router.push("/partners/academy/courses")}
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          titleClassName="uppercase tracking-[0.3em] text-white"
          descriptionClassName="text-sm"
        />

        <div className="flex flex-wrap items-center gap-3">
          {assetTypes.map((assetType) => (
            <button
              key={assetType.id}
              type="button"
              onClick={() => setActiveType(assetType.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.3em] transition",
                activeType === assetType.id
                  ? "border-siso-orange bg-siso-orange/10 text-white"
                  : "border-white/10 text-siso-text-muted hover:border-white/40",
              )}
            >
              {assetType.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <SettingsGroupCallout
            icon={<Filter className="h-4 w-4" />}
            title="Filters & search"
            subtitle="Narrow by industry, status, or format."
            showChevron={false}
          >
            <div className="space-y-4">
              <label className="relative block">
                <span className="sr-only">Search pitch assets</span>
                <input
                  type="search"
                  placeholder="Search by audience or outcome"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange focus:outline-none"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-siso-text-muted">
                  <LinkIcon className="h-4 w-4" />
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                <Chip label="Show public links" active />
                <Chip label="Industry: Manufacturing" />
                <Chip label="Use: Discovery" />
              </div>
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout
            icon={<Layers className="h-4 w-4" />}
            title="How to use"
            subtitle="Three steps to send a winning pitch."
            showChevron={false}
          >
            <ol className="space-y-2 text-xs text-siso-text-muted">
              {guideSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-[11px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Button variant="ghost" size="sm" className="mt-3 border border-white/10 text-white" onClick={() => router.push("/partners/community/messages?tab=siso")}>
              Ask for a custom pitch
            </Button>
          </SettingsGroupCallout>
        </div>

        <SettingsGroupCallout
          icon={<ArrowRight className="h-4 w-4" />}
          title="Assets"
          subtitle="Copy, open, or share without leaving the page."
          showChevron={false}
        >
          <div className="space-y-4">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onCopy={handleCopy} />
            ))}
          </div>
        </SettingsGroupCallout>

        <section className="flex flex-col gap-3 rounded-[26px] border border-white/10 bg-siso-bg-secondary/60 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-siso-text-muted">Bundles</p>
              <h2 className="text-lg font-semibold text-white">Recommended combos</h2>
            </div>
            <Button variant="link" size="sm" className="text-siso-orange">
              View all
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { title: "Discovery kit", detail: "Deck + demo" },
              { title: "Closing kit", detail: "Case study + objection script" },
              { title: "Brand refresh kit", detail: "Brand + ROI" },
            ].map((bundle) => (
              <article key={bundle.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                <p className="text-sm font-semibold text-white">{bundle.title}</p>
                <p className="text-[11px] text-siso-text-muted">{bundle.detail}</p>
                <Button variant="ghost" size="sm" className="mt-2 border border-white/20 text-white">
                  Copy share kit
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-[26px] border border-white/10 bg-siso-bg-secondary/60 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-siso-text-muted">Support</p>
              <h2 className="text-lg font-semibold text-white">Need a new asset?</h2>
            </div>
            <Button variant="secondary" size="sm" onClick={() => router.push("/partners/community/messages?tab=siso")}>
              Message Partner Success
            </Button>
          </div>
          <p className="text-xs text-siso-text-muted">
            Our enablement team can craft a companion asset or bundle it with existing proof points.
          </p>
        </section>
      </div>
    </main>
  );
}

const Chip = ({ label, active }: { label: string; active?: boolean }) => (
  <span
    className={cn(
      "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]",
      active ? "border-siso-orange bg-siso-orange/10 text-white" : "border-white/10 text-siso-text-muted",
    )}
  >
    {label}
  </span>
);
