import React, { useState } from 'react';
import { Button, Tooltip, CircularProgress } from '@mui/material';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
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
        return;
      }
  
      // Create a temporary canvas to draw the original canvas onto
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext('2d');
  
      // Fill the temporary canvas with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  
      // Draw the original canvas onto the temporary canvas
      ctx.drawImage(canvas, 0, 0);
  
      // Export the temporary canvas as a JPEG image
      const dataUrl = tempCanvas.toDataURL('image/jpeg', 1.0); // 1.0 is the highest quality
      if (!dataUrl) {
        throw new Error('Failed to get canvas data');
      }
  
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'custom-tshirt.jpeg', { type: 'image/jpeg' });
  
      // Upload to Firebase Storage
      const timestamp = Date.now();
      const storageRef = ref(storage, `shared-tshirts/tshirt-${timestamp}.jpeg`);
      await uploadString(storageRef, dataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);
  
      // Prepare share data
      const shareData = {
        title: 'Check out this T-Shirt',
        text: 'I customised this T-Shirt!! Check it out:',
        url: imageUrl,
        files: [file], // Include the captured file for mobile sharing
      };
  
      // Use navigator.share if available
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share(shareData);
        console.log('Thanks for sharing!');
      } else if (navigator.share) {
        navigator.share({
          title: 'Check out this T-Shirt',
          text: 'I customised this T-Shirt!! Check it out:',
          url: window.location.href,
        })
          .then(() => {
            console.log('Thanks for sharing!');
          })
          .catch((error) => {
            console.error('Error sharing:', error);
          });
        console.log('Share without image!');
      } else {
        // Fallback: copy the image URL to the clipboard
        navigator.clipboard.writeText(imageUrl);
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
