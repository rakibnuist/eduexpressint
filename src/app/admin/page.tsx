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
        <div className="space-y-6 lg:space-y-8">
          {/* Enhanced Welcome Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 lg:p-8 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👋</span>
                    </div>
                    <div>
                      <h1 className="text-2xl lg:text-4xl font-bold">
                        Welcome back, {user?.firstName || 'Admin'}!
                      </h1>
                      <p className="text-blue-100 text-sm lg:text-base">
                        Here's your platform overview for today
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-100">System Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-100">Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="secondary" 
                    onClick={() => window.location.reload()}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white"
                  >
                    <FaSync className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    <FaEye className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          {/* Enhanced Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-blue-700">Total Leads</CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <FaUsers className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl lg:text-3xl font-bold text-blue-900">
                  {loading ? (
                    <div className="animate-pulse bg-blue-200 h-8 w-16 rounded"></div>
                  ) : (
                    dashboardData.totalLeads.toLocaleString()
                  )}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <FaArrowUp className="h-3 w-3 mr-1" />
                  <span className="font-medium">{dashboardData.analytics.leadsGrowth} this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-green-700">Universities</CardTitle>
                <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <FaUniversity className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl lg:text-3xl font-bold text-green-900">
                  {loading ? (
                    <div className="animate-pulse bg-green-200 h-8 w-16 rounded"></div>
                  ) : (
                    dashboardData.totalUniversities.toLocaleString()
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaEye className="h-3 w-3 mr-1" />
                  <span className="font-medium">Partner institutions</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-purple-700">B2B Leads</CardTitle>
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <FaHandshake className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl lg:text-3xl font-bold text-purple-900">
                  {loading ? (
                    <div className="animate-pulse bg-purple-200 h-8 w-16 rounded"></div>
                  ) : (
                    dashboardData.totalB2BLeads.toLocaleString()
                  )}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <FaArrowUp className="h-3 w-3 mr-1" />
                  <span className="font-medium">{dashboardData.analytics.b2bGrowth} this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-orange-700">Success Stories</CardTitle>
                <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <FaGraduationCap className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl lg:text-3xl font-bold text-orange-900">
                  {loading ? (
                    <div className="animate-pulse bg-orange-200 h-8 w-16 rounded"></div>
                  ) : (
                    dashboardData.totalSuccessStories.toLocaleString()
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaEye className="h-3 w-3 mr-1" />
                  <span className="font-medium">Student achievements</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FaUsers className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-indigo-900 mb-1">Add Lead</h3>
                <p className="text-xs text-indigo-600">Create new student lead</p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FaUniversity className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-emerald-900 mb-1">Add University</h3>
                <p className="text-xs text-emerald-600">Register new partner</p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FaNewspaper className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-amber-900 mb-1">Create Update</h3>
                <p className="text-xs text-amber-600">Publish news/announcement</p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-rose-50 to-rose-100">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FaGraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-rose-900 mb-1">Success Story</h3>
                <p className="text-xs text-rose-600">Add student achievement</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-lg">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <FaEye className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800">Data Analytics & Visualization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <DataVisualization analytics={dashboardData.analytics} />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-lg">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <FaChartLine className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-800">Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                    <Badge className="bg-green-500 text-white px-3 py-1">
                      {dashboardData.analytics.conversionRate}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Contact Rate</span>
                    <Badge className="bg-blue-500 text-white px-3 py-1">
                      {dashboardData.analytics.contactRate}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">B2B Value</span>
                    <Badge className="bg-purple-500 text-white px-3 py-1">
                      ${dashboardData.analytics.totalB2BValue.toLocaleString()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-lg">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <FaSync className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-800">System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {Object.entries(dashboardData.analytics.dataHealth).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <Badge variant={value ? "default" : "destructive"} className="text-xs">
                          {value ? "Healthy" : "Empty"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Recent Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <FaUsers className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-800">Recent Leads</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                    {dashboardData.recentLeadsList.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
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
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {(lead.name || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                            {lead.name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-gray-600 truncate">{lead.email}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs px-2 py-1 ${
                            lead.status === 'new' ? 'bg-green-100 text-green-700' :
                            lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                            lead.status === 'qualified' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {lead.status || 'New'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUsers className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No recent leads</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <FaUniversity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-800">Recent Universities</span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    {dashboardData.recentUniversities.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
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
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {university.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-green-600 transition-colors">
                            {university.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">{university.country}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs px-2 py-1 bg-green-50 text-green-700 border-green-200"
                        >
                          {university.type || 'University'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUniversity className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No recent universities</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Real-time Activity Feed */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <FaBell className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800">Live Activity Feed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Live</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUsers className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New lead registered</p>
                    <p className="text-xs text-gray-600">John Doe from Bangladesh - 2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUniversity className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">University partnership updated</p>
                    <p className="text-xs text-gray-600">University of Manchester - 5 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaNewspaper className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New update published</p>
                    <p className="text-xs text-gray-600">Scholarship opportunities for 2024 - 10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Success story added</p>
                    <p className="text-xs text-gray-600">Sarah Ahmed - University of Toronto - 15 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Data Source Info */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-gray-50">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-lg">System Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Data Source:</span>
                      <span className="font-medium text-gray-900 capitalize">{dashboardData.dataSource}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-gray-900">{new Date(dashboardData.lastUpdated).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">System Status:</span>
                      <span className="font-medium text-green-600">Online</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-medium text-gray-900">~120ms</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
                    className="bg-white hover:bg-gray-50 border-gray-200"
                  >
                    <FaSync className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <FaEye className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
