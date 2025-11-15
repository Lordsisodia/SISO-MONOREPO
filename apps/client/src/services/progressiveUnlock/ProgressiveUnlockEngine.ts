/**
 * Progressive Unlock Engine - Core system for managing 6-page client journey
 * Task 13: Progressive Unlock System Implementation
 */

import React from 'react';

export interface UnlockStage {
  id: string;
  name: string;
  title: string;
  description: string;
  order: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  requiredSteps: string[];
  completionCriteria: CompletionCriteria;
  estimatedDuration: string;
  benefits: string[];
}

export interface CompletionCriteria {
  minRequiredActions: number;
  requiredData: string[];
  dependencies: string[];
  qualityGates: string[];
}

export interface ClientProgressState {
  currentStage: string;
  unlockedStages: string[];
  completedStages: string[];
  overallProgress: number;
  lastUpdated: Date;
  clientData: any;
}

export class ProgressiveUnlockEngine {
  private stages: Map<string, UnlockStage> = new Map();
  private progressState: ClientProgressState;

  constructor(clientData?: any) {
    this.initializeStages();
    this.progressState = this.loadClientProgress(clientData);
    this.updateStageUnlockStatus();
  }

  private initializeStages(): void {
    const defaultStages: UnlockStage[] = [
      {
        id: 'welcome-hub',
        name: 'Welcome Hub',
        title: 'Welcome to Your Project Journey',
        description: 'Get oriented with your project overview and next steps',
        order: 1,
        isUnlocked: true, // Always unlocked
        isCompleted: false,
        isCurrent: true,
        requiredSteps: [],
        completionCriteria: {
          minRequiredActions: 1,
          requiredData: ['project_overview_viewed'],
          dependencies: [],
          qualityGates: ['client_onboarded']
        },
        estimatedDuration: '5-10 minutes',
        benefits: [
          'Clear project overview',
          'Understanding of next steps', 
          'Access to project timeline'
        ]
      },
      {
        id: 'design-discovery',
        name: 'Design Discovery',
        title: 'Shape Your Vision',
        description: 'Define your style preferences and design direction',
        order: 2,
        isUnlocked: false,
        isCompleted: false,
        isCurrent: false,
        requiredSteps: ['welcome-hub'],
        completionCriteria: {
          minRequiredActions: 3,
          requiredData: ['mood_board_selections', 'style_preferences', 'brand_direction'],
          dependencies: ['welcome-hub'],
          qualityGates: ['design_preferences_complete']
        },
        estimatedDuration: '15-20 minutes',
        benefits: [
          'Personalized design direction',
          'Reduced revision rounds',
          'Faster design approval'
        ]
      },
      {
        id: 'project-roadmap',
        name: 'Project Roadmap',
        title: 'Your Development Journey',
        description: 'Track progress through our 46-step development process',
        order: 3,
        isUnlocked: false,
        isCompleted: false,
        isCurrent: false,
        requiredSteps: ['welcome-hub', 'design-discovery'],
        completionCriteria: {
          minRequiredActions: 2,
          requiredData: ['timeline_reviewed', 'milestones_understood'],
          dependencies: ['design-discovery'],
          qualityGates: ['roadmap_approved']
        },
        estimatedDuration: '10-15 minutes',
        benefits: [
          'Complete project transparency',
          'Clear milestone expectations',
          'Real-time progress tracking'
        ]
      },
      {
        id: 'work-in-progress',
        name: 'Work in Progress',
        title: 'Live Development Tracking',
        description: 'Watch your project come to life with real-time development visibility',
        order: 4,
        isUnlocked: false,
        isCompleted: false,
        isCurrent: false,
        requiredSteps: ['welcome-hub', 'design-discovery', 'project-roadmap'],
        completionCriteria: {
          minRequiredActions: 1,
          requiredData: ['development_progress_viewed'],
          dependencies: ['project-roadmap'],
          qualityGates: ['development_started']
        },
        estimatedDuration: 'Ongoing',
        benefits: [
          'Real-time development visibility',
          'AI agent progress tracking',
          'Quality assurance monitoring'
        ]
      },
      {
        id: 'launch-preparation',
        name: 'Launch Preparation',
        title: 'Get Ready to Go Live',
        description: 'Final testing, training, and launch preparations',
        order: 5,
        isUnlocked: false,
        isCompleted: false,
        isCurrent: false,
        requiredSteps: ['welcome-hub', 'design-discovery', 'project-roadmap', 'work-in-progress'],
        completionCriteria: {
          minRequiredActions: 4,
          requiredData: ['testing_complete', 'training_received', 'content_approved', 'launch_checklist'],
          dependencies: ['work-in-progress'],
          qualityGates: ['pre_launch_approved']
        },
        estimatedDuration: '1-2 days',
        benefits: [
          'Comprehensive testing coverage',
          'Launch readiness verification',
          'Training and documentation'
        ]
      },
      {
        id: 'live-maintenance',
        name: 'Live & Maintenance',
        title: 'Your Project is Live!',
        description: 'Ongoing support, monitoring, and optimization',
        order: 6,
        isUnlocked: false,
        isCompleted: false,
        isCurrent: false,
        requiredSteps: ['welcome-hub', 'design-discovery', 'project-roadmap', 'work-in-progress', 'launch-preparation'],
        completionCriteria: {
          minRequiredActions: 2,
          requiredData: ['project_launched', 'monitoring_active'],
          dependencies: ['launch-preparation'],
          qualityGates: ['successfully_launched']
        },
        estimatedDuration: 'Ongoing',
        benefits: [
          'Continuous monitoring',
          'Performance optimization',
          'Ongoing support access'
        ]
      }
    ];

    defaultStages.forEach(stage => {
      this.stages.set(stage.id, stage);
    });
  }

