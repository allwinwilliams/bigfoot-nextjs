// src/utils/spotifyUtils.js
export const fetchAllSongData = async (songId, accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const retryFetch = async (url, options, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      const response = await fetch(url, options);
      if (response.status === 429 && i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        return response;
      }
    }
    throw new Error('Max retries reached');
  };

  try {
    const trackDataResponse = await retryFetch(`https://api.spotify.com/v1/tracks/${songId}`, { headers });
    const analysisDataResponse = await retryFetch(`https://api.spotify.com/v1/audio-analysis/${songId}`, { headers });
    const featuresDataResponse = await retryFetch(`https://api.spotify.com/v1/audio-features/${songId}`, { headers });

    if (!trackDataResponse.ok || !analysisDataResponse.ok || !featuresDataResponse.ok) {
      throw new Error('Failed to fetch analysis or features data');
    }

    const trackData = await trackDataResponse.json();
    const analysisData = await analysisDataResponse.json();
    const featuresData = await featuresDataResponse.json();

    return { trackData, analysisData, featuresData };
  } catch (error) {
    console.error('Error fetching song data:', error);
    throw error;
  }
};
