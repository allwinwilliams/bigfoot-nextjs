"use client";

import React, { createContext, useState } from 'react';

export const AiCustomiseContext = createContext();

export const AiCustomiseProvider = ({ children }) => {
  // const [imageData, setImageData] = useState(null);
  // const [prompt, setPrompt] = useState('');
  const [details, setDetails, style] = useState({prompt: '', imageData: '', style: ''});

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
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
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
    <AiCustomiseContext.Provider value={{ details, generateImage, prompt: details.prompt }}>
      {children}
    </AiCustomiseContext.Provider>
  );
};
