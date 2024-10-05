"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, CircularProgress, Link, Input,
  useTheme
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/RefreshOutlined';
import ThreeScene from '../ThreeScene';

import { db, storage } from '../../utils/firebaseConfig';

import BuyNowButton from '../UIComponents/BuyNowButton';
import ImageUploadButton from './ImageUploadButton';

const ImageTshirtPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [frontStyle, setFrontStyle] = useState(searchParams.get('frontStyle') || 'small');
  const [backStyle, setBackStyle] = useState(searchParams.get('backStyle') || 'small');
  const [frontUrl, setFrontUrl] = useState('');
  const [backUrl, setBackUrl] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      frontStyle: 'small',
      backStyle: 'small',
    };

    if (!searchParams.get('color') || !searchParams.get('frontStyle') || !searchParams.get('backStyle')) {
      router.push(`/product/image-tshirt?color=${color || defaultParams.color}&frontStyle=${frontStyle || defaultParams.frontStyle}&backStyle=${backStyle || defaultParams.backStyle}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setFrontStyle(searchParams.get('frontStyle') || defaultParams.frontStyle);
      setBackStyle(searchParams.get('backStyle') || defaultParams.backStyle);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    window.history.replaceState(null, '', `/product/image-tshirt?color=${event.target.value}&frontStyle=${frontStyle}&backStyle=${backStyle}`);
  };

  const handleFrontStyleChange = (event) => {
    setFrontStyle(event.target.value);
    window.history.replaceState(null, '', `/product/image-tshirt?color=${color}&frontStyle=${event.target.value}&backStyle=${backStyle}`);
  };

  const handleBackStyleChange = (event) => {
    setBackStyle(event.target.value);
    window.history.replaceState(null, '', `/product/image-tshirt?color=${color}&frontStyle=${frontStyle}&backStyle=${event.target.value}`);
  };

  const handleFrontImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontUrl(reader.result); // Set the base64 URL of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackUrl(reader.result); // Set the base64 URL of the image
      };
      reader.readAsDataURL(file);
    }
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
      <Box sx={{ paddingY: 1, textAlign: 'center' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            
          }}
        >
          Image Tshirt
        </Typography>
        <Typography
          variant='subtitle2'
          sx={{ color: '#777777', lineHeight: 1.25 }}
        >
          Upload your own image for customisation
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
              type='image'
              values={{
                renderCount,
                front: { style: frontStyle, url: frontUrl },
                back: { style: backStyle, url: backUrl }
              }}
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
                Customise with any image
              </Typography>
              

              <Typography variant="subtitle1" sx={{ fontWeight: 800, marginBottom: '4px' }} >
                Front Image
              </Typography>
              <Input
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleFrontImageUpload}
                sx={{ mb: 2 }}
                />


<Typography variant="subtitle1" sx={{ fontWeight: 800, marginBottom: '4px' }} >
                Front style
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'small', label: 'Small' },
                  { value: 'large', label: 'Large' },
                  { value: 'badge', label: 'Badge' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    clickable
                    color={frontStyle === option.value ? 'primary' : 'default'}
                    variant={frontStyle === option.value ? 'filled' : 'outlined'}
                    onClick={() => handleFrontStyleChange({ target: { value: option.value } })}
                    sx={{
                      padding: '24px 16px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 800, marginBottom: '4px' }} >
                Back Image
              </Typography>
              <Input
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleBackImageUpload}
                sx={{ mb: 2 }}
                />

              <Typography variant="subtitle1" sx={{ fontWeight: 800, marginBottom: '4px' }} >
                Back style
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'small', label: 'Small' },
                  { value: 'large', label: 'Large' },
                ].map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    clickable
                    color={backStyle === option.value ? 'primary' : 'default'}
                    variant={backStyle === option.value ? 'filled' : 'outlined'}
                    onClick={() => handleBackStyleChange({ target: { value: option.value } })}
                    sx={{
                      padding: '24px 16px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 800, marginBottom: '4px' }} >
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

              <Box sx={{ mt: 4 }}>
                <BuyNowButton
                  color={color}
                  style={`${frontStyle}:${backStyle}`}
                  type="image"
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

export default ImageTshirtPage;
