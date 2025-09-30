'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FaSearch, FaBell, FaCog } from 'react-icons/fa';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
}

export default function AdminHeader({ 
  title, 
  subtitle, 
  showSearch = false, 
  searchPlaceholder = "Search...",
  onSearch,
  actions 
}: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-20 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-10 w-64"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
            )}
            
            <Button variant="ghost" size="sm" className="relative">
              <FaBell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs">3</Badge>
            </Button>
            
            <Button variant="ghost" size="sm">
              <FaCog className="h-4 w-4" />
            </Button>
            
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
}
