import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ContentPageClient from './ContentPageClient';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for the content page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/content/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return {
        title: 'Content Not Found - EduExpress International',
        description: 'The requested content could not be found.',
      };
    }
    
    const result = await response.json();
    const content = result.data;
    
    return {
      title: `${content.title} - EduExpress International`,
      description: content.metaDescription || content.content.substring(0, 160),
      openGraph: {
        title: content.title,
        description: content.metaDescription || content.content.substring(0, 160),
        images: content.featuredImage ? [content.featuredImage.url] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Content - EduExpress International',
      description: 'Educational content from EduExpress International',
    };
  }
}

// This is the main page component that renders the content
export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/content/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      notFound();
    }
    
    const result = await response.json();
    const content = result.data;
    
    return <ContentPageClient content={content} />;
  } catch (error) {
    console.error('Error fetching content:', error);
    notFound();
  }
}
