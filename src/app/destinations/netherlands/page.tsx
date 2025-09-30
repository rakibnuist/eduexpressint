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
  FaLightbulb,
  FaEuroSign,
  FaHeart,
  FaChartLine,
  FaHandshake,
  FaGlobeEurope,
  FaMedal,
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
  FaExclamationTriangle,
  FaSearch,
  FaHotel,
  FaPassport
} from 'react-icons/fa';

export default function NetherlandsPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('netherlands');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('Netherlands Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['netherlands-cta'],
      value: 1
    });
    openCTA(source);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'programs', label: 'Programs', icon: FaGraduationCap },
    { id: 'universities', label: 'Universities', icon: FaUniversity },
    { id: 'requirements', label: 'Requirements', icon: FaFileAlt },
    { id: 'process', label: 'Process', icon: FaClipboardList }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <FaLightbulb className="h-12 w-12 text-yellow-400" />
          </div>
          <div className="absolute top-40 right-32 animate-float-slow delay-1000 opacity-20">
            <FaGraduationCap className="h-10 w-10 text-orange-400" />
          </div>
          <div className="absolute bottom-32 left-40 animate-float-slow delay-500 opacity-20">
            <FaUniversity className="h-14 w-14 text-red-400" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-slow delay-700 opacity-20">
            <FaCertificate className="h-8 w-8 text-pink-400" />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          <div className="text-center">
            {/* Enhanced Intake Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl animate-bounce hover:animate-none transition-all duration-300 transform hover:scale-105">
                <FaCalendarAlt className="h-6 w-6" />
                September 2025 & February 2026 Intakes Available
                <FaStar className="h-5 w-5 animate-spin" />
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">Netherlands</span>
            </h1>
            
            {/* Enhanced Subheading */}
            <div className="mb-8">
              <p className="text-3xl lg:text-4xl text-orange-100 mb-4 font-bold">
                🌟 Innovation & Excellence Hub
              </p>
              <p className="text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-bold">
                From €2,000 Per Year!
              </p>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl lg:text-2xl text-orange-200 mb-12 leading-relaxed max-w-5xl mx-auto">
              Experience <span className="font-bold text-yellow-400">world-class education</span> with 
              <span className="font-bold text-orange-400"> 2,000+ English programs</span> and 
              <span className="font-bold text-red-400"> cutting-edge innovation</span> in the heart of Europe.
            </p>
            
            {/* Enhanced Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaEuroSign className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-yellow-400 mb-2">€2k-€15k</div>
                <div className="text-lg text-orange-200 font-medium">Annual Tuition</div>
                <div className="text-sm text-orange-300 mt-2">Affordable</div>
                </div>
              
              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaLanguage className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-green-400 mb-2">2,000+</div>
                <div className="text-lg text-orange-200 font-medium">English Programs</div>
                <div className="text-sm text-orange-300 mt-2">No Language Barrier</div>
              </div>

              <div className="text-center bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FaHome className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold text-cyan-400 mb-2">€800</div>
                <div className="text-lg text-orange-200 font-medium">Monthly Living</div>
                <div className="text-sm text-orange-300 mt-2">Very Affordable</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button 
                  onClick={() => handleCTAClick('netherlands-hero')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 shadow-2xl text-xl group"
                >
                <FaRocket className="h-6 w-6 group-hover:animate-bounce" />
                Apply Now - Start Your Journey!
                <FaStar className="h-5 w-5 animate-pulse" />
                </button>
                <button 
                  onClick={() => handleCTAClick('netherlands-hero-consultation')}
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
                <div className="text-lg font-bold text-orange-200">EU Recognition</div>
                <div className="text-sm text-orange-300">European Standards</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaGlobeEurope className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-orange-200">EU Work Rights</div>
                <div className="text-sm text-orange-300">Post-Study Opportunities</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaLightbulb className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-orange-200">Innovation Hub</div>
                <div className="text-sm text-orange-300">Tech & Business</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FaPassport className="h-8 w-8 text-white" />
                </div>
                <div className="text-lg font-bold text-orange-200">Easy Visa Process</div>
                <div className="text-sm text-orange-300">High Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
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
                      ? 'text-orange-600 border-orange-600 bg-orange-50 shadow-sm'
                      : 'text-gray-600 border-transparent hover:text-orange-600 hover:border-orange-300'
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Study in Netherlands?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  🌟 Netherlands offers the perfect combination of <span className="font-bold text-orange-600">world-class education</span>, 
                  <span className="font-bold text-green-600"> innovation excellence</span>, and 
                  <span className="font-bold text-cyan-600"> EU work opportunities</span> in a progressive European environment.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaLanguage className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">2,000+ English Programs</h3>
                  <p className="text-gray-600 mb-4">Largest selection of English-taught programs in continental Europe with no language barriers.</p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-orange-800 font-semibold text-sm">🌍 No Language Barrier</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaLightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Innovation Excellence</h3>
                  <p className="text-gray-600 mb-4">Leading in technology, business innovation, and research with strong industry connections.</p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm">💡 Tech & Business Hub</p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaGlobeEurope className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">EU Work Rights</h3>
                  <p className="text-gray-600 mb-4">Work permit after graduation and access to entire EU job market with excellent career prospects.</p>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <p className="text-cyan-800 font-semibold text-sm">🇪🇺 EU Job Market Access</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Special Features Section */}
              <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-12 rounded-3xl border border-orange-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🌟 Special Features & Benefits</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaStar className="h-6 w-6 text-orange-500" />
                      Key Benefits
                    </h4>
                    <div className="space-y-4">
                      {[
                        "2,000+ English-taught programs",
                        "EU-recognized degrees", 
                        "No entrance exams for most programs",
                        "Direct admission process",
                        "Affordable living costs (€800/month)",
                        "Innovation and technology focus",
                        "Modern university facilities",
                        "Strong international community"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                          <FaCheckCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaCalendarAlt className="h-6 w-6 text-orange-500" />
                      Intake Information
                    </h4>
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h5 className="font-bold text-gray-900 mb-3">Available Intakes</h5>
                        <div className="space-y-2">
                          {["September 2025", "February 2026"].map((intake, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-700 font-medium">{intake}</span>
                  </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Visa Success Rate</h5>
                        <p className="text-orange-100">95%+ success rate with our expert guidance and proven application process</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-xl text-white">
                        <h5 className="font-bold mb-2">Processing Time</h5>
                        <p className="text-cyan-100">Quick 2-3 week visa processing with streamlined documentation</p>
                      </div>
                    </div>
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
                  Choose from over <span className="font-bold text-orange-600">2,000 English-taught programs</span> including 
                  <span className="font-bold text-green-600"> cutting-edge technology</span> and 
                  <span className="font-bold text-cyan-600"> innovative business programs</span>.
                </p>
              </div>

              <div className="space-y-12">
                {/* Technology Programs */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <FaLaptopCode className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Technology & Innovation</h3>
                      <p className="text-gray-600">Leading tech programs with industry focus</p>
                    </div>
                </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-2xl border border-orange-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaCode className="h-6 w-6 text-orange-600" />
                        <h4 className="text-xl font-bold text-gray-800">Computer Science</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-orange-500" />
                          Computer Science (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-orange-500" />
                          Artificial Intelligence (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-orange-500" />
                          Data Science (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-orange-500" />
                          Software Engineering (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-orange-500" />
                          Cybersecurity (BSc/MSc)
                        </li>
                  </ul>
                      <div className="bg-orange-200 p-4 rounded-xl">
                        <p className="text-orange-800 font-semibold text-sm">
                          💰 Fees: €2,000-15,000 per year
                        </p>
                      </div>
                </div>

                    <div className="bg-gradient-to-br from-red-50 to-orange-100 p-6 rounded-2xl border border-red-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaMicroscope className="h-6 w-6 text-red-600" />
                        <h4 className="text-xl font-bold text-gray-800">Engineering</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-red-500" />
                          Civil Engineering (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-red-500" />
                          Mechanical Engineering (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-red-500" />
                          Electrical Engineering (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-red-500" />
                          Aerospace Engineering (BSc/MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-red-500" />
                          Biomedical Engineering (BSc/MSc)
                        </li>
                  </ul>
                      <div className="bg-red-200 p-4 rounded-xl">
                        <p className="text-red-800 font-semibold text-sm">
                          💰 Fees: €3,000-15,000 per year
                        </p>
                </div>
              </div>
            </div>
                </div>

                {/* Business Programs */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaBuilding className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Business & Economics</h3>
                      <p className="text-gray-600">European-standard business education</p>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaBriefcase className="h-6 w-6 text-blue-600" />
                        <h4 className="text-xl font-bold text-gray-800">Bachelor Programs</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Business Administration (BBA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          International Business (BSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Economics (BSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Marketing (BSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Finance & Banking (BSc)
                        </li>
                      </ul>
                      <div className="bg-blue-200 p-4 rounded-xl">
                        <p className="text-blue-800 font-semibold text-sm">
                          💰 Fees: €2,000-12,000 per year
                        </p>
                      </div>
              </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaChartBar className="h-6 w-6 text-indigo-600" />
                        <h4 className="text-xl font-bold text-gray-800">Master's Programs</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                          Master of Business Administration (MBA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                          Master of Economics (MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                          Master of Finance (MSc)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                          Master of Marketing (MSc)
                        </li>
                  </ul>
                      <div className="bg-indigo-200 p-4 rounded-xl">
                        <p className="text-indigo-800 font-semibold text-sm">
                          💰 Fees: €3,000-15,000 per year
                        </p>
                      </div>
                </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaGavel className="h-6 w-6 text-purple-600" />
                        <h4 className="text-xl font-bold text-gray-800">Law Programs</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-purple-500" />
                          Bachelor of Laws (LLB)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-purple-500" />
                          Master of Laws (LLM)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-purple-500" />
                          International Law (LLM)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-purple-500" />
                          Business Law (LLM)
                        </li>
                  </ul>
                      <div className="bg-purple-200 p-4 rounded-xl">
                        <p className="text-purple-800 font-semibold text-sm">
                          💰 Fees: €2,000-12,000 per year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creative Programs */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-cyan-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <FaPalette className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Creative Arts & Design</h3>
                      <p className="text-gray-600">Innovative creative programs</p>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl border border-cyan-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaPalette className="h-6 w-6 text-cyan-600" />
                        <h4 className="text-xl font-bold text-gray-800">Design Programs</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                          Graphic Design (BA/BFA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                          Industrial Design (BA/BFA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                          Fashion Design (BA/BFA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                          Architecture (BA/BArch)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                          Media Studies (BA/MA)
                        </li>
                  </ul>
                      <div className="bg-cyan-200 p-4 rounded-xl">
                        <p className="text-cyan-800 font-semibold text-sm">
                          💰 Fees: €2,000-10,000 per year
                        </p>
                      </div>
                </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <FaGamepad className="h-6 w-6 text-blue-600" />
                        <h4 className="text-xl font-bold text-gray-800">Media & Gaming</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Game Design (BA/MA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Digital Media (BA/MA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Animation (BA/MA)
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCheckCircle className="h-4 w-4 text-blue-500" />
                          Film Studies (BA/MA)
                        </li>
                  </ul>
                      <div className="bg-blue-200 p-4 rounded-xl">
                        <p className="text-blue-800 font-semibold text-sm">
                          💰 Fees: €2,000-10,000 per year
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
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">🏛️ Top Universities</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Netherlands is home to several <span className="font-bold text-orange-600">world-class universities</span> with 
                  <span className="font-bold text-green-600"> excellent international programs</span> and 
                  <span className="font-bold text-cyan-600"> strong industry connections</span>.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* University of Amsterdam */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <FaUniversity className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">University of Amsterdam</h3>
                      <p className="text-gray-600">Leading research university in Europe</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Founded in 1632, UvA is one of the largest comprehensive universities in Europe, 
                    offering world-class education with strong focus on research and international programs.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "🏛️ Founded in 1632 - Historic Excellence",
                      "🌍 7 faculties, 300+ programs",
                      "📚 Strong in social sciences and humanities",
                      "🏆 International reputation",
                      "🤝 Global partnerships",
                      "💼 Excellent career support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200">
                    <h4 className="text-lg font-bold text-orange-800 mb-3">🎯 Specializations</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Social Sciences</span>
                      <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Humanities</span>
                      <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Business</span>
                      <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Law</span>
                    </div>
                  </div>
                </div>

                {/* Delft University of Technology */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaMicroscope className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Delft University of Technology</h3>
                      <p className="text-gray-600">Premier engineering and technology university</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    TU Delft is the oldest and largest Dutch public technical university, 
                    known for its excellence in engineering, technology, and innovation.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "🔬 Founded in 1842 - Engineering Excellence",
                      "⚙️ Engineering and technology focus",
                      "🏭 Strong industry connections",
                      "🔬 Research excellence",
                      "🌍 International programs",
                      "💼 High employment rates"
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
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Engineering</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Technology</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Architecture</span>
                      <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Design</span>
                    </div>
                  </div>
                </div>

                {/* Erasmus University Rotterdam */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <FaBuilding className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Erasmus University Rotterdam</h3>
                      <p className="text-gray-600">Leading business and economics university</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    EUR is a leading international research university with strong focus on 
                    business, economics, and social sciences with excellent corporate partnerships.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "💼 Founded in 1913 - Business Excellence",
                      "📊 Business and economics focus",
                      "🌍 International programs",
                      "🤝 Strong corporate partnerships",
                      "📈 Career placement support",
                      "🏆 Top-ranked business school"
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
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Business</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Economics</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Management</span>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Finance</span>
                    </div>
                  </div>
                </div>

                {/* Utrecht University */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaFlask className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Utrecht University</h3>
                      <p className="text-gray-600">Comprehensive research university</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    UU is one of the oldest universities in the Netherlands, offering 
                    comprehensive programs with strong focus on sciences and research excellence.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "🔬 Founded in 1636 - Research Excellence",
                      "📚 Wide range of programs",
                      "🧪 Strong in sciences",
                      "🌍 International community",
                      "🏆 Research excellence",
                      "💼 Career development support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
                    <h4 className="text-lg font-bold text-purple-800 mb-3">🎯 Specializations</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Sciences</span>
                      <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Medicine</span>
                      <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Veterinary</span>
                      <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Research</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* University Comparison */}
              <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-12 rounded-3xl border border-orange-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">📊 University Comparison</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-orange-600 mb-6 flex items-center gap-3">
                      <FaUniversity className="h-6 w-6" />
                      Research Universities
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">University of Amsterdam</span>
                        <span className="font-bold text-orange-600">#58 QS World</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">Utrecht University</span>
                        <span className="font-bold text-orange-600">#107 QS World</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">Erasmus University</span>
                        <span className="font-bold text-orange-600">#176 QS World</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">Tuition Range</span>
                        <span className="font-bold text-orange-600">€2,000-15,000/year</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                      <FaMicroscope className="h-6 w-6" />
                      Technical Universities
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">TU Delft</span>
                        <span className="font-bold text-blue-600">#47 QS World</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">TU Eindhoven</span>
                        <span className="font-bold text-blue-600">#138 QS World</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">TU Twente</span>
                        <span className="font-bold text-blue-600">#189 QS World</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Tuition Range</span>
                        <span className="font-bold text-blue-600">€3,000-15,000/year</span>
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
                  Simple and straightforward requirements for studying in Netherlands. We help you with <span className="font-bold text-orange-600">all documentation</span> and 
                  <span className="font-bold text-green-600"> guarantee high visa success rate</span>.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Academic Requirements */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <FaGraduationCap className="h-8 w-8 text-white" />
                    </div>
                      <div>
                      <h3 className="text-2xl font-bold text-gray-900">Academic Requirements</h3>
                      <p className="text-gray-600">Basic Educational Requirements</p>
                      </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: "High School Diploma", desc: "Equivalent to Dutch VWO or HBO for most programs", icon: "🎓" },
                      { title: "English Proficiency", desc: "IELTS 6.0+ or TOEFL 80+ (varies by program)", icon: "🌍" },
                      { title: "No Entrance Exam", desc: "Direct admission based on academic records", icon: "✅" },
                      { title: "Age Requirement", desc: "17+ years for undergraduate programs", icon: "📅" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{item.icon}</span>
                            <strong className="text-gray-900">{item.title}</strong>
                      </div>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                    <p className="text-orange-800 font-semibold text-sm">
                      💡 Lower requirements than most countries
                    </p>
                  </div>
                </div>

                {/* English Requirements */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaLanguage className="h-8 w-8 text-white" />
                    </div>
                      <div>
                      <h3 className="text-2xl font-bold text-gray-900">English Requirements</h3>
                      <p className="text-gray-600">Language Proficiency</p>
                      </div>
                </div>

                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                      <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <FaGraduationCap className="h-5 w-5" />
                        Bachelor Programs
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">IELTS</div>
                          <div className="font-bold text-blue-600">6.0+</div>
                </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">TOEFL</div>
                          <div className="font-bold text-blue-600">80+</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">PTE</div>
                          <div className="font-bold text-blue-600">58+</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">CEFR</div>
                          <div className="font-bold text-blue-600">B2</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                      <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                        <FaBookOpen className="h-5 w-5" />
                        Master's Programs
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">IELTS</div>
                          <div className="font-bold text-orange-600">6.5+</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">TOEFL</div>
                          <div className="font-bold text-orange-600">90+</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">PTE</div>
                          <div className="font-bold text-orange-600">65+</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <div className="text-sm text-gray-600">CEFR</div>
                          <div className="font-bold text-orange-600">B2+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-blue-800 font-semibold text-sm">
                      🎯 University English tests also accepted
                    </p>
                  </div>
                </div>

                {/* Document Requirements */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <FaFileAlt className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Document Requirements</h3>
                      <p className="text-gray-600">Required Documents</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "📄 Academic transcripts and certificates",
                      "🌍 English language test results",
                      "📘 Passport copy (valid 2+ years)",
                      "📝 CV/Resume",
                      "✍️ Motivation letter (500 words)",
                      "🏥 Medical certificate",
                      "📸 Passport-sized photos (white background)",
                      "💰 Bank statement (6 months)"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                        <FaCheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
                    <p className="text-purple-800 font-semibold text-sm">
                      ✅ We help prepare all documents
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Support Section */}
              <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-12 rounded-3xl border border-orange-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">🛠️ We Handle Everything For You</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FaFileAlt className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-gray-900">Document Preparation</h4>
                    <p className="text-gray-600">We help prepare, translate, and attest all required documents</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FaShieldAlt className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-gray-900">Visa Application</h4>
                    <p className="text-gray-600">Complete visa application support with high success rate</p>
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
                  Simple <span className="font-bold text-orange-600">5-step process</span> to start your Netherlands education journey. We handle everything for you with 
                  <span className="font-bold text-green-600"> high success rate</span>.
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    title: "Initial Consultation & Program Selection",
                    description: "Free consultation to understand your goals and select the best program. We help you choose between technology, business, or creative programs based on your interests and career aspirations.",
                    icon: FaHandshake,
                    color: "orange"
                  },
                  {
                    step: 2,
                    title: "Document Preparation & Submission",
                    description: "We help you gather and prepare all required documents including academic certificates, English test results, passport, and personal statement. All documents are translated and attested by us.",
                    icon: FaFileAlt,
                    color: "blue"
                  },
                  {
                    step: 3,
                    title: "University Application & Offer Letter",
                    description: "We submit your application to the chosen university and handle all communication. You'll receive your offer letter within 1-2 weeks of application submission.",
                    icon: FaUniversity,
                    color: "purple"
                  },
                  {
                    step: 4,
                    title: "Tuition Payment & Documentation",
                    description: "After accepting the offer, we help you make the tuition payment and prepare all necessary documentation for visa application.",
                    icon: FaMoneyBillWave,
                    color: "green"
                  },
                  {
                    step: 5,
                    title: "Visa Application & Travel Arrangements",
                    description: "We assist with the complete visa application process including medical tests and embassy submission. Visa processing takes 2-3 weeks, then we help with travel arrangements.",
                    icon: FaPlane,
                    color: "cyan"
                  }
                ].map((step, index) => {
                  const Icon = step.icon;
                  const colorClasses: { [key: string]: string } = {
                    orange: "from-orange-500 to-red-600",
                    blue: "from-blue-500 to-indigo-600",
                    purple: "from-purple-500 to-indigo-600",
                    green: "from-green-500 to-emerald-600",
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
              <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-12 rounded-3xl border border-orange-100">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">⏰ Timeline & Important Information</h3>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaClock className="h-6 w-6 text-orange-600" />
                      Processing Times
                    </h4>
                    <div className="space-y-4">
                      {[
                        { item: "Offer Letter", time: "1-2 weeks", color: "orange" },
                        { item: "Documentation", time: "10-15 days", color: "blue" },
                        { item: "Tuition Payment", time: "Within 1 week", color: "purple" },
                        { item: "Visa Processing", time: "2-3 weeks", color: "green" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <span className="font-medium text-gray-700">{item.item}</span>
                          <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                            item.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                            item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
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
                        "📅 Start application 2-3 months before intake",
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
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-12 rounded-3xl text-white text-center">
                <h3 className="text-3xl font-bold mb-6">🎯 High Success Guarantee</h3>
                <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                  We guarantee your admission and visa approval. If for any reason your application is not successful, 
                  we will refund all our service fees and help you apply to alternative programs.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <FaShieldAlt className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Guaranteed Admission</h4>
                    <p className="text-orange-100">95%+ admission success rate</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <FaPassport className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Visa Success</h4>
                    <p className="text-orange-100">95%+ visa approval rate</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <FaHandshake className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Full Support</h4>
                    <p className="text-orange-100">End-to-end assistance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaStar className="h-5 w-5" />
              Limited Time Opportunity - Apply Now!
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            🚀 Start Your Innovation Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Netherlands</span>
          </h2>
          
          <p className="text-xl text-orange-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who are already pursuing <span className="font-bold text-yellow-400">world-class education</span> at 
            <span className="font-bold text-orange-400"> affordable costs</span>. Get cutting-edge education with 2,000+ English programs!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('netherlands-cta')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-5 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply Now - Start Your Journey!
            </button>
            <button 
              onClick={() => handleCTAClick('netherlands-cta-consultation')}
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
              <h3 className="text-xl font-bold mb-2">From €2,000/Year</h3>
              <p className="text-orange-200 text-sm">Affordable world-class education</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">95%+ Visa Success</h3>
              <p className="text-orange-200 text-sm">High approval rate with our expertise</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">EU Recognition</h3>
              <p className="text-orange-200 text-sm">European-standard degrees</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
