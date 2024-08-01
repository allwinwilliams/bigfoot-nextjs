"use client";

import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'left',
        padding: 4,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        my: 4
      }}
    >
      <Box>
        <img
          src='/logo.png'
          alt='Bigfoot Logo'
          style={{ width: 48, marginBottom: 8 }}
        />
        <Typography variant="h5" gutterBottom>
          Bigfoot Clothing
        </Typography>
        <Typography variant="subtitle1">
          Conceptual Fashion
        </Typography>
        <Typography variant="subtitle2" sx={{maxWidth: '260px', color: '#999999'}}>
          We are a fashion tech brand aimed to enabling people to express themselves through fashion.
        </Typography>
      </Box>
      <Box>
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
        <Link
          href="/static-pages/contact"
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
      </Box>
    </Box>
  );
};

export default Footer;
