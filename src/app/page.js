"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid } from '@mui/material';
import SongProductStaticContent from '../components/ProductStaticContent';
import CreateIcon from '@mui/icons-material/Create';
import AutoScrollCards from '@/components/SongTshirt/AutoScrollCards';
import Header from '@/components/Header';
import { Margin, Opacity } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';
import { keyframes } from '@mui/system';


export default function HomePage() {

  const colorChange = keyframes`
    0% { background-color: red; }
    25% { background-color: yellow; }
    50% { background-color: green; }
    75% { background-color: blue; }
    100% { background-color: red; }
  `;

  const moveLight = keyframes`
    0% { transform: translate(0, 0); }
    25% { transform: translate(5%, 0); }
    40% { transform: translate(10%, 0); }
    65% { transform: translate(-10%, 0); }
    80% { transform: translate(15%, 0); }
    90% { transform: translate(-10%, 0); }
    100% { transform: translate(0, 0); }
  `;

  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = new Audio('https://cdn.pixabay.com/audio/2024/05/31/audio_dc85ea3a77.mp3');
      audio.volume = 0.05;
      audio.loop = true;
      audio.play().then(() => {
        console.log('Audio started playing');
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ position: 'fixed', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '50px', zIndex: 9999, pointerEvents: 'none' }}>
        <Box
          id="animated-light"
          sx={{
            width: '200%',
            height: '50px',
            borderRadius: '32px',
            filter: 'blur(16px)',
            position: 'absolute',
            animation: `${colorChange} 5s infinite, ${moveLight} 8s infinite`,
          }}
        ></Box>
        <Box
          id="animated-light2"
          sx={{
            width: '120%',
            height: '50px',
            borderRadius: '50%',
            filter: 'blur(24px)',
            position: 'absolute',
            animation: `${colorChange} 2s infinite, ${moveLight} 4s infinite`,
          }}
        ></Box>
      </Box>
      <Container sx={{ mt: 1 }}>
        <Header />
        <Box sx={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000000',
          borderRadius: 16
          }}>
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
              overflow: 'hidden',
              borderRadius: 16,
              zIndex: 0,
            }}
          >
            <source src="https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Paper elevation={4} sx={{
            padding: {md: 8, xs: 4},
            borderRadius: 4,
            mt: 2,
            boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ paddingTop: {md: 20, xs: 10} }}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/landing-page/song-banner.png"
                  alt="Custom T-shirt"
                  style={{ width: '150px', borderRadius: '16px' }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                  }}
                >
                  Make it your own
                </Typography>
                <Typography variant="subtitle2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textAlign: 'center',
                    mb: 4,
                    paddingX: {md: 8, xs: 2}
                  }}>
                  We wanted to share the joy of creation with our customers.
                  Imagine wearing your favorite song or a drawing you created with a prompt or anything like that.
                  Now you can! Bring your ideas to life with Bigfoot.
                </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    component={Link} 
                    href="#the-range" 
                    startIcon={<CreateIcon />}
                    sx={{ 
                      mt: 0, 
                      padding: 2, 
                      fontWeight: '600', 
                      fontFamily: 'Inter', 
                      textTransform: 'none',
                      borderRadius: 4,
                      width: '100%',
                      background: 'white',
                      justifyContent: 'center',
                      scrollBehavior: 'smooth',
                      background: 'linear-gradient(0deg, #999999 0%, #FFFFFF 50%)',
                      backgroundSize: '600% 600%',
                      animation: 'backgroundMovement 4s ease infinite',  
                    }} 
                  >
                    Craft Yours Now
                  </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

      </Container>
      <AutoScrollCards />
      <Box
        id="the-range"
        sx={{
          background: 'linear-gradient(to bottom, #f7f8fa, #AAAAAA)',
          padding: { md: 12, xs: 4 },
          marginY: 12,
          maxWidth: '1600px',
          marginX: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 8,
            color: '#ababab'
          }}>
          The Range
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6} md={2.4}>
            <Link href="/product/songtshirt" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.95,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/song.png" alt="Song customisation" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Customise with a Song
                </Typography>
                <Typography variant="subtitle1">
                  Select a song to visualise
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Link href="/product/ai-tshirt" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.90,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/ai.png" alt="AI customisation" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Draw with a prompt
                </Typography>
                <Typography variant="subtitle1">
                  You art, Your prompt
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Link href="/product/basic-tshirt" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.96,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/basic.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Bigfoot Basics
                </Typography>
                <Typography variant="subtitle1">
                  Way forward
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Link href="/product/emoji-tshirt" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.96,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/emoji.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Emoji Tshirt
                </Typography>
                <Typography variant="subtitle1">
                  Design with Emoji and short text
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} md={2.4} sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: { xs: 'center' } }}>
            <Box>
              <Box
                sx={{
                  transition: 'transform 0.8s',
                  opacity: 0.6,
                  '&:hover': {
                      transform: 'rotate(360deg)',
                      opacity: 1.0,
                  },
                }}
              >
                <img src="/landing-page/coming-soon.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                More...
              </Typography>
              <Typography variant="subtitle1">
                in our labs 🧪
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Container>
      <Box sx={{ position: 'relative', width: '100%', backgroundColor: '#000000', borderRadius: 8 }}>
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
          
          <source src="https://videos.pexels.com/video-files/4669695/4669695-uhd_2732_1440_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Paper elevation={4} sx={{
          padding: {md: 10, xs: 4},
          borderRadius: 4,
          mt: 4,
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}>
          <Grid container spacing={4} alignItems="righ" style={{zIndex: 999}}>
            <Grid item xs={12} md={6} sx={{zIndex: 1000}}>
              <img
                src="/landing-page/song-banner.png"
                alt="Custom T-shirt"
                style={{ 
                  width: '550px',
                  borderRadius: '16px',
                  // position: 'absolute',
                  bottom: '-60px', left: '-40px'  
                }}
              />
          </Grid>
            <Grid item xs={12} md={6}
            sx={{padding: 4}}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  my: 2,
                }}
              >
                Customise with Music.< br/>
                Choose from millions.
              </Typography>
              <Typography variant="subtitle2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, album art, or any design that represents the music you love. Our high-quality printing ensures that your custom T-shirt looks amazing and lasts long. Create a unique piece of clothing that speaks to your musical tastes and personality.
              </Typography>
              
              <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              href="/product/songtshirt" 
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
                width: '100%'
              }} 
            >
              Craft with Music
            </Button>
            </Grid>
          </Grid>
        </Paper>        
      </Box>    

      <Box sx={{ position: 'relative', width: '100%', backgroundColor: '#000000', borderRadius: 8, marginTop: 8 }}>
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
          <source src="https://videos.pexels.com/video-files/18069235/18069235-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Paper elevation={4} sx={{
          padding: {md: 8, xs: 4},
          paddingBottom: 1,
          borderRadius: 4,
          mt: 4,
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          // color: 'white',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          zIndex: 1,
        }}>
          <Grid container spacing={4} alignItems="center" style={{zIndex: 999}}>
            <Grid item xs={12} md={6}
            sx={{paddingX: 4}}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Draw with a prompt.<br/>
                Be imaginative.
              </Typography>
              <Typography variant="subtitle2"
              sx={{
                color: 'rgba(0, 0, 0, 0.8)'
              }}>
                Imagine anything. Make it alive with a simple prompt.
              </Typography>
              
              <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              href="/product/ai-tshirt" 
              startIcon={<CreateIcon />}
              sx={{ 
                mt: 4, 
                padding: 2, 
                fontWeight: 'bold', 
                fontFamily: 'Inter', 
                textTransform: 'none',
                borderRadius: 4,
                width: '100%'
              }} 
            >
              Start Imagining
            </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="/landing-page/ai-banner.png"
                alt="Custom T-shirt"
                style={{ width: '100%', borderRadius: '16px' }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>    
      
        <SongProductStaticContent/>
        <Paper elevation={1} sx={{ padding: 4, borderRadius: 4, mt: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src="/landing-page/song-banner.png"
                alt="Custom T-shirt"
                style={{ width: '100%', borderRadius: '16px' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Pick a song.<br/>
                Write a prompt.<br/>
                Click a button.<br/>
              </Typography>
              <Typography variant="subtitle2"
              sx={{
                color: 'rgba(0, 0, 0, 0.8)'
              }}>
                Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, or any design that represents the music you love.
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
                  width: '100%'
                }} 
              >
                Craft Your Own Tshirt
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
