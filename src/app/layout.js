import '../styles/globals.css';
import { CustomiseProvider } from '../context/CustomiseProvider';
import ClientThemeProvider from './ClientThemeProvider';
import Footer from '../components/Footer';
import { Container } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Bigfoot Clothing - Customised Song T-shirt - Made to Order - High Quality Oversized Tshirts</title>
      </head>
      <body>
        <CustomiseProvider>
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </CustomiseProvider>
        <Container>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
