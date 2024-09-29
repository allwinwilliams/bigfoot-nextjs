"use client";
import Head from 'next/head';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, Link, useTheme, TextField, Autocomplete
} from '@mui/material';

import ThreeScene from '../ThreeScene';
import { db, storage } from '../../utils/firebaseConfig';

import AutoScrollCards from '../AutoScrollCards';

import wordsList from '../DictionaryTshirt/words_dictionary.json';
import { JapaneseContext } from '../../context/JapaneseContextProvider';

import SizeChart from '../SizeChart';
import BuyNowButton from '../BuyNowButton';

const JapaneseTshirtPage = () => {
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
  
  const [textInput, setTextInput] = useState(searchParams.get('text') || ' ');

  const initialLoad = useRef(true);

  const samples = [
    // Sample array remains unchanged
  ];

  const wordsArray = Object.keys(wordsList);

  const { translationDetails, getTranslation } = useContext(JapaneseContext);

  useEffect(() => {
    if (!textInput) return;
  
    const debounceTimer = setTimeout(() => {
        getTranslation(textInput);
    }, 800);
  
    return () => clearTimeout(debounceTimer);
  }, [textInput]);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      style: 'small',
      text: '',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('style') || !searchParams.get('text')) {
      router.push(`/product/japanese-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&style=${style || defaultParams.style}&text=${textInput || defaultParams.text}`);
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
    router.replace(`/product/japanese-tshirt?${updatedParams.toString()}`, undefined, { shallow });
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
        console.log('Thanks for sharing!');
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
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
            py: 2,
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
            src='/wordmark.svg'
            alt='Bigfoot Logo'
            style={{ width: 96 }}
          />
        </Box>
        {/* <Box sx={{ paddingY: 1, textAlign: 'center' }}>
          <Typography 
            variant="h5"
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
            Japanese(ジャパニーズ) on T-Shirt
          </Typography>
          <Typography 
            variant='subtitle2'
            sx={{color: '#777777', lineHeight: 1.25}}
          >
            A T-Shirt that is designed with a japanese text in Katakana script of a word of your choice
          </Typography>
        </Box> */}
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
                  type='japanese'
                  values={{ textInput, translation: translationDetails }}
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
                <Typography variant="h5" gutterBottom sx={{ }}>
                  Turn you text to Japanese
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, my: 4 }}>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={wordsArray}
                    filterOptions={(options, state) =>
                      options
                        .filter((option) =>
                          option.toLowerCase().startsWith(state.inputValue.toLowerCase())
                        )
                        .slice(0, 10)
                    }
                    value={textInput}
                    onInputChange={(event, newInputValue) => {
                      setTextInput(newInputValue);
                      updateUrlParams({ text: newInputValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Write your word"
                        variant="outlined"
                        fullWidth
                        inputProps={{ ...params.inputProps, maxLength: 16 }}
                        helperText="Max 16 characters"
                      />
                    )}
                  />
                </Box>
                
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Choose your style
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'small', label: 'Small', imgSrc: '/product-page/japanese/small.png' },
                  { value: 'bold', label: 'BOLD', imgSrc: '/product-page/japanese/bold.png' },
                  { value: 'neon', label: 'Neon', imgSrc: '/product-page/japanese/neon.png' },
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
                </Box> */}
                
                <Box sx={{ mt: 4 }}>
                  <BuyNowButton
                    color={color}
                    // size={size}
                    style={style}
                    type="japanese"
                    data={{text: textInput}}
                    storage={storage}
                    db={db}
                    price={119900}
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

export default JapaneseTshirtPage;
