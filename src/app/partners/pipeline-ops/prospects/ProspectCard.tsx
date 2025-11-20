import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import Link from "next/link";
import { ArrowRight, Flag, Users, Clock3 } from "lucide-react";

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
      <div className="grid gap-3 text-xs text-white/70 sm:grid-cols-2">
        <Badge className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.35em]">
          <Users className="h-3.5 w-3.5" />
          {prospect.owner}
        </Badge>
        <Badge className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.35em]">
          <Flag className="h-3.5 w-3.5" />
          {prospect.stage}
        </Badge>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Confidence</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10" role="img" aria-label={`Confidence ${Math.round(prospect.confidence * 100)} percent`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-emerald-400"
              style={{ width: `${Math.round(prospect.confidence * 100)}%` }}
            />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Next action</p>
          <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
            <Clock3 className="h-4 w-4 text-white/60" />
            <span>{prospect.nextAction ?? "Define the next step"}</span>
          </div>
        </div>
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
