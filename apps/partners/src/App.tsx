import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/toaster';

// Core Partnership Pages
import PartnershipLandingPage from './pages/PartnershipLandingPage';

// Partner Authentication
import PartnerLogin from './pages/auth/PartnerLogin';
import PartnerRegister from './pages/auth/PartnerRegister';
import PartnerPasswordReset from './pages/auth/PartnerPasswordReset';

// Partner Dashboard Pages
import PartnerDashboard from './pages/dashboard/PartnerDashboard';
import { PartnerAuthGuard } from './components/auth/PartnerAuthGuard';
import EducationHub from './pages/dashboard/EducationHub';
import TrainingHub from './pages/dashboard/TrainingHub';
import ReferralsManagement from './pages/dashboard/ReferralsManagement';
import Clients from './pages/dashboard/Clients';
import AppPlanGeneratorPage from './pages/dashboard/AppPlanGenerator';
import AffiliateLeaderboard from './pages/dashboard/AffiliateLeaderboard';
import Support from './pages/dashboard/Support';

// Admin Partnership Management
import AdminPartnershipDashboard from './pages/admin/AdminPartnershipDashboard';
import AdminPartnershipLeaderboard from './pages/admin/AdminPartnershipLeaderboard';
import AdminPartnershipReferrals from './pages/admin/AdminPartnershipReferrals';
import AdminPartnershipStatistics from './pages/admin/AdminPartnershipStatistics';
import AdminPartnershipTraining from './pages/admin/AdminPartnershipTraining';

// Authentication & Guards
import { AuthGuard } from './components/auth/AuthGuard';
import PartnershipPage from './pages/PartnershipPage';
import { RouteErrorBoundary } from './components/routing/RouteErrorBoundary';

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

function App() {
  const withRouteBoundary = (element: JSX.Element) => (
    <RouteErrorBoundary>{element}</RouteErrorBoundary>
  );

  return (
    <>
      <Toaster />
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Routes>
          {/* Public Partnership Routes */}
          <Route path="/" element={withRouteBoundary(<PartnershipPage />)} />
          <Route path="/partnership" element={withRouteBoundary(<PartnershipPage />)} />
          <Route path="/partners" element={withRouteBoundary(<PartnershipPage />)} />
          
          {/* Partner Authentication Routes */}
          <Route path="/auth/login" element={withRouteBoundary(<PartnerLogin />)} />
          <Route path="/auth/register" element={withRouteBoundary(<PartnerRegister />)} />
          <Route path="/auth/reset-password" element={withRouteBoundary(<PartnerPasswordReset />)} />
          
          {/* Partner Dashboard Routes */}
          <Route path="/partner" element={withRouteBoundary(<PartnerAuthGuard><PartnerDashboard /></PartnerAuthGuard>)} />
          <Route path="/partner/dashboard" element={withRouteBoundary(<PartnerAuthGuard><PartnerDashboard /></PartnerAuthGuard>)} />
          <Route path="/partner/clients" element={withRouteBoundary(<PartnerAuthGuard><Clients /></PartnerAuthGuard>)} />
          <Route path="/partner/referrals" element={withRouteBoundary(<PartnerAuthGuard><ReferralsManagement /></PartnerAuthGuard>)} />
          <Route path="/partner/leaderboard" element={withRouteBoundary(<PartnerAuthGuard><AffiliateLeaderboard /></PartnerAuthGuard>)} />
          <Route path="/partner/training-hub" element={withRouteBoundary(<PartnerAuthGuard><TrainingHub /></PartnerAuthGuard>)} />
          <Route path="/partner/app-plan-generator" element={withRouteBoundary(<PartnerAuthGuard><AppPlanGeneratorPage /></PartnerAuthGuard>)} />
          <Route path="/partner/support" element={withRouteBoundary(<PartnerAuthGuard><Support /></PartnerAuthGuard>)} />
          
          {/* Partnership Feature Pages (Coming Soon) */}
          <Route path="/partner/pipeline" element={withRouteBoundary(<PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Pipeline Management</h1><p className="text-gray-400 mt-2">Track your referral pipeline and progress.</p></div></PartnerAuthGuard>)} />
          <Route path="/partner/profile" element={withRouteBoundary(<PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Profile Settings</h1><p className="text-gray-400 mt-2">Manage your partner profile and preferences.</p></div></PartnerAuthGuard>)} />
          <Route path="/partner/earnings" element={withRouteBoundary(<PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Commission Center</h1><p className="text-gray-400 mt-2">Track earnings, payments, and bonuses.</p></div></PartnerAuthGuard>)} />
          <Route path="/partner/resources" element={withRouteBoundary(<PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Marketing Resources</h1><p className="text-gray-400 mt-2">Download assets, brand guidelines, and templates.</p></div></PartnerAuthGuard>)} />
          <Route path="/partner/goals" element={withRouteBoundary(<PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Goals & Targets</h1><p className="text-gray-400 mt-2">Set and track performance goals.</p></div></PartnerAuthGuard>)} />
          <Route path="/partner/achievements" element={withRouteBoundary(<PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Tier Progression</h1><p className="text-gray-400 mt-2">Track tier advancement and unlock benefits.</p></div></PartnerAuthGuard>)} />
          <Route path="/partner/settings" element={withRouteBoundary(<PartnerAuthGuard><div className="p-6"><h1 className="text-2xl font-bold text-white">Settings</h1><p className="text-gray-400 mt-2">Manage your account preferences.</p></div></PartnerAuthGuard>)} />
          
          {/* Admin Partnership Management Routes */}
          <Route path="/admin/partnership" element={withRouteBoundary(<AuthGuard adminOnly={true}><AdminPartnershipDashboard /></AuthGuard>)} />
          <Route path="/admin/partnership/leaderboard" element={withRouteBoundary(<AuthGuard adminOnly={true}><AdminPartnershipLeaderboard /></AuthGuard>)} />
          <Route path="/admin/partnership/referrals" element={withRouteBoundary(<AuthGuard adminOnly={true}><AdminPartnershipReferrals /></AuthGuard>)} />
          <Route path="/admin/partnership/statistics" element={withRouteBoundary(<AuthGuard adminOnly={true}><AdminPartnershipStatistics /></AuthGuard>)} />
          <Route path="/admin/partnership/training" element={withRouteBoundary(<AuthGuard adminOnly={true}><AdminPartnershipTraining /></AuthGuard>)} />
          
          {/* Backward compatibility redirects */}
          <Route path="/dashboard" element={<Navigate to="/partner" replace />} />
          <Route path="/dashboard/statistics" element={<Navigate to="/partner/clients" replace />} />
          <Route path="/dashboard/referrals" element={<Navigate to="/partner/referrals" replace />} />
          <Route path="/dashboard/leaderboard" element={<Navigate to="/partner/leaderboard" replace />} />
          <Route path="/dashboard/training-hub" element={<Navigate to="/partner/training-hub" replace />} />
          <Route path="/dashboard/app-plan-generator" element={<Navigate to="/partner/app-plan-generator" replace />} />
          <Route path="/partner-dashboard" element={<Navigate to="/partner" replace />} />
          
          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
