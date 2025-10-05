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

// Enhanced Meta Conversions API for Education Consultancy
export const metaConversionsAPI = {
  // Initialize Meta Conversions API
  init: () => {
    if (typeof window !== 'undefined') {
      console.log('Enhanced Meta Conversions API tracking initialized for Education Consultancy');
      console.log('Events will be sent to both client-side pixel and server-side API');
    }
  },

  // Enhanced event sending with proper parameter structure
  sendEvent: async (eventData: Partial<EventData>, userData?: UserData, customData?: CustomData) => {
    if (typeof window === 'undefined') return;

    // Get client IP and user agent for better attribution
    const clientUserAgent = navigator.userAgent;
    const eventId = `${eventData.event_name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const event: EventData = {
      event_name: eventData.event_name || 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      action_source: 'website',
      event_id: eventId, // Add event ID for deduplication
      user_data: userData ? {
        // Hash all PII data as required by Facebook
        em: userData.email ? hashData(userData.email.toLowerCase()) : undefined,
        ph: userData.phone ? hashData(userData.phone.replace(/\D/g, '')) : undefined,
        fn: userData.first_name ? hashData(userData.first_name.toLowerCase()) : undefined,
        ln: userData.last_name ? hashData(userData.last_name.toLowerCase()) : undefined,
        ct: userData.city ? hashData(userData.city.toLowerCase()) : undefined,
        st: userData.state ? hashData(userData.state.toLowerCase()) : undefined,
        country: userData.country ? hashData(userData.country.toLowerCase()) : undefined,
        zp: userData.zip_code ? hashData(userData.zip_code) : undefined,
        db: userData.date_of_birth ? hashData(userData.date_of_birth) : undefined,
        ge: userData.gender ? hashData(userData.gender.toLowerCase()) : undefined,
        external_id: userData.external_id ? hashData(userData.external_id) : undefined,
        client_user_agent: clientUserAgent, // Don't hash
        fbc: userData.fbc || undefined, // Facebook click ID
        fbp: userData.fbp || undefined, // Facebook browser ID
      } : {
        client_user_agent: clientUserAgent,
      },
      custom_data: {
        ...customData,
        // Add education-specific custom data
        content_category: customData?.content_category || 'Education',
        content_type: customData?.content_type || 'consultation',
      },
    };

    // 1. Send to client-side Meta Pixel
    if (window.fbq) {
      try {
        const pixelData = {
          ...customData,
          event_source_url: event.event_source_url,
          event_id: eventId,
        };
        
        window.fbq('track', event.event_name, pixelData);
        console.log(`✅ Client-side Meta Pixel: ${event.event_name}`, pixelData);
      } catch (error) {
        console.error('❌ Client-side pixel error:', error);
      }
    } else {
      console.warn('⚠️ Meta Pixel not loaded - client-side tracking skipped');
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
          test_event_code: process.env.NODE_ENV === 'production' ? undefined : 'TEST65812',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Server-side Meta API: ${event.event_name}`, result);
        
        // Track successful API calls for monitoring
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'meta_api_success',
            event_name: event.event_name,
            timestamp: new Date().toISOString(),
          });
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Server-side API error:', response.status, errorText);
        
        // Track API errors for monitoring
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'meta_api_error',
            event_name: event.event_name,
            error_status: response.status,
            error_message: errorText,
            timestamp: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.error('❌ Meta Conversions API network error:', error);
      
      // Track network errors for monitoring
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'meta_api_network_error',
          event_name: event.event_name,
          error_message: error.message,
          timestamp: new Date().toISOString(),
        });
      }
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

  // 7. SCHEDULE EVENT - When someone schedules a consultation
  trackSchedule: async (userData?: UserData, scheduleData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'Schedule' },
      userData,
      {
        content_name: scheduleData?.content_name || 'Consultation Scheduled',
        content_category: 'Education',
        content_type: 'appointment',
        value: scheduleData?.value || 15, // High value for scheduled consultations
        currency: 'USD',
        // Schedule-specific data
        appointment_type: scheduleData?.appointment_type || 'consultation',
        consultation_duration: scheduleData?.duration || '30_minutes',
        destination_country: scheduleData?.destination,
        study_level: scheduleData?.studyLevel,
        program_type: scheduleData?.programType,
        consultation_topic: scheduleData?.topic,
        scheduled_date: scheduleData?.scheduled_date,
        timezone: scheduleData?.timezone,
        meeting_platform: scheduleData?.platform || 'online',
      }
    );
  },

  // 8. PURCHASE EVENT - When someone purchases a service
  trackPurchase: async (userData?: UserData, purchaseData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'Purchase' },
      userData,
      {
        content_name: purchaseData?.content_name || 'Service Purchase',
        content_category: 'Education',
        content_type: 'service',
        value: purchaseData?.value || 1,
        currency: purchaseData?.currency || 'USD',
        // Purchase-specific data
        service_type: purchaseData?.service_type || 'consultation',
        payment_method: purchaseData?.payment_method,
        transaction_id: purchaseData?.transaction_id,
        destination_country: purchaseData?.destination,
        study_level: purchaseData?.studyLevel,
        program_type: purchaseData?.programType,
        service_package: purchaseData?.package,
        payment_status: purchaseData?.payment_status || 'completed',
      }
    );
  },

  // 9. ADD TO CART EVENT - When someone adds a service to cart
  trackAddToCart: async (userData?: UserData, cartData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'AddToCart' },
      userData,
      {
        content_name: cartData?.content_name || 'Service Added to Cart',
        content_category: 'Education',
        content_type: 'service',
        value: cartData?.value || 1,
        currency: cartData?.currency || 'USD',
        // Cart-specific data
        service_type: cartData?.service_type || 'consultation',
        destination_country: cartData?.destination,
        study_level: cartData?.studyLevel,
        program_type: cartData?.programType,
        cart_value: cartData?.cart_value,
        items_count: cartData?.items_count || 1,
      }
    );
  },

  // 10. INITIATE CHECKOUT EVENT - When someone starts checkout process
  trackInitiateCheckout: async (userData?: UserData, checkoutData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'InitiateCheckout' },
      userData,
      {
        content_name: checkoutData?.content_name || 'Checkout Initiated',
        content_category: 'Education',
        content_type: 'service',
        value: checkoutData?.value || 1,
        currency: checkoutData?.currency || 'USD',
        // Checkout-specific data
        service_type: checkoutData?.service_type || 'consultation',
        destination_country: checkoutData?.destination,
        study_level: checkoutData?.studyLevel,
        program_type: checkoutData?.programType,
        checkout_value: checkoutData?.checkout_value,
        payment_method: checkoutData?.payment_method,
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

  // 7. UNIVERSITY SEARCH EVENT - When someone searches for universities
  trackUniversitySearch: async (userData?: UserData, searchData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'Search' },
      userData,
      {
        content_name: searchData?.content_name || 'University Search',
        content_category: 'Education',
        content_type: 'university_search',
        search_string: searchData?.search_query || searchData?.university_name,
        value: searchData?.value || 0,
        currency: 'USD',
        // Search-specific data
        search_type: 'university_search',
        destination_country: searchData?.destination,
        study_level: searchData?.studyLevel,
        program_field: searchData?.programField,
        search_results_count: searchData?.results_count,
        user_intent: 'university_research',
        search_filters: searchData?.filters,
      }
    );
  },

  // 8. SCHOLARSHIP VIEW EVENT - When someone views scholarship information
  trackScholarshipView: async (userData?: UserData, scholarshipData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'ViewContent' },
      userData,
      {
        content_name: scholarshipData?.content_name || 'Scholarship Information',
        content_category: 'Education',
        content_type: 'scholarship',
        content_ids: scholarshipData?.scholarship_ids || [],
        value: scholarshipData?.value || 0,
        currency: 'USD',
        // Scholarship-specific data
        scholarship_type: scholarshipData?.type,
        scholarship_amount: scholarshipData?.amount,
        destination_country: scholarshipData?.destination,
        study_level: scholarshipData?.studyLevel,
        eligibility_criteria: scholarshipData?.eligibility,
        application_deadline: scholarshipData?.deadline,
        user_eligibility_score: scholarshipData?.eligibility_score,
      }
    );
  },

  // 9. VISA CONSULTATION EVENT - When someone requests visa consultation
  trackVisaConsultation: async (userData?: UserData, visaData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'Contact' },
      userData,
      {
        content_name: visaData?.content_name || 'Visa Consultation Request',
        content_category: 'Education',
        content_type: 'visa_consultation',
        value: visaData?.value || 25, // Higher value for visa consultations
        currency: 'USD',
        // Visa-specific data
        visa_type: visaData?.visa_type,
        destination_country: visaData?.destination,
        study_level: visaData?.studyLevel,
        consultation_type: visaData?.consultation_type || 'initial',
        urgency_level: visaData?.urgency || 'high',
        previous_visa_history: visaData?.previous_history,
        estimated_processing_time: visaData?.processing_time,
      }
    );
  },

  // 10. APPLICATION STATUS CHECK EVENT - When someone checks application status
  trackApplicationStatusCheck: async (userData?: UserData, statusData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'ViewContent' },
      userData,
      {
        content_name: statusData?.content_name || 'Application Status Check',
        content_category: 'Education',
        content_type: 'application_status',
        value: statusData?.value || 0,
        currency: 'USD',
        // Status-specific data
        application_id: statusData?.application_id,
        current_status: statusData?.current_status,
        destination_country: statusData?.destination,
        university_name: statusData?.university,
        program_type: statusData?.program_type,
        days_since_submission: statusData?.days_since_submission,
        expected_decision_date: statusData?.expected_date,
        user_engagement_level: statusData?.engagement_level,
      }
    );
  },

  // 11. DESTINATION COMPARISON EVENT - When someone compares destinations
  trackDestinationComparison: async (userData?: UserData, comparisonData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'ViewContent' },
      userData,
      {
        content_name: comparisonData?.content_name || 'Destination Comparison',
        content_category: 'Education',
        content_type: 'destination_comparison',
        value: comparisonData?.value || 0,
        currency: 'USD',
        // Comparison-specific data
        compared_destinations: comparisonData?.destinations || [],
        comparison_criteria: comparisonData?.criteria || [],
        study_level: comparisonData?.studyLevel,
        program_field: comparisonData?.programField,
        budget_range: comparisonData?.budget_range,
        comparison_duration: comparisonData?.duration_seconds,
        user_preference_score: comparisonData?.preference_score,
      }
    );
  },

  // 12. PROGRAM RECOMMENDATION EVENT - When someone receives program recommendations
  trackProgramRecommendation: async (userData?: UserData, recommendationData?: any) => {
    await metaConversionsAPI.sendEvent(
      { event_name: 'ViewContent' },
      userData,
      {
        content_name: recommendationData?.content_name || 'Program Recommendation',
        content_category: 'Education',
        content_type: 'program_recommendation',
        value: recommendationData?.value || 0,
        currency: 'USD',
        // Recommendation-specific data
        recommended_programs: recommendationData?.programs || [],
        recommendation_algorithm: recommendationData?.algorithm,
        user_profile_match_score: recommendationData?.match_score,
        destination_country: recommendationData?.destination,
        study_level: recommendationData?.studyLevel,
        program_field: recommendationData?.programField,
        recommendation_confidence: recommendationData?.confidence,
        user_interaction_with_recommendations: recommendationData?.interaction_type,
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
