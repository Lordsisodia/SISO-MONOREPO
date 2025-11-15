/**
 * Supabase Client Re-export
 * DO NOT create new instances here - import from @/integrations/supabase/client
 */

// Re-export the singleton instance to maintain backward compatibility
export { supabase } from '@/integrations/supabase/client'
export type { Database } from '@/integrations/supabase/types'
export { supabase as default } from '@/integrations/supabase/client'