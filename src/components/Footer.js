"use client";

import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'left',
        padding: 4,
        backgroundColor: '#FEFEFE',
        borderRadius: 8,
        my: 4
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Link
            href="/"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <img
              src='/logo.png'
              alt='Bigfoot Logo'
              style={{ width: 48, marginBottom: 8 }}
            />
            <Typography variant="h6" gutterBottom>
              bigfoot
            </Typography>
            <Typography variant="subtitle1">
              Conceptual Art & Fashion
            </Typography>
          </Link>
          <Typography variant="subtitle2" sx={{ maxWidth: '260px', color: '#999999' }}>
            We are a fashion tech brand aimed to enabling people to express themselves through fashion.
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2, maxWidth: '260px', color: '#999999' }}>
            We do help on customised bulk orders for events and corporates, contact us at crew@bigfoot.land.
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link
            href="/"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Home
          </Link>
          <Link
            href="/static-pages/about"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            About Us
          </Link>
          <Link
            href="/product"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Product
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Policies
          </Typography>
          <Link
            href="/static-pages/contactus"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Contact Us
          </Link>
          <Link
            href="/static-pages/privacypolicy"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/static-pages/returnspolicy"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Returns Policy
          </Link>
          <Link
            href="/static-pages/shippingdetails"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Shipping Details
          </Link>
          <Link
            href="/static-pages/termsandconditions"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Terms and Conditions
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
          <Link
            href="/product/song-tshirt"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Song T-shirt
          </Link>
          <Link
            href="/product/ai-tshirt"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            AI T-shirt
          </Link>
          <Link
            href="/product/emoji-tshirt"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Emoji T-shirt
          </Link>
          <Link
            href="/product/basic-tshirt"
            variant="body2"
            display="block"
            sx={{
              mb: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'medium'
            }}
          >
            Bigfoot Basics
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
