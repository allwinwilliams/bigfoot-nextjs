"use client";
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';

const SwipeCards = ({ 
    items = [
        { imgUrl: '/samples/song/5.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/song-tshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
        { imgUrl: '/samples/ai/8.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
        { imgUrl: '/samples/ai/6.png', title: 'A sunflower', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Sunflower&action=lying%20on%20a&location=a%20Forest&style=Van%20Gogh' },
    ]
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left', 'right', or null
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentItem = items[currentIndex];

  const handleNext = () => {
    if (isTransitioning) return;
    setSwipeDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      setSwipeDirection(null);
      setIsTransitioning(false);
    }, 300); // Duration matches the CSS transition duration
  };

  const handleCheck = () => {
    if (isTransitioning) return;
    setSwipeDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      window.open(currentItem.link, '_blank');
      setSwipeDirection(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleCheck,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Box
      {...handlers}
      sx={{
        textAlign: 'center',
        paddingY: 8,
        backgroundColor: '#F7F7F7',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          transition: 'opacity 0.3s ease',
          opacity: isTransitioning ? 0 : 1,
        }}
      >
        <Card
          sx={{
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            ...(swipeDirection === 'left' && {
              transform: 'translateX(-30px)',
              opacity: 0,
            }),
            ...(swipeDirection === 'right' && {
              transform: 'translateX(30px)',
              opacity: 0,
            }),
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              padding: 2,
              backgroundColor: '#fff',
              borderRadius: '16px',
            }}
          >
            <img
              src={currentItem.imgUrl}
              alt={currentItem.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              {currentItem.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentItem.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{
            borderRadius: '50%',
            minWidth: 56,
            minHeight: 56,
            transform: swipeDirection === 'left' ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          <CloseIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheck}
          sx={{
            borderRadius: '50%',
            minWidth: 56,
            minHeight: 56,
            transform: swipeDirection === 'right' ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          <CheckIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default SwipeCards;
