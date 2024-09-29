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

import CollectOrderButton from '../CollectOrderButton';

const WoxsenTshirtPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0); // State variable to trigger re-render

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [style, setStyle] = useState(searchParams.get('style') || 'chase');
  const [price, setPrice] = useState(899);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      style: 'chase',
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
    setColor(event.target.color);
    setStyle(event.target.style);
   
    window.history.replaceState(null, '', `/product/woxsen-tshirt?color=${event.target.color}&style=${event.target.style}`);
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
          variant="h5"
          gutterBottom 
          sx={{
            
          }}
        >
          Woxsen Kaleido T-shirts
        </Typography>
        <Typography 
          variant='subtitle2'
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
                  { style: 'chase', color: 'black', label: 'Chase', image: '/product-page/woxsen/black.png', disabled: false },
                  { style: 'stars', color: 'beige', label: 'Stars', image: '/product-page/woxsen/beige.png', disabled: false },
                  { style: 'another', color: 'black', label: 'Another', image: '/product-page/woxsen/black.png', disabled: false },
                  { style: 'more', color: 'beige', label: 'One more', image: '/product-page/woxsen/beige.png', disabled: false },
                ].map((option) => (
                  <Tooltip
                    key={option.style}
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
                                width: '100px',
                                borderRadius: '8px',
                              }}
                            />
                          </Box>
                        }
                        variant="outlined"
                        disabled={option.disabled}
                        onClick={() => !option.disabled && handleColorChange({ target: { color: option.color, style: option.style } })}
                        sx={{
                          border: style === option.style ? '3px solid #444444' : '2px solid #eaeaea',
                          padding: '8px',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          borderRadius: '16px',
                          cursor: option.disabled ? 'not-allowed' : 'pointer',
                          backgroundColor: 'transparent',
                          minWidth: '100px',
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
                price={price}
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
      <Box
        id="the-range"
        sx={{
          paddingX: { md: 12, xs: 4 },
          paddingY: 12,
          marginX: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3"
          sx={{
            mb: 4,
            color: '#bbbbbb'
          }}>
          Other range
        </Typography>
        <Grid container spacing={2} sx={{my: 8}}>
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Link
              LinkComponent={Link}
              href="/product/song-tshirt"
              underline="none"
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/song.png" alt="Song T-Shirt Product image. Customised T-Shirt with Songs." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#444444' }}>
                  Style With Music
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Design with your favorite song
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Link
              LinkComponent={Link} 
              href="/product/prompt-generated-tshirt" 
              underline="none"
              onClick={(e) => {
                
              }}
              onMouseEnter={() => {
                
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/ai.png" alt="AI generated T-Shirt Product image. Customised T-Shirt with AI prompt." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#444444' }}>
                  Generate with Prompt
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Your idea and style generated
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Link
              LinkComponent={Link} 
              href="/product/dictionary-tshirt" 
              underline="none"
              onClick={(e) => {
                
              }}
              onMouseEnter={() => {
                
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/dictionary.png" alt="AI generated T-Shirt Product image. Customised T-Shirt with AI prompt." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#444444' }}>
                  Dictionary of whatever
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Find meaning of anyword
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Link
              LinkComponent={Link}
              href="/product/emoji-tshirt"
              underline="none"
              onClick={(e) => {
                
              }}
              onMouseEnter={() => {
                
              }}
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/emoji.png" alt="Emoji T-Shirt Product image. Customisable T-Shirts with Emojis." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#444444' }}>
                  😊 Express with Emojis
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Design with emoji and short text
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Link
              LinkComponent={Link} 
              href="/product/japanese-tshirt" 
              underline="none"
              onClick={(e) => {
                
              }}
              onMouseEnter={() => {
                
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/japanese.png" alt="AI generated T-Shirt Product image. Customised T-Shirt with AI prompt." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#444444' }}>
                  Japanese (ジャパニーズ)
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Turn any word into japanese
                </Typography>
              </Box>
            </Link>
          </Grid>
          
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Link
              LinkComponent={Link} 
              href="/product/text-tshirt" 
              underline="none"
              onClick={(e) => {
                
              }}
              onMouseEnter={() => {
                
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/text.png" alt="AI generated T-Shirt Product image. Customised T-Shirt with AI prompt." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#444444' }}>
                  Any Text
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Write any word or short phrase
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Link
              LinkComponent={Link}
              href="/product/basic-tshirt"
              underline="none"
              onClick={(e) => {
                
              }}
              onMouseEnter={() => {
                
              }}
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/basic.png" alt="T-Shirt Product image. Customised T-Shirts." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#444444' }}>
                  Bigfoot Basics
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  From Bigfoot The Brand
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Box>
              <Box
                sx={{
                  transition: 'transform 0.8s',
                  opacity: 0.3,
                  '&:hover': {
                    transform: 'scaleX(-1)',
                    opacity: 0.6,
                  },
                }}
                onMouseEnter={() => {
                  
                }}  
              >
                <img src="/landing-page/launch.png" alt="T-Shirt Product image. More coming soon." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </Box>
              <Typography variant="h6" sx={{ color: '#444444' }}>
                Launching soon
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                Check within a few days
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={6} md={3} sx={{mx: 'auto', padding: 2}}>
            <Box>
              <Box
                sx={{
                  transition: 'transform 0.8s',
                  opacity: 0.6,
                  '&:hover': {
                    transform: 'scaleX(-1)',
                    opacity: 1.0,
                  },
                }}
                onMouseEnter={() => {
                  
                }}  
              >
                <img src="/landing-page/coming-soon.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                More Coming Soon
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                Our lab is cooking 🧪...
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default WoxsenTshirtPage;
