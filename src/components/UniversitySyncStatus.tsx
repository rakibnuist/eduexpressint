'use client';

import { useState, useEffect } from 'react';
import { 
  FaSync, 
  FaCloud, 
  FaDatabase, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaSpinner,
  FaDownload,
  FaRedo
} from 'react-icons/fa';
import { universitySyncService, type UniversitySyncStatus } from '@/lib/universitySync';

interface UniversitySyncStatusProps {
  showControls?: boolean;
  onSyncComplete?: (result: { success: boolean; message: string; data?: unknown }) => void;
  className?: string;
  compact?: boolean;
}

export default function UniversitySyncStatus({ 
  showControls = true, 
  onSyncComplete,
  className = '',
  compact = false
}: UniversitySyncStatusProps) {
  const [syncStatus, setSyncStatus] = useState<UniversitySyncStatus | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check sync status on mount
  useEffect(() => {
    checkSyncStatus();
  }, []);

  const checkSyncStatus = async () => {
    try {
      setLoading(true);
      const status = await universitySyncService.checkSyncStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Error checking university sync status:', error);
      // Set a default status to indicate error
      setSyncStatus({
        lastSync: null,
        totalUniversities: 0,
        universitiesToSync: 0,
        syncRequired: true,
        lastModified: null
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForceSync = async () => {
    try {
      setSyncing(true);
      const result = await universitySyncService.forceSync();
      setSyncStatus(prev => prev ? { ...prev, syncRequired: false, universitiesToSync: 0 } : null);
      
      if (onSyncComplete) {
        onSyncComplete(result);
      }
    } catch (error) {
      console.error('Error syncing universities:', error);
      // Refresh sync status after error
      checkSyncStatus();
    } finally {
      setSyncing(false);
    }
  };

  const handleExternalSync = async () => {
    try {
      setSyncing(true);
      const result = await universitySyncService.syncFromExternal();
      setSyncStatus(prev => prev ? { ...prev, syncRequired: false, universitiesToSync: 0 } : null);
      
      if (onSyncComplete) {
        onSyncComplete(result);
      }
    } catch (error) {
      console.error('Error syncing from external source:', error);
      // Refresh sync status after error
      checkSyncStatus();
    } finally {
      setSyncing(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setSyncing(true);
      const result = await universitySyncService.forceSync();
      setSyncStatus(prev => prev ? { ...prev, syncRequired: false, universitiesToSync: 0 } : null);
      
      if (onSyncComplete) {
        onSyncComplete(result);
      }
    } catch (error) {
      console.error('Error refreshing universities:', error);
      checkSyncStatus();
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
        <FaSpinner className="w-4 h-4 animate-spin" />
        <span className="text-sm">Checking sync status...</span>
      </div>
    );
  }

  if (!syncStatus) {
    return (
      <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
        <FaDatabase className="w-4 h-4" />
        <span className="text-sm">Sync status unavailable</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div className="flex items-center space-x-2">
          <FaDatabase className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {syncStatus.totalUniversities} Universities
          </span>
          {syncStatus.syncRequired && (
            <FaExclamationTriangle className="w-3 h-3 text-orange-500" />
          )}
        </div>
        
        {showControls && (
          <div className="flex items-center space-x-1">
            <button
              onClick={checkSyncStatus}
              disabled={loading}
              className="p-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
              title="Check Status"
            >
              <FaRedo className="w-3 h-3" />
            </button>
            <button
              onClick={handleForceSync}
              disabled={syncing}
              className="p-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors duration-200 disabled:opacity-50"
              title="Sync Universities"
            >
              <FaSync className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">University Data Sync</h3>
        <div className="flex items-center space-x-2">
          <FaDatabase className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">Database</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Total Universities</div>
            <div className="text-2xl font-bold text-gray-900">{syncStatus.totalUniversities}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Pending Sync</div>
            <div className="text-2xl font-bold text-orange-600">{syncStatus.universitiesToSync}</div>
          </div>
        </div>

        {/* Sync Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {syncStatus.syncRequired ? (
              <>
                <FaExclamationTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-600">
                  {syncStatus.universitiesToSync} universities need sync
                </span>
              </>
            ) : (
              <>
                <FaCheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">All universities up to date</span>
              </>
            )}
          </div>
          
          {syncStatus.lastSync && (
            <span className="text-xs text-gray-500">
              Last sync: {new Date(syncStatus.lastSync).toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Sync Controls */}
        {showControls && (
          <div className="flex items-center space-x-2 pt-2 border-t">
            <button
              onClick={checkSyncStatus}
              disabled={loading}
              className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <FaRedo className="w-3 h-3" />
              <span>Check Status</span>
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={syncing}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <FaRedo className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            
            <button
              onClick={handleForceSync}
              disabled={syncing}
              className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <FaSync className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
              <span>Sync All</span>
            </button>
            
            <button
              onClick={handleExternalSync}
              disabled={syncing}
              className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <FaDownload className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
              <span>External Sync</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
