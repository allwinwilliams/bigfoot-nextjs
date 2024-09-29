"use client";

import { Box, Typography, Link } from '@mui/material';


const Header = () => {
  return (
    <>
      <Box 
        sx={{
          paddingTop: 4,
          paddingBottom: 0.5,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
        }}
        component={Link}
        href={'/'}
      >
        <img
          src='/logo.png'
          alt='Bigfoot Logo'
          style={{ width: 72, marginBottom: 8 }}
        />
        {/* <Typography variant="h5" gutterBottom>
          bigfoot
        </Typography> */}

        <Typography variant="subtitle2" gutterBottom sx={{color: '#666666'}}>
          unlimited possibilities, made real
        </Typography>
      </Box>
    </>
  );
};

export default Header;
