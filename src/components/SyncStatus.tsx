'use client';

import { useState, useEffect } from 'react';
import { 
  FaSync, 
  FaCloud, 
  FaDatabase, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';
import { updateSyncService, type SyncStatus } from '@/lib/updateSync';

interface SyncStatusProps {
  showControls?: boolean;
  onSyncComplete?: (result: { success: boolean; message: string; data?: unknown }) => void;
  className?: string;
}

export default function SyncStatus({ 
  showControls = true, 
  onSyncComplete,
  className = '' 
}: SyncStatusProps) {
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check sync status on mount
  useEffect(() => {
    checkSyncStatus();
  }, []);

  const checkSyncStatus = async () => {
    try {
      setLoading(true);
      const status = await updateSyncService.checkSyncStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Error checking sync status:', error);
      // Set a default status to indicate error
      setSyncStatus({
        lastSync: null,
        totalUpdates: 0,
        updatesToSync: 0,
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
      const result = await updateSyncService.forceSync();
      setSyncStatus(prev => prev ? { ...prev, syncRequired: false, updatesToSync: 0 } : null);
      
      if (onSyncComplete) {
        onSyncComplete(result);
      }
    } catch (error) {
      console.error('Error syncing updates:', error);
      // Refresh sync status after error
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

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Data Source Indicator */}
        <div className="flex items-center space-x-2">
          <FaCloud className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            Cached Data
          </span>
        </div>
        
        {/* Sync Status */}
        {syncStatus.syncRequired ? (
          <div className="flex items-center space-x-2 text-orange-600">
            <FaExclamationTriangle className="w-4 h-4" />
            <span className="text-sm">
              {syncStatus.updatesToSync} updates available
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-green-600">
            <FaCheckCircle className="w-4 h-4" />
            <span className="text-sm">Up to date</span>
          </div>
        )}
        
        {/* Last Sync Time */}
        {syncStatus.lastSync && (
          <span className="text-xs text-gray-500">
            Last sync: {new Date(syncStatus.lastSync).toLocaleTimeString()}
          </span>
        )}
      </div>
      
      {/* Sync Controls */}
      {showControls && (
        <div className="flex items-center space-x-2">
          <button
            onClick={checkSyncStatus}
            disabled={loading}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
          >
            Check
          </button>
          <button
            onClick={handleForceSync}
            disabled={syncing}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-1"
          >
            <FaSync className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
