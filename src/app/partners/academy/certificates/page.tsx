"use client";

"use client";

import { Sparkles, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Awards } from "@/components/ui/award";
import { Button } from "@/components/ui/button";

const certificates = [
  { id: "cert-sales", title: "Sales Foundations", issued: "Jan 2025", status: "In progress" },
  { id: "cert-enterprise", title: "Enterprise Sales 101", issued: "Feb 2025", status: "Unlocked" },
];

export default function CertificatesPage() {
  const router = useRouter();

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative">
          <HighlightCard
            color="orange"
            title="Certificates"
            description="Your issued credentials and in-progress certificates."
            metricValue={`${certificates.length} total`}
            metricLabel="Issued & in progress"
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            hideDivider
            hideFooter
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-1 top-1/2 -translate-y-1/2 text-white"
            onClick={() => router.back()}
          >
            ←
          </Button>
        </div>

        <section className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="flex justify-center">
              <Awards
                variant="certificate"
                title={cert.title}
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
