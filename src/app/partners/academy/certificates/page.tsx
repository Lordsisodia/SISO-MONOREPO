import Link from "next/link";
import { Sparkles, Award, ArrowLeft, Info } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Awards } from "@/components/ui/award";
import { Waves } from "@/components/ui/wave-background";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";

const certificates = [
  { id: "cert-sales", title: "Sales Foundations", issued: "Jan 2025", status: "In progress" },
  { id: "cert-enterprise", title: "Enterprise Sales 101", issued: "Feb 2025", status: "Unlocked" },
];

export default function CertificatesPage() {
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
            <Link
              href="/partners/academy"
              aria-label="Back to Academy hub"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
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

        <SettingsGroupCallout
          icon={<Award className="h-4 w-4" />}
          title="Earned certificates"
          subtitle="Issued and in-progress"
          showChevron={false}
        >
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 shadow-inner">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex justify-center">
                <Awards
                  variant="certificate"
                  title={cert.title}
                  logoSrc="/branding/siso-logo.svg"
                  subtitle={`This cert is ${cert.status.toLowerCase()}. Keep progressing to move it to issued.`}
                  recipient="You"
                  date={cert.issued}
                  className="w-full max-w-md"
                />
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4 text-siso-orange" />}
          title="How to earn more certificates"
          subtitle="Actions that unlock new creds"
          showChevron={false}
        >
          <div className="space-y-3 rounded-[24px] border border-dashed border-white/20 bg-black/30 px-4 py-5 text-sm text-white/80">
            <div className="flex gap-2 text-white">
              <Info className="h-4 w-4 text-siso-orange" />
              <p className="text-sm text-white">
                Certificates unlock when you finish programs, advance tiers, and ship real outcomes with clients.
              </p>
            </div>
            <ul className="list-disc space-y-1 pl-5 text-white/80">
              <li>Complete core and advanced courses.</li>
              <li>Advance to higher tiers to unlock premium certificates.</li>
              <li>Close client wins and submit proof for eligible creds.</li>
              <li>Bring in qualified recruits to satisfy certain program requirements.</li>
            </ul>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
