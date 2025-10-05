'use client';

import React from 'react';
import Head from 'next/head';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: any;
  noindex?: boolean;
  nofollow?: boolean;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
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
  organizationData?: {
    name?: string;
    logo?: string;
    url?: string;
    contactPoint?: {
      telephone?: string;
      contactType?: string;
      email?: string;
    };
  };
}

export default function EnhancedSEO({
  title = 'EduExpress International — Study Abroad & Scholarships | Global Education Experts',
  description = 'Transform your future with EduExpress International. Expert study abroad counseling, university selection, visa assistance, and scholarship opportunities in 18+ countries. Free consultation available.',
  keywords = [
    'study abroad',
    'international education',
    'university counseling',
    'visa assistance',
    'scholarships',
    'study in UK',
    'study in USA',
    'study in Canada',
    'study in Australia',
    'study in China',
    'study in South Korea',
    'study in Hungary',
    'study in Croatia',
    'study in Cyprus',
    'study in Georgia',
    'study in Finland',
    'education consultant',
    'student visa',
    'university application',
    'study abroad programs',
    'international students',
    'education abroad',
    'global education',
    'overseas education',
    'foreign universities',
    'international scholarships',
    'study abroad consultant',
    'education abroad advisor',
    'university admission',
    'student visa consultant',
    'study abroad agency'
  ],
  canonical,
  ogImage = 'https://eduexpressint.com/brand/logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noindex = false,
  nofollow = false,
  breadcrumbs,
  faqData,
  articleData,
  organizationData
}: EnhancedSEOProps) {
  const baseUrl = 'https://eduexpressint.com';
  const fullTitle = title.includes('EduExpress') ? title : `${title} | EduExpress International`;
  const fullDescription = description;
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  } : null;

  // Generate FAQ structured data
  const faqStructuredData = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Generate Article structured data
  const articleStructuredData = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": fullTitle,
    "description": fullDescription,
    "image": fullOgImage,
    "author": {
      "@type": "Organization",
      "name": articleData.author || "EduExpress International"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EduExpress International",
      "logo": {
        "@type": "ImageObject",
        "url": "https://eduexpressint.com/brand/logo.png"
      }
    },
    "datePublished": articleData.publishedTime,
    "dateModified": articleData.modifiedTime || articleData.publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullCanonical
    },
    "articleSection": articleData.section,
    "keywords": articleData.tags?.join(', ')
  } : null;

  // Enhanced Organization structured data
  const enhancedOrganizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": organizationData?.name || "EduExpress International",
    "alternateName": "EduExpress",
    "description": "Expert study abroad counseling, university selection, visa assistance, and scholarship opportunities in 18+ countries.",
    "url": organizationData?.url || baseUrl,
    "logo": organizationData?.logo || "https://eduexpressint.com/brand/logo.png",
    "image": "https://eduexpressint.com/brand/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": organizationData?.contactPoint?.telephone || "+8801983333566",
      "contactType": organizationData?.contactPoint?.contactType || "customer service",
      "email": organizationData?.contactPoint?.email || "info@eduexpressint.com",
      "availableLanguage": "English",
      "areaServed": "Worldwide"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House: 12/1, Ground Floor, Road: 4/A, Dhanmondi",
      "addressLocality": "Dhaka",
      "postalCode": "1209",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://www.facebook.com/eduexpressint",
      "https://www.instagram.com/eduexpressint",
      "https://www.youtube.com/@eduexpressint",
      "https://www.linkedin.com/company/eduexpressint"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": ["United Kingdom", "United States", "Canada", "Australia", "Germany", "Netherlands", "China", "South Korea", "Hungary", "Croatia", "Cyprus", "Georgia", "Finland"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Study Abroad Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "University Selection",
            "description": "Expert guidance to choose the perfect university and program"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Visa Assistance",
            "description": "Complete visa processing support with high success rates"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Scholarship Support",
            "description": "Access to exclusive scholarships and financial aid opportunities"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Career Guidance",
            "description": "Post-graduation career support and job placement assistance"
          }
        }
      ]
    },
    "foundingDate": "2020",
    "numberOfEmployees": "10-50",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "USD, BDT, EUR, GBP"
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Enhanced Meta Tags */}
      <meta name="author" content="EduExpress International" />
      <meta name="publisher" content="EduExpress International" />
      <meta name="copyright" content="EduExpress International" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="theme-color" content="#0B3A5D" />
      <meta name="msapplication-TileColor" content="#0B3A5D" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="BD-DH" />
      <meta name="geo.placename" content="Dhaka" />
      <meta name="geo.position" content="23.8103;90.4125" />
      <meta name="ICBM" content="23.8103, 90.4125" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="EduExpress International - Study Abroad Experts" />
      <meta property="og:site_name" content="EduExpress International" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Open Graph for Articles */}
      {articleData && (
        <>
          <meta property="article:author" content={articleData.author || "EduExpress International"} />
          <meta property="article:published_time" content={articleData.publishedTime} />
          <meta property="article:modified_time" content={articleData.modifiedTime || articleData.publishedTime} />
          <meta property="article:section" content={articleData.section} />
          {articleData.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content="EduExpress International - Study Abroad Experts" />
      <meta name="twitter:creator" content="@eduexpressint" />
      <meta name="twitter:site" content="@eduexpressint" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
      )}
      
      {/* FAQ Structured Data */}
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      
      {/* Article Structured Data */}
      {articleStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
      )}
      
      {/* Enhanced Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedOrganizationData) }}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      
      {/* Additional Performance Optimizations */}
      <link rel="preload" href="/brand/logo.png" as="image" />
      <link rel="preload" href="/brand/icon.png" as="image" />
    </Head>
  );
}
