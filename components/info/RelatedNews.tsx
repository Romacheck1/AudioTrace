interface News {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface RelatedNewsProps {
  news: News[];
}

export default function RelatedNews({ news }: RelatedNewsProps) {
  if (news.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related News Sources</h2>
      <div className="space-y-3">
        {news.map((item) => (
          <a key={item.id} href={`/news/${item.id}`} className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group">
            <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
              {item.image_url ? <img src={item.image_url} alt={`${item.title} logo`} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs">No Image</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{item.title}</p>
              <p className="text-sm text-gray-600 truncate">{item.artist}{item.genre && ` | ${item.genre}`}</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

