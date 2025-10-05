'use client';

import { metaConversionsAPI } from './MetaConversionsAPI';

// Education-specific custom audience creation and management
export class EducationCustomAudiences {
  
  // Create custom audience based on education interests
  static async createEducationInterestAudience(audienceData: {
    name: string;
    description: string;
    destinationCountries: string[];
    studyLevels: string[];
    programTypes: string[];
    programFields?: string[];
    budgetRange?: 'low' | 'medium' | 'high';
    urgencyLevel?: 'high' | 'medium' | 'low';
    leadQuality?: 'high' | 'medium' | 'low';
    timeFrame?: 'immediate' | '3_months' | '6_months' | '1_year';
  }) {
    try {
      // Track audience creation event
      await metaConversionsAPI.trackCustomEducationEvent('CustomAudienceCreated', undefined, {
        content_name: 'Education Interest Audience Created',
        content_category: 'Education',
        content_type: 'audience_creation',
        value: 1,
        currency: 'USD',
        
        // Audience-specific parameters
        audience_name: audienceData.name,
        destination_countries: audienceData.destinationCountries.join(', '),
        study_levels: audienceData.studyLevels.join(', '),
        program_types: audienceData.programTypes.join(', '),
        program_fields: audienceData.programFields?.join(', '),
        budget_range: audienceData.budgetRange,
        urgency_level: audienceData.urgencyLevel,
        lead_quality: audienceData.leadQuality,
        time_frame: audienceData.timeFrame,
        
        // Metadata
        audience_type: 'education_interest',
        creation_method: 'automated',
        timestamp: new Date().toISOString(),
      });

      console.log('✅ Education interest audience created:', {
        name: audienceData.name,
        destinations: audienceData.destinationCountries,
        studyLevels: audienceData.studyLevels,
      });

      return {
        success: true,
        audienceName: audienceData.name,
        audienceData,
      };
    } catch (error) {
      console.error('❌ Education interest audience creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Create custom audience based on lead behavior
  static async createLeadBehaviorAudience(audienceData: {
    name: string;
    description: string;
    behaviorType: 'form_submissions' | 'page_views' | 'content_engagement' | 'consultation_requests';
    destinationCountries?: string[];
    studyLevels?: string[];
    programTypes?: string[];
    engagementScore?: number; // Minimum engagement score
    timeWindow?: '7_days' | '30_days' | '90_days' | '180_days';
    leadStatus?: 'new' | 'contacted' | 'qualified' | 'application_submitted';
  }) {
    try {
      await metaConversionsAPI.trackCustomEducationEvent('LeadBehaviorAudienceCreated', undefined, {
        content_name: 'Lead Behavior Audience Created',
        content_category: 'Education',
        content_type: 'audience_creation',
        value: 1,
        currency: 'USD',
        
        // Behavior-specific parameters
        audience_name: audienceData.name,
        behavior_type: audienceData.behaviorType,
        destination_countries: audienceData.destinationCountries?.join(', '),
        study_levels: audienceData.studyLevels?.join(', '),
        program_types: audienceData.programTypes?.join(', '),
        engagement_score: audienceData.engagementScore,
        time_window: audienceData.timeWindow,
        lead_status: audienceData.leadStatus,
        
        // Metadata
        audience_type: 'lead_behavior',
        creation_method: 'automated',
        timestamp: new Date().toISOString(),
      });

      console.log('✅ Lead behavior audience created:', {
        name: audienceData.name,
        behaviorType: audienceData.behaviorType,
        timeWindow: audienceData.timeWindow,
      });

      return {
        success: true,
        audienceName: audienceData.name,
        audienceData,
      };
    } catch (error) {
      console.error('❌ Lead behavior audience creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Create custom audience based on application status
  static async createApplicationStatusAudience(audienceData: {
    name: string;
    description: string;
    applicationStatus: 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
    destinationCountries?: string[];
    studyLevels?: string[];
    programTypes?: string[];
    universities?: string[];
    applicationDateRange?: {
      start: string;
      end: string;
    };
  }) {
    try {
      await metaConversionsAPI.trackCustomEducationEvent('ApplicationStatusAudienceCreated', undefined, {
        content_name: 'Application Status Audience Created',
        content_category: 'Education',
        content_type: 'audience_creation',
        value: 1,
        currency: 'USD',
        
        // Application-specific parameters
        audience_name: audienceData.name,
        application_status: audienceData.applicationStatus,
        destination_countries: audienceData.destinationCountries?.join(', '),
        study_levels: audienceData.studyLevels?.join(', '),
        program_types: audienceData.programTypes?.join(', '),
        universities: audienceData.universities?.join(', '),
        application_date_start: audienceData.applicationDateRange?.start,
        application_date_end: audienceData.applicationDateRange?.end,
        
        // Metadata
        audience_type: 'application_status',
        creation_method: 'automated',
        timestamp: new Date().toISOString(),
      });

      console.log('✅ Application status audience created:', {
        name: audienceData.name,
        applicationStatus: audienceData.applicationStatus,
        universities: audienceData.universities?.length || 0,
      });

      return {
        success: true,
        audienceName: audienceData.name,
        audienceData,
      };
    } catch (error) {
      console.error('❌ Application status audience creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Create custom audience based on service purchases
  static async createServicePurchaseAudience(audienceData: {
    name: string;
    description: string;
    serviceTypes: ('consultation' | 'application_assistance' | 'visa_guidance' | 'document_review' | 'package')[];
    purchaseValue?: {
      min: number;
      max: number;
    };
    purchaseDateRange?: {
      start: string;
      end: string;
    };
    destinationCountries?: string[];
    studyLevels?: string[];
    programTypes?: string[];
  }) {
    try {
      await metaConversionsAPI.trackCustomEducationEvent('ServicePurchaseAudienceCreated', undefined, {
        content_name: 'Service Purchase Audience Created',
        content_category: 'Education',
        content_type: 'audience_creation',
        value: 1,
        currency: 'USD',
        
        // Purchase-specific parameters
        audience_name: audienceData.name,
        service_types: audienceData.serviceTypes.join(', '),
        purchase_value_min: audienceData.purchaseValue?.min,
        purchase_value_max: audienceData.purchaseValue?.max,
        purchase_date_start: audienceData.purchaseDateRange?.start,
        purchase_date_end: audienceData.purchaseDateRange?.end,
        destination_countries: audienceData.destinationCountries?.join(', '),
        study_levels: audienceData.studyLevels?.join(', '),
        program_types: audienceData.programTypes?.join(', '),
        
        // Metadata
        audience_type: 'service_purchase',
        creation_method: 'automated',
        timestamp: new Date().toISOString(),
      });

      console.log('✅ Service purchase audience created:', {
        name: audienceData.name,
        serviceTypes: audienceData.serviceTypes,
        valueRange: audienceData.purchaseValue,
      });

      return {
        success: true,
        audienceName: audienceData.name,
        audienceData,
      };
    } catch (error) {
      console.error('❌ Service purchase audience creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Create lookalike audience based on high-value leads
  static async createLookalikeAudience(audienceData: {
    name: string;
    description: string;
    sourceAudience: string; // Name of the source audience
    lookalikePercentage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 1% to 10%
    destinationCountries?: string[];
    studyLevels?: string[];
    programTypes?: string[];
    leadQuality?: 'high' | 'medium' | 'low';
  }) {
    try {
      await metaConversionsAPI.trackCustomEducationEvent('LookalikeAudienceCreated', undefined, {
        content_name: 'Lookalike Audience Created',
        content_category: 'Education',
        content_type: 'audience_creation',
        value: 1,
        currency: 'USD',
        
        // Lookalike-specific parameters
        audience_name: audienceData.name,
        source_audience: audienceData.sourceAudience,
        lookalike_percentage: audienceData.lookalikePercentage,
        destination_countries: audienceData.destinationCountries?.join(', '),
        study_levels: audienceData.studyLevels?.join(', '),
        program_types: audienceData.programTypes?.join(', '),
        lead_quality: audienceData.leadQuality,
        
        // Metadata
        audience_type: 'lookalike',
        creation_method: 'automated',
        timestamp: new Date().toISOString(),
      });

      console.log('✅ Lookalike audience created:', {
        name: audienceData.name,
        sourceAudience: audienceData.sourceAudience,
        percentage: audienceData.lookalikePercentage,
      });

      return {
        success: true,
        audienceName: audienceData.name,
        audienceData,
      };
    } catch (error) {
      console.error('❌ Lookalike audience creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Track audience performance
  static async trackAudiencePerformance(audienceData: {
    audienceName: string;
    audienceType: string;
    performanceMetrics: {
      reach: number;
      impressions: number;
      clicks: number;
      conversions: number;
      cost: number;
      ctr: number;
      cpc: number;
      cpa: number;
    };
    timePeriod: string;
  }) {
    try {
      await metaConversionsAPI.trackCustomEducationEvent('AudiencePerformanceTracked', undefined, {
        content_name: 'Audience Performance Tracked',
        content_category: 'Education',
        content_type: 'audience_analytics',
        value: audienceData.performanceMetrics.conversions,
        currency: 'USD',
        
        // Performance-specific parameters
        audience_name: audienceData.audienceName,
        audience_type: audienceData.audienceType,
        reach: audienceData.performanceMetrics.reach,
        impressions: audienceData.performanceMetrics.impressions,
        clicks: audienceData.performanceMetrics.clicks,
        conversions: audienceData.performanceMetrics.conversions,
        cost: audienceData.performanceMetrics.cost,
        ctr: audienceData.performanceMetrics.ctr,
        cpc: audienceData.performanceMetrics.cpc,
        cpa: audienceData.performanceMetrics.cpa,
        time_period: audienceData.timePeriod,
        
        // Metadata
        tracking_type: 'audience_performance',
        timestamp: new Date().toISOString(),
      });

      console.log('✅ Audience performance tracked:', {
        audienceName: audienceData.audienceName,
        conversions: audienceData.performanceMetrics.conversions,
        cpa: audienceData.performanceMetrics.cpa,
      });

      return {
        success: true,
        performanceData: audienceData.performanceMetrics,
      };
    } catch (error) {
      console.error('❌ Audience performance tracking error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get predefined education audience templates
  static getEducationAudienceTemplates() {
    return {
      highValueLeads: {
        name: 'High-Value Education Leads',
        description: 'Leads interested in premium destinations with high engagement',
        destinationCountries: ['UK', 'USA', 'Canada', 'Australia'],
        studyLevels: ['Masters', 'PhD'],
        programTypes: ['Business', 'Engineering', 'Medicine', 'Law'],
        budgetRange: 'high' as const,
        urgencyLevel: 'high' as const,
        leadQuality: 'high' as const,
      },
      
      undergraduateInterested: {
        name: 'Undergraduate Study Abroad',
        description: 'Students interested in undergraduate programs',
        destinationCountries: ['UK', 'USA', 'Canada', 'Australia', 'Germany'],
        studyLevels: ['Bachelor'],
        programTypes: ['Engineering', 'Business', 'Arts', 'Sciences'],
        budgetRange: 'medium' as const,
        urgencyLevel: 'medium' as const,
        leadQuality: 'medium' as const,
      },
      
      scholarshipSeekers: {
        name: 'Scholarship Seekers',
        description: 'Students looking for scholarship opportunities',
        destinationCountries: ['UK', 'USA', 'Canada', 'Australia', 'Germany'],
        studyLevels: ['Bachelor', 'Masters', 'PhD'],
        programTypes: ['All'],
        budgetRange: 'low' as const,
        urgencyLevel: 'high' as const,
        leadQuality: 'high' as const,
      },
      
      visaAssistanceNeeded: {
        name: 'Visa Assistance Required',
        description: 'Students who need visa guidance and support',
        destinationCountries: ['UK', 'USA', 'Canada', 'Australia'],
        studyLevels: ['Bachelor', 'Masters', 'PhD'],
        programTypes: ['All'],
        urgencyLevel: 'high' as const,
        leadQuality: 'high' as const,
      },
    };
  }
}

export default EducationCustomAudiences;
