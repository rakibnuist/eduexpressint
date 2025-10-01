'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { metaPixel } from '@/components/MetaPixel';

// Page tracking configuration
const PAGE_TRACKING_CONFIG = {
  // Homepage
  '/': {
    event: 'ViewContent',
    data: {
      content_name: 'Homepage',
      content_category: 'Landing Page',
      content_ids: ['homepage']
    }
  },
  
  // About page
  '/about': {
    event: 'ViewContent',
    data: {
      content_name: 'About Us',
      content_category: 'Company Information',
      content_ids: ['about']
    }
  },
  
  // Contact page
  '/contact': {
    event: 'ViewContent',
    data: {
      content_name: 'Contact Page',
      content_category: 'Contact',
      content_ids: ['contact']
    }
  },
  
  // Services pages
  '/services': {
    event: 'ViewContent',
    data: {
      content_name: 'Services Overview',
      content_category: 'Services',
      content_ids: ['services']
    }
  },
  '/services/university-applications': {
    event: 'ViewContent',
    data: {
      content_name: 'University Applications Service',
      content_category: 'Services',
      content_ids: ['university-applications']
    }
  },
  '/services/visa-assistance': {
    event: 'ViewContent',
    data: {
      content_name: 'Visa Assistance Service',
      content_category: 'Services',
      content_ids: ['visa-assistance']
    }
  },
  '/services/scholarship-support': {
    event: 'ViewContent',
    data: {
      content_name: 'Scholarship Support Service',
      content_category: 'Services',
      content_ids: ['scholarship-support']
    }
  },
  '/services/career-guidance': {
    event: 'ViewContent',
    data: {
      content_name: 'Career Guidance Service',
      content_category: 'Services',
      content_ids: ['career-guidance']
    }
  },
  
  // Destinations pages
  '/destinations': {
    event: 'ViewContent',
    data: {
      content_name: 'Study Destinations',
      content_category: 'Destinations',
      content_ids: ['destinations-overview']
    }
  },
  '/destinations/china': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in China',
      content_category: 'Destinations',
      content_ids: ['china']
    }
  },
  '/destinations/croatia': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in Croatia',
      content_category: 'Destinations',
      content_ids: ['croatia']
    }
  },
  '/destinations/cyprus': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in Cyprus',
      content_category: 'Destinations',
      content_ids: ['cyprus']
    }
  },
  '/destinations/finland': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in Finland',
      content_category: 'Destinations',
      content_ids: ['finland']
    }
  },
  '/destinations/georgia': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in Georgia',
      content_category: 'Destinations',
      content_ids: ['georgia']
    }
  },
  '/destinations/hungary': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in Hungary',
      content_category: 'Destinations',
      content_ids: ['hungary']
    }
  },
  '/destinations/netherlands': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in Netherlands',
      content_category: 'Destinations',
      content_ids: ['netherlands']
    }
  },
  '/destinations/south-korea': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in South Korea',
      content_category: 'Destinations',
      content_ids: ['south-korea']
    }
  },
  '/destinations/uk': {
    event: 'ViewContent',
    data: {
      content_name: 'Study in UK',
      content_category: 'Destinations',
      content_ids: ['uk']
    }
  },
  
  // Universities pages
  '/universities': {
    event: 'ViewContent',
    data: {
      content_name: 'Universities',
      content_category: 'Universities',
      content_ids: ['universities-overview']
    }
  },
  
  // Success stories
  '/success-stories': {
    event: 'ViewContent',
    data: {
      content_name: 'Success Stories',
      content_category: 'Testimonials',
      content_ids: ['success-stories']
    }
  },
  
  // B2B page
  '/b2b': {
    event: 'ViewContent',
    data: {
      content_name: 'B2B Partnerships',
      content_category: 'Business',
      content_ids: ['b2b']
    }
  },
  
  // Scholarships page
  '/scholarships': {
    event: 'ViewContent',
    data: {
      content_name: 'Scholarships',
      content_category: 'Financial Aid',
      content_ids: ['scholarships']
    }
  },
  
  // Updates page
  '/update': {
    event: 'ViewContent',
    data: {
      content_name: 'Latest Updates',
      content_category: 'News',
      content_ids: ['updates']
    }
  }
};

// Custom hook for page tracking
export const usePageTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Wait a bit for the page to fully load
    const timer = setTimeout(() => {
      const trackingConfig = PAGE_TRACKING_CONFIG[pathname as keyof typeof PAGE_TRACKING_CONFIG];
      
      if (trackingConfig) {
        if (trackingConfig.event === 'ViewContent') {
          metaPixel.trackViewContent(trackingConfig.data);
        } else {
          metaPixel.trackCustomEvent(trackingConfig.event, trackingConfig.data);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return {
    trackCustomEvent: metaPixel.trackCustomEvent,
    trackLead: metaPixel.trackLead,
    trackFormSubmission: metaPixel.trackFormSubmission,
    trackViewContent: metaPixel.trackViewContent,
    trackSearch: metaPixel.trackSearch,
    trackAddToCart: metaPixel.trackAddToCart
  };
};

// Hook for university page tracking (dynamic routes)
export const useUniversityTracking = (universityId: string, universityName: string) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      metaPixel.trackViewContent({
        content_name: `University: ${universityName}`,
        content_category: 'Universities',
        content_ids: [universityId],
        value: 0,
        currency: 'USD'
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [universityId, universityName]);
};

// Hook for form tracking
export const useFormTracking = () => {
  const trackFormSubmission = (formData: {
    form_name?: string;
    form_type?: string;
    content_name?: string;
    value?: number;
    currency?: string;
    email?: string;
    phone?: string;
    destination?: string;
    university?: string;
    program?: string;
    source?: string;
  }) => {
    // Track both form submission and lead
    metaPixel.trackFormSubmission({
      form_name: formData.form_name,
      form_type: formData.form_type,
      content_name: formData.content_name,
      value: formData.value,
      currency: formData.currency
    });

    metaPixel.trackLead({
      content_name: formData.content_name || 'Form Submission',
      content_category: 'Lead Generation',
      value: formData.value || 1,
      currency: formData.currency || 'USD',
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination,
      university: formData.university,
      program: formData.program,
      source: formData.source || 'Website'
    });
  };

  return { trackFormSubmission };
};

// Hook for search tracking
export const useSearchTracking = () => {
  const trackSearch = (searchTerm: string, category?: string) => {
    metaPixel.trackSearch({
      search_string: searchTerm,
      content_category: category || 'Education'
    });
  };

  return { trackSearch };
};

// Hook for interest tracking (like "Add to Cart" for programs)
export const useInterestTracking = () => {
  const trackInterest = (interestData: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
    destination?: string;
    university?: string;
    program?: string;
  }) => {
    metaPixel.trackAddToCart({
      content_name: interestData.content_name || 'Program Interest',
      content_category: interestData.content_category || 'Education',
      content_ids: interestData.content_ids || [],
      value: interestData.value || 0,
      currency: interestData.currency || 'USD'
    });

    // Also track as a custom event for more specific tracking
    metaPixel.trackCustomEvent('ProgramInterest', {
      destination: interestData.destination,
      university: interestData.university,
      program: interestData.program,
      content_name: interestData.content_name,
      value: interestData.value || 0
    });
  };

  return { trackInterest };
};
