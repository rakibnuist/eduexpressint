'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaUsers, 
  FaUniversity, 
  FaNewspaper, 
  FaHandshake,
  FaSignOutAlt,
  FaHome,
  FaChartLine,
  FaUserShield,
  FaGraduationCap
} from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  badge?: number;
  permission?: string;
}

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, hasPermission } = useAuth();

  const navigationItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/admin', icon: FaHome },
    { name: 'Leads', href: '/admin/leads', icon: FaUsers, permission: 'leads:read' },
    { name: 'Universities', href: '/admin/universities', icon: FaUniversity, permission: 'universities:read' },
    { name: 'Success Stories', href: '/admin/success-stories', icon: FaGraduationCap, permission: 'successStories:read' },
    { name: 'Updates', href: '/admin/updates', icon: FaNewspaper, permission: 'updates:read' },
    { name: 'B2B Leads', href: '/admin/b2b-leads', icon: FaHandshake, permission: 'b2b:read' },
    // Admin Users - only show to superusers (no permission check needed since page handles it)
    ...(user?.role === 'superuser' ? [{ name: 'Admin Users', href: '/admin/admins', icon: FaUserShield }] : []),
    // Debug page - only show to superusers for troubleshooting
    ...(user?.role === 'superuser' ? [{ name: 'Debug Info', href: '/admin/debug', icon: FaChartLine }] : []),
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          // Check if user has permission to see this item
          if (item.permission && !hasPermission(item.permission)) {
            return null;
          }

          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={isActive(item.href) ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive(item.href) 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => router.push(item.href)}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.name}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.firstName?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <Badge variant={user?.role === 'superuser' ? 'default' : 'secondary'} className="text-xs">
              {user?.role}
            </Badge>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full justify-start text-gray-700 hover:bg-gray-100"
        >
          <FaSignOutAlt className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
