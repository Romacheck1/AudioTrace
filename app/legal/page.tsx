import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Legal information and terms of service for SoundTrace.',
};

export default function Legal() {
  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8 mb-8">
        <div className="bg-white border border-black rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Legal Information</h1>
          
          <div className="space-y-8 text-gray-800">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Terms of Service</h2>
              <p className="mb-2">
                By using SoundTrace, you agree to these terms of service. SoundTrace is provided "as is" 
                without any warranties, express or implied.
              </p>
              <p className="mb-2">
                You agree not to misuse the service or attempt to gain unauthorized access to any part of 
                the platform. We reserve the right to modify or discontinue the service at any time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Privacy Policy</h2>
              <p className="mb-2">
                SoundTrace respects your privacy. We collect minimal data necessary to provide our services. 
                We do not sell your personal information to third parties.
              </p>
              <p className="mb-2">
                Any data collected is used solely to improve the user experience and provide content 
                recommendations. You can request deletion of your data at any time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Content Disclaimer</h2>
              <p className="mb-2">
                SoundTrace aggregates information about audio content from various sources. We do not host 
                or distribute copyrighted content. All content metadata is provided for informational purposes only.
              </p>
              <p className="mb-2">
                If you believe any content infringes on your rights, please contact us immediately.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact</h2>
              <p>
                For legal inquiries, please contact us through our support channels. We aim to respond to 
                all legal inquiries within 48 hours.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

