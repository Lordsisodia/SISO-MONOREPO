"use client";

import { Fragment } from "react";

const samplePayouts = [
  {
    id: "2025-10-28",
    label: "Payout • Oct 28, 2025",
    amount: "$1,280",
    status: "Scheduled",
  },
  {
    id: "2025-10-14",
    label: "Payout • Oct 14, 2025",
    amount: "$1,860",
    status: "Completed",
  },
  {
    id: "2025-09-30",
    label: "Payout • Sep 30, 2025",
    amount: "$980",
    status: "Completed",
  },
];

const sampleMetrics = [
  { id: "mrr", label: "Closed Revenue (30d)", value: "$18.4k" },
  { id: "commission", label: "Projected Commission", value: "$4.2k" },
  { id: "tier", label: "Current Tier", value: "Gold" },
];

export function CommissionsPanel() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-8 text-slate-50">
      <section className="grid gap-4 sm:grid-cols-3">
        {sampleMetrics.map((metric) => (
          <article
            key={metric.id}
            className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 shadow-md"
          >
            <p className="text-sm text-slate-300">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <article className="rounded-xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Monthly Performance</h2>
              <p className="text-sm text-slate-400">
                Trend of closed revenue vs. commission earned
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
              +18% MoM
            </span>
          </header>
          <div className="mt-6 h-48 rounded-lg bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-slate-800/60" />
        </article>

        <article className="rounded-xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Next Unlock
          </h3>
          <p className="mt-2 text-lg font-semibold text-slate-50">Platinum Tier</p>
          <p className="mt-1 text-sm text-slate-300">
            Close an additional $6k in verified revenue to unlock 35% commission and
            concierge support.
          </p>
          <div className="mt-4 h-2 rounded-full bg-slate-700">
            <div className="h-full w-3/5 rounded-full bg-emerald-400" />
          </div>
          <p className="mt-2 text-xs text-slate-400">60% of target achieved</p>
        </article>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Payout Timeline</h2>
          <button className="rounded-md border border-slate-600 px-3 py-1 text-sm text-slate-200 transition hover:border-slate-400">
            View in revenue hub
          </button>
        </header>
        <ul className="mt-4 space-y-3">
          {samplePayouts.map((payout, idx) => (
            <Fragment key={payout.id}>
              <li className="flex items-center justify-between rounded-lg border border-slate-700/70 bg-slate-900/40 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-100">{payout.label}</p>
                  <p className="text-xs text-slate-400">Status: {payout.status}</p>
                </div>
                <span className="text-base font-semibold text-emerald-300">{payout.amount}</span>
              </li>
              {idx === 0 && <div className="mx-auto h-6 w-px bg-slate-700" />}
            </Fragment>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CommissionsPanel;
