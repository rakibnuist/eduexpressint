import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from './providers';
import { CTAProvider } from '@/context/CTAContext';
import CTAForm from '@/components/CTAForm';
import MetaPixelProvider from '@/components/MetaPixel';
import GoogleTagManagerProvider from '@/components/GoogleTagManager';

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
    'education consultant',
    'student visa',
    'university application',
    'study abroad programs',
    'international students',
    'education abroad'
  ],
  authors: [{ name: 'EduExpress International' }],
  creator: 'EduExpress International',
  publisher: 'EduExpress International',
  metadataBase: new URL('https://eduexpress.info'),
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
    url: 'https://eduexpress.info',
    siteName: 'EduExpress International',
    images: [
      {
        url: '/brand/hero.jpg',
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
    images: ['/brand/hero.jpg'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EduExpress International",
    "description": "Expert study abroad counseling, university selection, visa assistance, and scholarship opportunities in 18+ countries.",
    "url": "https://eduexpress.info",
    "logo": "https://eduexpress.info/brand/logo-256.png",
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
    }
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-white text-brand-dark" suppressHydrationWarning>
        <Providers>
          <GoogleTagManagerProvider>
            <MetaPixelProvider>
              <CTAProvider>
                <Navbar />
                <main className="pt-0 min-h-screen">{children}</main>
                <Footer />
                <CTAForm />
              </CTAProvider>
            </MetaPixelProvider>
          </GoogleTagManagerProvider>
        </Providers>
      </body>
    </html>
  );
}
