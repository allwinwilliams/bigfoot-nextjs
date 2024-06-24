import '../styles/globals.css';
import { CustomiseProvider } from '../context/CustomiseProvider';
import ClientThemeProvider from './ClientThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        <CustomiseProvider>
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </CustomiseProvider>
      </body>
    </html>
  );
}
