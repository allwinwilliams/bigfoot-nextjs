"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, TextField, Typography, Paper,
  List, ListItem, ListItemText,
} from '@mui/material';
import { CustomiseAppContext } from '../context/CustomiseProvider';
import { fetchAllSongData } from '../utils/spotifyUtils';

const SpotifySearch = ({ color, size, sketchType }) => {
  const { accessToken, songData, changeSongId, changeSongData } = useContext(CustomiseAppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [songId, setSongId] = useState(searchParams.get('songId') || '44JnQ7TIl4ieCbCQiEPQag');
  const [analysisData, setAnalysisData] = useState(null);
  const [featuresData, setFeaturesData] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (songId && accessToken) {
        const { trackData, analysisData, featuresData } = await fetchAllSongData(songId, accessToken);
        changeSongData(trackData);
        setAnalysisData(analysisData);
        setFeaturesData(featuresData);
      }
    };

    fetchAllData();
  }, [songId, accessToken]);

  const searchTracks = async (query) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    setSearchResults(data.tracks.items);
  };

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      searchTracks(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectSong = (song) => {
    setSongId(song.id);
    changeSongId(song.id);
    fetchAllSongData(song.id);
    setSearchResults([]);
    setInputValue(song.name);
    router.push(`/product/tshirt/song?color=${color}&size=${size}&songId=${song.id}&style=${sketchType}`);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        label="Search for a Song"
        variant="outlined"
        value={inputValue}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '16px',
          }
        }}
      />
      {searchResults.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            width: '100%',
            maxHeight: 200,
            overflow: 'auto',
            zIndex: 10,
            mt: 1,
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
          }}
        >
          <List>
            {searchResults.map((song) => (
              <ListItem button key={song.id} onClick={() => handleSelectSong(song)}>
                <img
                  src={song.album.images[0].url}
                  alt={song.name}
                  style={{ width: '40px', height: '40px', borderRadius: '8px', marginRight: '16px' }}
                />
                <ListItemText primary={song.name} secondary={song.artists.map(artist => artist.name).join(', ')} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {songData && (
        <Box
          sx={{
            mb: 2,
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            backgroundColor: '#fffff',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={songData.album.images[0].url}
            alt={songData.name}
            style={{ width: '60px', height: '60px', borderRadius: '8px', marginRight: '16px' }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
              {songData.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ overflow: 'hidden', color: '#777777', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
              By {songData.artists.map((artist) => artist.name).join(', ')}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SpotifySearch;