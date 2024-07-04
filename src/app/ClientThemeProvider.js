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
      primary: '#000000', // Set text color to black
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif', // Set Inter as the default font
  },
});

const ClientThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default ClientThemeProvider;
