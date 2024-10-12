"use client";

import React, { createContext, useState } from 'react';

export const AiCustomiseContext = createContext();

export const AiCustomiseProvider = ({ children }) => {

  const [details, setDetails] = useState({ prompt: '', imageData: '', style: '' });

  const generateRandomSeed = () => {
    return Math.floor(Math.random() * 100000);
  };

  const generateImage = async (prompt) => {
    setDetails({ prompt: prompt, imageData: '', style: '' });

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const seed = generateRandomSeed();

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `${prompt} (seed: ${seed})`,  // Include the random seed in the prompt to introduce randomness
          n: 1,
          size: "1024x1024",
          quality: "standard",
        }),
      });

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setDetails({ prompt: prompt, imageData: data.data[0].url, style: '' });  // Update state with new image
      } else {
        console.error("Failed to generate image", data);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <AiCustomiseContext.Provider value={{ details, generateImage, prompt: details.prompt }}>
      {children}
    </AiCustomiseContext.Provider>
  );
};
