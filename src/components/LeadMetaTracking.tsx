'use client';

import { metaPixel } from './MetaPixel';
import { metaConversionsAPI } from './MetaConversionsAPI';

export interface LeadTrackingData {
  leadId: string;
  name: string;
  email: string;
  phone?: string;
  countryOfInterest?: string;
  programType?: string;
  major?: string;
  source?: string;
  status?: string;
  previousStatus?: string;
  value?: number;
  currency?: string;
  notes?: string;
}

export interface B2BLeadTrackingData {
  leadId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  industry?: string;
  country?: string;
  services?: string[];
  source?: string;
  status?: string;
  dealStage?: string;
  priority?: string;
  value?: number;
  currency?: string;
}

class LeadMetaTracking {
  // Track lead creation
  static async trackLeadCreation(leadData: LeadTrackingData) {
    try {
      // Client-side Meta Pixel tracking
      metaPixel.trackLead({
        content_name: 'Lead Generated',
        content_category: 'Education',
        value: leadData.value || 1,
        currency: leadData.currency || 'USD',
        email: leadData.email,
        phone: leadData.phone,
        destination: leadData.countryOfInterest,
        program: leadData.programType,
        source: leadData.source || 'Website'
      });

      // Server-side Meta Conversions API tracking
      await metaConversionsAPI.sendEvent(
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          action_source: 'website'
        },
        {
          email: leadData.email,
          phone: leadData.phone,
          first_name: leadData.name.split(' ')[0],
          last_name: leadData.name.split(' ').slice(1).join(' ') || '',
          country: leadData.countryOfInterest
        },
        {
          content_name: 'Lead Generated',
          content_category: 'Education',
          content_type: 'lead',
          value: leadData.value || 1,
          currency: leadData.currency || 'USD',
          destination: leadData.countryOfInterest,
          program_type: leadData.programType,
          major: leadData.major,
          source: leadData.source,
          lead_id: leadData.leadId
        }
      );

      console.log('✅ Lead creation tracked successfully:', leadData.leadId);
    } catch (error) {
      console.error('❌ Lead creation tracking error:', error);
    }
  }

  // Track B2B lead creation
  static async trackB2BLeadCreation(leadData: B2BLeadTrackingData) {
    try {
      // Client-side Meta Pixel tracking
      metaPixel.trackLead({
        content_name: 'B2B Lead Generated',
        content_category: 'Business Partnership',
        value: leadData.value || 5,
        currency: leadData.currency || 'USD',
        email: leadData.email,
        phone: leadData.phone,
        source: leadData.source || 'B2B Form'
      });

      // Server-side Meta Conversions API tracking
      await metaConversionsAPI.sendEvent(
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          action_source: 'website'
        },
        {
          email: leadData.email,
          phone: leadData.phone,
          first_name: leadData.contactPerson.split(' ')[0],
          last_name: leadData.contactPerson.split(' ').slice(1).join(' ') || '',
          country: leadData.country
        },
        {
          content_name: 'B2B Lead Generated',
          content_category: 'Business Partnership',
          content_type: 'b2b_lead',
          value: leadData.value || 5,
          currency: leadData.currency || 'USD',
          company_name: leadData.companyName,
          industry: leadData.industry,
          country: leadData.country,
          services: leadData.services?.join(', '),
          source: leadData.source,
          lead_id: leadData.leadId,
          deal_stage: leadData.dealStage,
          priority: leadData.priority
        }
      );

      console.log('✅ B2B Lead creation tracked successfully:', leadData.leadId);
    } catch (error) {
      console.error('❌ B2B Lead creation tracking error:', error);
    }
  }

  // Track lead status update
  static async trackLeadStatusUpdate(leadData: LeadTrackingData) {
    try {
      const isConversion = leadData.status === 'Converted' || leadData.status === 'Enrolled';
      const eventValue = isConversion ? 10 : 1;

      // Client-side Meta Pixel tracking
      metaPixel.trackCustomEvent('LeadStatusUpdated', {
        content_name: `Lead Status Updated: ${leadData.status}`,
        content_category: 'Lead Management',
        lead_id: leadData.leadId,
        previous_status: leadData.previousStatus,
        new_status: leadData.status,
        lead_name: leadData.name,
        lead_email: leadData.email,
        destination: leadData.countryOfInterest,
        program: leadData.programType,
        value: eventValue,
        currency: leadData.currency || 'USD'
      });

      // Server-side Meta Conversions API tracking
      await metaConversionsAPI.sendEvent(
        {
          event_name: isConversion ? 'Purchase' : 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          action_source: 'website'
        },
        {
          email: leadData.email,
          phone: leadData.phone,
          first_name: leadData.name.split(' ')[0],
          last_name: leadData.name.split(' ').slice(1).join(' ') || '',
          country: leadData.countryOfInterest
        },
        {
          content_name: `Lead Status Updated: ${leadData.status}`,
          content_category: 'Lead Management',
          content_type: 'lead_status_update',
          value: eventValue,
          currency: leadData.currency || 'USD',
          destination: leadData.countryOfInterest,
          program_type: leadData.programType,
          major: leadData.major,
          source: leadData.source,
          lead_id: leadData.leadId,
          previous_status: leadData.previousStatus,
          new_status: leadData.status,
          status_change_reason: leadData.notes || 'Status updated by admin'
        }
      );

      console.log('✅ Lead status update tracked successfully:', leadData.leadId);
    } catch (error) {
      console.error('❌ Lead status update tracking error:', error);
    }
  }

  // Track admin page views
  static trackAdminPageView(pageType: string, additionalData: Record<string, any> = {}) {
    try {
      metaPixel.trackCustomEvent('AdminPageView', {
        content_name: `Admin ${pageType} Management`,
        content_category: 'Admin Dashboard',
        page_type: pageType.toLowerCase().replace(/\s+/g, '_'),
        ...additionalData
      });

      console.log('✅ Admin page view tracked:', pageType);
    } catch (error) {
      console.error('❌ Admin page view tracking error:', error);
    }
  }

  // Track lead management actions
  static trackLeadAction(action: string, leadData: Partial<LeadTrackingData>, additionalData: Record<string, any> = {}) {
    try {
      metaPixel.trackCustomEvent('LeadAction', {
        content_name: `Lead ${action}`,
        content_category: 'Lead Management',
        action_type: action.toLowerCase(),
        lead_id: leadData.leadId,
        lead_name: leadData.name,
        lead_email: leadData.email,
        destination: leadData.countryOfInterest,
        program: leadData.programType,
        value: 1,
        currency: 'USD',
        ...additionalData
      });

      console.log('✅ Lead action tracked:', action, leadData.leadId);
    } catch (error) {
      console.error('❌ Lead action tracking error:', error);
    }
  }

  // Track form submissions
  static trackFormSubmission(formType: string, formData: Record<string, any>) {
    try {
      metaPixel.trackFormSubmission({
        form_name: formType,
        form_type: 'Lead Generation',
        content_name: `${formType} Form Submission`,
        value: 1,
        currency: 'USD',
        ...formData
      });

      console.log('✅ Form submission tracked:', formType);
    } catch (error) {
      console.error('❌ Form submission tracking error:', error);
    }
  }
}

export default LeadMetaTracking;
