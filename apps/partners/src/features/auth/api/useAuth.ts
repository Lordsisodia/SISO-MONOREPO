/**
 * Auth Feature - Auth State Hook
 */

import { useQuery } from '@tanstack/react-query'
import { authService } from './authService'

export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'session'],
    queryFn: () => authService.getSession(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })
}

export function useAuthUser() {
  const { data, isLoading } = useAuth()

  return {
    user: data?.user || null,
    partner: data?.partner || null,
    isAuthenticated: !!data?.session,
    isLoading,
  }
}
