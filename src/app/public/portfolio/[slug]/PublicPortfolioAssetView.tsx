"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe, Link as LinkIcon, Play, Sparkles } from "lucide-react";
import type { PortfolioClient } from "@/domains/partnerships/portfolio/types";

const DEFAULT_THUMB = "https://via.placeholder.com/1200x700/111/fff?text=Portfolio";

type ViewTab = "overview" | "features" | "tech" | "results" | "media";

export function PublicPortfolioAssetView({ client }: { client: PortfolioClient }) {
  const hero = client.media?.screenshots?.desktop?.[0] ?? client.media?.screenshots?.mobile?.[0] ?? DEFAULT_THUMB;
  const [tab, setTab] = useState<ViewTab>("overview");

  return (
    <main className="min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <header className="flex items-center gap-3">
          <Link href="/partners/academy/portfolio" className="inline-flex items-center text-siso-orange text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </header>

        <section className="rounded-3xl border border-white/10 bg-siso-bg-secondary p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-siso-text-muted">
              <Sparkles className="h-4 w-4 text-siso-orange" />
              {client.projectType ?? "Project"}
            </div>
            <h1 className="text-2xl font-bold text-white">{client.name}</h1>
            <p className="text-sm text-siso-text-muted">{client.tagline ?? client.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-siso-text-muted">
              <span className="rounded-full bg-white/10 px-2 py-1 uppercase tracking-[0.08em]">{client.industry}</span>
              {client.status ? (
                <span className="rounded-full bg-siso-orange/15 px-2 py-1 text-siso-orange">{client.status}</span>
              ) : null}
            </div>
          </div>

          {hero ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-siso-bg-tertiary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero} alt={client.name} className="w-full object-cover" />
            </div>
          ) : null}

          {/* Pills */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {[
              { id: "overview", label: "Overview" },
              { id: "features", label: "Features" },
              { id: "tech", label: "Tech" },
              { id: "results", label: "Results" },
              { id: "media", label: "Media" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id as ViewTab)}
                className={`rounded-full border px-3 py-1 transition ${
                  tab === t.id
                    ? "border-siso-orange bg-siso-orange/20 text-white"
                    : "border-white/15 text-siso-text-muted hover:border-white/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3 text-sm text-siso-text-muted">
            {tab === "overview" && <Overview client={client} />}
            {tab === "features" && <FeatureList client={client} />}
            {tab === "tech" && <TechList client={client} />}
            {tab === "results" && <Results client={client} />}
            {tab === "media" && <Media client={client} />}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {client.liveUrl ? <LinkTarget href={client.liveUrl} label="View live" icon={<Globe className="h-4 w-4" />} /> : null}
            {client.caseStudyUrl ? (
              <LinkTarget href={client.caseStudyUrl} label="Case study" icon={<LinkIcon className="h-4 w-4" />} />
            ) : null}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-siso-bg-secondary p-4">
          <div className="flex items-center justify-between text-sm text-siso-text-muted">
            <span>Browse more proofs</span>
            <Link href="/partners/academy/portfolio" className="inline-flex items-center gap-1 text-siso-orange">
              Back <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Overview({ client }: { client: PortfolioClient }) {
  return (
    <div className="space-y-1">
      <p>{client.description}</p>
      <div className="grid gap-2 sm:grid-cols-2 text-xs">
        <InfoTile label="Timeline" value={`${client.timeline?.durationDays ?? "—"} days`} />
        <InfoTile label="Delivery" value={client.pricing?.deliveryTime ?? "—"} />
        <InfoTile label="Value" value={client.pricing?.sisoPrice ? `£${client.pricing.sisoPrice}` : "—"} />
        <InfoTile label="Team" value={client.techStack?.tools?.slice(0, 2)?.join(", ") ?? "—"} />
      </div>
    </div>
  );
}

function FeatureList({ client }: { client: PortfolioClient }) {
  const feats = client.features?.key ?? [];
  const techFeats = client.features?.technical ?? [];
  return (
    <div className="space-y-2">
      <h3 className="text-white font-semibold text-sm">Key features</h3>
      <ul className="list-disc list-inside space-y-1">
        {feats.slice(0, 6).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {techFeats.length ? (
        <>
          <h4 className="text-white font-semibold text-sm">Technical</h4>
          <ul className="list-disc list-inside space-y-1">
            {techFeats.slice(0, 5).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

function TechList({ client }: { client: PortfolioClient }) {
  const stacks = client.techStack ?? { frontend: [], backend: [], database: [], tools: [] };
  const rows = [
    { label: "Frontend", items: stacks.frontend },
    { label: "Backend", items: stacks.backend },
    { label: "Database", items: stacks.database },
    { label: "Tools", items: stacks.tools },
  ];
  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-2 text-xs">
          <span className="w-20 text-siso-text-muted uppercase tracking-[0.08em]">{row.label}</span>
          <div className="flex flex-wrap gap-2">
            {row.items?.length ? row.items.map((i) => (
              <span key={i} className="rounded-full bg-white/10 px-2 py-1 text-white">{i}</span>
            )) : <span className="text-siso-text-muted">—</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Results({ client }: { client: PortfolioClient }) {
  const res = client.results;
  if (!res) return <p>No results provided.</p>;
  return (
    <div className="space-y-2 text-sm">
      <InfoTile label="Delivery speed" value={res.deliverySpeed ?? "—"} />
      {res.performanceMetrics ? (
        <div className="grid gap-2 sm:grid-cols-2 text-xs">
          <InfoTile label="Page load" value={res.performanceMetrics.pageLoadTime ?? "—"} />
          <InfoTile label="Lighthouse" value={res.performanceMetrics.lighthouseScore?.toString() ?? "—"} />
          <InfoTile label="Uptime" value={res.performanceMetrics.uptime ?? "—"} />
          <InfoTile label="Satisfaction" value={res.clientSatisfaction ? `${res.clientSatisfaction}/5` : "—"} />
        </div>
      ) : null}
      {res.businessImpact ? <p className="text-siso-text-muted">Impact: {res.businessImpact}</p> : null}
    </div>
  );
}

function Media({ client }: { client: PortfolioClient }) {
  const shots = client.media?.screenshots?.desktop ?? client.media?.screenshots?.mobile ?? [];
  if (!shots.length) return <p>No media yet.</p>;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {shots.slice(0, 4).map((url, idx) => (
        <div key={url + idx} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={`${client.name} media ${idx + 1}`} className="w-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-siso-text-muted">{label}</p>
      <p className="text-sm font-semibold text-white mt-1">{value}</p>
    </div>
  );
}

function LinkTarget({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-sm text-white hover:border-siso-orange/60"
    >
      {icon}
      {label}
    </Link>
  );
}
