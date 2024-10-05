"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, CircularProgress, Link,
  useTheme, TextField, InputAdornment
} from '@mui/material';
import { AiCustomiseContext } from '../../context/AiCustomiseProvider';
import ThreeScene from '../ThreeScene';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotesIcon from '@mui/icons-material/Notes';
import RefreshIcon from '@mui/icons-material/RefreshOutlined';

import BuyNowButton from '../UIComponents/BuyNowButton';
import AutoScrollCards from '../UIComponents/AutoScrollCards';

import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import SizeChart from '../SizeChart';

const AiProductPage = () => {
  const theme = useTheme();
  const { generateImage, prompt, details } = useContext(AiCustomiseContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [inputPrompt, setInputPrompt] = useState(searchParams.get('prompt') || ''); // Local state for input
  const [style, setStyle] = useState(searchParams.get('style') || 'Anime');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      prompt: '',
      style: 'Anime',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('prompt') || !searchParams.get('style')) {
      router.push(`/product/ai-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&prompt=${inputPrompt || defaultParams.prompt}&style=${style || defaultParams.style}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setSize(searchParams.get('size') || defaultParams.size);
      setInputPrompt(searchParams.get('prompt') || defaultParams.prompt);
      setStyle(searchParams.get('style') || defaultParams.style);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    window.history.replaceState(null, '', `/product/ai-tshirt?color=${event.target.value}&size=${size}&prompt=${inputPrompt}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(null, '', `/product/ai-tshirt?color=${color}&size=${size}&prompt=${inputPrompt}&style=${event.target.value}`);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    window.history.replaceState(null, '', `/product/ai-tshirt?color=${color}&size=${event.target.value}&prompt=${inputPrompt}&style=${style}`);
  };

  const handlePromptChange = (event) => {
    setInputPrompt(event.target.value);
  };

  const generate = async () => {
    setLoading(true);
    // changePrompt(inputPrompt);
    const fullPrompt = `${inputPrompt} in the style of ${style}`;
    await generateImage(fullPrompt);
    setLoading(false);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I used a prompt to generate a T-Shirt design!! Check this:',
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
    <Box>
      
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
          variant="h5"
          gutterBottom 
          sx={{
            
          }}
        >
          AI Generated Art T-shirt - Oversized Fit
        </Typography>
        <Typography 
          variant='subtitle2'
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
                // data={{ type: 'ai', values: details }}
                type='ai'
                values={details}
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
            <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 1 }}>
              <Box sx={{ 
                paddingX: 4, 
                paddingY: 3, 
                backgroundColor: '#fafafa', 
                marginBottom: 2, 
                borderRadius: 3, 
                border: '1px solid #dbdbdb', 
                boxShadow: '0 0 8px rgba(0,0,0,0.06)',
                }}>
                <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  Customise with a prompt
                </Typography>
                <TextField
                  placeholder="Enter your prompt..."
                  variant="outlined"
                  value={inputPrompt}
                  onChange={handlePromptChange}
                  disabled={loading}
                  fullWidth
                  inputProps={{ maxLength: 30 }}
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
                        <NotesIcon sx={{ color: 'grey' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Choose your style
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {[
                    { value: 'Popart', label: 'Pop' },
                    { value: 'Hokusai', label: 'Hokusai' },
                    { value: 'Anime', label: 'Anime' },
                    { value: 'Lineart', label: 'Line' },
                  ].map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      clickable
                      disabled={loading}
                      color={style === option.value ? 'primary' : 'default'}
                      variant={style === option.value ? 'filled' : 'outlined'}
                      onClick={() => handleStyleChange({ target: { value: option.value } })}
                      sx={{
                        padding: '24px 12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '9999px',
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={generate}
                  disabled={loading}
                  sx={{
                    textTransform: 'none',
                    marginBottom: 1,
                    width: '100%',
                    padding: 2,
                    borderRadius: '16px',
                  }}
                >
                    <AutoAwesomeIcon sx={{ marginRight: '8px' }} />
                    <strong>{loading ? 'Generating... Please wait' : 'Generate'}</strong>
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={generate}
                  disabled={loading}
                  sx={{ textTransform: 'none',
                      marginBottom: 1,
                      width: '100%',
                      padding: 2,
                      borderRadius: '16px',
                  }}
                >
                  <RefreshIcon sx={{ marginRight: '8px' }} />
                  <strong>Try Again</strong>
                </Button>
              </Box>
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                Pick your color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'black', label: 'Black', disabled: 'false' },
                  { value: 'beige', label: 'Sand', disabled: 'false' },
                  { value: 'white', label: 'White', disabled: 'true' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    clickable
                    color={color === option.value ? 'primary' : 'default'}
                    variant={color === option.value ? 'filled' : 'outlined'}
                    disabled={ option.disabled }
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
                          mr: 1,
                        }}
                      />
                    }
                  />
                ))}
              </Box>
              
              
              <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                    Select your size
                  </Typography>
                  <SizeChart />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {['XS','S', 'M', 'L', 'XL', 'XXL'].map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    clickable
                    color={size === option ? 'primary' : 'default'}
                    variant={size === option ? 'filled' : 'outlined'}
                    onClick={() => handleSizeChange({ target: { value: option } })}
                    sx={{
                      padding: '24px 12px',
                      fontSize: '16px',
                      fontWeight: 'bold',
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
                  type="ai"
                  data={{prompt}}
                  storage={storage}
                  db={db}
                />
                <Tooltip title="URL copied" open={tooltipOpen} arrow>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled="true"
                    sx={{
                      padding: '12px',
                      fontWeight: 'bold',
                      borderRadius: '16px',
                      textTransform: 'none',
                    }}
                    onClick={handleShare}
                  >
                    Generated everytime. Can't share exact one.
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
      <AutoScrollCards />
    </Box>
  );
};

export default AiProductPage;