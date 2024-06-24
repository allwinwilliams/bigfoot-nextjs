"use client";

import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { CustomiseProvider } from './context/CustomiseProvider'; // Correct import path

const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Set primary color to black
    },
    background: {
      default: '#ffffff', // Set background color to white
    },
    text: {
      primary: '#000000', // Set text color to black
    },
  },
});

const ClientOnlyProvider = ({ children }) => {
  return (
    <CacheProvider value={muiCache}>
      <CustomiseProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
            {children}
          </Box>
        </ThemeProvider>
      </CustomiseProvider>
    </CacheProvider>
  );
};

export default ClientOnlyProvider;
