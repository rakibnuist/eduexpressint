'use client';

import React from 'react';

import { 
  FaCheckCircle,
  FaLaptopCode,
  FaCode,
  FaMicroscope,
  FaBuilding,
  FaBriefcase,
  FaChartBar,
  FaGavel,
  FaPalette,
  FaGamepad
} from 'react-icons/fa';

interface ProgramsTabProps {
  destinationConfig: {
    name: string;
  };
  handleCTAClick: (source: string) => void;
  destinationSlug: string;
}

export default function ProgramsTab({ destinationConfig, handleCTAClick, destinationSlug }: ProgramsTabProps) {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">🎓 Study Programs</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Choose from a wide range of <span className="font-bold text-blue-600">English-taught programs</span> including 
          <span className="font-bold text-green-600"> cutting-edge technology</span> and 
          <span className="font-bold text-cyan-600"> innovative business programs</span>.
        </p>
      </div>

      <div className="space-y-12">
        {/* Technology Programs */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <FaLaptopCode className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Technology & Innovation</h3>
              <p className="text-gray-600">Leading tech programs with industry focus</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <FaCode className="h-6 w-6 text-blue-600" />
                <h4 className="text-xl font-bold text-gray-800">Computer Science</h4>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-blue-500" />
                  Computer Science (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-blue-500" />
                  Artificial Intelligence (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-blue-500" />
                  Data Science (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-blue-500" />
                  Software Engineering (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-blue-500" />
                  Cybersecurity (BSc/MSc)
                </li>
              </ul>
              <div className="bg-blue-200 p-4 rounded-xl">
                <p className="text-blue-800 font-semibold text-sm">
                  💰 Fees: €2,000-15,000 per year
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-2xl border border-cyan-200">
              <div className="flex items-center gap-3 mb-4">
                <FaMicroscope className="h-6 w-6 text-cyan-600" />
                <h4 className="text-xl font-bold text-gray-800">Engineering</h4>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                  Civil Engineering (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                  Mechanical Engineering (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                  Electrical Engineering (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                  Aerospace Engineering (BSc/MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-cyan-500" />
                  Biomedical Engineering (BSc/MSc)
                </li>
              </ul>
              <div className="bg-cyan-200 p-4 rounded-xl">
                <p className="text-cyan-800 font-semibold text-sm">
                  💰 Fees: €3,000-15,000 per year
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Programs */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <FaBuilding className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Business & Economics</h3>
              <p className="text-gray-600">European-standard business education</p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <FaBriefcase className="h-6 w-6 text-green-600" />
                <h4 className="text-xl font-bold text-gray-800">Bachelor Programs</h4>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-green-500" />
                  Business Administration (BBA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-green-500" />
                  International Business (BSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-green-500" />
                  Economics (BSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-green-500" />
                  Marketing (BSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-green-500" />
                  Finance & Banking (BSc)
                </li>
              </ul>
              <div className="bg-green-200 p-4 rounded-xl">
                <p className="text-green-800 font-semibold text-sm">
                  💰 Fees: €2,000-12,000 per year
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-2xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <FaChartBar className="h-6 w-6 text-emerald-600" />
                <h4 className="text-xl font-bold text-gray-800">Master's Programs</h4>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                  Master of Business Administration (MBA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                  Master of Economics (MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                  Master of Finance (MSc)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                  Master of Marketing (MSc)
                </li>
              </ul>
              <div className="bg-emerald-200 p-4 rounded-xl">
                <p className="text-emerald-800 font-semibold text-sm">
                  💰 Fees: €3,000-15,000 per year
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-2xl border border-purple-200">
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
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-purple-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <FaPalette className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Creative Arts & Design</h3>
              <p className="text-gray-600">Innovative creative programs</p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <FaPalette className="h-6 w-6 text-purple-600" />
                <h4 className="text-xl font-bold text-gray-800">Design Programs</h4>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-purple-500" />
                  Graphic Design (BA/BFA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-purple-500" />
                  Industrial Design (BA/BFA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-purple-500" />
                  Fashion Design (BA/BFA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-purple-500" />
                  Architecture (BA/BArch)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-purple-500" />
                  Media Studies (BA/MA)
                </li>
              </ul>
              <div className="bg-purple-200 p-4 rounded-xl">
                <p className="text-purple-800 font-semibold text-sm">
                  💰 Fees: €2,000-10,000 per year
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-2xl border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <FaGamepad className="h-6 w-6 text-indigo-600" />
                <h4 className="text-xl font-bold text-gray-800">Media & Gaming</h4>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                  Game Design (BA/MA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                  Digital Media (BA/MA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                  Animation (BA/MA)
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="h-4 w-4 text-indigo-500" />
                  Film Studies (BA/MA)
                </li>
              </ul>
              <div className="bg-indigo-200 p-4 rounded-xl">
                <p className="text-indigo-800 font-semibold text-sm">
                  💰 Fees: €2,000-10,000 per year
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
