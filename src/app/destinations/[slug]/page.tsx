import { notFound } from "next/navigation";
import { DESTINATIONS, findDestination } from "@/lib/data/destinations";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DESTINATIONS.map((dest) => ({ slug: dest.slug }));
}

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const destination = findDestination(slug);
    
    if (!destination) return {};
    
    return {
      title: destination.seo?.title ?? `Study in ${destination.name} — EduExpress`,
      description: destination.seo?.description ?? `${destination.summary} Apply with EduExpress counseling.`,
      alternates: { canonical: `/destinations/${destination.slug}` },
      openGraph: {
        title: destination.seo?.title ?? destination.name,
        description: destination.summary,
        images: [{ url: destination.heroImage }]
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

export default async function DestinationPage({ params }: Props) {
    const { slug } = await params;
  const destination = findDestination(slug);

  if (!destination) {
    notFound();
}

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">
          TEST PAGE: {destination.name}
            </h1>
        <p className="text-2xl text-gray-700 mb-8">
          Slug: {slug}
        </p>
        <p className="text-lg text-gray-600">
          This is a test to verify the page is working correctly.
            </p>
          </div>
    </main>
  );
}