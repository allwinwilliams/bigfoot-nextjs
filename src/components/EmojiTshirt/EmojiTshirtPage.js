"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, CircularProgress, Link,
  useTheme, Tabs, Tab, TextField
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/RefreshOutlined';
import ThreeScene from '../ThreeScene';

import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import SizeChart from '../SizeChart';

import BuyNowButton from '../BuyNowButton';

import Razorpay from 'razorpay';

const EmojiTshirtPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0); // State variable to trigger re-render

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [style, setStyle] = useState(searchParams.get('style') || 'tiny');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [textInput, setTextInput] = useState('');

  const [tabValue, setTabValue] = useState(0);

  const initialLoad = useRef(true);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://emoji-api.com/emojis?access_key=9484793b8a1df1aab3b8cf10b2b7becc8236adfe');
        const data = await response.json();
        setEmojis(data);
        setFilteredEmojis(data);
      } catch (error) {
        console.error('Failed to fetch emojis:', error);
      }
    };

    fetchEmojis();
  }, []);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      style: 'tiny',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('style')) {
      router.push(`/product/emoji-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&style=${style || defaultParams.style}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setSize(searchParams.get('size') || defaultParams.size);
      setStyle(searchParams.get('style') || defaultParams.style);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  useEffect(() => {
    const filtered = emojis.filter(emoji => emoji.unicodeName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredEmojis(filtered);
  }, [searchTerm, emojis]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    window.history.replaceState(null, '', `/product/emoji-tshirt?color=${event.target.value}&size=${size}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(null, '', `/product/emoji-tshirt?color=${color}&size=${size}&style=${event.target.value}`);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    window.history.replaceState(null, '', `/product/emoji-tshirt?color=${color}&size=${event.target.value}&style=${style}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const generate = async () => {
    setLoading(true);
    console.log("GENERATE AGAIN");
    setRenderCount(renderCount + 1);
    setLoading(false);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I customised this T-Shirt!! Check it out:',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        // console.log('Thanks for sharing!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 2000);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1400,
        marginX: 'auto',
        paddingX: { xs: 2, md: 10 },
        paddingY: 1,
      }}
    >
      <Box 
        sx={{
          paddingTop: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none'
        }}
        component={Link}
        href={'/'}
      >
        <img
          src='/logo.png'
          alt='Bigfoot Logo'
          style={{ width: 48, marginBottom: 8 }}
        />
      </Box>
      <Box sx={{ paddingY: 1, textAlign: 'center' }}>
        <Typography 
          variant="h4"
          gutterBottom 
          sx={{
            fontSize: {
              xs: '1.25rem',
              sm: '1.5rem',
              md: '2rem',
            },
            fontWeight: 'bold'
          }}
        >
          Emoji T-shirt - Korean Fit
        </Typography>
        <Typography 
          variant='subtitle1'
          sx={{color: '#777777', lineHeight: 1.25}}
        >
          Pick your emoji. Build your T-Shirt.
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: '0 0 32px rgba(0, 0, 0, 0.12)',
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          padding: 0,
          marginY: 2,
        }}
      >
        <Grid container spacing={0}>
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{ 
              display: { xs: 'block', md: 'flex' }, 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <ThreeScene
              color={color}
              type='emoji'
              values={{ renderCount, selectedEmoji, textInput }}
              style={style}
              loading={loading}
            />
          </Grid>
          <Grid
            item
            sx={{
              padding: { xs: 2, md: 2 },
            }}
            xs={12}
            md={6}
          >
            <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Select an Emoji
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  label="Search Emoji"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                />
              </Box>
              <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                {['Smileys & People', 'Animals & Nature', 'Food & Drink', 'Activities', 'Travel & Places', 'Objects', 'Symbols', 'Flags'].map((category, index) => (
                  <Tab key={index} label={category} />
                ))}
              </Tabs>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, height: 150, overflowY: 'scroll' }}>
                {filteredEmojis.map((emoji) => (
                  <Chip
                    key={emoji.unicodeName}
                    label={emoji.character}
                    onClick={() => setSelectedEmoji(emoji.character)}
                    sx={{ fontSize: '24px', padding: '8px' }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, my: 4 }}>
                <TextField
                  label="Add a message (Optional)"
                  variant="outlined"
                  fullWidth
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  inputProps={{ maxLength: 24 }}
                />
              </Box>
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                Pick your color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'black', label: 'Black' },
                  { value: 'grey', label: 'Grey' },
                  { value: 'white', label: 'White' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    clickable
                    color={color === option.value ? 'primary' : 'default'}
                    variant={color === option.value ? 'filled' : 'outlined'}
                    onClick={() => handleColorChange({ target: { value: option.value } })}
                    sx={{
                      padding: '24px 16px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      borderRadius: '9999px',
                    }}
                    icon={
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: option.value,
                          border: '1px solid',
                          borderColor: color === option.value ? '#444444' : '#eaeaea',
                          borderRadius: '50%',
                          mr: 1, // Add margin to the right to space out the circle and label
                        }}
                      />
                    }
                  />
                ))}
              </Box>
              
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                Choose your style
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'tiny', label: 'Tiny' },
                  { value: 'out', label: 'Out there' },
                  { value: 'badge', label: 'Side' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    clickable
                    color={style === option.value ? 'primary' : 'default'}
                    variant={style === option.value ? 'filled' : 'outlined'}
                    onClick={() => handleStyleChange({ target: { value: option.value } })}
                    sx={{
                      padding: '24px 16px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Select your size
                </Typography>
                <SizeChart />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {['XS','S', 'M', 'L', 'XL'].map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    clickable
                    color={size === option ? 'primary' : 'default'}
                    variant={size === option ? 'filled' : 'outlined'}
                    onClick={() => handleSizeChange({ target: { value: option } })}
                    sx={{
                      padding: '24px 8px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      width: '100%',
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <BuyNowButton
                  color={color}
                  size={size}
                  style={style}
                  type="Emoji"
                  storage={storage}
                  db={db}
                />
                <Tooltip title="URL copied" open={tooltipOpen} arrow>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                      padding: '12px',
                      fontWeight: 'bold',
                      borderRadius: '16px',
                      textTransform: 'none',
                    }}
                    onClick={handleShare}
                  >
                    Share Now
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmojiTshirtPage;
