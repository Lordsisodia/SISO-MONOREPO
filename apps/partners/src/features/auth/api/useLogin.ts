/**
 * Auth Feature - Login Hook (TanStack Query)
 */

import { useMutation } from '@tanstack/react-query'
import { authService } from './authService'
import type { LoginCredentials } from '../model/types'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),

    onSuccess: (data) => {
      // Store partner info
      localStorage.setItem('partner-user', JSON.stringify({
        id: data.partner?.id,
        email: data.user.email,
        tier: data.partner?.tier,
        status: data.partner?.status,
      }))

      // Navigate to dashboard
      navigate('/partner/dashboard')
    },

    onError: (error: any) => {
      console.error('Login failed:', error)
      // Error will be shown via toast in component
    },
  })
}
