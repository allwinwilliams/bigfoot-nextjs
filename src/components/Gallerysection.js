import React from 'react';
import { Box, Typography, Link as MUILink } from '@mui/material';

const GallerySection = ({ cards }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 1.5,
        width: '100%',
        mt: 8,
      }}
    >
      {cards.map((card, index) => {
        const aspectRatio = card.aspectRatio || '66.66%'; // Default aspect ratio
        const width = card.width || '25%'; // Default width

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
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out, background-image 0.3s ease-in-out',
                '&:hover': {
                  backgroundImage: `url(${card.hoverImage})`,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
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
