'use client';

import React, { useEffect } from 'react';

// Interface for enhanced lead data
interface EnhancedLeadData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  destination?: string;
  studyLevel?: string;
  programType?: string;
  source?: string;
  content_name?: string;
  value?: number;
  currency?: string;
}

// Declare global variables
declare global {
  interface Window {
    fbq: any;
    dataLayer: any[];
  }
}

// 100% FREE Server-Side Tracking
export const freeServerSideTracking = {
  // Initialize free tracking
  init: () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      console.log('FREE Server-Side Tracking initialized - $0/month cost!');
    }
  },

  // Enhanced lead tracking (FREE)
  trackEnhancedLead: async (leadData: EnhancedLeadData) => {
    if (typeof window === 'undefined') return;

    // 1. Client-side Meta Pixel (FREE - no API costs)
    if (window.fbq) {
      try {
        window.fbq('track', 'Lead', {
          content_name: leadData.content_name || 'Study Abroad Lead',
          content_category: 'Education',
          value: leadData.value || 1,
          currency: leadData.currency || 'USD',
          // Enhanced custom data for better targeting (FREE)
          custom_data: {
            destination: leadData.destination,
            study_level: leadData.studyLevel,
            program_type: leadData.programType,
            source: leadData.source,
            page_title: document.title,
            page_url: window.location.href,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            user_journey_stage: 'lead_generation',
            engagement_score: freeServerSideTracking.calculateEngagementScore(),
          }
        });
        console.log('FREE Enhanced Meta Pixel Lead tracked:', leadData);
      } catch (error) {
        console.error('Meta Pixel error:', error);
      }
    }

    // 2. Send to FREE server-side GTM for enhanced processing
    try {
      const response = await fetch('/api/gtm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: [{
            event_name: 'enhanced_lead',
            user_data: {
              email_hash: leadData.email ? freeServerSideTracking.simpleHash(leadData.email) : undefined,
              phone_hash: leadData.phone ? freeServerSideTracking.simpleHash(leadData.phone) : undefined,
              first_name: leadData.firstName,
              last_name: leadData.lastName,
            },
            custom_data: {
              ...leadData,
              enhanced_attribution: {
                page_title: document.title,
                page_url: window.location.href,
                referrer: document.referrer,
                user_agent: navigator.userAgent.substring(0, 100),
                screen_resolution: `${screen.width}x${screen.height}`,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              }
            },
            page_location: window.location.href,
            page_title: document.title,
            session_id: freeServerSideTracking.getSessionId(),
            user_journey_stage: 'lead_generation',
            engagement_score: freeServerSideTracking.calculateEngagementScore(),
          }]
        }),
      });
      
      const result = await response.json();
      console.log('FREE Server-side GTM processing result:', result);
      
    } catch (error) {
      console.error('FREE Server-side GTM error:', error);
    }

    // 3. Enhanced dataLayer event (FREE)
    window.dataLayer.push({
      event: 'free_enhanced_lead',
      event_category: 'lead_generation',
      event_label: leadData.destination || 'unknown',
      value: leadData.value || 1,
      enhanced_data: {
        ...leadData,
        processing_method: 'free_server_side',
        cost: '$0.00',
        timestamp: new Date().toISOString(),
      }
    });
  },

  // Enhanced page view tracking (FREE)
  trackEnhancedPageView: async (pageData: any = {}) => {
    if (typeof window === 'undefined') return;

    // 1. Enhanced Meta Pixel PageView (FREE)
    if (window.fbq) {
      try {
        window.fbq('track', 'PageView', {
          content_category: 'Education',
          content_name: document.title,
          custom_data: {
            page_type: pageData.page_type || 'general',
            section: pageData.section,
            destination: pageData.destination,
            program_type: pageData.program_type,
            user_journey_stage: pageData.stage || 'awareness',
            engagement_score: freeServerSideTracking.calculateEngagementScore(),
            visit_count: freeServerSideTracking.getVisitCount(),
          }
        });
        console.log('FREE Enhanced PageView tracked');
      } catch (error) {
        console.error('PageView tracking error:', error);
      }
    }

    // 2. Send to FREE server-side GTM
    try {
      await fetch('/api/gtm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: [{
            event_name: 'enhanced_page_view',
            page_data: {
              title: document.title,
              url: window.location.href,
              referrer: document.referrer,
              ...pageData,
            },
            user_context: {
              visit_count: freeServerSideTracking.getVisitCount(),
              session_duration: freeServerSideTracking.getSessionDuration(),
              pages_viewed: freeServerSideTracking.getPagesViewed(),
              engagement_score: freeServerSideTracking.calculateEngagementScore(),
            }
          }]
        }),
      });
    } catch (error) {
      console.error('Enhanced page view error:', error);
    }
  },

  // Enhanced form submission tracking (FREE)
  trackEnhancedFormSubmission: async (formData: any) => {
    if (typeof window === 'undefined') return;

    // 1. Enhanced Meta Pixel form tracking (FREE)
    if (window.fbq) {
      try {
        window.fbq('track', 'CompleteRegistration', {
          content_name: formData.form_name || 'Contact Form',
          content_category: 'Education',
          value: formData.value || 1,
          currency: 'USD',
          custom_data: {
            form_type: formData.form_type || 'lead_generation',
            destination: formData.destination,
            study_level: formData.study_level,
            program_type: formData.program_type,
            completion_time: formData.completion_time,
            field_count: formData.field_count,
            user_journey_stage: 'form_completion',
          }
        });
        console.log('FREE Enhanced Form Submission tracked');
      } catch (error) {
        console.error('Form submission tracking error:', error);
      }
    }

    // 2. Send to FREE server-side GTM
    try {
      await fetch('/api/gtm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: [{
            event_name: 'enhanced_form_submission',
            form_data: formData,
            user_context: {
              session_id: freeServerSideTracking.getSessionId(),
              engagement_score: freeServerSideTracking.calculateEngagementScore(),
              form_completion_time: formData.completion_time,
            }
          }]
        }),
      });
    } catch (error) {
      console.error('Enhanced form submission error:', error);
    }
  },

  // Utility functions (FREE)
  simpleHash: (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString();
  },

  getSessionId: (): string => {
    if (typeof window === 'undefined') return '';
    let sessionId = sessionStorage.getItem('free_session_id');
    if (!sessionId) {
      sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('free_session_id', sessionId);
    }
    return sessionId;
  },

  getVisitCount: (): number => {
    if (typeof window === 'undefined') return 1;
    const count = parseInt(localStorage.getItem('free_visit_count') || '0') + 1;
    localStorage.setItem('free_visit_count', count.toString());
    return count;
  },

  getPagesViewed: (): number => {
    if (typeof window === 'undefined') return 1;
    const count = parseInt(sessionStorage.getItem('free_pages_viewed') || '0') + 1;
    sessionStorage.setItem('free_pages_viewed', count.toString());
    return count;
  },

  getSessionDuration: (): number => {
    if (typeof window === 'undefined') return 0;
    const startTime = parseInt(sessionStorage.getItem('free_session_start') || Date.now().toString());
    return Math.floor((Date.now() - startTime) / 1000);
  },

  calculateEngagementScore: (): number => {
    if (typeof window === 'undefined') return 0;
    
    const visitCount = freeServerSideTracking.getVisitCount();
    const pagesViewed = freeServerSideTracking.getPagesViewed();
    const sessionDuration = freeServerSideTracking.getSessionDuration();
    
    // Simple engagement score calculation
    let score = 0;
    score += Math.min(visitCount * 10, 50); // Max 50 points for visits
    score += Math.min(pagesViewed * 5, 25); // Max 25 points for pages
    score += Math.min(sessionDuration / 60 * 2, 25); // Max 25 points for time
    
    return Math.round(score);
  },

  // Test the FREE system
  testFreeTracking: async () => {
    console.log('🆓 Testing FREE Server-Side Tracking (Cost: $0.00)');
    
    await freeServerSideTracking.trackEnhancedLead({
      email: 'test@example.com',
      destination: 'United Kingdom',
      studyLevel: 'Masters',
      programType: 'Computer Science',
      source: 'FREE Server-Side Test',
      content_name: 'FREE Enhanced Lead Test',
    });

    await freeServerSideTracking.trackEnhancedPageView({
      page_type: 'test',
      section: 'free_tracking_test',
      stage: 'testing',
    });

    console.log('🎉 FREE Server-Side Tracking test completed!');
    console.log('💰 Total cost: $0.00/month');
    console.log('📊 Benefits: Enhanced data, better attribution, ad blocker resistance');
  }
};

// FREE Server-Side Tracking Provider Component
export default function FreeServerSideTrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize FREE tracking
    freeServerSideTracking.init();
    
    // Set session start time
    if (typeof window !== 'undefined' && !sessionStorage.getItem('free_session_start')) {
      sessionStorage.setItem('free_session_start', Date.now().toString());
    }
    
    // Track enhanced page view
    freeServerSideTracking.trackEnhancedPageView({
      page_type: 'initial_load',
      section: 'website',
      stage: 'page_load',
    });

    console.log('🆓 FREE Server-Side Tracking Provider initialized');
    console.log('💰 Monthly cost: $0.00');
    console.log('🚀 Enhanced tracking active!');
  }, []);

  return <>{children}</>;
}

// Hook for using FREE server-side tracking
export const useFreeServerSideTracking = () => {
  return freeServerSideTracking;
};
