import type { ReactNode } from "react";
import { Suspense } from "react";
import { AcademyShell } from "./AcademyShell.client";

export default function PartnersAcademyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={<NavHydratorFallback />}>
        <AcademyShell />
      </Suspense>
    </>
  );
}

function NavHydratorFallback() {
  return <div className="sr-only" aria-hidden="true" />;
}
