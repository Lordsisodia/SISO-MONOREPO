
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/hooks/useUser';

/**
 * Hook to check if the current user is linked to a client
 */
export function useIsClient() {
  // MOCK DATA - Always return true for testing
  console.log('🎭 useIsClient: Using mock client data for testing');
  
  return {
    isClient: true,
    clientId: 'mock-client-123', 
    loading: false
  };
}
