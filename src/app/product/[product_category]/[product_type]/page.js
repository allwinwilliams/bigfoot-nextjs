import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ProductPage = dynamic(() => import('../../../../components/ProductPage'), { ssr: false });

export default function ProductType() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPage />
    </Suspense>
  );
}
