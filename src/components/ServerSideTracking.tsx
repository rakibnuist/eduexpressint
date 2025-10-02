'use client';

import React, { useEffect } from 'react';

// Enhanced data layer interface
interface ServerSideLeadData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  destination?: string;
  studyLevel?: string;
  programType?: string;
  source?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}

interface ServerSideFormData {
  email?: string;
  phone?: string;
  formName?: string;
  formType?: string;
  contentName?: string;
  value?: number;
  currency?: string;
}

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
  }
}

// Enhanced server-side tracking functions
export const serverSideTracking = {
  // Initialize data layer
  initDataLayer: () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  },

  // Enhanced lead tracking with server-side support
  trackServerSideLead: (leadData: ServerSideLeadData) => {
    if (typeof window === 'undefined') return;

    // Client-side Meta Pixel tracking (fallback)
    if (window.fbq) {
      try {
        window.fbq('track', 'Lead', {
          content_name: leadData.content_name || 'Lead Generated',
          content_category: leadData.content_category || 'Education',
          value: leadData.value || 1,
          currency: leadData.currency || 'USD',
          email: leadData.email,
          phone: leadData.phone,
          destination: leadData.destination,
          study_level: leadData.studyLevel,
          program_type: leadData.programType,
          source: leadData.source || 'Website'
        });
        console.log('Client-side Meta Pixel Lead tracked:', leadData);
      } catch (error) {
        console.error('Client-side Meta Pixel tracking failed:', error);
      }
    }

    // Server-side tracking via GTM data layer
    try {
      window.dataLayer.push({
        event: 'server_side_lead',
        event_name: 'Lead',
        user_data: {
          email: leadData.email,
          phone: leadData.phone,
          first_name: leadData.firstName,
          last_name: leadData.lastName,
          country: leadData.country
        },
        custom_data: {
          destination: leadData.destination,
          study_level: leadData.studyLevel,
          program_type: leadData.programType,
          source: leadData.source || 'Website',
          value: leadData.value || 1,
          currency: leadData.currency || 'USD',
          content_name: leadData.content_name || 'Lead Generated',
          content_category: leadData.content_category || 'Education'
        },
        timestamp: new Date().toISOString()
      });
      console.log('Server-side Lead tracking pushed to dataLayer:', leadData);
    } catch (error) {
      console.error('Server-side Lead tracking failed:', error);
    }
  },

  // Enhanced form submission tracking
  trackServerSideFormSubmission: (formData: ServerSideFormData) => {
    if (typeof window === 'undefined') return;

    // Client-side Meta Pixel tracking (fallback)
    if (window.fbq) {
      try {
        window.fbq('track', 'CompleteRegistration', {
          content_name: formData.contentName || 'Form Submission',
          form_name: formData.formName || 'Contact Form',
          form_type: formData.formType || 'Lead Generation',
          value: formData.value || 1,
          currency: formData.currency || 'USD'
        });
        console.log('Client-side Meta Pixel Form Submission tracked:', formData);
      } catch (error) {
        console.error('Client-side Meta Pixel form tracking failed:', error);
      }
    }

    // Server-side tracking via GTM data layer
    try {
      window.dataLayer.push({
        event: 'server_side_form_submission',
        event_name: 'CompleteRegistration',
        user_data: {
          email: formData.email,
          phone: formData.phone
        },
        custom_data: {
          form_name: formData.formName || 'Contact Form',
          form_type: formData.formType || 'Lead Generation',
          content_name: formData.contentName || 'Form Submission',
          value: formData.value || 1,
          currency: formData.currency || 'USD'
        },
        timestamp: new Date().toISOString()
      });
      console.log('Server-side Form Submission tracking pushed to dataLayer:', formData);
    } catch (error) {
      console.error('Server-side Form Submission tracking failed:', error);
    }
  },

  // Enhanced page view tracking
  trackServerSidePageView: (pageData: {
    page_title?: string;
    page_location?: string;
    content_category?: string;
    user_data?: any;
  }) => {
    if (typeof window === 'undefined') return;

    // Client-side Meta Pixel tracking
    if (window.fbq) {
      try {
        window.fbq('track', 'PageView');
        console.log('Client-side Meta Pixel PageView tracked');
      } catch (error) {
        console.error('Client-side Meta Pixel PageView failed:', error);
      }
    }

    // Server-side tracking via GTM data layer
    try {
      window.dataLayer.push({
        event: 'server_side_page_view',
        event_name: 'PageView',
        page_data: {
          page_title: pageData.page_title || document.title,
          page_location: pageData.page_location || window.location.href,
          content_category: pageData.content_category || 'Education'
        },
        user_data: pageData.user_data || {},
        timestamp: new Date().toISOString()
      });
      console.log('Server-side PageView tracking pushed to dataLayer');
    } catch (error) {
      console.error('Server-side PageView tracking failed:', error);
    }
  },

  // Enhanced conversion tracking
  trackServerSideConversion: (conversionData: {
    event_name?: string;
    value?: number;
    currency?: string;
    content_name?: string;
    email?: string;
    phone?: string;
    transaction_id?: string;
  }) => {
    if (typeof window === 'undefined') return;

    const eventName = conversionData.event_name || 'Purchase';

    // Client-side Meta Pixel tracking
    if (window.fbq) {
      try {
        window.fbq('track', eventName, {
          content_name: conversionData.content_name || 'Conversion',
          value: conversionData.value || 0,
          currency: conversionData.currency || 'USD',
          transaction_id: conversionData.transaction_id
        });
        console.log(`Client-side Meta Pixel ${eventName} tracked:`, conversionData);
      } catch (error) {
        console.error(`Client-side Meta Pixel ${eventName} failed:`, error);
      }
    }

    // Server-side tracking via GTM data layer
    try {
      window.dataLayer.push({
        event: 'server_side_conversion',
        event_name: eventName,
        user_data: {
          email: conversionData.email,
          phone: conversionData.phone
        },
        custom_data: {
          content_name: conversionData.content_name || 'Conversion',
          value: conversionData.value || 0,
          currency: conversionData.currency || 'USD',
          transaction_id: conversionData.transaction_id
        },
        timestamp: new Date().toISOString()
      });
      console.log(`Server-side ${eventName} tracking pushed to dataLayer:`, conversionData);
    } catch (error) {
      console.error(`Server-side ${eventName} tracking failed:`, error);
    }
  },

  // Test server-side tracking
  testServerSideTracking: (testCode: string = 'SERVER_TEST') => {
    if (typeof window === 'undefined') return false;

    try {
      // Test lead event
      serverSideTracking.trackServerSideLead({
        email: 'test@example.com',
        phone: '+1234567890',
        firstName: 'Test',
        lastName: 'User',
        destination: 'Test Destination',
        studyLevel: 'Masters',
        programType: 'Engineering',
        source: 'Server-Side Test',
        content_name: `Server-Side Test Lead - ${testCode}`,
        value: 1,
        currency: 'USD'
      });

      // Test form submission
      serverSideTracking.trackServerSideFormSubmission({
        email: 'test@example.com',
        phone: '+1234567890',
        formName: 'Test Form',
        formType: 'Server-Side Test',
        contentName: `Server-Side Test Form - ${testCode}`,
        value: 1,
        currency: 'USD'
      });

      console.log('Server-side tracking test completed successfully');
      return true;
    } catch (error) {
      console.error('Server-side tracking test failed:', error);
      return false;
    }
  }
};

// Server-Side Tracking Provider Component
export default function ServerSideTrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize data layer
    serverSideTracking.initDataLayer();
    
    // Track initial page view with server-side support
    serverSideTracking.trackServerSidePageView({
      page_title: document.title,
      page_location: window.location.href,
      content_category: 'Education'
    });
  }, []);

  return <>{children}</>;
}

// Hook for using server-side tracking in components
export const useServerSideTracking = () => {
  return serverSideTracking;
};
