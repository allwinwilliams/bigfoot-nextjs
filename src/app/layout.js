import '../styles/globals.css';
import ClientThemeProvider from './ClientThemeProvider';
import Footer from '../components/Footer';
import { Container } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Bigfoot Clothing - Customised Song T-shirt - Made to Order - High Quality Oversized Tshirts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600&display=swap" rel="stylesheet" />
        <script src="https://checkout.razorpay.com/v1/magic-checkout.js"></script>
      </head>
      <body>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
        <Container>
          <Footer />
        </Container>
      </body>
    </html>
  );
}