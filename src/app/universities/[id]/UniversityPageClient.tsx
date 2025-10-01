'use client';

import React, { useState, useEffect } from 'react';
import { useCTA } from '@/context/CTAContext';
import Head from 'next/head';
import { useUniversityTracking } from '@/hooks/usePageTracking';

interface UniversityPageClientProps {
  university: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    destination?: string;
    country: string;
    city: string;
    type: string;
    ranking?: {
      global?: number;
      national?: number;
    };
    programs?: Array<{
      name: string;
      level: string;
      duration: number;
      tuition: {
        amount: number;
        currency: string;
      };
    }>;
    fees?: Array<{
      type: string;
      amount: string;
      currency: string;
      description: string;
    }> | {
      application?: number;
      tuition?: {
        amount: number;
        currency: string;
      };
      entries?: Array<{
        type: string;
        amount: string;
        currency: string;
        description: string;
      }>;
    };
    scholarships?: Array<{
      name: string;
      value: {
        tuitionFee?: string;
      };
      currency: string;
      type: string;
    }>;
    conditions?: string[];
    requirements?: {
      general: string[];
      documents: string[];
      languageTests: Array<{
        test: string;
        minScore: number | string;
      }>;
    };
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
    website?: string;
    email?: string;
    phone?: string;
    address?: string;
    founded?: number;
    about?: string;
    logo?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
}

