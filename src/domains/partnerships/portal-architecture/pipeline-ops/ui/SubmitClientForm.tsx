"use client";

import { useState, useTransition } from "react";
import { submitClient } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";

export function SubmitClientForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [dealSizeEstimate, setDealSizeEstimate] = useState("50000");
  const [notes, setNotes] = useState("");
  const [vertical, setVertical] = useState("SaaS");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const response = await submitClient({
          companyName,
          contactEmail,
          dealSizeEstimate: Number(dealSizeEstimate) || 0,
          notes,
          vertical,
        });
        setResult(`Intake ${response.intakeId} received. SLA ${response.estimatedSlaHrs}h.`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-white">
      <div>
        <label className="text-xs uppercase tracking-[0.25em] text-white/60">Company</label>
        <input
          className="mt-1 w-full rounded-2xl border border-white/20 bg-black/20 px-3 py-2"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.25em] text-white/60">Contact Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-2xl border border-white/20 bg-black/20 px-3 py-2"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-xs uppercase tracking-[0.25em] text-white/60">Vertical</label>
          <input
            className="mt-1 w-full rounded-2xl border border-white/20 bg-black/20 px-3 py-2"
            value={vertical}
            onChange={(e) => setVertical(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="text-xs uppercase tracking-[0.25em] text-white/60">Deal Size (USD)</label>
          <input
            type="number"
            className="mt-1 w-full rounded-2xl border border-white/20 bg-black/20 px-3 py-2"
            value={dealSizeEstimate}
            onChange={(e) => setDealSizeEstimate(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.25em] text-white/60">Notes</label>
        <textarea
          className="mt-1 w-full rounded-2xl border border-white/20 bg-black/20 px-3 py-2"
          value={notes}
          rows={4}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-siso-orange px-4 py-3 text-sm font-semibold text-black transition hover:bg-white"
      >
        {isPending ? "Submitting…" : "Submit client"}
      </button>
      {result && <p className="text-emerald-300">{result}</p>}
      {error && <p className="text-rose-400">{error}</p>}
    </form>
  );
}
