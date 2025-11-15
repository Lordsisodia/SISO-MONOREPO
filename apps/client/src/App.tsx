import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/toaster';

// ============================================================================
// CRITICAL IMPORTS - Keep these synchronous for fast initial load
// ============================================================================
import Index from './pages/Index';
import TestPage from './pages/TestPage';
import Auth from './pages/Auth';
import { AuthGuard } from './components/auth/AuthGuard';

// ============================================================================
// LAZY-LOADED COMPONENTS - Code splitting for performance
// ============================================================================

// Landing Pages
const RestaurantLandingPage = lazy(() => import('./components/landing/RestaurantLandingPage'));
const FitnessLandingPage = lazy(() => import('./components/landing/FitnessLandingPage'));
const HealthcareLandingPage = lazy(() => import('./components/landing/HealthcareLandingPage'));
const BarbershopLandingPage = lazy(() => import('./components/landing/BarbershopLandingPage'));
const AutoRepairLandingPage = lazy(() => import('./components/landing/AutoRepairLandingPage'));
const RealEstateLandingPage = lazy(() => import('./components/landing/RealEstateLandingPage'));
const LawFirmLandingPage = lazy(() => import('./components/landing/LawFirmLandingPage'));
const BeautyLandingPage = lazy(() => import('./components/landing/BeautyLandingPage'));
const DigitalMarketingLandingPage = lazy(() => import('./components/landing/DigitalMarketingLandingPage'));
const AccountingLandingPage = lazy(() => import('./components/landing/AccountingLandingPage'));
const HomeServicesLandingPage = lazy(() => import('./components/landing/HomeServicesLandingPage'));
const RetailLandingPage = lazy(() => import('./components/landing/RetailLandingPage'));
const PhotographyLandingPage = lazy(() => import('./components/landing/PhotographyLandingPage'));
const PetServicesLandingPage = lazy(() => import('./components/landing/PetServicesLandingPage'));
const ConstructionLandingPage = lazy(() => import('./components/landing/ConstructionLandingPage'));
const CleaningLandingPage = lazy(() => import('./components/landing/CleaningLandingPage'));
const ConsultingLandingPage = lazy(() => import('./components/landing/ConsultingLandingPage'));
const VideoProductionLandingPage = lazy(() => import('./components/landing/VideoProductionLandingPage'));
const FinancialServicesLandingPage = lazy(() => import('./components/landing/FinancialServicesLandingPage'));
const EducationLandingPage = lazy(() => import('./components/landing/EducationLandingPage'));
const TravelLandingPage = lazy(() => import('./components/landing/TravelLandingPage'));
const FoodServicesLandingPage = lazy(() => import('./components/landing/FoodServicesLandingPage'));
const TechnologyLandingPage = lazy(() => import('./components/landing/TechnologyLandingPage'));
const ManufacturingLandingPage = lazy(() => import('./components/landing/ManufacturingLandingPage'));
const NonprofitLandingPage = lazy(() => import('./components/landing/NonprofitLandingPage'));
const EventPlanningLandingPage = lazy(() => import('./components/landing/EventPlanningLandingPage'));
const LogisticsLandingPage = lazy(() => import('./components/landing/LogisticsLandingPage'));
const EnergyLandingPage = lazy(() => import('./components/landing/EnergyLandingPage'));
const EcommerceLandingPage = lazy(() => import('./components/landing/EcommerceLandingPage'));
const ProfessionalServicesLandingPage = lazy(() => import('./components/landing/ProfessionalServicesLandingPage'));
const AgencyLandingPage = lazy(() => import('./components/landing/AgencyLandingPage'));

// Dashboard & Demo Pages
const DashboardDemo = lazy(() => import('./pages/DashboardDemo'));
const TestDashboard = lazy(() => import('./pages/TestDashboard'));
const EnhancedDashboard = lazy(() => import('./pages/EnhancedDashboard'));

