"use client";

import React, { createContext, useState } from 'react';

export const AiCustomiseContext = createContext();

export const AiCustomiseProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('sk-proj-tPmVS51mZzKujPLnLuBfT3BlbkFJkEYd6WwuXUsYlsMjJzos');
  const [imageData, setImageData] = useState(null);

  const generateImage = async (prompt) => {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1, // Number of images to generate
          size: "1024x1024" // Image size
        })
      });

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setImageData(data.data[0]);
      } else {
        console.error("Failed to generate image", data);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <AiCustomiseContext.Provider value={{ apiKey, imageData, generateImage }}>
      {children}
    </AiCustomiseContext.Provider>
  );
};
