'use client';

import React, { useEffect, useCallback, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMetaConversionsAPI } from './MetaConversionsAPI';

interface TrackingData {
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  customData?: {
    [key: string]: any;
  };
}

interface ComprehensiveTrackingProps {
  children: React.ReactNode;
  pageData?: {
    page_type?: string;
    category?: string;
    destination?: string;
    university?: string;
    program_type?: string;
    stage?: string;
  };
}

function ComprehensiveTrackingContent({ 
  children, 
  pageData = {} 
}: ComprehensiveTrackingProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const metaAPI = useMetaConversionsAPI();

  // Track page views with enhanced data
  const trackPageView = useCallback(async () => {
    const enhancedPageData = {
      page_type: pageData.page_type || getPageTypeFromPath(pathname),
      category: pageData.category || getCategoryFromPath(pathname),
      destination: pageData.destination || getDestinationFromPath(pathname),
      university: pageData.university || getUniversityFromPath(pathname),
      program_type: pageData.program_type || getProgramTypeFromSearch(searchParams),
      stage: pageData.stage || 'page_view',
      ...pageData
    };

    await metaAPI.trackPageView(undefined, enhancedPageData);
  }, [pathname, searchParams, pageData, metaAPI]);

  // Track form submissions
  const trackFormSubmission = useCallback(async (formData: any, formType: string) => {
    const userData = {
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName || formData.name,
      lastName: formData.lastName,
      city: formData.city,
      state: formData.state,
      country: formData.country
    };

    const customData = {
      form_type: formType,
      form_name: formData.formName || `${formType}_form`,
      destination: formData.destination || formData.country,
      study_level: formData.studyLevel || formData.level,
      program_type: formData.programType || formData.program,
      lead_source: formData.source || 'website',
      lead_quality: formData.quality || 'medium',
      ...formData
    };

    // Track as Lead event
    await metaAPI.trackLead(userData, customData);

    // Track as Contact event if it's a contact form
    if (formType === 'contact' || formType === 'consultation') {
      await metaAPI.trackContact(userData, {
        ...customData,
        contact_method: 'form',
        inquiry_type: formData.inquiryType || 'general'
      });
    }
  }, [metaAPI]);

  // Track content views
  const trackContentView = useCallback(async (contentData: any) => {
    await metaAPI.trackViewContent(undefined, {
      content_name: contentData.name || document.title,
      content_category: contentData.category || 'Education',
      content_type: contentData.type || 'page',
      page_type: contentData.pageType || getPageTypeFromPath(pathname),
      destination_country: contentData.destination,
      university_name: contentData.university,
      program_type: contentData.programType,
      content_engagement_score: contentData.engagementScore || 1,
      ...contentData
    });
  }, [pathname, metaAPI]);

  // Track searches
  const trackSearch = useCallback(async (searchData: any) => {
    if (searchData.type === 'university') {
      await metaAPI.trackUniversitySearch(undefined, {
        search_query: searchData.query,
        destination: searchData.destination,
        studyLevel: searchData.studyLevel,
        programField: searchData.programField,
        results_count: searchData.resultsCount,
        filters: searchData.filters,
        ...searchData
      });
    } else {
      await metaAPI.trackFindLocation(undefined, {
        search_query: searchData.query,
        destination: searchData.destination,
        search_type: searchData.type || 'destination_search',
        results_count: searchData.resultsCount,
        ...searchData
      });
    }
  }, [metaAPI]);

  // Track scholarship views
  const trackScholarshipView = useCallback(async (scholarshipData: any) => {
    await metaAPI.trackScholarshipView(undefined, {
      scholarship_ids: scholarshipData.ids,
      type: scholarshipData.type,
      amount: scholarshipData.amount,
      destination: scholarshipData.destination,
      studyLevel: scholarshipData.studyLevel,
      eligibility: scholarshipData.eligibility,
      deadline: scholarshipData.deadline,
      ...scholarshipData
    });
  }, [metaAPI]);

  // Track visa consultations
  const trackVisaConsultation = useCallback(async (visaData: any) => {
    await metaAPI.trackVisaConsultation(undefined, {
      visa_type: visaData.type,
      destination: visaData.destination,
      studyLevel: visaData.studyLevel,
      consultation_type: visaData.consultationType || 'initial',
      urgency: visaData.urgency || 'high',
      previous_history: visaData.previousHistory,
      processing_time: visaData.processingTime,
      ...visaData
    });
  }, [metaAPI]);

  // Track application submissions
  const trackApplicationSubmission = useCallback(async (applicationData: any) => {
    await metaAPI.trackSubmitApplication(undefined, {
      university_ids: applicationData.universityIds,
      type: applicationData.type || 'university_application',
      destination: applicationData.destination,
      studyLevel: applicationData.studyLevel,
      programField: applicationData.programField,
      universities_count: applicationData.universitiesCount || 1,
      ...applicationData
    });
  }, [metaAPI]);

  // Track destination comparisons
  const trackDestinationComparison = useCallback(async (comparisonData: any) => {
    await metaAPI.trackDestinationComparison(undefined, {
      destinations: comparisonData.destinations,
      criteria: comparisonData.criteria,
      studyLevel: comparisonData.studyLevel,
      programField: comparisonData.programField,
      budget_range: comparisonData.budgetRange,
      duration_seconds: comparisonData.durationSeconds,
      preference_score: comparisonData.preferenceScore,
      ...comparisonData
    });
  }, [metaAPI]);

  // Track program recommendations
  const trackProgramRecommendation = useCallback(async (recommendationData: any) => {
    await metaAPI.trackProgramRecommendation(undefined, {
      programs: recommendationData.programs,
      algorithm: recommendationData.algorithm,
      match_score: recommendationData.matchScore,
      destination: recommendationData.destination,
      studyLevel: recommendationData.studyLevel,
      programField: recommendationData.programField,
      confidence: recommendationData.confidence,
      interaction_type: recommendationData.interactionType,
      ...recommendationData
    });
  }, [metaAPI]);

  // Initialize tracking on mount and pathname change
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Expose tracking functions to child components
  const trackingFunctions = {
    trackFormSubmission,
    trackContentView,
    trackSearch,
    trackScholarshipView,
    trackVisaConsultation,
    trackApplicationSubmission,
    trackDestinationComparison,
    trackProgramRecommendation
  };

  // Helper functions
  function getPageTypeFromPath(path: string): string {
    if (path.includes('/destinations/')) return 'destination_page';
    if (path.includes('/universities/')) return 'university_page';
    if (path.includes('/services/')) return 'service_page';
    if (path.includes('/scholarships')) return 'scholarship_page';
    if (path.includes('/contact')) return 'contact_page';
    if (path.includes('/about')) return 'about_page';
    if (path.includes('/b2b')) return 'b2b_page';
    return 'general_page';
  }

  function getCategoryFromPath(path: string): string {
    if (path.includes('/destinations')) return 'destinations';
    if (path.includes('/universities')) return 'universities';
    if (path.includes('/services')) return 'services';
    if (path.includes('/scholarships')) return 'scholarships';
    if (path.includes('/contact')) return 'contact';
    if (path.includes('/about')) return 'about';
    if (path.includes('/b2b')) return 'b2b';
    return 'general';
  }

  function getDestinationFromPath(path: string): string | undefined {
    const destinationMap: { [key: string]: string } = {
      'uk': 'United Kingdom',
      'usa': 'United States',
      'canada': 'Canada',
      'australia': 'Australia',
      'china': 'China',
      'south-korea': 'South Korea',
      'hungary': 'Hungary',
      'croatia': 'Croatia',
      'cyprus': 'Cyprus',
      'georgia': 'Georgia',
      'finland': 'Finland'
    };

    for (const [key, value] of Object.entries(destinationMap)) {
      if (path.includes(key)) return value;
    }
    return undefined;
  }

  function getUniversityFromPath(path: string): string | undefined {
    const universityMatch = path.match(/\/universities\/([^\/]+)/);
    return universityMatch ? decodeURIComponent(universityMatch[1]) : undefined;
  }

  function getProgramTypeFromSearch(params: URLSearchParams): string | undefined {
    return params.get('program') || params.get('programType') || undefined;
  }

  return (
    <div data-tracking-context={JSON.stringify(trackingFunctions)}>
      {children}
    </div>
  );
}

export default function ComprehensiveTracking({ 
  children, 
  pageData = {} 
}: ComprehensiveTrackingProps) {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <ComprehensiveTrackingContent pageData={pageData}>
        {children}
      </ComprehensiveTrackingContent>
    </Suspense>
  );
}

// Hook to access tracking functions
export const useTracking = () => {
  const trackingContext = document.querySelector('[data-tracking-context]');
  if (trackingContext) {
    return JSON.parse(trackingContext.getAttribute('data-tracking-context') || '{}');
  }
  return {};
};
