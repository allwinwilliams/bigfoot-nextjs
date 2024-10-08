"use client";

import '../styles/globals.css';
import ClientThemeProvider from './ClientThemeProvider';
import Footer from '../components/Footer';
import { Container, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeRounded';
import AudioControl from '../components/AudioControl';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script';
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Bigfoot Clothing - Customised T-shirts with songs, emojis, AI and more - Made to Order - High Quality Oversized Tshirts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet"/>
        <script src="https://checkout.razorpay.com/v1/magic-checkout.js"></script>
        
        
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-57V54XDL');
            `,
          }}
        />
        
        
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
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-57V54XDL"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
        <ClientThemeProvider>
          <Box>
            {children}
            {!pathname.startsWith('/product/') && (
              <Container>
                <Footer />
              </Container>
            )}
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
        
        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M1G9TEZ19C"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M1G9TEZ19C');
            `,
          }}
        />
      </body>
    </html>
  );
}
