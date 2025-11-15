/**
 * Authentication Domain - Google OAuth & Preview Mode
 *
 * This domain handles authentication and preview mode for the client dashboard.
 * Users can preview the dashboard before logging in, but must authenticate to interact.
 *
 * Key Features:
 * - Preview mode (dashboard visible, interactions blocked)
 * - Google OAuth via Supabase (primary)
 * - Email/password authentication (fallback)
 * - Login prompts on interaction attempts
 * - Session management
 * - Protected route guards
 *
 * Authentication Flow:
 * 1. User lands on dashboard (preview mode)
 * 2. Dashboard content visible but locked
 * 3. Any interaction → login prompt
 * 4. Google OAuth one-click login
 * 5. Session created, progress saved
 * 6. Full dashboard access unlocked
 *
 * @domain client-base/auth
 * @accessible Entry point for all users
 * @integrates Dashboard (preview mode), all protected routes
 */

// Pages
// export { default as LoginPage } from './pages/LoginPage'

// Components
// export { GoogleLoginButton, EmailPasswordForm, LoginPrompt, AuthGuard } from './components'

// Hooks
// export { useAuth, useSupabaseAuth, usePreviewMode } from './hooks'

// Server
// export { supabaseClient, authActions } from './server'

// Types
// export type { User, AuthState, PreviewMode } from './types'
