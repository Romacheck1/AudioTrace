'use client';

import { useRouter } from 'next/navigation';

interface BreadcrumbProps {
  category: string;
  title: string;
}

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
  const router = useRouter();

  return (
    <nav className="mb-5">
      <span className="text-base text-gray-600">
        <button
          onClick={() => router.push('/')}
          className="hover:text-blue-400 transition-colors cursor-pointer"
        >
          {category}
        </button>
        {' / '}
        <span className="font-semibold text-blue-400">{title}</span>
      </span>
    </nav>
  );
}

