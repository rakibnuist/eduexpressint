'use client';

import { useState } from 'react';
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
  FaEnvelope,
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
  FaDownload,
  FaTrophy,
  FaAward,
  FaBuilding,
  FaMicroscope,
  FaLaptopCode,
  FaEuroSign,
  FaHotel,
  FaPassport,
  FaHeart,
  FaChartLine,
  FaHandshake,
  FaGlobeEurope,
  FaMedal,
  FaLightbulb,
  FaUserGraduate,
  FaBriefcaseMedical,
  FaGamepad,
  FaPalette,
  FaCode,
  FaFlask,
  FaGavel,
  FaChartBar,
  FaLanguage as FaLanguageIcon,
  FaGraduationCap as FaGraduationCapIcon,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function CyprusPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('cyprus');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('Cyprus Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['cyprus-cta'],
      value: 1
    });
    openCTA(source);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'earn-study', label: 'Earn While Study', icon: FaEuroSign },
    { id: 'programs', label: 'Programs', icon: FaGraduationCap },
    { id: 'universities', label: 'Universities', icon: FaUniversity },
    { id: 'requirements', label: 'Requirements', icon: FaFileAlt },
    { id: 'process', label: 'Process', icon: FaClipboardList }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <FaEuroSign className="h-12 w-12 text-yellow-400" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow delay-1000 opacity-20">
            <FaGraduationCap className="h-10 w-10 text-green-400" />
          </div>
          <div className="absolute bottom-32 left-40 animate-float-slow delay-500 opacity-20">
            <FaHotel className="h-14 w-14 text-orange-400" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow delay-700 opacity-20">
            <FaCertificate className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="text-center">
            {/* Enhanced Intake Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-bounce hover:animate-none transition-all duration-300 transform hover:scale-105">
                <FaCalendarAlt className="h-6 w-6" />
                September 2025 & January 2026 Intakes Available
                <FaStar className="h-5 w-5 animate-spin" />
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">Cyprus</span>
            </h1>
            
            {/* Enhanced Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-blue-100 mb-4 font-bold">
                🌟 Earn While You Study
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-bold">
                Up to €18,000 Per Year!
              </p>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience world-class education with <span className="font-bold text-yellow-400">paid internships at luxury hotels</span>. 
              Get both <span className="font-bold text-green-400">Cyprus & UK degrees</span> while earning substantial income through our unique earn-while-study program.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaEuroSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">€18k</div>
                <div className="text-lg text-blue-200 font-medium">Earn Per Year</div>
                <div className="text-sm text-blue-300 mt-2">Paid Internships</div>
              </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-lg text-blue-200 font-medium">Visa Success</div>
                <div className="text-sm text-blue-300 mt-2">Guaranteed</div>
              </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaHome className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-purple-400 mb-2">€300</div>
                <div className="text-lg text-blue-200 font-medium">Monthly Living</div>
                <div className="text-sm text-blue-300 mt-2">Affordable</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button 
                onClick={() => handleCTAClick('cyprus-hero')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 shadow-2xl text-xl group"
              >
                <FaRocket className="h-6 w-6 group-hover:animate-bounce" />
                Apply Now - Start Earning!
                <FaStar className="h-5 w-5 animate-pulse" />
              </button>
              <button 
                onClick={() => handleCTAClick('cyprus-hero-consultation')}
                className="bg-white/15 backdrop-blur-sm border-2 border-white/40 hover:bg-white/25 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 text-xl group"
              >
                <FaPhone className="h-6 w-6 group-hover:animate-pulse" />
                Free Consultation
                <FaHandshake className="h-5 w-5" />
              </button>
            </div>

            {/* Additional Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaCertificate className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">Double Degrees</div>
                <div className="text-sm text-blue-300">Cyprus & UK</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaGlobeEurope className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">EU Benefits</div>
                <div className="text-sm text-blue-300">Work & Travel</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaLanguage className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">English Medium</div>
                <div className="text-sm text-blue-300">No Language Barrier</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaPassport className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-blue-200">4+4 Work Permit</div>
                <div className="text-sm text-blue-300">Long-term Stay</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex overflow-x-auto">
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

      {/* Tab Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Enhanced Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in Cyprus?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🌟 Cyprus offers the unique opportunity to <span className="font-bold text-blue-600">earn while studying</span> with paid internships at luxury hotels and globally recognized degrees from both Cyprus and UK universities.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaEuroSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Earn While Studying</h3>
                  <p className="text-gray-600 mb-4">Up to €18,000 per year through paid internships at luxury 5-star hotels.</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 font-semibold text-sm">💰 €1,500-€1,800 per month</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaShieldAlt className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">100% Visa Success</h3>
                  <p className="text-gray-600 mb-4">Guaranteed visa approval with our proven track record and expert guidance.</p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm">✅ 4+4 Year Work Permit</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaCertificate className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Double Degrees</h3>
                  <p className="text-gray-600 mb-4">Get both Cyprus & UK degrees from the same program with international recognition.</p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-800 font-semibold text-sm">🎓 British & Cyprus Degrees</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Special Features Section */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🌟 Special Features & Benefits</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaStar className="h-6 w-6 text-yellow-500" />
                      Key Benefits
                    </h4>
                    <div className="space-y-4">
                      {[
                        "Paid internships at luxury 5-star hotels",
                        "4+4 year work permit after graduation", 
                        "EU work authorization and travel rights",
                        "Path to permanent residency in Cyprus",
                        "Family sponsorship opportunities",
                        "Affordable living costs (€300/month)",
                        "English-taught programs",
                        "Modern campus facilities"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                          <FaCheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaCalendarAlt className="h-6 w-6 text-blue-500" />
                      Intake Information
                    </h4>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h5 className="font-bold text-gray-900 mb-3">Available Intakes</h5>
                        <div className="space-y-2">
                          {["September 2025", "January 2026"].map((intake, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700 font-medium">{intake}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Work Permit Details</h5>
                        <p className="text-blue-100">4+4 year renewable work permit allowing you to work and stay in Cyprus after graduation</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Visa Success Rate</h5>
                        <p className="text-green-100">100% success rate with our expert guidance and proven application process</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Earn While Study Tab */}
          {activeTab === 'earn-study' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">💰 Earn While You Study</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🌟 Unique opportunity to earn up to <span className="font-bold text-green-600">€18,000 per year</span> through paid internships at luxury 5-star hotels while pursuing your degree.
                </p>
              </div>

              {/* Enhanced Earning Cards */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaHotel className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Paid Internships</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    Work at luxury 5-star hotels while studying and earn substantial income with flexible scheduling.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      "€1,500-€1,800 per month",
                      "20-25 hours per week",
                      "Flexible scheduling around classes",
                      "Professional hospitality experience",
                      "Networking with industry professionals"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">€18,000</div>
                      <p className="text-yellow-800 font-semibold">Annual Earning Potential</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPassport className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Work Permit Benefits</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    Long-term work permit allowing you to stay and work in Cyprus after graduation with EU benefits.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      "4+4 year renewable work permit",
                      "EU work authorization",
                      "Path to permanent residency",
                      "Family sponsorship options",
                      "Travel freedom within EU"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                      <p className="text-green-800 font-semibold">Visa Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Cost Breakdown */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">💳 Complete Cost Breakdown</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaFileAlt className="h-6 w-6 text-blue-500" />
                      Before Visa (Initial Costs)
                    </h4>
                    <div className="space-y-4">
                      {[
                        { item: "Immigration Fee", cost: "€300" },
                        { item: "Tuition Deposit", cost: "€4,000" },
                        { item: "Document Legalization", cost: "6,000-8,000 BDT" },
                        { item: "Medical Tests", cost: "6,000-8,000 BDT" },
                        { item: "Embassy Fee", cost: "€300" }
                      ].map((cost, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                          <span className="font-medium text-gray-700">{cost.item}</span>
                          <span className="font-bold text-blue-600">{cost.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaPlane className="h-6 w-6 text-green-500" />
                      After Visa (Travel & Setup)
                    </h4>
                    <div className="space-y-4">
                      {[
                        { item: "Remaining Tuition", cost: "€2,500" },
                        { item: "Air Ticket", cost: "1,30,000-1,80,000 BDT" },
                        { item: "Cash to Bring", cost: "€2,000" },
                        { item: "Immigration Fees", cost: "€330" },
                        { item: "Books & Materials", cost: "€90" }
                      ].map((cost, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                          <span className="font-medium text-gray-700">{cost.item}</span>
                          <span className="font-bold text-green-600">{cost.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Total Cost Summary */}
                <div className="mt-8 bg-gradient-to-r from-yellow-500 to-orange-500 p-8 rounded-2xl text-white text-center">
                  <h4 className="text-2xl font-bold mb-4">💰 Total Investment vs Annual Earning</h4>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-3xl font-bold mb-2">€7,000-€8,000</div>
                      <p className="text-yellow-100">Total Initial Investment</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">€18,000</div>
                      <p className="text-yellow-100">Annual Earning Potential</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white/20 rounded-xl">
                    <p className="text-lg font-semibold">🎯 Break-even in just 5-6 months!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Programs Tab */}
          {activeTab === 'programs' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">🎓 Study Programs</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Choose from a wide range of programs at <span className="font-bold text-blue-600">UCLan Cyprus</span> and <span className="font-bold text-green-600">Mesoyios College</span> with British degree recognition.
                </p>
              </div>

              <div className="space-y-12">
                {/* UCLan Cyprus Programs */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaUniversity className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">UCLan Cyprus Programs</h3>
                      <p className="text-gray-600">British degrees awarded in Cyprus</p>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaBriefcase className="h-6 w-6 text-blue-600" />
                        <h4 className="text-xl font-bold text-gray-800">Business Programs</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BA Advertising & Marketing
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BA English Language & Literature
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BA Hospitality & Tourism
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BA Accounting and Finance
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BA Business Administration
                        </li>
                      </ul>
                      <div className="bg-blue-200 p-4 rounded-xl">
                        <p className="text-blue-800 font-semibold text-sm">
                          💰 Fees: €6,500 (Year 1) → €4,000 (Years 2-4)
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaPalette className="h-6 w-6 text-green-600" />
                        <h4 className="text-xl font-bold text-gray-800">Arts & Design</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BA Graphic Design
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BA Fashion Design
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BSc Media Production
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BSc Web Design & Development
                        </li>
                      </ul>
                      <div className="bg-green-200 p-4 rounded-xl">
                        <p className="text-green-800 font-semibold text-sm">
                          💰 Fees: €8,500 (Year 1) → 50% scholarship from Year 2
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaCode className="h-6 w-6 text-purple-600" />
                        <h4 className="text-xl font-bold text-gray-800">Sciences & Engineering</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BEng Computer Engineering
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BSc Mathematics & Statistics
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BEng Electrical Engineering
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BSc Psychology
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-green-500" />
                          BSc Computing
                        </li>
                      </ul>
                      <div className="bg-purple-200 p-4 rounded-xl">
                        <p className="text-purple-800 font-semibold text-sm">
                          💰 Fees: €8,500 (Year 1) → 50% scholarship from Year 2
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Master's Programs */}
                  <div className="mt-10 bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200">
                    <div className="flex items-center gap-3 mb-6">
                      <FaGraduationCap className="h-8 w-8 text-yellow-600" />
                      <h4 className="text-2xl font-bold text-gray-800">Master's Programs</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MSc Human Resource Management
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MBA Business Administration
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MA Hospitality & Tourism
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MSc User Experience Design
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MA Graphic Design
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MSc Data Analytics
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MSc Sport & Exercise Sciences
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MSc Forensic Psychology
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            MSc Computing
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            Master of Laws LLM
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            LLM Financial and Corporate Law
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCheckCircle className="h-4 w-4 text-green-500" />
                            LLM International Commercial Law
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 bg-yellow-200 p-4 rounded-xl">
                      <p className="text-yellow-800 font-semibold text-center">
                        💰 Master's Fees: €7,500-€8,925 (Total for entire course)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mesoyios College Programs */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <FaHotel className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Mesoyios College Programs</h3>
                      <p className="text-gray-600">Specialized in hospitality and tourism management</p>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200">
                      <div className="flex items-center gap-3 mb-6">
                        <FaUserGraduate className="h-6 w-6 text-green-600" />
                        <h4 className="text-xl font-bold text-gray-800">Bachelor Programs</h4>
                      </div>
                      <ul className="space-y-4 text-gray-700 mb-6">
                        <li className="flex items-center gap-3">
                          <FaCheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Bachelor in Hotel, Casino & Resort Management</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <FaCheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Bachelor in Business Administration with Hospitality Direction</span>
                        </li>
                      </ul>
                      <div className="bg-green-200 p-4 rounded-xl">
                        <p className="text-green-800 font-semibold">
                          💰 Fees: €5,440 (1st Year) → €4,760 (From 2nd Year)
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-6">
                        <FaLanguageIcon className="h-6 w-6 text-blue-600" />
                        <h4 className="text-xl font-bold text-gray-800">Foundation Program</h4>
                      </div>
                      <ul className="space-y-4 text-gray-700 mb-6">
                        <li className="flex items-center gap-3">
                          <FaCheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">English Foundation Year</span>
                        </li>
                      </ul>
                      <div className="bg-blue-200 p-4 rounded-xl">
                        <p className="text-blue-800 font-semibold">
                          💰 Foundation Fee: €5,440
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Universities Tab */}
          {activeTab === 'universities' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">🏛️ Partner Universities</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Study at prestigious institutions with <span className="font-bold text-blue-600">international recognition</span> and <span className="font-bold text-green-600">British degree awards</span> in Cyprus.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* UCLan Cyprus */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaUniversity className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">UCLan Cyprus</h3>
                      <p className="text-gray-600">University of Central Lancashire (UK) Network</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Part of the prestigious University of Central Lancashire (UK) network, offering authentic British degrees in Cyprus with the same quality and recognition as UK campuses.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "🎓 British degree awarded (identical to UK)",
                      "🌍 English-taught programs",
                      "🏢 Modern campus facilities",
                      "👨‍🏫 International faculty from UK",
                      "🤝 Strong industry connections",
                      "✈️ Erasmus+ exchange opportunities"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                    <h4 className="text-lg font-bold text-blue-800 mb-3">🎯 Specializations</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Business</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Arts & Design</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Sciences</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Engineering</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Law</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Psychology</span>
                    </div>
                  </div>
                </div>

                {/* Mesoyios College */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <FaHotel className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Mesoyios College</h3>
                      <p className="text-gray-600">Hospitality & Tourism Excellence</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Specialized in hospitality and tourism management with strong industry partnerships, offering practical training and direct career placement opportunities.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "🏨 Hospitality & tourism specialization",
                      "🤝 Strong industry partnerships",
                      "💼 Practical hands-on training",
                      "🎯 Career placement support",
                      "💰 Affordable tuition fees",
                      "👥 Small class sizes for attention"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <h4 className="text-lg font-bold text-green-800 mb-3">🎯 Specializations</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Hospitality</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Tourism</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Business Admin</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Casino Management</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Resort Management</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Foundation Year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* University Comparison */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">📊 University Comparison</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                      <FaUniversity className="h-6 w-6" />
                      UCLan Cyprus
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Degree Type</span>
                        <span className="font-bold text-blue-600">British Degree</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Tuition Range</span>
                        <span className="font-bold text-blue-600">€4,000-€8,500/year</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Program Focus</span>
                        <span className="font-bold text-blue-600">Academic Excellence</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Class Size</span>
                        <span className="font-bold text-blue-600">Medium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-3">
                      <FaHotel className="h-6 w-6" />
                      Mesoyios College
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Degree Type</span>
                        <span className="font-bold text-green-600">Cyprus Degree</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Tuition Range</span>
                        <span className="font-bold text-green-600">€4,760-€5,440/year</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Program Focus</span>
                        <span className="font-bold text-green-600">Industry Practical</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Class Size</span>
                        <span className="font-bold text-green-600">Small</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Requirements Tab */}
          {activeTab === 'requirements' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">📋 Admission Requirements</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Simple and straightforward requirements for studying in Cyprus. We help you with <span className="font-bold text-blue-600">all documentation</span> and <span className="font-bold text-green-600">guarantee 100% visa success</span>.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Admission Documents */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaFileAlt className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Admission Documents</h3>
                      <p className="text-gray-600">Basic Requirements</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "📄 Passport (valid 2+ years)",
                      "🎓 Academic Certificates (SSC & HSC)",
                      "🌍 English Certificate (IELTS 4.0/5.0)",
                      "📸 White Background Photo",
                      "📝 Recommendation Letter",
                      "✍️ Personal Statement (500 words)",
                      "📋 Resume/CV"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-blue-800 font-semibold text-sm">
                      💡 We help prepare and translate all documents
                    </p>
                  </div>
                </div>

                {/* English Requirements */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <FaLanguage className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">English Requirements</h3>
                      <p className="text-gray-600">Language Proficiency</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                      <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                        <FaGraduationCap className="h-5 w-5" />
                        Bachelor Programs
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">IELTS</div>
                          <div className="font-bold text-green-600">5.0</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">TOEFL</div>
                          <div className="font-bold text-green-600">71</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">PTE</div>
                          <div className="font-bold text-green-600">58</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">CEFR</div>
                          <div className="font-bold text-green-600">B2</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                      <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                        <FaBookOpen className="h-5 w-5" />
                        Foundation Programs
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">IELTS</div>
                          <div className="font-bold text-orange-600">4.0</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">TOEFL</div>
                          <div className="font-bold text-orange-600">42</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">PTE</div>
                          <div className="font-bold text-orange-600">43</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">CEFR</div>
                          <div className="font-bold text-orange-600">B1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <p className="text-green-800 font-semibold text-sm">
                      🎯 Lower requirements than most countries
                    </p>
                  </div>
                </div>

                {/* Visa Documents */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaPassport className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Visa Documents</h3>
                      <p className="text-gray-600">Immigration Requirements</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "📜 Attested Academic Certificates",
                      "🛡️ Police Clearance Certificate",
                      "🏥 Medical Certificate",
                      "💰 Bank Statement (10 lakhs)",
                      "💳 Tuition Fee Payment Proof",
                      "📘 Passport (2+ years validity)"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
                    <p className="text-purple-800 font-semibold text-sm">
                      ✅ 100% visa success rate guaranteed
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Support Section */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🛠️ We Handle Everything For You</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FaFileAlt className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-gray-900">Document Preparation</h4>
                    <p className="text-gray-600">We help prepare, translate, and attest all required documents</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FaShieldAlt className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-gray-900">Visa Application</h4>
                    <p className="text-gray-600">Complete visa application support with 100% success rate</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FaHandshake className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-gray-900">End-to-End Support</h4>
                    <p className="text-gray-600">From application to arrival - we're with you every step</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Process Tab */}
          {activeTab === 'process' && (
            <div className="space-y-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">🚀 Application Process</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Simple <span className="font-bold text-blue-600">6-step process</span> to start your Cyprus education journey. We handle everything for you with <span className="font-bold text-green-600">100% success rate</span>.
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Initial Consultation & Program Selection",
                    description: "Free consultation to understand your goals and select the best program. We help you choose between UCLan Cyprus and Mesoyios College based on your interests and career aspirations.",
                    icon: FaHandshake,
                    color: "blue"
                  },
                  {
                    step: 2,
                    title: "Document Preparation & Submission",
                    description: "We help you gather and prepare all required documents including academic certificates, English test results, passport, and personal statement. All documents are translated and attested by us.",
                    icon: FaFileAlt,
                    color: "green"
                  },
                  {
                    step: 3,
                    title: "University Application & Offer Letter",
                    description: "We submit your application to the chosen university and handle all communication. You'll receive your offer letter within 2-3 days of application submission.",
                    icon: FaUniversity,
                    color: "purple"
                  },
                  {
                    step: 4,
                    title: "Tuition Payment & Blue Paper",
                    description: "After accepting the offer, we help you make the tuition payment and obtain the Blue Paper (student permit) from Cyprus immigration within 30 days.",
                    icon: FaMoneyBillWave,
                    color: "orange"
                  },
                  {
                    step: 5,
                    title: "Visa Application & Medical Tests",
                    description: "We assist with the complete visa application process including medical tests, police clearance, and embassy submission. Visa processing takes 2-3 weeks.",
                    icon: FaPassport,
                    color: "red"
                  },
                  {
                    step: 6,
                    title: "Travel Arrangements & Arrival Support",
                    description: "We help with flight bookings, airport pickup arrangements, and initial accommodation. You'll receive complete support upon arrival in Cyprus.",
                    icon: FaPlane,
                    color: "cyan"
                  }
                ].map((step, index) => {
                  const Icon = step.icon;
                  const colorClasses: Record<string, string> = {
                    blue: "from-blue-500 to-indigo-600",
                    green: "from-green-500 to-emerald-600",
                    purple: "from-purple-500 to-indigo-600",
                    orange: "from-orange-500 to-red-600",
                    red: "from-red-500 to-pink-600",
                    cyan: "from-cyan-500 to-blue-600"
                  };
                  
                  return (
                    <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                      <div className="flex gap-8 items-start">
                        <div className="flex-shrink-0">
                          <div className={`w-20 h-20 bg-gradient-to-r ${colorClasses[step.color]} text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg`}>
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[step.color]} rounded-xl flex items-center justify-center`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Timeline Section */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 rounded-3xl border border-blue-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">⏰ Timeline & Important Information</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaClock className="h-6 w-6 text-blue-600" />
                      Processing Times
                    </h4>
                    <div className="space-y-4">
                      {[
                        { item: "Offer Letter", time: "2-3 days", color: "green" },
                        { item: "Documentation", time: "15-20 days", color: "blue" },
                        { item: "Blue Paper", time: "Within 30 days", color: "purple" },
                        { item: "Visa Processing", time: "2-3 weeks", color: "orange" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <span className="font-medium text-gray-700">{item.item}</span>
                          <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                            item.color === 'green' ? 'bg-green-100 text-green-800' :
                            item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaExclamationTriangle className="h-6 w-6 text-orange-600" />
                      Important Notes
                    </h4>
                    <div className="space-y-4">
                      {[
                        "📋 Offer letter valid for 2 weeks",
                        "🏥 Medical tests required",
                        "📜 Documents must be attested",
                        "💰 Bring €2,000 cash on arrival",
                        "📅 Start application 3-4 months before intake",
                        "✅ We handle all paperwork for you"
                      ].map((note, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                          <FaCheckCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Guarantee */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-12 rounded-3xl text-white text-center">
                <h3 className="text-3xl font-bold mb-6">🎯 100% Success Guarantee</h3>
                <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                  We guarantee your admission and visa approval. If for any reason your application is not successful, 
                  we will refund all our service fees and help you apply to alternative programs.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <FaShieldAlt className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Guaranteed Admission</h4>
                    <p className="text-green-100">100% admission success rate</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <FaPassport className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Visa Success</h4>
                    <p className="text-green-100">100% visa approval rate</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <FaHandshake className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Full Support</h4>
                    <p className="text-green-100">End-to-end assistance</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaStar className="h-5 w-5" />
              Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Earning While Studying in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Cyprus</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already earning up to <span className="font-bold text-yellow-400">€18,000 per year</span> through our unique earn-while-study program. 
            Get both Cyprus & UK degrees while building your career!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('cyprus-cta')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Earning!
            </button>
            <button 
              onClick={() => handleCTAClick('cyprus-cta-consultation')}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <FaPhone className="h-6 w-6" />
              Free Consultation
            </button>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaEuroSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Earn €18,000/Year</h3>
              <p className="text-blue-200 text-sm">Paid internships at luxury hotels</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Visa Success</h3>
              <p className="text-blue-200 text-sm">Guaranteed approval with our expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Double Degrees</h3>
              <p className="text-blue-200 text-sm">Cyprus & UK degrees from same program</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
