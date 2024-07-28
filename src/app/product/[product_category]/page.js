"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';

const SongProductPage = dynamic(() => import('../../../components/SongTshirt/SongProductPage'), { ssr: false });
const AIProductPage = dynamic(() => import('../../../components/AITshirt/AIProductPage'), { ssr: false });

export default function ProductType() {
  const { product_category } = useParams();

  let ComponentToRender;
  if (product_category === 'songtshirt') {
    ComponentToRender = SongProductPage;
  } else if (product_category === 'ai-tshirt') {
    ComponentToRender = AIProductPage;
  } else {
    return <div>Invalid product category</div>; // Fallback for invalid product categories
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentToRender />
    </Suspense>
  );
}
