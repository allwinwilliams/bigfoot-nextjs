"use client";

import React, { createContext, useState } from 'react';

export const AiCustomiseContext = createContext();

export const AiCustomiseProvider = ({ children }) => {
  // const [imageData, setImageData] = useState(null);
  // const [prompt, setPrompt] = useState('');
  const [details, setDetails] = useState({prompt: '', imageData: ''});

  const generateImage = async (prompt) => {
    setDetails({prompt: prompt, imageData: ''});
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
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
        setDetails({prompt: prompt, imageData: data.data[0].url});
      } else {
        console.error("Failed to generate image", data);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // const changePrompt = (newPrompt) => {
  //   setPrompt(newPrompt);
  // };

  return (
    <AiCustomiseContext.Provider value={{ details, generateImage, details }}>
      {children}
    </AiCustomiseContext.Provider>
  );
};
