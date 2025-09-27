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

export default function UKPage() {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('overview');

  const destination = findDestination('uk');
  
  if (!destination) {
    return <div>Destination not found</div>;
  }

  const handleCTAClick = (source: string) => {
    trackViewContent('UK Page CTA Click', {
      content_category: 'Destination Page',
      content_ids: ['uk-cta'],
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
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
                <FaStar className="h-5 w-5" />
                January 2026, May 2026 & September 2026 Intakes Available
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Study in the <span className="text-yellow-400">United Kingdom</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Experience world-class education at prestigious UK universities with excellent scholarship opportunities and global recognition.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => handleCTAClick('UK Hero - Explore Scholarships')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                >
                  <FaTrophy className="h-5 w-5" />
                  Explore Scholarships
                </button>
                <button
                  onClick={() => handleCTAClick('UK Hero - Free Consultation')}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  <FaPhone className="h-5 w-5" />
                  Get Free Consultation
                </button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">£15k-£35k</div>
                  <div className="text-sm text-gray-300">Tuition per year</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">160+</div>
                  <div className="text-sm text-gray-300">Universities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">98%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">£800-£1200</div>
                  <div className="text-sm text-gray-300">Monthly Living</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">🎓🇬🇧 STUDY IN THE UK – EXCELLENT OPPORTUNITIES!</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaTrophy className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">Chevening & Commonwealth Scholarships</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaAward className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">University Merit Scholarships up to £10,000/year</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUniversity className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">Russell Group Universities - World Rankings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRocket className="h-6 w-6 text-yellow-400" />
                    <span className="text-lg">Post-Study Work Visa Available</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl border-2 border-blue-400/50">
                  <div className="text-center">
                    <div className="text-lg text-blue-200 mb-2 font-bold">🎯 JANUARY, MAY & SEPTEMBER 2026 INTAKES!</div>
                    <div className="text-xl font-bold text-yellow-400 mb-2">Apply now for world-class UK education!</div>
                    <div className="text-sm text-blue-200">Multiple intake opportunities available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UK Intake Highlight Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
              <FaCalendarAlt className="h-5 w-5" />
              January, May & September 2026 Intakes Available
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Study in the UK with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">World-Class Education</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join prestigious UK universities including Russell Group institutions with excellent scholarship opportunities. 
              Experience world-class education with global recognition and post-study work opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Scholarship Statistics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">
                UK Education Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-500/20 rounded-lg">
                  <span className="font-semibold">Russell Group</span>
                  <span className="text-2xl font-bold text-yellow-400">24</span>
                  <span className="text-sm">Universities</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-lg">
                  <span className="font-semibold">Scholarships</span>
                  <span className="text-2xl font-bold text-green-400">£10k</span>
                  <span className="text-sm">per year</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-lg">
                  <span className="font-semibold">Post-Study Work</span>
                  <span className="text-2xl font-bold text-blue-400">2</span>
                  <span className="text-sm">years</span>
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
                  <div className="font-bold text-green-200">Business & Management</div>
                  <div className="text-sm text-green-100">MBA, Finance, Marketing, International Business</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Engineering & Technology</div>
                  <div className="text-sm text-green-100">Computer Science, AI, Mechanical, Civil</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Medicine & Health</div>
                  <div className="text-sm text-green-100">Medicine, Dentistry, Pharmacy, Nursing</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="font-bold text-green-200">Arts & Humanities</div>
                  <div className="text-sm text-green-100">Law, Literature, History, Psychology</div>
                </div>
              </div>
            </div>

            {/* Why Choose UK */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">
                Why Choose UK?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">World-Class Education</div>
                    <div className="text-sm text-gray-300">Top-ranked universities globally</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Post-Study Work Visa</div>
                    <div className="text-sm text-gray-300">2-year work opportunity after graduation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Global Recognition</div>
                    <div className="text-sm text-gray-300">Degrees recognized worldwide</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Scholarship Opportunities</div>
                    <div className="text-sm text-gray-300">Multiple funding options available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleCTAClick('UK Intake - Apply Now')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto shadow-xl text-lg"
            >
              <FaRocket className="h-6 w-6" />
              Apply for UK Intake
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
            {/* Why Study in the UK */}
            <section>
              <h2 className="text-4xl font-bold text-center mb-12">Why Study in the UK?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: FaTrophy, title: "World-Class Universities", desc: "Russell Group institutions with global rankings" },
                  { icon: FaDollarSign, title: "Scholarship Opportunities", desc: "Chevening, Commonwealth & university scholarships" },
                  { icon: FaHome, title: "Post-Study Work Visa", desc: "2-year work opportunity after graduation" },
                  { icon: FaLanguage, title: "English Language", desc: "Native English-speaking environment" },
                  { icon: FaGlobe, title: "Global Recognition", desc: "Degrees recognized worldwide with excellent reputation" },
                  { icon: FaRocket, title: "Career Opportunities", desc: "Strong job market and networking opportunities" },
                  { icon: FaBookOpen, title: "Diverse Programs", desc: "From traditional arts to cutting-edge technology" },
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
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center">
                  <FaCalendarAlt className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-3xl font-bold mb-4">January Intake</h4>
                  <p className="text-xl mb-4">Spring Semester</p>
                  <p className="text-blue-100">Available for 2026</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 text-white text-center">
                  <FaCalendarAlt className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-3xl font-bold mb-4">May Intake</h4>
                  <p className="text-xl mb-4">Summer Semester</p>
                  <p className="text-purple-100">Available for 2026</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-8 text-white text-center">
                  <FaCalendarAlt className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-3xl font-bold mb-4">September Intake</h4>
                  <p className="text-xl mb-4">Autumn Semester</p>
                  <p className="text-indigo-100">Available for 2026</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Scholarships Tab */}
        {activeTab === 'scholarships' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Scholarship Opportunities</h2>
            
            {/* Chevening Scholarship */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaTrophy className="h-8 w-8" />
                  Chevening Scholarships
                </h3>
                <p className="text-xl text-blue-100">The UK government's global scholarship programme - Funded by the Foreign, Commonwealth & Development Office</p>
                <div className="mt-4 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                  <div className="text-center">
                    <div className="text-sm text-yellow-200 mb-1">2025-2026 Application Deadlines</div>
                    <div className="text-lg font-bold text-yellow-400">September 2025 Intake: June 2025 | January 2026 Intake: October 2025</div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-blue-600">Coverage & Benefits</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Full tuition fee coverage</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Monthly living allowance: £1,200-1,500</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Return economy airfare</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Arrival allowance: £500</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Thesis grant: £500</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-4 text-orange-600">Eligibility & Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Citizen of Chevening-eligible country</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Return to home country for 2 years</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Academic excellence (2:1 or equivalent)</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">2+ years work experience</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">English proficiency: IELTS 6.5+ or equivalent</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Commonwealth & University Scholarships */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FaAward className="h-8 w-8" />
                  Commonwealth & University Scholarships
                </h3>
                <p className="text-xl text-blue-100">Government and institutional scholarship programs we help you access</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-blue-600">Commonwealth Scholarships</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Commonwealth Master's Scholarships</div>
                      <div className="text-sm text-blue-600">Full tuition + living allowance</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Commonwealth PhD Scholarships</div>
                      <div className="text-sm text-blue-600">Full funding for 3-4 years</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Commonwealth Split-site Scholarships</div>
                      <div className="text-sm text-blue-600">12 months in UK + home country</div>
                    </div>
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
                      <div className="font-semibold text-purple-800 text-lg">Oxford Clarendon Scholarships</div>
                      <div className="text-sm text-purple-600">Full tuition + living allowance</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Cambridge Gates Scholarships</div>
                      <div className="text-sm text-purple-600">Full funding for international students</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">Imperial College Scholarships</div>
                      <div className="text-sm text-purple-600">Merit-based awards up to £10,000/year</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="font-semibold text-purple-800 text-lg">LSE Graduate Support Scheme</div>
                      <div className="text-sm text-purple-600">Need-based awards up to £15,000</div>
                    </div>
                    <p className="text-gray-600 text-sm font-medium">🌟 Merit-based scholarships offered directly by top UK universities - We help you apply!</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold mb-4 text-green-600">Special Programs</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Marshall Scholarships</div>
                      <div className="text-sm text-green-600">US citizens studying in UK</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Rhodes Scholarships</div>
                      <div className="text-sm text-green-600">Oxford University funding</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Fulbright Scholarships</div>
                      <div className="text-sm text-green-600">US-UK exchange programs</div>
                    </div>
                    <p className="text-gray-600 text-sm">Special programs for specific countries and international exchange</p>
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
              <p className="text-xl text-purple-100 mb-6">Direct scholarships from top UK universities - often easier to get than government scholarships!</p>
              
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
                      <span className="font-medium">Oxford University</span>
                      <span className="text-yellow-400 font-bold">Clarendon Scholarships</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Cambridge University</span>
                      <span className="text-yellow-400 font-bold">Gates Scholarships</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Imperial College</span>
                      <span className="text-yellow-400 font-bold">Up to £10,000/year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">LSE</span>
                      <span className="text-yellow-400 font-bold">Up to £15,000</span>
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
                  "Start application 6-8 months before your preferred intake",
                  "Maintain excellent academic records (2:1 or equivalent for Chevening)",
                  "Prepare strong personal statement and 2-3 recommendation letters",
                  "Obtain IELTS 6.5+ or equivalent for English proficiency",
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
              
            </section>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Study Programs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Business & Management", icon: FaBriefcase, programs: "MBA, Finance, Marketing, Economics", duration: "1-2 years", tuition: "£15k-35k/year", scholarship: "Scholarships Available", highlight: true },
                { name: "Engineering & Technology", icon: FaBuilding, programs: "Computer Science, AI, Mechanical, Civil", duration: "3-4 years", tuition: "£20k-40k/year", scholarship: "Scholarships Available", highlight: true },
                { name: "Medicine & Health", icon: FaMicroscope, programs: "Medicine, Dentistry, Pharmacy, Nursing", duration: "4-6 years", tuition: "£25k-45k/year", scholarship: "Limited Scholarships", highlight: false },
                { name: "Arts & Humanities", icon: FaBookOpen, programs: "Law, Literature, History, Psychology", duration: "3-4 years", tuition: "£15k-30k/year", scholarship: "Scholarships Available", highlight: true }
              ].map((program, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group ${program.highlight ? 'border-2 border-green-200' : ''}`}>
                  {program.highlight && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      SCHOLARSHIP
                    </div>
                  )}
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <program.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-3">{program.programs}</p>
                  <div className="text-sm text-gray-500 mb-2">Duration: {program.duration}</div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">{program.tuition}</div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    program.scholarship.includes('Available') ? 'bg-green-100 text-green-800' :
                    program.scholarship.includes('Limited') ? 'bg-orange-100 text-orange-800' :
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
                  <p className="text-gray-600">Chevening, Commonwealth & university scholarships</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">English Medium</h4>
                  <p className="text-gray-600">Native English-speaking environment</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUniversity className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">World-Class Universities</h4>
                  <p className="text-gray-600">Russell Group & top-ranked institutions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Post-Study Work</h4>
                  <p className="text-gray-600">2-year Graduate Route visa</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Top Universities in the UK</h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                <FaCalendarAlt className="h-5 w-5" />
                🎓 JANUARY, MAY & SEPTEMBER 2026 INTAKES - APPLY NOW! 🎓
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "University of Oxford", 
                  rank: "Ranking: #1 (QS World)", 
                  programs: "Business, Engineering, Medicine, Law, Arts", 
                  city: "Oxford, England", 
                  scholarship: "Clarendon Scholarships Available", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Oct 15, 2025"
                },
                { 
                  name: "University of Cambridge", 
                  rank: "Ranking: #2 (QS World)", 
                  programs: "Business, Engineering, Medicine, Law, Arts", 
                  city: "Cambridge, England", 
                  scholarship: "Gates Scholarships Available", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Oct 15, 2025"
                },
                { 
                  name: "Imperial College London", 
                  rank: "Ranking: #6 (QS World)", 
                  programs: "Engineering, Medicine, Business, Computer Science", 
                  city: "London, England", 
                  scholarship: "Merit Scholarships up to £10,000", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£30,000-40,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "London School of Economics (LSE)", 
                  rank: "Ranking: #45 (QS World)", 
                  programs: "Economics, Business, Law, Social Sciences", 
                  city: "London, England", 
                  scholarship: "Graduate Support Scheme up to £15,000", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University College London (UCL)", 
                  rank: "Ranking: #9 (QS World)", 
                  programs: "Engineering, Medicine, Business, Arts, Sciences", 
                  city: "London, England", 
                  scholarship: "Global Excellence Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Edinburgh", 
                  rank: "Ranking: #22 (QS World)", 
                  programs: "Business, Engineering, Medicine, Arts, Sciences", 
                  city: "Edinburgh, Scotland", 
                  scholarship: "Edinburgh Global Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "King's College London", 
                  rank: "Ranking: #40 (QS World)", 
                  programs: "Medicine, Law, Business, Arts, Sciences", 
                  city: "London, England", 
                  scholarship: "International Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£25,000-35,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Manchester", 
                  rank: "Ranking: #32 (QS World)", 
                  programs: "Engineering, Business, Medicine, Arts, Sciences", 
                  city: "Manchester, England", 
                  scholarship: "International Excellence Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                },
                { 
                  name: "University of Bristol", 
                  rank: "Ranking: #55 (QS World)", 
                  programs: "Engineering, Business, Medicine, Arts, Sciences", 
                  city: "Bristol, England", 
                  scholarship: "Think Big Scholarships", 
                  march2026: false,
                  foundation: "N/A",
                  bachelor: "£20,000-30,000/year",
                  deadline: "Jan 15, 2026"
                }
              ].map((university, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaUniversity className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
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
                Clear requirements for UK study programs - we help you with everything
              </p>
            </div>
            
            {/* Academic Requirements */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
              <h3 className="text-3xl font-bold mb-12 text-center">Academic Requirements</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                    <FaGraduationCap className="h-6 w-6" />
                    Undergraduate Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">A-Levels or Equivalent</div>
                        <div className="text-sm text-gray-600">AAB-AAA for Russell Group, BBC-ABB for other universities</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">International Qualifications</div>
                        <div className="text-sm text-gray-600">IB (32-38 points), SAT, or country-specific equivalents</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.0-7.0 or TOEFL 80-100 (varies by university)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">UCAS Personal Statement</div>
                        <div className="text-sm text-gray-600">4000 characters showcasing academic interests and goals</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-3">
                    <FaMicroscope className="h-6 w-6" />
                    Graduate Programs
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Bachelor's Degree</div>
                        <div className="text-sm text-gray-600">2:1 (Upper Second) or equivalent (60%+)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Relevant Academic Background</div>
                        <div className="text-sm text-gray-600">Related field of study or professional experience</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">English Proficiency</div>
                        <div className="text-sm text-gray-600">IELTS 6.5-7.5 or TOEFL 90-110 (varies by program)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                      <FaCheckCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold">Professional Experience</div>
                        <div className="text-sm text-gray-600">2-3 years for MBA, varies for other programs</div>
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
                      "A-Level certificates or equivalent qualifications",
                      "Academic transcripts (certified copies)",
                      "English translation of all documents (if required)",
                      "Passport copy (valid for 6+ months)",
                      "Passport-size photos (UK visa specifications)",
                      "UCAS application form (we help you complete)"
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
                      "Tuberculosis (TB) test certificate (if required)",
                      "Criminal record certificate (if required)",
                      "Financial proof (bank statements for 28+ days)",
                      "IELTS/TOEFL certificate (original copy)",
                      "Personal statement (we help you write)",
                      "Academic references (2 references required)"
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
                  <h4 className="text-xl font-bold mb-2">UCAS Application</h4>
                  <p className="text-green-100">We help complete your UCAS application and personal statement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">University Applications</h4>
                  <p className="text-green-100">We submit applications to multiple UK universities</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Student Visa Support</h4>
                  <p className="text-green-100">Complete UK student visa application assistance</p>
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
                  description: "Select your preferred UK university and program. Research scholarship opportunities including Chevening, Commonwealth, and university-specific scholarships. Check eligibility and requirements."
                },
                {
                  step: 2,
                  title: "Prepare Documents",
                  description: "Gather A-level certificates, academic transcripts, passport, academic references, personal statement, and IELTS/TOEFL certificates. Get documents translated and certified if required."
                },
                {
                  step: 3,
                  title: "Apply for Scholarships",
                  description: "We handle all scholarship applications including Chevening, Commonwealth, and university scholarships. Apply 6-8 months before your preferred intake."
                },
                {
                  step: 4,
                  title: "UCAS Application",
                  description: "We help you complete your UCAS application, personal statement, and submit to up to 5 UK universities. We handle all the paperwork and submission process for you."
                },
                {
                  step: 5,
                  title: "Receive Offers",
                  description: "Get your conditional or unconditional offers from UK universities. Results typically announced within 2-6 weeks of application submission."
                },
                {
                  step: 6,
                  title: "Student Visa Application",
                  description: "We assist with UK student visa (Tier 4) application with CAS letter, financial proof, TB test certificate, and all required documents."
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
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Journey in the UK?</h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join thousands of international students who have chosen the UK for their education. 
              Get expert guidance and support throughout your application process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => handleCTAClick('UK Bottom CTA - Free Consultation')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <FaPhone className="h-5 w-5" />
                Get Free Consultation
              </button>
              <button
                onClick={() => handleCTAClick('UK Bottom CTA - Scholarship Info')}
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
                <h3 className="text-lg font-semibold mb-2">Scholarships Available</h3>
                <p className="text-sm text-gray-300">Chevening, Commonwealth & university scholarships</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaUniversity className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">World-Class Universities</h3>
                <p className="text-sm text-gray-300">Russell Group & top-ranked institutions globally</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <FaRocket className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">98% Success Rate</h3>
                <p className="text-sm text-gray-300">Proven track record with expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

