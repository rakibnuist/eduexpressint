'use client';

import React from 'react';

import { 
  FaCheckCircle,
  FaFileAlt,
  FaGraduationCap,
  FaLanguage,
  FaPassport,
  FaMoneyBillWave,
  FaUser,
  FaCalendarAlt,
  FaCertificate,
  FaHeart
} from 'react-icons/fa';

interface RequirementsTabProps {
  destinationConfig: {
    name: string;
  };
  handleCTAClick: (source: string) => void;
  destinationSlug: string;
}

export default function RequirementsTab({ destinationConfig, handleCTAClick, destinationSlug }: RequirementsTabProps) {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">📋 Requirements</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Everything you need to know about <span className="font-bold text-blue-600">academic requirements</span>, 
          <span className="font-bold text-green-600"> language proficiency</span>, and 
          <span className="font-bold text-cyan-600"> document preparation</span> for studying in {destinationConfig.name}.
        </p>
      </div>

      <div className="space-y-12">
        {/* Academic Requirements */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <FaGraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Academic Requirements</h3>
              <p className="text-gray-600">Educational qualifications needed for admission</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Bachelor's Programs</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span>High school diploma or equivalent</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span>Minimum 60% average (varies by program)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span>Mathematics and English at high school level</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span>Science subjects for engineering programs</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-blue-500" />
                  <span>Portfolio for creative programs</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-2xl border border-cyan-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Master's Programs</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Bachelor's degree in related field</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Minimum 2.5 GPA (varies by program)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Relevant work experience (preferred)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Research proposal (for research programs)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Letters of recommendation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Language Requirements */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <FaLanguage className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Language Requirements</h3>
              <p className="text-gray-600">English proficiency requirements for international students</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">IELTS</h4>
              <div className="space-y-3">
                <div className="bg-green-200 p-3 rounded-xl">
                  <p className="text-green-800 font-semibold">Bachelor's: 6.0+</p>
                </div>
                <div className="bg-emerald-200 p-3 rounded-xl">
                  <p className="text-emerald-800 font-semibold">Master's: 6.5+</p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl">
                  <p className="text-green-700 text-sm">No band below 5.5</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-2xl border border-emerald-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">TOEFL</h4>
              <div className="space-y-3">
                <div className="bg-emerald-200 p-3 rounded-xl">
                  <p className="text-emerald-800 font-semibold">Bachelor's: 80+</p>
                </div>
                <div className="bg-green-200 p-3 rounded-xl">
                  <p className="text-green-800 font-semibold">Master's: 90+</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <p className="text-emerald-700 text-sm">Internet-based test</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Other Tests</h4>
              <div className="space-y-3">
                <div className="bg-blue-200 p-3 rounded-xl">
                  <p className="text-blue-800 font-semibold">PTE: 50+</p>
                </div>
                <div className="bg-cyan-200 p-3 rounded-xl">
                  <p className="text-cyan-800 font-semibold">Duolingo: 100+</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <p className="text-blue-700 text-sm">Cambridge: B2+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Requirements */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-purple-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <FaFileAlt className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Required Documents</h3>
              <p className="text-gray-600">Essential documents for your application</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Academic Documents</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <FaCertificate className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">High school diploma (translated & notarized)</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <FaCertificate className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">Academic transcripts (translated & notarized)</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <FaCertificate className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">Bachelor's degree (for Master's programs)</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <FaCertificate className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">Language proficiency certificate</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Personal Documents</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <FaPassport className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-700">Valid passport (6+ months validity)</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <FaUser className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-700">CV/Resume (updated)</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <FaFileAlt className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-700">Motivation letter</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <FaHeart className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-700">Medical certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Financial Requirements */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-cyan-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <FaMoneyBillWave className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Financial Requirements</h3>
              <p className="text-gray-600">Proof of financial capability for visa application</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-2xl border border-cyan-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Bank Statements</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Bank statements (last 3-6 months)</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Minimum balance: €8,000-12,000</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Sponsor's financial documents</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500" />
                  <span>Scholarship letters (if applicable)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Cost Breakdown</h4>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center p-3 bg-blue-100 rounded-xl">
                  <span>Tuition Fees</span>
                  <span className="font-semibold">€2,000-15,000/year</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-100 rounded-xl">
                  <span>Living Expenses</span>
                  <span className="font-semibold">€400-800/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-100 rounded-xl">
                  <span>Accommodation</span>
                  <span className="font-semibold">€200-500/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-100 rounded-xl">
                  <span>Health Insurance</span>
                  <span className="font-semibold">€50-100/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Timeline */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-yellow-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <FaCalendarAlt className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Application Timeline</h3>
              <p className="text-gray-600">Important dates and deadlines</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Research & Prepare</h4>
              <p className="text-gray-600 text-sm">6-12 months before</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Apply to Universities</h4>
              <p className="text-gray-600 text-sm">3-6 months before</p>
            </div>

            <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-200">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Visa Application</h4>
              <p className="text-gray-600 text-sm">2-3 months before</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Travel & Arrival</h4>
              <p className="text-gray-600 text-sm">1-2 weeks before</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
