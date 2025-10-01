'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'superuser' | 'operator';
  firstName: string;
  lastName: string;
  isActive: boolean;
  permissions: {
    canManageLeads: boolean;
    canManageUniversities: boolean;
    canManageB2BLeads: boolean;
    canManageUpdates: boolean;
    canManageAdmins: boolean;
    canManageSuccessStories: boolean;
  };
  lastLogin?: Date;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  isSuperUser: () => boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if we have a token in localStorage
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setUser(null);
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        // Store token in localStorage for API calls
        localStorage.setItem('adminToken', 'authenticated');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user || !user.isActive) return false;
    
    // Superusers have all permissions
    if (user.role === 'superuser') return true;
    
    // Check specific permissions for operators
    switch (permission) {
      case 'leads:read':
      case 'leads:write':
      case 'leads:update':
      case 'leads:delete':
        return user.permissions?.canManageLeads || false;
      
      case 'universities:read':
      case 'universities:write':
      case 'universities:update':
      case 'universities:delete':
        return user.permissions?.canManageUniversities || false;
      
      case 'b2b:read':
      case 'b2b:write':
      case 'b2b:update':
      case 'b2b:delete':
        return user.permissions?.canManageB2BLeads || false;
      
      case 'updates:read':
      case 'updates:write':
      case 'updates:update':
      case 'updates:delete':
        return user.permissions?.canManageUpdates || false;
      
      case 'admins:read':
      case 'admins:write':
      case 'admins:update':
      case 'admins:delete':
        return user.permissions?.canManageAdmins || false;
      
      case 'successStories:read':
      case 'successStories:write':
      case 'successStories:update':
      case 'successStories:delete':
        return user.permissions?.canManageSuccessStories || false;
      
      default:
        return false;
    }
  };

  const isSuperUser = (): boolean => {
    return user?.role === 'superuser' && user?.isActive === true;
  };

  const refreshUser = async (): Promise<void> => {
    await checkAuthStatus();
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isSuperUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
