import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#000000' }} />
        <Typography variant="subtitle2" sx={{ pt: 2 }}>
          Loading
        </Typography>
      </Box>
    </Box>
  );
}
