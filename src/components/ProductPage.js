"use client";

import React, { useContext, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography, Grid, Chip, Button, Tooltip, CircularProgress } from '@mui/material';
import { CustomiseAppContext } from '../context/CustomiseProvider';
import ThreeScene from './ThreeScene';
import SpotifySearch from './SpotifySearch'; // Ensure correct import
import { fetchAllSongData } from '@/utils/spotifyUtils';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BrushIcon from '@mui/icons-material/Brush';

import { db, storage } from '../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const ProductPage = () => {
  const { songData } = useContext(CustomiseAppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(false);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [songId, setSongId] = useState(searchParams.get('songId') || '44JnQ7TIl4ieCbCQiEPQag');
  const [sketchType, setSketchType] = useState(searchParams.get('style') || 'type1');
  const [tooltipOpen, setTooltipOpen] = useState(false);


  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     if (songId && accessToken) {
  //       const { trackData, analysisData, featuresData } = await fetchAllSongData(songId, accessToken);
  //       changeSongData(trackData);
  //       setAnalysisData(analysisData);
  //       setFeaturesData(featuresData);
  //     }
  //   };

  //   fetchAllData();
  // }, [songId, accessToken, changeSongData]);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      songId: '44JnQ7TIl4ieCbCQiEPQag',
      style: 'type1',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('songId') || !searchParams.get('style')) {
      router.push(`/product/tshirt/song?color=${color || defaultParams.color}&size=${size || defaultParams.size}&songId=${songId || defaultParams.songId}&style=${sketchType || defaultParams.style}`);
    }
  }, [searchParams, color, size, songId, sketchType, router]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    router.replace(`/product/tshirt/song?color=${event.target.value}&size=${size}&songId=${songId}&style=${sketchType}`, undefined, { scroll: false });
  };

  const handleStyleChange = (event) => {
    setSketchType(event.target.value);
    router.replace(`/product/tshirt/song?color=${color}&size=${size}&songId=${songId}&style=${event.target.value}`, undefined, { scroll: false });
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    router.replace(`/product/tshirt/song?color=${color}&size=${event.target.value}&songId=${songId}&style=${sketchType}`, undefined, { scroll: false });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setTooltipOpen(true);
    setTimeout(() => setTooltipOpen(false), 2000);
  };

  const handleBuyNow = async () => {
    setBuyNowLoading(true);
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas.toDataURL('image/png');
      
      const storageRef = ref(storage, `orders/${songId}-${Date.now()}.png`);
      await uploadString(storageRef, canvasDataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);
      
      const dataToStore = {
        color,
        size,
        songId,
        songName: songData.details?.name || '',
        style: sketchType,
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
      <Box sx={{ paddingY: 2, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Song Data Generated Art T-shirt - Oversized Fit
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is a customizable t-shirt with a design generated from a Spotify song. Choose your favorite song and see the magic!
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: '0 0 32px rgba(0, 0, 0, 0.12)',
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          padding: 0,
          marginY: 4,
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
              songData={songData}
              sketchType={sketchType}
              songLoading={songLoading}
            />
          </Grid>
          <Grid
            item
            sx={{
              padding: { xs: 2, md: 4 },
            }}
            xs={12}
            md={6}
          >
            <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Customise with Your Song
              </Typography>
              <SpotifySearch
                color={color}
                size={size}
                sketchType={sketchType}
                songLoading={songLoading}
                setSongLoading={setSongLoading}
              />
              <Typography variant="h6" gutterBottom>
                Color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
              <Typography variant="h6" gutterBottom>
                Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {['S', 'M', 'L', 'XL'].map((option) => (
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
              <Typography variant="h6" gutterBottom>
                Style
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {[
                  { value: 'type3', label: 'Minimal' },
                  { value: 'type1', label: 'Maximal' },
                  { value: 'type2', label: 'Analysis' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    clickable
                    color={sketchType === option.value ? 'primary' : 'default'}
                    variant={sketchType === option.value ? 'filled' : 'outlined'}
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
                  {buyNowLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Buy Now @ ₹3,299'}
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
      <Box
        marginTop={8}
        sx={{
          borderRadius: '16px',
          backgroundColor: '#fff',
          padding: 3,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src="/song-tshirt/customised-banner.jpg"
              alt="Custom T-shirt"
              style={{ width: '100%', borderRadius: '16px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Customise your T-shirt with your favorite song
            </Typography>
            <Typography variant="subtitle1">
              Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, album art, or any design that represents the music you love. Our high-quality printing ensures that your custom T-shirt looks amazing and lasts long. Create a unique piece of clothing that speaks to your musical tastes and personality.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        marginTop={8}
        sx={{
          borderRadius: '16px',
          backgroundColor: '#fafafa',
          padding: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" 
          sx={{
            fontWeight: 'bold',
            mb: 4,
        }}>
          What we offer?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <LocalShippingIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Free Shipping All Over India
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <BuildIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Made to Order
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <CheckCircleIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Premium Quality Fabric
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <BrushIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Customised Designs
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        marginTop={4}
        sx={{
          borderRadius: '16px',
          backgroundColor: '#f3f3f3',
          padding: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="/song-tshirt/understand.png"
            alt="Can I understand the design? Yes, it's all based on data"
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              height: 'auto', 
              borderRadius: '8px', 
              marginTop: '16px' 
            }}
          />
        </Box>
      </Box>
     
      <Box
        marginTop={4}
        sx={{
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          borderRadius: '16px',
          padding: 3,
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(144deg, #00ded2, #7f00ef, #d6007d)',
          backgroundSize: '300% 300%',
          animation: 'backgroundMovement 4s ease infinite',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Why BigFoot?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Well there are so many reasons but here are a few
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="/song-tshirt/compare.png"
            alt="Example"
            style={{
              width: '100%',
              maxWidth: '800px',
              height: 'auto',
              borderRadius: '8px',
              marginTop: '16px'
            }}
          />
        </Box>
        <style jsx global>{`
          @-webkit-keyframes backgroundMovement {
            0% {
              background-position: 48% 0%;
            }
            50% {
              background-position: 53% 100%;
            }
            100% {
              background-position: 48% 0%;
            }
          }

          @-moz-keyframes backgroundMovement {
            0% {
              background-position: 48% 0%;
            }
            50% {
              background-position: 53% 100%;
            }
            100% {
              background-position: 48% 0%;
            }
          }

          @keyframes backgroundMovement {
            0% {
              background-position: 48% 0%;
            }
            50% {
              background-position: 53% 100%;
            }
            100% {
              background-position: 48% 0%;
            }
          }
        `}</style>
      </Box>
      <Box
        marginTop={4}
        sx={{
          borderRadius: '16px',
          paddingY: 3,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '16px',
                padding: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: '800', mb: 2 }}>
                Direct To Garment(DTG) Print
              </Typography>
              <Typography variant="body1">
                Using Direct To Garment(DTG) printing technque we ensure highest quality print for each of your order
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: '#b0b0b0',
                borderRadius: '16px',
                padding: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: '800', mb: 2 }}>
                Soft Touch Knitting
              </Typography>
              <Typography variant="body1">
                With new and innovating knitting technque the fabric is truly a kind of it's own.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductPage;
