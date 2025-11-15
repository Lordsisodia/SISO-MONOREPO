/**
 * Auth Feature - Type Definitions
 */

export interface AuthUser {
  id: string
  email: string
  fullName?: string
  tier?: 'starter' | 'active' | 'performer' | 'elite'
  status?: 'pending' | 'approved' | 'active' | 'suspended'
  partnerId?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  fullName: string
  companyName?: string
  phone?: string
}

export interface ResetPasswordData {
  email: string
}

export interface AuthSession {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthError {
  message: string
  code?: string
  field?: string
}
