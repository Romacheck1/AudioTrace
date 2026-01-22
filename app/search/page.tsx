interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q || '';

  return (
    <div className="px-10">
      <div className="w-[1200px] mx-auto mt-16">
        <h1 className="text-4xl font-bold mb-8">
          {query ? `Search Results for "${query}"` : 'Search Results'}
        </h1>
        <div className="bg-gray-100 rounded-lg p-8 border border-gray-300 min-h-[400px]">
          <p className="text-gray-600">
            {query 
              ? `Search results for "${query}" will appear here.`
              : 'Search results will appear here.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
