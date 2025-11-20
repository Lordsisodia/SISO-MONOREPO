export default function PartnersPipelineOpsLoading() {
  return (
    <div className="min-h-screen bg-siso-bg-primary text-white">
      <div className="mx-auto max-w-6xl space-y-6 p-4 lg:p-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 animate-pulse">
          <div className="h-4 w-32 rounded-full bg-white/15" />
          <div className="mt-3 h-8 w-2/3 rounded-full bg-white/10" />
          <div className="mt-2 h-4 w-1/2 rounded-full bg-white/10" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1].map((index) => (
            <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-5 animate-pulse">
              <div className="h-4 w-1/3 rounded-full bg-white/15" />
              <div className="mt-4 h-6 w-3/4 rounded-full bg-white/10" />
              <div className="mt-6 space-y-2">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="h-3 rounded-full bg-white/5" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 animate-pulse">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="h-4 w-full rounded-full bg-white/8" />
          ))}
        </div>
      </div>
    </div>
  );
}
