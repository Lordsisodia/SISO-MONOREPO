"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Folder, Sparkles, ArrowLeft } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { useRouter } from "next/navigation";
import type { PortfolioClientSummary, PortfolioStats } from "@/domains/partnerships/portfolio/types";
import { IndustrySelect } from "@/domains/partnerships/portfolio/ui/IndustrySelect";
import { Waves } from "@/components/ui/wave-background";

const DEFAULT_THUMB = "https://via.placeholder.com/512x320/111/fff?text=Portfolio";

type PortfolioMobileScreenProps = {
  clients: PortfolioClientSummary[];
  stats: PortfolioStats;
};

export function PortfolioMobileScreen({ clients, stats }: PortfolioMobileScreenProps) {
  const visibleClients = useMemo(() => clients.filter((c) => c.metadata?.showInPortfolio !== false), [clients]);
  const featured = useMemo(() => visibleClients.filter((c) => c.metadata?.featured), [visibleClients]);
  const [activeIndustry, setActiveIndustry] = useState<string>("all");
  const router = useRouter();

  const filtered = useMemo(() => {
    if (activeIndustry === "all") return visibleClients;
    return visibleClients.filter((c) => c.industry === activeIndustry);
  }, [activeIndustry, visibleClients]);
  const cards = filtered.length ? filtered : featured;

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ filter: "blur(6px)", opacity: 0.9 }}
      >
        <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#0b0b0f" pointerSize={0.35} />
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <button
              onClick={() => router.back()}
              aria-label="Back"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          <HighlightCard
            color="orange"
            title="Portfolio"
            description="Proof you can share now—mobile ready."
            metricValue={`${stats.totalProjects ?? featured.length} projects`}
            metricLabel="live library"
            buttonText="Open portfolio hub"
            onButtonClick={() => {
              const slug = featured[0]?.id ?? filtered[0]?.id ?? "";
              if (slug) window.location.href = `/public/portfolio/${slug}`;
            }}
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            className="w-full pl-12"
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />
        </div>

        <SettingsGroupCallout
          icon={<Folder className="h-4 w-4" />}
          title="Industries"
          subtitle="Filter proofs fast"
          showChevron={false}
        >
          <IndustrySelect value={activeIndustry} onChange={setActiveIndustry} />
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Featured proofs"
          subtitle="Swipe-worthy case studies"
          showChevron={false}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((client, index) => (
              <PortfolioListCard key={client.id} client={client} priority={index === 0} />
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}

function PortfolioListCard({ client, priority = false }: { client: PortfolioClientSummary; priority?: boolean }) {
  const cover = client.coverImage ?? DEFAULT_THUMB;
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "low";
  return (
    <Link
      href={`/public/portfolio/${client.id}`}
      className="block rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-siso-orange/50 transition"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={client.name}
          className="h-full w-full object-cover"
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
        />
        <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[11px] text-white">
          {client.projectType ?? "Project"}
        </span>
      </div>
      <div className="space-y-1 p-3">
        <p className="text-sm font-semibold text-white">{client.name}</p>
        <p className="text-xs text-siso-text-muted line-clamp-2">{client.tagline ?? client.description}</p>
        <div className="flex items-center justify-between text-xs text-siso-text-muted pt-1">
          <span className="rounded-full bg-white/5 px-2 py-1 uppercase tracking-[0.12em]">{client.industry}</span>
          <span className="inline-flex items-center gap-1 text-siso-orange">
            View <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
