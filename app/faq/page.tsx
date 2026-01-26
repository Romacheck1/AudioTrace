import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'F.A.Q',
  description: 'Frequently asked questions about SoundTrace.',
};

export default function FAQ() {
  const faqs = [
    {
      question: 'What is SoundTrace?',
      answer: 'SoundTrace is a web service that helps you discover, track, and organize all your audio content including songs, podcasts, audiobooks, movies, streams, YouTube videos, news, radio, and interviews in one place.'
    },
    {
      question: 'How do I search for content?',
      answer: 'Use the search bar on the home page to search across all content types. You can search by title, artist, or other relevant keywords.'
    },
    {
      question: 'Can I track my favorite content?',
      answer: 'Yes! Click on any item to view detailed information. You can browse through different categories and explore related content.'
    },
    {
      question: 'What content types are supported?',
      answer: 'SoundTrace supports nine content types: Songs, Podcasts, Audiobooks, Movies, Streams, YouTube, News, Radio, and Interviews.'
    },
    {
      question: 'Is SoundTrace free to use?',
      answer: 'Yes, SoundTrace is free to use. You can browse and search all content without any cost.'
    },
    {
      question: 'How do I navigate between different content types?',
      answer: 'Use the category cards on the home page. Click on any card to select it, and then click on individual items to view details.'
    }
  ];

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8 mb-8">
        <div className="bg-white border border-black rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 pb-4 last:border-b-0">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">{faq.question}</h2>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

