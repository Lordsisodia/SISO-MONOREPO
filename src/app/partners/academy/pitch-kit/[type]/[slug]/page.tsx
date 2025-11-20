import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, ExternalLink, Share2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { pitchKitDetails } from "@/domains/partnerships/portal-architecture/academy/ui/pitch-kit/data";
import { Waves } from "@/components/ui/wave-background";
import { CopyShareButton } from "../../components/CopyShareButton.client";

export default function PitchKitDetailPage({ params }: { params: { type: string; slug: string } }) {
  const key = `${params.type}/${params.slug}`;
  const kit = pitchKitDetails[key];

  if (!kit) return notFound();

  const shareUrl = kit.link;

  return (
    <main className="relative bg-siso-bg-primary text-siso-text-primary min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(6px)", opacity: 0.9 }}
      >
        <Waves
          className="h-full w-full"
          strokeColor="#f8a75c"
          backgroundColor="#0b0b0f"
          pointerSize={0.35}
        />
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <Link
              href="/partners/academy/pitch-kit"
              aria-label="Back to pitch kit hub"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <HighlightCard
            color="orange"
            title={kit.title}
            description={kit.summary}
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            hideDivider
            className="w-full pl-12"
            titleClassName="uppercase tracking-[0.25em] text-white"
            descriptionClassName="text-sm"
            footerContent={
              <div className="flex flex-wrap items-center gap-3 text-xs text-siso-text-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  Public
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-100">
                  Updated weekly
                </span>
              </div>
            }
          />
        </div>

        <section className="grid gap-3 sm:grid-cols-2">
          <CopyShareButton shareUrl={shareUrl} />
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4" />
            <span className="ml-2">Download PDF</span>
          </Button>
        </section>

        <SettingsGroupCallout icon={<ExternalLink className="h-4 w-4" />} title="Core assets" subtitle="Grab and send quickly." showChevron={false}>
          <div className="grid gap-3 md:grid-cols-2">
            <AssetLink label="Open deck" href={kit.assets?.deckUrl ?? kit.link} />
            {kit.assets?.pdfUrl ? <AssetLink label="Download PDF" href={kit.assets.pdfUrl} /> : null}
            {kit.assets?.onePagerUrl ? <AssetLink label="One-pager" href={kit.assets.onePagerUrl} /> : null}
            {kit.assets?.demoVideos?.map((demo) => (
              <AssetLink key={demo.url} label={demo.title} href={demo.url} />
            ))}
            {kit.assets?.caseStudies?.map((cs) => (
              <AssetLink key={cs.url} label={cs.title} href={cs.url} />
            ))}
            <AssetLink label="Copy talk track" href="#talk-track" />
            <AssetLink label="View objections" href="#objections" />
          </div>
        </SettingsGroupCallout>

        {kit.metrics?.length ? (
          <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Pilot targets" subtitle="What we expect to move in the first 30 days." showChevron={false}>
            <ul className="list-disc space-y-2 pl-5 text-sm text-siso-text-muted">
              {kit.metrics.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </SettingsGroupCallout>
        ) : null}

        <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Talk track" subtitle="Use as your default narrative." showChevron={false} id="talk-track">
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 space-y-3">
            <p className="text-sm text-siso-text-muted">{kit.talkTrack}</p>
            <div className="space-y-2 text-sm">
              {kit.followUps.map((q) => (
                <p key={q} className="flex items-start gap-2 text-siso-text-muted">
                  <ArrowRight className="mt-1 h-3 w-3 text-siso-orange" />
                  {q}
                </p>
              ))}
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<Share2 className="h-4 w-4" />} title="Objection handling" subtitle="Keep replies tight and evidence-backed." showChevron={false} id="objections">
          <div className="space-y-3">
            {kit.objections.map((item) => (
              <article key={item.objection} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-sm">
                <p className="font-semibold text-white">Q: {item.objection}</p>
                <p className="mt-1 text-siso-text-muted">A: {item.reply}</p>
              </article>
            ))}
          </div>
        </SettingsGroupCallout>

        {kit.sequenceSnippets && (kit.sequenceSnippets.email || kit.sequenceSnippets.linkedin || kit.sequenceSnippets.sms) ? (
          <SettingsGroupCallout icon={<Share2 className="h-4 w-4" />} title="Sequence snippets" subtitle="Copy/paste outreach starters." showChevron={false}>
            <div className="space-y-3 text-sm">
              {kit.sequenceSnippets.email ? <SnippetBlock label="Email" content={kit.sequenceSnippets.email} /> : null}
              {kit.sequenceSnippets.linkedin ? <SnippetBlock label="LinkedIn" content={kit.sequenceSnippets.linkedin} /> : null}
              {kit.sequenceSnippets.sms ? <SnippetBlock label="SMS" content={kit.sequenceSnippets.sms} /> : null}
            </div>
          </SettingsGroupCallout>
        ) : null}

        <SettingsGroupCallout icon={<ArrowRight className="h-4 w-4" />} title="Social proof & portfolio" subtitle="Attach 1–2 items when you send the deck." showChevron={false}>
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {kit.relatedProofs.map((proof) => (
                <Link
                  key={proof.href}
                  href={proof.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm text-siso-orange"
                >
                  <ArrowRight className="h-3 w-3" />
                  {proof.label}
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/partners/academy/portfolio">
                  <Sparkles className="mr-2 h-4 w-4" />
                  View portfolio
                </Link>
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<ExternalLink className="h-4 w-4" />} title="Industry research snapshot" subtitle="Use these in intros and follow-ups." showChevron={false}>
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 space-y-3">
            <ul className="list-disc space-y-2 pl-5 text-sm text-siso-text-muted">
              {kit.researchBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {kit.researchLink ? (
              <div className="pt-1">
                <Link href={kit.researchLink} className="inline-flex items-center gap-2 text-sm text-siso-orange">
                  <ExternalLink className="h-4 w-4" />
                  View deep-dive notes
                </Link>
              </div>
            ) : null}
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}

function AssetLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white hover:border-siso-orange"
    >
      <span>{label}</span>
      <ExternalLink className="h-4 w-4 text-siso-text-muted" />
    </Link>
  );
}

function SnippetBlock({ label, content }: { label: string; content: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{label}</p>
      <pre className="mt-2 whitespace-pre-wrap text-sm text-white">{content}</pre>
    </div>
  );
}
