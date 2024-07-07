"use client";

import Link from 'next/link';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid } from '@mui/material';
import SongProductStaticContent from '../components/SongProductStaticContent';
import CreateIcon from '@mui/icons-material/Create';

export default function HomePage() {
  // Array of objects with image url, title, description, and link
  const items = [
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'By Micheal Jackson', link: '/product?color=black&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type1' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type2' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=black&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type3' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type1' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type2' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type3' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=black&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type1' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=black&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=type1' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container sx={{ mt: 8 }}>
      <Box 
        sx={{
          paddingY: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src='/logo.png'
          alt='Bigfoot Logo'
          style={{ width: 48, marginBottom: 8 }}
        />
        <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Bigfoot Clothing
        </Typography>
        <Typography variant="body1" gutterBottom>
          Conceptual Luxury Casuals
        </Typography>
      </Box>
        <Paper elevation={4} sx={{
          padding: 4,
          borderRadius: 4,
          mt: 4,
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(144deg, #000511, #0f0f0f, #5e1ffd)',
          backgroundSize: '400% 400%',
          animation: 'backgroundMovement 7s ease infinite',  
        }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src="/song-tshirt/customised-banner.jpg"
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
                Customise your T-shirt with your favorite song
              </Typography>
              <Typography variant="subtitle1">
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
        {/* New Section with Cards */}
        <Box sx={{marginX: 'auto', marginTop: 4}}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Thousands of options to choose from.. Make it truly yours..
            </Typography>
        </Box>
        <Box
          sx={{
            mt: 4,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            '&:hover .scrollable-card': {
              animationPlayState: 'paused',
            },
            padding: 2,
          }}
        >
          
          {items.map((item, index) => (
            <Card
                key={index}
                className="scrollable-card"
                component={Link}
                href={item.link}
                sx={{
                  display: 'inline-block',
                  width: 350,
                  marginRight: 3,
                  animation: 'scroll 8s linear infinite',
                  '&:hover': {
                    animationPlayState: 'paused',
                  },
                  padding: 2,
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)', // Softer shadow
                  borderRadius: 4, // Optional: to make corners softer
                }}
              >
              <CardMedia
                component="img"
                height="200"
                image={item.imgUrl}
                alt={item.title}
                sx={{borderRadius: 2}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
          
        </Box>
        <Box
          sx={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            '&:hover .scrollable-card': {
              animationPlayState: 'paused',
            },
            padding: 2,
          }}
        >
          
          {items.map((item, index) => (
            <Card
                key={index}
                className="scrollable-card"
                component={Link}
                href={item.link}
                sx={{
                  display: 'inline-block',
                  width: 350,
                  marginRight: 3,
                  animation: 'scroll 8s linear infinite',
                  '&:hover': {
                    animationPlayState: 'paused',
                  },
                  padding: 2,
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.1)', // Softer shadow
                  borderRadius: 4, // Optional: to make corners softer
                }}
              >
              <CardMedia
                component="img"
                height="200"
                image={item.imgUrl}
                alt={item.title}
                sx={{borderRadius: 2}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
          
        </Box>
        <Container>
          <SongProductStaticContent/>
          <Paper elevation={4} sx={{ padding: 4, borderRadius: 2, mt: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <img
                  src="/song-tshirt/customised-banner.jpg"
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
                  Customise your T-shirt with your favorite song
                </Typography>
                <Typography variant="subtitle1">
                  Imagine wearing your favorite song! Now you can customize your T-shirt with lyrics, album art, or any design that represents the music you love. Our high-quality printing ensures that your custom T-shirt looks amazing and lasts long. Create a unique piece of clothing that speaks to your musical tastes and personality.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  href="/product" 
                  startIcon={<CreateIcon />}
                  sx={{ 
                    mt: 2, 
                    padding: 2, 
                    fontWeight: 'bold', 
                    fontFamily: 'Inter', 
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #fd1f4f 30%, #5e1ffd 90%)',
                    borderRadius: 4,
                  }} 
                >
                  Craft Your Tshirt Now!
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
        
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </Box>
  );
}
