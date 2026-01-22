'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="hidden xl:block w-[1200px] mx-auto mt-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for songs, podcasts, audiobooks..."
          className="w-full px-6 py-4 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-cyan-500 text-lg transition-all"
          style={{
            boxShadow: searchQuery ? '0 0 15px rgba(0, 255, 255, 0.3)' : 'none',
          }}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-colors"
          style={{
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

