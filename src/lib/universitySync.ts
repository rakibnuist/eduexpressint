// University Sync Service
// Handles synchronization of university data with external sources

export interface UniversitySyncStatus {
  lastSync: string | null;
  totalUniversities: number;
  universitiesToSync: number;
  syncRequired: boolean;
  lastModified: string | null;
}

export interface UniversitySyncResult {
  success: boolean;
  universities: any[];
  syncedCount: number;
  syncTimestamp: string;
  message: string;
}

class UniversitySyncService {
  private readonly CACHE_KEY = 'universities_cache';
  private readonly SYNC_STATUS_KEY = 'universities_sync_status';

  // Check sync status
  async checkSyncStatus(): Promise<UniversitySyncStatus> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/admin/universities/sync', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const status: UniversitySyncStatus = {
          lastSync: data.data.stats.syncTimestamp,
          totalUniversities: data.data.stats.totalUniversities,
          universitiesToSync: data.data.stats.universitiesToSync,
          syncRequired: data.data.syncRequired,
          lastModified: data.data.stats.lastModified
        };

        // Cache the sync status
        this.cacheSyncStatus(status);
        return status;
      } else {
        throw new Error(data.error || 'Failed to check sync status');
      }
    } catch (error) {
      console.error('Error checking university sync status:', error);
      
      // Return cached status if available
      const cachedStatus = this.getCachedSyncStatus();
      if (cachedStatus) {
        return cachedStatus;
      }

      // Return default status
      return {
        lastSync: null,
        totalUniversities: 0,
        universitiesToSync: 0,
        syncRequired: true,
        lastModified: null
      };
    }
  }

  // Force sync universities
  async forceSync(): Promise<UniversitySyncResult> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/admin/universities/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ forceSync: true })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Cache the synced universities
        this.cacheUniversities(data.data.universities);
        
        // Update sync status
        this.updateSyncStatus({
          lastSync: data.data.syncTimestamp,
          totalUniversities: data.data.universities.length,
          universitiesToSync: 0,
          syncRequired: false,
          lastModified: data.data.syncTimestamp
        });

        return {
          success: true,
          universities: data.data.universities,
          syncedCount: data.data.syncedCount,
          syncTimestamp: data.data.syncTimestamp,
          message: data.data.message
        };
      } else {
        throw new Error(data.error || 'Failed to sync universities');
      }
    } catch (error) {
      console.error('Error syncing universities:', error);
      throw error;
    }
  }

  // Sync specific universities
  async syncUniversities(universityIds: string[]): Promise<UniversitySyncResult> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/admin/universities/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ universityIds })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          universities: data.data.universities,
          syncedCount: data.data.syncedCount,
          syncTimestamp: data.data.syncTimestamp,
          message: data.data.message
        };
      } else {
        throw new Error(data.error || 'Failed to sync universities');
      }
    } catch (error) {
      console.error('Error syncing specific universities:', error);
      throw error;
    }
  }

  // Sync from external source
  async syncFromExternal(source: string = 'external'): Promise<UniversitySyncResult> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/admin/universities/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ source })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please login again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Cache the synced universities
        this.cacheUniversities(data.data.universities);
        
        // Update sync status
        this.updateSyncStatus({
          lastSync: data.data.syncTimestamp,
          totalUniversities: data.data.universities.length,
          universitiesToSync: 0,
          syncRequired: false,
          lastModified: data.data.syncTimestamp
        });

        return {
          success: true,
          universities: data.data.universities,
          syncedCount: data.data.syncedCount,
          syncTimestamp: data.data.syncTimestamp,
          message: data.data.message
        };
      } else {
        throw new Error(data.error || 'Failed to sync from external source');
      }
    } catch (error) {
      console.error('Error syncing from external source:', error);
      throw error;
    }
  }

  // Cache universities data
  private cacheUniversities(universities: any[]): void {
    try {
      const cacheData = {
        universities,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching universities:', error);
    }
  }

  // Get cached universities
  getCachedUniversities(): any[] | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        // Check if cache is still valid (24 hours)
        const cacheAge = Date.now() - new Date(data.timestamp).getTime();
        if (cacheAge < 24 * 60 * 60 * 1000) {
          return data.universities;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting cached universities:', error);
      return null;
    }
  }

  // Cache sync status
  private cacheSyncStatus(status: UniversitySyncStatus): void {
    try {
      localStorage.setItem(this.SYNC_STATUS_KEY, JSON.stringify(status));
    } catch (error) {
      console.error('Error caching sync status:', error);
    }
  }

  // Get cached sync status
  private getCachedSyncStatus(): UniversitySyncStatus | null {
    try {
      const cached = localStorage.getItem(this.SYNC_STATUS_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
      return null;
    } catch (error) {
      console.error('Error getting cached sync status:', error);
      return null;
    }
  }

  // Update sync status
  private updateSyncStatus(status: UniversitySyncStatus): void {
    this.cacheSyncStatus(status);
  }

  // Clear cache
  clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
      localStorage.removeItem(this.SYNC_STATUS_KEY);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

// Export singleton instance
export const universitySyncService = new UniversitySyncService();
export default universitySyncService;
