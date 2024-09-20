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

        const isVideo = card.image.endsWith('.mp4'); // Check if the URL is a video

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
                width: '100%', // Ensure the box takes full width of the parent link
                paddingBottom: aspectRatio, // Set aspect ratio dynamically
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {isVideo ? (
                <video
                  src={card.image} // Use video URL
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ensure the video fills the card
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${card.image})`, // Use image URL
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

              <Typography
                variant="h6"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
                }}
              >
                {card.title}
              </Typography>
            </Box>
          </MUILink>
        );
      })}
    </Box>
  );
};

export default GallerySection;
