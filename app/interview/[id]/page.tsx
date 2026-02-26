import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import InterviewMainSection from '@/components/info/InterviewMainSection';
import InterviewInformationSection from '@/components/info/InterviewInformationSection';
import RelatedInterviews from '@/components/info/RelatedInterviews';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface InterviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function InterviewPage({ params }: InterviewPageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const interview = getPlaceholderItem('Interview', id);
  const relatedInterviews = getPlaceholderRelated('Interview', interview.genre || 'Sample Genre', parseInt(id), 3);

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8">
        <Breadcrumb category="Interviews" title={interview.title} />
        <InterviewMainSection interview={interview} />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <ActionButtons />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <InterviewInformationSection interview={interview} />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <RelatedInterviews interviews={relatedInterviews} />
      </div>
    </div>
  );
}

