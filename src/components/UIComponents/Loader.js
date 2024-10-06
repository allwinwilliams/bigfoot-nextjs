import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

export default function Loader() {
  const frameWidth = 256;
  const frameHeight = 300;
  const frameCount = 31;
  const animationDuration = frameCount * 100;
  const totalSpriteWidth = frameWidth * frameCount;

  // Define the keyframes for the animation
  const playAnimation = keyframes`
    from { background-position: 0 0; }
    to { background-position: -${totalSpriteWidth - frameWidth}px 0; }
  `;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            backgroundImage: 'url(/loading-sprite.png)', // Update the path to your sprite image
            backgroundRepeat: 'no-repeat',
            borderRadius: 4,
            backgroundSize: `${totalSpriteWidth}px ${frameHeight}px`,
            animation: `${playAnimation} ${animationDuration}ms steps(${frameCount - 1}) infinite`,
          }}
        />
        <Typography variant="h6" sx={{ pt: 2 }}>
          Crafting your experience
        </Typography>
      </Box>
    </Box>
  );
}
