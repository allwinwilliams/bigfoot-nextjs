"use client";

import { Box, Typography, Link } from '@mui/material';

const Header = () => {
  return (
    <Box 
      sx={{
        paddingY: 2,
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
      <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
        Bigfoot Clothing
      </Typography>
      <Typography variant="body1" gutterBottom>
        Conceptual Fashion
      </Typography>
    </Box>
  );
};

export default Header;
