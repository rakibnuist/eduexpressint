import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { IUniversity } from '@/models/University';
import UniversityPageClient from './UniversityPageClient'; // Import the new client component
import dbConnect from '@/lib/db';
import University from '@/models/University';
import { findDestination } from '@/lib/data/destinations';

export const dynamic = 'force-static';

// Generate static params for all universities
export async function generateStaticParams() {
  try {
    await dbConnect();
    const universities = await University.find({}, '_id').lean();
    return universities.map((university: any) => ({
      id: university._id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

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
    
    console.log('University found:', (item as any).name);
    
    // Transform destination string to object format
    let destinationInfo = null;
    if ((item as any).destination) {
      const destination = findDestination((item as any).destination);
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
      _id: (item as any)._id.toString(), // Convert ObjectId to string
      destination: destinationInfo,
      createdAt: (item as any).createdAt?.toISOString(), // Convert Date to string
      updatedAt: (item as any).updatedAt?.toISOString(), // Convert Date to string
      // Convert programs array with nested ObjectIds
      programs: (item as any).programs?.map((program: any) => ({
        ...program,
        _id: program._id?.toString() || null,
        tuition: program.tuition ? {
          ...program.tuition,
          amount: program.tuition.amount || 0,
          currency: program.tuition.currency || 'USD'
        } : null
      })) || [],
      // Convert scholarships array with nested ObjectIds
      scholarships: (item as any).scholarships?.map((scholarship: any) => ({
        ...scholarship,
        _id: scholarship._id?.toString() || null,
        value: scholarship.value || { tuitionFee: '' },
        currency: scholarship.currency || 'USD'
      })) || [],
      // Convert FAQs array with nested ObjectIds
      faqs: (item as any).faqs?.map((faq: any) => ({
        ...faq,
        _id: faq._id?.toString() || null
      })) || [],
      // Convert requirements with nested ObjectIds
      requirements: (item as any).requirements ? {
        ...(item as any).requirements,
        general: (item as any).requirements.general || [],
        documents: (item as any).requirements.documents || [],
        languageTests: (item as any).requirements.languageTests?.map((test: any) => ({
          ...test,
          _id: test._id?.toString() || null
        })) || []
      } : null,
      // Convert fees object
      fees: (item as any).fees ? {
        ...(item as any).fees,
        application: (item as any).fees.application || 0,
        tuition: (item as any).fees.tuition ? {
          ...(item as any).fees.tuition,
          amount: (item as any).fees.tuition.amount || 0,
          currency: (item as any).fees.tuition.currency || 'USD'
        } : null,
        entries: (item as any).fees.entries?.map((entry: any) => ({
          ...entry,
          _id: entry._id?.toString() || null
        })) || []
      } : null
    };
    
    return transformedItem as any;
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
