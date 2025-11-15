
import React from "react";
import { useIsClient } from "@/hooks/client/useIsClient";
import { useClientDetails } from "@/hooks/client/useClientDetails";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, FileText, ListTodo, Folder, Sparkles, Palette, Mic } from "lucide-react";
import { ProgressiveUnlockHub } from "@/components/client/progressive/ProgressiveUnlockHub";
import { VoiceOnboardingCTA } from "@/components/client/dashboard/VoiceOnboardingCTA";
import { LiveAgentActivity } from "@/components/client/dashboard/LiveAgentActivity";
import { ProjectHubQuickActions } from "@/components/client/dashboard/ProjectHubQuickActions";
import { ClientMetricsOverview } from "@/components/client/dashboard/ClientMetricsOverview";
import { UpcomingMilestones } from "@/components/client/dashboard/UpcomingMilestones";
import { QuickStats } from "@/components/client/dashboard/QuickStats";

/**
 * Component that shows client dashboard content only if user is a client
 */
export function ClientDashboardContent() {
  const { isClient, loading: clientCheckLoading } = useIsClient();
  const { clientData, loading: clientDataLoading } = useClientDetails();
  
  const loading = clientCheckLoading || clientDataLoading;
  
  // Feature flags for enhanced features
  const useProgressiveUnlock = true; // Progressive Unlock System (Task 13)
  const useProjectHubEnhancements = true; // Project Hub Enhancement (Task 09)

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (!isClient) {
    return (
      <Card className="border border-yellow-600/30 bg-yellow-600/10">
        <CardHeader>
          <CardTitle>Not linked to a client account</CardTitle>
          <CardDescription>You don't have access to client features.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm">
            Your account is not currently linked to a client profile. If you believe this is an error,
            please contact your account manager.
          </p>
          <Button variant="outline" asChild>
            <Link to="/home">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Client dashboard content - Enhanced Project Hub Experience
  if (useProgressiveUnlock) {
    return (
      <div className="space-y-6">
        {/* Enhanced Progressive Unlock Experience (Task 13) */}
        <ProgressiveUnlockHub />
        
        {/* Project Hub Quick Actions (Task 09) */}
        {useProjectHubEnhancements && <ProjectHubQuickActions />}
        
        {/* Quick Stats Grid */}
        {useProjectHubEnhancements && (
          <Card className="border-slate-700 bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>Project Statistics</span>
              </CardTitle>
              <CardDescription>
                Key metrics and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuickStats />
            </CardContent>
          </Card>
        )}
        
        {/* Client Metrics Overview */}
        {useProjectHubEnhancements && <ClientMetricsOverview />}
        
        {/* Upcoming milestones - now full width since activity feed is in sidebar */}
        {useProjectHubEnhancements && (
          <UpcomingMilestones />
        )}
        
        {/* AI Agent Activity (Task 09) */}
        {useProjectHubEnhancements && <LiveAgentActivity />}
        
        {/* Setup & Preferences Section - Optional */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>Setup & Preferences</span>
            </CardTitle>
            <CardDescription>
              Optional tools to enhance your project setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Voice Onboarding Option */}
              {useProjectHubEnhancements && !clientData?.voice_onboarding_complete && (
                <Link to="/client/dashboard/quick-setup?mode=voice">
                  <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors cursor-pointer h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                          <Mic className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">Voice Setup</h4>
                          <p className="text-sm text-slate-300">Tell us about your business in a 2-minute voice chat</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
              
              {/* Mood Board Option */}
              <Link to="/client/dashboard/mood-board">
                <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <Palette className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">Design Preferences</h4>
                        <p className="text-sm text-slate-300">Create your mood board and design preferences</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Legacy client dashboard content (fallback)
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{clientData?.company_name || 'Welcome'}</h1>
          <p className="text-muted-foreground">Your project dashboard</p>
        </div>
        <div>
          <Button className="w-full sm:w-auto">View Project Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Folder className="mr-2 h-4 w-4 text-blue-400" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientData?.project_name || "No project"}</div>
            <p className="text-xs text-muted-foreground mt-1">Current project</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <ListTodo className="mr-2 h-4 w-4 text-green-400" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientData?.todos?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Outstanding tasks</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="mr-2 h-4 w-4 text-purple-400" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientData ? `${clientData.current_step}/${clientData.total_steps}` : "0/0"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Project milestones</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <FileText className="mr-2 h-4 w-4 text-amber-400" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">View</div>
            <p className="text-xs text-muted-foreground mt-1">Project documentation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
