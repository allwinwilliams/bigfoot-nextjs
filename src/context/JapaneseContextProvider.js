import React, { createContext, useState } from 'react';

export const JapaneseContext = createContext();

export const JapaneseContextProvider = ({ children }) => {
  const [translationDetails, setTranslationDetails] = useState(null);

  const getTranslation = async (word) => {
    try {
      const response = await fetch('/api/getTranslation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
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
    <JapaneseContext.Provider value={{ translationDetails, getTranslation }}>
      {children}
    </JapaneseContext.Provider>
  );
};
