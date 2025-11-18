"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { unlockMissions } from "@/domains/partnerships/earnings/data/tierProgression";
import { Target } from "lucide-react";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";

type FilterKey = "all" | "trailblazer" | "builder" | "vanguard" | "apex" | "sovereign" | "global";

const tierTags: Record<FilterKey, string[]> = {
  all: [],
  trailblazer: ["Trailblazer"],
  builder: ["Builder"],
  vanguard: ["Vanguard"],
  apex: ["Apex"],
  sovereign: ["Sovereign"],
  global: ["Global"],
};

export function EarningsMissionsScreen() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const missions = useMemo(() => {
    if (filter === "all") return unlockMissions;
    return unlockMissions.filter((m) => (m.tiers ? m.tiers.some((t) => tierTags[filter].includes(t)) : false));
  }, [filter]);

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8 text-siso-text-primary">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Unlock missions</p>
          <p className="text-xl font-semibold text-white">Do these to level up faster</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {(["all", "trailblazer", "builder", "vanguard", "apex", "sovereign", "global"] as FilterKey[]).map((key) => (
            <Button
              key={key}
              size="sm"
              variant={filter === key ? "secondary" : "outline"}
              className={filter === key ? "rounded-2xl" : "rounded-2xl border-white/20 text-white/80"}
              onClick={() => setFilter(key)}
            >
              {key}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {missions.map((mission) => (
          <SettingsGroupCallout
            key={mission.id}
            icon={<Target className="h-4 w-4" />}
            title={mission.title}
            subtitle={mission.description}
            showChevron={false}
          >
            <div className="space-y-2">
              <Badge className="bg-siso-orange/20 text-siso-orange">{mission.reward}</Badge>
              <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
                {mission.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              {mission.tiers ? (
                <div className="flex flex-wrap gap-2 text-[11px] text-siso-text-muted">
                  {mission.tiers.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="flex gap-2">
                <Button size="sm" className="rounded-2xl">
                  Start mission
                </Button>
                <Button size="sm" variant="outline" className="rounded-2xl border-white/20 text-white/80">
                  View rules
                </Button>
              </div>
            </div>
          </SettingsGroupCallout>
        ))}
      </div>
    </div>
  );
}