export default function UniversityPageClient({ university }: UniversityPageClientProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { openCTA } = useCTA();
  
  // Track university page view
  useUniversityTracking(university._id, university.name);

  // Update page title and meta description dynamically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Update page title
      document.title = university.seo?.title || `${university.name} | EduExpress International`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', university.seo?.description || university.shortDescription || `Explore programs, fees, and scholarship details for ${university.name}.`);
      }
      
      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && university.seo?.keywords) {
        metaKeywords.setAttribute('content', university.seo.keywords.join(', '));
      }
    }
  }, [university]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Simple function to get after-scholarship tuition fee
  const getAfterScholarshipFee = (scholarship: any) => {
    // If afterScholarshipFee is explicitly provided, use it
    if (scholarship.value?.afterScholarshipFee) {
      return scholarship.value.afterScholarshipFee;
    }

    // If tuitionFee contains specific amount, extract and use it
    if (scholarship.value?.tuitionFee) {
      const tuitionFeeStr = scholarship.value.tuitionFee;
      
      // Handle "100% Free" case
      if (tuitionFeeStr.toLowerCase().includes('100%') && tuitionFeeStr.toLowerCase().includes('free')) {
        return '0 CNY';
      }
      
      // Extract numeric value from strings like "5000 CNY/Year" or "36,000 CNY/Year"
      const numericMatch = tuitionFeeStr.match(/[\d,]+/);
      if (numericMatch) {
        const numericValue = numericMatch[0].replace(/,/g, '');
        // Extract currency from the string or use scholarship currency
        const currencyMatch = tuitionFeeStr.match(/(CNY|USD|EUR|GBP)/i);
        const currency = currencyMatch ? currencyMatch[0].toUpperCase() : scholarship.currency;
        return `${parseInt(numericValue).toLocaleString()} ${currency}`;
      }
    }

    return null;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏛️' },
    { id: 'programs', label: 'Programs', icon: '📚' },
    { id: 'fees', label: 'Fees & Costs', icon: '💰' },
    { id: 'requirements', label: 'Requirements', icon: '📋' },
    { id: 'scholarships', label: 'Scholarships', icon: '🎓' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Cover Section */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden pt-20">
        {/* Background Image */}
        {university.coverImageUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${university.coverImageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center py-4 md:py-8">
              {/* Left Column - Main Content */}
              <div className="space-y-4 md:space-y-6">
                {/* University Logo */}
                <div className="mb-4">
                  <img
                    src={university.logo || university.logoUrl || '/brand/logo.png'}
                    alt={`${university.name} logo`}
                    className="h-16 w-auto object-contain bg-white/10 backdrop-blur-sm rounded-lg p-2"
                    onError={(e) => {
                      // Fallback to default logo if the image fails to load
                      const target = e.target as HTMLImageElement;
                      if (target.src !== '/brand/logo.png') {
                        target.src = '/brand/logo.png';
                      }
                    }}
                  />
                </div>
                
                {/* University Name */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-xl leading-tight text-white">
                  {university.name}
                </h1>
                
                {/* Short Description */}
                <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed text-shadow-md">
                  {university.shortDescription || university.description}
                </p>
                
                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button 
                    onClick={() => openCTA(`University Page - ${university.name} - Apply Now`)}
                    className="bg-white text-blue-900 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center button-shadow-enhanced"
                  >
                    <span className="mr-2">📝</span>
                    Apply Now
                  </button>
                  <button 
                    onClick={() => setActiveTab('programs')}
                    className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center button-shadow-enhanced"
                  >
                    <span className="mr-2">📚</span>
                    Explore Programs
                  </button>
                </div>
              </div>
              
              {/* Right Column - Quick Info Badges */}
              <div className="space-y-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/30 card-shadow-enhanced">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center text-white text-shadow-md">Quick Facts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    <div className="bg-white/25 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 border border-white/40 text-center card-shadow-enhanced">
                      <div className="text-xl md:text-2xl mb-1">📍</div>
                      <span className="text-white font-semibold text-xs md:text-sm text-shadow-sm">{university.city}, {university.country}</span>
                    </div>
                    {university.ranking?.global && (
                      <div className="bg-white/25 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 border border-white/40 text-center card-shadow-enhanced">
                        <div className="text-xl md:text-2xl mb-1">🏆</div>
                        <span className="text-white font-semibold text-xs md:text-sm text-shadow-sm">Global #{university.ranking.global}</span>
                      </div>
                    )}
                    {university.ranking?.national && (
                      <div className="bg-white/25 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 border border-white/40 text-center card-shadow-enhanced">
                        <div className="text-xl md:text-2xl mb-1">⭐</div>
                        <span className="text-white font-semibold text-xs md:text-sm text-shadow-sm">National #{university.ranking.national}</span>
                      </div>
                    )}
                    <div className="bg-white/25 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 border border-white/40 text-center card-shadow-enhanced">
                      <div className="text-xl md:text-2xl mb-1">🎓</div>
                      <span className="text-white font-semibold text-xs md:text-sm text-shadow-sm">{university.type}</span>
                    </div>
                    {university.founded && (
                      <div className="bg-white/25 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-3 border border-white/40 text-center card-shadow-enhanced">
                        <div className="text-xl md:text-2xl mb-1">📅</div>
                        <span className="text-white font-semibold text-xs md:text-sm text-shadow-sm">Founded {university.founded}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-3 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* About Section */}
            {(university.about || university.description) && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {university.name}</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">{university.about || university.description}</p>
                
                {/* Additional Description */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Choose {university.name}?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {university.name} offers world-class education with state-of-the-art facilities, experienced faculty, 
                    and a diverse international community. Our commitment to academic excellence and student success 
                    makes us a top choice for students seeking quality education and career advancement opportunities.
                  </p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-3">📚</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {university.programs?.length || 0}
                </div>
                <div className="text-gray-600 font-medium mb-2">Programs Offered</div>
                <div className="text-sm text-gray-500">
                  Diverse range of undergraduate and graduate programs designed to meet industry demands
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-3">🎓</div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {university.scholarships?.length || 0}
                </div>
                <div className="text-gray-600 font-medium mb-2">Scholarships Available</div>
                <div className="text-sm text-gray-500">
                  Merit-based and need-based financial aid opportunities for qualified students
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-3">🏆</div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {university.ranking?.global || 'N/A'}
                </div>
                <div className="text-gray-600 font-medium mb-2">Global Ranking</div>
                <div className="text-sm text-gray-500">
                  Recognized worldwide for academic excellence and research contributions
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {(university.email || university.phone || university.website || university.address) && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {university.website && (
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <span className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">Website</div>
                        <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          {university.website}
                        </a>
                      </div>
                    </div>
                  )}
                  {university.email && (
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <span className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">Email</div>
                        <a href={`mailto:${university.email}`} className="text-green-600 hover:text-green-800">
                          {university.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {university.phone && (
                    <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                      <span className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">Phone</div>
                        <a href={`tel:${university.phone}`} className="text-purple-600 hover:text-purple-800">
                          {university.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {university.address && (
                    <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                      <span className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">Address</div>
                        <span className="text-orange-600">{university.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Programs Offered</h2>
            {university.programs && university.programs.length > 0 ? (
              <div className="space-y-6">
                {university.programs.map((program, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {program.level}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Duration:</span>
                        <span>{program.duration} years</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Tuition:</span>
                        <span className="font-semibold text-green-600">
                          {program.tuition.currency} {program.tuition.amount?.toLocaleString() || 'Contact for details'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Program information not available</p>
            )}
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fees & Costs</h2>
            {(() => {
              // Handle both old array format and new object format with entries
              const feesArray = Array.isArray(university.fees) 
                ? university.fees 
                : (university.fees as any)?.entries || [];
              
              return feesArray.length > 0 ? (
                <div className="space-y-4">
                  {feesArray.map((fee: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900 text-lg">{fee.type}</span>
                        <p className="text-sm text-gray-600">{fee.description}</p>
                      </div>
                      <span className="text-xl font-bold text-blue-600">
                        {fee.currency} {fee.amount}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Fee information not available</p>
              );
            })()}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Admission Requirements</h2>
            {university.requirements ? (
              <div className="space-y-8">
                {university.requirements.general && university.requirements.general.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">General Requirements</h3>
                    <ul className="space-y-3">
                      {university.requirements.general.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {university.requirements.languageTests && university.requirements.languageTests.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Language Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {university.requirements.languageTests.map((test, index) => (
                        <div key={index} className="bg-blue-50 p-4 rounded-lg">
                          <span className="font-medium text-blue-900 text-lg">{test.test}</span>
                          <span className="text-blue-700 ml-2 text-lg">Min: {test.minScore}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {university.requirements.documents && university.requirements.documents.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Documents</h3>
                    <ul className="space-y-3">
                      {university.requirements.documents.map((doc, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Admission requirements not available</p>
            )}
          </div>
        )}

        {activeTab === 'scholarships' && (
          <div className="space-y-8">
            {/* Scholarship Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">🎓</div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Scholarship Opportunities</h2>
                  <p className="text-green-100 text-lg">
                    Discover financial aid opportunities to make your education more affordable
                  </p>
                </div>
              </div>
            </div>

            {/* Scholarships List */}
            {university.scholarships && university.scholarships.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {university.scholarships.map((scholarship, index) => (
                  <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:border-blue-200 hover:-translate-y-2">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/50 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-yellow-100/30 to-transparent rounded-full -translate-x-8 -translate-y-8 group-hover:rotate-12 transition-transform duration-500"></div>
                    
                    <div className="relative p-8">
                      {/* Header Section */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white text-2xl">🎓</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                              {scholarship.name}
                            </h3>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 border border-blue-200">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {scholarship.type || 'University Scholarship'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Scholarship Benefits - Always show for all scholarships */}
                      <div className="mb-8">
                        <div className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-600 rounded-2xl p-6 text-white overflow-hidden shadow-lg">
                          {/* Animated background pattern */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>
                          
                          <div className="relative">
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
                                <span className="text-2xl">💰</span>
                              </div>
                              <div>
                                <span className="text-blue-100 font-medium text-sm uppercase tracking-wide">Scholarship Benefit</span>
                              </div>
                            </div>
                            {/* Consistent layout for all scholarships */}
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                              {scholarship.value?.tuitionFee?.toLowerCase().includes('100%') && scholarship.value?.tuitionFee?.toLowerCase().includes('free') 
                                ? scholarship.value.tuitionFee 
                                : (scholarship.value?.tuitionFee || getAfterScholarshipFee(scholarship) || 'Contact for details')
                              }
                            </div>
                            <div className="text-blue-100 text-sm font-medium">
                              {scholarship.value?.tuitionFee?.toLowerCase().includes('100%') && scholarship.value?.tuitionFee?.toLowerCase().includes('free') 
                                ? 'Tuition Fee Coverage' 
                                : (scholarship.value?.tuitionFee ? 'Tuition Fee' : 'After Scholarship Fee')
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div>
                        <button 
                          onClick={() => openCTA(`University Page - ${university.name} - Scholarship - ${scholarship.name}`)}
                          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
                        >
                          <span className="mr-2">Apply Now</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Scholarships Available</h3>
                <p className="text-gray-600 text-lg mb-6">
                  Scholarship information is not currently available for this university.
                </p>
                <button 
                  onClick={() => openCTA(`University Page - ${university.name} - Scholarship Information`)}
                  className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact for Scholarship Information
                </button>
              </div>
            )}

            {/* Scholarship Conditions Section */}
            {university.conditions && university.conditions.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📋</span>
                  Scholarship Conditions & Eligibility
                </h3>
                <div className="space-y-4">
                  {university.conditions.map((condition, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="flex items-start">
                        <span className="text-blue-500 text-xl mr-3 mt-1">✓</span>
                        <p className="text-gray-700 leading-relaxed font-medium">{condition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scholarship Descriptions Section */}
            {university.scholarships && university.scholarships.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📝</span>
                  Scholarship Details
                </h3>
                <div className="space-y-6">
                  {university.scholarships.map((scholarship, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{scholarship.name}</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {`This ${scholarship.type} scholarship provides ${scholarship.value.tuitionFee || 'financial support'} for eligible students. The scholarship is designed to help international students pursue their academic goals at ${university.name}.`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scholarship Application Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-3xl mr-3">💡</span>
                Scholarship Application Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <span className="text-gray-700">Submit applications before the deadline</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <span className="text-gray-700">Prepare strong recommendation letters</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <span className="text-gray-700">Write compelling personal statements</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <span className="text-gray-700">Maintain excellent academic records</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <span className="text-gray-700">Showcase extracurricular achievements</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <span className="text-gray-700">Research scholarship requirements thoroughly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            {university.faqs && university.faqs.length > 0 ? (
              <div className="space-y-4">
                {university.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <span className={`text-2xl transition-transform duration-200 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">FAQ information not available</p>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-8 mt-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Apply to {university.name}?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Get expert guidance for your application process
          </p>
          <button 
            onClick={() => openCTA(`University Page - ${university.name} - Start Application`)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Application
          </button>
        </div>
      </div>
    </div>
  );
}
