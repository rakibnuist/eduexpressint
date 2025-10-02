import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from './providers';
import { CTAProvider } from '@/context/CTAContext';
import CTAForm from '@/components/CTAForm';
import MetaPixelProvider from '@/components/MetaPixel';
import GoogleTagManagerProvider from '@/components/GoogleTagManager';
import ErrorBoundary from '@/components/ErrorBoundary';
// import { TrackingCapture } from '@/components/TrackingCapture';
// import EnhancedTracking from '@/components/EnhancedTracking';
// import SEOTestComponent from '@/components/SEOTestComponent';

export const metadata = {
  title: 'EduExpress International — Study Abroad & Scholarships | Global Education Experts',
  description:
    'Transform your future with EduExpress International. Expert study abroad counseling, university selection, visa assistance, and scholarship opportunities in 18+ countries. Free consultation available.',
  keywords: [
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
  authors: [{ name: 'EduExpress International' }],
  creator: 'EduExpress International',
  publisher: 'EduExpress International',
  metadataBase: new URL('https://eduexpressint.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/brand/icon.png', sizes: 'any' },
      { url: '/brand/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/brand/icon.png' },
    ],
  },
  openGraph: {
    title: 'EduExpress International — Study Abroad & Scholarships',
    description: 'Transform your future with expert study abroad counseling, university selection, visa assistance, and scholarship opportunities in 18+ countries.',
    url: 'https://eduexpressint.com',
    siteName: 'EduExpress International',
    images: [
      {
        url: 'https://eduexpressint.com/brand/logo.png',
        width: 1200,
        height: 630,
        alt: 'EduExpress International - Study Abroad Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduExpress International — Study Abroad & Scholarships',
    description: 'Transform your future with expert study abroad counseling and scholarship opportunities.',
    images: ['https://eduexpressint.com/brand/logo.png'],
    creator: '@eduexpressint',
    site: '@eduexpressint',
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Education',
  classification: 'Study Abroad Services',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "alternateName": "EduExpress",
    "description": "Expert study abroad counseling, university selection, visa assistance, and scholarship opportunities in 18+ countries.",
    "url": "https://eduexpressint.com",
    "logo": "https://eduexpressint.com/brand/logo.png",
    "image": "https://eduexpressint.com/brand/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+8801983333566",
      "contactType": "customer service",
      "email": "info@eduexpressint.com",
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
        
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1444050970227269');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1444050970227269&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="bg-white text-brand-dark" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=GTM-${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Providers>
          <ErrorBoundary>
            <GoogleTagManagerProvider>
              <MetaPixelProvider>
                <CTAProvider>
                  {/* <TrackingCapture /> */}
                  {/* <EnhancedTracking /> */}
                  <Navbar />
                  <main className="pt-20 min-h-screen">{children}</main>
                  <Footer />
                  <CTAForm />
                  {/* <SEOTestComponent /> */}
                </CTAProvider>
              </MetaPixelProvider>
            </GoogleTagManagerProvider>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
