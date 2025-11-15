/**
 * Supabase Realtime Provider
 * Manages WebSocket connections, reconnection logic, and real-time subscriptions
 */

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { supabase } from '@shared/lib/supabase/client'
import { RealtimeChannel } from '@supabase/supabase-js'

interface RealtimeContextType {
  isConnected: boolean
  connectionQuality: 'good' | 'poor' | 'offline'
  reconnectAttempts: number
  subscribe: (channelName: string) => RealtimeChannel
  unsubscribe: (channelName: string) => void
}

const RealtimeContext = createContext<RealtimeContextType | null>(null)

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (!context) {
    throw new Error('useRealtime must be used within RealtimeProvider')
  }
  return context
}

interface RealtimeProviderProps {
  children: ReactNode
}

export function RealtimeProvider({ children }: RealtimeProviderProps) {
  const [isConnected, setIsConnected] = useState(true)
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'poor' | 'offline'>('good')
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const [channels, setChannels] = useState<Map<string, RealtimeChannel>>(new Map())

  // Monitor connection status
  useEffect(() => {
    const systemChannel = supabase.channel('system')

    systemChannel
      .on('system', { event: 'connected' }, () => {
        setIsConnected(true)
        setConnectionQuality('good')
        setReconnectAttempts(0)
      })
      .on('system', { event: 'disconnected' }, () => {
        setIsConnected(false)
        setConnectionQuality('offline')
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true)
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false)
          setReconnectAttempts((prev) => prev + 1)
        }
      })

    return () => {
      supabase.removeChannel(systemChannel)
    }
  }, [])

  // Monitor network quality
  useEffect(() => {
    const connection = (navigator as any).connection

    if (!connection) return

    const updateQuality = () => {
      const effectiveType = connection.effectiveType

      if (!navigator.onLine) {
        setConnectionQuality('offline')
      } else if (['slow-2g', '2g', '3g'].includes(effectiveType)) {
        setConnectionQuality('poor')
      } else {
        setConnectionQuality('good')
      }
    }

    connection.addEventListener('change', updateQuality)
    window.addEventListener('online', updateQuality)
    window.addEventListener('offline', updateQuality)

    updateQuality()

    return () => {
      connection.removeEventListener('change', updateQuality)
      window.removeEventListener('online', updateQuality)
      window.removeEventListener('offline', updateQuality)
    }
  }, [])

  // Subscribe to channel
  const subscribe = useCallback((channelName: string) => {
    if (channels.has(channelName)) {
      return channels.get(channelName)!
    }

    const channel = supabase.channel(channelName)
    setChannels((prev) => new Map(prev).set(channelName, channel))

    return channel
  }, [channels])

  // Unsubscribe from channel
  const unsubscribe = useCallback((channelName: string) => {
    const channel = channels.get(channelName)
    if (channel) {
      supabase.removeChannel(channel)
      setChannels((prev) => {
        const next = new Map(prev)
        next.delete(channelName)
        return next
      })
    }
  }, [channels])

  // Cleanup all channels on unmount
  useEffect(() => {
    return () => {
      channels.forEach((channel) => {
        supabase.removeChannel(channel)
      })
    }
  }, [channels])

  const value: RealtimeContextType = {
    isConnected,
    connectionQuality,
    reconnectAttempts,
    subscribe,
    unsubscribe,
  }

  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
}
