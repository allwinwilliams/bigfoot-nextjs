import React from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';

// Dummy content array for the example
const testimonials_list = [
  {
    imgUrl: '/landing-page/testimonials/ashin.jpeg',
    text: 'Super Cool.. Fabric is really soft and I can wear my song now.',
    name: 'Ashin',
    location: 'Bangalore, India',
  },
  {
    imgUrl: '/landing-page/testimonials/allwin.png',
    text: 'This is a nice concept and I got it within 2 days.',
    name: 'Ravi',
    location: 'Mumbai, India',
  },
  {
    imgUrl: '/landing-page/testimonials/harsha.jpeg',
    text: 'This is cool man. Nice one.',
    name: 'Harsha',
    location: 'Bangalore, India',
  },
  {
    imgUrl: '/landing-page/testimonials/vishnu.jpeg',
    text: 'The song I really love is something I can wear now for parties.',
    name: 'Vishnu',
    location: 'Chennai, India',
  },
];

const TestimonialSection = ({ testimonials = testimonials_list }) => {
  return (
    <Box sx={{ padding: 0, textAlign: 'center', my: 8, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom>
        Stories from our community
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: '30px' }}>
        Hear from our customers
      </Typography>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: 4 }}>
        {/* Left Arrow */}
        <IconButton
          onClick={() => {
            const scrollElement = document.getElementById('testimonial-scroll');
            scrollElement.scrollBy({ left: -300, behavior: 'smooth' });
          }}
          sx={{
            position: 'absolute',
            left: 8,
            zIndex: 1,
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#222222',
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        {/* Testimonial Items */}
        <Box
          id="testimonial-scroll"
          sx={{
            display: 'flex',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // marginLeft: 8,
            padding: 4,
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          ref={(el) => {
            if (el) {
              el.scrollLeft = 32;
            }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Box
              key={index}
              sx={{
                minWidth: '320px',
                maxWidth: '320px',
                marginX: 2,
                scrollSnapAlign: 'start',
                backgroundColor: '#ffffff',
                padding: '16px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              }}
            >
              <Box
                component="img"
                src={testimonial.imgUrl}
                alt={`Testimonial from ${testimonial.name}`}
                sx={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <Typography variant="body1" sx={{ marginTop: '16px', marginBottom: '8px' }}>
                "{testimonial.text}"
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {testimonial.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {testimonial.location}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
        onClick={() => {
          const scrollElement = document.getElementById('testimonial-scroll');
          scrollElement.scrollBy({ left: 300, behavior: 'smooth' });
        }}
          sx={{
            position: 'absolute',
            right: 8,
            zIndex: 1,
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#222222',
            },
          }}
        >
        <ChevronRight />
      </IconButton>
      </Box>
    </Box>
  );
};

export default TestimonialSection;