// Portfolio
const PortfolioHub = lazy(() => import('./domain/portfolio').then(m => ({ default: m.PortfolioHub })));
const IndustryLanding = lazy(() => import('./domain/portfolio').then(m => ({ default: m.IndustryLanding })));
const ClientDetail = lazy(() => import('./domain/portfolio').then(m => ({ default: m.ClientDetail })));
const PublicPortfolio = lazy(() => import('./pages/PublicPortfolio'));

// Onboarding & Auth
const OnboardingChat = lazy(() => import('./pages/OnboardingChat'));
const BusinessOnboarding = lazy(() => import('./components/onboarding/BusinessOnboarding').then(m => ({ default: m.BusinessOnboarding })));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Plan = lazy(() => import('./pages/Plan'));
const DecoraPlan = lazy(() => import('./pages/DecoraPlan'));
const PublicPlanView = lazy(() => import('./pages/PublicPlanView'));

// Partner Portal
const PartnershipPage = lazy(() => import('./pages/PartnershipPage'));
const PartnerLogin = lazy(() => import('./pages/auth/PartnerLogin'));
const PartnerRegister = lazy(() => import('./pages/auth/PartnerRegister'));
const PartnerPasswordReset = lazy(() => import('./pages/auth/PartnerPasswordReset'));
const PartnerDashboard = lazy(() => import('./pages/dashboard/PartnerDashboard'));
const PartnerAuthGuard = lazy(() => import('./components/auth/PartnerAuthGuard').then(m => ({ default: m.PartnerAuthGuard })));
const Clients = lazy(() => import('./pages/dashboard/Clients'));
const ReferralsManagement = lazy(() => import('./pages/dashboard/ReferralsManagement'));
const AffiliateLeaderboard = lazy(() => import('./pages/dashboard/AffiliateLeaderboard'));
const TrainingHub = lazy(() => import('./pages/dashboard/TrainingHub'));
const AppPlanGeneratorPage = lazy(() => import('./pages/dashboard/AppPlanGenerator'));
const Support = lazy(() => import('./pages/dashboard/Support'));

// Admin
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminClients = lazy(() => import('./pages/AdminClients'));
const AdminPayments = lazy(() => import('./pages/AdminPayments'));
const AdminDailyPlanner = lazy(() => import('./pages/AdminDailyPlanner'));
const ClientDetailPage = lazy(() => import('./pages/ClientDetailPage'));
const AdminTasks = lazy(() => import('./pages/AdminTasks'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));
const AdminPrompts = lazy(() => import('./pages/AdminPrompts'));
const TeamMemberTasksPage = lazy(() => import('./pages/TeamMemberTasksPage'));
const AdminPlans = lazy(() => import('./pages/AdminPlans'));
const AdminOutreach = lazy(() => import('./pages/AdminOutreach'));
const AdminTemplates = lazy(() => import('./pages/AdminTemplates'));
const AdminTeams = lazy(() => import('./pages/AdminTeams'));
const AdminWireframes = lazy(() => import('./pages/AdminWireframes'));
const AdminUserFlow = lazy(() => import('./pages/AdminUserFlow'));
const AdminPartnershipDashboard = lazy(() => import('./pages/admin/AdminPartnershipDashboard'));
const AdminPartnershipLeaderboard = lazy(() => import('./pages/admin/AdminPartnershipLeaderboard'));
const AdminPartnershipReferrals = lazy(() => import('./pages/admin/AdminPartnershipReferrals'));
const AdminPartnershipStatistics = lazy(() => import('./pages/admin/AdminPartnershipStatistics'));
const AdminPartnershipTraining = lazy(() => import('./pages/admin/AdminPartnershipTraining'));
const AutomationPage = lazy(() => import('./pages/automation/AutomationPage').then(m => ({ default: m.AutomationPage })));

// Projects
const Projects = lazy(() => import('./pages/Projects'));
const ProjectsAndTasksPage = lazy(() => import('./pages/ProjectsAndTasksPage'));
const MyProjects = lazy(() => import('./pages/MyProjects'));
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage'));
const ProjectOnboardingPage = lazy(() => import('./pages/ProjectOnboardingPage'));
const UserFlow = lazy(() => import('./pages/UserFlow'));
const UserFlowFeedbackPage = lazy(() => import('./pages/projects/UserFlowFeedbackPage'));
const UserFlowNodesPage = lazy(() => import('./pages/projects/UserFlowNodesPage'));
const UserFlowCodePage = lazy(() => import('./pages/projects/UserFlowCodePage'));

