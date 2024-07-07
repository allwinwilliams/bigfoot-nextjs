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
        borderRadius: 2,
        my: 4
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Bigfoot Clothing
        </Typography>
        <Typography variant="body2">
          Conceptual Luxury Casuals
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
