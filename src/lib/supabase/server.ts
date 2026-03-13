import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getEnv } from '@/lib/env'

let _serverClient: SupabaseClient | null = null

export function createServerSupabaseClient(): SupabaseClient {
  if (_serverClient) return _serverClient

  const env = getEnv()
  _serverClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })

  return _serverClient
}

export function _resetServerSupabaseClientForTest(): void {
  _serverClient = null
}
