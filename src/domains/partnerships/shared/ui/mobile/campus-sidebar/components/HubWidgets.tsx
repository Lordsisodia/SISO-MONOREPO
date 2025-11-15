import React from "react";
import {
  Briefcase as BriefcaseIcon,
  GraduationCap as GradIcon,
  CircleDollarSign as DollarIcon,
  Headphones,
  Trophy as TrophyIcon,
  AlertTriangle,
  FileText as FileTextIcon,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";

import type { HubCardAction, HubCardSpec } from "../types";

function HubSparkline({ data }: { data: number[] }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((value, idx) => {
      const x = data.length === 1 ? 50 : (idx / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-12 opacity-80" preserveAspectRatio="none">
      <polyline fill="none" stroke="url(#sparklineGradient)" strokeWidth={3} points={points} />
      <defs>
        <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,166,33,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HubRingProgress({ value }: { value: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width="80" height="80" className="text-neutral-700">
      <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="6" fill="none" opacity={0.25} />
      <circle
        cx="40"
        cy="40"
        r={radius}
        stroke="url(#ringGradient)"
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="ringGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
      <text x="50%" y="52%" textAnchor="middle" className="text-sm font-semibold" fill="#fff">
        {value}%
      </text>
    </svg>
  );
}

function HubCard({ spec, onNavigate }: { spec: HubCardSpec; onNavigate?: (href: string) => void }) {
  const {
    title,
    subtitle,
    description,
    metricLabel,
    metricValue,
    trend,
    icon,
    primaryAction,
    secondaryAction,
    secondaryLink,
    sparkline,
    progress,
    metaRows,
    variant = "standard",
    background,
  } = spec;

  const handle = (action?: HubCardAction) => {
    if (!action) return;
    onNavigate?.(action.href);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#090909] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col gap-4 ${
        variant === "hero" ? "md:min-h-[240px]" : "md:min-h-[220px]"
      }`}
    >
      {background && <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background }} />}
      <div className="flex items-start justify-between gap-3 relative">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-neutral-400">{title}</p>
          {subtitle && <p className="text-sm text-neutral-300">{subtitle}</p>}
        </div>
        <div className="size-9 rounded-xl flex items-center justify-center border border-neutral-800 bg-black/30 text-neutral-100">
          {icon}
        </div>
      </div>

      {sparkline && (
        <div className="relative">
          <HubSparkline data={sparkline} />
        </div>
      )}

      <div className="relative flex items-center gap-4">
        <div className="flex-1">
          {metricLabel && <div className="text-xs text-neutral-400">{metricLabel}</div>}
          {metricValue && <div className="text-3xl font-semibold text-white leading-tight">{metricValue}</div>}
          {trend && (
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              {trend}
            </div>
          )}
        </div>
        {progress && <HubRingProgress value={progress.value} />}
      </div>

      {description && <p className="text-sm text-neutral-300 leading-snug">{description}</p>}

      {metaRows && (
        <div className="grid grid-cols-2 gap-3 text-sm text-neutral-200">
          {metaRows.map((meta) => (
            <div key={`${spec.id}-${meta.label}`}>
              <div className="text-xs uppercase tracking-wide text-neutral-500">{meta.label}</div>
              <div className="text-[15px] font-medium text-white">{meta.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="relative flex flex-col gap-2">
        <button
          type="button"
          className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(255,166,33,0.35)]"
          onClick={() => handle(primaryAction)}
        >
          {primaryAction.label}
        </button>
        <div className="flex items-center justify-between text-xs text-neutral-400">
          {secondaryAction && (
            <button type="button" className="text-neutral-200 hover:text-white" onClick={() => handle(secondaryAction)}>
              {secondaryAction.label}
            </button>
          )}
          {secondaryLink && (
            <button type="button" className="flex items-center gap-1 text-neutral-400 hover:text-white" onClick={() => handle(secondaryLink)}>
              {secondaryLink.label}
              <MoreHorizontal size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function PartnershipHubWidgets({ onNavigate }: { onNavigate?: (href: string) => void }) {
  const cards: HubCardSpec[] = [
    {
      id: "pipeline",
      title: "Pipeline Pulse",
      subtitle: "Deals needing attention",
      description: "6 in motion · 2 waiting on you today",
      metricLabel: "Deals in motion",
      metricValue: "6",
      trend: "+2 vs last week",
      icon: <BriefcaseIcon size={18} className="text-amber-200" />,
      sparkline: [3, 4, 6, 5, 7, 6],
      metaRows: [
        { label: "Needs response", value: "2" },
        { label: "New submissions", value: "+3" },
      ],
      variant: "hero",
      background: "linear-gradient(135deg, rgba(255,153,0,0.18), rgba(12,12,12,0.8))",
      primaryAction: { label: "Open pipeline", href: "/partners/pipeline-ops/prospects" },
      secondaryAction: { label: "Submit client", href: "/partners/pipeline-ops/submit-client" },
      gridSpan: "md:col-span-2",
    },
    {
      id: "earnings",
      title: "Earnings & Tier",
      subtitle: "Active tier",
      description: "4 deals away from Performer",
      metricLabel: "Latest payout",
      metricValue: "$4,200",
      sparkline: [3200, 2800, 3600, 4200, 4000, 4500],
      icon: <DollarIcon size={18} className="text-emerald-200" />,
      metaRows: [
        { label: "Deals to next tier", value: "4" },
        { label: "Team overrides", value: "$860" },
      ],
      primaryAction: { label: "View earnings", href: "/partners/earnings" },
      secondaryAction: { label: "Tier progress", href: "/partners/tier-progress" },
    },
    {
      id: "support",
      title: "Support & Coaching",
      subtitle: "We’re online",
      description: "Next office hours · Today 2 PM",
      metricLabel: "Open threads",
      metricValue: "1",
      icon: <Headphones size={18} className="text-sky-200" />,
      metaRows: [
        { label: "Office hours", value: "2 PM" },
        { label: "Unread messages", value: "3" },
      ],
      primaryAction: { label: "Book office hours", href: "/partners/workspace/calendar/office-hours" },
      secondaryAction: { label: "Contact support", href: "/partners/support" },
      secondaryLink: { label: "Help center", href: "/partners/community/help" },
    },
    {
      id: "leaderboard",
      title: "Leaderboard Snapshot",
      subtitle: "Rank #6 · Performer lane",
      description: "You’re two deals behind Maya Lee",
      metricLabel: "Points",
      metricValue: "1,280",
      icon: <TrophyIcon size={18} className="text-amber-200" />,
      sparkline: [900, 960, 1020, 1100, 1180, 1280],
      metaRows: [
        { label: "Next rival", value: "Maya · 1,340" },
        { label: "Deals to pass", value: "2" },
      ],
      primaryAction: { label: "View leaderboard", href: "/partners/leaderboard" },
      secondaryAction: { label: "Post a win", href: "/partners/wins-feed" },
    },
    {
      id: "client-health",
      title: "Client Health",
      subtitle: "Stay ahead of risks",
      description: "2 prospects need attention",
      metricLabel: "At-risk",
      metricValue: "2",
      icon: <AlertTriangle size={18} className="text-red-300" />,
      metaRows: [
        { label: "Acme Retail", value: "No reply · 5d" },
        { label: "Nova Clinics", value: "Demo overdue" },
      ],
      primaryAction: { label: "Open at-risk", href: "/partners/pipeline-ops/prospects?filter=at-risk" },
      secondaryAction: { label: "Create follow-up", href: "/partners/workspace/tasks?filter=today" },
    },
    {
      id: "resource-spotlight",
      title: "Resource Spotlight",
      subtitle: "Retail AI pitch kit",
      description: "Fresh deck + objection handlers",
      metricLabel: "Saves this week",
      metricValue: "18",
      icon: <FileTextIcon size={18} className="text-blue-200" />,
      background: "linear-gradient(160deg, rgba(59,130,246,0.18), rgba(9,9,9,0.8))",
      metaRows: [
        { label: "Slides", value: "12" },
        { label: "Updated", value: "1d ago" },
      ],
      primaryAction: { label: "Open resource", href: "/partners/academy/pitch-kit" },
      secondaryAction: { label: "Save to docs", href: "/partners/academy/saved" },
    },
  ];

  return (
    <div className="w-full px-1 pb-4">
      <div className="grid w-full gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <div key={card.id} className={card.gridSpan ?? "md:col-span-1"}>
            <HubCard spec={card} onNavigate={onNavigate} />
          </div>
        ))}
      </div>
    </div>
  );
}
