'use client';

import { useState } from 'react';
import { 
  FaBuilding, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaIndustry, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaHandshake, 
  FaCheck,
  FaSpinner
} from 'react-icons/fa';
import { trackLead, trackFormSubmission } from '@/components/TrackLead';
import { metaPixel } from '@/components/MetaPixel';

interface B2BPartnershipFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export default function B2BPartnershipForm({ onSuccess, compact = false }: B2BPartnershipFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    country: '',
    fullAddress: '',
    services: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, services: [...prev.services, service] }));
    } else {
      setFormData(prev => ({ ...prev, services: prev.services.filter(s => s !== service) }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Track form submission with Meta Pixel
      await trackFormSubmission('B2B Partnership Form', {
        form_type: 'Partnership Inquiry',
        lead_data: formData
      });

      // Track B2B lead generation
      await trackLead('B2B Partnership Inquiry', {
        email: formData.email,
        phone: formData.phone,
        destination: formData.country,
        university: formData.companyName,
        program: formData.industry,
        source: 'B2B Partnership Page',
        value: 1,
        currency: 'USD'
      });

      // Track custom event
      metaPixel.trackCustomEvent('B2BPartnership', {
        action: 'Partnership Form Submitted',
        company_name: formData.companyName,
        industry: formData.industry,
        company_size: formData.companySize,
        services: formData.services,
        source: 'Partnership Page'
      });

      // Submit to API
      const response = await fetch('/api/admin/b2b-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          industry: formData.industry,
          companySize: formData.companySize,
          country: formData.country,
          city: formData.fullAddress, // Map fullAddress to city field
          services: formData.services,
          notes: formData.message, // Map message to notes field
          source: 'B2B Partnership Page',
          status: 'New',
          priority: 'High',
          dealStage: 'Lead'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        onSuccess?.();
        
        // Reset form
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          industry: '',
          companySize: '',
          country: '',
          fullAddress: '',
          services: [],
          message: ''
        });
      } else {
        setErrors({ submit: data.error || 'Failed to submit partnership inquiry' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit partnership inquiry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Partnership Inquiry Submitted!
        </h3>
        <p className="text-green-700 text-sm">
          Thank you! Our team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${compact ? 'max-w-md' : 'max-w-2xl'}`}>
      {/* Company Information */}
      <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaBuilding className="w-4 h-4 inline mr-2 text-blue-600" />
            Company Name *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Your company name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaUser className="w-4 h-4 inline mr-2 text-blue-600" />
            Contact Person *
          </label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Your full name"
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaEnvelope className="w-4 h-4 inline mr-2 text-blue-600" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="your@company.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaPhone className="w-4 h-4 inline mr-2 text-blue-600" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Business Information */}
      <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaIndustry className="w-4 h-4 inline mr-2 text-blue-600" />
            Industry *
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          >
            <option value="">Select your industry</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && (
            <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaUsers className="w-4 h-4 inline mr-2 text-blue-600" />
            Company Size
          </label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>
      </div>

      {/* Location */}
      <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaMapMarkerAlt className="w-4 h-4 inline mr-2 text-blue-600" />
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Your country"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaMapMarkerAlt className="w-4 h-4 inline mr-2 text-blue-600" />
            Full Address
          </label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Street address, city, state, postal code"
          />
        </div>
      </div>

      {/* Services of Interest - Only show if not compact */}
      {!compact && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <FaHandshake className="w-4 h-4 inline mr-2 text-blue-600" />
            Services of Interest
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Student Recruitment',
              'University Partnerships',
              'Visa Processing',
              'Language Training',
              'Career Counseling',
              'Accommodation Services'
            ].map((service) => (
              <label key={service} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={(e) => handleServiceChange(service, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>
      )}


      {/* Message - Only show if not compact */}
      {!compact && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaEnvelope className="w-4 h-4 inline mr-2 text-blue-600" />
            Additional Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Tell us more about your partnership goals..."
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        {errors.submit && (
          <p className="text-red-500 text-sm mb-3">{errors.submit}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            'Submit Partnership Inquiry'
          )}
        </button>
      </div>
    </form>
  );
}
