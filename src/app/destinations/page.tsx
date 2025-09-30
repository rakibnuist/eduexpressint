'use client';

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaGlobe, 
  FaStar,
  FaArrowRight,
  FaUsers,
  FaAward,
  FaRocket,
  FaShieldAlt,
  FaBookOpen
} from "react-icons/fa";
import FloatingElements from '@/components/FloatingElements';
import { useState } from "react";
import { DESTINATIONS } from "@/lib/data/destinations";
import {
  EduexpertFadeInUp,
  EduexpertSlideInLeft,
  EduexpertSlideInRight,
  EduexpertScaleIn,
  EduexpertCard,
  EduexpertButton,
  EduexpertImage,
  EduexpertStaggered,
  EduexpertTextReveal
} from '@/components/EduexpertAnimations';

interface Destination {
  slug: string;
  name: string;
  tagline?: string;
  heroImage?: string;
  summary?: string;
  highlights?: string[];
  keySellingPoints?: string[];
  stats?: {
    universities?: number;
    avgTuitionRange?: string;
    scholarshipNote?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

export default function DestinationsIndex() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  
  // Handle loading states for buttons
  const handleButtonClick = (buttonId: string, callback: () => void) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    
    // Simulate loading for better UX
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
      callback();
    }, 500);
  };

  // Generate creative, artistic gradient backgrounds that align with page background
  const getDestinationGradient = (slug: string) => {
    const gradients: { [key: string]: string } = {
      'uk': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #ffecd2 75%, #fcb69f 100%)',
      'china': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #a8edea 50%, #fed6e3 75%, #d299c2 100%)',
      'south-korea': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #ff9a9e 50%, #fecfef 75%, #ffd3a5 100%)',
      'hungary': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 25%, #4facfe 50%, #667eea 75%, #764ba2 100%)',
      'croatia': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff8a80 50%, #ff9a9e 75%, #fecfef 100%)',
      'cyprus': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #ffd3a5 50%, #ffecd2 75%, #fcb69f 100%)',
      'georgia': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 25%, #ffd3a5 50%, #a8edea 75%, #fed6e3 100%)',
      'netherlands': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff8a80 50%, #667eea 75%, #764ba2 100%)',
      'finland': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #ff9a9e 75%, #fecfef 100%)'
    };
    return gradients[slug] || 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #ffecd2 75%, #fcb69f 100%)';
  };

  // Get destination emoji
  const getDestinationEmoji = (slug: string) => {
    const emojis: { [key: string]: string } = {
      'uk': '🇬🇧',
      'china': '🇨🇳',
      'south-korea': '🇰🇷',
      'hungary': '🇭🇺',
      'croatia': '🇭🇷',
      'cyprus': '🇨🇾',
      'georgia': '🇬🇪',
      'netherlands': '🇳🇱',
      'finland': '🇫🇮'
    };
    return emojis[slug] || '🌍';
  };
  
  // Use static destinations data
  const destinations = DESTINATIONS;

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (dest.tagline && dest.tagline.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedRegion === "all") return matchesSearch;
    
    // Simple region mapping based on destination names
    const regionMap: { [key: string]: string[] } = {
      europe: ["uk", "hungary", "croatia", "cyprus", "georgia", "netherlands", "finland"],
      asia: ["china", "south-korea"],
      americas: []
    };
    
    const matchesRegion = regionMap[selectedRegion]?.includes(dest.slug) || false;
    return matchesSearch && matchesRegion;
  });

  // Calculate dynamic stats
  const totalUniversities = destinations.reduce((sum, dest) => sum + (dest.stats?.universities || 0), 0);
  const stats = [
    { icon: <FaGlobe className="h-5 w-5" />, value: `${destinations.length}+`, label: "Countries" },
    { icon: <FaGraduationCap className="h-5 w-5" />, value: `${totalUniversities}+`, label: "Universities" },
    { icon: <FaUsers className="h-5 w-5" />, value: "1,200+", label: "Students" },
    { icon: <FaAward className="h-5 w-5" />, value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen pt-8 relative overflow-hidden">
      {/* Creative Dynamic Background - Aligned with Card Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"></div>
      
      {/* Artistic Gradient Layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-transparent to-purple-200/40"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-pink-200/30 via-transparent to-yellow-200/30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/20 via-transparent to-rose-200/20"></div>
      
      {/* Creative Radial Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,119,198,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(120,219,255,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,165,0,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,192,203,0.1),transparent_70%)]"></div>
      
      {/* Creative Floating Elements - Matching Card Color Palette */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full artistic-float blur-sm"></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-pink-300/30 to-yellow-300/30 rounded-full artistic-float blur-sm" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-green-300/30 to-cyan-300/30 rounded-full artistic-float blur-sm" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-20 right-10 w-22 h-22 bg-gradient-to-br from-purple-300/30 to-rose-300/30 rounded-full artistic-float blur-sm" style={{animationDelay: '6s'}}></div>
      
      {/* Additional Creative Elements */}
      <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-br from-orange-300/25 to-red-300/25 rounded-full artistic-pulse blur-sm" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-60 right-1/4 w-18 h-18 bg-gradient-to-br from-teal-300/25 to-blue-300/25 rounded-full artistic-pulse blur-sm" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-1/2 left-10 w-14 h-14 bg-gradient-to-br from-violet-300/25 to-purple-300/25 rounded-full artistic-pulse blur-sm" style={{animationDelay: '5s'}}></div>
      
      {/* Creative Artistic Shapes */}
      <div className="absolute top-32 right-1/3 w-12 h-12 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full artistic-float blur-md" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-32 left-1/3 w-10 h-10 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full artistic-float blur-md" style={{animationDelay: '3.5s'}}></div>
      <div className="absolute top-1/3 right-10 w-8 h-8 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full artistic-float blur-md" style={{animationDelay: '5.5s'}}></div>
      
      {/* Floating Elements */}
      <FloatingElements variant="destinations" intensity="medium" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float-slow opacity-20">
            <span className="text-sm font-bold text-white/50 rotate-12">Study in UK</span>
          </div>
          <div className="absolute top-32 right-32 animate-float-slow opacity-20" style={{ animationDelay: '1s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-12">Study in China</span>
          </div>
          <div className="absolute bottom-20 left-32 animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <span className="text-sm font-bold text-white/50 rotate-6">Study in Korea</span>
          </div>
          <div className="absolute bottom-32 right-20 animate-float-slow opacity-20" style={{ animationDelay: '3s' }}>
            <span className="text-sm font-bold text-white/50 -rotate-6">Study in Europe</span>
          </div>
          
          {/* Floating Icons */}
          <div className="absolute top-16 right-16 animate-float opacity-15">
            <FaRocket className="h-6 w-6 text-white/40" />
          </div>
          <div className="absolute top-40 left-40 animate-float opacity-15" style={{ animationDelay: '0.5s' }}>
            <FaShieldAlt className="h-6 w-6 text-white/40" />
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
            <EduexpertFadeInUp delay={0.2} duration={1.0}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Study Abroad <span className="text-yellow-300">Destinations</span>
              </h1>
            </EduexpertFadeInUp>
            <EduexpertTextReveal delay={0.6} duration={0.8}>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Discover world-class universities in our most sought-after destinations. 
                Your global education journey starts here.
              </p>
            </EduexpertTextReveal>
            
            {/* Stats */}
            <EduexpertStaggered delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <EduexpertScaleIn key={index} delay={0.8 + index * 0.2} duration={0.6}>
                  <div className="text-center">
                    <div className="flex justify-center mb-2 text-yellow-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                </EduexpertScaleIn>
              ))}
            </EduexpertStaggered>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 creative-glass relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20"></div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg sm:text-base"
                  aria-label="Search destinations by name or tagline"
                  role="searchbox"
                />
              </div>
              <TabsList className="grid w-full md:w-auto grid-cols-4 h-12 sm:h-10" role="tablist" aria-label="Filter destinations by region">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setSelectedRegion("all")}
                  aria-label="Show all destinations"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="europe" 
                  onClick={() => setSelectedRegion("europe")}
                  aria-label="Show European destinations"
                >
                  Europe
                </TabsTrigger>
                <TabsTrigger 
                  value="asia" 
                  onClick={() => setSelectedRegion("asia")}
                  aria-label="Show Asian destinations"
                >
                  Asia
                </TabsTrigger>
                <TabsTrigger 
                  value="americas" 
                  onClick={() => setSelectedRegion("americas")}
                  aria-label="Show American destinations"
                >
                  Americas
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Destinations Grid */}
            {filteredDestinations.length > 0 ? (
              <div role="region" aria-label="Study destinations">
                <h2 className="sr-only">Available Study Destinations</h2>
                <EduexpertStaggered delay={0.1} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredDestinations.map((destination, index) => (
                  <EduexpertScaleIn key={destination.slug} delay={0.2 + index * 0.1} duration={0.6}>
                    <EduexpertCard className="group overflow-hidden cheerful-shadow gpu-accelerated positive-hover tilt-3d magnetic-effect uplifting-card enhanced-contrast bg-white/90 backdrop-blur-md border border-white/60 shadow-2xl">
                      <EduexpertImage className="relative h-64 overflow-hidden floating-particles shimmer-effect">
                        {/* Creative Gradient Background */}
                        <div 
                          className="absolute inset-0 transition-all duration-500 group-hover:scale-110 animated-gradient"
                          style={{ background: getDestinationGradient(destination.slug) }}
                        />
                        
                        {/* Creative Artistic Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/15 to-transparent rounded-full blur-lg"></div>
                        
                        {/* Bright Positive Overlay for Better Text Readability */}
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/95 to-white/60" />
                          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/30 to-transparent" />
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 animate-float-slow positive-glow happy-bounce">
                          <div className="text-4xl bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full p-3 backdrop-blur-sm shadow-lg border-2 border-yellow-200" style={{textShadow: '1px 1px 2px rgba(255,255,255,0.8)'}}>{getDestinationEmoji(destination.slug)}</div>
                        </div>
                        
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 magnetic-effect shadow-lg border-2 border-green-200 font-bold positive-glow">
                            <FaMapMarkerAlt className="h-3 w-3 mr-1" aria-hidden="true" />
                            {destination.slug.toUpperCase()}
                          </Badge>
                        </div>
                        
                        {/* Content */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 id={`destination-${destination.slug}-title`} className="text-2xl font-bold text-gray-800 mb-2" style={{textShadow: '1px 1px 2px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.6)'}}>
                            {destination.name}
                          </h3>
                          {destination.tagline && (
                            <p className="text-gray-700 text-sm mb-3 font-semibold" style={{textShadow: '1px 1px 2px rgba(255,255,255,0.7), 0 0 3px rgba(255,255,255,0.5)'}}>{destination.tagline}</p>
                          )}
                          {/* Key Selling Points */}
                          {destination.keySellingPoints && destination.keySellingPoints.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3" role="list" aria-label="Key features">
                              {destination.keySellingPoints.slice(0, 3).map((point, index) => (
                                <Badge key={index} variant="outline" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 text-xs font-bold shadow-md" role="listitem">
                                  {point}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </EduexpertImage>
                      
                      <CardContent className="p-6 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm shadow-lg border border-blue-100">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm text-gray-800 font-bold">
                            <FaStar className="h-4 w-4 text-yellow-500 animate-pulse" aria-hidden="true" />
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Top-rated destination</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2" role="list" aria-label="Available degree programs">
                            <Badge variant="outline" role="listitem" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 font-bold shadow-sm hover:shadow-md transition-shadow">Bachelor's</Badge>
                            <Badge variant="outline" role="listitem" className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 font-bold shadow-sm hover:shadow-md transition-shadow">Master's</Badge>
                            <Badge variant="outline" role="listitem" className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 font-bold shadow-sm hover:shadow-md transition-shadow">PhD</Badge>
                          </div>
                          
                          <div className="flex gap-2">
                            <EduexpertButton 
                              asChild 
                              variant="gradient" 
                              size="default"
                              className="flex-1 group/btn optimized-button min-h-[48px] gpu-accelerated transform-optimized magnetic-effect shimmer-effect button-shadow-enhanced"
                              loading={loadingStates[`explore-${destination.slug}`]}
                            >
                              <Link 
                                href={`/destinations/${destination.slug}`}
                                aria-label={`Explore ${destination.name} destination - Learn about universities, programs, and opportunities`}
                                onClick={() => handleButtonClick(`explore-${destination.slug}`, () => {})}
                              >
                                <span className="text-sm font-extrabold text-white" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>🌍 Explore</span>
                              </Link>
                            </EduexpertButton>
                            <EduexpertButton 
                              asChild 
                              variant="outline" 
                              size="default"
                              className="flex-1 group/btn optimized-button min-h-[48px] gpu-accelerated transform-optimized magnetic-effect button-shadow-enhanced border-2 border-green-300 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100"
                              loading={loadingStates[`universities-${destination.slug}`]}
                            >
                              <Link 
                                href="/universities"
                                aria-label="Browse all universities and programs available"
                                onClick={() => handleButtonClick(`universities-${destination.slug}`, () => {})}
                              >
                                <span className="text-sm font-extrabold text-green-700">🎓 Universities</span>
                              </Link>
                            </EduexpertButton>
                          </div>
                        </div>
                      </CardContent>
                    </EduexpertCard>
                  </EduexpertScaleIn>
                ))}
                </EduexpertStaggered>
              </div>
            ) : (
              <div className="text-center py-12" role="status" aria-live="polite">
                <FaSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No destinations found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-purple-500/80 to-indigo-500/80"></div>
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get personalized guidance from our expert counselors and find the perfect program for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Button 
              size="xl" 
              variant="secondary" 
              asChild 
              className="min-h-[56px] sm:min-h-[48px] optimized-button w-full sm:w-auto gpu-accelerated transform-optimized"
              loading={loadingStates['contact-cta']}
              loadingText="Redirecting..."
            >
              <Link 
                href="/contact"
                aria-label="Get a free consultation with our education experts"
                onClick={() => handleButtonClick('contact-cta', () => {})}
              >
                <FaGraduationCap className="mr-2 h-5 w-5" aria-hidden="true" />
                <span className="text-lg sm:text-base">Get Free Consultation</span>
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 min-h-[56px] sm:min-h-[48px] optimized-button w-full sm:w-auto gpu-accelerated transform-optimized" 
              asChild
              loading={loadingStates['universities-cta']}
              loadingText="Loading..."
            >
              <Link 
                href="/universities"
                aria-label="View all available universities and programs"
                onClick={() => handleButtonClick('universities-cta', () => {})}
              >
                <span className="text-lg sm:text-base">View Universities</span>
                <FaArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