// Client Dashboard
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const ClientDocumentsPage = lazy(() => import('./pages/client/ClientDocumentsPage'));
const ClientTasksPage = lazy(() => import('./pages/client/ClientTasksPage'));
const ClientStatusPage = lazy(() => import('./pages/client/ClientStatusPage'));
const ClientSupportPage = lazy(() => import('./pages/client/ClientSupportPage'));
const MoodBoardPage = lazy(() => import('./pages/client/MoodBoardPage'));
const QuickSetupPage = lazy(() => import('./pages/client/QuickSetupPage'));
const ClientOnboardingPage = lazy(() => import('./pages/client/ClientOnboardingPage'));
const ClientQuickSetupPage = lazy(() => import('./pages/client/ClientQuickSetupPage'));
const ClientDesignPreferencesPage = lazy(() => import('./pages/client/ClientDesignPreferencesPage'));
const ClientProjectRoadmapPage = lazy(() => import('./pages/client/ClientProjectRoadmapPage'));
const ClientProgressiveUnlockPage = lazy(() => import('./pages/client/ClientProgressiveUnlockPage'));
const ClientWorkInProgressPage = lazy(() => import('./pages/client/ClientWorkInProgressPage'));
const ClientLaunchPreparationPage = lazy(() => import('./pages/client/ClientLaunchPreparationPage'));
const ClientLiveMaintenancePage = lazy(() => import('./pages/client/ClientLiveMaintenancePage'));
const ClientAppPlanPage = lazy(() => import('./pages/client/ClientAppPlanPage'));
const ClientTimelinePage = lazy(() => import('./pages/client/ClientTimelinePage'));
const ClientAgentTeamsPage = lazy(() => import('./pages/client/ClientAgentTeamsPage'));

