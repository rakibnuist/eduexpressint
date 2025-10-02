'use client';

import React, { useState, lazy, Suspense } from 'react';
import { findDestination } from '@/lib/data/destinations';
import { useCTA } from '@/context/CTAContext';
import { trackViewContent } from '@/components/TrackLead';
import { 
  FaGraduationCap, 
  FaDollarSign, 
  FaBriefcase, 
  FaGlobe, 
  FaHome, 
  FaLanguage, 
  FaPlane, 
  FaCheckCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaUsers,
  FaUniversity,
  FaCertificate,
  FaBookOpen,
  FaClipboardList,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaHandshake,
  FaGlobeEurope,
  FaPassport
} from 'react-icons/fa';

// Lazy load tab components
const OverviewTab = lazy(() => import('./tabs/OverviewTab'));
const ProgramsTab = lazy(() => import('./tabs/ProgramsTab'));
const UniversitiesTab = lazy(() => import('./tabs/UniversitiesTab'));
const RequirementsTab = lazy(() => import('./tabs/RequirementsTab'));
const ProcessTab = lazy(() => import('./tabs/ProcessTab'));
const ScholarshipsTab = lazy(() => import('./tabs/ScholarshipsTab'));

interface OptimizedDestinationPageProps {
  destinationSlug: string;
  destinationConfig: {
    name: string;
    emoji: string;
    gradient: string;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    keyStats: {
      tuition: string;
      programs: string;
      living: string;
    };
    features: string[];
    intakes: string[];
  };
}

export default function OptimizedDestinationPage({ 
  destinationSlug, 
  destinationConfig 
}: OptimizedDestinationPageProps) {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination(destinationSlug);
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent(`${destinationConfig.name} Page CTA Click`, {
      content_category: 'Destination Page',
      content_ids: [`${destinationSlug}-cta`],
      value: 1
    });
    openCTA(source);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'scholarships', label: 'Scholarships', icon: FaMoneyBillWave },
    { id: 'programs', label: 'Programs', icon: FaGraduationCap },
    { id: 'universities', label: 'Universities', icon: FaUniversity },
    { id: 'requirements', label: 'Requirements', icon: FaFileAlt },
    { id: 'process', label: 'Process', icon: FaClipboardList }
  ];

  const renderTabContent = () => {
    const commonProps = {
      destinationConfig,
      handleCTAClick,
      destinationSlug
    };

    switch (activeTab) {
      case 'overview':
        return <OverviewTab {...commonProps} />;
      case 'scholarships':
        return <ScholarshipsTab {...commonProps} />;
      case 'programs':
        return <ProgramsTab {...commonProps} />;
      case 'universities':
        return <UniversitiesTab {...commonProps} />;
      case 'requirements':
        return <RequirementsTab {...commonProps} />;
      case 'process':
        return <ProcessTab {...commonProps} />;
      default:
        return <OverviewTab {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Optimized Hero Section */}
      <section className={`relative ${destinationConfig.gradient} text-white overflow-hidden min-h-screen flex items-center`}>
        {/* Simplified Background */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="text-center">
            {/* Intake Badge */}
            <div className="flex justify-center mb-8">
              <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${destinationConfig.primaryColor} text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl`}>
                <FaCalendarAlt className="h-6 w-6" />
                {destinationConfig.intakes.join(' & ')} Intakes Available
                <FaStar className="h-5 w-5" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-200">
                {destinationConfig.name}
              </span>
            </h1>
            
            {/* Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-blue-100 mb-4 font-bold">
                {destinationConfig.emoji} {destinationConfig.name} Excellence
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 font-bold">
                From {destinationConfig.keyStats.tuition} Per Year!
              </p>
            </div>
            
            {/* Description */}
            <p className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience <span className="font-bold text-white">world-class education</span> with 
              <span className="font-bold text-blue-200"> {destinationConfig.keyStats.programs} English programs</span> and 
              <span className="font-bold text-cyan-200"> cutting-edge innovation</span>.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className={`w-20 h-20 bg-gradient-to-r ${destinationConfig.primaryColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <FaDollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">{destinationConfig.keyStats.tuition}</div>
                <div className="text-lg text-blue-200 font-medium">Annual Tuition</div>
                <div className="text-sm text-blue-300 mt-2">Affordable</div>
              </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className={`w-20 h-20 bg-gradient-to-r ${destinationConfig.secondaryColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <FaLanguage className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">{destinationConfig.keyStats.programs}</div>
                <div className="text-lg text-blue-200 font-medium">English Programs</div>
                <div className="text-sm text-blue-300 mt-2">No Language Barrier</div>
              </div>

              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className={`w-20 h-20 bg-gradient-to-r ${destinationConfig.tertiaryColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <FaHome className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">{destinationConfig.keyStats.living}</div>
                <div className="text-lg text-blue-200 font-medium">Monthly Living</div>
                <div className="text-sm text-blue-300 mt-2">Very Affordable</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button 
                onClick={() => handleCTAClick(`${destinationSlug}-hero`)}
                className={`bg-gradient-to-r ${destinationConfig.primaryColor} hover:opacity-90 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl text-xl`}
              >
                <FaRocket className="h-6 w-6" />
                Apply Now - Start Your Journey!
                <FaStar className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleCTAClick(`${destinationSlug}-hero-consultation`)}
                className="bg-white/15 backdrop-blur-sm border-2 border-white/40 hover:bg-white/25 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 text-xl"
              >
                <FaPhone className="h-6 w-6" />
                Free Consultation
                <FaHandshake className="h-5 w-5" />
              </button>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {destinationConfig.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${destinationConfig.primaryColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <FaCertificate className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-lg font-bold text-blue-200">{feature}</div>
                  <div className="text-sm text-blue-300">European Standards</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-center overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 border-b-2 hover:bg-gray-50 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-blue-600 bg-blue-50 shadow-sm'
                      : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content with Lazy Loading */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Suspense fallback={
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }>
            {renderTabContent()}
          </Suspense>
        </div>
      </section>

      {/* Optimized CTA Section */}
      <section className={`py-20 ${destinationConfig.gradient} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${destinationConfig.primaryColor} text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg`}>
              <FaStar className="h-5 w-5" />
              Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Your Education Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              {destinationConfig.name}
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already pursuing <span className="font-bold text-white">world-class education</span> at 
            <span className="font-bold text-blue-200"> affordable costs</span>. Get cutting-edge education with {destinationConfig.keyStats.programs} English programs!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick(`${destinationSlug}-cta`)}
              className={`bg-gradient-to-r ${destinationConfig.primaryColor} hover:opacity-90 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl text-lg`}
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Your Journey!
            </button>
            <button 
              onClick={() => handleCTAClick(`${destinationSlug}-cta-consultation`)}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <FaPhone className="h-6 w-6" />
              Free Consultation
            </button>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {destinationConfig.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${destinationConfig.primaryColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <FaCertificate className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature}</h3>
                <p className="text-blue-200 text-sm">European-standard degrees</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
