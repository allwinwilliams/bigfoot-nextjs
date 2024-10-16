import React, { useState } from 'react';
import { Button, Tooltip, CircularProgress } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ShareIcon from '@mui/icons-material/IosShare';

const ShareButton = ({ canvasId = 'three-canvas', storage }) => {
  const [shareLoading, setShareLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleShare = async () => {
    setShareLoading(true);
    try {
      const canvas = document.querySelector(`#${canvasId} canvas`);
      
      if (!canvas) {
        console.error('Canvas not found');
        setShareLoading(false);
        return;
      }

      // Ensure we have the WebGL2 rendering context, not 2D
      const context = canvas.getContext('webgl2');
      if (!context) {
        console.error('Failed to get WebGL2 context. Ensure three.js is using WebGL.');
        setShareLoading(false);
        return;
      }

      // Use toDataURL to capture the current frame of the WebGL canvas
      const dataUrl = canvas.toDataURL('image/png');

      // Convert the data URL to a blob for sharing as a file
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create a file object from the blob
      const file = new File([blob], 'custom-tshirt.png', { type: 'image/png' });

      // Upload to Firebase Storage
      const timestamp = Date.now();
      const storageRef = ref(storage, `shared-tshirts/tshirt-${timestamp}.png`);
      await uploadBytes(storageRef, file); // Using uploadBytes for file uploads
      const imageUrl = await getDownloadURL(storageRef);

      // Prepare share data with file and URL (current page URL)
      const shareData = {
        title: 'Check out this T-Shirt',
        text: 'I customised this T-Shirt!! Check it out:',
        url: window.location.href, // Use the current page URL
        files: [file], // Include the captured file
      };

      // Use navigator.share if available (mobile sharing)
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share(shareData);
        console.log('Thanks for sharing!');
      } else {
        // Fallback: copy the image URL to the clipboard
        navigator.clipboard.writeText(imageUrl); // Copy the image URL to clipboard
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 2000);
      }

    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setShareLoading(false);
    }
  };

  return (
    <Tooltip title="URL copied" open={tooltipOpen} arrow>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        sx={{
          padding: '12px',
          fontWeight: 'bold',
          borderRadius: '16px',
          textTransform: 'none',
        }}
        onClick={handleShare}
        disabled={shareLoading}
        startIcon={shareLoading ? <CircularProgress size={16} /> : <ShareIcon />}
      >
        {shareLoading ? 'Sharing...' : 'Share Now'}
      </Button>
    </Tooltip>
  );
};

export default ShareButton;
