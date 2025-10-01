import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Success Stories | EduExpress International - Student Achievements',
  description: 'Read inspiring success stories of students who achieved their study abroad dreams with EduExpress International. Learn from their experiences and journeys.',
  keywords: 'success stories, student achievements, study abroad success, international education success, student testimonials, study abroad experiences',
};

export default function SuccessStoriesPage() {
  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the inspiring journeys of students who achieved their study abroad dreams with EduExpress International
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  AS
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Ahmed Sarker</h3>
                  <p className="text-gray-600">Computer Science, University of Toronto</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "EduExpress made my dream of studying in Canada a reality. Their guidance through the application process 
                and visa assistance was exceptional. I'm now pursuing my Master's in Computer Science at one of Canada's top universities."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Admitted with Scholarship</span>
                </div>
                <span className="text-sm text-gray-500">2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  FK
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Fatima Khan</h3>
                  <p className="text-gray-600">Business Administration, University of Manchester</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "The team at EduExpress provided incredible support throughout my journey. From university selection to 
                visa processing, they made everything seamless. I'm now studying at the University of Manchester and loving every moment."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Visa Approved</span>
                </div>
                <span className="text-sm text-gray-500">2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  MR
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Mohammad Rahman</h3>
                  <p className="text-gray-600">Engineering, University of Sydney</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "EduExpress helped me secure admission to the University of Sydney with a partial scholarship. 
                Their expertise in Australian education system was invaluable. I'm now pursuing my engineering degree in Australia."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Scholarship Awarded</span>
                </div>
                <span className="text-sm text-gray-500">2023</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  NA
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Nusrat Ahmed</h3>
                  <p className="text-gray-600">Medicine, University of Edinburgh</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Getting into medical school in the UK seemed impossible, but EduExpress made it happen. 
                Their guidance on application essays and interview preparation was outstanding. I'm now studying medicine at Edinburgh."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Dream University</span>
                </div>
                <span className="text-sm text-gray-500">2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Success in Numbers</h2>
            <p className="text-xl opacity-90">Thousands of students have achieved their study abroad dreams with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-lg opacity-90">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Visa Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-lg opacity-90">Partner Universities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">18</div>
              <div className="text-lg opacity-90">Countries</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Success Story?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful students who achieved their study abroad dreams with EduExpress International
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Start Your Journey
            </a>
            <Link
              href="/universities"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Explore Universities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
