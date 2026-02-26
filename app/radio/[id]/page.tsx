import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import RadioMainSection from '@/components/info/RadioMainSection';
import RadioInformationSection from '@/components/info/RadioInformationSection';
import RelatedRadio from '@/components/info/RelatedRadio';
import { getPlaceholderItem, getPlaceholderRelated } from '@/lib/db';

interface RadioPageProps {
  params: Promise<{ id: string }>;
}

export default async function RadioPage({ params }: RadioPageProps) {
  const { id } = await params;
  
  // Use placeholder data
  const radio = getPlaceholderItem('Radio', id);
  const relatedRadio = getPlaceholderRelated('Radio', radio.genre || 'Sample Genre', parseInt(id), 3);

  return (
    <div className="px-10">
      <Header />
      <div className="w-[1200px] mx-auto mt-8">
        <Breadcrumb category="Radio" title={radio.title} />
        <RadioMainSection radio={radio} />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <ActionButtons />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <RadioInformationSection radio={radio} />
        <div className="border-t border-gray-300 my-6 opacity-30"></div>
        <RelatedRadio radio={relatedRadio} />
      </div>
    </div>
  );
}

