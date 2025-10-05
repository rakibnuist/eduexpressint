'use client';

import React from 'react';
import { useCTA } from '@/context/CTAContext';
import { trackViewContent } from '@/components/TrackLead';
import { FaCalendarAlt, FaUser, FaTag, FaEye } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Content {
  _id: string;
  title: string;
  slug: string;
  type: 'Page' | 'Blog' | 'Landing Page' | 'News' | 'Announcement';
  author: string;
  content: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  metaDescription?: string;
  categories: string[];
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContentPageClientProps {
  content: Content;
}

export default function ContentPageClient({ content }: ContentPageClientProps) {
  const { openCTA } = useCTA();

  const handleCTAClick = (source: string) => {
    trackViewContent(`${content.title} CTA Click`, {
      content_category: 'Content Page',
      content_ids: [`${content.slug}-cta`],
      value: 1
    });
    openCTA(source);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Page': 'bg-blue-100 text-blue-800',
      'Blog': 'bg-green-100 text-green-800',
      'Landing Page': 'bg-purple-100 text-purple-800',
      'News': 'bg-orange-100 text-orange-800',
      'Announcement': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // For Page type content, render as landing page with minimal layout
  if (content.type === 'Page') {
    return (
      <div className="min-h-screen">
        {/* Landing Page Content - Just the content data */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        
        {/* CTA Section for Landing Pages */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Get personalized guidance and support for your international education goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleCTAClick('landing-page-cta')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Get Free Consultation
            </Button>
            <Button
              onClick={() => handleCTAClick('landing-page-contact')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // For other content types, render the full layout with metadata
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <Badge className={`${getTypeColor(content.type)} mb-4`}>
              {content.type}
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {content.title}
            </h1>
            {content.metaDescription && (
              <p className="text-xl text-gray-600 mb-6">
                {content.metaDescription}
              </p>
            )}
          </div>

          {/* Featured Image */}
          {content.featuredImage && (
            <div className="mb-8">
              <img
                src={content.featuredImage.url}
                alt={content.featuredImage.alt || content.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>{content.author}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>{formatDate(content.publishedAt || content.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-2" />
              <span>Published</span>
            </div>
          </div>

          {/* Categories and Tags */}
          <div className="mb-8">
            {content.categories.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {content.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {content.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <FaTag className="mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Get personalized guidance and support for your international education goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleCTAClick('content-page-cta')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Get Free Consultation
            </Button>
            <Button
              onClick={() => handleCTAClick('content-page-contact')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
