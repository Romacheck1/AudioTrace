import { MetadataRoute } from 'next';
import pool from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
  ];

  // Fetch all content IDs from all tables
  const tables = [
    { name: 'songs', path: '/info' },
    { name: 'podcasts', path: '/podcast' },
    { name: 'audiobooks', path: '/audiobook' },
    { name: 'movies', path: '/movie' },
    { name: 'streams', path: '/stream' },
    { name: 'youtube', path: '/youtube' },
    { name: 'news', path: '/news' },
    { name: 'radio', path: '/radio' },
    { name: 'interviews', path: '/interview' },
  ];

  try {
    for (const table of tables) {
      const result = await pool.query(`SELECT id FROM ${table.name} ORDER BY id`);
      const items = result.rows.map((row: { id: number }) => ({
        url: `${baseUrl}${table.path}/${row.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
      routes.push(...items);
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return routes;
}

