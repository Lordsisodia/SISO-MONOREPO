import { memo } from 'react';
import IndustryLandingPage from './IndustryLandingPage';

// Factory function to create industry-specific landing page components
export const createIndustryLandingPage = (industryKey: string) => {
  const Component = memo(() => <IndustryLandingPage industryKey={industryKey} />);
  Component.displayName = `${industryKey.charAt(0).toUpperCase() + industryKey.slice(1)}LandingPage`;
  return Component;
};

// Pre-built landing page components for each industry (matching IndustryConfig.ts)
export const RestaurantLandingPageTemplate = createIndustryLandingPage('restaurants');
export const FitnessLandingPageTemplate = createIndustryLandingPage('fitness');
export const HealthcareLandingPageTemplate = createIndustryLandingPage('healthcare');
export const BarbershopLandingPageTemplate = createIndustryLandingPage('barbershops');
export const AutoRepairLandingPageTemplate = createIndustryLandingPage('autorepair');
export const RealEstateLandingPageTemplate = createIndustryLandingPage('realestate');
export const LawFirmLandingPageTemplate = createIndustryLandingPage('lawfirms');
export const BeautyLandingPageTemplate = createIndustryLandingPage('beauty');
export const DigitalMarketingLandingPageTemplate = createIndustryLandingPage('digitalmarketing');
export const AccountingLandingPageTemplate = createIndustryLandingPage('accounting');
export const HomeServicesLandingPageTemplate = createIndustryLandingPage('homeservices');
export const RetailLandingPageTemplate = createIndustryLandingPage('retail');
export const PhotographyLandingPageTemplate = createIndustryLandingPage('photography');
export const PetServicesLandingPageTemplate = createIndustryLandingPage('petservices');
export const ConstructionLandingPageTemplate = createIndustryLandingPage('construction');
export const CleaningLandingPageTemplate = createIndustryLandingPage('cleaning');
export const ConsultingLandingPageTemplate = createIndustryLandingPage('consulting');
export const VideoProductionLandingPageTemplate = createIndustryLandingPage('videoproduction');

// New Industries - Added in recent expansion
export const FinancialServicesLandingPageTemplate = createIndustryLandingPage('financialservices');
export const EducationLandingPageTemplate = createIndustryLandingPage('education');
export const TravelLandingPageTemplate = createIndustryLandingPage('travel');
export const FoodLandingPageTemplate = createIndustryLandingPage('food');
export const TechnologyLandingPageTemplate = createIndustryLandingPage('technology');
export const ManufacturingLandingPageTemplate = createIndustryLandingPage('manufacturing');
export const NonprofitLandingPageTemplate = createIndustryLandingPage('nonprofit');
export const EventsLandingPageTemplate = createIndustryLandingPage('events');
export const LogisticsLandingPageTemplate = createIndustryLandingPage('logistics');
export const EnergyLandingPageTemplate = createIndustryLandingPage('energy');

// Task 06: Industry-Specific Landing Pages - New Templates
export const EcommerceLandingPageTemplate = createIndustryLandingPage('ecommerce');
export const ProfessionalLandingPageTemplate = createIndustryLandingPage('professional');
export const AgencyLandingPageTemplate = createIndustryLandingPage('agency');

// Industry mapping for route generation (matching IndustryConfig.ts)
export const industryRouteMap = {
  restaurants: '/restaurant',
  fitness: '/fitness',
  healthcare: '/healthcare',
  barbershops: '/barbershop',
  autorepair: '/auto-repair',
  realestate: '/real-estate',
  lawfirms: '/law-firm',
  beauty: '/beauty',
  digitalmarketing: '/digital-marketing',
  accounting: '/accounting',
  homeservices: '/home-services',
  retail: '/retail',
  photography: '/photography',
  petservices: '/pet-services',
  construction: '/construction',
  cleaning: '/cleaning',
  consulting: '/consulting',
  videoproduction: '/video-production',
  // New Industries
  financialservices: '/financial-services',
  education: '/education',
  travel: '/travel',
  food: '/food-services',
  technology: '/technology',
  manufacturing: '/manufacturing',
  nonprofit: '/non-profit',
  events: '/event-planning',
  logistics: '/logistics',
  energy: '/energy',
  // Task 06: New Industry Routes
  ecommerce: '/ecommerce',
  professional: '/professional',
  agency: '/agency'
} as const;

// Export all industry keys for programmatic use
export const industryKeys = Object.keys(industryRouteMap) as Array<keyof typeof industryRouteMap>;

// Helper function to get component by industry key
export const getIndustryLandingPageComponent = (industryKey: string) => {
  const componentMap = {
    restaurants: RestaurantLandingPageTemplate,
    fitness: FitnessLandingPageTemplate,
    healthcare: HealthcareLandingPageTemplate,
    barbershops: BarbershopLandingPageTemplate,
    autorepair: AutoRepairLandingPageTemplate,
    realestate: RealEstateLandingPageTemplate,
    lawfirms: LawFirmLandingPageTemplate,
    beauty: BeautyLandingPageTemplate,
    digitalmarketing: DigitalMarketingLandingPageTemplate,
    accounting: AccountingLandingPageTemplate,
    homeservices: HomeServicesLandingPageTemplate,
    retail: RetailLandingPageTemplate,
    photography: PhotographyLandingPageTemplate,
    petservices: PetServicesLandingPageTemplate,
    construction: ConstructionLandingPageTemplate,
    cleaning: CleaningLandingPageTemplate,
    consulting: ConsultingLandingPageTemplate,
    videoproduction: VideoProductionLandingPageTemplate,
    // New Industries
    financialservices: FinancialServicesLandingPageTemplate,
    education: EducationLandingPageTemplate,
    travel: TravelLandingPageTemplate,
    food: FoodLandingPageTemplate,
    technology: TechnologyLandingPageTemplate,
    manufacturing: ManufacturingLandingPageTemplate,
    nonprofit: NonprofitLandingPageTemplate,
    events: EventsLandingPageTemplate,
    logistics: LogisticsLandingPageTemplate,
    energy: EnergyLandingPageTemplate,
    // Task 06: New Industry Components
    ecommerce: EcommerceLandingPageTemplate,
    professional: ProfessionalLandingPageTemplate,
    agency: AgencyLandingPageTemplate
  };

  return componentMap[industryKey as keyof typeof componentMap] || RestaurantLandingPageTemplate;
};