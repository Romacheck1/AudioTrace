import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about SoundTrace and our mission to help you track all your audio content.',
};

export default function About() {
  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8 mb-8">
        <div className="bg-white border border-black rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">About SoundTrace</h1>
          
          <div className="space-y-6 text-gray-800">
            <p className="text-lg">
              SoundTrace is a comprehensive web service designed to help you discover, track, and organize 
              all your audio content in one convenient place.
            </p>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p>
                We believe that great audio content deserves to be easily discoverable and trackable. 
                Whether you're into music, podcasts, audiobooks, movies, streams, YouTube videos, news, 
                radio, or interviews, SoundTrace provides a unified platform to manage it all.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Track songs, podcasts, audiobooks, and more</li>
                <li>Discover new content across multiple categories</li>
                <li>Organize your favorite audio content</li>
                <li>Access detailed information about each item</li>
                <li>Search across all content types</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">Built With</h2>
              <p>
                SoundTrace is built using Next.js, React, TypeScript, and PostgreSQL, ensuring a fast, 
                reliable, and modern user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

