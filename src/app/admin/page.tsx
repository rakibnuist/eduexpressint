'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
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
  FaRefresh
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
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName} {user?.lastName}
                </span>
                <button
                  onClick={() => {
                    // Simple logout - redirect to login
                    window.location.href = '/admin/login';
                  }}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName || 'Admin'}!</p>
            </div>

            <DashboardStats 
              stats={dashboardData}
              loading={loading}
            />

            {/* Data Visualization */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Data Analytics & Visualization</h2>
              <DataVisualization analytics={dashboardData.analytics} />
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Analytics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversion Rate:</span>
                    <span className="font-semibold text-green-600">{dashboardData.analytics.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Contact Rate:</span>
                    <span className="font-semibold text-blue-600">{dashboardData.analytics.contactRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Week:</span>
                    <span className="font-semibold text-purple-600">{dashboardData.analytics.leadsGrowth}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">B2B Pipeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Value:</span>
                    <span className="font-semibold text-green-600">${dashboardData.analytics.totalB2BValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Leads:</span>
                    <span className="font-semibold text-blue-600">{dashboardData.totalB2BLeads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Week:</span>
                    <span className="font-semibold text-purple-600">{dashboardData.analytics.b2bGrowth}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Leads:</span>
                    <span className={`font-semibold ${dashboardData.analytics.dataHealth.hasLeads ? 'text-green-600' : 'text-red-600'}`}>
                      {dashboardData.analytics.dataHealth.hasLeads ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Universities:</span>
                    <span className={`font-semibold ${dashboardData.analytics.dataHealth.hasUniversities ? 'text-green-600' : 'text-red-600'}`}>
                      {dashboardData.analytics.dataHealth.hasUniversities ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Updates:</span>
                    <span className={`font-semibold ${dashboardData.analytics.dataHealth.hasUpdates ? 'text-green-600' : 'text-red-600'}`}>
                      {dashboardData.analytics.dataHealth.hasUpdates ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
                <div className="space-y-3">
                  {dashboardData.recentLeadsList.length > 0 ? (
                    dashboardData.recentLeadsList.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.email}</p>
                          {lead.country && <p className="text-xs text-gray-500">{lead.country}</p>}
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                          lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                          lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent leads</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Universities</h3>
                <div className="space-y-3">
                  {dashboardData.recentUniversities.length > 0 ? (
                    dashboardData.recentUniversities.map((university) => (
                      <div key={university.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{university.name}</p>
                          <p className="text-sm text-gray-600">{university.country}</p>
                          {university.city && <p className="text-xs text-gray-500">{university.city}</p>}
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          university.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {university.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No universities available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Recent Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
                <div className="space-y-3">
                  {dashboardData.recentUpdates.length > 0 ? (
                    dashboardData.recentUpdates.map((update) => (
                      <div key={update.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{update.title}</p>
                          <p className="text-sm text-gray-600 capitalize">{update.type}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          update.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {update.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent updates</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Stories</h3>
                <div className="space-y-3">
                  {dashboardData.recentSuccessStories.length > 0 ? (
                    dashboardData.recentSuccessStories.map((story) => (
                      <div key={story.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{story.studentName}</p>
                          <p className="text-sm text-gray-600">{story.university}</p>
                          <p className="text-xs text-gray-500">{story.universityCountry}</p>
                        </div>
                        {story.isFeatured && (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No success stories yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Data Source Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Data Source:</strong> {dashboardData.dataSource === 'database' ? 'Live Database' : 'Fallback Data'}
                  </p>
                  <p className="text-xs text-blue-600">
                    Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
