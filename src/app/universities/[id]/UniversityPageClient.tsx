'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IUniversity } from '@/models/University';
import { useCTA } from '@/context/CTAContext';
import { 
  FaTrophy, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaDollarSign, 
  FaGift, 
  FaQuestionCircle,
  FaBookOpen,
  FaRocket,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaUsers,
  FaFileAlt,
  FaCheckCircle,
  FaEnvelope
} from 'react-icons/fa';
import DOMPurify from 'isomorphic-dompurify';

type UniversityPageClientProps = {
  university: IUniversity & {
    destination: {
      name: string;
      slug: string;
    };
  };
};

export default function UniversityPageClient({ university }: UniversityPageClientProps) {
  const { openCTA } = useCTA();
  const [activeTab, setActiveTab] = useState('programs');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showFullAbout, setShowFullAbout] = useState(false);

  const tabs = [
    { id: 'programs', label: 'Programs', icon: FaGraduationCap },
    { id: 'fees', label: 'Fees', icon: FaDollarSign },
    { id: 'scholarships', label: 'Scholarships', icon: FaGift },
    { id: 'faqs', label: 'FAQs', icon: FaQuestionCircle },
  ];

  const safeAbout = DOMPurify.sanitize(university.about || '');

  // Extract scholarship data from text
  const extractScholarshipData = (scholarshipText: string) => {
    if (!scholarshipText) return null;
    
    const text = scholarshipText.toLowerCase();
    const scholarshipData = {
      percentage: null as string | null,
      amount: null as string | null,
      type: null as string | null,
      highlights: [] as string[]
    };

    // Extract percentage (e.g., "100%", "50%", "75%")
    const percentageMatch = text.match(/(\d+)%\s*(tuition|fee|scholarship|discount|free)/i);
    if (percentageMatch) {
      scholarshipData.percentage = percentageMatch[1] + '%';
      scholarshipData.type = percentageMatch[2];
    }

    // Extract specific amounts (e.g., "$5000", "5000 USD")
    const amountMatch = text.match(/(\$?\d+(?:,\d{3})*(?:\.\d{2})?)\s*(usd|dollar|yuan|cny)?/i);
    if (amountMatch) {
      scholarshipData.amount = amountMatch[1];
    }

    // Extract key highlights
    const highlights = [];
    if (text.includes('full tuition') || text.includes('100% tuition')) {
      highlights.push('Full Tuition Coverage');
    }
    if (text.includes('merit-based') || text.includes('merit based')) {
      highlights.push('Merit-Based');
    }
    if (text.includes('need-based') || text.includes('need based')) {
      highlights.push('Need-Based');
    }
    if (text.includes('international')) {
      highlights.push('International Students');
    }
    if (text.includes('academic excellence')) {
      highlights.push('Academic Excellence');
    }
    
    scholarshipData.highlights = highlights;
    return scholarshipData;
  };

  const scholarshipData = extractScholarshipData(university.scholarships || '');

  // Currency detection based on destination
  const getCurrencyInfo = () => {
    const destinationName = university.destination?.name?.toLowerCase() || '';
    const destinationSlug = university.destination?.slug?.toLowerCase() || '';
    
    if (destinationName.includes('china') || destinationSlug.includes('china')) {
      return {
        currency: 'CNY',
        symbol: '¥',
        name: 'Chinese Yuan'
      };
    }
    
    return {
      currency: 'USD',
      symbol: '$',
      name: 'US Dollar'
    };
  };

  const currencyInfo = getCurrencyInfo();

  // Organize programs by degree level
  const organizeProgramsByDegree = () => {
    if (!university.programs || university.programs.length === 0) return {};
    
    return university.programs.reduce((acc, program) => {
      const level = program.level.toLowerCase();
      let degreeType = 'Other';
      
      if (level.includes('bachelor') || level.includes('undergraduate') || level.includes('bsc') || level.includes('ba')) {
        degreeType = 'Bachelor';
      } else if (level.includes('master') || level.includes('graduate') || level.includes('msc') || level.includes('ma') || level.includes('mba')) {
        degreeType = 'Master';
      } else if (level.includes('phd') || level.includes('doctorate') || level.includes('doctoral')) {
        degreeType = 'PhD';
      }
      
      if (!acc[degreeType]) {
        acc[degreeType] = [];
      }
      acc[degreeType].push(program);
      return acc;
    }, {} as Record<string, typeof university.programs>);
  };

  const programsByDegree = organizeProgramsByDegree();
  const degreeLevels = ['Bachelor', 'Master', 'PhD', 'Other'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Hero Section with University Overview */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden text-white"
      >
        {/* Cover Image Background */}
        {university.coverImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={university.coverImageUrl}
              alt={`${university.name} cover`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              onError={(e) => {
                // Hide the image container if image fails to load
                const target = e.target as HTMLImageElement;
                const container = target.closest('.absolute.inset-0');
                if (container) {
                  (container as HTMLElement).style.display = 'none';
                }
              }}
            />
          </div>
        )}
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start lg:items-center">
            {/* University Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <Image
                      src={university.logoUrl || 'https://i.ibb.co/twyvQ2Hh/Group-1171277836.png'}
                      alt={`${university.name} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback to default logo if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://i.ibb.co/twyvQ2Hh/Group-1171277836.png';
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2">{university.name}</h1>
                    <div className="flex items-center space-x-4 text-blue-200">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="h-4 w-4" />
                        <span>{university.city}, {university.country}</span>
                      </div>
                      {university.ranking && (
                        <div className="flex items-center space-x-2">
                          <FaStar className="h-4 w-4 text-yellow-400" />
                          <span>{university.ranking}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* About Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <FaBookOpen className="h-6 w-6 text-blue-300" />
                    <span>About {university.name}</span>
                  </h2>
                  <div 
                    className={`prose prose-invert max-w-none text-blue-100 leading-relaxed ${
                      showFullAbout ? 'max-h-none' : 'max-h-32 overflow-hidden'
                    }`}
                    dangerouslySetInnerHTML={{ __html: safeAbout }}
                  />
                  {safeAbout.length > 200 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowFullAbout(!showFullAbout)}
                      className="mt-4 text-blue-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>{showFullAbout ? 'Show Less' : 'Read More'}</span>
                      <motion.div
                        animate={{ rotate: showFullAbout ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="h-4 w-4" />
                      </motion.div>
                    </motion.button>
                  )}
                </motion.div>

                {/* Key Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <FaGraduationCap className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{university.programs?.length || 0}</div>
                    <div className="text-sm text-blue-200">Programs</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <FaGift className="h-6 w-6 text-yellow-300 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{university.scholarships ? 'Yes' : 'No'}</div>
                    <div className="text-sm text-blue-200">Scholarships</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <FaDollarSign className="h-6 w-6 text-green-300 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{currencyInfo.symbol}</div>
                    <div className="text-sm text-blue-200">Currency</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <FaTrophy className="h-6 w-6 text-purple-300 mx-auto mb-2" />
                    <div className="text-2xl font-bold">Top</div>
                    <div className="text-sm text-blue-200">Ranked</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1 mt-8 lg:mt-0"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-6 min-h-[400px] flex flex-col w-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Ready to Apply?</h3>
                  <p className="text-blue-200 text-sm">
                    Get personalized guidance and secure your admission with scholarship opportunities.
                  </p>
                </div>
                
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openCTA('Hero Apply Now')}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 min-h-[56px] mb-2"
                  >
                    <FaRocket className="h-5 w-5" />
                    <span>Apply Now</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openCTA('Hero Consultation')}
                    className="w-full bg-white/10 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2 min-h-[48px]"
                  >
                    <FaQuestionCircle className="h-4 w-4" />
                    <span>Get Free Consultation</span>
                  </motion.button>
                </div>

                {university.scholarships && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-4 text-center"
                  >
                    <FaGift className="h-6 w-6 text-yellow-300 mx-auto mb-2" />
                    <div className="text-yellow-200 font-semibold text-sm">Scholarships Available</div>
                    <div className="text-yellow-100 text-xs">
                      {scholarshipData?.percentage ? 
                        `${scholarshipData.percentage} ${scholarshipData.type || 'tuition'} ${scholarshipData.type === 'free' ? '' : 'discount'}` :
                        'Exclusive scholarship opportunities'
                      }
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
              <div className="flex flex-wrap border-b border-gray-200">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">

                  {activeTab === 'programs' && (
                    <motion.div
                      key="programs"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Programs</h3>
                      {university.programs && university.programs.length > 0 ? (
                        <div className="space-y-8">
                          {degreeLevels.map((degreeType, degreeIndex) => {
                            const programs = programsByDegree[degreeType];
                            if (!programs || programs.length === 0) return null;

                            const getDegreeColor = (degree: string) => {
                              switch (degree) {
                                case 'Bachelor': return 'from-green-50 to-emerald-50 border-green-100';
                                case 'Master': return 'from-blue-50 to-indigo-50 border-blue-100';
                                case 'PhD': return 'from-purple-50 to-violet-50 border-purple-100';
                                default: return 'from-gray-50 to-slate-50 border-gray-100';
                              }
                            };

                            const getDegreeIconColor = (degree: string) => {
                              switch (degree) {
                                case 'Bachelor': return 'bg-green-600';
                                case 'Master': return 'bg-blue-600';
                                case 'PhD': return 'bg-purple-600';
                                default: return 'bg-gray-600';
                              }
                            };

                            return (
                              <motion.div
                                key={degreeType}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: degreeIndex * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                              >
                                {/* Degree Level Header */}
                                <div className={`bg-gradient-to-r ${getDegreeColor(degreeType)} p-6 border-b border-gray-200`}>
                                  <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 ${getDegreeIconColor(degreeType)} rounded-xl flex items-center justify-center`}>
                                      <FaGraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="text-xl font-bold text-gray-900">{degreeType} Programs</h4>
                                      <p className="text-gray-600">{programs.length} program{programs.length !== 1 ? 's' : ''} available</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Programs Grid */}
                                <div className="p-6">
                                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {programs.map((program, programIndex) => (
                                      <motion.div
                                        key={programIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: (degreeIndex * 0.1) + (programIndex * 0.05) }}
                                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                                      >
                                        <div className="space-y-4">
                                          <h5 className="font-semibold text-gray-900 text-lg leading-tight">{program.name}</h5>
                                          
                                          <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                              <FaBookOpen className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                              <span className="text-sm text-gray-600">{program.level}</span>
                                            </div>
                                            
                                            {program.tuition && (
                                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-sm">
                                                <div className="flex items-center justify-between mb-2">
                                                  <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                                      <FaDollarSign className="h-4 w-4 text-white" />
                                                    </div>
                                                    <span className="text-sm font-bold text-green-800 uppercase tracking-wide">Tuition Fee</span>
                                                  </div>
                                                  <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                                                    {currencyInfo.currency}
                                                  </div>
                                                </div>
                                                <div className="text-2xl font-bold text-green-700 mb-1">
                                                  {currencyInfo.symbol}{program.tuition}
                                                </div>
                                                <div className="text-xs text-green-600">
                                                  Per academic year • {currencyInfo.name}
                                                </div>
                                              </div>
                                            )}
                                          </div>

                                          <div className="mt-3 text-center">
                                            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                              Click "Apply Now" below to apply for this program
                                            </span>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <FaGraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No programs information available at the moment.</p>
                        </div>
                      )}

                      {/* Consolidated Apply Section */}
                      {university.programs && university.programs.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center"
                        >
                          <h4 className="text-2xl font-bold mb-4">Ready to Apply for Your Dream Program?</h4>
                          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Choose from {university.programs.length} available programs and start your journey to academic excellence.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openCTA('Programs Apply Now')}
                              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                            >
                              <FaRocket className="h-5 w-5" />
                              <span>Apply Now</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openCTA('Programs Consultation')}
                              className="bg-white/10 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
                            >
                              <FaQuestionCircle className="h-5 w-5" />
                              <span>Get Program Details</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'fees' && (
                    <motion.div
                      key="fees"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Fee Structure</h3>
                      
                      {/* Interactive Fees Table */}
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                            <FaDollarSign className="h-5 w-5 text-blue-600" />
                            <span>Complete Fee Breakdown</span>
                          </h4>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Notes</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {university.fees && university.fees.length > 0 ? (
                                university.fees.map((fee, index) => (
                                  <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="hover:bg-blue-50 transition-colors duration-200"
                                  >
                                    <td className="px-6 py-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                          <FaDollarSign className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                          <div className="font-medium text-gray-900">{fee.description}</div>
                                          <div className="text-sm text-gray-500">Fee information</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="font-semibold text-gray-900">
                                        {fee.amount}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="text-sm text-gray-600">
                                        {fee.notes || 'As specified'}
                                      </div>
                                    </td>
                                  </motion.tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                    No fee information available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Summary Section */}
                        {university.fees && university.fees.length > 0 && (
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-semibold text-gray-900">Fee Information</h5>
                                <p className="text-sm text-gray-600">Contact us for detailed cost breakdown and program-specific fees</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openCTA('Get Detailed Quote')}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                              >
                                <FaRocket className="h-4 w-4" />
                                <span>Get Detailed Quote</span>
                              </motion.button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Additional Information */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                        className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6"
                      >
                        <h5 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                          <FaQuestionCircle className="h-5 w-5" />
                          <span>Important Notes</span>
                        </h5>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>All fees are subject to change without prior notice</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Additional fees may apply for specific programs or services</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Payment plans and scholarships may be available</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Contact our counselors for personalized fee estimates</span>
                          </li>
                        </ul>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === 'scholarships' && (
                    <motion.div
                      key="scholarships"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Scholarship Opportunities</h3>
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full">
                          <FaGift className="h-4 w-4" />
                          <span className="text-sm font-semibold">Limited Time</span>
                        </div>
                      </div>
                      
                      {university.scholarships ? (
                        <div className="space-y-6">
                          {/* Featured Scholarship Card */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-8 rounded-2xl border-2 border-yellow-200 shadow-xl overflow-hidden"
                          >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/20 to-red-500/20 rounded-full translate-y-12 -translate-x-12"></div>
                            
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <FaGift className="h-8 w-8 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Exclusive Scholarship Program</h4>
                                    <div className="flex items-center space-x-2">
                                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Available Now</span>
                                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Up to 50% Off</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-orange-600">
                                    {scholarshipData?.percentage || '50%'}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {scholarshipData?.type === 'free' ? 'Tuition Free' : 
                                     scholarshipData?.type ? `${scholarshipData.type} Discount` : 
                                     'Tuition Discount'}
                                  </div>
                                </div>
                              </div>
                              
                              <div 
                                className="prose max-w-none text-gray-700 mb-6 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(university.scholarships) }}
                              />
                              
                              <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => openCTA('Scholarship Application')}
                                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                  <FaRocket className="h-5 w-5" />
                                  <span>Apply for Scholarship</span>
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => openCTA('Scholarship Consultation')}
                                  className="flex-1 bg-white border-2 border-orange-500 text-orange-600 font-bold py-4 px-6 rounded-xl hover:bg-orange-50 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                  <FaQuestionCircle className="h-5 w-5" />
                                  <span>Get Details</span>
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>

                          {/* Additional Scholarship Info */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg"
                          >
                            <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                              <FaStar className="h-5 w-5 text-yellow-500" />
                              <span>Scholarship Highlights</span>
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {scholarshipData?.highlights && scholarshipData.highlights.length > 0 ? (
                                scholarshipData.highlights.map((highlight, index) => {
                                  const getIconAndColor = (highlight: string) => {
                                    if (highlight.includes('Full Tuition')) return { icon: FaGift, color: 'green' };
                                    if (highlight.includes('Merit')) return { icon: FaTrophy, color: 'blue' };
                                    if (highlight.includes('Need')) return { icon: FaUsers, color: 'purple' };
                                    if (highlight.includes('International')) return { icon: FaMapMarkerAlt, color: 'indigo' };
                                    if (highlight.includes('Academic')) return { icon: FaGraduationCap, color: 'orange' };
                                    return { icon: FaCheckCircle, color: 'gray' };
                                  };
                                  
                                  const { icon: Icon, color } = getIconAndColor(highlight);
                                  const colorClasses = {
                                    green: 'bg-green-100 text-green-600',
                                    blue: 'bg-blue-100 text-blue-600',
                                    purple: 'bg-purple-100 text-purple-600',
                                    indigo: 'bg-indigo-100 text-indigo-600',
                                    orange: 'bg-orange-100 text-orange-600',
                                    gray: 'bg-gray-100 text-gray-600'
                                  };
                                  
                                  return (
                                    <div key={index} className="flex items-start space-x-3">
                                      <div className={`w-8 h-8 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <h6 className="font-semibold text-gray-900">{highlight}</h6>
                                        <p className="text-sm text-gray-600">
                                          {highlight.includes('Full Tuition') ? 'Complete tuition coverage for eligible students' :
                                           highlight.includes('Merit') ? 'Recognition for academic excellence and achievements' :
                                           highlight.includes('Need') ? 'Financial assistance for deserving students' :
                                           highlight.includes('International') ? 'Special opportunities for international students' :
                                           highlight.includes('Academic') ? 'Rewards for outstanding academic performance' :
                                           'Exclusive scholarship benefit'}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <FaCheckCircle className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">Merit-Based Awards</h6>
                                      <p className="text-sm text-gray-600">Recognition for academic excellence and achievements</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <FaUsers className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">Need-Based Support</h6>
                                      <p className="text-sm text-gray-600">Financial assistance for deserving students</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <FaTrophy className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">International Recognition</h6>
                                      <p className="text-sm text-gray-600">Prestigious awards recognized worldwide</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <FaRocket className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-gray-900">Easy Application</h6>
                                      <p className="text-sm text-gray-600">Streamlined process with expert guidance</p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200"
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaGift className="h-10 w-10 text-white" />
                          </div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-3">Scholarship Information Coming Soon</h4>
                          <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            We're working on bringing you exclusive scholarship opportunities. 
                            Get notified when they become available!
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openCTA('Scholarship Notification')}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
                          >
                            <FaEnvelope className="h-4 w-4" />
                            <span>Notify Me</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'faqs' && (
                    <motion.div
                      key="faqs"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                      {university.faqs && university.faqs.length > 0 ? (
                        <div className="space-y-4">
                          {university.faqs.map((faq, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                              <button
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                              >
                                <span className="font-medium text-gray-900">{faq.question}</span>
                                {expandedFaq === index ? (
                                  <FaChevronUp className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <FaChevronDown className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                              <AnimatePresence>
                                {expandedFaq === index && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-6 pb-4 text-gray-700">
                                      <div 
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }}
                                      />
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <FaQuestionCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No FAQs available at the moment.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar - Simplified */}
          <motion.aside variants={itemVariants} className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start">
            {/* Quick Contact Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full -translate-y-10 translate-x-10"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <FaQuestionCircle className="h-4 w-4 text-white" />
                  </div>
                  <span>Need Help?</span>
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Our expert counselors are here to guide you through the application process and answer any questions.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openCTA('Sidebar Help')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <FaQuestionCircle className="h-4 w-4" />
                  <span>Get Help</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Scholarship Highlight */}
            {university.scholarships && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FaGift className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Scholarships Available!</h3>
                  </div>
                  <p className="text-yellow-100 text-sm mb-4">
                    {scholarshipData?.percentage ? 
                      `Don't miss out on ${scholarshipData.percentage} ${scholarshipData.type === 'free' ? 'tuition free' : 'tuition discount'} opportunities.` :
                      "Don't miss out on exclusive scholarship opportunities with significant tuition discounts."
                    }
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openCTA('Sidebar Scholarship')}
                    className="w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <FaGift className="h-4 w-4" />
                    <span>Apply for Scholarship</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.aside>
        </div>
      </div>

    </motion.div>
  );
}

