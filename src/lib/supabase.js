import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have valid Supabase configuration
const hasValidConfig = supabaseUrl && 
                      supabaseAnonKey && 
                      supabaseUrl !== 'your_supabase_url_here' &&
                      supabaseAnonKey !== 'your_supabase_anon_key_here'

// Create Supabase client or mock client
export const supabase = hasValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Mock client for demo mode
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Demo mode') }),
        signUp: () => Promise.resolve({ data: null, error: new Error('Demo mode') }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [] }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null })
      })
    }

export const isDemoMode = !hasValidConfig