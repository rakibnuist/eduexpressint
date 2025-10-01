'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SimpleChart from './SimpleChart';

interface DataVisualizationProps {
  analytics: {
    leadStatusDistribution: Array<{ _id: string; count: number }>;
    universityCountryDistribution: Array<{ _id: string; count: number }>;
    updateTypeDistribution: Array<{ _id: string; count: number }>;
    b2bLeadStats: Array<{ _id: string; count: number; totalValue?: number }>;
    successStoryStats: Array<{ _id: string; count: number; featured?: number }>;
    userRoleStats: Array<{ _id: string; count: number; active?: number }>;
    conversionRate: number;
    contactRate: number;
    totalB2BValue: number;
    leadsGrowth: string;
    b2bGrowth: string;
    dataHealth: {
      hasLeads: boolean;
      hasUniversities: boolean;
      hasUpdates: boolean;
      hasUsers: boolean;
      hasB2BLeads: boolean;
      hasSuccessStories: boolean;
      hasDestinations: boolean;
    };
  };
}

export default function DataVisualization({ analytics }: DataVisualizationProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-500',
      'contacted': 'bg-yellow-500',
      'qualified': 'bg-green-500',
      'converted': 'bg-emerald-500',
      'rejected': 'bg-red-500',
      'news': 'bg-purple-500',
      'announcement': 'bg-indigo-500',
      'superuser': 'bg-orange-500',
      'operator': 'bg-teal-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getHealthColor = (isHealthy: boolean) => {
    return isHealthy ? 'text-green-600' : 'text-red-600';
  };

  const getHealthIcon = (isHealthy: boolean) => {
    return isHealthy ? '✓' : '✗';
  };

  return (
    <div className="space-y-6">
      {/* Lead Status Distribution */}
      <SimpleChart
        title="Lead Status Distribution"
        data={analytics.leadStatusDistribution}
        type="bar"
        showPercentage={true}
        showValue={true}
      />

      {/* University Country Distribution */}
      <SimpleChart
        title="Universities by Country"
        data={analytics.universityCountryDistribution}
        type="line"
        showPercentage={true}
        showValue={true}
      />

      {/* Update Type Distribution */}
      <SimpleChart
        title="Content Distribution"
        data={analytics.updateTypeDistribution}
        type="pie"
        showPercentage={true}
        showValue={true}
      />

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">{analytics.conversionRate}%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
                <p className="text-sm text-gray-600">Lead to conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Contact Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">{analytics.contactRate}%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.contactRate}%</p>
                <p className="text-sm text-gray-600">Leads contacted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">B2B Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">${analytics.totalB2BValue.toLocaleString()}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${analytics.totalB2BValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Health Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            Data Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analytics.dataHealth).map(([key, isHealthy]) => (
              <div key={key} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <span className={`text-lg font-bold ${getHealthColor(isHealthy)}`}>
                  {getHealthIcon(isHealthy)}
                </span>
                <span className="text-sm font-medium capitalize">
                  {key.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Role Distribution */}
      {analytics.userRoleStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              User Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.userRoleStats.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item._id)}`}></div>
                    <span className="font-medium capitalize">{item._id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.count} users</Badge>
                    {item.active !== undefined && (
                      <Badge className="bg-green-100 text-green-800">
                        {item.active} active
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
