/**
 * Auth Feature - Register Hook (TanStack Query)
 */

import { useMutation } from '@tanstack/react-query'
import { authService } from './authService'
import type { RegisterData } from '../model/types'
import { useNavigate } from 'react-router-dom'

export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),

    onSuccess: (data) => {
      // Store partner info
      localStorage.setItem('partner-user', JSON.stringify({
        id: data.partner?.id,
        email: data.user.email,
        tier: data.partner?.tier,
        status: data.partner?.status,
      }))

      // Navigate to onboarding or dashboard
      navigate('/partner/dashboard')
    },

    onError: (error: any) => {
      console.error('Registration failed:', error)
    },
  })
}
