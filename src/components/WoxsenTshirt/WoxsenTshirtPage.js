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

import CollectOrderButton from '../CollectOrderButton';


import Razorpay from 'razorpay';

const WoxsenTshirtPage = () => {
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
      router.push(`/product/woxsen-tshirt?color=${color || defaultParams.color}&style=${style || defaultParams.style}`);
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
    window.history.replaceState(null, '', `/product/woxsen-tshirt?color=${event.target.value}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(null, '', `/product/woxsen-tshirt?color=${color}&style=${event.target.value}`);
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
          Woxsen Kaleido T-shirts
        </Typography>
        <Typography 
          variant='subtitle1'
          sx={{color: '#777777', lineHeight: 1.25}}
        >
          Oversized T-Shirts for Kaleido
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
                type='woxsen'
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
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Choose your style
              </Typography>
            
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'black', label: 'Black', image: '/product-page/woxsen/black.png', disabled: false },
                  { value: 'beige', label: 'Beige', image: '/product-page/woxsen/beige.png', disabled: false },
                ].map((option) => (
                  <Tooltip
                    key={option.value}
                    title={option.disabled ? "Currently out of stock. Please check later." : ""}
                    arrow
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        clickable={!option.disabled}
                        label={
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              {option.label}
                            </Typography>
                            <Box
                              component="img"
                              src={option.image}
                              alt={option.label}
                              sx={{
                                width: '120px',
                                borderRadius: '8px',
                              }}
                            />
                          </Box>
                        }
                        variant="outlined"
                        disabled={option.disabled}
                        onClick={() => !option.disabled && handleColorChange({ target: { value: option.value } })}
                        sx={{
                          border: color === option.value ? '3px solid #444444' : '2px solid #eaeaea',
                          padding: '16px', // Adjust padding as needed
                          fontSize: '16px',
                          fontWeight: 'bold',
                          borderRadius: '16px',
                          cursor: option.disabled ? 'not-allowed' : 'pointer',
                          backgroundColor: 'transparent',
                          minWidth: '120px', // Ensures consistency
                          height: '160px',
                          textTransform: 'none',
                        }}
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
              <CollectOrderButton
                color={color}
                // size={size}
                style={style}
                type="woxsen"
                data={{}}
                storage={storage}
                db={db}
                price={89900}
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

export default WoxsenTshirtPage;
