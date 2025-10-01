import { useState, useEffect, useCallback, useRef } from 'react';
import { IUniversity } from '@/models/University';

type University = IUniversity;

interface UseUniversityOptions {
  autoSave?: boolean;
  autoSaveDelay?: number;
  onSave?: (university: University) => void;
  onError?: (error: string) => void;
}

interface SaveState {
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  error: string | null;
}

// Helper function to normalize university data
const normalizeUniversityData = (data: any): University => {
  return {
    ...data,
    scholarships: Array.isArray(data.scholarships) ? data.scholarships : [],
    programs: Array.isArray(data.programs) ? data.programs : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    requirements: {
      general: Array.isArray(data.requirements?.general) ? data.requirements.general : [],
      documents: Array.isArray(data.requirements?.documents) ? data.requirements.documents : [],
      languageTests: Array.isArray(data.requirements?.languageTests) ? data.requirements.languageTests : [],
      ...data.requirements
    },
    fees: {
      application: data.fees?.application || 0,
      tuition: {
        amount: data.fees?.tuition?.amount || 0,
        currency: data.fees?.tuition?.currency || 'USD'
      },
      entries: Array.isArray(data.fees?.entries) ? data.fees.entries : []
    }
  };
};

export function useUniversity(universityId: string, options: UseUniversityOptions = {}) {
  const {
    autoSave = false,
    autoSaveDelay = 2000,
    onSave,
    onError,
  } = options;

  const [university, setUniversity] = useState<University | null>(null);
  const [formData, setFormData] = useState<Partial<University>>({});
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>({
    isSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false,
    error: null,
  });

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoadRef = useRef(true);
  const formDataRef = useRef<Partial<University>>({});

  // Fetch university data
  const fetchUniversity = useCallback(async () => {
    try {
      setLoading(true);
      setSaveState(prev => ({ ...prev, error: null }));

      // Fetching university with ID

      const response = await fetch(`/api/universities?id=${universityId}&admin=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });
      
      // University fetch response status
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('University fetch API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      // University data received
      
      if (data.success && data.data) {
        const normalizedData = normalizeUniversityData(data.data);
        setUniversity(normalizedData);
        setFormData(normalizedData);
        formDataRef.current = normalizedData;
        setSaveState(prev => ({ 
          ...prev, 
          hasUnsavedChanges: false,
          error: null 
        }));
        isInitialLoadRef.current = false;
      } else {
        throw new Error(data.error || 'University not found');
      }
    } catch (error) {
      console.error('Error fetching university:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load university';
      setSaveState(prev => ({ ...prev, error: errorMessage }));
      
      // Only call onError for non-network errors
      if (errorMessage !== 'Failed to fetch' && errorMessage !== 'Network request failed') {
        onError?.(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [universityId, onError]);

  // Save university data
  const saveUniversity = useCallback(async (data?: Partial<University>) => {
    const dataToSave = data || formData;
    
    // Save university called
    
    if (!dataToSave.name || !dataToSave.country || !dataToSave.destination || !dataToSave.city || !dataToSave.type) {
      const error = 'Required fields are missing (name, country, destination, city, type)';
      console.error('Validation failed:', error);
      setSaveState(prev => ({ ...prev, error }));
      onError?.(error);
      return false;
    }

    setSaveState(prev => ({ ...prev, isSaving: true, error: null }));

    try {
      const payload = {
        ...dataToSave,
        slug: dataToSave.slug || dataToSave.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      };

      // Sending payload to API

      const response = await fetch(`/api/universities?id=${universityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Save response status

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Save API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      // Save response data
      
      if (result.success) {
        setSaveState({
          isSaving: false,
          lastSaved: new Date(),
          hasUnsavedChanges: false,
          error: null,
        });
        
        if (result.university) {
          const normalizedData = normalizeUniversityData(result.university);
          setUniversity(normalizedData);
          setFormData(normalizedData);
          formDataRef.current = normalizedData;
        }
        
        // Note: Removed automatic fetchUniversity() call to prevent overwriting local form changes
        // The form data is already updated with the server response above
        
        onSave?.(result.university);
        return true;
      } else {
        throw new Error(result.error || 'Failed to save university');
      }
    } catch (error) {
      console.error('Save university error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save university';
      setSaveState(prev => ({ 
        ...prev, 
        isSaving: false, 
        error: errorMessage 
      }));
      
      // Only call onError for non-network errors
      if (errorMessage !== 'Failed to fetch' && errorMessage !== 'Network request failed') {
        onError?.(errorMessage);
      }
      return false;
    }
  }, [universityId, onSave, onError, formData]);

  // Auto-save functionality
  const scheduleAutoSave = useCallback(() => {
    if (!autoSave || !saveState.hasUnsavedChanges || saveState.isSaving || isInitialLoadRef.current) {
      return;
    }

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(async () => {
      // Get current formData from ref and save it
      const currentFormData = formDataRef.current;
      if (currentFormData && currentFormData.name && currentFormData.country && currentFormData.destination && currentFormData.city && currentFormData.type) {
        // Call saveUniversity directly without dependency
        try {
          const payload = {
            ...currentFormData,
            slug: currentFormData.slug || currentFormData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          };

          const response = await fetch(`/api/universities?id=${universityId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              setSaveState({
                isSaving: false,
                lastSaved: new Date(),
                hasUnsavedChanges: false,
                error: null,
              });
              
              if (result.university) {
                const normalizedData = normalizeUniversityData(result.university);
                setUniversity(normalizedData);
                setFormData(normalizedData);
                formDataRef.current = normalizedData;
              }
              
              onSave?.(result.university);
            }
          }
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, autoSaveDelay);
  }, [autoSave, saveState.hasUnsavedChanges, saveState.isSaving, autoSaveDelay, universityId, onSave]);

  // Update form data
  const updateFormData = useCallback((updates: Partial<University>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      formDataRef.current = newData;
      return newData;
    });
    setSaveState(prev => ({ ...prev, hasUnsavedChanges: true }));
  }, []);

  // Clear auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Auto-save is disabled - manual save only

  // Load university data on mount
  useEffect(() => {
    if (universityId) {
      fetchUniversity();
    }
  }, [universityId, fetchUniversity]);

  return {
    university,
    formData,
    loading,
    saveState,
    updateFormData,
    saveUniversity,
    fetchUniversity,
  };
}
