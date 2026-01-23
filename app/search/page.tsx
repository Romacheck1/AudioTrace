import Header from '@/components/Header';
import pool from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search through all songs, podcasts, audiobooks, movies, streams, YouTube videos, news, radio, and interviews in the SoundTrace database.',
  robots: {
    index: true,
    follow: true,
  },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  
  // Fetch all data from all tables
  const tables = [
    'songs',
    'podcasts',
    'audiobooks',
    'movies',
    'streams',
    'youtube',
    'news',
    'radio',
    'interviews'
  ];

  const allNames: string[] = [];

  try {
    // Query each table and collect all titles
    for (const table of tables) {
      const result = await pool.query(`SELECT title FROM ${table} ORDER BY title`);
      const titles = result.rows.map((row: { title: string }) => row.title);
      allNames.push(...titles);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Sort all names alphabetically
  allNames.sort();

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-16">
        <h1 className="text-4xl font-bold mb-8">
          All Database Entries ({allNames.length} items)
        </h1>
        <div className="bg-white rounded-lg p-8 border border-gray-300 min-h-[400px]">
          {allNames.length === 0 ? (
            <p className="text-gray-600">No data found in the database.</p>
          ) : (
            <ul className="space-y-2">
              {allNames.map((name, index) => (
                <li key={index} className="text-gray-800 py-1 border-b border-gray-100 last:border-b-0">
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
