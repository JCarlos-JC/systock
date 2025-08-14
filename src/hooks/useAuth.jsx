import React, { useEffect, useState } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'
import AuthContext from './AuthContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemoMode) {
      // Set a demo user for development
      setUser({
        id: 'demo-user-id',
        email: 'demo@systock.com',
        name: 'Usuário Demo',
        role: 'admin'
      })
      setLoading(false)
      return
    }

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          setUser({ ...session.user, ...profile })
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          setUser({ ...session.user, ...profile })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (isDemoMode) {
      // Demo login
      if (email === 'demo@systock.com' && password === 'demo123') {
        setUser({
          id: 'demo-user-id',
          email: 'demo@systock.com',
          name: 'Usuário Demo',
          role: 'admin'
        })
        return { user: { email: 'demo@systock.com' } }
      } else {
        throw new Error('Use demo@systock.com / demo123 para demonstração')
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  }

  const signUp = async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
    
    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            ...userData,
          }
        ])
      
      if (profileError) throw profileError
    }
    
    return data
  }

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}