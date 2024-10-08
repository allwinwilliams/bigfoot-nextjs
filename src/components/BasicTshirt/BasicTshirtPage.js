"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, CircularProgress, Link,
  useTheme
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/RefreshOutlined';
import ThreeScene from '../ThreeScene';

import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import SizeChart from '../SizeChart';

import BuyNowButton from '../UIComponents/BuyNowButton';


import Razorpay from 'razorpay';

const BasicTshirtPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0); // State variable to trigger re-render

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [style, setStyle] = useState(searchParams.get('style') || 'head');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      style: 'head',
    };

    if (!searchParams.get('color') || !searchParams.get('style')) {
      router.push(`/product/basic-tshirt?color=${color || defaultParams.color}&style=${style || defaultParams.style}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setStyle(searchParams.get('style') || defaultParams.style);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    window.history.replaceState(null, '', `/product/basic-tshirt?color=${event.target.value}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(null, '', `/product/basic-tshirt?color=${color}&style=${event.target.value}`);
  };


  const generate = async () => {
    setLoading(true);
    console.log("GENERATE AGAIN");
    setRenderCount(renderCount + 1); // Trigger re-render
    setLoading(false);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'Checkout this amazing T-Shirt!!',
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
            
          }}
        >
          Basic T-shirt
        </Typography>
        <Typography 
          variant='subtitle2'
          sx={{color: '#777777', lineHeight: 1.25}}
        >
          Basics from Bigfoot. Create your basic.
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
                type='basic'
                values={{renderCount}}
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
            <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ }}>
                Customise your basic
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={generate}
                sx={{ textTransform: 'none',
                    marginTop: '16px', marginBottom: '16px',
                    width: '100%',
                    padding: 2,
                    borderRadius: '16px',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                    <RefreshIcon sx={{ marginRight: '8px' }} />
                    <strong>Change</strong>
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 'normal' }}>
                        Once the design is changed, you can't get it back
                    </Typography>
                </Box>
              </Button>
              
              
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                Choose your style
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'head', label: 'Glass' },
                  { value: 'tip', label: 'Face' },
                  { value: 'loading', label: 'Loading...' },
                  { value: 'motto', label: 'Motto' },
                  { value: 'pixel', label: '16X16' },
                  { value: 'gradient', label: 'Gradients' },
                  { value: 'overlap', label: 'Overlaps' },
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
                Pick your color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'black', label: 'Black', disabled: false },
                  { value: 'grey', label: 'Grey', disabled: true },
                  { value: 'beige', label: 'Sand', disabled: false },
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
                type="basic"
                data={{}}
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
  );
};

export default BasicTshirtPage;
