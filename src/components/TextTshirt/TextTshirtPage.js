"use client";
import Head from 'next/head';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, Link, useTheme, Tabs, Tab, TextField
} from '@mui/material';

import ThreeScene from '../ThreeScene';
import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported

import AutoScrollCards from '../AutoScrollCards';

import SizeChart from '../SizeChart';
import BuyNowButton from '../BuyNowButton';
import debounce from 'lodash.debounce';

const TextTshirtPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [style, setStyle] = useState(searchParams.get('style') || 'small');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [textInput, setTextInput] = useState(searchParams.get('text') || ' ');
  const [tabValue, setTabValue] = useState(0);

  const initialLoad = useRef(true);

  const samples = [
    { imgUrl: '/samples/emoji/1.png', title: 'すし、ください。', description: '', link: '/product/text-tshirt?color=black&size=M&style=small&text=%E3%81%99%E3%81%97%E3%80%81%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82' },
    { imgUrl: '/samples/emoji/2.png', title: 'No time', description: '', link: '/product/text-tshirt?color=beige&size=M&style=small&text=No+time' },
    { imgUrl: '/samples/emoji/3.png', title: 'Tired.', description: '', link: '/product/text-tshirt?color=white&size=M&style=badge&text=Tired.' },
    { imgUrl: '/samples/emoji/6.png', title: 'स्वागत', description: 'beach vacation', link: '/product/text-tshirt?color=beige&size=M&style=small&text=स्वागत' },
    { imgUrl: '/samples/emoji/4.png', title: 'Free Speech', description: '', link: '/product/text-tshirt?color=black&size=M&style=small&text=Free+Speech' },
    { imgUrl: '/samples/emoji/5.png', title: 'வணக்கம்', description: '', link: '/product/text-tshirt?color=black&size=M&style=brat&text=வணக்கம்' },
    { imgUrl: '/samples/emoji/7.png', title: 'JUST DO IT', description: '', link: '/product/text-tshirt?color=black&size=M&style=bold&text=JUST+DO+IT' },
  ];

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      style: 'small',
      text: '',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('style') || !searchParams.get('text')) {
      router.push(`/product/text-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&style=${style || defaultParams.style}&text=${textInput || defaultParams.text}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setSize(searchParams.get('size') || defaultParams.size);
      setStyle(searchParams.get('style') || defaultParams.style);
      setTextInput(searchParams.get('text') || defaultParams.text);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  const updateUrlParams = (params, shallow = false) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        updatedParams.set(key, params[key]);
      } else {
        updatedParams.delete(key);
      }
    });
    router.replace(`/product/text-tshirt?${updatedParams.toString()}`, undefined, { shallow });
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    updateUrlParams({ color: newColor }, true);
  };
  
  const handleStyleChange = (event) => {
    const newStyle = event.target.value;
    setStyle(newStyle);
    updateUrlParams({ style: newStyle }, true);
  };
  
  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    updateUrlParams({ size: newSize }, true);
  };

  const handleTextInputChange = (e) => {
    const newText = e.target.value;
    setTextInput(newText);
    updateUrlParams({ text: newText }); 
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I customised this T-Shirt with an Emoji!! Check it out:',
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </Head>
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
            Write whatever
          </Typography>
          <Typography 
            variant='subtitle1'
            sx={{color: '#777777', lineHeight: 1.25}}
          >
            This is a T-Shirt which let's you write whatever you want
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
              md={7}
              sx={{ 
                display: { xs: 'block', md: 'flex' }, 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              
                <ThreeScene
                  color={color}
                  type='text'
                  values={{ textInput }}
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
              md={5}
            >
              <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 0 }}>
                <Box sx={{ display: 'flex', gap: 1, my: 4 }}>
                  <TextField
                    label="Add a message (Optional - Max 24 characters)"
                    variant="outlined"
                    fullWidth
                    value={textInput}
                    onChange={handleTextInputChange}
                    inputProps={{ maxLength: 24 }}
                  />
                </Box>
                
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Choose your style
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'small', label: 'Small', imgSrc: '/product-page/text/small.png' },
                  { value: 'bold', label: 'Bold', imgSrc: '/product-page/text/large.png' },
                  { value: 'cursive', label: 'Cursive', imgSrc: '/product-page/text/cursive.png' },
                  { value: 'serif', label: 'Serif', imgSrc: '/product-page/text/large.png' },
                  { value: 'brat', label: 'Brat', imgSrc: '/product-page/text/brat.png' },
                ].map((option) => (
                  <Box
                    key={option.value}
                    onClick={() => handleStyleChange({ target: { value: option.value } })}
                    sx={{
                      padding: 1,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: `2px solid ${style === option.value ? theme.palette.primary.main : '#ccc'}`,
                      transition: 'border-color 0.3s',
                      '&:hover': {
                        borderColor: style === option.value ? theme.palette.primary.dark : '#999',
                      },
                    }}
                  >
                    <img
                      src={option.imgSrc}
                      alt={option.label}
                      style={{
                        width: '80px', 
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 1 }}>
                      {option.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Pick your color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {[
                    { value: 'black', label: 'Black', disabled: false },
                    { value: 'beige', label: 'Sand', disabled: false },
                    { value: 'white', label: 'White', disabled: true },
                  ].map((option) => (
                    <Tooltip
                      key={option.value}
                      title={option.disabled ? "Currently out of stock. Please check later." : ""}
                      arrow
                    >
                      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Chip
                          clickable={!option.disabled}
                          label={option.label}
                          color={color === option.value ? 'primary' : 'default'}
                          variant={color === option.value ? 'filled' : 'outlined'}
                          disabled={option.disabled}
                          onClick={() => !option.disabled && handleColorChange({ target: { value: option.value } })}
                          sx={{
                            padding: '24px 16px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '9999px',
                            cursor: option.disabled ? 'not-allowed' : 'pointer'
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
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
                {/* <Box sx={{ marginBottom: 2 }}>
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
                 */}
                <Box sx={{ mt: 4 }}>
                  <BuyNowButton
                    color={color}
                    // size={size}
                    style={style}
                    type="text"
                    data={{text: textInput}}
                    storage={storage}
                    db={db}
                    price={114900}
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
      <AutoScrollCards itemsRow1={samples} />
    </Box>
  );
};

export default TextTshirtPage;
