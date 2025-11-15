/**
 * Sentry Error Monitoring Provider
 * Tracks errors, performance, and user sessions in production
 */

import * as Sentry from '@sentry/react'
import { useEffect } from 'react'
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom'

/**
 * Initialize Sentry with partnership-specific configuration
 */
export function initSentry() {
  if (import.meta.env.MODE === 'development') {
    console.log('Sentry disabled in development mode')
    return
  }

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,

    integrations: [
      // Performance monitoring with React Router instrumentation
      Sentry.browserTracingIntegration({
        router: Sentry.reactRouterV6BrowserTracingIntegration({
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      }),

      // Session replay for debugging
      Sentry.replayIntegration({
        maskAllText: true, // Privacy: mask all text
        blockAllMedia: true, // Privacy: block images/videos
      }),
    ],

    // Performance monitoring sample rate
    tracesSampleRate: 0.1, // 10% of transactions

    // Session replay sample rates
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% when errors occur

    // Filter sensitive data before sending
    beforeSend(event, hint) {
      // Add partner context (without PII)
      if (event.user) {
        const partnerId = getCurrentPartnerId()
        const tier = getCurrentTier()

        event.user = {
          id: partnerId ? hashPartnerId(partnerId) : 'anonymous', // Hash for privacy
          tier: tier,
        }
      }

      // Filter sensitive data from request
      if (event.request?.data) {
        event.request.data = filterSensitiveData(event.request.data)
      }

      // Filter sensitive breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
          if (breadcrumb.data) {
            breadcrumb.data = filterSensitiveData(breadcrumb.data)
          }
          return breadcrumb
        })
      }

      return event
    },

    // Ignore certain errors
    ignoreErrors: [
      // Browser extension errors
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'atomicFindClose',

      // Network errors (expected with offline-first)
      'NetworkError',
      'Failed to fetch',
    ],
  })
}

/**
 * Get current partner ID from auth context
 */
function getCurrentPartnerId(): string | null {
  try {
    const user = JSON.parse(localStorage.getItem('partner-user') || '{}')
    return user.id || null
  } catch {
    return null
  }
}

/**
 * Get current partner tier
 */
function getCurrentTier(): string | null {
  try {
    const user = JSON.parse(localStorage.getItem('partner-user') || '{}')
    return user.tier || null
  } catch {
    return null
  }
}

/**
 * Hash partner ID for privacy (one-way hash)
 */
function hashPartnerId(id: string): string {
  // Simple hash for privacy (not cryptographic)
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return `partner-${Math.abs(hash)}`
}

/**
 * Filter sensitive data from objects
 */
function filterSensitiveData(data: any): any {
  if (!data || typeof data !== 'object') return data

  const filtered = { ...data }
  const sensitiveKeys = [
    'password',
    'token',
    'api_key',
    'secret',
    'credit_card',
    'ssn',
    'phone',
    'email', // Mask email addresses
    'address',
  ]

  for (const key of Object.keys(filtered)) {
    if (sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive))) {
      filtered[key] = '[FILTERED]'
    }
  }

  return filtered
}

/**
 * Set custom context for errors
 */
export function setSentryContext(context: {
  partnerId?: string
  tier?: string
  feature?: string
  action?: string
}) {
  Sentry.setContext('partnership', {
    partnerId: context.partnerId ? hashPartnerId(context.partnerId) : undefined,
    tier: context.tier,
    feature: context.feature,
    action: context.action,
  })
}

/**
 * Capture custom error with context
 */
export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    contexts: {
      partnership: context,
    },
  })
}

/**
 * Capture custom message/event
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level)
}
