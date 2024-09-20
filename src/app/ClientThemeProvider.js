// ClientThemeProvider.js
"use client";

import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '@fontsource/inter'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#dbdbdb',
    },
    background: {
      default: '#f7f8fa',
    },
    text: {
      primary: '#111111',
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif', // Set Inter as the default font
    h1: {
      fontFamily: 'Outfit, Arial, sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase', // Capitalize h1
    },
    h2: {
      fontFamily: 'Outfit, Arial, sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase', // Capitalize h2
    },
    h3: {
      fontFamily: 'Outfit, Arial, sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase', // Capitalize h3
    },
    h4: {
      fontFamily: 'Outfit, Arial, sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase', // Capitalize h3
    },
    h5: {
      fontFamily: 'Outfit, Arial, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Outfit, Arial, sans-serif',
      fontWeight: 600,
    },
  },
});

const ClientThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ color: 'black', minHeight: '100vh' }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default ClientThemeProvider;
