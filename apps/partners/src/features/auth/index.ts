/**
 * Auth Feature - Public API
 * Only these exports are available to other features
 */

// Hooks
export { useLogin } from './api/useLogin'
export { useRegister } from './api/useRegister'
export { useAuth, useAuthUser } from './api/useAuth'

// Types
export type { AuthUser, LoginCredentials, RegisterData, AuthSession } from './model/types'

// Service (for special cases only)
export { authService } from './api/authService'
