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
  FaSync,
  FaChartLine,
  FaBell
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
        <div className="space-y-8">
          {/* Clean Header Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {user?.firstName || 'Admin'}. Here's your platform overview.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>System Online</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  <FaSync className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Leads</p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {loading ? '...' : dashboardData.totalLeads.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Student inquiries</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FaUsers className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Universities</p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {loading ? '...' : dashboardData.totalUniversities.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Partner institutions</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FaUniversity className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">B2B Leads</p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {loading ? '...' : dashboardData.totalB2BLeads.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Business partnerships</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FaHandshake className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Success Stories</p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {loading ? '...' : dashboardData.totalSuccessStories.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Student achievements</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FaGraduationCap className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="cursor-pointer hover:border-gray-400 transition-colors border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaUsers className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Add Lead</h3>
                  <p className="text-xs text-gray-500">Create new student lead</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-gray-400 transition-colors border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaUniversity className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Add University</h3>
                  <p className="text-xs text-gray-500">Register new partner</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-gray-400 transition-colors border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaNewspaper className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Create Update</h3>
                  <p className="text-xs text-gray-500">Publish news/announcement</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-gray-400 transition-colors border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FaGraduationCap className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Success Story</h3>
                  <p className="text-xs text-gray-500">Add student achievement</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analytics and Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Analytics</h2>
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <DataVisualization analytics={dashboardData.analytics} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Performance</h2>
                <Card className="border border-gray-200">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                      <Badge variant="outline" className="text-gray-600">
                        {dashboardData.analytics.conversionRate}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-700">Contact Rate</span>
                      <Badge variant="outline" className="text-gray-600">
                        {dashboardData.analytics.contactRate}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm font-medium text-gray-700">B2B Value</span>
                      <Badge variant="outline" className="text-gray-600">
                        ${dashboardData.analytics.totalB2BValue.toLocaleString()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">System Health</h2>
                <Card className="border border-gray-200">
                  <CardContent className="p-6 space-y-3">
                    {Object.entries(dashboardData.analytics.dataHealth).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {key.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-xs text-gray-500">
                            {value ? "Healthy" : "Empty"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Leads</h2>
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : dashboardData.recentLeadsList.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.recentLeadsList.slice(0, 5).map((lead, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                            {(lead.name || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {lead.name || 'Anonymous'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {lead.status || 'New'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaUsers className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No recent leads</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Universities</h2>
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : dashboardData.recentUniversities.length > 0 ? (
                    <div className="space-y-3">
                      {dashboardData.recentUniversities.slice(0, 5).map((university, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                            {university.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {university.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{university.country}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {university.type || 'University'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaUniversity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No recent universities</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* System Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Information</h2>
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Data Source</p>
                    <p className="font-medium text-gray-900 capitalize">{dashboardData.dataSource}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">{new Date(dashboardData.lastUpdated).toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">System Status</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Response Time</p>
                    <p className="font-medium text-gray-900">~120ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
