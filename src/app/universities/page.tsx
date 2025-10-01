'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useUniversities } from '@/hooks/useUniversities';
import { IUniversity } from '@/models/University';

// Helper function to format university data for display
const formatUniversityData = (university: IUniversity) => {
  // Get unique program types
  const programTypes = university.programs?.map(p => p.level) || [];
  const uniqueProgramTypes = [...new Set(programTypes)];

  return {
    id: university._id.toString(),
    name: university.name,
    slug: university.slug,
    destination: university.destination,
    country: university.country,
    city: university.city,
    type: university.type,
    ranking: university.ranking?.global?.toString() || 'N/A',
    programs: university.programs?.map(p => p.name) || [],
    programTypes: uniqueProgramTypes,
    majors: university.programs?.map(p => p.name).slice(0, 4) || ['Computer Science', 'Business', 'Engineering', 'Medicine'],
    logo: university.logo || university.logoUrl || '/brand/logo.png',
    coverImage: university.coverImageUrl || university.images?.[0] || '/brand/logo.png',
    description: university.shortDescription || university.description,
    tuition: university.fees?.tuition ? 
      `${university.fees.tuition.currency} ${university.fees.tuition.amount.toLocaleString()}` : 
      'Contact for details',
    isFeatured: university.isFeatured || false
  };
};

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const {
    universities,
    loading,
    error,
    stats,
    hasMore,
    loadMore,
    refetch
  } = useUniversities({
    search: searchTerm || undefined,
    country: selectedCountry || undefined,
    type: selectedType || undefined,
    limit: 12
  });

  // Get unique countries and types for filters
  const countries = stats?.countryDistribution?.map(item => item._id) || [];
  const types = stats?.typeDistribution?.map(item => item._id) || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleFilterChange = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Top Universities Worldwide
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover prestigious universities and find the perfect program for your international education journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{stats?.total || 0}</div>
                <div className="text-sm text-blue-100">Partner Universities</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{countries.length}</div>
                <div className="text-sm text-blue-100">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-100">Programs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Universities</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by university name, country, or program..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University Type</label>
              <select 
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading universities...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading universities</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={refetch}
                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Universities Grid */}
        {!loading && !error && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Universities ({universities.length})
              </h2>
              {stats && (
                <div className="text-sm text-gray-600">
                  Showing {universities.length} of {stats.total} universities
                </div>
              )}
            </div>
            
            {universities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No universities found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {universities.map((university) => {
                  const formattedUni = formatUniversityData(university);
                  return (
                    <div key={formattedUni.id} className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 border border-gray-100/80 hover:border-blue-400/60 hover:-translate-y-4 flex flex-col h-[500px] w-full backdrop-blur-sm">
                      {/* Cover Image */}
                      <div className="relative h-72 overflow-hidden">
                        <Image
                          src={formattedUni.coverImage}
                          alt={`${formattedUni.name} campus`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Enhanced Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Top Row - Featured Badge and Ranking */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          {/* Ranking */}
                          {formattedUni.ranking !== 'N/A' && (
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-2xl text-sm font-bold shadow-2xl backdrop-blur-md border border-white/30 hover:shadow-blue-500/25 transition-all duration-300">
                              🏆 Ranked #{formattedUni.ranking}
                            </div>
                          )}
                          
                          {/* Featured Badge */}
                          {formattedUni.isFeatured && (
                            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2.5 rounded-2xl text-sm font-bold shadow-2xl backdrop-blur-md border border-white/30 hover:shadow-amber-500/25 transition-all duration-300">
                              ⭐ Featured
                            </span>
                          )}
                        </div>

                        {/* Bottom Row - Location */}
                        <div className="absolute bottom-4 right-4">
                          {/* Location */}
                          <div className="bg-gradient-to-r from-emerald-500/90 to-teal-600/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl text-sm font-semibold border border-white/30 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {formattedUni.city && formattedUni.country ? 
                                `${formattedUni.city}, ${formattedUni.country}` : 
                                formattedUni.destination
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 flex flex-col h-full bg-gradient-to-b from-white to-gray-50/50">
                        {/* University Info */}
                        <div className="mb-1 h-14 flex items-start">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                            {formattedUni.name}
                          </h3>
                        </div>

                        {/* University Type Badge - Fixed Height */}
                        <div className="mb-3 h-10 flex items-center justify-start">
                          <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                            🎓 {formattedUni.type || 'University'}
                          </span>
                        </div>

                        {/* Program Types - Fixed Height */}
                        <div className="mb-3 h-16 flex flex-col justify-start items-start">
                          <div className="text-xs font-bold text-gray-700 mb-2 text-left">Program Types:</div>
                          <div className="flex flex-wrap gap-1 justify-start">
                            {formattedUni.programTypes.length > 0 ? (
                              formattedUni.programTypes.slice(0, 2).map((programType, index) => (
                                <span 
                                  key={index} 
                                  className="bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 shadow-md hover:shadow-lg hover:from-slate-200 hover:to-gray-200 transition-all duration-300"
                                >
                                  {programType}
                                </span>
                              ))
                            ) : (
                              <>
                                <span className="bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 shadow-md">
                                  Foundation
                                </span>
                                <span className="bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200 shadow-md">
                                  Bachelor
                                </span>
                              </>
                            )}
                            {(formattedUni.programTypes.length > 2 || formattedUni.programTypes.length === 0) && (
                              <span className="bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-200 shadow-md">
                                +more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Popular Majors - Fixed Height */}
                        <div className="mb-3 h-16 flex flex-col justify-start items-start">
                          <div className="text-xs font-bold text-gray-700 mb-2 text-left">Popular Majors:</div>
                          <div className="flex flex-wrap gap-1 justify-start">
                            {formattedUni.majors && formattedUni.majors.length > 0 ? (
                              <>
                                {formattedUni.majors.slice(0, 2).map((major, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-blue-200 shadow-md hover:shadow-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
                                  >
                                    {major}
                                  </span>
                                ))}
                                {formattedUni.majors.length > 2 && (
                                  <span className="bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-200 shadow-md hover:shadow-lg hover:from-gray-100 hover:to-slate-100 transition-all duration-300">
                                    +{formattedUni.majors.length - 2} more
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
                                <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-blue-200 shadow-md">
                                  Computer Science
                                </span>
                                <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-blue-200 shadow-md">
                                  Business
                                </span>
                                <span className="bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-200 shadow-md">
                                  +2 more
                                </span>
                              </>
                            )}
                          </div>
                        </div>



                        {/* Spacer to push button to bottom */}
                        <div className="flex-grow"></div>

                        {/* Action Button - Fixed Height */}
                        <div className="h-12 flex items-center">
                          <Link
                            href={`/universities/${formattedUni.slug || formattedUni.id}`}
                            className="block w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:-translate-y-2 text-sm border border-blue-500/20"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Load More Universities'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find Your Dream University?
          </h2>
          <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
            Our education consultants can help you find the perfect university and program for your goals. Get personalized guidance and support throughout your application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Expert Guidance
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
