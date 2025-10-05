'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import DataVisualization from '@/components/admin/DataVisualization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FaUsers, 
  FaUniversity, 
  FaNewspaper, 
  FaHandshake,
  FaGraduationCap,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaSync
} from 'react-icons/fa';

interface DashboardData {
  totalLeads: number;
  totalUniversities: number;
  totalSuccessStories: number;
  totalUpdates: number;
  totalB2BLeads: number;
  totalUsers: number;
  totalDestinations: number;
  recentLeads: number;
  recentB2BLeads: number;
  recentLeadsList: any[];
  recentUniversities: any[];
  recentUpdates: any[];
  recentSuccessStories: any[];
  analytics: {
    leadStatusDistribution: any[];
    universityCountryDistribution: any[];
    updateTypeDistribution: any[];
    b2bLeadStats: any[];
    successStoryStats: any[];
    userRoleStats: any[];
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
  lastUpdated: string;
  dataSource: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalLeads: 0,
    totalUniversities: 0,
    totalSuccessStories: 0,
    totalUpdates: 0,
    totalB2BLeads: 0,
    totalUsers: 0,
    totalDestinations: 0,
    recentLeads: 0,
    recentB2BLeads: 0,
    recentLeadsList: [],
    recentUniversities: [],
    recentUpdates: [],
    recentSuccessStories: [],
    analytics: {
      leadStatusDistribution: [],
      universityCountryDistribution: [],
      updateTypeDistribution: [],
      b2bLeadStats: [],
      successStoryStats: [],
      userRoleStats: [],
      conversionRate: 0,
      contactRate: 0,
      totalB2BValue: 0,
      leadsGrowth: '0',
      b2bGrowth: '0',
      dataHealth: {
        hasLeads: false,
        hasUniversities: false,
        hasUpdates: false,
        hasUsers: false,
        hasB2BLeads: false,
        hasSuccessStories: false,
        hasDestinations: false
      }
    },
    lastUpdated: '',
    dataSource: 'mock'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setDashboardData(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data if API fails
        setDashboardData({
          totalLeads: 10,
          totalUniversities: 2,
          totalSuccessStories: 0,
          totalUpdates: 6,
          totalB2BLeads: 0,
          totalUsers: 2,
          totalDestinations: 0,
          recentLeads: 0,
          recentB2BLeads: 0,
          recentLeadsList: [],
          recentUniversities: [],
          recentUpdates: [],
          recentSuccessStories: [],
          analytics: {
            leadStatusDistribution: [],
            universityCountryDistribution: [],
            updateTypeDistribution: [],
            b2bLeadStats: [],
            successStoryStats: [],
            userRoleStats: [],
            conversionRate: 0,
            contactRate: 0,
            totalB2BValue: 0,
            leadsGrowth: '0',
            b2bGrowth: '0',
            dataHealth: {
              hasLeads: true,
              hasUniversities: true,
              hasUpdates: true,
              hasUsers: true,
              hasB2BLeads: false,
              hasSuccessStories: false,
              hasDestinations: false
            }
          },
          lastUpdated: new Date().toISOString(),
          dataSource: 'fallback'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <ProtectedRoute requiredPermission="dashboard:read">
      <AdminLayout>
        <div className="space-y-4 lg:space-y-8">
          {/* Welcome Section - Mobile Responsive */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.firstName || 'Admin'}! 👋
                </h1>
                <p className="text-sm lg:text-base text-gray-600">
                  Here's what's happening with your platform today.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2 w-full lg:w-auto"
              >
                <FaSync className="h-4 w-4" />
                <span>Refresh Data</span>
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards - Mobile Responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Total Leads</CardTitle>
                <FaUsers className="h-3 w-3 lg:h-4 lg:w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold text-gray-900">
                  {loading ? '...' : dashboardData.totalLeads.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <FaArrowUp className="h-2 w-2 lg:h-3 lg:w-3 mr-1" />
                  <span className="hidden sm:inline">{dashboardData.analytics.leadsGrowth} this week</span>
                  <span className="sm:hidden">+{dashboardData.analytics.leadsGrowth}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Universities</CardTitle>
                <FaUniversity className="h-3 w-3 lg:h-4 lg:w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold text-gray-900">
                  {loading ? '...' : dashboardData.totalUniversities.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <FaEye className="h-2 w-2 lg:h-3 lg:w-3 mr-1" />
                  <span className="hidden sm:inline">Partner institutions</span>
                  <span className="sm:hidden">Partners</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">B2B Leads</CardTitle>
                <FaHandshake className="h-3 w-3 lg:h-4 lg:w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold text-gray-900">
                  {loading ? '...' : dashboardData.totalB2BLeads.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <FaArrowUp className="h-2 w-2 lg:h-3 lg:w-3 mr-1" />
                  <span className="hidden sm:inline">{dashboardData.analytics.b2bGrowth} this week</span>
                  <span className="sm:hidden">+{dashboardData.analytics.b2bGrowth}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs lg:text-sm font-medium text-gray-600">Success Stories</CardTitle>
                <FaGraduationCap className="h-3 w-3 lg:h-4 lg:w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg lg:text-2xl font-bold text-gray-900">
                  {loading ? '...' : dashboardData.totalSuccessStories.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <FaEye className="h-2 w-2 lg:h-3 lg:w-3 mr-1" />
                  <span className="hidden sm:inline">Student achievements</span>
                  <span className="sm:hidden">Stories</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section - Mobile Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <FaEye className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                  <span>Data Analytics & Visualization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataVisualization analytics={dashboardData.analytics} />
              </CardContent>
            </Card>

            <div className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Conversion Rate</span>
                    <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                      {dashboardData.analytics.conversionRate}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Contact Rate</span>
                    <Badge variant="default" className="bg-blue-100 text-blue-800 text-xs">
                      {dashboardData.analytics.contactRate}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">B2B Value</span>
                    <Badge variant="default" className="bg-purple-100 text-purple-800 text-xs">
                      ${dashboardData.analytics.totalB2BValue.toLocaleString()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 lg:space-y-3">
                  {Object.entries(dashboardData.analytics.dataHealth).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-xs lg:text-sm text-gray-600 capitalize">
                        {key.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <Badge variant={value ? "default" : "destructive"} className="text-xs">
                        {value ? "Healthy" : "Empty"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity - Mobile Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <FaUsers className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                  <span>Recent Leads</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-3 lg:h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-2 lg:h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : dashboardData.recentLeadsList.length > 0 ? (
                  <div className="space-y-2 lg:space-y-3">
                    {dashboardData.recentLeadsList.slice(0, 5).map((lead, index) => (
                      <div key={index} className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{lead.name || 'Anonymous'}</p>
                          <p className="text-xs lg:text-sm text-gray-600 truncate">{lead.email}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">{lead.status || 'New'}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4 text-sm">No recent leads</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <FaUniversity className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                  <span>Recent Universities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-3 lg:h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-2 lg:h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : dashboardData.recentUniversities.length > 0 ? (
                  <div className="space-y-2 lg:space-y-3">
                    {dashboardData.recentUniversities.slice(0, 5).map((university, index) => (
                      <div key={index} className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{university.name}</p>
                          <p className="text-xs lg:text-sm text-gray-600 truncate">{university.country}</p>
                        </div>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">{university.type || 'University'}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4 text-sm">No recent universities</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Data Source Info - Mobile Responsive */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2 text-sm lg:text-base">Data Information</h3>
                  <p className="text-xs lg:text-sm text-blue-700">
                    <strong>Source:</strong> {dashboardData.dataSource} • 
                    <strong> Last Updated:</strong> {dashboardData.lastUpdated}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="text-blue-600 border-blue-200 hover:bg-blue-100 w-full lg:w-auto"
                >
                  <FaSync className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
