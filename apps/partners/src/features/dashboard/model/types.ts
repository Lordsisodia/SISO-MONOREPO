/**
 * Dashboard Feature - Type Definitions
 */

export interface TierProgress {
  currentTier: 'starter' | 'active' | 'performer' | 'elite'
  dealsCount: number
  dealsRequired: number
  progressPercentage: number
  daysInTier: number
  estimatedDaysToNext: number
  nextTier?: 'active' | 'performer' | 'elite'
  requirements: TierRequirement[]
}

export interface TierRequirement {
  id: string
  name: string
  description: string
  completed: boolean
  progress: number
  required: number
  category: 'sales' | 'training' | 'satisfaction' | 'engagement' | 'time'
}

export interface DashboardStats {
  totalEarnings: number
  monthlyEarnings: number
  activeLeads: number
  conversionRate: number
  rank: number
  totalPartners: number
}

export interface ActivityItem {
  id: string
  type: 'commission' | 'tier_up' | 'achievement' | 'team_win' | 'training'
  title: string
  description: string
  timestamp: Date
  icon?: string
  actionUrl?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: Date
  tier: 'starter' | 'active' | 'performer' | 'elite'
}
