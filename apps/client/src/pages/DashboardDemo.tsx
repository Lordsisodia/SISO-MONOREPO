import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressiveUnlockHub } from "@/components/client/progressive/ProgressiveUnlockHub";
import { VoiceOnboardingCTA } from "@/components/client/dashboard/VoiceOnboardingCTA";
import { LiveAgentActivity } from "@/components/client/dashboard/LiveAgentActivity";
import { ProjectHubQuickActions } from "@/components/client/dashboard/ProjectHubQuickActions";
import { ClientMetricsOverview } from "@/components/client/dashboard/ClientMetricsOverview";
import { UpcomingMilestones } from "@/components/client/dashboard/UpcomingMilestones";
import { QuickStats } from "@/components/client/dashboard/QuickStats";
import { sampleClients } from '@/data/sampleClients';

/**
 * DEMO DASHBOARD - No Auth Required
 * Shows all built components with sample data
 * Use this to see your work immediately!
 */
export default function DashboardDemo() {
  // Use first sample client for demo
  const demoClient = sampleClients[0];

  return (
    <>
      <Helmet>
        <title>Dashboard Demo | SISO Agency</title>
      </Helmet>

      <ClientDashboardLayout>
        <div className="space-y-6">
          {/* Demo Banner */}
          <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">
                🎉 Dashboard Demo Mode
              </CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Viewing dashboard with sample data. All 13 components are working!
                <br />
                <strong>Demo Client:</strong> {demoClient.business_name} ({demoClient.full_name})
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Quick Stats */}
          <QuickStats clientData={demoClient} />

          {/* Metrics Overview */}
          <ClientMetricsOverview clientData={demoClient} />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progressive Unlock Hub */}
            <div>
              <ProgressiveUnlockHub clientData={demoClient} />
            </div>

            {/* Upcoming Milestones */}
            <div>
              <UpcomingMilestones clientData={demoClient} />
            </div>
          </div>

          {/* Project Hub Quick Actions */}
          <ProjectHubQuickActions clientData={demoClient} />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Agent Activity */}
            <div>
              <LiveAgentActivity />
            </div>

            {/* Voice Onboarding CTA */}
            <div>
              <VoiceOnboardingCTA />
            </div>
          </div>

          {/* Component Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>✅ Built Components Showcase</CardTitle>
              <CardDescription>
                All these components are built and working with your 2 months of work!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'QuickStats',
                  'ClientMetricsOverview',
                  'ProgressiveUnlockHub',
                  'UpcomingMilestones',
                  'ProjectHubQuickActions',
                  'LiveAgentActivity',
                  'VoiceOnboardingCTA',
                  'ClientTodoListCard',
                  'ProjectInformationCard',
                  'ProjectStatusCard',
                  'RecentUpdates',
                  'TasksOverviewCard',
                  'TimelineCard',
                  'ActivityFeedSidebar'
                ].map(component => (
                  <div key={component} className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      ✓ {component}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ClientDashboardLayout>
    </>
  );
}
