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

import Razorpay from 'razorpay';

const BasicTshirtPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0); // State variable to trigger re-render

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [style, setStyle] = useState(searchParams.get('style') || 'head');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      style: 'head',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('style')) {
      router.push(`/product/basic-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&style=${style || defaultParams.style}`);
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

  const handleColorChange = (event) => {
    setColor(event.target.value);
    window.history.replaceState(null, '', `/product/basic-tshirt?color=${event.target.value}&size=${size}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(null, '', `/product/basic-tshirt?color=${color}&size=${size}&style=${event.target.value}`);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    window.history.replaceState(null, '', `/product/basic-tshirt?color=${color}&size=${event.target.value}&style=${style}`);
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

  const handleBuyNow = async () => {
    setBuyNowLoading(true);
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas.toDataURL('image/png');
  
      const storageRef = ref(storage, `orders/basic-${Date.now()}.png`);
      await uploadString(storageRef, canvasDataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);
  
      const dataToStore = {
        color,
        size,
        style: style,
        type: "Basic",
        imageUrl,
        timestamp: new Date().toISOString(),
      };
  
      const docRef = await addDoc(collection(db, 'orders'), dataToStore);
      const docId = docRef.id;
  
      // Create Razorpay order by calling the API route
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: 139900,
          currency: 'INR',
          receipt: `receipt_${docId}`,
          notes: {},
          line_items_total: 139900,
          line_items: [
            {
              type: "e-commerce",
              sku: "1g234",
              variant_id: "12r34",
              price: 379900,
              offer_price: 139900,
              tax_amount: 252,
              quantity: 1,
              name: `Basic T-Shirt - ${style}`,
              description: "Customised T-Shirt",
              weight: 500,
              dimensions: {
                length: 100,
                width: 50,
                height: 30
              },
              image_url: imageUrl,
              product_url: window.location.href,
              notes: {}
            }
          ]
        })
      });
  
      const orderData = await response.json();
  
      if (!orderData.id) {
        throw new Error('Failed to create Razorpay order');
      }
  
      // Payment options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        one_click_checkout: true,
        name: 'Bigfoot Clothing',
        order_id: orderData.id,
        show_coupons: false,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert(`Razorpay Signature: ${response.razorpay_signature}`);
        },
        prefill: {
          // name: 'Customer Name',
          // email: 'customer@example.com',
          // contact: '9000090000'
        },
        notes: {
          // address: 'Customer Address'
        }
      };
  
      // Ensure the Razorpay script is loaded
      if (typeof window.Razorpay === 'undefined') {
        console.error('Razorpay SDK not loaded');
        throw new Error('Razorpay SDK not loaded');
      }
  
      const rzp1 = new window.Razorpay(options);
  
      rzp1.on('payment.failed', function (response) {
        alert(`Payment failed! Reason: ${response.error.description}`);
        console.error('Payment failed details:', response);
      });
  
      rzp1.open();
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
          Basic T-shirt - Oversized Fit
        </Typography>
        <Typography 
          variant='subtitle1'
          sx={{color: '#777777', lineHeight: 1.25}}
        >
          Basics from Bigfoot. Create your basic.
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
            md={6}
          >
            <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Customise your T-shirt
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={generate}
                sx={{ textTransform: 'none', marginTop: '16px', marginBottom: '16px', width: '100%', padding: 2 }}
              >
                <RefreshIcon sx={{ marginRight: '8px' }} />
                Generate Again
              </Button>
              <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                Pick your color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'black', label: 'Black' },
                  { value: 'beige', label: 'Sand' },
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
                  { value: 'head', label: 'Head' },
                  { value: 'tip', label: 'Tip' },
                  { value: 'loading', label: 'Loading...' },
                  { value: 'pixel', label: 'Pixel' },
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

export default BasicTshirtPage;
