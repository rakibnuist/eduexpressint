'use client';

import React from 'react';

import { 
  FaCheckCircle,
  FaMoneyBillWave,
  FaGraduationCap,
  FaTrophy,
  FaStar,
  FaGlobe,
  FaUser,
  FaCalendarAlt,
  FaFileAlt,
  FaAward
} from 'react-icons/fa';

interface ScholarshipsTabProps {
  destinationConfig: {
    name: string;
  };
  handleCTAClick: (source: string) => void;
  destinationSlug: string;
}

export default function ScholarshipsTab({ destinationConfig, handleCTAClick, destinationSlug }: ScholarshipsTabProps) {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">🎓 Scholarships</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover <span className="font-bold text-blue-600">funding opportunities</span> to make your education in 
          {destinationConfig.name} <span className="font-bold text-green-600">more affordable</span> and 
          <span className="font-bold text-cyan-600"> accessible</span>.
        </p>
      </div>

      <div className="space-y-12">
        {/* Government Scholarships */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <FaTrophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Government Scholarships</h3>
              <p className="text-gray-600">National and international funding programs</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <FaAward className="h-6 w-6 text-blue-600" />
                <h4 className="text-xl font-bold text-gray-800">National Scholarship Program</h4>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-blue-200 p-4 rounded-xl">
                  <p className="text-blue-800 font-semibold">💰 Coverage: 100% tuition + living allowance</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Full tuition fee coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Monthly living allowance (€500-800)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Health insurance coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Accommodation support</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <p className="text-blue-700 text-sm">
                  <strong>Eligibility:</strong> High academic performance, leadership potential, financial need
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-2xl border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <FaGlobe className="h-6 w-6 text-cyan-600" />
                <h4 className="text-xl font-bold text-gray-800">International Exchange Program</h4>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-cyan-200 p-4 rounded-xl">
                  <p className="text-cyan-800 font-semibold">💰 Coverage: 50-80% tuition + travel allowance</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                    <span>Partial tuition fee coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                    <span>Travel allowance (€1,000-2,000)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                    <span>Cultural exchange opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                    <span>Language learning support</span>
                  </li>
                </ul>
              </div>
              <div className="bg-cyan-100 p-4 rounded-xl">
                <p className="text-cyan-700 text-sm">
                  <strong>Eligibility:</strong> International students, cultural diversity, academic excellence
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* University Scholarships */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <FaGraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">University Scholarships</h3>
              <p className="text-gray-600">Institutional funding and merit-based awards</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <FaStar className="h-6 w-6 text-green-600" />
                <h4 className="text-xl font-bold text-gray-800">Merit Scholarship</h4>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-green-200 p-4 rounded-xl">
                  <p className="text-green-800 font-semibold">💰 Coverage: 25-50% tuition</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-green-500" />
                    <span>Based on academic performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-green-500" />
                    <span>Renewable each year</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-green-500" />
                    <span>No separate application needed</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <p className="text-green-700 text-sm">
                  <strong>Requirements:</strong> High school GPA 3.5+, standardized test scores
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-2xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <FaUser className="h-6 w-6 text-emerald-600" />
                <h4 className="text-xl font-bold text-gray-800">Need-Based Scholarship</h4>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-emerald-200 p-4 rounded-xl">
                  <p className="text-emerald-800 font-semibold">💰 Coverage: 30-70% tuition</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Based on financial need</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Family income verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>Separate application required</span>
                  </li>
                </ul>
              </div>
              <div className="bg-emerald-100 p-4 rounded-xl">
                <p className="text-emerald-700 text-sm">
                  <strong>Requirements:</strong> Financial need documentation, academic standing
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <FaTrophy className="h-6 w-6 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-800">Excellence Scholarship</h4>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-purple-200 p-4 rounded-xl">
                  <p className="text-purple-800 font-semibold">💰 Coverage: 50-100% tuition</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Outstanding academic record</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Leadership and community service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Research potential</span>
                  </li>
                </ul>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-purple-700 text-sm">
                  <strong>Requirements:</strong> Exceptional achievements, research experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* External Scholarships */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-purple-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <FaGlobe className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">External Scholarships</h3>
              <p className="text-gray-600">International organizations and private funding</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <FaAward className="h-6 w-6 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-800">International Organization</h4>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-purple-200 p-4 rounded-xl">
                  <p className="text-purple-800 font-semibold">💰 Coverage: 60-90% tuition + living</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-purple-500" />
                    <span>UNESCO, World Bank, EU programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Development-focused programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Return service commitment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-purple-500" />
                    <span>Networking opportunities</span>
                  </li>
                </ul>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-purple-700 text-sm">
                  <strong>Eligibility:</strong> Development country citizenship, relevant field of study
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-2xl border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <FaMoneyBillWave className="h-6 w-6 text-indigo-600" />
                <h4 className="text-xl font-bold text-gray-800">Private Foundation</h4>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-indigo-200 p-4 rounded-xl">
                  <p className="text-indigo-800 font-semibold">💰 Coverage: 40-80% tuition</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                    <span>Corporate and private foundations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                    <span>Field-specific funding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                    <span>Mentorship programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                    <span>Internship opportunities</span>
                  </li>
                </ul>
              </div>
              <div className="bg-indigo-100 p-4 rounded-xl">
                <p className="text-indigo-700 text-sm">
                  <strong>Eligibility:</strong> Specific field of study, community involvement
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Tips */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-cyan-100">
          <h3 className="text-3xl font-bold text-center mb-8">💡 Scholarship Application Tips</h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Application Strategy</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Start Early</p>
                    <p className="text-gray-600 text-sm">Begin researching and applying 12-18 months in advance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Multiple Applications</p>
                    <p className="text-gray-600 text-sm">Apply to 5-10 different scholarship programs</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <FaCheckCircle className="h-5 w-5 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Tailor Applications</p>
                    <p className="text-gray-600 text-sm">Customize each application to match specific criteria</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Document Preparation</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <FaFileAlt className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Strong Essays</p>
                    <p className="text-gray-600 text-sm">Write compelling personal statements and motivation letters</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <FaFileAlt className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Letters of Recommendation</p>
                    <p className="text-gray-600 text-sm">Secure strong references from teachers and mentors</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <FaFileAlt className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Portfolio/Resume</p>
                    <p className="text-gray-600 text-sm">Highlight achievements, leadership, and community service</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
