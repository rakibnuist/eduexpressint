// Client-side update synchronization service
export interface Update {
  _id: string;
  title: string;
  content: string;
  type: 'announcement' | 'news' | 'maintenance' | 'feature' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'published' | 'archived';
  targetAudience: 'all' | 'students' | 'partners' | 'staff' | 'admin';
  tags: string[];
  author: {
    id: string;
    name: string;
    email: string;
  };
  publishedAt: string;
  expiresAt?: string;
  isPinned: boolean;
  views: number;
  likes: number;
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

export interface SyncStatus {
  lastSync: string | null;
  totalUpdates: number;
  updatesToSync: number;
  syncRequired: boolean;
  lastModified: string | null;
}

export interface SyncResult {
  success: boolean;
  updates: Update[];
  syncedCount: number;
  syncTimestamp: string;
  message: string;
}

class UpdateSyncService {
  private readonly CACHE_KEY = 'updates_cache';
  private readonly SYNC_KEY = 'updates_sync_status';
  private readonly CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

  // Get cached updates
  getCachedUpdates(): Update[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return [];
      
      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is expired
      if (now - timestamp > this.CACHE_EXPIRY) {
        this.clearCache();
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error reading cached updates:', error);
      this.clearCache();
      return [];
    }
  }

  // Cache updates
  cacheUpdates(updates: Update[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheData = {
        data: updates,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching updates:', error);
    }
  }

  // Clear cache
  clearCache(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.CACHE_KEY);
    localStorage.removeItem(this.SYNC_KEY);
  }

  // Get sync status
  getSyncStatus(): SyncStatus {
    if (typeof window === 'undefined') {
      return {
        lastSync: null,
        totalUpdates: 0,
        updatesToSync: 0,
        syncRequired: false,
        lastModified: null
      };
    }
    
    try {
      const status = localStorage.getItem(this.SYNC_KEY);
      if (!status) {
        return {
          lastSync: null,
          totalUpdates: 0,
          updatesToSync: 0,
          syncRequired: true,
          lastModified: null
        };
      }
      
      return JSON.parse(status);
    } catch (error) {
      console.error('Error reading sync status:', error);
      return {
        lastSync: null,
        totalUpdates: 0,
        updatesToSync: 0,
        syncRequired: true,
        lastModified: null
      };
    }
  }

  // Update sync status
  updateSyncStatus(status: Partial<SyncStatus>): void {
    if (typeof window === 'undefined') return;
    
    try {
      const currentStatus = this.getSyncStatus();
      const newStatus = {
        ...currentStatus,
        ...status,
        lastSync: new Date().toISOString()
      };
      localStorage.setItem(this.SYNC_KEY, JSON.stringify(newStatus));
    } catch (error) {
      console.error('Error updating sync status:', error);
    }
  }

  // Fetch updates from server
  async fetchUpdates(params: {
    page?: number;
    limit?: number;
    type?: string;
    search?: string;
  } = {}): Promise<{ updates: Update[]; pagination: any }> {
    try {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set('page', params.page.toString());
      if (params.limit) searchParams.set('limit', params.limit.toString());
      if (params.type) searchParams.set('type', params.type);
      if (params.search) searchParams.set('search', params.search);

      const response = await fetch(`/api/updates?${searchParams}`);
      const data = await response.json();

      if (data.success) {
        return {
          updates: data.data.updates,
          pagination: data.data.pagination
        };
      } else {
        throw new Error(data.error || 'Failed to fetch updates');
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
      throw error;
    }
  }

  // Check if sync is needed
  async checkSyncStatus(): Promise<SyncStatus> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const lastSync = this.getSyncStatus().lastSync;
      const params = lastSync ? `?lastSync=${lastSync}` : '';
      
      const response = await fetch(`/api/admin/updates/sync${params}`, {
        headers: {
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
        const syncStatus: SyncStatus = {
          lastSync: data.data.stats.syncTimestamp,
          totalUpdates: data.data.stats.totalUpdates,
          updatesToSync: data.data.stats.updatesToSync,
          syncRequired: data.data.syncRequired,
          lastModified: data.data.stats.lastModified
        };
        
        this.updateSyncStatus(syncStatus);
        return syncStatus;
      } else {
        throw new Error(data.error || 'Failed to check sync status');
      }
    } catch (error) {
      console.error('Error checking sync status:', error);
      return {
        lastSync: null,
        totalUpdates: 0,
        updatesToSync: 0,
        syncRequired: true,
        lastModified: null
      };
    }
  }

  // Force sync updates
  async forceSync(): Promise<SyncResult> {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/admin/updates/sync', {
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
        // Cache the synced updates
        this.cacheUpdates(data.data.updates);
        
        // Update sync status
        this.updateSyncStatus({
          totalUpdates: data.data.updates.length,
          updatesToSync: 0,
          syncRequired: false,
          lastModified: data.data.syncTimestamp
        });

        return {
          success: true,
          updates: data.data.updates,
          syncedCount: data.data.syncedCount,
          syncTimestamp: data.data.syncTimestamp,
          message: data.data.message
        };
      } else {
        throw new Error(data.error || 'Failed to sync updates');
      }
    } catch (error) {
      console.error('Error syncing updates:', error);
      throw error;
    }
  }

