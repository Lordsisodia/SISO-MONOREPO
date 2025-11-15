"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ChevronLeft, FileText, Lock, Database, Users, Cookie, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";

interface PolicySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const privacyPolicyVersion = "2.1.0";
const lastUpdated = "November 1, 2024";

export function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const policySections: PolicySection[] = [
    {
      id: "overview",
      title: "Overview",
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-siso-text-primary leading-relaxed">
            At SISO Partnerships, we are committed to protecting your privacy and earning your trust. 
            This Privacy Policy explains how we collect, use, share, and protect your personal information 
            when you use our partnership platform and services.
          </p>
          <div className="bg-siso-orange/10 border border-siso-orange/20 rounded-lg p-4">
            <p className="text-sm text-siso-orange font-medium">
              By using our platform, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "information",
      title: "Information We Collect",
      icon: <Database className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">Personal Information</h4>
            <ul className="space-y-2 text-sm text-siso-text-muted">
              <li>• Name and contact information (email, phone number)</li>
              <li>• Professional background and expertise</li>
              <li>• Company or organization details</li>
              <li>• Payment and commission information</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">Usage Information</h4>
            <ul className="space-y-2 text-sm text-siso-text-muted">
              <li>• Platform interaction data and analytics</li>
              <li>• Communication patterns and preferences</li>
              <li>• Performance metrics and referral data</li>
              <li>• Device and browser information</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-siso-orange/20 text-siso-orange flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
              <div>
                <h4 className="text-sm font-semibold text-siso-text-primary">Service Provision</h4>
                <p className="text-xs text-siso-text-muted">To provide and maintain our partnership platform, process referrals, and manage commissions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-siso-orange/20 text-siso-orange flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
              <div>
                <h4 className="text-sm font-semibold text-siso-text-primary">Communication</h4>
                <p className="text-xs text-siso-text-muted">To send you updates, notifications, and respond to your inquiries</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-siso-orange/20 text-siso-orange flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
              <div>
                <h4 className="text-sm font-semibold text-siso-text-primary">Improvement</h4>
                <p className="text-xs text-siso-text-muted">To analyze usage patterns and improve our platform functionality</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-siso-orange/20 text-siso-orange flex items-center justify-center flex-shrink-0 text-xs font-bold">4</div>
              <div>
                <h4 className="text-sm font-semibold text-siso-text-primary">Compliance</h4>
                <p className="text-xs text-siso-text-muted">To comply with legal obligations and protect against fraud</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "sharing",
      title: "Information Sharing",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">We Do Not Sell Your Information</h4>
            <p className="text-sm text-siso-text-muted mb-4">
              We never sell, rent, or trade your personal information with third parties for marketing purposes.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">Limited Sharing</h4>
            <p className="text-sm text-siso-text-muted mb-3">We may share your information only in the following circumstances:</p>
            <ul className="space-y-2 text-sm text-siso-text-muted">
              <li>• With your explicit consent</li>
              <li>• With other partners as necessary for referral processing</li>
              <li>• With service providers who assist in operating our platform</li>
              <li>• When required by law or to protect our rights</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: <Cookie className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">Essential Cookies</h4>
            <p className="text-sm text-siso-text-muted mb-3">
              Required for basic site functionality, including authentication and security.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">Analytics Cookies</h4>
            <p className="text-sm text-siso-text-muted mb-3">
              Help us understand how our platform is used to improve your experience. These are optional and can be disabled in your privacy settings.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">Preference Cookies</h4>
            <p className="text-sm text-siso-text-muted">
              Remember your settings and preferences to provide a personalized experience.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "security",
      title: "Data Security",
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-2">Security Measures</h4>
            <p className="text-sm text-siso-text-muted mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="space-y-2 text-sm text-siso-text-muted">
              <li>• SSL/TLS encryption for all data transmissions</li>
              <li>• Secure storage in encrypted databases</li>
              <li>• Regular security audits and vulnerability assessments</li>
              <li>• Access controls and authentication systems</li>
              <li>• Data backup and recovery procedures</li>
            </ul>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-medium">
              While we take reasonable precautions, no method of transmission over the internet is 100% secure.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-siso-text-primary mb-3">You have the right to:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-siso-orange mt-1.5"></div>
                <div>
                  <p className="text-sm text-siso-text-primary font-medium">Access</p>
                  <p className="text-xs text-siso-text-muted">Request a copy of your personal information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-siso-orange mt-1.5"></div>
                <div>
                  <p className="text-sm text-siso-text-primary font-medium">Correct</p>
                  <p className="text-xs text-siso-text-muted">Update inaccurate or incomplete information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-siso-orange mt-1.5"></div>
                <div>
                  <p className="text-sm text-siso-text-primary font-medium">Delete</p>
                  <p className="text-xs text-siso-text-muted">Request deletion of your personal information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-siso-orange mt-1.5"></div>
                <div>
                  <p className="text-sm text-siso-text-primary font-medium">Port</p>
                  <p className="text-xs text-siso-text-muted">Transfer your data to another service</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-siso-orange mt-1.5"></div>
                <div>
                  <p className="text-sm text-siso-text-primary font-medium">Object</p>
                  <p className="text-xs text-siso-text-muted">Restrict or object to processing of your data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: <Mail className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-siso-text-primary">
            If you have questions about this Privacy Policy or how we handle your personal information, 
            please contact us:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-siso-orange" />
              <span className="text-sm text-siso-text-primary">privacy@sisopartnerships.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-siso-orange" />
              <span className="text-sm text-siso-text-primary">1-800-SISO-PRV</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-siso-orange" />
              <span className="text-sm text-siso-text-primary">Privacy Team, SISO Partnerships</span>
            </div>
          </div>
          <div className="bg-siso-orange/10 border border-siso-orange/20 rounded-lg p-4">
            <p className="text-sm text-siso-orange font-medium">
              We typically respond to privacy inquiries within 48 hours.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <SettingsDetailLayout
      title=""
      description=""
      wrapContent={false}
      backHref={null}
      compactHeader
      hideHeader
      srTitle="Privacy Policy"
    >
      <div className="privacy-policy-scope space-y-4 pb-32 text-siso-text-primary">
        {/* Privacy Policy Header */}
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <Link
              href="/partners/settings/privacy"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to privacy settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </div>
          <HighlightCard
            color="orange"
            className="w-full pl-12 privacy-card"
            title="Privacy Policy"
            description={`Version ${privacyPolicyVersion} • Last updated ${lastUpdated}`}
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
            descriptionClassName="text-xs"
            icon={<FileText className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
          />
        </div>

        {/* Navigation (simplified list) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          <div className="px-4 pt-4">
            <SectionHeader title="Sections" subtitle="Jump to a topic" icon={<FileText className="h-6 w-6" />} />
          </div>
          <ScrimList className="m-3" ariaLabel="Policy sections">
            {policySections.map((section) => (
              <ScrimList.Row key={section.id} className="justify-between">
                <button
                  type="button"
                  aria-current={activeSection === section.id ? "true" : undefined}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 text-sm ${
                    activeSection === section.id ? "text-siso-orange" : "text-siso-text-primary"
                  }`}
                >
                  <span className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                    {section.icon}
                  </span>
                  <span className="font-medium">{section.title}</span>
                </button>
                {activeSection === section.id ? (
                  <span className="rounded-full border border-siso-orange/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-siso-orange">
                    Active
                  </span>
                ) : null}
              </ScrimList.Row>
            ))}
          </ScrimList>
        </div>

        {/* Content (double callout) */}
        {policySections
          .filter((section) => section.id === activeSection)
          .map((section) => (
            <div key={section.id} className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <div className="px-4 pt-4">
                <SectionHeader title={section.title} subtitle="" icon={section.icon} />
              </div>
              <div className="m-3">
                <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                  {section.content}
                </div>
              </div>
            </div>
          ))}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <h3 className="text-lg font-semibold text-siso-text-primary mb-3">Download Policy</h3>
            <p className="text-sm text-siso-text-muted mb-4">
              Get a PDF copy of our privacy policy for your records.
            </p>
            <button className="rounded-full border border-siso-border/50 px-4 py-2 text-sm font-medium text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange">
              Download PDF
            </button>
          </div>
          
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <h3 className="text-lg font-semibold text-siso-text-primary mb-3">Request Changes</h3>
            <p className="text-sm text-siso-text-muted mb-4">
              Exercise your data rights or request information about your data.
            </p>
            <button className="rounded-full border border-siso-border/50 px-4 py-2 text-sm font-medium text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange">
              Make Request
            </button>
          </div>
        </div>
      </div>
    </SettingsDetailLayout>
  );
}
