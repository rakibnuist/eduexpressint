'use client';

import React, { useEffect } from 'react';

// Meta Conversions API Event Types
interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  dateOfBirth?: string;
  gender?: string;
}

interface CustomData {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  contents?: any[];
  currency?: string;
  value?: number;
  num_items?: number;
  search_string?: string;
  status?: string;
  [key: string]: any;
}

interface EventData {
  event_name: string;
  event_time: number;
  user_data?: UserData;
  custom_data?: CustomData;
  event_source_url: string;
  action_source: string;
}

// Hash function for PII data (client-side hashing)
const hashData = (data: string): string => {
  if (!data) return '';
  
  // Simple hash function for client-side (not cryptographically secure)
  let hash = 0;
  for (let i = 0; i < data.toLowerCase().length; i++) {
    const char = data.toLowerCase().charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString();
};

// Meta Conversions API Tracking Functions
export const metaConversionsAPI = {
  // Initialize Meta Conversions API
  init: () => {
    if (typeof window !== 'undefined') {
      console.log('Meta Conversions API tracking initialized');
      console.log('Events will be sent to both client-side pixel and server-side API');
    }
  },

  // Send event to both client-side pixel and server-side API
  sendEvent: async (eventData: Partial<EventData>, userData?: UserData, customData?: CustomData) => {
    if (typeof window === 'undefined') return;

    const event: EventData = {
      event_name: eventData.event_name || 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: userData ? {
        ...userData,
        // Hash PII data for privacy
        email: userData.email ? hashData(userData.email) : undefined,
        phone: userData.phone ? hashData(userData.phone.replace(/\D/g, '')) : undefined,
      } : undefined,
      custom_data: customData,
    };

    // 1. Send to client-side Meta Pixel
    if (window.fbq) {
      try {
        const pixelData = {
          ...customData,
          event_source_url: event.event_source_url,
        };
        
        window.fbq('track', event.event_name, pixelData);
        console.log(`Client-side Meta Pixel: ${event.event_name}`, pixelData);
      } catch (error) {
        console.error('Client-side pixel error:', error);
      }
    }

    // 2. Send to server-side Meta Conversions API
    try {
      const response = await fetch('/api/tracking/meta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: [event],
          test_event_code: 'TEST65812', // For testing
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Server-side Meta API: ${event.event_name}`, result);
      } else {
        console.error('Server-side API error:', await response.text());
      }
    } catch (error) {
      console.error('Meta Conversions API error:', error);
    }

    // 3. Send to Stape (if configured)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'meta_conversion',
        event_name: event.event_name,
        user_data: event.user_data,
        custom_data: event.custom_data,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // 1. LEAD EVENT - When someone shows interest
  trackLead: async (userData?: UserData, leadData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'Lead' },
      userData,
      {
        content_name: leadData?.content_name || 'Study Abroad Lead',
        content_category: 'Education',
        content_type: 'lead_form',
        value: leadData?.value || 1,
        currency: 'USD',
        // Education-specific data
        destination_country: leadData?.destination,
        study_level: leadData?.studyLevel,
        program_type: leadData?.programType,
        lead_source: leadData?.source || 'Website',
        lead_quality: leadData?.quality || 'high',
      }
    );
  },

  // 2. SUBMIT APPLICATION EVENT - When someone submits an application
  trackSubmitApplication: async (userData?: UserData, applicationData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'SubmitApplication' },
      userData,
      {
        content_name: applicationData?.content_name || 'University Application',
        content_category: 'Education',
        content_type: 'application',
        content_ids: applicationData?.university_ids || [],
        value: applicationData?.value || 50, // Higher value for applications
        currency: 'USD',
        // Application-specific data
        application_type: applicationData?.type || 'university_application',
        destination_country: applicationData?.destination,
        study_level: applicationData?.studyLevel,
        program_field: applicationData?.programField,
        universities_count: applicationData?.universities_count || 1,
        application_status: 'submitted',
      }
    );
  },

  // 3. VIEW CONTENT EVENT - When someone views important content
  trackViewContent: async (userData?: UserData, contentData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'ViewContent' },
      userData,
      {
        content_name: contentData?.content_name || document.title,
        content_category: contentData?.category || 'Education',
        content_type: contentData?.type || 'page',
        content_ids: contentData?.ids || [window.location.pathname],
        value: contentData?.value || 0,
        currency: 'USD',
        // Content-specific data
        page_type: contentData?.page_type,
        destination_country: contentData?.destination,
        university_name: contentData?.university,
        program_type: contentData?.program_type,
        content_engagement_score: contentData?.engagement_score || 1,
      }
    );
  },

  // 4. FIND LOCATION EVENT - When someone searches for locations/destinations
  trackFindLocation: async (userData?: UserData, locationData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'Search' }, // Facebook uses 'Search' for find location
      userData,
      {
        content_name: locationData?.content_name || 'Location Search',
        content_category: 'Education',
        content_type: 'location_search',
        search_string: locationData?.search_query || locationData?.destination,
        value: locationData?.value || 0,
        currency: 'USD',
        // Location-specific data
        destination_country: locationData?.destination,
        search_type: 'destination_search',
        location_type: locationData?.type || 'country',
        search_results_count: locationData?.results_count,
        user_intent: 'location_research',
      }
    );
  },

  // 5. CONTACT EVENT - When someone initiates contact
  trackContact: async (userData?: UserData, contactData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'Contact' },
      userData,
      {
        content_name: contactData?.content_name || 'Contact Inquiry',
        content_category: 'Education',
        content_type: 'contact_form',
        value: contactData?.value || 5, // Medium value for contact
        currency: 'USD',
        // Contact-specific data
        contact_method: contactData?.method || 'form',
        inquiry_type: contactData?.inquiry_type || 'general',
        destination_interest: contactData?.destination,
        study_level_interest: contactData?.studyLevel,
        urgency_level: contactData?.urgency || 'medium',
        contact_source: contactData?.source || 'website',
      }
    );
  },

  // 6. COMPLETE REGISTRATION EVENT - When someone completes registration/signup
  trackCompleteRegistration: async (userData?: UserData, registrationData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'CompleteRegistration' },
      userData,
      {
        content_name: registrationData?.content_name || 'User Registration',
        content_category: 'Education',
        content_type: 'registration',
        value: registrationData?.value || 10, // Higher value for registrations
        currency: 'USD',
        // Registration-specific data
        registration_type: registrationData?.type || 'user_account',
        registration_method: registrationData?.method || 'email',
        user_type: registrationData?.user_type || 'student',
        registration_source: registrationData?.source || 'website',
        account_status: 'active',
        onboarding_completed: registrationData?.onboarding_completed || false,
      }
    );
  },

  // Enhanced Page View with education context
  trackPageView: async (userData?: UserData, pageData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'PageView' },
      userData,
      {
        content_name: pageData?.content_name || document.title,
        content_category: 'Education',
        content_type: 'webpage',
        value: 0,
        currency: 'USD',
        // Page-specific data
        page_type: pageData?.page_type || 'general',
        destination_country: pageData?.destination,
        university_featured: pageData?.university,
        program_type: pageData?.program_type,
        user_journey_stage: pageData?.stage || 'awareness',
        page_category: pageData?.category,
      }
    );
  },

  // Custom event for education-specific actions
  trackCustomEducationEvent: async (eventName: string, userData?: UserData, customData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: eventName },
      userData,
      {
        content_category: 'Education',
        ...customData,
      }
    );
  },
};

// Meta Conversions API Provider Component
export default function MetaConversionsAPIProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Meta Conversions API tracking
    metaConversionsAPI.init();
    
    // Track initial page view with enhanced data
    metaConversionsAPI.trackPageView(undefined, {
      page_type: 'initial_load',
      stage: 'page_load',
      category: 'website',
    });

    console.log('Meta Conversions API Provider initialized');
  }, []);

  return <>{children}</>;
}

// Hook for using Meta Conversions API
export const useMetaConversionsAPI = () => {
  return metaConversionsAPI;
};

// Declare global variables
declare global {
  interface Window {
    fbq: any;
    dataLayer: any[];
  }
}
