"use client";

import { Sparkles, Award, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Awards } from "@/components/ui/award";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Waves } from "@/components/ui/wave-background";
import { Waves } from "@/components/ui/wave-background";

const certificates = [
  { id: "cert-sales", title: "Sales Foundations", issued: "Jan 2025", status: "In progress" },
  { id: "cert-enterprise", title: "Enterprise Sales 101", issued: "Feb 2025", status: "Unlocked" },
];

export default function CertificatesPage() {
  const router = useRouter();

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(6px)", opacity: 0.9 }}
      >
        <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#0b0b0f" pointerSize={0.35} />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <button
              onClick={() => router.back()}
              aria-label="Back"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          <HighlightCard
            color="orange"
            title="Certificates"
            description="Your issued credentials and in-progress certificates."
            metricValue={`${certificates.length} total`}
            metricLabel="Issued & in progress"
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            className="w-full pl-12"
            hideDivider
            hideFooter
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />
        </div>

        <section className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="flex justify-center">
              <Awards
                variant="certificate"
                title={cert.title}
                logoSrc="/branding/siso-logo.svg"
                subtitle={`This is to certify that you have ${cert.status.toLowerCase() === "in progress" ? "started" : "successfully completed"} the mastery of design.`}
                recipient="You"
                date={cert.issued}
                className="w-full max-w-md"
              />
            </div>
          ))}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="border border-white/10 mt-1 w-full max-w-xs"
              onClick={() => router.push("/partners/academy/xp-breakdown")}
            >
              See how to earn more
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
