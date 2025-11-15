"use client";

const recentPlans = [
  {
    id: "plan-uber-2025",
    client: "Uber Eats Enterprise",
    industry: "Logistics",
    status: "Awaiting review",
    updatedAt: "Oct 31, 2025",
  },
  {
    id: "plan-fitness-2025",
    client: "Pulse Fitness Collective",
    industry: "Wellness",
    status: "Submitted to client-base",
    updatedAt: "Oct 27, 2025",
  },
];

export function AppPlanGeneratorPanel() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-8 text-slate-50">
      <section className="rounded-2xl border border-slate-700 bg-gradient-to-r from-cyan-700/40 via-slate-900/80 to-indigo-900/60 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold">Create an AI App Plan</h2>
        <p className="mt-2 max-w-xl text-sm text-slate-200">
          Assemble a client-ready plan in minutes. Add the client brief, upload assets,
          and let SISO&apos;s AI outline scope, roadmap, and pricing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-cyan-400">
            Start new plan
          </button>
          <button className="rounded-lg border border-cyan-400 px-4 py-2 text-sm text-cyan-200 transition hover:border-cyan-200 hover:text-cyan-100">
            Use saved template
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/70 p-6 shadow-lg">
        <header className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent drafts</h3>
            <p className="text-sm text-slate-400">Pick up where you left off.</p>
          </div>
          <button className="text-sm text-cyan-300 hover:text-cyan-200">Open library</button>
        </header>
        <ul className="mt-4 space-y-3">
          {recentPlans.map((plan) => (
            <li
              key={plan.id}
              className="grid gap-2 rounded-xl border border-slate-700/80 bg-slate-900/40 px-4 py-3 sm:grid-cols-[2fr,1fr,1fr]"
            >
              <div>
                <p className="font-medium text-slate-100">{plan.client}</p>
                <p className="text-xs text-slate-400">{plan.industry}</p>
              </div>
              <span className="self-center rounded-md bg-indigo-500/20 px-2 py-1 text-xs text-indigo-200">
                {plan.status}
              </span>
              <p className="self-center text-xs text-slate-400">Updated {plan.updatedAt}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-6 shadow-lg">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Quick actions
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Import client brief",
            "Attach Figma link",
            "Share with client-base",
            "Open industry assets",
            "Generate case study",
            "Schedule plan review",
          ].map((action) => (
            <button
              key={action}
              className="rounded-lg border border-slate-700/70 bg-slate-900/30 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-400/70 hover:text-cyan-200"
            >
              {action}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AppPlanGeneratorPanel;
