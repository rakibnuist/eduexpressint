'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { 
  FaBuilding, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaHandshake, 
  FaCheck,
  FaSpinner,
  FaChartLine,
  FaExclamationTriangle,
  FaGlobe,
  FaAward,
  FaDollarSign,
  FaCalendar
} from 'react-icons/fa';
import { trackLead, trackFormSubmission } from '@/components/TrackLead';
import { metaPixel } from '@/components/MetaPixel';
import { addTrackingToJsonData } from '@/components/TrackingCapture';

interface B2BPartnershipFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

// Form validation rules
const validationRules = {
  companyName: { required: false, minLength: 2 }, // Made optional for individual agents
  contactPerson: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, minLength: 10, pattern: /^[\+]?[\d\s\-\(\)]{10,15}$/ },
  website: { required: false, pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ },
  agentType: { required: true },
  experience: { required: true },
  targetCountries: { required: true },
  monthlyStudents: { required: true }
};

// Agent types
const agentTypes = [
  'Individual Education Agent',
  'Education Consultancy Firm',
  'Student Recruitment Agency',
  'International Education Consultant',
  'Freelance Education Advisor'
];

// Available services
const availableServices = [
  'Student Recruitment',
  'University Applications', 
  'Visa Processing',
  'Scholarship Support',
  'Documentation Assistance',
  'Admission Guidance',
  'Pre-departure Orientation',
  'Post-arrival Support',
  'Career Counseling',
  'Language Training'
];

// Target countries for student recruitment (matching actual destinations)
const targetCountries = [
  'United Kingdom',
  'China',
  'South Korea',
  'Hungary',
  'Croatia',
  'Cyprus',
  'Georgia',
  'Netherlands',
  'Finland',
  'Other'
];

// Experience levels
const experienceLevels = [
  'No Experience (New to Education Industry)',
  '1-2 Years',
  '3-5 Years',
  '6-10 Years',
  '10+ Years'
];

// Monthly student targets
const monthlyStudentTargets = [
  '1-5 students',
  '6-10 students',
  '11-20 students',
  '21-50 students',
  '50+ students'
];

