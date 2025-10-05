'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import EnhancedSEO from './EnhancedSEO';

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  noindex?: boolean;
  nofollow?: boolean;
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
  articleData?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
}

export default function PageSEO({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  structuredData,
  noindex = false,
  nofollow = false,
  faqData,
  articleData
}: PageSEOProps) {
  const pathname = usePathname();
  
  // Generate breadcrumbs based on pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'Home', url: '/' }
    ];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name: name,
        url: currentPath
      });
    });
    
    return breadcrumbs;
  };

  // Generate page-specific keywords based on pathname
  const generatePageKeywords = () => {
    const baseKeywords = [
      'study abroad',
      'international education',
      'university counseling',
      'visa assistance',
      'scholarships',
      'education consultant',
      'student visa',
      'university application',
      'study abroad programs',
      'international students',
      'education abroad'
    ];

    const pathKeywords: { [key: string]: string[] } = {
      '/about': ['about eduexpress', 'education consultant company', 'study abroad agency'],
      '/services': ['study abroad services', 'education services', 'university counseling services'],
      '/destinations': ['study destinations', 'study abroad countries', 'international study options'],
      '/universities': ['universities abroad', 'international universities', 'university search'],
      '/scholarships': ['study abroad scholarships', 'international scholarships', 'education funding'],
      '/contact': ['contact eduexpress', 'study abroad consultation', 'education advisor contact'],
      '/b2b': ['b2b education services', 'corporate education', 'business education partnerships']
    };

    const destinationKeywords: { [key: string]: string[] } = {
      'uk': ['study in UK', 'UK universities', 'study in United Kingdom', 'UK student visa'],
      'usa': ['study in USA', 'US universities', 'study in United States', 'US student visa'],
      'canada': ['study in Canada', 'Canadian universities', 'Canada student visa'],
      'australia': ['study in Australia', 'Australian universities', 'Australia student visa'],
      'china': ['study in China', 'Chinese universities', 'China student visa'],
      'south-korea': ['study in South Korea', 'Korean universities', 'South Korea student visa'],
      'hungary': ['study in Hungary', 'Hungarian universities', 'Hungary student visa'],
      'croatia': ['study in Croatia', 'Croatian universities', 'Croatia student visa'],
      'cyprus': ['study in Cyprus', 'Cypriot universities', 'Cyprus student visa'],
      'georgia': ['study in Georgia', 'Georgian universities', 'Georgia student visa'],
      'finland': ['study in Finland', 'Finnish universities', 'Finland student visa']
    };

    let pageKeywords = [...baseKeywords, ...keywords];

    // Add path-specific keywords
    if (pathKeywords[pathname]) {
      pageKeywords = [...pageKeywords, ...pathKeywords[pathname]];
    }

    // Add destination-specific keywords
    Object.keys(destinationKeywords).forEach(destination => {
      if (pathname.includes(destination)) {
        pageKeywords = [...pageKeywords, ...destinationKeywords[destination]];
      }
    });

    return [...new Set(pageKeywords)]; // Remove duplicates
  };

  // Generate page-specific description
  const generatePageDescription = () => {
    if (description) return description;

    const pathDescriptions: { [key: string]: string } = {
      '/about': 'Learn about EduExpress International, your trusted study abroad partner. Expert education consultants helping students achieve their international education dreams since 2020.',
      '/services': 'Comprehensive study abroad services including university selection, visa assistance, scholarship support, and career guidance. Expert counseling for international education.',
      '/destinations': 'Explore top study abroad destinations including UK, USA, Canada, Australia, China, South Korea, and more. Find your perfect study destination with expert guidance.',
      '/universities': 'Discover top international universities and programs. Get expert guidance on university selection, application process, and admission requirements.',
      '/scholarships': 'Find exclusive study abroad scholarships and financial aid opportunities. Get expert support to secure funding for your international education.',
      '/contact': 'Get in touch with EduExpress International for personalized study abroad consultation. Expert advisors ready to help you achieve your education goals.',
      '/b2b': 'Partner with EduExpress International for B2B education services. Corporate partnerships, institutional collaborations, and business education solutions.'
    };

    return pathDescriptions[pathname] || 'Transform your future with EduExpress International. Expert study abroad counseling, university selection, visa assistance, and scholarship opportunities in 18+ countries. Free consultation available.';
  };

  // Generate page-specific title
  const generatePageTitle = () => {
    if (title) return title;

    const pathTitles: { [key: string]: string } = {
      '/about': 'About EduExpress International | Study Abroad Experts',
      '/services': 'Study Abroad Services | University Counseling & Visa Assistance',
      '/destinations': 'Study Abroad Destinations | Top Countries for International Education',
      '/universities': 'International Universities | University Search & Applications',
      '/scholarships': 'Study Abroad Scholarships | International Education Funding',
      '/contact': 'Contact EduExpress International | Free Study Abroad Consultation',
      '/b2b': 'B2B Education Services | Corporate Education Partnerships'
    };

    return pathTitles[pathname] || 'EduExpress International — Study Abroad & Scholarships | Global Education Experts';
  };

  return (
    <EnhancedSEO
      title={generatePageTitle()}
      description={generatePageDescription()}
      keywords={generatePageKeywords()}
      canonical={pathname}
      ogImage={ogImage}
      ogType={ogType}
      structuredData={structuredData}
      noindex={noindex}
      nofollow={nofollow}
      breadcrumbs={generateBreadcrumbs()}
      faqData={faqData}
      articleData={articleData}
    />
  );
}
