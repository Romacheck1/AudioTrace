import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Updates',
  description: 'Latest updates and changelog for SoundTrace.',
};

export default function Updates() {
  const updates = [
    {
      version: '0.3',
      date: '2024',
      title: 'Major Content Expansion',
      changes: [
        'Added all nine content categories (Songs, Podcasts, Audiobooks, Movies, Streams, YouTube, News, Radio, Interviews)',
        'Implemented dedicated info pages for each content type',
        'Created admin panel for content management',
        'Added related content suggestions',
        'Improved search functionality'
      ]
    },
    {
      version: '0.2',
      date: '2024',
      title: 'Content Grid & Cards',
      changes: [
        'Introduced category cards with real data',
        'Added card selection and swapping functionality',
        'Implemented song information display',
        'Created search results page',
        'Added breadcrumb navigation'
      ]
    },
    {
      version: '0.1',
      date: '2024',
      title: 'Initial Release',
      changes: [
        'Basic Next.js application setup',
        'PostgreSQL database integration',
        'Initial UI design with retro-futuristic theme',
        'Header and Footer components',
        'Basic routing structure'
      ]
    }
  ];

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8 mb-8">
        <div className="bg-white border border-black rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Updates & Changelog</h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Stay informed about the latest changes, improvements, and new features in SoundTrace.
          </p>
          
          <div className="space-y-8">
            {updates.map((update, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6 last:pb-0">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-2xl font-semibold">Version {update.version}</h2>
                  <span className="text-gray-500">{update.date}</span>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">{update.title}</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  {update.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="text-gray-700">{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>Stay Updated:</strong> Check back regularly for the latest updates and improvements!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

