"use client";

import React, { createContext, useState, useEffect } from 'react';

export const CustomiseAppContext = createContext();

export const SongCustomiseProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [songId, setSongId] = useState('');
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const CLIENT_ID = "369a2f566ad84700a32d5b3aa06333b6";
    const CLIENT_SECRET = "07542d7e749745a8a5cfea0a6202a3df";
    
    if (!accessToken) {
      const authParameters = new URLSearchParams();
      authParameters.append('grant_type', 'client_credentials');
      authParameters.append('client_id', CLIENT_ID);
      authParameters.append('client_secret', CLIENT_SECRET);

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: authParameters.toString(),
      })
      .then(result => result.json())
      .then(data => {
        if (data.access_token) {
          setAccessToken(data.access_token);
        } else {
          console.error("Failed to obtain access token", data);
        }
      })
      .catch(error => console.error("Error fetching access token:", error));
    }
  }, [accessToken]);

  const changeSongId = (newSongId) => setSongId(newSongId);
  const changeSongData = (data) => setSongData(data);

  return (
    <CustomiseAppContext.Provider value={{
      accessToken,
      songId,
      songData,
      changeSongId,
      changeSongData,
      setAccessToken
    }}>
      {children}
    </CustomiseAppContext.Provider>
  );
};

