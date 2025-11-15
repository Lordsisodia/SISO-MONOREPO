/**
 * Auth Feature - Login Form Component
 * Mobile-first login form using new architecture
 */

import { useState } from 'react'
import { useLogin } from '../api/useLogin'
import { sanitizeInput } from '@shared/lib/security/sanitize'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email)

    loginMutation.mutate({
      email: sanitizedEmail,
      password, // Don't sanitize password (needs exact match)
    })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your partner account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ea384c] focus:border-transparent"
              placeholder="partner@example.com"
              disabled={loginMutation.isPending}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ea384c] focus:border-transparent"
              placeholder="••••••••"
              disabled={loginMutation.isPending}
            />
          </div>

          {/* Error Message */}
          {loginMutation.isError && (
            <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">
                {(loginMutation.error as any)?.message || 'Login failed. Please check your credentials.'}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 bg-[#ea384c] text-white font-semibold rounded-lg hover:bg-[#d42c47] focus:outline-none focus:ring-2 focus:ring-[#ea384c] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <a href="/auth/register" className="text-[#ea384c] hover:underline">
              Create account
            </a>
            <a href="/auth/reset-password" className="text-gray-400 hover:text-white">
              Forgot password?
            </a>
          </div>
        </form>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-8">
          🔒 Secured with Row Level Security
        </p>
      </div>
    </div>
  )
}
