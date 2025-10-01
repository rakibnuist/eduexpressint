import React from 'react';
import { Metadata } from 'next';
import UpdatePageClient from './UpdatePageClient';

export const metadata: Metadata = {
  title: 'Updates | EduExpress International - Latest News & Announcements',
  description: 'Stay updated with the latest news, announcements, and important updates from EduExpress International. Get informed about new opportunities and changes.',
  keywords: 'updates, news, announcements, study abroad news, education updates, latest information, EduExpress news',
  openGraph: {
    title: 'Latest Updates | EduExpress International',
    description: 'Stay informed with the latest news, announcements, and important updates from EduExpress International. Discover new study abroad opportunities and educational insights.',
    url: 'https://eduexpressinternational.com/update',
    siteName: 'EduExpress International',
    images: [
      {
        url: '/brand/logo.png',
        width: 1200,
        height: 630,
        alt: 'EduExpress International Updates',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Updates | EduExpress International',
    description: 'Stay informed with the latest news, announcements, and important updates from EduExpress International.',
    images: ['/brand/logo.png'],
    creator: '@EduExpressIntl',
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
};

export default function UpdatePage() {
  return (
    <div className="relative overflow-hidden">
      <UpdatePageClient />
    </div>
  );
}
