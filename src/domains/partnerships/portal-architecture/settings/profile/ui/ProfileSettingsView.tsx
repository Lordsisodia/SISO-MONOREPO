"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Camera, Image as ImageIcon, PenSquare, Sparkles, UserRound, Briefcase, Target, Globe, Linkedin, Instagram, Link2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5";
import { SettingsGroupCallout } from "../../menu/SettingsGroupCallout";
import { ChevronLeft } from "lucide-react";
import { InfoButton } from "@/components/ui/info-button";
import { Calendar } from "lucide-react";
// Use the shared CustomDropdown from the General settings module
import { CustomDropdown } from "../../general/ui/CustomDropdown";

// Dropdown options for professional profile fields
const businessTypeOptions = [
  { value: "", label: "Select business type", description: "Choose “Custom” if not listed" },
  { value: "freelance", label: "Freelance", description: "Independent professional" },
  { value: "agency", label: "Agency", description: "Service-based business" },
  { value: "consulting", label: "Consulting", description: "Professional consulting" },
  { value: "startup", label: "Startup", description: "Early-stage company" },
  { value: "enterprise", label: "Enterprise", description: "Large corporation" },
  { value: "custom", label: "Custom", description: "Type your own value" }
];

const industryOptions = [
  { value: "", label: "Select industry", description: "Choose “Custom” if not listed" },
  { value: "technology", label: "Technology", description: "Software, IT, tech services" },
  { value: "marketing", label: "Marketing", description: "Digital marketing, advertising" },
  { value: "finance", label: "Finance", description: "Banking, investments, financial services" },
  { value: "design", label: "Design", description: "Graphic, UX/UI, product design" },
  { value: "consulting", label: "Consulting", description: "Business, management consulting" },
  { value: "sales", label: "Sales", description: "B2B, B2C sales, business development" },
  { value: "healthcare", label: "Healthcare", description: "Medical, health services" },
  { value: "education", label: "Education", description: "Training, teaching, e-learning" },
  { value: "real-estate", label: "Real Estate", description: "Property, real estate services" },
  { value: "ecommerce", label: "E-commerce", description: "Online retail, digital commerce" },
  { value: "custom", label: "Custom", description: "Type your own value" }
];

const companySizeOptions = [
  { value: "", label: "Select company size", description: "Choose “Custom” if not listed" },
  { value: "1", label: "Just me", description: "Individual freelancer/solo" },
  { value: "2-5", label: "2-5 people", description: "Small team" },
  { value: "6-10", label: "6-10 people", description: "Medium team" },
  { value: "11-25", label: "11-25 people", description: "Growing team" },
  { value: "26+", label: "26+ people", description: "Large team" },
  { value: "custom", label: "Custom", description: "Type your own value" }
];

const geographicOptions = [
  { value: "", label: "Select region", description: "Choose “Custom” if not listed" },
  { value: "north-america", label: "North America", description: "USA, Canada, Mexico" },
  { value: "europe", label: "Europe", description: "UK, EU, European countries" },
  { value: "asia-pacific", label: "Asia Pacific", description: "Asia, Australia, Pacific" },
  { value: "latin-america", label: "Latin America", description: "Central and South America" },
  { value: "africa", label: "Africa", description: "African countries" },
  { value: "middle-east", label: "Middle East", description: "Middle Eastern countries" },
  { value: "global", label: "Global", description: "Worldwide availability" },
  { value: "custom", label: "Custom", description: "Type your own value" }
];

const certificationOptions = [
  { value: "", label: "Select certification level", description: "Choose “Custom” if not listed" },
  { value: "basic", label: "Basic", description: "Entry-level SISO certification" },
  { value: "advanced", label: "Advanced", description: "Experienced partner certification" },
  { value: "expert", label: "Expert", description: "Top-tier partner certification" },
  { value: "custom", label: "Custom", description: "Type your own value" }
];

