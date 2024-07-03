// src/components/ProductPage.js
"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Grid, RadioGroup, FormControlLabel, Radio, Tooltip } from '@mui/material';
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
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas.toDataURL('image/png');

      // Create a storage reference
      const storageRef = ref(storage, `orders/${songId}-${Date.now()}.png`);

      // Upload the canvas image as a base64 string
      await uploadString(storageRef, canvasDataUrl, 'data_url');

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Prepare the data to store in Firestore
      const dataToStore = {
        color,
        size,
        songId,
        songName: songData?.name || '',
        style: sketchType,
        imageUrl,
        timestamp: new Date().toISOString(),
      };

      // Add the data to Firestore
      await addDoc(collection(db, 'orders'), dataToStore);

      // Redirect to Shopify checkout link
      window.location.href = 'https://b5a634-d3.myshopify.com/cart/45690572636416:1?channel=buy_button';
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + error.message);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customize Your T-Shirt
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ThreeScene color={color} songData={songData} sketchType={sketchType} analysisData={analysisData} featuresData={featuresData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Product Title
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is a customizable t-shirt with a design generated from a Spotify song. Choose your favorite song and see the magic!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ₹999
          </Typography>
          <Typography variant="h5" gutterBottom>
            Select Color
          </Typography>
          <RadioGroup value={color} onChange={handleColorChange}>
            <FormControlLabel value="black" control={<Radio />} label="Black" />
            <FormControlLabel value="beige" control={<Radio />} label="Beige" />
          </RadioGroup>
          <Typography variant="h5" gutterBottom>
            Select Size
          </Typography>
          <RadioGroup value={size} onChange={handleSizeChange}>
            <FormControlLabel value="S" control={<Radio />} label="S" />
            <FormControlLabel value="M" control={<Radio />} label="M" />
            <FormControlLabel value="L" control={<Radio />} label="L" />
            <FormControlLabel value="XL" control={<Radio />} label="XL" />
          </RadioGroup>
          <Typography variant="h5" gutterBottom>
            Select Sketch Style
          </Typography>
          <RadioGroup value={sketchType} onChange={handleSketchTypeChange}>
            <FormControlLabel value="type1" control={<Radio />} label="Style 1" />
            <FormControlLabel value="type2" control={<Radio />} label="Style 2" />
            <FormControlLabel value="type3" control={<Radio />} label="Style 3" />
          </RadioGroup>
          <Typography variant="h5" gutterBottom>
            Search for a Spotify Song
          </Typography>
          <TextField
            label="Search for a Song"
            variant="outlined"
            value={inputValue}
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 2 }}
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
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Selected Song:</Typography>
              <Typography variant="subtitle1">Name: {songData.name}</Typography>
              <Typography variant="subtitle1">Artist: {songData.artists.map(artist => artist.name).join(', ')}</Typography>
            </Box>
          )}
          <Button variant="contained" color="primary" fullWidth size="large" sx={{ mb: 2 }} onClick={handleBuyNow}>
            Buy Now
          </Button>
          <Tooltip title="URL copied" open={tooltipOpen} arrow>
            <Button variant="outlined" color="secondary" fullWidth size="large" onClick={handleShare}>
              Share Now
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
