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
import { useState } from "react";
import { DESTINATIONS } from "@/lib/data/destinations";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Study Abroad <span className="text-yellow-300">Destinations</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover world-class universities in our most sought-after destinations. 
              Your global education journey starts here.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-yellow-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <TabsList className="grid w-full md:w-auto grid-cols-4">
                <TabsTrigger value="all" onClick={() => setSelectedRegion("all")}>All</TabsTrigger>
                <TabsTrigger value="europe" onClick={() => setSelectedRegion("europe")}>Europe</TabsTrigger>
                <TabsTrigger value="asia" onClick={() => setSelectedRegion("asia")}>Asia</TabsTrigger>
                <TabsTrigger value="americas" onClick={() => setSelectedRegion("americas")}>Americas</TabsTrigger>
              </TabsList>
            </div>

            {/* Destinations Grid */}
            {filteredDestinations.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredDestinations.map((destination) => (
                  <Card key={destination.slug} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={destination.heroImage || '/brand/hero-fallback.jpg'}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800">
                          <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                          {destination.slug.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                        {destination.tagline && (
                          <p className="text-blue-100 text-sm mb-3">{destination.tagline}</p>
                        )}
                        {/* Key Selling Points */}
                        {destination.keySellingPoints && destination.keySellingPoints.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {destination.keySellingPoints.slice(0, 3).map((point, index) => (
                              <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaStar className="h-4 w-4 text-yellow-500" />
                          <span>Top-rated destination</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Bachelor's</Badge>
                          <Badge variant="outline">Master's</Badge>
                          <Badge variant="outline">PhD</Badge>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button asChild className="w-full group/btn">
                            <Link href={`/destinations/${destination.slug}`}>
                              Explore Destination
                              <FaArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full group/btn">
                            <Link href="/universities">
                              Explore Universities
                              <FaGraduationCap className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No destinations found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                <FaGraduationCap className="mr-2 h-5 w-5" />
                Get Free Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/universities">
                View Universities
                <FaArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