  private loadClientProgress(clientData?: any): ClientProgressState {
    // In a real implementation, this would load from database
    // For now, we'll determine progress based on clientData
    const currentStep = clientData?.current_step || 0;
    const totalSteps = clientData?.total_steps || 46;
    
    let currentStage = 'welcome-hub';
    let unlockedStages = ['welcome-hub'];
    let completedStages: string[] = [];

    // Determine stage based on project progress
    if (currentStep > 0) {
      unlockedStages.push('design-discovery');
      if (clientData?.mood_board_complete) {
        completedStages.push('design-discovery');
        unlockedStages.push('project-roadmap');
        currentStage = 'project-roadmap';
      }
    }

    if (currentStep > 10) {
      unlockedStages.push('work-in-progress');
      currentStage = 'work-in-progress';
    }

    if (currentStep > 40) {
      unlockedStages.push('launch-preparation');
      currentStage = 'launch-preparation';
    }

    if (currentStep >= totalSteps) {
      unlockedStages.push('live-maintenance');
      currentStage = 'live-maintenance';
      completedStages = unlockedStages.slice(0, -1); // All but current are completed
    }

    return {
      currentStage,
      unlockedStages,
      completedStages,
      overallProgress: Math.round((currentStep / totalSteps) * 100),
      lastUpdated: new Date(),
      clientData
    };
  }

  private updateStageUnlockStatus(): void {
    const { currentStage, unlockedStages, completedStages } = this.progressState;

    this.stages.forEach((stage, stageId) => {
      stage.isUnlocked = unlockedStages.includes(stageId);
      stage.isCompleted = completedStages.includes(stageId);
      stage.isCurrent = stageId === currentStage;
    });
  }

  public getCurrentStage(): UnlockStage | null {
    const currentStage = this.stages.get(this.progressState.currentStage);
    return currentStage || null;
  }

  public getAllStages(): UnlockStage[] {
    return Array.from(this.stages.values()).sort((a, b) => a.order - b.order);
  }

  public getUnlockedStages(): UnlockStage[] {
    return this.getAllStages().filter(stage => stage.isUnlocked);
  }

  public canAccessStage(stageId: string): boolean {
    const stage = this.stages.get(stageId);
    return stage ? stage.isUnlocked : false;
  }

  public getNextStage(): UnlockStage | null {
    const allStages = this.getAllStages();
    const currentStageIndex = allStages.findIndex(stage => stage.isCurrent);
    
    if (currentStageIndex >= 0 && currentStageIndex < allStages.length - 1) {
      return allStages[currentStageIndex + 1];
    }
    
    return null;
  }

