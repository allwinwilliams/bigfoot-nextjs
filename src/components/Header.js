"use client";

import { Box, Typography, Link, Chip } from '@mui/material';

const Header = () => {
  return (
    <Box 
      sx={{
        paddingTop: 2,
        paddingBottom: 0.5,
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
      <Typography variant="h5" gutterBottom sx={{ }}>
        bigfoot
      </Typography>
      
      <Chip label="Beta" variant="contained" />
    </Box>
  );
};

export default Header;
