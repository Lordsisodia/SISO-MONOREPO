/**
 * Dashboard Feature - Service Layer
 */

import { supabase } from '@shared/lib/supabase/client'
import type { TierProgress, DashboardStats, ActivityItem } from '../model/types'

export const dashboardService = {
  /**
   * Get tier progression for current partner
   */
  async getTierProgress(partnerId: string): Promise<TierProgress> {
    const { data: partner, error } = await supabase
      .from('partners')
      .select('tier, created_at')
      .eq('id', partnerId)
      .single()

    if (error) throw error

    // Get referral count
    const { count: dealsCount, error: countError } = await supabase
      .from('partner_referrals')
      .select('*', { count: 'exact', head: true })
      .eq('partner_id', partnerId)
      .eq('status', 'won')

    if (countError) throw countError

    // Calculate progression
    const tierLimits = {
      starter: { required: 2, next: 'active' as const },
      active: { required: 10, next: 'performer' as const },
      performer: { required: 25, next: 'elite' as const },
      elite: { required: 999, next: undefined },
    }

    const currentTier = partner.tier as keyof typeof tierLimits
    const limits = tierLimits[currentTier]
    const progressPercentage = Math.min((dealsCount! / limits.required) * 100, 100)

    // Calculate days in tier
    const joinedAt = new Date(partner.created_at)
    const now = new Date()
    const daysInTier = Math.floor((now.getTime() - joinedAt.getTime()) / (1000 * 60 * 60 * 24))

    return {
      currentTier,
      dealsCount: dealsCount || 0,
      dealsRequired: limits.required,
      progressPercentage,
      daysInTier,
      estimatedDaysToNext: this.estimateDaysToNextTier(dealsCount || 0, limits.required, daysInTier),
      nextTier: limits.next,
      requirements: await this.getTierRequirements(partnerId, currentTier),
    }
  },

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(partnerId: string): Promise<DashboardStats> {
    // Total earnings
    const { data: commissions, error: commError } = await supabase
      .from('partner_commissions')
      .select('commission_amount, status')
      .eq('partner_id', partnerId)

    if (commError) throw commError

    const totalEarnings = commissions?.reduce((sum, c) => sum + Number(c.commission_amount), 0) || 0
    const monthlyEarnings = commissions
      ?.filter((c) => c.status === 'approved' || c.status === 'paid')
      .reduce((sum, c) => sum + Number(c.commission_amount), 0) || 0

    // Active leads
    const { count: activeLeads, error: leadsError } = await supabase
      .from('partner_referrals')
      .select('*', { count: 'exact', head: true })
      .eq('partner_id', partnerId)
      .in('status', ['new', 'contacted', 'qualified', 'proposal'])

    if (leadsError) throw leadsError

    // Conversion rate
    const { count: totalLeads } = await supabase
      .from('partner_referrals')
      .select('*', { count: 'exact', head: true })
      .eq('partner_id', partnerId)

    const { count: wonLeads } = await supabase
      .from('partner_referrals')
      .select('*', { count: 'exact', head: true })
      .eq('partner_id', partnerId)
      .eq('status', 'won')

    const conversionRate = totalLeads && totalLeads > 0 ? (wonLeads! / totalLeads) * 100 : 0

    // Get rank (simplified - would need more complex query in production)
    const rank = 12 // Placeholder

    // Total partners
    const { count: totalPartners } = await supabase
      .from('partners')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    return {
      totalEarnings,
      monthlyEarnings,
      activeLeads: activeLeads || 0,
      conversionRate,
      rank,
      totalPartners: totalPartners || 0,
    }
  },

  /**
   * Get recent activity feed
   */
  async getActivityFeed(partnerId: string): Promise<ActivityItem[]> {
    // Get recent commissions
    const { data: recentCommissions } = await supabase
      .from('partner_commissions')
      .select('*, partner_referrals(client_name)')
      .eq('partner_id', partnerId)
      .order('created_at', { ascending: false })
      .limit(10)

    const activities: ActivityItem[] = recentCommissions?.map((c) => ({
      id: c.id,
      type: 'commission' as const,
      title: `Commission earned: $${c.commission_amount}`,
      description: `From ${(c.partner_referrals as any)?.client_name || 'client'}`,
      timestamp: new Date(c.created_at),
      actionUrl: `/partner/earnings`,
    })) || []

    return activities
  },

  /**
   * Helper: Get tier requirements
   */
  async getTierRequirements(partnerId: string, tier: string) {
    // Placeholder - would fetch actual requirements
    return [
      {
        id: '1',
        name: 'Sales Performance',
        description: 'Close deals to advance',
        completed: false,
        progress: 0,
        required: 10,
        category: 'sales' as const,
      },
    ]
  },

  /**
   * Helper: Estimate days to next tier
   */
  estimateDaysToNextTier(current: number, required: number, daysInTier: number): number {
    if (current === 0) return 999
    const rate = current / daysInTier
    const remaining = required - current
    return Math.ceil(remaining / rate)
  },
}
