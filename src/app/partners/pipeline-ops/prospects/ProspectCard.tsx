"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProspectCard({ prospect }: { prospect: ProspectSummary }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Company</p>
        <h3 className="text-2xl font-semibold">{prospect.company}</h3>
        <p className="text-sm text-white/70">
          {prospect.contactName} · {prospect.contactEmail}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-white/70">
        <Badge className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em]">
          {prospect.owner}
        </Badge>
        <Badge className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em]">
          {prospect.stage}
        </Badge>
        <Badge className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em]">
          {Math.round(prospect.confidence * 100)}% confidence
        </Badge>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Next action</p>
        <p className="mt-1 text-sm text-white/80">{prospect.nextAction ?? "Define the next step"}</p>
      </div>
      <Button asChild className="mt-auto gap-2 bg-siso-orange text-black hover:bg-orange-400">
        <Link href={`/partners/pipeline-ops/prospects/${prospect.id}`}>
          Open record
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
