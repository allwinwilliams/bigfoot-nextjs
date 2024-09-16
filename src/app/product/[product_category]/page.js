"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { SongCustomiseProvider } from '../../../context/SongCustomiseProvider';
import { AiCustomiseProvider } from '../../../context/AiCustomiseProvider';
import { DictionaryContextProvider } from '../../../context/DictionaryContextProvider';

const SongProductPage = dynamic(() => import('../../../components/SongTshirt/SongProductPage'), { ssr: false });
const AIProductPage = dynamic(() => import('../../../components/AITshirt/AIProductPage'), { ssr: false });
const RestrictedAIProductPage = dynamic(() => import('../../../components/AITshirt/RestrictedAIProductPage'), { ssr: false });
const BasicProductPage = dynamic(() => import('../../../components/BasicTshirt/BasicTshirtPage'), { ssr: false });
const EmojiProductPage = dynamic(() => import('../../../components/EmojiTshirt/EmojiTshirtPage'), { ssr: false });
const TextProductPage = dynamic(() => import('../../../components/TextTshirt/TextTshirtPage'), { ssr: false });
const DictionaryProductPage = dynamic(() => import('../../../components/DictionaryTshirt/DictionaryTshirtPage'), { ssr: false });


export default function ProductType() {
  const { product_category } = useParams();

  let ComponentToRender;
  if (product_category === 'song-tshirt') {
    ComponentToRender = (
      <SongCustomiseProvider>
        <SongProductPage />
      </SongCustomiseProvider>
    );
  } else if (product_category === 'ai-tshirt') {
    ComponentToRender = (
      <AiCustomiseProvider>
        <AIProductPage />
      </AiCustomiseProvider>
    );
  } else if (product_category === 'prompt-generated-tshirt') {
    ComponentToRender = (
      <AiCustomiseProvider>
        <RestrictedAIProductPage />
      </AiCustomiseProvider>
    );
  } else if (product_category === 'basic-tshirt') {
    ComponentToRender = (
        <BasicProductPage />
    );
  } else if (product_category === 'emoji-tshirt') {
    ComponentToRender = (
        <EmojiProductPage />
    );
  } else if (product_category === 'text-tshirt') {
    ComponentToRender = (
        <TextProductPage />
    );
  } else if (product_category === 'dictionary-tshirt') {
    ComponentToRender = (
      <DictionaryContextProvider>
        <DictionaryProductPage />
      </DictionaryContextProvider>
    );
  }
   else {
    return <div>Invalid product category</div>; // Fallback for invalid product categories
  }

  return (
    <Suspense fallback={<div>Something doesn't seem right</div>}>
      {ComponentToRender}
    </Suspense>
  );
}
