import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/auth';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  hasPermission: (requiredRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const supabaseUser = await authService.getCurrentUser();
        if (supabaseUser) {
          const profile = await authService.getUserProfile(supabaseUser.id);
          setUser(profile);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await authService.getUserProfile(session.user.id);
          setUser(profile);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await authService.signIn(email, password);
    if (result.data.user && !result.error) {
      const profile = await authService.getUserProfile(result.data.user.id);
      setUser(profile);
    }
    setLoading(false);
    return result;
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    const result = await authService.signUp(email, password, fullName);
    if (result.data.user && !result.error) {
      await authService.createUserProfile(result.data.user);
      const profile = await authService.getUserProfile(result.data.user.id);
      setUser(profile);
    }
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await authService.signOut();
    setUser(null);
    setLoading(false);
    return result;
  };

  const hasPermission = (requiredRoles: string[]): boolean => {
    if (!user) return false;
    return authService.hasPermission(user.role, requiredRoles);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};