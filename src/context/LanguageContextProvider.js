import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [translationDetails, setTranslationDetails] = useState(null);

  const getTranslation = async (word, language) => {
    try {
      const response = await fetch('/api/getGenericTranslation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, language }),
      });

      const data = await response.json();

      if (response.ok && data.translation) {
        setTranslationDetails(data.translation);
      } else {
        console.error('Failed to retrieve translation', data);
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ translationDetails, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};
