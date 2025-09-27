'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IUniversity } from '@/models/University';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCTA } from '@/context/CTAContext';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaGlobe, 
  FaArrowRight,
  FaUsers,
  FaAward,
  FaFilter,
  FaSort,
  FaExternalLinkAlt,
  FaBookOpen,
  FaLanguage,
  FaStar,
  FaRocket,
  FaDollarSign,
  FaCalendarAlt,
  FaHeart,
  FaEye,
  FaChevronRight
} from 'react-icons/fa';

export default function UniversitiesPage() {
  const { openCTA } = useCTA();
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterByCountry, setFilterByCountry] = useState('all');
  const [filterByProgram, setFilterByProgram] = useState('all');
  const [filterByScholarship, setFilterByScholarship] = useState('all');
  const [tuitionRange, setTuitionRange] = useState({ min: '', max: '' });

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('/api/universities');
        const { items } = await res.json();
        setUniversities(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
        setUniversities([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniversities();
  }, []);


  // Helper function to extract numeric value from tuition string
  const extractTuitionValue = (tuitionString: string): number => {
    if (!tuitionString) return 0;
    const match = tuitionString.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
  };

  const filteredAndSortedUniversities = (universities || [])
    .filter(uni => {
      // Enhanced search functionality
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        uni.name.toLowerCase().includes(searchLower) ||
        uni.city.toLowerCase().includes(searchLower) ||
        uni.country.toLowerCase().includes(searchLower) ||
        uni.scholarships?.toLowerCase().includes(searchLower) ||
        uni.programs?.some(program => 
          program.name.toLowerCase().includes(searchLower) ||
          program.level.toLowerCase().includes(searchLower)
        );
      
      // Country filter
      const matchesCountry = filterByCountry === 'all' || uni.country === filterByCountry;
      
      // Program filter
      const matchesProgram = filterByProgram === 'all' || 
        uni.programs?.some(program => program.level === filterByProgram);
      
      // Scholarship filter - detailed logic
      const scholarshipText = uni.scholarships?.toLowerCase() || '';
      const hasScholarship = uni.scholarships && 
        uni.scholarships.trim() !== '' && 
        !['no', 'none', 'not available', 'n/a', 'self-funded', 'self fund', 'self fund only'].includes(scholarshipText);
      
      const isFullScholarship = hasScholarship && (
        scholarshipText.includes('full') || 
        scholarshipText.includes('100%') || 
        scholarshipText.includes('complete') ||
        scholarshipText.includes('fully funded')
      );
      
      const isPartialScholarship = hasScholarship && !isFullScholarship && (
        scholarshipText.includes('partial') || 
        scholarshipText.includes('50%') || 
        scholarshipText.includes('75%') || 
        scholarshipText.includes('25%') ||
        scholarshipText.includes('merit') ||
        scholarshipText.includes('need-based') ||
        scholarshipText.includes('tuition waiver') ||
        scholarshipText.includes('discount')
      );
      
      const isSelfFund = !hasScholarship || 
        ['self-funded', 'self fund', 'self fund only', 'no scholarship', 'no funding'].includes(scholarshipText);
      
      const matchesScholarship = filterByScholarship === 'all' || 
        (filterByScholarship === 'full' && isFullScholarship) ||
        (filterByScholarship === 'partial' && isPartialScholarship) ||
        (filterByScholarship === 'self-fund' && isSelfFund);
      
      // Tuition range filter
      const matchesTuitionRange = (() => {
        if (!tuitionRange.min && !tuitionRange.max) return true;
        
        const minTuition = uni.fees?.tuitionMin ? extractTuitionValue(uni.fees.tuitionMin) : 0;
        const maxTuition = uni.fees?.tuitionMax ? extractTuitionValue(uni.fees.tuitionMax) : 0;
        const avgTuition = maxTuition > 0 ? (minTuition + maxTuition) / 2 : minTuition;
        
        const minFilter = tuitionRange.min ? parseFloat(tuitionRange.min) : 0;
        const maxFilter = tuitionRange.max ? parseFloat(tuitionRange.max) : Infinity;
        
        return avgTuition >= minFilter && avgTuition <= maxFilter;
      })();
      
      return matchesSearch && matchesCountry && matchesProgram && matchesScholarship && matchesTuitionRange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'ranking':
          return (b.ranking || '').localeCompare(a.ranking || '');
        case 'country':
          return a.country.localeCompare(b.country);
        default:
          return 0;
      }
    });

  const stats = [
    { icon: <FaGraduationCap className="h-5 w-5" />, value: (universities || []).length.toString(), label: "Partner Universities" },
    { icon: <FaGlobe className="h-5 w-5" />, value: "15+", label: "Countries" },
    { icon: <FaUsers className="h-5 w-5" />, value: "1,200+", label: "Students Placed" },
    { icon: <FaAward className="h-5 w-5" />, value: "95%", label: "Success Rate" }
  ];

  // Get unique countries and programs from universities
  const countries = ['All Countries', ...Array.from(new Set(universities.map(uni => uni.country).filter(Boolean)))];
  const programs = ['All Programs', ...Array.from(new Set(
    universities.flatMap(uni => uni.programs?.map(p => p.level) || []).filter(Boolean)
  ))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <span className="text-sm font-bold text-white/50 rotate-12">Universities</span>
          </div>
          <div className="absolute top-32 right-32 animate-float-slow opacity-20" style={{ animationDelay: '1s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-12">Education</span>
          </div>
          <div className="absolute bottom-20 left-32 animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <span className="text-sm font-bold text-white/50 rotate-6">Global</span>
          </div>
          <div className="absolute bottom-32 right-20 animate-float-slow opacity-20" style={{ animationDelay: '3s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-6">Success</span>
          </div>
          
          {/* Floating Icons */}
          <div className="absolute top-16 right-16 animate-float opacity-15">
            <FaGraduationCap className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute top-40 left-40 animate-float opacity-15" style={{ animationDelay: '0.5s' }}>
            <FaAward className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-16 left-16 animate-float opacity-15" style={{ animationDelay: '1.5s' }}>
            <FaBookOpen className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-40 right-40 animate-float opacity-15" style={{ animationDelay: '2.5s' }}>
            <FaStar className="h-6 w-6 text-white/40" />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Partner <span className="text-yellow-300">Universities</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Explore world-class institutions connected with EduExpress. 
              Your gateway to global education excellence.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-yellow-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-indigo-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6">

          <div className="space-y-6 mb-8">
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search universities, cities, countries, programs, majors, or scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl shadow-sm"
              />
            </div>
            
            {/* Filters Row - Single Line */}
            <div className="flex flex-col lg:flex-row gap-4">
              <Select value={filterByCountry} onValueChange={setFilterByCountry}>
                <SelectTrigger className="w-full lg:w-48 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-white shadow-sm">
                  <FaGlobe className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {countries.map(country => (
                    <SelectItem key={country} value={country === 'All Countries' ? 'all' : country} className="bg-white hover:bg-gray-50">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterByProgram} onValueChange={setFilterByProgram}>
                <SelectTrigger className="w-full lg:w-48 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-white shadow-sm">
                  <FaGraduationCap className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {programs.map(program => (
                    <SelectItem key={program} value={program === 'All Programs' ? 'all' : program} className="bg-white hover:bg-gray-50">
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterByScholarship} onValueChange={setFilterByScholarship}>
                <SelectTrigger className="w-full lg:w-48 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-white shadow-sm">
                  <FaAward className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Funding" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="all" className="bg-white hover:bg-gray-50">All Funding</SelectItem>
                  <SelectItem value="full" className="bg-white hover:bg-gray-50">Full Scholarship</SelectItem>
                  <SelectItem value="partial" className="bg-white hover:bg-gray-50">Partial Scholarship</SelectItem>
                  <SelectItem value="self-fund" className="bg-white hover:bg-gray-50">Self-Fund</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="Min $"
                  value={tuitionRange.min}
                  onChange={(e) => setTuitionRange({...tuitionRange, min: e.target.value})}
                  className="w-full lg:w-24 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-white shadow-sm"
                />
                <span className="text-gray-400">-</span>
                <Input
                  type="number"
                  placeholder="Max $"
                  value={tuitionRange.max}
                  onChange={(e) => setTuitionRange({...tuitionRange, max: e.target.value})}
                  className="w-full lg:w-24 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-white shadow-sm"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg bg-white shadow-sm">
                  <FaSort className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="name" className="bg-white hover:bg-gray-50">Name (A-Z)</SelectItem>
                  <SelectItem value="ranking" className="bg-white hover:bg-gray-50">Ranking (High to Low)</SelectItem>
                  <SelectItem value="country" className="bg-white hover:bg-gray-50">Country (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredAndSortedUniversities.length}</span> of{' '}
                <span className="font-semibold text-gray-800">{universities.length}</span> universities
              </p>
              {(searchTerm || filterByCountry !== 'all' || filterByProgram !== 'all' || filterByScholarship !== 'all' || tuitionRange.min || tuitionRange.max) && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Search: "{searchTerm}"
                    </Badge>
                  )}
                  {filterByCountry !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      Country: {filterByCountry}
                    </Badge>
                  )}
                  {filterByProgram !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      Program: {filterByProgram}
                    </Badge>
                  )}
                  {filterByScholarship !== 'all' && (
                    <Badge variant="secondary" className="text-xs">
                      Funding: {
                        filterByScholarship === 'full' ? 'Full Scholarship' :
                        filterByScholarship === 'partial' ? 'Partial Scholarship' :
                        filterByScholarship === 'self-fund' ? 'Self-Fund' : 
                        filterByScholarship
                      }
                    </Badge>
                  )}
                  {(tuitionRange.min || tuitionRange.max) && (
                    <Badge variant="secondary" className="text-xs">
                      Tuition: {tuitionRange.min || '0'} - {tuitionRange.max || '∞'}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            {(searchTerm || filterByCountry !== 'all' || filterByProgram !== 'all' || filterByScholarship !== 'all' || tuitionRange.min || tuitionRange.max) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilterByCountry('all');
                  setFilterByProgram('all');
                  setFilterByScholarship('all');
                  setTuitionRange({ min: '', max: '' });
                }}
                className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
              >
                Clear All Filters
              </Button>
            )}
          </div>

          {/* Universities Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading universities...</p>
            </div>
          ) : filteredAndSortedUniversities.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedUniversities.map((uni) => (
                <Card key={String(uni._id)} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={uni.coverImageUrl || 'https://placehold.co/400x200/3b82f6/ffffff?text=University'}
                      alt={`${uni.name} cover`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    
                    {/* Location Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm">
                        <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                        {uni.city}, {uni.country}
                      </Badge>
                    </div>
                    
                    {/* Ranking Badge */}
                    {uni.ranking && (
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="default" className="bg-yellow-500 text-white">
                          <FaAward className="h-3 w-3 mr-1" />
                          {uni.ranking}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                          {uni.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center mb-3">
                          <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                          {uni.city}, {uni.country}
                        </p>
                        
                        {/* Programs Available */}
                        {uni.programs && uni.programs.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {uni.programs.slice(0, 3).map((program, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <FaBookOpen className="h-3 w-3 mr-1" />
                                {program.level}
                              </Badge>
                            ))}
                            {uni.programs.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{uni.programs.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        {/* Fee Information */}
                        {uni.fees && (uni.fees.tuitionMin || uni.fees.tuitionMax) && (
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <FaDollarSign className="h-3 w-3 mr-1" />
                            <span>
                              {uni.fees.tuitionMin && uni.fees.tuitionMax 
                                ? `${uni.fees.tuitionMin} - ${uni.fees.tuitionMax}`
                                : uni.fees.tuitionMin || uni.fees.tuitionMax
                              }
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button 
                          asChild 
                          className="w-full group/btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Link 
                            href={`/universities/${String(uni._id)}`}
                            onClick={() => {
                              console.log('Explore University button clicked for:', uni.name, 'ID:', uni._id);
                            }}
                          >
                            <span className="flex items-center justify-center">
                              <FaEye className="mr-2 h-4 w-4" />
                              Explore University
                              <FaChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </span>
                          </Link>
                        </Button>
                        
                        <Button 
                          onClick={() => openCTA(`University: ${uni.name}`)}
                          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <span className="flex items-center justify-center">
                            <FaGraduationCap className="mr-2 h-4 w-4" />
                            Apply Now
                            <FaChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </Button>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                        <span className="flex items-center">
                          <FaBookOpen className="h-3 w-3 mr-1" />
                          {uni.programs?.length || 0} Programs
                        </span>
                        <span className="flex items-center">
                          <FaAward className="h-3 w-3 mr-1" />
                          {uni.ranking ? 'Ranked' : 'Unranked'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No universities found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        {/* Floating CTA Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <span className="text-sm font-bold text-white/50 rotate-12">Apply Now</span>
          </div>
          <div className="absolute top-32 right-32 animate-float-slow opacity-20" style={{ animationDelay: '1s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-12">Get Started</span>
          </div>
          <div className="absolute bottom-20 left-32 animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <span className="text-sm font-bold text-white/50 rotate-6">Study Abroad</span>
          </div>
          <div className="absolute bottom-32 right-20 animate-float-slow opacity-20" style={{ animationDelay: '3s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-6">Success</span>
          </div>
          
          {/* Floating CTA Icons */}
          <div className="absolute top-16 right-16 animate-float opacity-15">
            <FaRocket className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute top-40 left-40 animate-float opacity-15" style={{ animationDelay: '0.5s' }}>
            <FaGraduationCap className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-16 left-16 animate-float opacity-15" style={{ animationDelay: '1.5s' }}>
            <FaAward className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute bottom-40 right-40 animate-float opacity-15" style={{ animationDelay: '2.5s' }}>
            <FaStar className="h-6 w-6 text-white/40" />
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get personalized guidance from our expert counselors and find the perfect university for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => openCTA('Universities Page CTA')}
            >
              <FaGraduationCap className="mr-2 h-5 w-5" />
              Get Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600" asChild>
              <Link href="/destinations">
                Explore Destinations
                <FaArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

