/**
 * TanStack Query Provider
 * Handles server state management with caching, optimistic updates, and offline support
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

/**
 * Query client with partnership-optimized configuration
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache settings
      staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
      gcTime: 10 * 60 * 1000, // 10 minutes - garbage collection time (was cacheTime)

      // Retry settings
      retry: 3, // Retry failed requests 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff

      // Refetch settings
      refetchOnWindowFocus: false, // Don't refetch on tab focus (mobile battery saver)
      refetchOnReconnect: true, // Refetch when connection restored
      refetchOnMount: false, // Use cached data on mount

      // Network mode
      networkMode: 'offlineFirst', // Try cache first, then network (PWA optimization)
    },

    mutations: {
      // Retry failed mutations once (server might be temporarily down)
      retry: 1,
      retryDelay: 1000,

      // Network mode
      networkMode: 'offlineFirst', // Queue mutations when offline
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show devtools in development only */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  )
}

/**
 * Export query client for use in services
 */
export { queryClient }
