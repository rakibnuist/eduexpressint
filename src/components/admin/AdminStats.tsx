'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FaUsers, 
  FaUserShield, 
  FaUserCog, 
  FaUserCheck,
  FaUserTimes
} from 'react-icons/fa';

interface AdminStatsProps {
  admins: Array<{
    _id?: string;
    role: 'superuser' | 'operator';
    isActive: boolean;
    permissions: {
      canManageLeads: boolean;
      canManageUniversities: boolean;
      canManageB2BLeads: boolean;
      canManageUpdates: boolean;
      canManageAdmins: boolean;
    };
  }>;
  loading?: boolean;
}

export default function AdminStats({ admins, loading }: AdminStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalAdmins = admins.length;
  const superUsers = admins.filter(admin => admin.role === 'superuser').length;
  const operators = admins.filter(admin => admin.role === 'operator').length;
  const activeAdmins = admins.filter(admin => admin.isActive).length;
  const inactiveAdmins = totalAdmins - activeAdmins;

  const stats = [
    {
      title: 'Total Admins',
      value: totalAdmins,
      icon: FaUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Super Users',
      value: superUsers,
      icon: FaUserShield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Operators',
      value: operators,
      icon: FaUserCog,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active',
      value: activeAdmins,
      icon: FaUserCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permission Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FaUserShield className="h-5 w-5" />
            <span>Permission Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'canManageLeads', label: 'Leads Management', icon: '👥' },
              { key: 'canManageUniversities', label: 'Universities', icon: '🏫' },
              { key: 'canManageB2BLeads', label: 'B2B Leads', icon: '🤝' },
              { key: 'canManageUpdates', label: 'Updates', icon: '📰' },
              { key: 'canManageAdmins', label: 'Admin Management', icon: '👨‍💼' },
            ].map((permission) => {
              const count = admins.filter(admin => 
                admin.permissions[permission.key as keyof typeof admin.permissions]
              ).length;
              
              return (
                <div key={permission.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{permission.icon}</span>
                    <span className="font-medium">{permission.label}</span>
                  </div>
                  <Badge variant="outline">
                    {count} / {totalAdmins}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Status Overview */}
      {inactiveAdmins > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FaUserTimes className="h-5 w-5 text-red-600" />
              <span>Inactive Admins</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">{inactiveAdmins}</Badge>
              <span className="text-sm text-gray-600">
                admin{inactiveAdmins !== 1 ? 's' : ''} currently inactive
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
