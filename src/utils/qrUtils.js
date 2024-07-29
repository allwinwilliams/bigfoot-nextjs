import QRCode from 'qrcode';

// Function to generate QR code from a given phrase as a Google search query
export const generateQRCodeForGoogleSearch = async (phrase, color = '#000000', size = 400) => {
  const url = `https://www.google.com/search?q=${encodeURIComponent(phrase)}`;
  try {
    const qrCodeUrl = await QRCode.toDataURL(url, {
      color: {
        dark: color,  // QR code color
        light: '#0000' // Transparent background
      },
      width: size, // Increase size
      margin: 0  // No margin
    });
    return qrCodeUrl;
  } catch (err) {
    console.error(err);
    return null;
  }
};
