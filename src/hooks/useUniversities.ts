import { useState, useEffect, useCallback } from 'react';
import { IUniversity } from '@/models/University';

interface UseUniversitiesOptions {
  limit?: number;
  offset?: number;
  country?: string;
  type?: string;
  search?: string;
  featured?: boolean;
  autoFetch?: boolean;
  onError?: (error: string) => void;
}

interface UniversitiesResponse {
  universities: IUniversity[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  stats: {
    total: number;
    featured: number;
    countryDistribution: Array<{ _id: string; count: number }>;
    typeDistribution: Array<{ _id: string; count: number }>;
  };
  lastUpdated: string;
}

interface UseUniversitiesReturn {
  universities: IUniversity[];
  loading: boolean;
  error: string | null;
  pagination: UniversitiesResponse['pagination'] | null;
  stats: UniversitiesResponse['stats'] | null;
  lastUpdated: string | null;
  fetchUniversities: (options?: Partial<UseUniversitiesOptions>) => Promise<void>;
  refetch: () => Promise<void>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export function useUniversities(options: UseUniversitiesOptions = {}): UseUniversitiesReturn {
  const {
    limit = 50,
    offset = 0,
    country,
    type,
    search,
    featured,
    autoFetch = true,
    onError
  } = options;

  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UniversitiesResponse['pagination'] | null>(null);
  const [stats, setStats] = useState<UniversitiesResponse['stats'] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [currentOffset, setCurrentOffset] = useState(offset);

  // Build query parameters
  const buildQueryParams = useCallback((customOptions: Partial<UseUniversitiesOptions> = {}) => {
    const params = new URLSearchParams();
    
    if (customOptions.limit || limit) {
      params.set('limit', String(customOptions.limit || limit));
    }
    if (customOptions.offset !== undefined || currentOffset !== 0) {
      params.set('offset', String(customOptions.offset !== undefined ? customOptions.offset : currentOffset));
    }
    if (customOptions.country || country) {
      params.set('country', customOptions.country || country || '');
    }
    if (customOptions.type || type) {
      params.set('type', customOptions.type || type || '');
    }
    if (customOptions.search || search) {
      params.set('search', customOptions.search || search || '');
    }
    if (customOptions.featured || featured) {
      params.set('featured', 'true');
    }

    return params.toString();
  }, [limit, currentOffset, country, type, search, featured]);

  // Fetch universities
  const fetchUniversities = useCallback(async (customOptions: Partial<UseUniversitiesOptions> = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = buildQueryParams(customOptions);
      const url = `/api/universities${queryParams ? `?${queryParams}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Universities fetch API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        const responseData = data.data as UniversitiesResponse;
        
        // If this is a fresh fetch (offset = 0), replace the universities
        // Otherwise, append to existing universities for pagination
        const isFreshFetch = (customOptions.offset !== undefined ? customOptions.offset : currentOffset) === 0;
        
        setUniversities(prev => isFreshFetch ? responseData.universities : [...prev, ...responseData.universities]);
        setPagination(responseData.pagination);
        setStats(responseData.stats);
        setLastUpdated(responseData.lastUpdated);
        
        // Update current offset for next fetch
        setCurrentOffset(responseData.pagination.offset + responseData.pagination.limit);
      } else {
        throw new Error(data.error || 'Failed to fetch universities');
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load universities';
      setError(errorMessage);
      
      // Only call onError for non-network errors
      if (errorMessage !== 'Failed to fetch' && errorMessage !== 'Network request failed') {
        onError?.(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [buildQueryParams, currentOffset, onError]);

  // Refetch with current parameters
  const refetch = useCallback(async () => {
    setCurrentOffset(0);
    await fetchUniversities({ offset: 0 });
  }, [fetchUniversities]);

  // Load more universities (pagination)
  const loadMore = useCallback(async () => {
    if (!pagination?.hasMore || loading) {
      return;
    }
    
    await fetchUniversities({ offset: currentOffset });
  }, [fetchUniversities, pagination?.hasMore, loading, currentOffset]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchUniversities();
    }
  }, [autoFetch]); // Only depend on autoFetch to avoid infinite loops

  // Reset when search parameters change
  useEffect(() => {
    if (autoFetch) {
      setCurrentOffset(0);
      fetchUniversities({ offset: 0 });
    }
  }, [country, type, search, featured]); // Depend on search parameters

  return {
    universities,
    loading,
    error,
    pagination,
    stats,
    lastUpdated,
    fetchUniversities,
    refetch,
    hasMore: pagination?.hasMore || false,
    loadMore
  };
}

export default useUniversities;
