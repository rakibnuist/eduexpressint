'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FaUsers, 
  FaUniversity, 
  FaNewspaper, 
  FaHandshake,
  FaPlus,
  FaGraduationCap
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface DashboardStatsProps {
  stats: {
    totalLeads: number;
    totalUniversities: number;
    totalUpdates: number;
    totalB2BLeads: number;
    totalSuccessStories: number;
    recentLeads: number;
    recentB2BLeads: number;
  };
  loading?: boolean;
}

export default function DashboardStats({ stats, loading = false }: DashboardStatsProps) {
  const router = useRouter();

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      recent: stats.recentLeads,
      icon: FaUsers,
      color: 'bg-blue-500',
      href: '/admin/leads',
      action: 'Manage Leads'
    },
    {
      title: 'Universities',
      value: stats.totalUniversities,
      icon: FaUniversity,
      color: 'bg-green-500',
      href: '/admin/universities',
      action: 'Manage Universities'
    },
    {
      title: 'Updates',
      value: stats.totalUpdates,
      icon: FaNewspaper,
      color: 'bg-purple-500',
      href: '/admin/updates',
      action: 'Create Update'
    },
    {
      title: 'B2B Leads',
      value: stats.totalB2BLeads,
      recent: stats.recentB2BLeads,
      icon: FaHandshake,
      color: 'bg-orange-500',
      href: '/admin/b2b-leads',
      action: 'B2B Partnerships'
    },
    {
      title: 'Success Stories',
      value: stats.totalSuccessStories,
      icon: FaGraduationCap,
      color: 'bg-indigo-500',
      href: '/admin/success-stories',
      action: 'Manage Stories'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => router.push(stat.href)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color} text-white group-hover:scale-110 transition-transform`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : (stat.value ?? 0).toLocaleString()}
              </div>
              {stat.recent !== undefined && (
                <p className="text-xs text-green-600 mt-1">
                  +{stat.recent} this week
                </p>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-8 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(stat.href);
                }}
              >
                <FaPlus className="h-3 w-3 mr-1" />
                {stat.action}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
