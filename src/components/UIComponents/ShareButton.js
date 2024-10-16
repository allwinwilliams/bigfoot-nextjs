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

      // Ensure the WebGL context is preserved
      const dataUrl = canvas.toDataURL('image/png');
      if (!dataUrl) {
        throw new Error('Failed to get canvas data');
      }

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'custom-tshirt.png', { type: 'image/png' });

      // Upload to Firebase Storage
      const timestamp = Date.now();
      const storageRef = ref(storage, `shared-tshirts/tshirt-${timestamp}.png`);
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
