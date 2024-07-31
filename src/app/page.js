"use client";

import Link from 'next/link';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid } from '@mui/material';
import SongProductStaticContent from '../components/SongTshirt/SongProductStaticContent';
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
            <source src="/gradient-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Paper elevation={4} sx={{
            padding: 4,
            borderRadius: 16,
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
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  Customise your <nobr>T-shirt</nobr> with songs
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
        </Box>      

        </Container>
        <AutoScrollCards />
      
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #F2F2F2, #D9D9D9)',
          padding: 10,
          marginY: 16,
          maxWidth: '1600px',
          marginX: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            color: '#ababab'
          }}>
          The Range
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Link href="/product/songtshirt" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s, opacity 0.8s',
                    opacity: 0.95,
                    '&:hover': {
                      transform: 'scale(1.1)',
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
          <Grid item xs={12} md={4}>
            <Link href="/product/ai-tshirt" underline="none">
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s, opacity 0.8s',
                    opacity: 0.95,
                    '&:hover': {
                      transform: 'scale(1.1)',
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
          <Grid item xs={12} md={4}>
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
                  Coming Soon...
                </Typography>
                <Typography variant="subtitle1">
                  We are cooking something for you 🧪
                </Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Container>
      
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
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Customise your <nobr>T-shirt</nobr> with songs
              </Typography>
              <Typography variant="subtitle2"
              sx={{
                color: 'rgba(0, 0, 0, 0.8)'
              }}>
                Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, album art, or any design that represents the music you love. Our high-quality printing ensures that your custom T-shirt looks amazing and lasts long. Create a unique piece of clothing that speaks to your musical tastes and personality.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                href="/product" 
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
