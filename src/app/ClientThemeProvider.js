// ClientThemeProvider.js
"use client";

import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '@fontsource/inter'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Set primary color to black
    },
    background: {
      default: '#ffffff', // Set background color to white
    },
    text: {
      primary: '#111111', // Set text color to black
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif', // Set Inter as the default font
    h1: {
      fontFamily: 'Urbanist, Arial, sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Urbanist, Arial, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Urbanist, Arial, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Urbanist, Arial, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Urbanist, Arial, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Urbanist, Arial, sans-serif',
      fontWeight: 600,
    },
  },
});

const ClientThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default ClientThemeProvider;