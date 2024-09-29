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
        borderRadius: 4,
        my: 4
      }}
    >
      <Grid container justifyContent="space-between" alignItems="flex-start">
        {/* Left Side - Brand Name and Details */}
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
              style={{ width: 72, marginBottom: 8 }}
            />
            {/* <Typography variant="h6" gutterBottom>
              bigfoot
            </Typography> */}
            <Typography variant="subtitle1">
              unlimited possibilities, made real
            </Typography>
          </Link>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            We are a fashion tech brand that enables people to express themselves through fashion.
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
          For customisations and bulk orders, reach us at crew@bigfoot.land or +91 87549 68346.
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Made with ❤️ in India for the world
          </Typography>
        </Grid>

        {/* Right Side - Links (Quick Links, Policies, Products) */}
        <Grid item xs={12} md={6} container spacing={4} justifyContent="flex-end">
          <Grid item xs={6} sm={4}>
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

          <Grid item xs={6} sm={4}>
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

          <Grid item xs={6} sm={4}>
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
              href="/product/text-tshirt"
              variant="body2"
              display="block"
              sx={{
                mb: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'medium'
              }}
            >
              Text T-shirt
            </Link>
            <Link
              href="/product/dictionary-tshirt"
              variant="body2"
              display="block"
              sx={{
                mb: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'medium'
              }}
            >
              Dictionary T-shirt
            </Link>
            <Link
              href="/product/japanese-tshirt"
              variant="body2"
              display="block"
              sx={{
                mb: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'medium'
              }}
            >
              Japanese(ジャパニーズ) T-shirt
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
      </Grid>
    </Box>
  );
};

export default Footer;
