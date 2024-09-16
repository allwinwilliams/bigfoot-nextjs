
import React, { createContext, useState } from 'react';

export const DictionaryContext = createContext();

export const DictionaryContextProvider = ({ children }) => {
  const [definitionDetails, setDefinitionDetails] = useState(null);

  const getDefinition = async (word) => {
    try {
      const response = await fetch('/api/getDefinition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();

      if (response.ok && data.definition) {
        setDefinitionDetails(data.definition);
      } else {
        console.error('Failed to retrieve definition', data);
      }
    } catch (error) {
      console.error('Error fetching definition:', error);
    }
  };

  return (
    <DictionaryContext.Provider value={{ definitionDetails, getDefinition }}>
      {children}
    </DictionaryContext.Provider>
  );
};