// src/components/TrackLead.tsx
import { metaPixel } from './MetaPixel';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export async function trackLead(label: string, leadData?: {
  email?: string;
  phone?: string;
  countryOfInterest?: string;
  programType?: string;
  major?: string;
  message?: string;
  destination?: string;
  specificDestination?: string;
  university?: string;
  program?: string;
  source?: string;
  value?: number;
  currency?: string;
}) {
  try {
    // Track with Meta Pixel
    await metaPixel.trackLead({
      content_name: label,
      content_category: 'Education',
      value: leadData?.value || 1,
      currency: leadData?.currency || 'USD',
      email: leadData?.email,
      phone: leadData?.phone,
      destination: leadData?.countryOfInterest,
      university: leadData?.university,
      program: leadData?.programType || leadData?.program,
      source: leadData?.source || 'Website'
    });

    // Track with Google Analytics (if available)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 
      event: 'generate_lead', 
      label,
      lead_data: leadData
    });

    console.log('Lead tracked successfully:', { label, leadData });
  } catch (error) {
    console.error('Error tracking lead:', error);
  }
}

// Additional tracking functions for different lead types
export async function trackFormSubmission(formName: string, formData?: Record<string, any>) {
  try {
    await metaPixel.trackFormSubmission({
      form_name: formName,
      form_type: 'Lead Generation',
      content_name: `${formName} Form Submission`,
      value: 1,
      currency: 'USD'
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 
      event: 'form_submit', 
      form_name: formName,
      form_data: formData
    });

    console.log('Form submission tracked:', { formName, formData });
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
}

export async function trackViewContent(contentName: string, contentData?: {
  content_category?: string;
  content_ids?: string[];
  value?: number;
}) {
  try {
    await metaPixel.trackViewContent({
      content_name: contentName,
      content_category: contentData?.content_category || 'Education',
      content_ids: contentData?.content_ids || [],
      value: contentData?.value || 0,
      currency: 'USD'
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 
      event: 'view_content', 
      content_name: contentName,
      content_data: contentData
    });

    console.log('Content view tracked:', { contentName, contentData });
  } catch (error) {
    console.error('Error tracking content view:', error);
  }
}

export async function trackSearch(searchTerm: string, category?: string) {
  try {
    await metaPixel.trackSearch({
      search_string: searchTerm,
      content_category: category || 'Education'
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 
      event: 'search', 
      search_term: searchTerm,
      category: category
    });

    console.log('Search tracked:', { searchTerm, category });
  } catch (error) {
    console.error('Error tracking search:', error);
  }
}
  