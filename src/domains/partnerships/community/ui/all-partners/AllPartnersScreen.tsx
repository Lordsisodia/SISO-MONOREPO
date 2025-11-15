"use client";

import { useMemo, useState } from "react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { AnimatedGlowingSearchBar } from "@/components/ui/animated-glowing-search-bar";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { Button } from "@/components/ui/button";
import { partnerDirectory, type PartnerProfile } from "@/domains/partnerships/community/data/partnerDirectory";
import { Badge } from "@/components/ui/badge";
import { Sparkles, UsersRound, Filter, Globe } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

const filterOptions = [
  { id: "all", label: "All partners" },
  { id: "active", label: "Active now" },
  { id: "mentors", label: "Mentors" },
  { id: "hiring", label: "Hiring" },
];

export function AllPartnersScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filteredPartners = useMemo(() => {
    return partnerDirectory.filter((partner) => {
      const matchesSearch = search
        ? [
            partner.name,
            partner.focus,
            partner.location,
            partner.tags.join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        : true;

      const matchesFilter = (() => {
        switch (filter) {
          case "active":
            return partner.availability === "active";
          case "mentors":
            return Boolean(partner.openToMentor);
          case "hiring":
            return Boolean(partner.hiring);
          default:
            return true;
        }
      })();

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const activeNow = partnerDirectory.filter((partner) => partner.availability === "active").length;
  const mentors = partnerDirectory.filter((partner) => partner.openToMentor).length;
  const hiring = partnerDirectory.filter((partner) => partner.hiring).length;

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "community" }}>
      <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <HeroPanel activeCount={activeNow} mentorCount={mentors} hiringCount={hiring} />

          <SettingsGroupCallout
            icon={<Filter className="h-4 w-4" />}
            title="Search the roster"
            subtitle="Find collaborators by tier, timezone, or focus"
            showChevron={false}
          >
            <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
                <AnimatedGlowingSearchBar
                  placeholder="Try “commerce mentor” or “LATAM”"
                  wrapperClassName="w-full"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFilter(option.id)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] transition",
                      filter === option.id
                        ? "border-siso-orange bg-siso-orange/20 text-white"
                        : "border-white/20 bg-transparent text-siso-text-muted hover:border-white/40",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout
            icon={<UsersRound className="h-4 w-4" />}
            title="All partners"
            subtitle={`${filteredPartners.length} profiles • ${hiring} hiring • ${mentors} open to mentor`}
            showChevron={false}
          >
            <div className="grid gap-4">
              {filteredPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
              {filteredPartners.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 px-4 py-10 text-center text-sm text-siso-text-muted">
                  No partners match that filter yet.
                </div>
              ) : null}
            </div>
          </SettingsGroupCallout>
        </div>
      </section>
    </PartnersPageShell>
  );
}

function HeroPanel({ activeCount, mentorCount, hiringCount }: { activeCount: number; mentorCount: number; hiringCount: number }) {
  return (
    <HighlightCard
      color="orange"
      className="w-full pr-16"
      title="Partner directory"
      description="Browse every operator in the program, see their focus areas, and jump into a DM."
      hideDivider
      hideFooter
      metricValue=""
      metricLabel=""
      buttonText=""
      onButtonClick={() => {}}
      icon={<Sparkles className="h-5 w-5" />}
      titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
      descriptionClassName="text-xs"
      showCornerIcon={false}
    >
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatPill label="Active now" value={`${activeCount}`} description="online this hour" />
        <StatPill label="Mentors" value={`${mentorCount}`} description="happy to guide" />
        <StatPill label="Hiring" value={`${hiringCount}`} description="roles open today" />
      </div>
    </HighlightCard>
  );
}

function StatPill({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="text-[12px] text-white/70">{description}</p>
    </div>
  );
}

function PartnerCard({ partner }: { partner: PartnerProfile }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_14px_35px_rgba(0,0,0,0.35)] transition hover:border-white/25">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-white">
          {partner.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold text-white">{partner.name}</p>
            {partner.openToMentor ? <Badge className="bg-emerald-500/20 text-emerald-200">Mentor</Badge> : null}
            {partner.hiring ? <Badge className="bg-siso-orange/20 text-siso-orange">Hiring</Badge> : null}
          </div>
          <p className="text-xs text-siso-text-muted">{partner.focus}</p>
        </div>
      </div>

      <p className="mt-2 text-sm text-white/90">{partner.headline}</p>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/80">
        <StatChip label="Wins" value={partner.wins} />
        <StatChip label="Clients" value={partner.clients} />
      </div>
      <div className="mt-2 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80">
        <Globe className="h-3.5 w-3.5 text-white/60" />
        <span className="uppercase tracking-[0.2em]">{partner.location}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
        {partner.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/15 px-3 py-1 uppercase tracking-[0.2em]">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Button className="rounded-2xl px-6" variant="secondary">
          Message
        </Button>
        <Button variant="outline" className="rounded-2xl border-white/30 px-6 text-white/80">
          View Profile
        </Button>
      </div>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
