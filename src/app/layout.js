import '../styles/globals.css';
import ClientThemeProvider from './ClientThemeProvider';
import Footer from '../components/Footer';
import { Container } from '@mui/material';
import AudioControl from '../components/AudioControl';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Bigfoot Clothing - Customised Song T-shirt - Made to Order - High Quality Oversized Tshirts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600&display=swap" rel="stylesheet" />
        <script src="https://checkout.razorpay.com/v1/magic-checkout.js"></script>

        <meta name="description" content="Bigfoot offers high-quality, customised song T-shirts made to order. Personalise your oversized T-shirts with your favourite songs, AI prompt, Emojis and other unique designs." />
        <meta name="keywords" content="Customised T-Shirts, Personalised Fashion, Song T-shirts, Personalised Clothing, Oversized T-shirts, High Quality T-shirts, Bigfoot Clothing, AI T-Shirts, Prompt to T-Shirt, Emoji T-Shirt, Customised Emojis T-Shirt, Personalised T-Shirts" />
        <meta name="author" content="Bigfoot" />


        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:title" content="Bigfoot - Customise T-shirts with Songs, Emojis or Prompt" />
        <meta property="og:description" content="Personalise your oversized T-shirts with your favourite songs, AI prompt, Emojis and other unique designs." />
        <meta property="og:image" content="https://bigfoot.land/og-banner.png" />
        <meta property="og:url" content="https://bigfoot.land" />
        <meta property="og:type" content="website" />
        
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
        <Container>
          <Footer />
        </Container>
        <AudioControl />
      </body>
    </html>
  );
}