// Financial & Resources
const PaymentsPage = lazy(() => import('./pages/financial/PaymentsPage'));
const LeaderboardPage = lazy(() => import('./pages/financial/LeaderboardsPage'));
const FinancialProfilePage = lazy(() => import('./pages/financial/FinancialProfilePage'));
const ResourcesPage = lazy(() => import('./pages/resources/ResourcesPage'));
const DocumentLibraryPage = lazy(() => import('./pages/resources/DocumentLibraryPage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const Communication = lazy(() => import('./pages/Communication'));
const AppPlan = lazy(() => import('./pages/AppPlan'));
const ClientAppDetailsPage = lazy(() => import('./pages/ClientAppDetailsPage'));
const HowToEarn = lazy(() => import('./pages/HowToEarn'));

// Debug & Testing
const AppPlanTestingDashboard = lazy(() => import('@/components/debug/AppPlanTestingDashboard'));
const DebugPage = lazy(() => import('./pages/debug'));

// ============================================================================
// LOADING COMPONENT
// ============================================================================
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white text-lg">Loading...</div>
  </div>
);

// ============================================================================
// ERROR BOUNDARY
// ============================================================================
function ErrorFallback({error, resetErrorBoundary}: {error: Error, resetErrorBoundary: () => void}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
        <p className="text-gray-400">There was an error loading this page</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-[#ea384c] text-white rounded hover:bg-[#d42c47]"
        >
          Try again
        </button>
        <div className="mt-4">
          <a
            href="/testing"
            className="text-[#ea384c] hover:underline"
          >
            🧪 Access AI Testing Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
function App() {
  return (
    <>
      <Toaster />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Test route for diagnosis */}
            <Route path="/test" element={<TestPage />} />

            {/* 🎉 DASHBOARD DEMO - See all 13 components working! */}
            <Route path="/demo" element={<DashboardDemo />} />

            {/* Simple Dashboard - No auth required for easier onboarding */}
            <Route path="/test-dashboard" element={<TestDashboard />} />

            {/* Public routes */}
            <Route path="/" element={<Index />} />

            {/* Industry Landing Pages */}
            <Route path="/restaurant" element={<RestaurantLandingPage />} />
            <Route path="/fitness" element={<FitnessLandingPage />} />
            <Route path="/healthcare" element={<HealthcareLandingPage />} />
            <Route path="/barbershop" element={<BarbershopLandingPage />} />
            <Route path="/auto-repair" element={<AutoRepairLandingPage />} />
            <Route path="/real-estate" element={<RealEstateLandingPage />} />
            <Route path="/law-firm" element={<LawFirmLandingPage />} />
            <Route path="/beauty" element={<BeautyLandingPage />} />
            <Route path="/digital-marketing" element={<DigitalMarketingLandingPage />} />
            <Route path="/accounting" element={<AccountingLandingPage />} />
            <Route path="/home-services" element={<HomeServicesLandingPage />} />
            <Route path="/retail" element={<RetailLandingPage />} />
            <Route path="/photography" element={<PhotographyLandingPage />} />
            <Route path="/pet-services" element={<PetServicesLandingPage />} />
            <Route path="/construction" element={<ConstructionLandingPage />} />
            <Route path="/cleaning" element={<CleaningLandingPage />} />
            <Route path="/consulting" element={<ConsultingLandingPage />} />
            <Route path="/video-production" element={<VideoProductionLandingPage />} />

            {/* New Industry Landing Pages */}
            <Route path="/financial-services" element={<FinancialServicesLandingPage />} />
            <Route path="/education" element={<EducationLandingPage />} />
            <Route path="/travel" element={<TravelLandingPage />} />
            <Route path="/food-services" element={<FoodServicesLandingPage />} />
            <Route path="/technology" element={<TechnologyLandingPage />} />
            <Route path="/manufacturing" element={<ManufacturingLandingPage />} />
            <Route path="/non-profit" element={<NonprofitLandingPage />} />
            <Route path="/event-planning" element={<EventPlanningLandingPage />} />
            <Route path="/logistics" element={<LogisticsLandingPage />} />
            <Route path="/energy" element={<EnergyLandingPage />} />

            {/* Task 06: Industry-Specific Landing Pages */}
            <Route path="/ecommerce" element={<EcommerceLandingPage />} />
            <Route path="/professional" element={<ProfessionalServicesLandingPage />} />
            <Route path="/agency" element={<AgencyLandingPage />} />

            <Route path="/auth" element={<Auth />} />

            {/* Portfolio Domain Routes */}
            <Route path="/portfolio" element={<PortfolioHub />} />
            <Route path="/portfolio/:industry" element={<IndustryLanding />} />
            <Route path="/portfolio/:industry/:client" element={<ClientDetail />} />
            <Route path="/portfolio-old" element={<PublicPortfolio />} />

            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="/partners" element={<PartnershipPage />} />

            {/* Partner Authentication Routes */}
            <Route path="/auth/login" element={<PartnerLogin />} />
            <Route path="/auth/register" element={<PartnerRegister />} />
            <Route path="/auth/reset-password" element={<PartnerPasswordReset />} />

            {/* Partner Dashboard Routes */}
            <Route path="/partner" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><PartnerDashboard /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/dashboard" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><PartnerDashboard /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/clients" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><Clients /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/referrals" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><ReferralsManagement /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/leaderboard" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><AffiliateLeaderboard /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/training-hub" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><TrainingHub /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/app-plan-generator" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><AppPlanGeneratorPage /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/support" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><Support /></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/pipeline" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Pipeline</h1><p className="text-gray-400 mt-2">Track your referral pipeline and progress.</p></div></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/profile" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Profile Settings</h1><p className="text-gray-400 mt-2">Manage your partner profile and preferences.</p></div></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/earnings" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Earnings - Coming Soon</h1></div></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/resources" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Resources - Coming Soon</h1></div></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/goals" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Goals & Targets - Coming Soon</h1></div></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/achievements" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Achievements - Coming Soon</h1></div></PartnerAuthGuard></Suspense>} />
            <Route path="/partner/settings" element={<Suspense fallback={<PageLoader />}><PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Settings - Coming Soon</h1></div></PartnerAuthGuard></Suspense>} />

            {/* Backward compatibility redirects */}
            <Route path="/dashboard" element={<Navigate to="/partner" replace />} />
            <Route path="/dashboard/statistics" element={<Navigate to="/partner/clients" replace />} />
            <Route path="/dashboard/referrals" element={<Navigate to="/partner/referrals" replace />} />
            <Route path="/dashboard/leaderboard" element={<Navigate to="/partner/leaderboard" replace />} />
            <Route path="/dashboard/training-hub" element={<Navigate to="/partner/training-hub" replace />} />
            <Route path="/dashboard/app-plan-generator" element={<Navigate to="/partner/app-plan-generator" replace />} />
            <Route path="/dashboard/pipeline" element={<Navigate to="/partner/pipeline" replace />} />
            <Route path="/dashboard/profile" element={<Navigate to="/partner/profile" replace />} />
            <Route path="/dashboard/earnings" element={<Navigate to="/partner/earnings" replace />} />
            <Route path="/dashboard/resources" element={<Navigate to="/partner/resources" replace />} />
            <Route path="/dashboard/goals" element={<Navigate to="/partner/goals" replace />} />
            <Route path="/dashboard/achievements" element={<Navigate to="/partner/achievements" replace />} />
            <Route path="/dashboard/settings" element={<Navigate to="/partner/settings" replace />} />
            <Route path="/partner-dashboard" element={<Navigate to="/partner" replace />} />
            <Route path="/dashboard/partner" element={<Navigate to="/partner" replace />} />

            <Route path="/onboarding-chat" element={<OnboardingChat />} />
            <Route path="/onboarding" element={<AuthGuard><BusinessOnboarding /></AuthGuard>} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/thankyou-plan" element={<ThankYou />} />
            <Route path="/plan/share/:slug" element={<PublicPlanView />} />
            <Route path="/plan/:username" element={<Plan />} />
            <Route path="/decora-plan" element={<DecoraPlan />} />

            <Route path="/app-plan" element={<AuthGuard><AppPlan /></AuthGuard>} />
            <Route path="/app-plan/:username" element={<AppPlan />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AuthGuard adminOnly={true}><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/dashboard" element={<AuthGuard adminOnly={true}><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/clients" element={<AuthGuard adminOnly={true}><AdminClients /></AuthGuard>} />
            <Route path="/admin/clients/:clientId" element={<AuthGuard adminOnly={true}><ClientDetailPage /></AuthGuard>} />
            <Route path="/admin/prompts" element={<AuthGuard adminOnly={true}><AdminPrompts /></AuthGuard>} />
            <Route path="/admin/outreach" element={<AuthGuard adminOnly={true}><AdminOutreach /></AuthGuard>} />
            <Route path="/admin/templates" element={<AuthGuard adminOnly={true}><AdminTemplates /></AuthGuard>} />
            <Route path="/admin/teams" element={<AuthGuard adminOnly={true}><AdminTeams /></AuthGuard>} />
            <Route path="/admin/payments" element={<AuthGuard adminOnly={true}><AdminPayments /></AuthGuard>} />
            <Route path="/admin/daily-planner" element={<AuthGuard adminOnly={true}><AdminDailyPlanner /></AuthGuard>} />
            <Route path="/admin/tasks" element={<AuthGuard adminOnly={true}><AdminTasks /></AuthGuard>} />
            <Route path="/admin/tasks/:memberId" element={<AuthGuard adminOnly={true}><TeamMemberTasksPage /></AuthGuard>} />
            <Route path="/admin/settings" element={<AuthGuard adminOnly={true}><AdminSettings /></AuthGuard>} />
            <Route path="/admin/plans/create" element={<AuthGuard adminOnly={true}><AdminPlans /></AuthGuard>} />
            <Route path="/admin/plans/:planId/edit" element={<AuthGuard adminOnly={true}><AdminPlans /></AuthGuard>} />
            <Route path="/admin/wireframes" element={<AuthGuard adminOnly={true}><AdminWireframes /></AuthGuard>} />
            <Route path="/admin/wireframes/:projectId" element={<AuthGuard adminOnly={true}><AdminWireframes /></AuthGuard>} />
            <Route path="/admin/userflow" element={<AuthGuard adminOnly={true}><AdminUserFlow /></AuthGuard>} />
            <Route path="/admin/userflow/:projectId" element={<AuthGuard adminOnly={true}><UserFlow /></AuthGuard>} />
            <Route path="/admin/partnership" element={<AuthGuard adminOnly={true}><AdminPartnershipDashboard /></AuthGuard>} />
            <Route path="/admin/partnership/leaderboard" element={<AuthGuard adminOnly={true}><AdminPartnershipLeaderboard /></AuthGuard>} />
            <Route path="/admin/partnership/referrals" element={<AuthGuard adminOnly={true}><AdminPartnershipReferrals /></AuthGuard>} />
            <Route path="/admin/partnership/statistics" element={<AuthGuard adminOnly={true}><AdminPartnershipStatistics /></AuthGuard>} />
            <Route path="/admin/partnership/training" element={<AuthGuard adminOnly={true}><AdminPartnershipTraining /></AuthGuard>} />
            <Route path="/automation" element={<AuthGuard adminOnly={true}><AutomationPage /></AuthGuard>} />
            <Route path="/admin/automation" element={<AuthGuard adminOnly={true}><AutomationPage /></AuthGuard>} />

            {/* Dashboard Routes */}
            <Route path="/home" element={<EnhancedDashboard />} />

            {/* Protected Project Routes */}
            <Route path="/projects" element={<AuthGuard><Projects /></AuthGuard>} />
            <Route path="/projects/tasks" element={<AuthGuard><ProjectsAndTasksPage /></AuthGuard>} />
            <Route path="/projects/timeline" element={<AuthGuard><TimelinePage /></AuthGuard>} />
            <Route path="/projects/plan-features" element={<AuthGuard><ProjectDetailsPage /></AuthGuard>} />
            <Route path="/projects/new" element={<AuthGuard><ProjectOnboardingPage /></AuthGuard>} />
            <Route path="/projects/:id/userflow" element={<AuthGuard><UserFlow /></AuthGuard>} />
            <Route path="/projects/:projectId/userflow/feedback" element={<AuthGuard><UserFlowFeedbackPage /></AuthGuard>} />
            <Route path="/projects/:projectId/userflow/nodes" element={<AuthGuard><UserFlowNodesPage /></AuthGuard>} />
            <Route path="/projects/:projectId/userflow/code" element={<AuthGuard><UserFlowCodePage /></AuthGuard>} />
            <Route path="/projects/:id/feedback-log" element={<AuthGuard><Navigate to={`/projects/${window.location.pathname.split('/')[2]}/userflow/feedback`} replace /></AuthGuard>} />
            <Route path="/projects/:id/wireframe" element={<AuthGuard><ProjectDetailsPage tab="wireframes" /></AuthGuard>} />
            <Route path="/projects/:id/wireframes" element={<AuthGuard><ProjectDetailsPage tab="wireframes" /></AuthGuard>} />
            <Route path="/projects/:id/market-research/:documentId" element={<AuthGuard><ProjectDetailsPage /></AuthGuard>} />
            <Route path="/projects/:id" element={<AuthGuard><ProjectDetailsPage /></AuthGuard>} />
            <Route path="/projects/:id/:tab" element={<AuthGuard><ProjectDetailsPage /></AuthGuard>} />
            <Route path="/my-projects" element={<AuthGuard><MyProjects /></AuthGuard>} />
            <Route path="/plan-builder" element={<AuthGuard><Communication /></AuthGuard>} />
            <Route path="/admin/portfolio" element={<AuthGuard><PublicPortfolio /></AuthGuard>} />

            {/* Financial Routes */}
            <Route path="/financial/payments" element={<AuthGuard><PaymentsPage /></AuthGuard>} />
            <Route path="/financial/leaderboards" element={<AuthGuard><LeaderboardPage /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><FinancialProfilePage /></AuthGuard>} />
            <Route path="/resources" element={<AuthGuard><ResourcesPage /></AuthGuard>} />
            <Route path="/resources/documents" element={<AuthGuard><DocumentLibraryPage /></AuthGuard>} />
            <Route path="/financial/profile" element={<AuthGuard><Navigate to="/profile" replace /></AuthGuard>} />
            <Route path="/help" element={<AuthGuard><Navigate to="/resources" replace /></AuthGuard>} />
            <Route path="/settings" element={<AuthGuard><Navigate to="/profile" replace /></AuthGuard>} />
            <Route path="/resources/help" element={<AuthGuard><Navigate to="/resources" replace /></AuthGuard>} />
            <Route path="/resources/help/getting-started" element={<AuthGuard><ResourcesPage /></AuthGuard>} />
            <Route path="/resources/help/documentation" element={<AuthGuard><ResourcesPage /></AuthGuard>} />
            <Route path="/resources/help/faq" element={<AuthGuard><ResourcesPage /></AuthGuard>} />
            <Route path="/client-app/:clientId" element={<AuthGuard><ClientAppDetailsPage /></AuthGuard>} />
            <Route path="/payments" element={<AuthGuard><PaymentsPage /></AuthGuard>} />
            <Route path="/economy/earn" element={<AuthGuard><HowToEarn /></AuthGuard>} />
            <Route path="/economy/leaderboards" element={<AuthGuard><LeaderboardPage /></AuthGuard>} />

            {/* Client Dashboard Routes */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/dashboard/documents" element={<AuthGuard><ClientDocumentsPage /></AuthGuard>} />
            <Route path="/client/dashboard/tasks" element={<ClientTasksPage />} />
            <Route path="/client/dashboard/status" element={<AuthGuard><ClientStatusPage /></AuthGuard>} />
            <Route path="/client/dashboard/support" element={<AuthGuard><ClientSupportPage /></AuthGuard>} />
            <Route path="/client/dashboard/mood-board" element={<AuthGuard><MoodBoardPage /></AuthGuard>} />
            <Route path="/client/dashboard/quick-setup" element={<AuthGuard><QuickSetupPage /></AuthGuard>} />
            <Route path="/client/dashboard/timeline" element={<ClientTimelinePage />} />
            <Route path="/client/dashboard/plan-features" element={<ClientAppPlanPage />} />
            <Route path="/client/dashboard/financial/payments" element={<PaymentsPage />} />
            <Route path="/client/onboarding" element={<ClientOnboardingPage />} />
            <Route path="/client/quick-setup" element={<ClientQuickSetupPage />} />
            <Route path="/client/mood-board" element={<ClientDesignPreferencesPage />} />
            <Route path="/client/app-plan" element={<ClientAppPlanPage />} />
            <Route path="/client/timeline" element={<ClientTimelinePage />} />
            <Route path="/client/agent-teams" element={<ClientAgentTeamsPage />} />
            <Route path="/client/payments" element={<PaymentsPage />} />
            <Route path="/client/development" element={<ClientWorkInProgressPage />} />
            <Route path="/client/testing" element={<ClientProjectRoadmapPage />} />
            <Route path="/client/launch" element={<ClientLaunchPreparationPage />} />
            <Route path="/client/design-preferences" element={<ClientDesignPreferencesPage />} />
            <Route path="/client/work-in-progress" element={<ClientWorkInProgressPage />} />
            <Route path="/client/project-roadmap" element={<ClientProjectRoadmapPage />} />
            <Route path="/client/launch-preparation" element={<ClientLaunchPreparationPage />} />
            <Route path="/client/live-maintenance" element={<ClientLiveMaintenancePage />} />
            <Route path="/client/progressive-unlock" element={<ClientProgressiveUnlockPage />} />

            {/* Testing & Debug Routes */}
            <Route path="/testing" element={<AppPlanTestingDashboard />} />
            <Route path="/debug" element={<DebugPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
