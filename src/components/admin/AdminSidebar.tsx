'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaUsers, 
  FaUniversity, 
  FaNewspaper, 
  FaHandshake,
  FaHome,
  FaUserShield,
  FaGraduationCap,
  FaSync,
  FaTimes,
  FaChartLine,
  FaFileAlt
} from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  badge?: number;
  permission?: string;
  description?: string;
}

interface AdminSidebarProps {
  user: any;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ user, onLogout, isOpen = false, onClose }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { hasPermission } = useAuth();

  // Auto-hide sidebar when navigating to different pages
  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [pathname, onClose]);

  const navigationItems: SidebarItem[] = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: FaHome,
      description: 'Overview and analytics'
    },
    { 
      name: 'Leads', 
      href: '/admin/leads', 
      icon: FaUsers, 
      permission: 'leads:read',
      description: 'Student inquiries'
    },
    { 
      name: 'Universities', 
      href: '/admin/universities', 
      icon: FaUniversity, 
      permission: 'universities:read',
      description: 'Partner institutions'
    },
    { 
      name: 'Success Stories', 
      href: '/admin/success-stories', 
      icon: FaGraduationCap, 
      permission: 'successStories:read',
      description: 'Student achievements'
    },
    { 
      name: 'Updates', 
      href: '/admin/updates', 
      icon: FaNewspaper, 
      permission: 'updates:read',
      description: 'News and announcements'
    },
    { 
      name: 'Content', 
      href: '/admin/content', 
      icon: FaFileAlt, 
      permission: 'content:read',
      description: 'Landing pages & content'
    },
    { 
      name: 'B2B Leads', 
      href: '/admin/b2b-leads', 
      icon: FaHandshake, 
      permission: 'b2b:read',
      description: 'Business partnerships'
    },
    { 
      name: 'Data Sync', 
      href: '/admin/sync', 
      icon: FaSync, 
      permission: 'sync:manage',
      description: 'Database synchronization'
    },
    // Admin Users - only show to superusers
    ...(user?.role === 'superuser' ? [{ 
      name: 'Admin Users', 
      href: '/admin/admins', 
      icon: FaUserShield,
      description: 'User management'
    }] : []),
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <FaChartLine className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">EduExpress</h1>
                <p className="text-xs text-blue-100">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden text-white hover:bg-white/20 p-2"
            >
              <FaTimes className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              // Check if user has permission to see this item
              if (item.permission && !hasPermission(item.permission)) {
                return null;
              }

              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`
                    w-full justify-start h-auto p-3 rounded-lg transition-all duration-200 group
                    ${active 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={() => handleNavigation(item.href)}
                >
                  <div className="flex items-center w-full">
                    <div className={`
                      p-2 rounded-lg mr-3 transition-colors
                      ${active 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-600'
                      }
                    `}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      )}
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.firstName?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <Badge 
                  variant={user?.role === 'superuser' ? 'default' : 'secondary'} 
                  className="text-xs mt-1"
                >
                  {user?.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
