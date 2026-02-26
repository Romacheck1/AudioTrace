import Header from '@/components/Header';
import Breadcrumb from '@/components/info/Breadcrumb';
import ActionButtons from '@/components/info/ActionButtons';
import RadioMainSection from '@/components/info/RadioMainSection';
import RadioInformationSection from '@/components/info/RadioInformationSection';
import RelatedRadio from '@/components/info/RelatedRadio';

interface RadioPageProps {
  params: Promise<{ id: string }>;
}

export default async function RadioPage({ params }: RadioPageProps) {
  const { id } = await params;
  
  if (!pool) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Database connection unavailable</p>
        </div>
      </div>
    );
  }

  const result = await pool.query('SELECT * FROM radio WHERE id = $1', [id]);
  const radio = result.rows[0];

  if (!radio) {
    return (
      <div className="px-10">
        <Header />
        <div className="w-[1200px] mx-auto mt-16">
          <p className="text-gray-600">Radio station not found</p>
        </div>
      </div>
    );
  }

  const relatedResult = await pool.query('SELECT * FROM radio WHERE genre = $1 AND id != $2 LIMIT 3', [radio.genre, id]);
  const relatedRadio = relatedResult.rows;

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

