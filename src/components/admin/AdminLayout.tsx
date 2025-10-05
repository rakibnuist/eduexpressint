'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

interface AdminLayoutProps {
  children: ReactNode;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
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
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  // Auto-hide sidebar when navigating to different pages
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        // Redirect to login if not authenticated
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      // Clear any admin tokens from localStorage
      localStorage.removeItem('adminToken');
      // Redirect to homepage instead of admin login
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to homepage
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-ping"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Admin Panel</h3>
          <p className="text-gray-600">Please wait while we prepare your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar 
        user={user} 
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Navigation */}
        <AdminTopBar 
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        
        {/* Page Content */}
        <main className="p-6 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