  // Sync specific updates
  async syncUpdates(updateIds: string[]): Promise<SyncResult> {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/updates/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ updateIds })
      });

      const data = await response.json();

      if (data.success) {
        // Update cache with synced updates
        const cachedUpdates = this.getCachedUpdates();
        const syncedUpdates = data.data.updates;
        
        // Merge synced updates with cached updates
        const updatedCache = cachedUpdates.map(cached => {
          const synced = syncedUpdates.find((s: Update) => s._id === cached._id);
          return synced || cached;
        });

        // Add new updates that aren't in cache
        syncedUpdates.forEach((synced: Update) => {
          if (!updatedCache.find((u: Update) => u._id === synced._id)) {
            updatedCache.push(synced);
          }
        });

        this.cacheUpdates(updatedCache);
        
        return {
          success: true,
          updates: data.data.updates,
          syncedCount: data.data.syncedCount,
          syncTimestamp: data.data.syncTimestamp,
          message: data.data.message
        };
      } else {
        throw new Error(data.error || 'Failed to sync updates');
      }
    } catch (error) {
      console.error('Error syncing specific updates:', error);
      throw error;
    }
  }

  // Get updates with smart caching
  async getUpdates(params: {
    page?: number;
    limit?: number;
    type?: string;
    search?: string;
    useCache?: boolean;
  } = {}): Promise<{ updates: Update[]; pagination: any; fromCache: boolean }> {
    const { useCache = true, ...fetchParams } = params;
    
    // Try to get from cache first if useCache is true
    if (useCache) {
      const cachedUpdates = this.getCachedUpdates();
      if (cachedUpdates.length > 0) {
        // Apply client-side filtering
        let filteredUpdates = cachedUpdates;
        
        if (fetchParams.type && fetchParams.type !== 'all') {
          filteredUpdates = filteredUpdates.filter(u => u.type === fetchParams.type);
        }
        
        if (fetchParams.search) {
          const searchLower = fetchParams.search.toLowerCase();
          filteredUpdates = filteredUpdates.filter(u => 
            u.title.toLowerCase().includes(searchLower) ||
            u.content.toLowerCase().includes(searchLower) ||
            u.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }
        
        // Apply pagination
        const page = fetchParams.page || 1;
        const limit = fetchParams.limit || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUpdates = filteredUpdates.slice(startIndex, endIndex);
        
        return {
          updates: paginatedUpdates,
          pagination: {
            page,
            limit,
            total: filteredUpdates.length,
            pages: Math.ceil(filteredUpdates.length / limit)
          },
          fromCache: true
        };
      }
    }
    
    // Fetch from server if cache is empty or useCache is false
    const result = await this.fetchUpdates(fetchParams);
    this.cacheUpdates(result.updates);
    
    return {
      ...result,
      fromCache: false
    };
  }
}

// Export singleton instance
export const updateSyncService = new UpdateSyncService();
export default updateSyncService;
