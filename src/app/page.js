"use client";

import Link from 'next/link';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid } from '@mui/material';
import SongProductStaticContent from '../components/SongTshirt/SongProductStaticContent';
import CreateIcon from '@mui/icons-material/Create';
import AutoScrollCards from '@/components/SongTshirt/AutoScrollCards';
import Header from '@/components/Header';
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
        <Box sx={{ position: 'relative', width: '100%', backgroundColor: '#000000', borderRadius: 16 }}>
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
            borderRadius: 4,
            mt: 4,
            boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to ensure text visibility
            zIndex: 1, // Ensure Paper is above the video
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
      
        <AutoScrollCards />
      
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
