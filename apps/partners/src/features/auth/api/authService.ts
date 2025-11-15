/**
 * Auth Feature - Service Layer
 * Handles authentication with Supabase
 */

import { supabase } from '@shared/lib/supabase/client'
import type { LoginCredentials, RegisterData, ResetPasswordData, AuthUser } from '../model/types'

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) throw error

    // Fetch partner profile
    const partner = await this.getPartnerProfile(data.user.id)

    return {
      user: data.user,
      session: data.session,
      partner,
    }
  },

  /**
   * Register new partner
   */
  async register(data: RegisterData) {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    })

    if (authError) throw authError

    // Create partner profile
    const { data: partner, error: partnerError } = await supabase
      .from('partners')
      .insert({
        user_id: authData.user!.id,
        email: data.email,
        full_name: data.fullName,
        company_name: data.companyName,
        phone: data.phone,
        status: 'pending',
        tier: 'starter',
        referral_code: this.generateReferralCode(),
      })
      .select()
      .single()

    if (partnerError) throw partnerError

    return {
      user: authData.user,
      session: authData.session,
      partner,
    }
  },

  /**
   * Logout current user
   */
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  /**
   * Send password reset email
   */
  async resetPassword(data: ResetPasswordData) {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
  },

  /**
   * Get current session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error

    if (!data.session) return null

    const partner = await this.getPartnerProfile(data.session.user.id)

    return {
      user: data.session.user,
      session: data.session,
      partner,
    }
  },

  /**
   * Get partner profile for user
   */
  async getPartnerProfile(userId: string) {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // Ignore "not found"

    return data
  },

  /**
   * Generate unique referral code
   */
  generateReferralCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  },

  /**
   * Listen for auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const partner = await this.getPartnerProfile(session.user.id)
        callback({
          id: session.user.id,
          email: session.user.email!,
          fullName: partner?.full_name,
          tier: partner?.tier,
          status: partner?.status,
          partnerId: partner?.id,
        })
      } else {
        callback(null)
      }
    })
  },
}