  public getProgressPercentage(): number {
    return this.progressState.overallProgress;
  }

  public getStageProgress(stageId: string): number {
    const stage = this.stages.get(stageId);
    if (!stage) return 0;

    if (stage.isCompleted) return 100;
    if (stage.isCurrent) return 50; // In progress
    if (stage.isUnlocked) return 25; // Available
    return 0; // Locked
  }

  public completeStage(stageId: string, completionData?: any): boolean {
    const stage = this.stages.get(stageId);
    if (!stage || !stage.isUnlocked) return false;

    // Mark as completed
    stage.isCompleted = true;
    this.progressState.completedStages.push(stageId);

    // Unlock next stage if all dependencies are met
    const nextStage = this.getNextStage();
    if (nextStage && this.checkDependencies(nextStage.id)) {
      this.unlockStage(nextStage.id);
    }

    // Update current stage to next available
    this.updateCurrentStage();
    
    return true;
  }

  private checkDependencies(stageId: string): boolean {
    const stage = this.stages.get(stageId);
    if (!stage) return false;

    return stage.requiredSteps.every(reqStageId => {
      const reqStage = this.stages.get(reqStageId);
      return reqStage && reqStage.isCompleted;
    });
  }

  private unlockStage(stageId: string): void {
    const stage = this.stages.get(stageId);
    if (stage) {
      stage.isUnlocked = true;
      if (!this.progressState.unlockedStages.includes(stageId)) {
        this.progressState.unlockedStages.push(stageId);
      }
    }
  }

  private updateCurrentStage(): void {
    const unlockedStages = this.getUnlockedStages();
    const incompleteUnlocked = unlockedStages.find(stage => !stage.isCompleted);
    
    if (incompleteUnlocked) {
      // Clear current flags
      this.stages.forEach(stage => {
        stage.isCurrent = false;
      });
      
      // Set new current stage
      incompleteUnlocked.isCurrent = true;
      this.progressState.currentStage = incompleteUnlocked.id;
    }
  }

  public getStageNavigation(): Array<{id: string, name: string, isAccessible: boolean, isCurrent: boolean}> {
    return this.getAllStages().map(stage => ({
      id: stage.id,
      name: stage.name,
      isAccessible: stage.isUnlocked,
      isCurrent: stage.isCurrent
    }));
  }

  public generateProgressSummary(): {
    currentStageName: string;
    progressPercentage: number;
    stagesCompleted: number;
    totalStages: number;
    nextStageName: string | null;
    estimatedTimeToNext: string | null;
  } {
    const currentStage = this.getCurrentStage();
    const nextStage = this.getNextStage();
    const allStages = this.getAllStages();
    const completedCount = allStages.filter(stage => stage.isCompleted).length;

    return {
      currentStageName: currentStage?.name || 'Unknown',
      progressPercentage: this.getProgressPercentage(),
      stagesCompleted: completedCount,
      totalStages: allStages.length,
      nextStageName: nextStage?.name || null,
      estimatedTimeToNext: nextStage?.estimatedDuration || null
    };
  }
}

// Factory function for easy instantiation
export function createProgressiveUnlockEngine(clientData?: any): ProgressiveUnlockEngine {
  return new ProgressiveUnlockEngine(clientData);
}

// Hook for React components
export function useProgressiveUnlock(clientData?: any) {
  const [engine] = React.useState(() => createProgressiveUnlockEngine(clientData));
  
  React.useEffect(() => {
    // Re-initialize if clientData changes
    if (clientData) {
      // engine.updateClientData(clientData); // Would implement this method
    }
  }, [clientData, engine]);

  return {
    engine,
    currentStage: engine.getCurrentStage(),
    allStages: engine.getAllStages(),
    unlockedStages: engine.getUnlockedStages(),
    progressPercentage: engine.getProgressPercentage(),
    progressSummary: engine.generateProgressSummary(),
    navigation: engine.getStageNavigation(),
    canAccess: (stageId: string) => engine.canAccessStage(stageId),
    complete: (stageId: string, data?: any) => engine.completeStage(stageId, data)
  };
}