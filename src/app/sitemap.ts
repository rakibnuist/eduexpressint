import type { MetadataRoute } from 'next';
import { DESTINATIONS } from '@/lib/data/destinations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://eduexpress.info';
  const now = new Date();

  const staticPages = ['', '/about', '/services', '/update', '/contact', '/destinations', '/b2b', '/privacy-policy']
    .map(path => ({ url: `${base}${path}`, lastModified: now }));

  // Use static destinations data
  const destinationPages: MetadataRoute.Sitemap = DESTINATIONS.map(d => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: now,
  }));

  return [...staticPages, ...destinationPages];
}
