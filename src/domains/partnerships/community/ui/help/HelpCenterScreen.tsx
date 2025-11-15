"use client";

import { useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import { Search, Globe, ArrowRight, ChevronRight, BookmarkCheck, Share2, Sparkles, CreditCard, ShieldCheck, BarChart3, UsersRound, LifeBuoy } from "lucide-react";

import { SettingsDetailLayout } from "@/domains/partnerships/portal-architecture/settings/components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import type {
  HelpCollection,
  HelpArticle,
  HelpCollectionIcon,
} from "@/domains/partnerships/community/help/data/help-center";
import { cn } from "@/domains/shared/utils/cn";

type HelpCenterScreenProps = {
  collections: HelpCollection[];
};

type HelpCollectionScreenProps = {
  collection: HelpCollection;
};

type HelpArticleScreenProps = {
  collection: HelpCollection;
  article: HelpArticle;
};

export function HelpCenterScreen({ collections }: HelpCenterScreenProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return collections;
    return collections.filter((collection) =>
      [collection.title, collection.description]
        .concat(collection.articles.map((article) => `${article.title} ${article.summary}`))
        .some((text) => text.toLowerCase().includes(value)),
    );
  }, [collections, query]);

  return (
    <HelpShell title="Help Center">
      <HighlightCard
        color="orange"
        className="w-full pr-16"
        title="Help Center"
        description="Search articles, browse collections, or talk to Partner Success."
        hideDivider
        hideFooter
        showCornerIcon={false}
        titleClassName="uppercase tracking-[0.2em] font-semibold text-[26px] leading-[1.15] whitespace-nowrap"
        descriptionClassName="text-xs"
      />
      <HelpUtilities query={query} onQueryChange={setQuery} />
      <div className="space-y-4">
        {filtered.map((collection) => (
          <HelpCollectionCard key={collection.slug} collection={collection} />
        ))}
        {!filtered.length && (
          <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-siso-text-muted">
            No matches yet. Try another keyword or browse collections below.
          </p>
        )}
      </div>
    </HelpShell>
  );
}

export function HelpCollectionScreen({ collection }: HelpCollectionScreenProps) {
  const Icon = resolveIcon(collection.icon);
  return (
    <HelpShell title={`${collection.title} help`} breadcrumbs={[
      { label: "All collections", href: "/partners/community/help" },
      { label: collection.title },
    ]}>
      <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-5 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <header className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-siso-border bg-siso-bg-primary/70">
            <Icon className="h-5 w-5 text-siso-orange" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{collection.title}</h1>
            <p className="text-xs text-siso-text-muted">{collection.description}</p>
          </div>
        </header>
        <div className="mt-4 space-y-3">
          {collection.articles.map((article) => (
            <Link
              key={article.slug}
              href={`/partners/community/help/${collection.slug}/${article.slug}`}
              className="flex items-center justify-between rounded-[26px] border border-siso-border bg-siso-bg-primary/60 px-4 py-3 text-left text-white transition hover:border-siso-orange/70"
            >
              <div>
                <p className="text-sm font-semibold">{article.title}</p>
                <p className="text-xs text-siso-text-muted">{article.summary}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-siso-text-muted" />
            </Link>
          ))}
        </div>
      </div>
    </HelpShell>
  );
}

export function HelpArticleScreen({ collection, article }: HelpArticleScreenProps) {
  return (
    <HelpShell
      title={article.title}
      breadcrumbs={[
        { label: "All collections", href: "/partners/community/help" },
        { label: collection.title, href: `/partners/community/help/${collection.slug}` },
        { label: article.title },
      ]}
    >
      <article className="space-y-6 rounded-[26px] border border-white/10 bg-siso-bg-secondary p-5 text-sm text-siso-text-muted shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <header className="rounded-2xl border border-siso-border bg-siso-bg-primary/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">Last updated</p>
          <p className="text-white">{new Date(article.lastUpdated).toLocaleDateString()}</p>
          {article.summary ? <p className="mt-2 text-xs text-siso-text-muted">{article.summary}</p> : null}
        </header>
        <div className="space-y-4 text-sm text-siso-text-muted">
          {article.sections.map((section, index) => (
            <div
              key={section.heading ?? index}
              className="space-y-2 rounded-2xl border border-siso-border bg-siso-bg-primary/60 p-4"
            >
              {section.heading ? <h2 className="text-base font-semibold text-white">{section.heading}</h2> : null}
              {section.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
        <footer className="flex flex-col gap-3 rounded-2xl border border-siso-border bg-siso-bg-primary/60 p-4 text-xs text-siso-text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-white">
            <BookmarkCheck className="h-4 w-4 text-siso-orange" />
            <span>Was this helpful?</span>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:border-siso-orange hover:text-siso-orange">
              Yes
            </button>
            <button className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-siso-orange hover:text-siso-orange">
              No
            </button>
            <button className="ml-2 flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-siso-orange hover:text-siso-orange">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </footer>
      </article>
    </HelpShell>
  );
}

type HelpShellProps = {
  title: string;
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
};

function HelpShell({ title, children, breadcrumbs }: HelpShellProps) {
  return (
    <SettingsDetailLayout wrapContent={false} compactHeader hideHeader srTitle={title} backHref={null}>
      <div className="relative space-y-6">
        {breadcrumbs && (
          <div className="rounded-[18px] border border-white/10 bg-siso-bg-secondary/80 px-3 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
            <HelpBreadcrumbs items={breadcrumbs} />
          </div>
        )}
        {children}
      </div>
    </SettingsDetailLayout>
  );
}

type HelpUtilitiesProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

function HelpUtilities({ query, onQueryChange }: HelpUtilitiesProps) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary/90 p-4 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-1 text-xs">
          <Globe className="h-3.5 w-3.5 text-siso-text-muted" />
          <label className="flex items-center gap-1 text-white">
            Language
            <select className="bg-transparent text-xs font-semibold text-white/80 focus:outline-none">
              <option value="en">English</option>
            </select>
          </label>
        </div>
        <Link href="/partners/community/messages?tab=siso" className="text-xs font-semibold text-siso-orange">
          Contact support
        </Link>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
        <Search className="h-4 w-4 text-siso-text-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for articles..."
          className="w-full bg-transparent text-sm text-white placeholder:text-siso-text-muted focus:outline-none"
        />
      </div>
    </div>
  );
}

const iconMap: Record<HelpCollectionIcon, ComponentType<{ className?: string }>> = {
  "life-buoy": LifeBuoy,
  "credit-card": CreditCard,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  "bar-chart": BarChart3,
  users: UsersRound,
};

const resolveIcon = (key: HelpCollectionIcon) => iconMap[key] ?? LifeBuoy;

function HelpCollectionCard({ collection }: { collection: HelpCollection }) {
  const Icon = resolveIcon(collection.icon);
  return (
    <Link
      href={`/partners/community/help/${collection.slug}`}
      className="flex items-center justify-between gap-3 rounded-[26px] border border-white/10 bg-siso-bg-secondary p-4 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:border-siso-orange/70"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-siso-border bg-siso-bg-primary/70">
          <Icon className="h-5 w-5 text-siso-orange" />
        </div>
        <div>
          <p className="text-base font-semibold">{collection.title}</p>
          <p className="text-xs text-siso-text-muted">{collection.description}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-siso-text-muted" />
    </Link>
  );
}

function HelpCollectionHero() {
  return null;
}

type BreadcrumbItem = {
  label: string;
  href?: string;
};

function HelpBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-xs text-siso-text-muted" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} className="text-white/80 transition hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>▸</span> : null}
        </span>
      ))}
    </nav>
  );
}
