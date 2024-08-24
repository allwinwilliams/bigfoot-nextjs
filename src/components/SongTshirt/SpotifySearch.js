"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, TextField, Typography, Paper,
  List, ListItem, ListItemText, CircularProgress,
  InputAdornment,
  Chip
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import { CustomiseAppContext } from '../../context/SongCustomiseProvider';
import { fetchAllSongData } from '../../utils/spotifyUtils';

const SpotifySearch = ({ color, size, style, songLoading, setSongLoading }) => {
  const { accessToken, songData, changeSongId, changeSongData } = useContext(CustomiseAppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [songId, setSongId] = useState(searchParams.get('songId') || '5ChkMS8OtdzJeqyybCc9R5');

  useEffect(() => {
    const fetchAllData = async () => {
      if (songId && accessToken) {
        try {
          const { trackData, analysisData, featuresData } = await fetchAllSongData(songId, accessToken);
          changeSongData({details: trackData, analysis: analysisData, features: featuresData});
        } catch (error) {
          console.error('Error fetching song data:', error);
        } finally {
          setSongLoading(false); // Reset loading state after data is fetched
        }
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
    setSearchResults([]);
    setInputValue(song.name);
    setSongLoading(true); // Set loading state to true when a new song is selected
    // router.replace(`/product/tshirt/song?color=${color}&size=${size}&songId=${song.id}&style=${style}`);
    window.history.replaceState(null, '', `/product/songtshirt?color=${color}&size=${size}&songId=${song.id}&style=${style}`);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        placeholder="Search your song.."
        variant="outlined"
        value={inputValue}
        onChange={handleSearchChange}
        fullWidth
        sx={{
            // mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px 8px 0 0',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '8px 8px 0 0',
            },
        }}
        InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <MusicNoteIcon color="primary" />
            </InputAdornment>
            ),
        }}
        />
      {searchResults.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            width: '100%',
            maxHeight: 240,
            overflow: 'auto',
            zIndex: 10,
            mt: 0,
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <List>
            {searchResults.map((song) => (
              <ListItem button key={song.id} onClick={() => handleSelectSong(song)}>
                {
                song.album.images && song.album.images.length > 0 
                && (
                  <img
                    src={song.album.images[0].url}
                    alt={song.name}
                    style={{ width: '40px', height: '40px', borderRadius: '8px', marginRight: '16px' }}
                  />
                )}
                <ListItemText primary={song.name} secondary={song.artists.map(artist => artist.name).join(', ')} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {songLoading ? (
        <Box
          sx={{
            mb: 2,
            // boxShadow: '0 0 8px rgba(0, 0, 0, 0.12)',
            borderRadius: '0 0 8px 8px',
            // border: '1px solid rgba(0, 0, 0, 0.12)',
            backgroundColor: '#F7F7F7',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '16px',
            }}
          >
            <CircularProgress size={24} />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              Loading song...
            </Typography>
          </Box>
        </Box>
      ) : (
        songData && (
          <Box
            sx={{
              mb: 2,
              // boxShadow: '0 0 8px rgba(0, 0, 0, 0.12)',
              borderRadius: '0 0 8px 8px',
              // border: '1px solid rgba(0, 0, 0, 0.12)',
              backgroundColor: '#F7F7F7',
              padding: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {
              songData.details.album.images && songData.details.album.images.length > 0 
              && (
                <img
                  src={songData.details.album.images[0].url}
                  alt={songData.details.name}
                  style={{ width: '48px', height: '48px', borderRadius: '8px', marginRight: '16px' }}
                />
            )}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Box sx={{display: 'flex'}}>
                <Typography
                  variant="heading6"
                  sx={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {songData.details.name}
                </Typography>
                <Chip 
                  label="Current Selection"
                  size="small"
                  color="secondary"
                  sx={{}}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  overflow: 'hidden',
                  color: '#777777',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                By {songData.details.artists.map((artist) => artist.name).join(', ')}
              </Typography>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default SpotifySearch;
