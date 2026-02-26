import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Future plans and upcoming features for SoundTrace.',
};

export default function Roadmap() {
  const roadmapItems = [
    {
      phase: 'Phase 1 - Current',
      status: 'completed',
      features: [
        'Nine content categories fully functional',
        'Database integration with PostgreSQL',
        'Search functionality',
        'Detailed info pages for all content types',
        'Admin panel for content management'
      ]
    },
    {
      phase: 'Phase 2 - Coming Soon',
      status: 'in-progress',
      features: [
        'User accounts and personal libraries',
        'Playlist creation and management',
        'Recommendation engine',
        'Social features and sharing',
        'Mobile app development'
      ]
    },
    {
      phase: 'Phase 3 - Future',
      status: 'planned',
      features: [
        'Advanced analytics and insights',
        'Integration with streaming services',
        'AI-powered content discovery',
        'Community features and forums',
        'API for third-party integrations'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'planned':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8 mb-8">
        <div className="bg-white border border-black rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Product Roadmap</h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Here's what we're working on and what's coming next for SoundTrace.
          </p>
          
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(item.status)}`}></div>
                  <h2 className="text-2xl font-semibold">{item.phase}</h2>
                  <span className="text-sm text-gray-500 capitalize">({item.status})</span>
                </div>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Roadmap items are subject to change based on user feedback and priorities. 
              Check back regularly for updates!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