const languageOptions = [
  { value: "", label: "Select languages", description: "Choose “Custom” if not listed" },
  { value: "english", label: "English", description: "Native or fluent" },
  { value: "spanish", label: "Spanish", description: "Español" },
  { value: "french", label: "French", description: "Français" },
  { value: "german", label: "German", description: "Deutsch" },
  { value: "mandarin", label: "Mandarin Chinese", description: "中文" },
  { value: "portuguese", label: "Portuguese", description: "Português" },
  { value: "japanese", label: "Japanese", description: "日本語" },
  { value: "korean", label: "Korean", description: "한국어" },
  { value: "arabic", label: "Arabic", description: "العربية" }
];

const timelineOptions = [
  { value: "3-months", label: "3 months", description: "Short-term goal" },
  { value: "6-months", label: "6 months", description: "Medium-term goal" },
  { value: "1-year", label: "1 year", description: "Annual goal" },
  { value: "custom", label: "Custom date", description: "Set your own timeline" }
];

const monthOptions = [
  { value: "01", label: "January", description: "Start of the year" },
  { value: "02", label: "February", description: "Winter month" },
  { value: "03", label: "March", description: "Spring begins" },
  { value: "04", label: "April", description: "Spring month" },
  { value: "05", label: "May", description: "Late spring" },
  { value: "06", label: "June", description: "Summer begins" },
  { value: "07", label: "July", description: "Summer month" },
  { value: "08", label: "August", description: "Late summer" },
  { value: "09", label: "September", description: "Fall begins" },
  { value: "10", label: "October", description: "Fall month" },
  { value: "11", label: "November", description: "Late fall" },
  { value: "12", label: "December", description: "Winter begins" }
];

const yearOptions = Array.from({ length: 50 }, (_, index) => {
  const year = new Date().getFullYear() - index;
  return {
    value: year.toString(),
    label: year.toString(),
    description: `${year} year`
  };
});

