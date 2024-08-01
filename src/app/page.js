"use client";

import Link from 'next/link';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid } from '@mui/material';
import SongProductStaticContent from '../components/ProductStaticContent';
import CreateIcon from '@mui/icons-material/Create';
import AutoScrollCards from '@/components/SongTshirt/AutoScrollCards';
import Header from '@/components/Header';
import { Margin, Opacity } from '@mui/icons-material';
export default function HomePage() {
  // Array of objects with image url, title, description, and link  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container sx={{ mt: 2 }}>
        <Header />
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
            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ paddingTop: {md: 20, xs: 12} }}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/song-tshirt/customised-banner.png"
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
                  }}>
                  Imagine wearing your favorite song or a drawing you created with a prompt or anything like that. <br /> Now you can!
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
                      fontWeight: 'bold', 
                      fontFamily: 'Inter', 
                      textTransform: 'none',
                      borderRadius: 4,
                      width: '100%',
                      justifyContent: 'center',
                      scrollBehavior: 'smooth'
                    }} 
                  >
                    Craft Yours
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
          background: 'linear-gradient(to bottom, #FAFAFA, #D9D9D9)',
          padding: {md: 12, xs: 4},
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
          <Grid item xs={6} md={3}>
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
          <Grid item xs={6} md={3}>
            <Link href="/product/ai-tshirt" underline="none">
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
          <Grid item xs={6} md={3}>
            <Link href="#" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.4,
                  }}
                >
                  <img src="/landing-page/basic.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Coming Soon
                </Typography>
                <Typography variant="subtitle1">
                  Way forward
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3}>
            <Link href="#" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.4,
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
            </Link>
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
          padding: 4,
          borderRadius: 4,
          mt: 4,
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}>
          <Grid container spacing={4} alignItems="center" style={{zIndex: 999}}>
            <Grid item xs={12} md={6}>
              <img
                src="/song-tshirt/customised-banner.png"
                alt="Custom T-shirt"
                style={{ width: '100%', borderRadius: '16px' }}
              />
            </Grid>
            <Grid item xs={12} md={6}
            sx={{paddingX: 2}}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
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
          <source src="https://videos.pexels.com/video-files/18069235/18069235-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Paper elevation={4} sx={{
          padding: 4,
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
              href="/product/songtshirt" 
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
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 4, mt: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src="/song-tshirt/customised-banner.png"
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
