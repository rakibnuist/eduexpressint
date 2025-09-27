import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { IUniversity } from '@/models/University';
import UniversityPageClient from './UniversityPageClient'; // Import the new client component
import dbConnect from '@/lib/dbConnect';
import University from '@/models/University';
import { findDestination } from '@/lib/data/destinations';

type Props = {
  params: Promise<{ id: string }>;
};

// This function generates the page title and description dynamically for better SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const university = await getUniversity(id);
  return {
    title: `${university.name} | EduExpress International`,
    description: `Explore programs, fees, and scholarship details for ${university.name}.`,
  };
}

// This server-side function fetches data before the page is rendered
async function getUniversity(id: string): Promise<IUniversity & { destination: { name: string; slug: string; } }> {
  try {
    await dbConnect();
    
    console.log('Fetching university with ID:', id);
    
    const item = await University.findById(id).lean();
    
    if (!item) {
      console.log('University not found for ID:', id);
      notFound();
    }
    
    console.log('University found:', item.name);
    
    // Transform destination string to object format
    let destinationInfo = null;
    if (item.destination) {
      const destination = findDestination(item.destination);
      if (destination) {
        destinationInfo = {
          name: destination.name,
          slug: destination.slug
        };
      }
    }
    
    // Add destination info to the item and serialize properly
    const transformedItem = {
      ...item,
      _id: item._id.toString(), // Convert ObjectId to string
      destination: destinationInfo,
      createdAt: item.createdAt?.toISOString(), // Convert Date to string
      updatedAt: item.updatedAt?.toISOString() // Convert Date to string
    };
    
    return transformedItem;
  } catch (error) {
    console.error('Error fetching university:', error);
    notFound();
  }
}

// This is the main Server Component for the page
export default async function UniversityDetailsPage({ params }: Props) {
  const { id } = await params;
  const university = await getUniversity(id);

  // Additional safety check
  if (!university) {
    notFound();
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Pass the server-fetched data to the interactive Client Component */}
      <UniversityPageClient university={university} />
    </div>
  );
}
