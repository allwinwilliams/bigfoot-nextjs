"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, CircularProgress, Card, Link,
  CardMedia, CardContent, useTheme, TextField, InputAdornment
} from '@mui/material';
import { CustomiseAppContext } from '../../context/CustomiseProvider';
import ThreeScene from '../ThreeScene';
import PromptIcon from '@mui/icons-material/ChatBubbleOutline'; // Example icon for the prompt

import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const AiProductPage = () => {
  const theme = useTheme();
  const { songData } = useContext(CustomiseAppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(false);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [prompt, setPrompt] = useState(searchParams.get('prompt') || ''); // Initialize prompt from search params
  const [style, setStyle] = useState(searchParams.get('style') || 'anime');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      prompt: '',
      style: 'anime',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('prompt') || !searchParams.get('style')) {
      router.push(`/product/ai-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&prompt=${prompt || defaultParams.prompt}&style=${style || defaultParams.style}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setSize(searchParams.get('size') || defaultParams.size);
      setPrompt(searchParams.get('prompt') || defaultParams.prompt);
      setStyle(searchParams.get('style') || defaultParams.style);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    window.history.replaceState(null, '', `/product/ai-tshirt?color=${event.target.value}&size=${size}&prompt=${prompt}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(null, '', `/product/ai-tshirt?color=${color}&size=${size}&prompt=${prompt}&style=${event.target.value}`);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    window.history.replaceState(null, '', `/product/ai-tshirt?color=${color}&size=${event.target.value}&prompt=${prompt}&style=${style}`);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
    window.history.replaceState(null, '', `/product/ai-tshirt?color=${color}&size=${size}&prompt=${event.target.value}&style=${style}`);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I customised this T-Shirt with a prompt!! Check it out:',
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

  const handleBuyNow = async () => {
    setBuyNowLoading(true);
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas.toDataURL('image/png');

      const storageRef = ref(storage, `orders/${prompt}-${Date.now()}.png`);
      await uploadString(storageRef, canvasDataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);

      const dataToStore = {
        color,
        size,
        prompt,
        style,
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
          AI Generated Art T-shirt - Oversized Fit
        </Typography>
        <Typography 
          variant='subtitle1'
          sx={{color: '#777777', lineHeight: 1.25}}
        >
          Personalise your T-Shirt based on a prompt. Enter a prompt and see the magic.
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
              data={{type: 'ai', values: songData}}
              style={style}
              songLoading={songLoading}
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
                Customise with Your Prompt
              </Typography>
              <TextField
                placeholder="Enter your prompt..."
                variant="outlined"
                value={prompt}
                onChange={handlePromptChange}
                fullWidth
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '16px',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PromptIcon sx={{ color: 'grey' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                Pick your color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'black', label: 'Black' },
                  { value: 'beige', label: 'Sand' },
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
                  { value: 'anime', label: 'Anime' },
                  { value: 'lineart', label: 'Line Art' },
                  { value: 'horror', label: 'Horror' },
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
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                Select your size
              </Typography>
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mb: 2,
                  padding: '12px',
                  fontWeight: 'bold',
                  borderRadius: '16px',
                  textTransform: 'none',
                }}
                onClick={handleBuyNow}
                disabled={buyNowLoading}
              >
                {buyNowLoading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    Buy Now @ ₹1,399
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 'normal' }}>
                      Limited Time Offer
                    </Typography>
                  </Box>
                )}
              </Button>
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

export default AiProductPage;
