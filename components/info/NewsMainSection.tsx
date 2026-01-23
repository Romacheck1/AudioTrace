interface News {
  id: number;
  title: string;
  artist: string;
  image_url: string | null;
  popularity: number | null;
  duration_ms: number | null;
  genre: string | null;
}

interface NewsMainSectionProps {
  news: News;
}

export default function NewsMainSection({ news }: NewsMainSectionProps) {
  const formatDuration = (ms: number | null) => {
    if (!ms) return 'N/A';
    const minutes = Math.floor(ms / 60000);
    return `${minutes} min`;
  };

  const starRating = 4.5;
  const reviewCount = '12k';

  return (
    <div className="flex gap-8 mb-8 flex-col lg:flex-row items-start lg:items-end">
      <div className="w-full lg:w-64 h-64 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
        {news.image_url ? (
          <img src={news.image_url} alt={`${news.title} logo`} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-gray-500 text-sm">No Image</span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between lg:h-64">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">{news.title}</h1>
          <p className="text-4xl text-red-700 mb-3">{news.artist}</p>
        </div>
        <div className="border-t border-gray-300 my-4 opacity-30"></div>
        <div>
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-base text-gray-600 mb-2">
            <span>Duration: {formatDuration(news.duration_ms)}</span>
            {news.genre && <span>Category: {news.genre}</span>}
            <span className="text-blue-600 font-semibold">📰 News</span>
          </div>
          <div className="flex items-center gap-2 text-base text-gray-600">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill={star <= Math.floor(starRating) ? "currentColor" : star === Math.ceil(starRating) && starRating % 1 !== 0 ? "currentColor" : "none"} viewBox="0 0 24 24" style={star === Math.ceil(starRating) && starRating % 1 !== 0 ? { clipPath: 'inset(0 50% 0 0)' } : {}}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span>{starRating}</span>
            <span>({reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

