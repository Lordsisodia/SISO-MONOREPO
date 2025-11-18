"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, DownloadCloud, Filter, Layers, Link as LinkIcon, Share2, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { cn } from "@/domains/shared/utils/cn";
import { useRouter } from "next/navigation";
import { assetTypes, pitchAssets } from "./data";

const FallingPattern = dynamic(
  () =>
    import("@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern").then(
      (m) => m.FallingPattern,
    ),
  { ssr: false, loading: () => null },
);

const guideSteps = [
  "Pick the asset type that matches your prospect",
  "Save it to Saved Docs for quick re-use",
  "Copy the link or bundle with proof assets",
];

function AssetCard({ asset, onCopy }: { asset: PitchAsset; onCopy: (value: string) => void }) {
  return (
    <article className="rounded-3xl border border-white/8 bg-[#1F1F1F] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
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
      <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs">
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
  const router = useRouter();

  const handleCopy = (value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  };

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(6px)", opacity: 0.65 }}>
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Pitch kit"
          description="Ready-to-share sales materials aligned with your tier."
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          titleClassName="uppercase tracking-[0.3em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<Layers className="h-4 w-4" />}
          title="How to use"
          subtitle="Three steps to send a winning pitch."
          showChevron={false}
        >
          <div className="rounded-[18px] bg-white/5 p-4 space-y-3">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-200">
              Updated weekly
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Filter className="h-4 w-4" />}
          title="Search pitch kits"
          subtitle="Find the industry you're trying to approach."
          showChevron={false}
        >
          <div className="rounded-[18px] bg-white/5 p-4 space-y-2 siso-inner-card">
            <label className="relative block">
              <span className="sr-only">Search pitch kits</span>
              <input
                type="search"
                placeholder="Search by industry, audience, or outcome"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange focus:outline-none"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-siso-text-muted">
                <LinkIcon className="h-4 w-4" />
              </span>
            </label>
            <p className="text-xs text-siso-text-muted">Showing all pitch kits (search to narrow later).</p>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<ArrowRight className="h-4 w-4" />}
          title="Assets"
          subtitle="Copy, open, or share without leaving the page."
          showChevron={false}
        >
          <div className="space-y-4">
            {pitchAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onCopy={handleCopy} />
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Need more social proof?"
          subtitle="Jump to portfolio to pair your pitch with proof."
          showChevron={false}
        >
          <div className="rounded-[18px] bg-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-siso-text-muted">Browse portfolio case studies and attach to your pitch.</p>
              <Button variant="secondary" size="sm" onClick={() => router.push("/partners/academy/portfolio")}> 
                View portfolio
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
