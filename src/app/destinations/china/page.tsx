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
  FaLaptopCode
} from 'react-icons/fa';

export default function ChinaPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('china');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('China Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['china-cta'],
      value: 1
    });
    openCTA(source);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'scholarships', label: 'Scholarships', icon: FaTrophy },
    { id: 'programs', label: 'Programs', icon: FaGraduationCap },
    { id: 'universities', label: 'Universities', icon: FaUniversity },
    { id: 'requirements', label: 'Requirements', icon: FaFileAlt },
    { id: 'process', label: 'Process', icon: FaClipboardList }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg animate-pulse">
                <FaStar className="h-5 w-5" />
                🚨 MARCH 2026 INTAKE - APPLY NOW! 🚨
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Study in <span className="text-yellow-400">China</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {destination.summary}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => handleCTAClick('China Hero - Explore Scholarships')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                >
                  <FaTrophy className="h-5 w-5" />
                  Explore Scholarships
                </button>
                <button
                  onClick={() => handleCTAClick('China Hero - Free Consultation')}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  <FaPhone className="h-5 w-5" />
                  Get Free Consultation
                </button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">¥15k-¥35k</div>
                  <div className="text-sm text-gray-300">Tuition per year</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">180+</div>
                  <div className="text-sm text-gray-300">Universities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">95%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">¥600-¥1200</div>
                  <div className="text-sm text-gray-300">Monthly Living</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">🎓🇨🇳 STUDY IN CHINA – FULL SCHOLARSHIPS AVAILABLE!</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaTrophy className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">CSC Full Scholarships - Tuition + Living + Stipend</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaAward className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">Provincial Scholarships up to 40,000 CNY/year</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUniversity className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">University Scholarships - Full & Partial Coverage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRocket className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">World-class universities with English programs</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-xl border-2 border-red-400/50">
                  <div className="text-center">
                    <div className="text-lg text-red-200 mb-2 font-bold">🎯 MARCH 2026 INTAKE - LIMITED SPOTS!</div>
                    <div className="text-xl font-bold text-yellow-400 mb-2">Application Deadline: December 2025</div>
                    <div className="text-sm text-yellow-200">Don't miss out on scholarship opportunities!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* March 2026 Intake Highlight Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaCalendarAlt className="h-5 w-5" />
              March 2026 Intake - Application Deadline: January 20, 2026
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Study in China with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Full Scholarships</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join 9 prestigious universities offering Foundation + Bachelor programs with comprehensive scholarship opportunities. 
              Start your academic journey in March 2026 with full financial support.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Scholarship Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">
                Scholarship Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-500/20 rounded-lg">
                  <span className="font-semibold">100% Tuition Free</span>
                  <span className="text-2xl font-bold text-yellow-400">8</span>
                  <span className="text-sm">Universities</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg">
                  <span className="font-semibold">Monthly Stipend</span>
                  <span className="text-2xl font-bold text-green-400">1,500</span>
                  <span className="text-sm">CNY/month</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg">
                  <span className="font-semibold">Application Deadline</span>
                  <span className="text-2xl font-bold text-blue-400">Jan 20</span>
                  <span className="text-sm">2026</span>
                </div>
              </div>
            </div>

            {/* Top Programs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-green-400">
                Popular Programs
              </h3>
              <div className="space-y-3">
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Engineering & Technology</div>
                  <div className="text-sm text-green-100">Aeronautical, Computer Science, AI, Mechanical</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Business & Economics</div>
                  <div className="text-sm text-green-100">International Business, Economics, Trade</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Medicine & Pharmacy</div>
                  <div className="text-sm text-green-100">MBBS, Pharmacy, Clinical Pharmacy</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Specialized Fields</div>
                  <div className="text-sm text-green-100">Petroleum, Geology, Nuclear Engineering</div>
                </div>
              </div>
            </div>

            {/* Why Choose March 2026 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                Why March 2026?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Higher Success Rate</div>
                    <div className="text-sm text-gray-300">Less competition than September intake</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Foundation Preparation</div>
                    <div className="text-sm text-gray-300">5-month academic preparation program</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Comprehensive Support</div>
                    <div className="text-sm text-gray-300">We handle all applications and documentation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">English Medium</div>
                    <div className="text-sm text-gray-300">No Chinese language requirement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleCTAClick('March 2026 Intake - Apply Now')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply for March 2026 Intake
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 border-b-2 hover:bg-gray-50 ${
                    activeTab === tab.id
                      ? 'text-red-600 border-red-600 bg-red-50 shadow-sm'
                      : 'text-gray-600 border-transparent hover:text-red-600 hover:border-red-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Why Study in China */}
            <section>
              <h2 className="text-4xl font-bold text-center mb-12">Why Study in China?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: FaTrophy, title: "Full Scholarship Programs", desc: "CSC & provincial scholarships covering tuition and living" },
                  { icon: FaDollarSign, title: "Affordable Education", desc: "Low tuition fees with generous scholarship opportunities" },
                  { icon: FaHome, title: "Low Cost of Living", desc: "Approximately 600-1,200 CNY per month" },
                  { icon: FaLanguage, title: "English Programs", desc: "1000+ universities offer English-taught programs" },
                  { icon: FaGlobe, title: "Global Recognition", desc: "Degrees recognized worldwide with excellent reputation" },
                  { icon: FaRocket, title: "Rapidly Growing Economy", desc: "Strong job market and career opportunities" },
                  { icon: FaBookOpen, title: "Diverse Programs", desc: "From traditional medicine to cutting-edge technology" },
                  { icon: FaUsers, title: "International Community", desc: "500K+ international students from 180+ countries" }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Intakes */}
            <section>
              <h3 className="text-3xl font-bold text-center mb-8">Available Intakes</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white text-center">
                  <FaCalendarAlt className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-3xl font-bold mb-4">March Intake</h4>
                  <p className="text-xl mb-4">Spring Semester</p>
                  <p className="text-red-100">Application Deadline: December</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
                  <FaCalendarAlt className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-3xl font-bold mb-4">September Intake</h4>
                  <p className="text-xl mb-4">Fall Semester</p>
                  <p className="text-orange-100">Application Deadline: June</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Scholarships Tab */}
        {activeTab === 'scholarships' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Scholarship Opportunities</h2>
            
            {/* CSC Scholarship */}
            <section>
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaTrophy className="h-8 w-8" />
                  CSC (Chinese Government Scholarship)
                </h3>
                <p className="text-xl text-red-100">The most prestigious scholarship program in China - Administered by China Scholarship Council</p>
                <div className="mt-4 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="text-center">
                    <div className="text-sm text-yellow-200 mb-1">CSC Scholarship Available Only For</div>
                    <div className="text-lg font-bold text-yellow-400">September 2026 Intake - Application Deadline: March 2026</div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-red-600">Coverage & Benefits</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Full tuition fee waiver</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Monthly stipend: 2,500-3,500 CNY</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Free on-campus accommodation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Comprehensive medical insurance</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">One-time settlement allowance: 1,500 CNY</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-orange-600">Eligibility & Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Non-Chinese citizens in good health</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Excellent academic performance (GPA 3.0+)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Age: Under 25 (Bachelor's), Under 35 (Master's), Under 40 (PhD)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">HSK level 3+ or English proficiency (IELTS 6.0+)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">No other Chinese government scholarship recipient</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Provincial Scholarships */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaAward className="h-8 w-8" />
                  Provincial & University Scholarships
                </h3>
                <p className="text-xl text-blue-100">Regional and institutional scholarship programs we help you access</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Provincial Government Scholarships</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Beijing Government Scholarship</div>
                      <div className="text-sm text-blue-600">Up to 40,000 CNY/year</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Shanghai Municipal Scholarship</div>
                      <div className="text-sm text-blue-600">Up to 30,000 CNY/year</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Jiangsu Jasmine Scholarship</div>
                      <div className="text-sm text-blue-600">Full tuition + stipend</div>
                    </div>
                    <p className="text-gray-600 text-sm">Offered by provincial governments for specific regions and programs</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                  <h4 className="text-xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                    <FaUniversity className="h-5 w-5" />
                    University-Specific Scholarships
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">HIGHLIGHTED</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Tsinghua Schwarzman Scholars</div>
                      <div className="text-sm text-purple-600">Full tuition + stipend + leadership program</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Peking Yenching Academy</div>
                      <div className="text-sm text-purple-600">Full scholarship + China studies program</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Fudan University Scholarships</div>
                      <div className="text-sm text-purple-600">Merit-based awards up to 50% tuition</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Shanghai Jiao Tong University</div>
                      <div className="text-sm text-purple-600">Engineering excellence scholarships</div>
                    </div>
                    <p className="text-gray-600 text-sm font-medium">🌟 Merit-based scholarships offered directly by top universities - We help you apply!</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-green-600">Special Programs</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Confucius Institute Scholarship</div>
                      <div className="text-sm text-green-600">Chinese language studies</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Belt & Road Scholarships</div>
                      <div className="text-sm text-green-600">Regional cooperation programs</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Cultural Exchange Programs</div>
                      <div className="text-sm text-green-600">Government-sponsored initiatives</div>
                    </div>
                    <p className="text-gray-600 text-sm">Special programs for specific countries and cultural exchange</p>
                  </div>
                </div>
              </div>
            </section>

            {/* University Scholarships Highlight */}
            <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <FaUniversity className="h-8 w-8" />
                🎯 University Scholarships - Your Best Opportunity!
              </h3>
              <p className="text-xl text-purple-100 mb-6">Direct scholarships from top Chinese universities - often easier to get than government scholarships!</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold mb-4 text-yellow-400">Why University Scholarships?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>Higher success rate than government scholarships</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>Direct application to universities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>Multiple scholarship types available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="h-5 w-5 text-yellow-400" />
                      <span>We handle the entire application process</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold mb-4 text-yellow-400">Top University Scholarships</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tsinghua University</span>
                      <span className="text-yellow-400 font-bold">Full Coverage</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Peking University</span>
                      <span className="text-yellow-400 font-bold">Full Coverage</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Fudan University</span>
                      <span className="text-yellow-400 font-bold">Up to 50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Shanghai Jiao Tong</span>
                      <span className="text-yellow-400 font-bold">Up to 50%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Scholarship Application Tips */}
            <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-center mb-8">Scholarship Application Tips & Timeline</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Start application 6-8 months before intake (Dec 2025 for March 2026, Mar 2026 for Sept 2026 CSC)",
                  "Maintain excellent academic records (GPA 3.0+ for CSC)",
                  "Prepare strong personal statement and 2-3 recommendation letters",
                  "Obtain HSK level 3+ or IELTS 6.0+ for English programs",
                  "Research specific university and scholarship requirements",
                  "We handle all scholarship applications for you",
                  "Apply for multiple scholarships to increase chances",
                  "We help prepare and translate all required documents"
                ].map((tip, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                    <FaCheckCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                    <span className="text-lg font-medium">{tip}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200">
                <h4 className="text-xl font-bold text-red-800 mb-4 text-center">Important Application Deadlines 2026</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">March Intake</div>
                    <div className="text-lg text-red-700">Application Deadline: December 2025</div>
                    <div className="text-sm text-red-600">Results: January 2026</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">September Intake</div>
                    <div className="text-lg text-red-700">CSC Deadline: March 2026</div>
                    <div className="text-sm text-red-600">Results: July 2026</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Study Programs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Engineering", icon: FaBuilding, programs: "Mechanical, Civil, Computer", duration: "4 years", tuition: "¥15k-35k/year", scholarship: "Full/Partial Available", highlight: true },
                { name: "Business", icon: FaBriefcase, programs: "MBA, Finance, Marketing", duration: "2-4 years", tuition: "¥15k-35k/year", scholarship: "Full/Partial Available", highlight: true },
                { name: "Medicine (MBBS)", icon: FaMicroscope, programs: "MBBS, Dentistry, Pharmacy", duration: "5-6 years", tuition: "¥25k-40k/year", scholarship: "Self-funded", highlight: false },
                { name: "Aeronautical & Aerospace", icon: FaRocket, programs: "Aviation, Aerospace Engineering", duration: "4 years", tuition: "¥15k-35k/year", scholarship: "Scholarship/Self-funded", highlight: true }
              ].map((program, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group ${program.highlight ? 'border-2 border-green-200' : ''}`}>
                  {program.highlight && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      SCHOLARSHIP
                    </div>
                  )}
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <program.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3">{program.programs}</p>
                  <div className="text-sm text-gray-500 mb-2">Duration: {program.duration}</div>
                  <div className="text-sm font-semibold text-red-600 mb-2">{program.tuition}</div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    program.scholarship.includes('Full') ? 'bg-green-100 text-green-800' :
                    program.scholarship.includes('Self') ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {program.scholarship}
                  </div>
                </div>
              ))}
            </div>

            {/* Program Benefits */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-center mb-12">Why Choose Our Programs?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTrophy className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Scholarship Support</h4>
                  <p className="text-gray-600">100% tuition-free opportunities available</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">English Medium</h4>
                  <p className="text-gray-600">No Chinese language requirement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUniversity className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Foundation Program</h4>
                  <p className="text-gray-600">5-month academic preparation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Full Support</h4>
                  <p className="text-gray-600">We handle all applications</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Top Universities in China</h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <FaCalendarAlt className="h-5 w-5" />
                🚨 MARCH 2026 INTAKE - SCHOLARSHIPS AVAILABLE! 🚨
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "Nanjing University of Information Science and Technology (NUIST)", 
                  rank: "Ranking: 397", 
                  programs: "AI, Computer Science, Electronic Engineering, International Economics", 
                  city: "Nanjing, Jiangsu", 
                  scholarship: "100% Tuition Free (Top 40%)", 
                  march2026: true,
                  foundation: "7,500 CNY",
                  bachelor: "18,000 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "Zhengzhou University (ZZU)", 
                  rank: "Ranking: 259 (CWUR)", 
                  programs: "International Economics, Tourism, Civil Engineering, Pharmacy, MBBS", 
                  city: "Zhengzhou, Henan", 
                  scholarship: "100% Tuition Free (Category 1)", 
                  march2026: true,
                  foundation: "5,000 CNY",
                  bachelor: "23,000-36,000 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "China Pharmaceutical University (CPU)", 
                  rank: "Ranking: 724", 
                  programs: "International Economics, Pharmacy, Clinical Pharmacy", 
                  city: "Nanjing, Jiangsu", 
                  scholarship: "100% Tuition Free + 10,000 CNY", 
                  march2026: true,
                  foundation: "5,000 CNY",
                  bachelor: "19,000-25,000 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "Nanjing University of Aeronautics and Astronautics (NUAA)", 
                  rank: "Ranking: 761", 
                  programs: "Aeronautical Engineering, AI, Mechanical, Electrical, International Business", 
                  city: "Nanjing, Jiangsu", 
                  scholarship: "100% Tuition Free + Monthly Stipend", 
                  march2026: true,
                  foundation: "8,000 CNY",
                  bachelor: "22,900-23,900 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "China Three Gorges University (CTGU)", 
                  rank: "Ranking: 1246", 
                  programs: "Aeronautical, Computer Science, Business, Pharmacy, Civil Engineering", 
                  city: "Yichang, Hubei", 
                  scholarship: "100% Tuition Free (Hubei Scholarship)", 
                  march2026: true,
                  foundation: "5,000 CNY",
                  bachelor: "10,000-15,000 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "Nantong University (NTU)", 
                  rank: "Ranking: 1284", 
                  programs: "AI, Electronics, Mechanical, Civil Engineering", 
                  city: "Nantong, Jiangsu", 
                  scholarship: "8,000 CNY/year Tuition", 
                  march2026: true,
                  foundation: "8,000 CNY",
                  bachelor: "16,000 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "Linyi University (LYU)", 
                  rank: "Ranking: 1647", 
                  programs: "E-Commerce, Civil Engineering, Computer Science, International Business", 
                  city: "Linyi, Shandong", 
                  scholarship: "100% Tuition Free (1st Class)", 
                  march2026: true,
                  foundation: "4,000 CNY",
                  bachelor: "12,000 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "Xi'an Shiyou University (XSYU)", 
                  rank: "Ranking: 1969", 
                  programs: "Civil Engineering, Computer Science, Petroleum Engineering, Geology", 
                  city: "Xi'an, Shaanxi", 
                  scholarship: "100% Tuition Free + Monthly Stipend", 
                  march2026: true,
                  foundation: "3,000 CNY",
                  bachelor: "18,500 CNY/year",
                  deadline: "Jan 20, 2026"
                },
                { 
                  name: "Wuzhou University (WZU)", 
                  rank: "Regional University", 
                  programs: "Computer Science, International Trade and Economics", 
                  city: "Wuzhou, Guangxi", 
                  scholarship: "80% Scholarship (2,000 CNY/year)", 
                  march2026: true,
                  foundation: "Direct Bachelor",
                  bachelor: "2,000 CNY/year (after scholarship)",
                  deadline: "Jan 20, 2026"
                }
              ].map((university, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${university.march2026 ? 'border-2 border-red-200' : ''}`}>
                  {university.march2026 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      MARCH 2026
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <FaUniversity className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      {university.rank}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{university.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{university.programs}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                    {university.city}
                  </div>
                  
                  {/* Foundation Program */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-semibold text-blue-800">Foundation Program (March-July)</div>
                    <div className="text-xs text-blue-600">Tuition: {university.foundation}</div>
                  </div>
                  
                  {/* Bachelor Program */}
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="text-sm font-semibold text-green-800">Bachelor Program (Sept Start)</div>
                    <div className="text-xs text-green-600">Tuition: {university.bachelor}</div>
                  </div>
                  
                  {/* Scholarship */}
                  <div className="text-sm font-semibold text-green-600 mb-2 bg-green-100 px-2 py-1 rounded">
                    🎓 {university.scholarship}
                  </div>
                  
                  {/* Deadline */}
                  <div className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    📅 Deadline: {university.deadline}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Application Requirements</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple requirements for March 2026 intake - we help you with everything
              </p>
            </div>
            
            {/* Academic Requirements */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-12 text-center">Academic Requirements</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-3">
                    <FaGraduationCap className="h-6 w-6" />
                    Foundation + Bachelor Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">High School Certificate (HSC)</div>
                        <div className="text-sm text-gray-600">Minimum 2.50+ to 5.00+ (varies by university)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">Age Requirement</div>
                        <div className="text-sm text-gray-600">18-25 years old</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 5.5+ or equivalent (some universities)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-semibold">Health Certificate</div>
                        <div className="text-sm text-gray-600">Medical examination required</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-3">
                    <FaMicroscope className="h-6 w-6" />
                    MBBS Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">High School Certificate</div>
                        <div className="text-sm text-gray-600">Minimum 4.00+ GPA</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Science Background</div>
                        <div className="text-sm text-gray-600">Physics, Chemistry, Biology required</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.0+ or TOEFL 80+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Age Limit</div>
                        <div className="text-sm text-gray-600">18-25 years old</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Documents Required */}
            <section>
              <h3 className="text-3xl font-bold mb-12 text-center">Required Documents</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                    <FaFileAlt className="h-6 w-6" />
                    Academic Documents
                  </h4>
                  <div className="space-y-4">
                    {[
                      "High School Certificate (certified copy)",
                      "Academic transcripts (certified copy)",
                      "English translation of all documents",
                      "Passport copy (valid for 2+ years)",
                      "Passport-size photos (white background)",
                      "Application form (we help you complete)"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-green-600 flex items-center gap-3">
                    <FaShieldAlt className="h-6 w-6" />
                    Additional Documents
                  </h4>
                  <div className="space-y-4">
                    {[
                      "Medical examination certificate",
                      "Police clearance certificate",
                      "Financial proof (bank statements)",
                      "English proficiency certificate (if required)",
                      "Personal statement (we help you write)",
                      "Recommendation letters (we guide you)"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Application Support */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-8 text-center">We Handle Everything For You</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaFileAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Document Preparation</h4>
                  <p className="text-green-100">We help prepare and translate all required documents</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Application Submission</h4>
                  <p className="text-green-100">We submit all applications on your behalf</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Visa Support</h4>
                  <p className="text-green-100">Complete visa application assistance</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Application Process</h2>
            
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Choose Program & University",
                  description: "Select your preferred university and program. Research scholarship opportunities and requirements. Check eligibility for CSC, provincial, or university scholarships."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  description: "Gather academic transcripts, degree certificates, passport, recommendation letters, personal statement, and HSK/IELTS certificates. Get documents translated and certified."
                },
                {
                  step: 3,
                  title: "Apply for Scholarship",
                  description: "We handle all scholarship applications for you. Apply 6-8 months before intake deadline."
                },
                {
                  step: 4,
                  title: "University Application",
                  description: "We submit your application to the chosen university through our agency platform. We handle all the paperwork and submission process for you."
                },
                {
                  step: 5,
                  title: "Receive Admission Letter",
                  description: "Get your admission letter and scholarship confirmation from the university. Results typically announced in January 2026 (March intake) or July 2026 (September intake)."
                },
                {
                  step: 6,
                  title: "Visa Application",
                  description: "We assist with X1/X2 student visa application at Chinese embassy with admission letter, JW201/JW202 form, and all required documents."
                }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-900 via-orange-900 to-yellow-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Journey in China?</h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join thousands of international students who have chosen China for their education. 
              Get expert guidance and support throughout your application process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => handleCTAClick('China Bottom CTA - Free Consultation')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <FaPhone className="h-5 w-5" />
                Get Free Consultation
              </button>
              <button
                onClick={() => handleCTAClick('China Bottom CTA - Scholarship Info')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <FaTrophy className="h-5 w-5" />
                Scholarship Information
              </button>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaTrophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Full Scholarships Available</h3>
                <p className="text-sm text-gray-300">CSC and provincial scholarships covering tuition and living</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaUniversity className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">World-Class Universities</h3>
                <p className="text-sm text-gray-300">Top-ranked institutions with English-taught programs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaRocket className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">95% Success Rate</h3>
                <p className="text-sm text-gray-300">Proven track record with expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

