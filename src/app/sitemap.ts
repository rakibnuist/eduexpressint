import type { MetadataRoute } from 'next';
import { DESTINATIONS } from '@/lib/data/destinations';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://eduexpress.info';
  const now = new Date();

  // Static pages with priority and change frequency
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/services/university-applications`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/services/visa-assistance`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/services/scholarship-support`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/services/career-guidance`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/update`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/destinations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/universities`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/b2b`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 }
  ];

  // Destination pages with priority
  const destinationPages: MetadataRoute.Sitemap = DESTINATIONS.map(d => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  // University pages (if you have a way to fetch them)
  // This would need to be implemented based on your university data structure
  const universityPages: MetadataRoute.Sitemap = [
    // Add university pages here if you have them
    // Example: { url: `${base}/universities/university-name`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 }
  ];

  return [...staticPages, ...destinationPages, ...universityPages];
}
