// src/components/ProductPage.js
"use client";

import React, { useContext, useState, useCallback } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { CustomiseAppContext } from '../context/CustomiseProvider';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

const ProductPage = () => {
  const { accessToken, songData, changeSongId, changeSongData } = useContext(CustomiseAppContext);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');

  const searchTracks = async (query) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    setSearchResults(data.tracks.items);
  };

  const fetchSongData = async (id) => {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    changeSongData(data);
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
    changeSongId(song.id);
    fetchSongData(song.id);
    setSearchResults([]);
    setInputValue(song.name);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customize Your T-Shirt
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ThreeScene color={selectedColor} songData={songData} />
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
          <RadioGroup value={selectedColor} onChange={handleColorChange}>
            <FormControlLabel value="black" control={<Radio />} label="Black" />
            <FormControlLabel value="beige" control={<Radio />} label="Beige" />
          </RadioGroup>
          <Typography variant="h5" gutterBottom>
            Select Size
          </Typography>
          <RadioGroup value={selectedSize} onChange={handleSizeChange}>
            <FormControlLabel value="S" control={<Radio />} label="S" />
            <FormControlLabel value="M" control={<Radio />} label="M" />
            <FormControlLabel value="L" control={<Radio />} label="L" />
            <FormControlLabel value="XL" control={<Radio />} label="XL" />
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
          <Button variant="contained" color="primary" fullWidth>
            Buy Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