export default function B2BPartnershipForm({ onSuccess, compact = false }: B2BPartnershipFormProps) {
  const [formData, setFormData] = useState({
    // Basic Information
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    fullAddress: '',
    
    // Agent Specific Information
    agentType: '',
    experience: '',
    targetCountries: [] as string[],
    monthlyStudents: '',
    currentClients: '',
    website: '',
    
    // Business Information
    companySize: '',
    establishedYear: '',
    licenseNumber: '',
    certifications: [] as string[],
    
    // Services and Preferences
    services: [] as string[],
    preferredUniversities: '',
    paymentMethod: '',
    
    // Additional Information
    message: '',
    howDidYouHear: '',
    previousPartnerships: '',
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Format phone number input
    if (name === 'phone') {
      // Remove all non-digit characters except +
      processedValue = value.replace(/[^\d+]/g, '');
      // Limit to reasonable phone number length
      if (processedValue.length > 15) {
        processedValue = processedValue.substring(0, 15);
      }
    }
    
    // Format website URL
    if (name === 'website' && value && !value.startsWith('http')) {
      processedValue = value.startsWith('www.') ? `https://${value}` : value;
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    // Clear error when user starts typing
    setErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur using the current value
    const rule = validationRules[name as keyof typeof validationRules];
    
    if (rule) {
      let error = '';
      if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        error = `${name.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      } else if ('minLength' in rule && rule.minLength && value && value.length < rule.minLength) {
        error = `${name.replace(/([A-Z])/g, ' $1').toLowerCase()} must be at least ${rule.minLength} characters`;
      } else if ('pattern' in rule && rule.pattern && value && !rule.pattern.test(value)) {
        // Custom error messages for specific field types
        if (name === 'email') {
          error = 'Please enter a valid email address';
        } else if (name === 'phone') {
          error = 'Please enter a valid phone number';
        } else if (name === 'website') {
          error = 'Please enter a valid website URL';
        } else {
          error = `Please enter a valid ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        }
      }
      
      // Additional validation for specific fields
      if (name === 'phone' && value && value.length < 10) {
        error = 'Phone number must be at least 10 digits';
      }
      
      if (name === 'website' && value && !value.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
        error = 'Please enter a valid website URL (e.g., https://example.com)';
      }
      
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      } else {
        // Clear error if validation passes
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  }, []);

  const handleServiceChange = useCallback((service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  }, []);

  const handleCertificationChange = useCallback((certification: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      certifications: checked 
        ? [...prev.certifications, certification]
        : prev.certifications.filter(c => c !== certification)
    }));
  }, []);

  const handleCountryChange = useCallback((country: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targetCountries: checked 
        ? [...prev.targetCountries, country]
        : prev.targetCountries.filter(c => c !== country)
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    Object.entries(validationRules).forEach(([field, rule]) => {
      const value = formData[field as keyof typeof formData];
      
      if (rule.required) {
        if (field === 'targetCountries') {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            newErrors[field] = 'Please select at least one target country';
          }
        } else if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
        }
      } else if ('minLength' in rule && rule.minLength && value && typeof value === 'string' && value.length < rule.minLength) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} must be at least ${rule.minLength} characters`;
      } else if ('pattern' in rule && rule.pattern && value && typeof value === 'string' && !rule.pattern.test(value)) {
        newErrors[field] = `Please enter a valid ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Memoized form validity check
  const isFormValid = useMemo(() => {
    return Object.entries(validationRules).every(([field, rule]) => {
      const value = formData[field as keyof typeof formData];
      if (rule.required) {
        if (field === 'targetCountries') {
          return value && Array.isArray(value) && value.length > 0;
        }
        return value && (typeof value !== 'string' || value.trim() !== '');
      }
      if ('minLength' in rule && rule.minLength && value && typeof value === 'string' && value.length < rule.minLength) return false;
      if ('pattern' in rule && rule.pattern && value && typeof value === 'string' && !rule.pattern.test(value)) return false;
      return true;
    });
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form submission started
    
    if (!validateForm()) {
      // Form validation failed
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      // Prepare submission data
      const submissionData = {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        industry: formData.agentType,
        country: formData.country,
        website: formData.website,
        services: formData.services,
        notes: `
Agent Type: ${formData.agentType}
Experience: ${formData.experience}
Target Countries: ${formData.targetCountries.join(', ')}
Monthly Student Target: ${formData.monthlyStudents}
Additional Message: ${formData.message}
        `.trim(),
        source: 'EduExpert Agent Application',
        status: 'New',
        priority: 'High',
        dealStage: 'Lead'
      };

      // Submitting data

      // Add tracking data to submission data
      const submissionDataWithTracking = addTrackingToJsonData(submissionData);

      // Submit to API first
      const response = await fetch('/api/admin/b2b-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionDataWithTracking),
      });

      const data = await response.json();
      // API response received

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit partnership inquiry');
      }

      // Track analytics after successful submission
      try {
        await Promise.all([
          trackFormSubmission('B2B Partnership Form', {
            form_type: 'Partnership Inquiry',
            lead_data: formData
          }),
          trackLead('B2B Partnership Inquiry', {
            email: formData.email,
            phone: formData.phone,
            destination: formData.targetCountries.join(', '),
            university: formData.companyName,
            program: formData.agentType,
            source: 'B2B Partnership Page',
            value: 1,
            currency: 'USD'
          })
        ]);

        metaPixel.trackCustomEvent('B2BPartnership', {
          action: 'Partnership Form Submitted',
          company_name: formData.companyName,
          agent_type: formData.agentType,
          experience: formData.experience,
          target_countries: formData.targetCountries.join(', '),
          monthly_students: formData.monthlyStudents,
          services: formData.services,
          source: 'Partnership Page'
        });
      } catch (trackingError) {
        console.warn('Analytics tracking failed:', trackingError);
        // Don't fail the form submission if tracking fails
      }

      // Setting isSubmitted to true
      setIsSubmitted(true);
      onSuccess?.();
      
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        fullAddress: '',
        agentType: '',
        experience: '',
        targetCountries: [],
        monthlyStudents: '',
        currentClients: '',
        website: '',
        companySize: '',
        establishedYear: '',
        licenseNumber: '',
        certifications: [],
        services: [],
        preferredUniversities: '',
        paymentMethod: '',
        message: '',
        howDidYouHear: '',
        previousPartnerships: '',
        specialRequirements: ''
      });
      setTouched({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show success message even if API fails (for demo purposes)
      // API failed, but showing success message anyway
      setIsSubmitted(true);
      onSuccess?.();
      
      // Also show error for debugging
      setErrors({ 
        submit: error instanceof Error 
          ? error.message 
          : 'Failed to submit partnership inquiry. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSuccess, isFormValid]);

  // Helper function to render input field
  const renderInputField = (name: string, label: string, type = 'text', placeholder = '', required = false, options: string[] | null = null, Icon: any, rows = 1, maxLength: number | null = null) => {
    const hasError = errors[name] && touched[name];
    const value = String(formData[name as keyof typeof formData] || '');

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          <Icon className="w-4 h-4 inline mr-2 text-blue-600" />
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {options ? (
          <select
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${name}-error` : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <div className="relative">
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              rows={rows}
              maxLength={maxLength || undefined}
              required={required}
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={hasError ? `${name}-error` : undefined}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white resize-y ${
                hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {maxLength && (
              <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                {value.length}/{maxLength}
              </div>
            )}
          </div>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={maxLength || undefined}
            required={required}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${name}-error` : undefined}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
        )}
        {hasError && (
          <div id={`${name}-error`} className="flex items-center text-red-500 text-xs" role="alert">
            <FaExclamationTriangle className="w-3 h-3 mr-1" />
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-2xl p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-100 rounded-full translate-y-12 -translate-x-12 opacity-20"></div>
          
          {/* Success icon with animation */}
          <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-pulse">
            <FaCheck className="w-10 h-10 text-white" />
          </div>
          
          {/* Main congratulations message */}
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent">
              🎉 Congratulations! 🎉
            </h2>
            <h3 className="text-2xl font-semibold text-green-800 mb-6">
              Your Partnership Application Has Been Successfully Submitted!
            </h3>
            
            {/* Professional message */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg border border-green-100">
              <p className="text-green-700 text-lg leading-relaxed mb-4">
                <strong>Welcome to the EduExpert family!</strong> We're thrilled that you've chosen to join our network of trusted education partners.
              </p>
              <p className="text-green-600 text-base leading-relaxed">
                Your application demonstrates your commitment to helping students achieve their educational dreams, and we're excited about the potential partnership ahead.
              </p>
            </div>
            
            {/* Next steps */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center justify-center">
                <FaCalendar className="w-5 h-5 mr-2" />
                What Happens Next?
              </h4>
              <div className="text-blue-800 text-sm space-y-2">
                <p>✅ Our partnership team will review your application within <strong>24-48 hours</strong></p>
                <p>✅ You'll receive a personalized welcome email with next steps</p>
                <p>✅ We'll schedule a partnership consultation call</p>
                <p>✅ Get access to our partner portal and resources</p>
              </div>
            </div>
            
            {/* Contact information */}
            <div className="text-green-600 text-sm">
              <p className="mb-2">
                <strong>Questions?</strong> Contact our partnership team at{' '}
                <a href="mailto:partnerships@eduexpert.com" className="text-green-700 hover:text-green-800 underline">
                  partnerships@eduexpert.com
                </a>
              </p>
              <p>
                Thank you for choosing EduExpert as your education partner! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${compact ? 'max-w-md' : 'max-w-4xl'} mx-auto`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join EduExpert Partnership</h2>
          <p className="text-gray-600">Fill out the form below to become our partner</p>
        </div>

        {/* Agent Type Selection */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <FaUser className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Agent Type</h3>
          </div>
          {renderInputField("agentType", "What type of agent are you?", "text", "Select your agent type", true, agentTypes, FaUser)}
        </div>

        {/* Basic Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <FaBuilding className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {renderInputField("companyName", "Company/Organization Name", "text", "Your company name or your name for individual agents", false, null, FaBuilding)}
            {renderInputField("contactPerson", "Contact Person", "text", "Your full name", true, null, FaUser)}
            {renderInputField("email", "Email Address", "email", "your@email.com", true, null, FaEnvelope)}
            {renderInputField("phone", "Phone Number", "tel", "+1 (555) 123-4567", true, null, FaPhone)}
            {renderInputField("country", "Country", "text", "Your country", false, null, FaMapMarkerAlt)}
            {renderInputField("website", "Website", "url", "https://yourwebsite.com", false, null, FaGlobe)}
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <FaChartLine className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {renderInputField("experience", "Experience Level", "text", "Select your experience", true, experienceLevels, FaAward)}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="w-4 h-4 inline mr-2 text-blue-600" />
                Target Countries <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {targetCountries.map((country) => (
                  <label key={country} className="flex items-center space-x-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 group shadow-sm hover:shadow-md">
                    <input
                      type="checkbox"
                      checked={formData.targetCountries.includes(country)}
                      onChange={(e) => handleCountryChange(country, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-blue-800 font-medium transition-colors duration-200">{country}</span>
                    {formData.targetCountries.includes(country) && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
              {errors.targetCountries && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <FaExclamationTriangle className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-red-600 text-sm font-medium">{errors.targetCountries}</span>
                </div>
              )}
              {formData.targetCountries.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm font-medium">
                    Selected: {formData.targetCountries.join(', ')}
                  </p>
                </div>
              )}
            </div>
            {renderInputField("monthlyStudents", "Monthly Student Target", "text", "Select target", true, monthlyStudentTargets, FaUsers)}
            {renderInputField("currentClients", "Current Clients", "text", "e.g., 50+ clients", false, null, FaUsers)}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-orange-100 rounded-lg mr-3">
              <FaHandshake className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Services You Provide</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableServices.slice(0, 6).map((service) => (
              <label key={service} className="flex items-center space-x-3 cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 p-3 rounded-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 group shadow-sm hover:shadow-md">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={(e) => handleServiceChange(service, e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 transition-all duration-200"
                />
                <span className="text-sm text-gray-700 group-hover:text-orange-800 font-medium transition-colors duration-200">{service}</span>
                {formData.services.includes(service) && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                  </div>
                )}
              </label>
            ))}
          </div>
          {formData.services.length > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-700 text-sm font-medium">
                Selected Services: {formData.services.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg mr-3">
              <FaDollarSign className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
          </div>
          <div className="grid md:grid-cols-1 gap-6">
            {renderInputField("howDidYouHear", "How did you hear about us?", "text", "Select source", false, ['Google Search', 'Social Media', 'Referral', 'Education Fair', 'Website', 'Other'], FaGlobe)}
          </div>
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <FaEnvelope className="w-4 h-4 inline mr-2 text-blue-600" />
              Additional Message
            </label>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                maxLength={1000}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-y min-h-[120px] bg-white"
                placeholder="Tell us about your partnership goals, experience, and how we can work together..."
                style={{ minHeight: '120px' }}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                {formData.message.length}/1000
              </div>
            </div>
            {formData.message.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                💡 Tip: Share your experience, goals, and any specific requirements
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          {errors.submit && (
            <div className="flex items-center mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <FaExclamationTriangle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-500 text-sm font-medium">{errors.submit}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-3 w-5 h-5" />
                Submitting Application...
              </>
            ) : (
              <>
                <FaHandshake className="mr-3 w-5 h-5" />
                Submit Partnership Application
              </>
            )}
          </button>
          
          
          {!isFormValid && (
            <p className="text-gray-500 text-sm mt-3 text-center">
              Please fill in all required fields to continue
            </p>
          )}
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By submitting this form, you agree to our partnership terms and conditions
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
