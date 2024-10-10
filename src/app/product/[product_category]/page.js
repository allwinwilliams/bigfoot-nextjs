"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SongCustomiseProvider } from '../../../context/SongCustomiseProvider';
import { AiCustomiseProvider } from '../../../context/AiCustomiseProvider';
import { DictionaryContextProvider } from '../../../context/DictionaryContextProvider';
import { JapaneseContextProvider } from '../../../context/JapaneseContextProvider';
import { LanguageContextProvider } from '../../../context/LanguageContextProvider';
import Loader from '../../../components/UIComponents/Loader';

// Dynamic imports for each product page
const SongProductPage = dynamic(() => import('../../../components/SongTshirt/SongProductPage'), { ssr: false });
const NewSongProductPage = dynamic(() => import('../../../components/SongTshirt/SongNewUI'), { ssr: false });
const AIProductPage = dynamic(() => import('../../../components/AITshirt/AIProductPage'), { ssr: false });
const RestrictedAIProductPage = dynamic(() => import('../../../components/AITshirt/RestrictedAIProductPage'), { ssr: false });
const BasicProductPage = dynamic(() => import('../../../components/BasicTshirt/BasicTshirtPage'), { ssr: false });
const EmojiProductPage = dynamic(() => import('../../../components/EmojiTshirt/EmojiTshirtPage'), { ssr: false });
const TextProductPage = dynamic(() => import('../../../components/TextTshirt/TextTshirtPage'), { ssr: false });
const DictionaryProductPage = dynamic(() => import('../../../components/DictionaryTshirt/DictionaryTshirtPage'), { ssr: false });
const JapaneseProductPage = dynamic(() => import('../../../components/JapaneseTshirt/JapaneseTshirtPage'), { ssr: false });
const WoxsenTshirtPage = dynamic(() => import('../../../components/WoxsenTshirt/WoxsenTshirtPage'), { ssr: false });
const ImageTshirtPage = dynamic(() => import('../../../components/ImageTshirt/ImageTshirtPage'), { ssr: false });
const LanguagesTshirtPage = dynamic(() => import('../../../components/LanguagesTshirt/LanguagesTshirtPage'), { ssr: false });

export default function ProductType() {
  const { product_category } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  let ComponentToRender;
  if (product_category === 'song-tshirt') {
    ComponentToRender = (
      <SongCustomiseProvider>
        <SongProductPage />
      </SongCustomiseProvider>
    );
  } else if (product_category === 'new-ui') {
    ComponentToRender = (
      <SongCustomiseProvider>
        <NewSongProductPage />
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
    ComponentToRender = <BasicProductPage />;
  } else if (product_category === 'emoji-tshirt') {
    ComponentToRender = <EmojiProductPage />;
  } else if (product_category === 'text-tshirt') {
    ComponentToRender = <TextProductPage />;
  } else if (product_category === 'dictionary-tshirt') {
    ComponentToRender = (
      <DictionaryContextProvider>
        <DictionaryProductPage />
      </DictionaryContextProvider>
    );
  } else if (product_category === 'japanese-tshirt') {
    ComponentToRender = (
      <JapaneseContextProvider>
        <JapaneseProductPage />
      </JapaneseContextProvider>
    );
  }  else if (product_category === 'language-tshirt') {
      ComponentToRender = (
        <LanguageContextProvider>
          <LanguagesTshirtPage />
        </LanguageContextProvider>
      );
    }
   else if (product_category === 'woxsen-tshirt') {
    ComponentToRender = <WoxsenTshirtPage />;
  } else if (product_category === 'image-tshirt') {
    ComponentToRender = <ImageTshirtPage />;
  } else {
    return <div>Invalid product category</div>; // Fallback for invalid product categories
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        ComponentToRender
      )}
    </>
  );
}
