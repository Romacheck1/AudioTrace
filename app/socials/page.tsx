import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Socials',
  description: 'Connect with SoundTrace on social media.',
};

export default function Socials() {
  const socialLinks = [
    {
      platform: 'Twitter',
      handle: '@SoundTrace',
      description: 'Follow us for updates and audio content recommendations',
      color: 'bg-blue-400'
    },
    {
      platform: 'Instagram',
      handle: '@soundtrace',
      description: 'Visual content and behind-the-scenes updates',
      color: 'bg-pink-400'
    },
    {
      platform: 'YouTube',
      handle: 'SoundTrace Channel',
      description: 'Video content and tutorials',
      color: 'bg-red-500'
    },
    {
      platform: 'Discord',
      handle: 'SoundTrace Community',
      description: 'Join our community for discussions and support',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8 mb-8">
        <div className="bg-white border border-black rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Connect With Us</h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Follow SoundTrace on social media to stay updated with the latest features, content recommendations, 
            and community discussions.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            {socialLinks.map((social, index) => (
              <div 
                key={index}
                className={`${social.color} border border-black rounded-lg p-6 text-white`}
              >
                <h2 className="text-2xl font-bold mb-2">{social.platform}</h2>
                <p className="text-lg mb-2 font-semibold">{social.handle}</p>
                <p className="text-sm opacity-90">{social.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Social media links are coming soon. Check back for updates!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

