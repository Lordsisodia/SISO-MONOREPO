export default function PartnersAcademyLoading() {
  return (
    <div className="min-h-screen bg-siso-bg-primary text-white">
      <div className="mx-auto max-w-6xl space-y-6 p-4 lg:p-8">
        <HeroSkeleton />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <SectionSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner animate-pulse">
      <div className="h-4 w-32 rounded-full bg-white/10" />
      <div className="mt-4 h-10 w-3/5 rounded-full bg-white/15" />
      <div className="mt-3 h-4 w-2/5 rounded-full bg-white/10" />
      <div className="mt-6 flex flex-wrap gap-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="h-8 w-32 rounded-full border border-white/10 bg-white/5" />
        ))}
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/70 animate-pulse">
      <div className="h-4 w-28 rounded-full bg-white/15" />
      <div className="mt-3 h-5 w-2/3 rounded-full bg-white/10" />
      <div className="mt-6 space-y-2">
        {[0, 1, 2].map((index) => (
          <div key={index} className="h-3 w-full rounded-full bg-white/5" />
        ))}
      </div>
    </div>
  );
}
