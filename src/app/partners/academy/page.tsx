import { Suspense } from "react";
import { Waves } from "@/components/ui/wave-background";
import { AcademyDashboardCard, AcademyDashboardHero, academyDashboardCards } from "@/domains/partnerships/portal-architecture/academy/dashboard/cards";

export const experimental_ppr = true;

export default function AcademyDashboardPage() {
  return (
    <main className="relative min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.45, height: "120%" }}>
        <Suspense
          fallback={
            <div
              className="h-full w-full bg-[radial-gradient(circle_at_top,#20140a,#050505)] opacity-60"
              aria-hidden="true"
            />
          }
        >
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
        </Suspense>
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <AcademyDashboardHero />
        {academyDashboardCards.map((card) => (
          <AcademyDashboardCard key={card.title} {...card} />
        ))}
      </div>
    </main>
  );
}
