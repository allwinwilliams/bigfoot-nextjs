import React from 'react';
import { Box, Typography, Link as MUILink } from '@mui/material';

const GallerySection = ({ cards }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 2,
        width: '100%',
        mt: 8,
      }}
    >
      {cards.map((card, index) => {
        const aspectRatio = card.aspectRatio || '66.66%'; // Default aspect ratio
        const width = card.width || '25%'; // Default width

        // Check if it's a video or text card
        const isVideo = card.image?.endsWith('.mp4');
        const isTextCard = card.isTextCard;

        return (
          <MUILink
            key={index}
            href={card.url}
            underline="none"
            sx={{ width: width, display: 'block' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingBottom: aspectRatio,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: isTextCard ? 'black' : 'transparent', // Black background for text card
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {isVideo ? (
                <video
                  src={card.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              ) : isTextCard ? (
                <Typography
                  variant="h2"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '80%',
                    width: '90%',
                    transform: 'translate(-80%, -50%)',
                    textAlign: 'left',
                    fontSize: '1.4rem',
                    lineHeight: '1',
                    fontWeight: 'bold',
                    background: `linear-gradient(90deg, #ff7a18, #af002d 25%, #319197 50%, #fbd72b 75%, #ff7a18)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% auto',
                    animation: 'gradient 3s linear infinite',
                  }}
                >
                  {card.text}
                </Typography>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transition: 'background-image 0.3s ease-in-out',
                    '&:hover': {
                      backgroundImage: `url(${card.hoverImage})`,
                    },
                  }}
                />
              )}
            </Box>
          </MUILink>
        );
      })}
    </Box>
  );
};

export default GallerySection;