export function ProfileSettingsView() {
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");

  // Profile identity state
  const [age, setAge] = useState("");

  // SISO Partnership details state
  const [sisoJoinMonth, setSisoJoinMonth] = useState("");
  const [sisoJoinYear, setSisoJoinYear] = useState("");

  // Professional details state
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [geographicAvailability, setGeographicAvailability] = useState("");

  // Skills & expertise state
  const [specializations, setSpecializations] = useState("");
  const [sisoCertifications, setSisoCertifications] = useState("");
  const [languages, setLanguages] = useState("");

  // Social media state
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  // Revenue goals state
  const [revenueGoalAmount, setRevenueGoalAmount] = useState("");
  const [revenueTimeline, setRevenueTimeline] = useState("");

  const bioCharactersLeft = useMemo(() => 200 - bio.length, [bio]);

  return (
    <SettingsDetailLayout title="" description="" wrapContent={false} backHref={null} compactHeader hideHeader srTitle="Profile Settings">
      <div className="space-y-6 pb-32 text-siso-text-primary">
        {/* Profile Header Card */}
        <div className="relative min-h-[128px]">
            <Link
              href="/partners/settings"
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <HighlightCard
            color="orange"
            className="w-full pl-12"
            title="Profile"
            description="Shape the story partners see when they tap your card."
            icon={<UserRound className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
            descriptionClassName="text-xs"
          />
        </div>

        <ProfileIdentityDoubleCallout
          status={status}
          onStatusChange={setStatus}
          age={age}
          onAgeChange={setAge}
          bio={bio}
          onBioChange={setBio}
          bioCharactersLeft={bioCharactersLeft}
        />
        <SISOPartnershipDetailsDoubleCallout
          sisoJoinMonth={sisoJoinMonth}
          onSisoJoinMonthChange={setSisoJoinMonth}
          sisoJoinYear={sisoJoinYear}
          onSisoJoinYearChange={setSisoJoinYear}
        />
        <ProfessionalDetailsDoubleCallout
          professionalTitle={professionalTitle}
          setProfessionalTitle={setProfessionalTitle}
          businessName={businessName}
          setBusinessName={setBusinessName}
          businessType={businessType}
          setBusinessType={setBusinessType}
          industry={industry}
          setIndustry={setIndustry}
          yearsOfExperience={yearsOfExperience}
          setYearsOfExperience={setYearsOfExperience}
          companySize={companySize}
          setCompanySize={setCompanySize}
          geographicAvailability={geographicAvailability}
          setGeographicAvailability={setGeographicAvailability}
        />
        <SkillsExpertiseDoubleCallout
          specializations={specializations}
          setSpecializations={setSpecializations}
          sisoCertifications={sisoCertifications}
          setSisoCertifications={setSisoCertifications}
          languages={languages}
          setLanguages={setLanguages}
        />
        <SocialMediaDoubleCallout
          linkedInUrl={linkedInUrl}
          setLinkedInUrl={setLinkedInUrl}
          instagramUrl={instagramUrl}
          setInstagramUrl={setInstagramUrl}
          websiteUrl={websiteUrl}
          setWebsiteUrl={setWebsiteUrl}
        />
        <RevenueGoalsDoubleCallout
          revenueGoalAmount={revenueGoalAmount}
          setRevenueGoalAmount={setRevenueGoalAmount}
          revenueTimeline={revenueTimeline}
          setRevenueTimeline={setRevenueTimeline}
        />
        <ProfilePreviewCard status={status} bio={bio} />
      </div>
    </SettingsDetailLayout>
  );
}

type ProfileIdentityDoubleCalloutProps = {
  status: string;
  onStatusChange: (value: string) => void;
  age: string;
  onAgeChange: (value: string) => void;
  bio: string;
  onBioChange: (value: string) => void;
  bioCharactersLeft: number;
};

function ProfileIdentityDoubleCallout({ status, onStatusChange, age, onAgeChange, bio, onBioChange, bioCharactersLeft }: ProfileIdentityDoubleCalloutProps) {
  return (
    <SettingsGroupCallout
      icon={<UserRound className="h-4 w-4" />}
      title="Profile"
      subtitle="Shape the story partners see when they tap your card."
      showChevron={false}
    >
      <div className="space-y-2">
        {/* Custom Status */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Custom Status</h3>
            <InfoButton label="About custom status" content="A short, optional line that tells partners what you're focused on right now." />
          </div>
          <Input
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            placeholder="Let partners know what you're focused on"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Avatar */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Avatar</h3>
              <InfoButton label="About avatar" content="This image appears on your partner card and in messages. Use a clear, square image." />
            </div>
            <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-siso-orange">
              <button type="button" className="flex items-center gap-1">
                <Camera className="h-4 w-4" /> Change
              </button>
              <button type="button" className="text-siso-text-muted">Remove</button>
            </div>
          </div>
          <Avatar className="h-20 w-20 border-2 border-siso-orange/70">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=SISOagency" alt="Profile avatar" loading="lazy" decoding="async" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        </section>

        {/* Custom Background */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Custom Background</h3>
            <InfoButton label="About custom background" content="Backdrop behind your profile card. Choose something subtle so text stays readable." />
          </div>
          <div className="rounded-xl border border-dashed border-siso-border/70 bg-siso-bg-primary/30 p-6 text-center text-xs text-siso-text-muted">
            <ImageIcon className="mx-auto mb-2 h-6 w-6 text-siso-text-muted" />
            Drop an image here or tap to upload a new scene.
          </div>
        </section>

        {/* Age */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Age</h3>
            <InfoButton label="About age" content="Your age helps us personalize your experience. This information is kept private." />
          </div>
          <Input
            type="number"
            min="18"
            max="100"
            value={age}
            onChange={(event) => onAgeChange(event.target.value)}
            placeholder="Enter your age"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Bio */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Bio</h3>
              <InfoButton label="About bio" content="Up to 200 characters. Share what you do best so partners know where you shine." />
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{bioCharactersLeft} left</p>
          </div>
          <Textarea
            value={bio}
            onChange={(event) => onBioChange(event.target.value.slice(0, 200))}
            rows={4}
            placeholder="Write something about yourself..."
            className="rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
          <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">
            <span>Save to update your public profile</span>
          </div>
        </section>
        {/* Save button lives outside the inner callouts (still in this group) */}
        <div className="mt-3 flex justify-end">
          <Button className="rounded-xl bg-siso-orange px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
            Save profile
          </Button>
        </div>
      </div>
    </SettingsGroupCallout>
  );
}

// SISO Partnership Details Component
function SISOPartnershipDetailsDoubleCallout({
  sisoJoinMonth,
  onSisoJoinMonthChange,
  sisoJoinYear,
  onSisoJoinYearChange
}: {
  sisoJoinMonth: string;
  onSisoJoinMonthChange: (value: string) => void;
  sisoJoinYear: string;
  onSisoJoinYearChange: (value: string) => void;
}) {
  // Calculate partnership duration
  const calculatePartnershipDuration = () => {
    if (!sisoJoinMonth || !sisoJoinYear) return "Select join date to calculate";

    const joinDate = new Date(parseInt(sisoJoinYear), parseInt(sisoJoinMonth) - 1);
    const currentDate = new Date();

    const years = currentDate.getFullYear() - joinDate.getFullYear();
    const months = currentDate.getMonth() - joinDate.getMonth();

    let totalYears = years;
    let totalMonths = months;

    if (totalMonths < 0) {
      totalYears--;
      totalMonths += 12;
    }

    if (totalYears === 0 && totalMonths === 0) {
      return "Less than 1 month";
    }

    const parts = [];
    if (totalYears > 0) {
      parts.push(`${totalYears} year${totalYears !== 1 ? 's' : ''}`);
    }
    if (totalMonths > 0) {
      parts.push(`${totalMonths} month${totalMonths !== 1 ? 's' : ''}`);
    }

    return parts.join(', ');
  };

  return (
    <SettingsGroupCallout
      icon={<Calendar className="h-4 w-4" />}
      title="SISO Partnership Details"
      subtitle="Track your journey with the SISO ecosystem."
      showChevron={false}
    >
      <div className="space-y-2">
        {/* SISO Join Date */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">SISO Join Date</h3>
            <InfoButton label="About SISO join date" content="Select the month and year when you joined the SISO partnership program." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CustomDropdown
              options={monthOptions}
              value={sisoJoinMonth}
              onChange={onSisoJoinMonthChange}
              searchable={false}
              placeholder="Month"
            />
            <CustomDropdown
              options={yearOptions}
              value={sisoJoinYear}
              onChange={onSisoJoinYearChange}
              searchable={false}
              placeholder="Year"
            />
          </div>
        </section>

        {/* Partnership Duration */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Partnership Duration</h3>
            <InfoButton label="About partnership duration" content="Automatically calculated from your join date to show your tenure as a SISO partner." />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-siso-orange" />
            <span className="text-sm text-siso-text-primary font-medium">
              {calculatePartnershipDuration()}
            </span>
          </div>
        </section>
      </div>
    </SettingsGroupCallout>
  );
}

// Professional Details Component
function ProfessionalDetailsDoubleCallout({
  professionalTitle,
  setProfessionalTitle,
  businessName,
  setBusinessName,
  businessType,
  setBusinessType,
  industry,
  setIndustry,
  yearsOfExperience,
  setYearsOfExperience,
  companySize,
  setCompanySize,
  geographicAvailability,
  setGeographicAvailability
}: {
  professionalTitle: string;
  setProfessionalTitle: (value: string) => void;
  businessName: string;
  setBusinessName: (value: string) => void;
  businessType: string;
  setBusinessType: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  yearsOfExperience: string;
  setYearsOfExperience: (value: string) => void;
  companySize: string;
  setCompanySize: (value: string) => void;
  geographicAvailability: string;
  setGeographicAvailability: (value: string) => void;
}) {
  return (
    <SettingsGroupCallout
      icon={<Briefcase className="h-4 w-4" />}
      title="Professional Details"
      subtitle="Help partners understand your business background."
      showChevron={false}
    >
      <div className="space-y-2">
        {/* Professional Title */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Professional Title</h3>
            <InfoButton label="About professional title" content="Your role, e.g. Marketing Consultant. If not applicable, use NA." />
          </div>
          <Input
            value={professionalTitle}
            onChange={(event) => setProfessionalTitle(event.target.value)}
            placeholder="e.g., Marketing Consultant (or select Custom)"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Business Name */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Business Name</h3>
            <InfoButton label="About business name" content="Your company or trading name. Use NA if you operate as an individual." />
          </div>
          <Input
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            placeholder="Your company name (or select Custom)"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Business Type */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Business Type</h3>
            <InfoButton label="About business type" content="Choose the structure closest to how you work (freelance, agency, etc.)." />
          </div>
          <CustomDropdown
            options={businessTypeOptions}
            value={businessType}
            onChange={setBusinessType}
            searchable={true}
            maxVisible={0}
          />
        </section>

        {/* Industry Focus */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Industry Focus</h3>
            <InfoButton label="About industry" content="Pick the industry you primarily serve so we can route better matches." />
          </div>
          <CustomDropdown
            options={industryOptions}
            value={industry}
            onChange={setIndustry}
            searchable={true}
            maxVisible={0}
          />
        </section>

        {/* Years of Experience */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Years of Experience</h3>
            <InfoButton label="About experience" content="Round to the nearest whole number. Use NA if you’d rather not share." />
          </div>
          <Input
            value={yearsOfExperience}
            onChange={(event) => setYearsOfExperience(event.target.value)}
            placeholder="e.g., 5 (or select Custom)"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Company Size */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Company Size</h3>
            <InfoButton label="About company size" content="Approximate team size helps us tailor recommendations and invites." />
          </div>
          <CustomDropdown
            options={companySizeOptions}
            value={companySize}
            onChange={setCompanySize}
            searchable={true}
            maxVisible={0}
          />
        </section>

        {/* Geographic Availability */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Geographic Availability</h3>
            <InfoButton label="About availability" content="Where you can work or support partners. Choose Global if anywhere." />
          </div>
          <CustomDropdown
            options={geographicOptions}
            value={geographicAvailability}
            onChange={setGeographicAvailability}
            searchable={true}
            maxVisible={0}
          />
        </section>
      </div>
    </SettingsGroupCallout>
  );
}

// Skills & Expertise Component
function SkillsExpertiseDoubleCallout({
  specializations,
  setSpecializations,
  sisoCertifications,
  setSisoCertifications,
  languages,
  setLanguages
}: {
  specializations: string;
  setSpecializations: (value: string) => void;
  sisoCertifications: string;
  setSisoCertifications: (value: string) => void;
  languages: string;
  setLanguages: (value: string) => void;
}) {
  return (
    <SettingsGroupCallout
      icon={<Target className="h-4 w-4" />}
      title="Skills & Expertise"
      subtitle="Showcase your professional capabilities."
      showChevron={false}
    >
      <div className="space-y-2">
        {/* Specializations */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Specializations</h3>
            <InfoButton label="About specializations" content="A few keywords that describe your core skills (comma separated)." />
          </div>
          <Textarea
            value={specializations}
            onChange={(event) => setSpecializations(event.target.value)}
            placeholder="e.g., B2B Marketing, Sales Funnels, Growth Hacking"
            rows={3}
            className="rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* SISO Certifications */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">SISO Certifications</h3>
            <InfoButton label="About certifications" content="Select any SISO certifications you’ve earned. Use NA if none." />
          </div>
          <CustomDropdown
            options={certificationOptions}
            value={sisoCertifications}
            onChange={setSisoCertifications}
            searchable={true}
            maxVisible={0}
          />
        </section>

        {/* Languages Spoken */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Languages Spoken</h3>
            <InfoButton label="About languages" content="List the languages you can confidently work in." />
          </div>
          <CustomDropdown
            options={languageOptions}
            value={languages}
            onChange={setLanguages}
            searchable={true}
            maxVisible={0}
          />
        </section>
      </div>
    </SettingsGroupCallout>
  );
}

// Social Media Component
function SocialMediaDoubleCallout({
  linkedInUrl,
  setLinkedInUrl,
  instagramUrl,
  setInstagramUrl,
  websiteUrl,
  setWebsiteUrl
}: {
  linkedInUrl: string;
  setLinkedInUrl: (value: string) => void;
  instagramUrl: string;
  setInstagramUrl: (value: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;
}) {
  return (
    <SettingsGroupCallout
      icon={<Globe className="h-4 w-4" />}
      title="Social Media"
      subtitle="Connect your professional profiles."
      showChevron={false}
    >
      <div className="space-y-2">
        {/* LinkedIn */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold flex items-center gap-2">
              <Linkedin className="h-3 w-3" /> LinkedIn
            </h3>
            <InfoButton label="About LinkedIn" content="Paste the URL to your professional LinkedIn profile." />
          </div>
          <Input
            value={linkedInUrl}
            onChange={(event) => setLinkedInUrl(event.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Instagram */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold flex items-center gap-2">
              <Instagram className="h-3 w-3" /> Instagram
            </h3>
            <InfoButton label="About Instagram" content="Optional. Share your professional Instagram if relevant." />
          </div>
          <Input
            value={instagramUrl}
            onChange={(event) => setInstagramUrl(event.target.value)}
            placeholder="https://instagram.com/yourprofile"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Website */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold flex items-center gap-2">
              <Link2 className="h-3 w-3" /> Website
            </h3>
            <InfoButton label="About website" content="Your main professional site or portfolio." />
          </div>
          <Input
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
            placeholder="https://yourwebsite.com"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>
      </div>
    </SettingsGroupCallout>
  );
}

// Revenue Goals Component
function RevenueGoalsDoubleCallout({
  revenueGoalAmount,
  setRevenueGoalAmount,
  revenueTimeline,
  setRevenueTimeline
}: {
  revenueGoalAmount: string;
  setRevenueGoalAmount: (value: string) => void;
  revenueTimeline: string;
  setRevenueTimeline: (value: string) => void;
}) {
  return (
    <SettingsGroupCallout
      icon={<Target className="h-4 w-4" />}
      title="Revenue Goals"
      subtitle="Set your financial targets and timeline."
      showChevron={false}
    >
      <div className="space-y-2">
        {/* Revenue Goal Amount */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Revenue Goal</h3>
            <InfoButton label="About revenue goal" content="Your target gross revenue for the chosen timeline. Helps personalize recommendations." />
          </div>
          <Input
            value={revenueGoalAmount}
            onChange={(event) => setRevenueGoalAmount(event.target.value)}
            placeholder="$10,000"
            className="h-11 rounded-xl border-siso-border/70 bg-transparent text-sm text-siso-text-primary placeholder:text-siso-text-muted"
          />
        </section>

        {/* Timeline */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-siso-text-bold">Timeline</h3>
            <InfoButton label="About timeline" content="How long you’re giving yourself to hit the goal (e.g., 3 months)." />
          </div>
          <CustomDropdown
            options={timelineOptions}
            value={revenueTimeline}
            onChange={setRevenueTimeline}
            searchable={false}
          />
        </section>
      </div>
    </SettingsGroupCallout>
  );
}

type ProfilePreviewCardProps = {
  status: string;
  bio: string;
};

function ProfilePreviewCard({ status, bio }: ProfilePreviewCardProps) {
  // Build a preview model with fallbacks and some made-up test data
  const model = {
    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=SISOagency",
    displayName: "SISOagency",
    headline: "Marketing Consultant",
    status: status || "Dialed in",
    credits: 342,
    tier: "Performer" as "Starter" | "Active" | "Performer" | "Elite",
    milestone: "Next milestone in 12 days",
    chips: ["Technology", "Global", "5y", "SISO Expert", "EN +2"],
    bio:
      bio ||
      "We help partners ship faster with crisp GTM strategy, content systems, and hands-on enablement.",
    powerLevel: 25,
    loginStreak: "3 / 14 days",
    revenue: { amount: "$25k", timeline: "3 mo" },
    links: [
      { label: "linkedin.com", icon: Linkedin, url: "https://linkedin.com/in/sisoagency" },
      { label: "instagram.com", icon: Instagram, url: "https://instagram.com/sisoagency" },
      { label: "siso.agency", icon: Link2, url: "https://siso.agency" },
    ],
    backgroundUrl:
      "https://images.unsplash.com/photo-1549880187-0579aa1a0dbc?q=80&w=1974&auto=format&fit=crop",
  } as const;

  const [expanded, setExpanded] = useState(false);
  const [showAllChips, setShowAllChips] = useState(false);

  const tierColor: Record<typeof model.tier, string> = {
    Starter: "bg-white/10 text-white",
    Active: "bg-emerald-500/20 text-emerald-300",
    Performer: "bg-siso-orange/20 text-siso-orange",
    Elite: "bg-violet-500/20 text-violet-300",
  };

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/10 p-3 text-siso-text-primary shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(10,10,12,0.60), rgba(10,10,12,0.60)), url(${model.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Tier 1 — Hero Row */}
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-white/20">
          <AvatarImage src={model.avatarUrl} alt="Preview avatar" loading="lazy" decoding="async" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold uppercase tracking-[0.25em]">{model.displayName}</h2>
          {model.status ? (
            <p className="truncate text-xs text-white/70">{model.status}</p>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <p className="leading-none text-lg font-semibold text-siso-orange">{model.credits}</p>
          <p className="mt-0.5 text-[11px] text-white/70">credits</p>
          <div className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${tierColor[model.tier]}`}>
            {model.tier}
          </div>
        </div>
      </div>

      {/* Tier 2 — Meta/Progress */}
      <div className="mt-3 space-y-2">
        {model.milestone ? (
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Sparkles className="h-4 w-4 text-siso-orange" aria-hidden /> {model.milestone}
          </div>
        ) : null}
        {model.chips.length ? (
          <ul role="list" className="flex flex-wrap gap-2">
            {model.chips.slice(0, 3).map((chip) => (
              <li role="listitem" key={chip} className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                {chip}
              </li>
            ))}
            {model.chips.length > 3 ? (
              <li role="listitem">
                <button
                  type="button"
                  className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 hover:text-siso-orange"
                  onClick={() => setShowAllChips(true)}
                  aria-haspopup="dialog"
                  aria-expanded={showAllChips}
                >
                  +{model.chips.length - 3}
                </button>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>

      {/* Tier 3 — Details */}
      <div className="mt-3 space-y-3 text-sm text-white/85">
        {/* Bio */}
        {model.bio ? (
          <div>
            <p className={expanded ? "" : "line-clamp-2"}>{model.bio}</p>
            <button
              type="button"
              className="mt-1 rounded-md border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 hover:text-siso-orange"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </div>
        ) : null}

        {/* Stat grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-black/20 px-2.5 py-1.5">
            <span className="text-white/70">Power Level</span>
            <span className="font-semibold text-siso-orange">{model.powerLevel}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-black/20 px-2.5 py-1.5">
            <span className="text-white/70">Login streak</span>
            <span className="font-semibold text-white">{model.loginStreak}</span>
          </div>
          {model.revenue ? (
            <div className="col-span-2 flex items-center justify-between rounded-2xl border border-white/15 bg-black/20 px-2.5 py-1.5">
              <span className="text-white/70">Revenue goal</span>
              <span className="font-semibold text-white">{model.revenue.amount} • {model.revenue.timeline}</span>
            </div>
          ) : null}
        </div>

        {/* Links */}
        {model.links?.length ? (
          <div className="mt-1 flex items-center gap-2 text-xs">
            {model.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl border border-white/15 px-2.5 py-1 text-white/80 hover:text-siso-orange">
                <l.icon className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:inline">{l.label}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {/* Bottom Sheet for all chips */}
      {showAllChips ? (
        <div className="fixed inset-0 z-[60]" aria-modal="true" role="dialog">
          <button className="absolute inset-0 bg-black/50" aria-label="Close" onClick={() => setShowAllChips(false)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl border border-white/10 bg-siso-bg-secondary p-4 shadow-2xl">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">All tags</p>
              <button className="text-xs text-siso-text-muted hover:text-siso-orange" onClick={() => setShowAllChips(false)}>Close</button>
            </div>
            <ul role="list" className="flex flex-wrap gap-2">
              {model.chips.map((chip) => (
                <li key={chip} role="listitem" className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
