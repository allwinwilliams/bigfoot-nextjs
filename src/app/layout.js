"use client";

import '../styles/globals.css';
import ClientThemeProvider from './ClientThemeProvider';
import Footer from '../components/Footer';
import { Container, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeRounded'
import AudioControl from '../components/AudioControl';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>Bigfoot Clothing - Customised T-shirts with songs, emojis, AI and more - Made to Order - High Quality Oversized Tshirts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet"/>
        <script src="https://checkout.razorpay.com/v1/magic-checkout.js"></script>

        <meta charSet="UTF-8" />
        <meta name="description" content="Bigfoot offers high-quality, customised song T-shirts made to order. Personalise your oversized T-shirts with your favourite songs, AI prompt, Emojis and other unique designs. Made in India for the world." />
        <meta name="keywords" content="Customised T-Shirts, Personalised Fashion, Song T-shirts, Personalised Clothing, Oversized T-shirts, High Quality T-shirts, Bigfoot Clothing, AI T-Shirts, Prompt to T-Shirt, Emoji T-Shirt, Customised Emojis T-Shirt, Personalised T-Shirts, Unique Gifts, Customised Gifts, Personalised Gifts, Matching T-Shirts" />
        <meta name="author" content="Bigfoot" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="robots" content="max-image-preview:large"></meta>
        
        <meta property="og:title" content="Bigfoot - Customise T-shirts with Songs, Emojis or Prompt" />
        <meta property="og:description" content="Personalise your oversized T-shirts with your favourite songs, AI prompt, Emojis, Japanese script, and other unique designs." />
        <meta property="og:image" content="https://bigfoot.land/og-banner.png" />
        <meta property="og:url" content="https://bigfoot.land" />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
      <ClientThemeProvider>
        
            <Box>
              {children}
              <Container>
                <Footer />
              </Container>
              <AudioControl />
              <IconButton
              href='/'
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
              >
            
              <HomeIcon />
            </IconButton>
          </Box>           
          {/* <LanguageSwitcher />  */}
        
        <Analytics />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
