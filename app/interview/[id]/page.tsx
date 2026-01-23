import Header from '@/components/Header';
import pool from '@/lib/db';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import InterviewMainSection from '@/components/info/InterviewMainSection';
import InterviewInformationSection from '@/components/info/InterviewInformationSection';
import RelatedInterviews from '@/components/info/RelatedInterviews';

interface InterviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function InterviewPage({ params }: InterviewPageProps) {
  const { id } = await params;
  const result = await pool.query('SELECT * FROM interviews WHERE id = $1', [id]);
  const interview = result.rows[0];

  if (!interview) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Interview show not found</p>
        </div>
      </div>
    );
  }

  const relatedResult = await pool.query('SELECT * FROM interviews WHERE genre = $1 AND id != $2 LIMIT 3', [interview.genre, id]);
  const relatedInterviews = relatedResult.rows;

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

