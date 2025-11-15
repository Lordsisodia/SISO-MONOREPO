/**
 * Client-Side Rate Limiter
 * Prevents API abuse and excessive requests
 * Uses Token Bucket algorithm
 */

interface TokenBucket {
  tokens: number
  lastRefill: number
}

export class RateLimiter {
  private buckets = new Map<string, TokenBucket>()

  /**
   * Check if action is allowed under rate limit
   * @param key - Unique identifier for rate limit (e.g., 'message:user123')
   * @param limit - Number of actions allowed
   * @param window - Time window in milliseconds
   * @returns true if allowed, false if rate limited
   */
  async check(key: string, limit: number, window: number): Promise<boolean> {
    let bucket = this.buckets.get(key)

    if (!bucket) {
      bucket = { tokens: limit, lastRefill: Date.now() }
      this.buckets.set(key, bucket)
    }

    // Refill tokens based on time passed
    const now = Date.now()
    const timePassed = now - bucket.lastRefill
    const tokensToAdd = (timePassed / window) * limit

    bucket.tokens = Math.min(limit, bucket.tokens + tokensToAdd)
    bucket.lastRefill = now

    // Check if we have tokens available
    if (bucket.tokens >= 1) {
      bucket.tokens -= 1
      return true
    }

    return false // Rate limited
  }

  /**
   * Get remaining quota for a key
   */
  getRemainingQuota(key: string): number {
    const bucket = this.buckets.get(key)
    return bucket ? Math.floor(bucket.tokens) : 0
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    this.buckets.delete(key)
  }

  /**
   * Clear all rate limits (use on logout)
   */
  clearAll(): void {
    this.buckets.clear()
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

/**
 * Rate limit configurations for different actions
 */
export const RATE_LIMITS = {
  // Chat messages: 10 per minute
  sendMessage: {
    limit: 10,
    window: 60 * 1000,
  },

  // Lead creation: 20 per hour
  createLead: {
    limit: 20,
    window: 60 * 60 * 1000,
  },

  // API calls: 100 per minute
  apiCall: {
    limit: 100,
    window: 60 * 1000,
  },

  // File uploads: 10 per hour
  uploadFile: {
    limit: 10,
    window: 60 * 60 * 1000,
  },

  // Profile updates: 5 per hour
  updateProfile: {
    limit: 5,
    window: 60 * 60 * 1000,
  },
}

/**
 * Helper hook for rate limiting in React components
 */
import { useCallback } from 'react'
import { toast } from '@/shared/hooks/use-toast'

export const useRateLimit = (action: keyof typeof RATE_LIMITS) => {
  const config = RATE_LIMITS[action]

  const checkLimit = useCallback(
    async (userId: string) => {
      const allowed = await rateLimiter.check(
        `${action}:${userId}`,
        config.limit,
        config.window
      )

      if (!allowed) {
        const remaining = rateLimiter.getRemainingQuota(`${action}:${userId}`)
        toast({
          title: 'Rate Limit Exceeded',
          description: `Please slow down. You can retry in a moment. (${remaining} remaining)`,
          variant: 'destructive',
        })
      }

      return allowed
    },
    [action, config]
  )

  return checkLimit
}
