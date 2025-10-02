'use client';

import React from 'react';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import UniversitySyncStatus from '@/components/UniversitySyncStatus';
import SyncStatus from '@/components/SyncStatus';
import { useState } from 'react';
import { FaSync, FaDatabase, FaCloud, FaCheckCircle } from 'react-icons/fa';

export default function AdminSync() {
  const { user } = useAuth();
  const [syncResults, setSyncResults] = useState<Array<{ type: string; success: boolean; message: string; timestamp: string }>>([]);

  const handleSyncComplete = (type: string, result: { success: boolean; message: string; data?: unknown }) => {
    setSyncResults(prev => [{
      type,
      success: result.success,
      message: result.message,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 9)]); // Keep only last 10 results
  };

  return (
    <ProtectedRoute requiredPermission="sync:manage">
      <div className="min-h-screen bg-gray-50">
        <AdminHeader 
          title="Data Synchronization"
          subtitle="Sync data from external sources and manage database updates"
        />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* University Sync */}
                <UniversitySyncStatus 
                  onSyncComplete={(result) => handleSyncComplete('Universities', result)}
                  className="h-fit"
                />

                {/* Updates Sync */}
                <div className="bg-white rounded-lg border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Updates Sync</h3>
                    <div className="flex items-center space-x-2">
                      <FaDatabase className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">Database</span>
                    </div>
                  </div>
                  <SyncStatus 
                    onSyncComplete={(result) => handleSyncComplete('Updates', result)}
                    showControls={true}
                  />
                </div>
              </div>

              {/* Sync History */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Sync Activity</h3>
                  <FaSync className="w-5 h-5 text-gray-400" />
                </div>
                
                {syncResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaCloud className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No sync activity yet</p>
                    <p className="text-sm">Use the sync controls above to start synchronizing data</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {syncResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {result.success ? (
                            <FaCheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                              <span className="text-white text-xs">!</span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{result.type} Sync</div>
                            <div className="text-sm text-gray-600">{result.message}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{result.timestamp}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sync Information */}
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">About Data Synchronization</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>University Sync:</strong> Synchronizes university data from external sources, including new universities, updated information, and program details.</p>
                  <p><strong>Updates Sync:</strong> Manages news, announcements, and updates from various sources.</p>
                  <p><strong>Automatic Sync:</strong> The system automatically checks for updates and notifies when sync is required.</p>
                  <p><strong>Manual Sync:</strong> Use the sync controls to manually trigger synchronization when needed.</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
