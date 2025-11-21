"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCcw, ShieldCheck } from "lucide-react";
import type { RecruitmentProspect } from "../types";


const complianceCopy: Record<RecruitmentProspect["complianceStatus"], { label: string; tone: string }> = {
  pending: { label: "Compliance pending", tone: "text-amber-200 bg-amber-400/10 border-amber-200/40" },
  cleared: { label: "Compliance cleared", tone: "text-emerald-200 bg-emerald-400/10 border-emerald-300/40" },
  blocked: { label: "Needs attention", tone: "text-red-200 bg-red-500/10 border-red-300/40" },
};

const stageCopy: Record<RecruitmentProspect["segment"], { label: string; tone: string }> = {
  potential: { label: "Potential", tone: "border-orange-300/50 text-orange-100" },
  onboarding: { label: "Onboarding", tone: "border-amber-200/50 text-amber-100" },
  active: { label: "Active", tone: "border-emerald-300/50 text-emerald-100" },
  dormant: { label: "Dormant", tone: "border-white/40 text-white/80" },
};

const revenueFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function RecruitmentProspectCard({ prospect }: { prospect: RecruitmentProspect }) {
  const complianceTone = complianceCopy[prospect.complianceStatus];
  const stageTone = stageCopy[prospect.segment];
  const progressPct = Math.round(prospect.progress * 100);

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
      <header className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">Recruit</p>
        <h3 className="text-2xl font-semibold">{prospect.candidateName}</h3>
        <p className="text-sm text-white/70">{prospect.email}</p>
      </header>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge className="rounded-2xl bg-white/10 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.3em]">
          {prospect.tier}
        </Badge>
        <Badge className={`flex items-center gap-1.5 rounded-2xl border px-2.5 py-1.5 text-[9px] uppercase tracking-[0.3em] ${stageTone.tone}`}>
          {stageTone.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Deals closed</p>
          <p className="text-2xl font-semibold text-white">{prospect.dealsClosed}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Revenue</p>
          <p className="text-2xl font-semibold text-white">{revenueFormatter.format(prospect.revenueToDate)}</p>
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">Activation progress</p>
        <div className="mt-2 flex items-center gap-3">
          <Progress value={progressPct} className="h-2 flex-1 bg-white/10" />
          <span className="text-sm font-semibold text-white">{progressPct}%</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge className={`flex items-center gap-2 rounded-2xl border px-3 py-1 ${complianceTone.tone}`}>
          <ShieldCheck className="h-3 w-3" />
          {complianceTone.label}
        </Badge>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <button type="button" className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
          <RefreshCcw className="h-3.5 w-3.5" />
          Resend
        </button>
        <Button asChild className="flex-1 justify-center bg-siso-orange text-black hover:bg-orange-400">
          <Link href={`/partners/recruitment/prospects/${prospect.id}`}>Open profile</Link>
        </Button>
      </div>
    </article>
  );
}
