// src/utils/spotifyUtils.js

export const fetchSongData = async (id, accessToken) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` },
  };

  try {
    const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${id}`, requestOptions);
    const trackData = await trackResponse.json();

    const analysisResponse = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, requestOptions);
    const analysisData = await analysisResponse.json();

    const featuresResponse = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, requestOptions);
    const featuresData = await featuresResponse.json();

    if (analysisData.error || featuresData.error) {
      throw new Error('Failed to fetch analysis or features data');
    }

    return {
      trackData,
      analysisData,
      featuresData,
    };
  } catch (error) {
    console.error('Error fetching song data:', error);
    return {
      trackData: null,
      analysisData: null,
      featuresData: null,
    };
  }
};
