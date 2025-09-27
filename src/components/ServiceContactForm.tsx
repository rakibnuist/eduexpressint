'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaGraduationCap, FaGlobe, FaCheckCircle, FaSpinner } from 'react-icons/fa';

interface ServiceContactFormProps {
  serviceName: string;
  serviceDescription: string;
  compact?: boolean;
}

export default function ServiceContactForm({ 
  serviceName, 
  serviceDescription, 
  compact = false 
}: ServiceContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    currentEducation: '',
    interestedCountry: '',
    interestedProgram: '',
    message: '',
    service: serviceName
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    'Bangladesh', 'India', 'Pakistan', 'Nepal', 'Sri Lanka', 'Other'
  ];

  const educationLevels = [
    'High School (SSC/HSC)',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  const studyCountries = [
    'United Kingdom',
    'Netherlands', 
    'Cyprus',
    'China',
    'South Korea',
    'Finland',
    'Hungary',
    'Georgia',
    'Croatia',
    'Other'
  ];

  const programs = [
    'Business & Management',
    'Engineering & Technology',
    'Medicine & Healthcare',
    'Arts & Design',
    'Science & Research',
    'Law',
    'Education',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }

    if (!formData.currentEducation) {
      newErrors.currentEducation = 'Please select your education level';
    }

    if (!formData.interestedCountry) {
      newErrors.interestedCountry = 'Please select your interested study destination';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          currentEducation: '',
          interestedCountry: '',
          interestedProgram: '',
          message: '',
          service: serviceName
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your inquiry has been submitted successfully. Our expert counselor will contact you within 24 hours to discuss your {serviceName.toLowerCase()} needs.
        </p>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>What's Next?</strong><br />
            • Free consultation call<br />
            • Personalized service plan<br />
            • Expert guidance throughout your journey
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${compact ? 'p-6' : 'p-8'}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get Free Consultation for {serviceName}
        </h3>
        <p className="text-gray-600">
          {serviceDescription}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaUser className="w-4 h-4 inline mr-2 text-blue-600" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaGlobe className="w-4 h-4 inline mr-2 text-blue-600" />
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>

        {/* Educational Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaGraduationCap className="w-4 h-4 inline mr-2 text-blue-600" />
              Current Education Level *
            </label>
            <select
              name="currentEducation"
              value={formData.currentEducation}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.currentEducation ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your education level</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.currentEducation && <p className="text-red-500 text-sm mt-1">{errors.currentEducation}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaGlobe className="w-4 h-4 inline mr-2 text-blue-600" />
              Interested Study Destination *
            </label>
            <select
              name="interestedCountry"
              value={formData.interestedCountry}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                errors.interestedCountry ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select study destination</option>
              {studyCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.interestedCountry && <p className="text-red-500 text-sm mt-1">{errors.interestedCountry}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaGraduationCap className="w-4 h-4 inline mr-2 text-blue-600" />
            Interested Program
          </label>
          <select
            name="interestedProgram"
            value={formData.interestedProgram}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          >
            <option value="">Select program of interest</option>
            {programs.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaEnvelope className="w-4 h-4 inline mr-2 text-blue-600" />
            Additional Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Tell us more about your goals and requirements..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          {errors.submit && (
            <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <FaPhone className="h-5 w-5" />
                Get Free Consultation
              </>
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>By submitting this form, you agree to our privacy policy and terms of service.</p>
        </div>
      </form>
    </div>
  );
}
