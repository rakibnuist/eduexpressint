'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  FaGraduationCap,
  FaUsers,
  FaGlobeAmericas,
  FaAward,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
  FaRocket,
  FaCheckCircle,
  FaShieldAlt,
  FaBookOpen,
  FaHandshake,
  FaQuestionCircle,
  FaPhone,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useCTA } from '@/context/CTAContext';
import { usePageTracking } from '@/hooks/usePageTracking';

// Simple animation components
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div 
    className={`opacity-0 animate-fade-in-up ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animationFillMode: 'both'
    }}
  >
    {children}
  </div>
);

// Simple animated text component
const AnimatedHeroText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const texts = [
    "Global Education",
    "Global Opportunity", 
    "Better Scholarship"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="relative h-20 sm:h-24 lg:h-28 flex items-center justify-center">
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl block transition-all duration-500">
        {texts[currentTextIndex]}
      </span>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ faq, index }: { faq: { question: string; answer: string }; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeIn delay={800 + index * 200}>
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm min-h-[80px] hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <FaQuestionCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {faq.question}
              </h3>
            </div>
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <FaChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 pb-6">
              <div className="ml-10 border-l-2 border-blue-200 pl-4">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default function HomePage() {
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const { openCTA } = useCTA();
  usePageTracking(); // Track page view

  // Fetch success stories from API
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await fetch('/api/success-stories?featured=true&limit=10');
        if (response.ok) {
          const data = await response.json();
          setSuccessStories(data.data?.stories || []);
        }
      } catch (error) {
        console.error('Error fetching success stories:', error);
      } finally {
        setStoriesLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  // Sample data
  const stats = [
    { number: "500+", label: "Universities", description: "Partner institutions worldwide" },
    { number: "10K+", label: "Students", description: "Successfully placed abroad" },
    { number: "18+", label: "Countries", description: "Study destinations available" },
    { number: "95%", label: "Success Rate", description: "Visa approval success" }
  ];

  const services = [
    {
      icon: FaGraduationCap,
      title: "University Selection",
      description: "Expert guidance to choose the perfect university and program for your academic goals."
    },
    {
      icon: FaShieldAlt,
      title: "Visa Assistance",
      description: "Complete visa processing support with high success rates and personalized guidance."
    },
    {
      icon: FaAward,
      title: "Scholarship Support",
      description: "Access to exclusive scholarships and financial aid opportunities worldwide."
    },
    {
      icon: FaHandshake,
      title: "Career Guidance",
      description: "Post-graduation career support and job placement assistance in your field."
    }
  ];

  const destinations = [
    {
      name: "United Kingdom",
      image: "/brand/destinations/uk.jpg",
      flag: "🇬🇧",
      universities: 150,
      programs: "500+",
      description: "World-class education with rich cultural heritage and prestigious universities"
    },
    {
      name: "China",
      image: "/brand/destinations/china.jpg",
      flag: "🇨🇳",
      universities: 200,
      programs: "800+",
      description: "Rapidly growing education system with modern facilities and global recognition"
    },
    {
      name: "South Korea",
      image: "/brand/destinations/south-korea.jpg",
      flag: "🇰🇷",
      universities: 120,
      programs: "400+",
      description: "Advanced technology programs and innovative research opportunities"
    },
    {
      name: "Hungary",
      image: "/brand/destinations/hungary.jpg",
      flag: "🇭🇺",
      universities: 60,
      programs: "200+",
      description: "Affordable European education with excellent quality and cultural diversity"
    }
  ];

  // Transform success stories to testimonials format
  const transformStoriesToTestimonials = (stories: any[]) => {
    return stories.map(story => ({
      name: story.studentName,
      country: `Studying in ${story.universityCountry}`,
      image: story.studentImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.studentName)}&background=random&color=fff&size=150`,
      rating: 5,
      text: story.testimonialQuote || story.shortDescription || story.story.substring(0, 150) + "...",
      university: story.university,
      program: story.program,
      programLevel: story.programLevel
    }));
  };

  // Fallback testimonials
  const fallbackTestimonials = [
    {
      name: "Sarah Ahmed",
      country: "Studying in UK",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "EduExpress made my dream of studying in the UK come true. Their guidance was invaluable throughout the entire process."
    },
    {
      name: "Mohammad Rahman",
      country: "Studying in China",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The visa assistance was exceptional. I got my student visa approved on the first try thanks to their expert support."
    },
    {
      name: "Fatima Khan",
      country: "Studying in South Korea",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "They helped me secure a scholarship that covered 50% of my tuition fees. Highly recommended!"
    }
  ];

  const testimonials = successStories.length > 0 
    ? transformStoriesToTestimonials(successStories)
    : fallbackTestimonials;

  const faqs = [
    {
      question: "How long does the application process take?",
      answer: "The complete application process typically takes 3-6 months, depending on the country and university requirements. This includes document preparation, application submission, visa processing, and pre-departure arrangements."
    },
    {
      question: "Do you provide visa assistance?",
      answer: "Yes, we provide comprehensive visa assistance including document preparation, application submission, interview preparation, and follow-up support. Our team has extensive experience with visa requirements for all our destination countries."
    },
    {
      question: "What are your success rates?",
      answer: "We maintain a 95% success rate for visa approvals and 98% success rate for university admissions. Our experienced team ensures that applications are properly prepared and submitted according to each country's specific requirements."
    },
    {
      question: "Do you offer scholarship support?",
      answer: "Yes, we help students identify and apply for various scholarships, including merit-based, need-based, and country-specific options. We also provide guidance on alternative funding sources and financial planning."
    },
    {
      question: "Which countries do you serve?",
      answer: "We specialize in study abroad opportunities in China, UK, South Korea, Hungary, Croatia, Cyprus, and Georgia. Each destination offers unique advantages and we provide country-specific guidance and support."
    }
  ];

  // Auto-rotate carousels
  useEffect(() => {
    const destinationInterval = setInterval(() => {
      setCurrentDestinationIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      clearInterval(destinationInterval);
      clearInterval(testimonialInterval);
    };
  }, [destinations.length, testimonials.length]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white relative">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <FadeIn delay={200}>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="text-white">Your Gateway to</span>
                <div className="mt-2">
                  <AnimatedHeroText />
                </div>
              </h1>
            </FadeIn>
            
            <FadeIn delay={400}>
              <p className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl text-white/90 leading-relaxed">
                Connect with world-class universities worldwide. Expert counseling, scholarship opportunities, and personalized support for your academic journey abroad.
              </p>
            </FadeIn>
              
            <FadeIn delay={600}>
              <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-8 sm:justify-center max-w-4xl mx-auto px-4">
                <Button
                  onClick={() => openCTA('Hero Section Get Free Consultation')}
                  className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-4 sm:px-12 sm:py-6 rounded-2xl shadow-2xl border border-emerald-400/20 w-full sm:w-auto min-w-[280px] sm:min-w-[320px]"
                >
                  <span className="flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl">
                    <FaPhone className="h-5 w-5 sm:h-6 sm:w-6" />
                    Get Free Consultation
                    <FaArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/universities'}
                  className="group bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white hover:text-gray-800 font-bold px-8 py-4 sm:px-12 sm:py-6 rounded-2xl shadow-2xl w-full sm:w-auto min-w-[280px] sm:min-w-[320px]"
                >
                  <span className="flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl">
                    <FaGraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                    Browse Universities
                  </span>
                </Button>
              </div>
            </FadeIn>

            {/* Key Benefits */}
            <FadeIn delay={800}>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaCheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">Free Consultation</span>
                  <span className="text-white/70 text-sm text-center">Expert guidance at no cost</span>
                </div>
                
                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaShieldAlt className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">Visa Support</span>
                  <span className="text-white/70 text-sm text-center">95% success rate</span>
                </div>
                
                <div className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaAward className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">Scholarship Access</span>
                  <span className="text-white/70 text-sm text-center">Exclusive opportunities</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn delay={200}>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Trusted by Students Worldwide
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of successful students who achieved their study abroad dreams with our expert guidance
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={800 + index * 200}>
                <div className="group relative text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-[200px] flex flex-col justify-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="mt-4 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {stat.description}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn delay={200}>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Services
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support for your study abroad journey with personalized guidance every step of the way
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <FadeIn key={service.title} delay={800 + index * 200}>
                <Card className="group h-[400px] border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                      <service.icon className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS CAROUSEL */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn delay={200}>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Study Destinations
                </span>
              </h2>
              <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover world-class universities across the globe. From historic institutions to cutting-edge research centers, 
                find your perfect academic home in these top study destinations.
              </p>
            </div>
          </FadeIn>

          {/* Destinations Carousel */}
          <div className="relative z-10">
            <FadeIn delay={400}>
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentDestinationIndex * 100}%)` }}
                >
                  {destinations.map((destination, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500">
                        <div className="flex flex-col lg:flex-row min-h-[500px]">
                          {/* Left Side - Country Details */}
                          <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center relative">
                            <div className="mb-6">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-4xl">{destination.flag}</span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white">
                                  {destination.name}
                                </h3>
                              </div>
                            </div>
                            
                            <p className="text-lg text-white/90 mb-8 leading-relaxed">
                              {destination.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                                <div className="text-3xl font-bold text-white mb-1">{destination.universities}</div>
                                <div className="text-sm font-semibold text-white/80 uppercase tracking-wide">Universities</div>
                              </div>
                              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                                <div className="text-3xl font-bold text-white mb-1">{destination.programs}</div>
                                <div className="text-sm font-semibold text-white/80 uppercase tracking-wide">Programs</div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                              <button 
                                onClick={() => {
                                  const countrySlug = destination.name.toLowerCase().replace(/\s+/g, '-');
                                  window.location.href = `/destinations/${countrySlug}`;
                                }}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 flex items-center justify-center gap-2"
                              >
                                <FaGlobeAmericas className="w-5 h-5" />
                                Explore {destination.name}
                              </button>
                              
                              <button 
                                onClick={() => {
                                  window.location.href = `/universities?country=${encodeURIComponent(destination.name)}`;
                                }}
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 flex items-center justify-center gap-2"
                              >
                                <FaGraduationCap className="w-5 h-5" />
                                Universities
                              </button>
                            </div>
                          </div>
                          
                          {/* Right Side - Image */}
                          <div className="lg:w-2/5 p-8 lg:p-12 flex items-center justify-center relative">
                            <div className="w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                              <img
                                src={destination.image}
                                alt={destination.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentDestinationIndex((prev) => (prev - 1 + destinations.length) % destinations.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 z-30"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setCurrentDestinationIndex((prev) => (prev + 1) % destinations.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 z-30"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-3">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDestinationIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentDestinationIndex 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-16 bg-gradient-to-br from-emerald-100 via-teal-100 to-orange-100">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                <span className="bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
                  Student Success Stories
                </span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Hear from students who achieved their study abroad dreams
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              {storiesLoading ? (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading success stories...</p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Card className="mx-4 border-0 shadow-xl bg-white/90 backdrop-blur-sm h-[400px] hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-8 text-center">
                          <div className="relative mb-6 group">
                            <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <img
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <FaCheckCircle className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          </div>

                          <FaQuoteLeft className="mx-auto mb-4 h-6 w-6 text-blue-600" />
                          <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                            "{testimonial.text}"
                          </p>
                          
                          <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                            ))}
                          </div>

                          <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                          <div className="text-sm text-blue-600 font-medium">{testimonial.country}</div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <button
              onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-gray-600 p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-gray-600 p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonialIndex ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS & TRUST SECTION */}
      <section className="py-16 bg-gradient-to-br from-orange-100 via-amber-100 to-emerald-100">
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn delay={200}>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Scholarships & Trust
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in making quality education accessible through transparent processes, 
                trusted partnerships, and comprehensive scholarship opportunities.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeIn delay={400}>
              <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl h-[400px] flex flex-col hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaAward className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Scholarship Programs</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Access to exclusive scholarship opportunities worth up to $50,000 annually. 
                  We partner with universities to provide merit-based and need-based financial aid.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Merit-based scholarships</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Need-based financial aid</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">University partnership programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Application assistance included</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={600}>
              <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl h-[400px] flex flex-col hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaShieldAlt className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">100% Transparency</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Complete transparency in all our processes. No hidden fees, no surprise costs. 
                  You'll know exactly what you're paying for from day one.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">No hidden fees or charges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Clear fee structure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Regular progress updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Open communication policy</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={800}>
              <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl h-[400px] flex flex-col hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:rotate-12 transition-transform duration-300">
                    <FaUsers className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Trusted by 10K+ Students</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Join thousands of successful students who have achieved their study abroad dreams 
                  with our trusted guidance and support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">95% visa success rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">24/7 student support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Verified testimonials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Accredited partnerships</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-16 text-center">
            <FadeIn delay={1000}>
              <button
                onClick={() => openCTA('Scholarship Section Apply for Scholarship')}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110"
              >
                <span className="flex items-center gap-2">
                  <FaAward className="h-5 w-5" />
                  Apply for Scholarships
                  <FaArrowRight className="h-4 w-4" />
                </span>
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-gradient-to-br from-emerald-100 via-teal-100 to-violet-100">
        <div className="relative mx-auto max-w-4xl px-6">
          <FadeIn delay={200}>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about studying abroad and our services
              </p>
            </div>
          </FadeIn>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-violet-200 via-indigo-300 to-slate-800">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn delay={200}>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get personalized guidance and make your international education dreams a reality
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => openCTA('Final CTA Section Apply Now')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-12 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50 text-lg"
              >
                <span className="flex items-center gap-3">
                  <FaRocket className="h-5 w-5" />
                  Apply Now
                  <FaArrowRight className="h-4 w-4" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-white/50 text-white bg-white/20 backdrop-blur-sm font-bold px-12 py-6 rounded-full transition-all duration-300 hover:bg-white hover:text-purple-600 hover:border-white hover:scale-110 text-lg"
              >
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    <FaPhone className="h-4 w-4" />
                    Contact Us
                  </span>
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
