// src/components/ProductPage.js
"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import 
  { 
    Box, TextField, Button, Typography,
    List, ListItem, ListItemText, Grid,
    RadioGroup, FormControlLabel, Radio,
    Tooltip, Chip, CircularProgress 
  }
  from '@mui/material';
import { CustomiseAppContext } from '../context/CustomiseProvider';
import ThreeScene from './ThreeScene';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { fetchAllSongData } from '../utils/spotifyUtils'; // Import the utility function
import { db, storage } from '../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const ProductPage = () => {
  const { accessToken, songData, changeSongId, changeSongData } = useContext(CustomiseAppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [songId, setSongId] = useState(searchParams.get('songId') || '44JnQ7TIl4ieCbCQiEPQag');
  const [sketchType, setSketchType] = useState(searchParams.get('style') || 'type2');
  const [tooltipOpen, setTooltipOpen] = useState(false);
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

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      songId: '44JnQ7TIl4ieCbCQiEPQag',
      style: 'type2',
    };

    // Check if the URL params are set, if not, update the URL
    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('songId') || !searchParams.get('style')) {
      router.push(`/product/tshirt/song?color=${color || defaultParams.color}&size=${size || defaultParams.size}&songId=${songId || defaultParams.songId}&style=${sketchType || defaultParams.style}`);
    }
  }, [searchParams, color, size, songId, sketchType, router]);

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

  const handleColorChange = (event) => {
    setColor(event.target.value);
    router.push(`/product/tshirt/song?color=${event.target.value}&size=${size}&songId=${songId}&style=${sketchType}`);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    router.push(`/product/tshirt/song?color=${color}&size=${event.target.value}&songId=${songId}&style=${sketchType}`);
  };

  const handleSketchTypeChange = (event) => {
    setSketchType(event.target.value);
    router.push(`/product/tshirt/song?color=${color}&size=${size}&songId=${songId}&style=${event.target.value}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setTooltipOpen(true);
    setTimeout(() => setTooltipOpen(false), 2000);
  };

  const handleBuyNow = async () => {
    setBuyNowLoading(true);
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas.toDataURL('image/png');
      
      const storageRef = ref(storage, `orders/${songId}-${Date.now()}.png`);
      await uploadString(storageRef, canvasDataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);
      
      const dataToStore = {
        color,
        size,
        songId,
        songName: songData?.name || '',
        style: sketchType,
        imageUrl,
        timestamp: new Date().toISOString(),
      };
      
      const docRef = await addDoc(collection(db, 'orders'), dataToStore);
      const docId = docRef.id;
      
      window.location.href = `https://b5a634-d3.myshopify.com/cart/45690572636416:1?channel=buy_button&note=${docId}`;
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setBuyNowLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Box sx={{ paddingY: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Song Data Generated Art T-shirt - Oversized Fit
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is a customizable t-shirt with a design generated from a Spotify song. Choose your favorite song and see the magic!
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          borderRadius: '16px',
          backgroundColor: '#fffff',
          padding: 3,
        }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <ThreeScene
              color={color}
              songData={songData}
              sketchType={sketchType}
              analysisData={analysisData}
              featuresData={featuresData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Customise with Your Song
              </Typography>
              

              {/* <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Price
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  ₹3,299
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ textDecoration: 'line-through', fontSize: '1rem', marginLeft: '8px', verticalAlign: 'middle' }}
                  >
                    ₹4,199
                  </Typography>
                </Typography>
              </Box> */}
            
              {/* <Typography variant="h6" gutterBottom>
                Search Your Song
              </Typography> */}
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
                <List sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
                  {searchResults.map((song) => (
                    <ListItem button key={song.id} onClick={() => handleSelectSong(song)}>
                      <ListItemText primary={song.name} secondary={song.artists.map(artist => artist.name).join(', ')} />
                    </ListItem>
                  ))}
                </List>
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
              
              <Typography variant="h6" gutterBottom>
                Color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {['black', 'beige'].map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    clickable
                    color={color === option ? 'primary' : 'default'}
                    variant={color === option ? 'filled' : 'outlined'}
                    onClick={() => handleColorChange({ target: { value: option } })}
                    sx={{
                      padding: '24px 24px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      width: '120px',
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </Box>
              <Typography variant="h6" gutterBottom>
                Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {['S', 'M', 'L', 'XL'].map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    clickable
                    color={size === option ? 'primary' : 'default'}
                    variant={size === option ? 'filled' : 'outlined'}
                    onClick={() => handleSizeChange({ target: { value: option } })}
                    sx={{
                      padding: '24px 24px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      width: '120px',
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mb: 2,
                  padding: '16px',
                  fontWeight: 'bold',
                  borderRadius: '16px'
                }}
                onClick={handleBuyNow}
                disabled={buyNowLoading}
              >
                {buyNowLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Buy Now @ ₹3,299'}
              </Button>
              <Tooltip title="URL copied" open={tooltipOpen} arrow>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{
                    padding: '16px',
                    fontWeight: 'bold',
                    borderRadius: '16px'
                  }}
                  onClick={handleShare}
                >
                  Share Now
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        marginTop={4}
        sx={{
          borderRadius: '16px',
          backgroundColor: '#eeeeee',
          padding: 3,
        }}
      >
        <Typography>This is a section</Typography>
      </Box>
      <Box
        marginTop={4}
        sx={{
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          borderRadius: '16px',
          backgroundColor: '#fffff',
          padding: 3,
        }}
      >
        <Typography>This is another section</Typography>
      </Box>
      <Box
        marginTop={4}
        sx={{
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          borderRadius: '16px',
          padding: 3,
          textAlign: 'center',
          color: 'white', // Ensure text is visible on gradient
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(331deg, #00937e, #7500cb)',
          backgroundSize: '400% 400%',
          animation: 'GradientAnimation 6s ease infinite',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Why Choose BigFoot?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Well there are so many reason but here are a few
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="/song-tshirt/compare.png"
            alt="Example"
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              height: 'auto', 
              borderRadius: '8px', 
              marginTop: '16px' 
            }}
          />
        </Box>
        <style jsx global>{`
          @keyframes GradientAnimation {
            0% {
              background-position: 43% 0%;
            }
            50% {
              background-position: 58% 100%;
            }
            100% {
              background-position: 43% 0%;
            }
          }
        `}</style>
      </Box>
    </Box>
  );
};

export default ProductPage;
