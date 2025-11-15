/**
 * Dashboard Feature - Query Hooks
 */

import { useQuery } from '@tanstack/react-query'
import { dashboardService } from './dashboardService'
import { useAuthUser } from '@features/auth'

export function useTierProgress() {
  const { partner } = useAuthUser()

  return useQuery({
    queryKey: ['tier-progress', partner?.id],
    queryFn: () => dashboardService.getTierProgress(partner!.id),
    enabled: !!partner?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useDashboardStats() {
  const { partner } = useAuthUser()

  return useQuery({
    queryKey: ['dashboard-stats', partner?.id],
    queryFn: () => dashboardService.getDashboardStats(partner!.id),
    enabled: !!partner?.id,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export function useActivityFeed() {
  const { partner } = useAuthUser()

  return useQuery({
    queryKey: ['activity-feed', partner?.id],
    queryFn: () => dashboardService.getActivityFeed(partner!.id),
    enabled: !!partner?.id,
    staleTime: 30 * 1000, // 30 seconds - fresher for real-time feel
  })
}
