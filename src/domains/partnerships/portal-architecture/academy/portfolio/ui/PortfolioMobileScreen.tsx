"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Folder, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { usePortfolioData } from "@/domains/partnerships/portfolio/hooks/use-portfolio-data";
import type { PortfolioClient } from "@/domains/partnerships/portfolio/types";
import { IndustrySelect } from "@/domains/partnerships/portfolio/ui/IndustrySelect";

const DEFAULT_THUMB = "https://via.placeholder.com/512x320/111/fff?text=Portfolio";

function getCover(client: PortfolioClient) {
  const shots = client.media?.screenshots?.mobile?.length
    ? client.media?.screenshots.mobile
    : client.media?.screenshots?.desktop ?? [];
  return shots?.[0] ?? DEFAULT_THUMB;
}

export function PortfolioMobileScreen() {
  const { clients, featured, stats } = usePortfolioData();
  const [activeIndustry, setActiveIndustry] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeIndustry === "all") return clients;
    return clients.filter((c) => c.industry === activeIndustry);
  }, [activeIndustry, clients]);

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
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
          hideDivider
          hideFooter
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

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
            {(filtered.length ? filtered : featured).map((client) => (
              <PortfolioListCard key={client.id} client={client} />
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}

function IndustryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        active ? "border-siso-orange text-white bg-siso-orange/20" : "border-white/10 text-siso-text-muted hover:border-white/30"
      }`}
    >
      {label}
    </button>
  );
}

function PortfolioListCard({ client }: { client: PortfolioClient }) {
  const cover = getCover(client);
  return (
    <Link
      href={`/public/portfolio/${client.id}`}
      className="block rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-siso-orange/50 transition"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={client.name} className="h-full w-full object-cover" loading="lazy" />
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
