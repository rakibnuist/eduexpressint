import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  noIndex?: boolean;
  noFollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  university?: string;
  country?: string;
  program?: string;
  programLevel?: string;
  tuition?: number;
  currency?: string;
  duration?: string;
  language?: string;
  applicationDeadline?: string;
  startDate?: string;
}

export default function SEOHead({
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
    'education consultant',
    'student visa',
    'university application',
    'study abroad programs',
    'international students',
    'education abroad'
  ],
  canonical,
  ogImage = '/brand/hero.jpg',
  ogType = 'website',
  structuredData,
  noIndex = false,
  noFollow = false,
  author = 'EduExpress International',
  publishedTime,
  modifiedTime,
  section = 'Education',
  tags = [],
  university,
  country,
  program,
  programLevel,
  tuition,
  currency = 'USD',
  duration,
  language = 'English',
  applicationDeadline,
  startDate
}: SEOHeadProps) {
  const baseUrl = 'https://eduexpress.info';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : `${baseUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  // Generate enhanced structured data
  const enhancedStructuredData = structuredData || {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": description,
    "url": baseUrl,
    "logo": `${baseUrl}/brand/logo-256.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "info@eduexpress.info"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "sameAs": [
      "https://www.facebook.com/eduexpress",
      "https://www.twitter.com/eduexpress",
      "https://www.linkedin.com/company/eduexpress"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": ["United Kingdom", "United States", "Canada", "Australia", "Germany", "Netherlands", "China", "South Korea", "Hungary", "Croatia", "Cyprus", "Georgia"]
    }
  };

  // Add university-specific structured data if provided
  if (university && country && program) {
    enhancedStructuredData["@type"] = "EducationalProgram";
    enhancedStructuredData.name = `${program} at ${university}`;
    enhancedStructuredData.description = `${program} program at ${university} in ${country}. ${description}`;
    enhancedStructuredData.provider = {
      "@type": "EducationalOrganization",
      "name": university,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": country
      }
    };
    enhancedStructuredData.educationalLevel = programLevel;
    enhancedStructuredData.inLanguage = language;
    if (tuition) {
      enhancedStructuredData.offers = {
        "@type": "Offer",
        "price": tuition,
        "priceCurrency": currency,
        "availability": "https://schema.org/InStock"
      };
    }
    if (duration) {
      enhancedStructuredData.timeRequired = duration;
    }
    if (applicationDeadline) {
      enhancedStructuredData.applicationDeadline = applicationDeadline;
    }
    if (startDate) {
      enhancedStructuredData.startDate = startDate;
    }
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="EduExpress International" />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@eduexpress" />
      <meta name="twitter:creator" content="@eduexpress" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="EduExpress" />
      
      {/* Educational specific meta tags */}
      {university && <meta name="university" content={university} />}
      {country && <meta name="country" content={country} />}
      {program && <meta name="program" content={program} />}
      {programLevel && <meta name="program-level" content={programLevel} />}
      {tuition && <meta name="tuition" content={`${tuition} ${currency}`} />}
      {duration && <meta name="duration" content={duration} />}
      {language && <meta name="language" content={language} />}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedStructuredData) }}
      />
      
      {/* Additional structured data for breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseUrl
              },
              ...(country ? [{
                "@type": "ListItem",
                "position": 2,
                "name": country,
                "item": `${baseUrl}/destinations/${country.toLowerCase().replace(/\s+/g, '-')}`
              }] : []),
              ...(university ? [{
                "@type": "ListItem",
                "position": 3,
                "name": university,
                "item": fullCanonical
              }] : [])
            ]
          })
        }}
      />
      
      {/* FAQ structured data if applicable */}
      {title.toLowerCase().includes('faq') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does the application process take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The complete application process typically takes 3-6 months, depending on the country and university requirements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide visa assistance?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide comprehensive visa assistance including document preparation, application submission, interview preparation, and follow-up support."
                  }
                }
              ]
            })
          }}
        />
      )}
    </Head>
  );
}
