import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UniversityPageClient from './UniversityPageClient';
import { findDestination } from '@/lib/data/destinations';

// Generate static params for universities
export async function generateStaticParams() {
  // During build time, we can't fetch from external APIs
  // Return a minimal set of static params
  return [
    { id: 'zzu' },
    { id: 'nuist' },
    { id: 'university-of-cambridge' },
    { id: 'seoul-national-university' }
  ];
}

type Props = {
  params: Promise<{ id: string }>;
};

// This function generates comprehensive SEO metadata using database data
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const university = await getUniversity(id);
  
  // Use SEO data from database or create fallback
  const seoTitle = university.seo?.title || `${university.name} - Study Abroad Programs & Scholarships | EduExpress International`;
  const seoDescription = university.seo?.description || university.shortDescription || `Explore programs, fees, and scholarship details for ${university.name}. Get expert guidance for your study abroad journey.`;
  const seoKeywords = university.seo?.keywords || [
    university.name,
    'study abroad',
    'university',
    'international education',
    university.country,
    university.city,
    'scholarships',
    'admissions'
  ];

  // Generate canonical URL
  const canonicalUrl = `https://eduexpress.info/universities/${university.slug || id}`;
  
  // Generate Open Graph image URL
  const ogImageUrl = university.coverImageUrl || university.logoUrl || 'https://eduexpress.info/brand/hero.jpg';

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: 'EduExpress International' }],
    creator: 'EduExpress International',
    publisher: 'EduExpress International',
    metadataBase: new URL('https://eduexpress.info'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'EduExpress International',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${university.name} - Study Abroad Programs`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

// This server-side function fetches data before the page is rendered
async function getUniversity(id: string) {
  try {
    // Try to fetch university from API
    const response = await fetch(`${process.env.API_BASE_URL || 'https://www.eduexpressint.com'}/api/universities/${id}`, {
      cache: 'force-cache'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        const university = data.data;
        
        // Transform destination string to object format
        let destinationInfo = null;
        if (university.destination) {
          const destination = findDestination(university.destination);
          if (destination) {
            destinationInfo = {
              name: destination.name,
              slug: destination.slug
            };
          }
        }
        
        return {
          ...university,
          destination: destinationInfo || { name: university.country || 'Unknown', slug: university.destination || 'unknown' }
        };
      }
    }
  } catch (error) {
    console.error('Error fetching university:', error);
  }
  
  // If not found, return 404
  notFound();
}

// Generate structured data for SEO
function generateStructuredData(university: any) {
  const baseUrl = 'https://eduexpress.info';
  
  // Get program names for structured data
  const programNames = university.programs?.map((p: any) => p.name) || [];
  
  // Get scholarship information
  const scholarshipNames = university.scholarships?.map((s: any) => s.name) || [];
  
  // Get fee information
  const feesArray = Array.isArray(university.fees) 
    ? university.fees 
    : (university.fees as any)?.entries || [];
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": university.name,
    "description": university.seo?.description || university.shortDescription || university.description,
    "url": `${baseUrl}/universities/${university.slug || university._id}`,
    "logo": university.logoUrl || university.logo || `${baseUrl}/brand/logo.png`,
    "image": university.coverImageUrl || university.logoUrl || `${baseUrl}/brand/hero.jpg`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": university.city,
      "addressCountry": university.country,
      "streetAddress": university.address || `${university.city}, ${university.country}`
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": university.phone,
      "email": university.email,
      "contactType": "admissions",
      "url": university.website
    },
    "sameAs": university.website ? [university.website] : [],
    "foundingDate": university.founded?.toString(),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Academic Programs",
      "itemListElement": programNames.map((programName: string, index: number) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Course",
          "name": programName,
          "provider": {
            "@type": "EducationalOrganization",
            "name": university.name
          }
        }
      }))
    },
    "makesOffer": scholarshipNames.length > 0 ? scholarshipNames.map((scholarshipName: string) => ({
      "@type": "Offer",
      "name": scholarshipName,
      "description": `Scholarship opportunity at ${university.name}`,
      "category": "Educational Scholarship"
    })) : undefined,
    "aggregateRating": university.ranking?.global ? {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "100",
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "additionalProperty": feesArray.length > 0 ? feesArray.map((fee: any) => ({
      "@type": "PropertyValue",
      "name": fee.type,
      "value": `${fee.currency} ${fee.amount}`,
      "description": fee.description
    })) : undefined
  };

  // Remove undefined properties
  return JSON.stringify(structuredData, (key, value) => value === undefined ? undefined : value);
}

// This is the main page component that renders the university details
export default async function UniversityPage({ params }: Props) {
  const { id } = await params;
  const university = await getUniversity(id);
  const structuredData = generateStructuredData(university);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <UniversityPageClient university={university} />
    </>
  );
}