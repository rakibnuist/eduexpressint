'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gtm } from './GoogleTagManager';
import { metaPixel } from './MetaPixel';

interface TrackingEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export default function EnhancedTracking() {
  const router = useRouter();

  useEffect(() => {
    // Track page view on initial load
    const trackPageView = () => {
      const url = window.location.href;
      const title = document.title;
      
      // GTM Page View
      gtm.pageView(url, title);
      
      // Meta Pixel Page View
      metaPixel.pageView();
      
      console.log('Page view tracked:', { url, title });
    };

    // Track page view on initial load
    trackPageView();

    // Track page view on route changes (for SPA behavior)
    const handleRouteChange = () => {
      setTimeout(() => {
        trackPageView();
      }, 100);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Enhanced tracking functions
  const trackEvent = (eventData: TrackingEvent) => {
    const { event, category, action, label, value, custom_parameters } = eventData;
    
    // GTM Event
    gtm.trackCustomEvent(event, {
      event_category: category,
      event_action: action,
      event_label: label,
      value: value,
      ...custom_parameters
    });
    
    // Meta Pixel Event (map to appropriate Meta events)
    const metaEventMap: Record<string, string> = {
      'form_submit': 'CompleteRegistration',
      'lead_generated': 'Lead',
      'view_content': 'ViewContent',
      'search': 'Search',
      'add_to_cart': 'AddToCart',
      'purchase': 'Purchase'
    };
    
    const metaEvent = metaEventMap[event] || event;
    metaPixel.trackCustomEvent(metaEvent, {
      content_name: label || action || event,
      content_category: category || 'Education',
      value: value || 0,
      currency: 'USD',
      ...custom_parameters
    });
    
    console.log('Event tracked:', eventData);
  };

  // Track form submissions
  const trackFormSubmission = (formData: {
    form_name: string;
    form_type: string;
    form_value?: number;
    email?: string;
    phone?: string;
    country?: string;
    program?: string;
  }) => {
    // GTM Form Submission
    gtm.trackFormSubmission(formData);
    
    // Meta Pixel Form Submission
    metaPixel.trackFormSubmission({
      form_name: formData.form_name,
      form_type: formData.form_type,
      content_name: formData.form_name,
      value: formData.form_value || 500,
      currency: 'USD'
    });
    
    console.log('Form submission tracked:', formData);
  };

  // Track lead generation
  const trackLeadGeneration = (leadData: {
    lead_type: string;
    lead_value?: number;
    email?: string;
    phone?: string;
    country?: string;
    program?: string;
    university?: string;
    source?: string;
  }) => {
    // GTM Lead Generation
    gtm.trackLead(leadData);
    
    // Meta Pixel Lead Generation
    metaPixel.trackLead({
      content_name: leadData.lead_type,
      content_category: 'Education',
      value: leadData.lead_value || 1000,
      currency: 'USD',
      email: leadData.email,
      phone: leadData.phone,
      destination: leadData.country,
      university: leadData.university,
      program: leadData.program,
      source: leadData.source || 'Website'
    });
    
    console.log('Lead generation tracked:', leadData);
  };

  // Track content views
  const trackContentView = (contentData: {
    content_name: string;
    content_category: string;
    content_type?: string;
    university?: string;
    country?: string;
    program?: string;
  }) => {
    // GTM Content View
    gtm.trackViewContent(contentData);
    
    // Meta Pixel Content View
    metaPixel.trackViewContent({
      content_name: contentData.content_name,
      content_category: contentData.content_category,
      value: 0,
      currency: 'USD'
    });
    
    console.log('Content view tracked:', contentData);
  };

  // Track search events
  const trackSearch = (searchData: {
    search_term: string;
    search_category?: string;
    search_results?: number;
  }) => {
    // GTM Search
    gtm.trackSearch(searchData);
    
    // Meta Pixel Search
    metaPixel.trackSearch({
      search_string: searchData.search_term,
      content_category: searchData.search_category || 'Education'
    });
    
    console.log('Search tracked:', searchData);
  };

  // Track user engagement
  const trackEngagement = (engagementData: {
    engagement_type: string;
    engagement_value?: number;
    engagement_duration?: number;
    page_section?: string;
  }) => {
    gtm.trackEngagement(engagementData);
    console.log('Engagement tracked:', engagementData);
  };

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackEvent = trackEvent;
      (window as any).trackFormSubmission = trackFormSubmission;
      (window as any).trackLeadGeneration = trackLeadGeneration;
      (window as any).trackContentView = trackContentView;
      (window as any).trackSearch = trackSearch;
      (window as any).trackEngagement = trackEngagement;
    }
  }, []);

  return null; // This component doesn't render anything
}

// Hook for using enhanced tracking
export const useEnhancedTracking = () => {
  return {
    trackEvent: typeof window !== 'undefined' ? (window as any).trackEvent : () => {},
    trackFormSubmission: typeof window !== 'undefined' ? (window as any).trackFormSubmission : () => {},
    trackLeadGeneration: typeof window !== 'undefined' ? (window as any).trackLeadGeneration : () => {},
    trackContentView: typeof window !== 'undefined' ? (window as any).trackContentView : () => {},
    trackSearch: typeof window !== 'undefined' ? (window as any).trackSearch : () => {},
    trackEngagement: typeof window !== 'undefined' ? (window as any).trackEngagement : () => {}
  };
};
