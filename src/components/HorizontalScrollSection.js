import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import CreateIcon from '@mui/icons-material/Create';
import { useRef } from 'react';

const HorizontalScrollSection = () => {
  const scrollRef = useRef(null);

  // Function to handle vertical scroll and translate it to horizontal scrolling
  const handleScroll = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY; // Convert vertical scroll to horizontal scroll
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden', 
        overflowX: 'auto',
        position: 'relative' 
      }}
      onWheel={handleScroll}  // Capture vertical scroll and convert it to horizontal
    >
      {/* Horizontal scroll container */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          width: '300%', // Each section takes 60-80% of the viewport width, 3 sections
          height: '90vh',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar
          },
        }}
      >
        {/* Section 1 */}
        <Box
          sx={{
            flex: '0 0 30%', // 30% of the viewport width for each section
            position: 'relative',
            backgroundColor: '#000',
            borderRadius: 8,
            marginRight: 4, // Spacing between sections
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 16,
              zIndex: 0,
            }}
          >
            <source
              src="https://videos.pexels.com/video-files/4669695/4669695-uhd_2732_1440_25fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <Paper
            elevation={4}
            sx={{
              padding: { md: 10, xs: 4 },
              borderRadius: 4,
              mt: 4,
              boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}
          >
            <Grid container spacing={4} alignItems="center" sx={{ zIndex: 999 }}>
              <Grid item xs={12} md={6}>
                <img
                  src="/landing-page/song-banner.png"
                  alt="Custom T-shirt"
                  style={{
                    width: '550px',
                    borderRadius: '16px',
                    bottom: '-60px',
                    left: '-40px',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', my: 2 }}>
                  Customise with Music.<br />
                  Choose from millions.
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Imagine wearing your favorite song! Now you can customize your
                  T-shirt with lyrics, album art, or any design that represents
                  the music you love. Our high-quality printing ensures that your
                  custom T-shirt looks amazing and lasts long. Create a unique
                  piece of clothing that speaks to your musical tastes and
                  personality.
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="/product/song-tshirt"
                  startIcon={<CreateIcon />}
                  sx={{
                    mt: 4,
                    padding: 2,
                    fontWeight: 'bold',
                    fontFamily: 'Inter',
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #AD26FF 20%, #FF26CF 80%)',
                    backgroundSize: '400% 400%',
                    animation: 'backgroundMovement 4s ease infinite',
                    borderRadius: 4,
                    width: '100%',
                  }}
                >
                  Craft with Music
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Section 2 */}
        <Box
          sx={{
            flex: '0 0 30%',
            position: 'relative',
            backgroundColor: '#000',
            borderRadius: 8,
            marginRight: 4,
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 16,
              zIndex: 0,
            }}
          >
            <source
              src="https://videos.pexels.com/video-files/18069235/18069235-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <Paper
            elevation={4}
            sx={{
              padding: { md: 10, xs: 4 },
              borderRadius: 4,
              mt: 4,
              boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', my: 2, color: '#FFFFFF' }}
            >
              Draw with a prompt.<br />Be imaginative.
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              Imagine anything. Make it alive with a simple prompt.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/product/prompt-generated-tshirt"
              startIcon={<CreateIcon />}
              sx={{
                mt: 4,
                padding: 2,
                fontWeight: 'bold',
                fontFamily: 'Inter',
                textTransform: 'none',
                borderRadius: 4,
                width: '100%',
              }}
            >
              Start Imagining
            </Button>
          </Paper>
        </Box>

        {/* Section 3 */}
        <Box
          sx={{
            flex: '0 0 30%',
            position: 'relative',
            backgroundColor: '#000',
            borderRadius: 8,
            marginRight: 4,
          }}
        >
          <Paper
            elevation={1}
            sx={{ padding: 4, borderRadius: 4, mt: 4 }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <img
                  src="/landing-page/song-banner.png"
                  alt="Custom T-shirt"
                  style={{ width: '100%', borderRadius: '16px' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  You design.<br />
                  We develop.<br />
                  Take control of the design.
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgba(0, 0, 0, 0.8)' }}
                >
                  Imagine wearing your favorite song! Now you can customize your
                  T-shirt with lyrics, or any design that represents the music
                  you love.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="#the-range"
                  startIcon={<CreateIcon />}
                  sx={{
                    mt: 4,
                    padding: 2,
                    fontWeight: 'bold',
                    fontFamily: 'Inter',
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #fd1f4f 20%, #FF8E53 80%)',
                    backgroundSize: '400% 400%',
                    animation: 'backgroundMovement 4s ease infinite',
                    borderRadius: 4,
                    width: '100%',
                  }}
                >
                  Craft Your Own Tshirt
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HorizontalScrollSection;