"use client";

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid } from '@mui/material';
import SongProductStaticContent from '../components/ProductStaticContent';
import CreateIcon from '@mui/icons-material/Create';
import AutoScrollCards from '@/components/SongTshirt/AutoScrollCards';
import Header from '@/components/Header';
import { Margin, Opacity } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';
import { keyframes } from '@mui/system';

import {handlePlayClick} from '../components/AudioControl';

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
    25% { transform: translate(5%, 2%); }
    40% { transform: translate(10%, 0); }
    65% { transform: translate(-10%, 10%); }
    80% { transform: translate(15%, 0); }
    90% { transform: translate(-10%, 0); }
    100% { transform: translate(0, 0); }
  `;

  const sampleData1 = [
    { imgUrl: '/song-tshirt/option/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/songtshirt?color=beige&size=M&songId=1D4PL9B8gOg78jiHg3FvBb&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/songtshirt?color=black&size=M&songId=7MJQ9Nfxzh8LPZ9e9u68Fq&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/songtshirt?color=black&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product/songtshirt?color=black&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product/songtshirt?color=black&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Sandstorm', description: 'Darude', link: '/product/songtshirt?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/songtshirt?color=beige&size=M&songId=3z8h0TU7ReDPLIbEnYhWZb&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Dynamite', description: 'BTS', link: '/product/songtshirt?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'In the End', description: 'Linkin Park', link: '/product/songtshirt?color=beige&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Billie Jean', description: 'Michael Jackson', link: '/product/songtshirt?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/songtshirt?color=beige&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Enter Sandman', description: 'Metallica', link: '/product/songtshirt?color=black&size=M&songId=5sICkBXVmaCQk5aISGR3x1&style=minimal' },
  ];
  
  const sampleData2 = [
    { imgUrl: '/song-tshirt/option/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/songtshirt?color=beige&size=M&songId=1D4PL9B8gOg78jiHg3FvBb&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/songtshirt?color=black&size=M&songId=7MJQ9Nfxzh8LPZ9e9u68Fq&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/songtshirt?color=black&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product/songtshirt?color=black&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product/songtshirt?color=black&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Sandstorm', description: 'Darude', link: '/product/songtshirt?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/songtshirt?color=beige&size=M&songId=3z8h0TU7ReDPLIbEnYhWZb&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Dynamite', description: 'BTS', link: '/product/songtshirt?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'In the End', description: 'Linkin Park', link: '/product/songtshirt?color=beige&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Billie Jean', description: 'Michael Jackson', link: '/product/songtshirt?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/songtshirt?color=beige&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Enter Sandman', description: 'Metallica', link: '/product/songtshirt?color=black&size=M&songId=5sICkBXVmaCQk5aISGR3x1&style=minimal' },
  ];
  
  const sampleData3 = [
    { imgUrl: '/song-tshirt/option/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/songtshirt?color=beige&size=M&songId=1D4PL9B8gOg78jiHg3FvBb&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/songtshirt?color=black&size=M&songId=7MJQ9Nfxzh8LPZ9e9u68Fq&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/songtshirt?color=black&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product/songtshirt?color=black&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product/songtshirt?color=black&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Sandstorm', description: 'Darude', link: '/product/songtshirt?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/songtshirt?color=beige&size=M&songId=3z8h0TU7ReDPLIbEnYhWZb&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Dynamite', description: 'BTS', link: '/product/songtshirt?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'In the End', description: 'Linkin Park', link: '/product/songtshirt?color=beige&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Billie Jean', description: 'Michael Jackson', link: '/product/songtshirt?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/songtshirt?color=beige&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Enter Sandman', description: 'Metallica', link: '/product/songtshirt?color=black&size=M&songId=5sICkBXVmaCQk5aISGR3x1&style=minimal' },
  ];

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
            animation: `${colorChange} 7s infinite, ${moveLight} 9s infinite`,
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
            animation: `${colorChange} 3s infinite, ${moveLight} 4s infinite`,
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
                      background: 'linear-gradient(0deg, #999999 0%, #FFFFFF 50%)',
                      backgroundSize: '600% 600%',
                      animation: 'backgroundMovement 4s ease infinite',  
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
                      document.querySelector('#the-range').scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Craft Yours Now
                  </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

      </Container>
      <AutoScrollCards 
        itemsRow1={sampleData1}
        itemsRow2={sampleData2}
        itemsRow3={sampleData3}
      />
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
          <Grid item xs={6} md={4}>
            <Link
              href="/product/songtshirt"
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/23/23849_149377-lq.mp3');
              }}  
            >
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
                  🎵 Style Your Song
                </Typography>
                <Typography variant="subtitle1">
                  Design with your favorite song.
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link 
              href="/product/prompt-generated-tshirt" 
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/23/23849_149377-lq.mp3');
              }}  
            >
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
                  🖌️ Draw with a Prompt
                </Typography>
                <Typography variant="subtitle1">
                  Your idea and style generated
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link
              href="/product/emoji-tshirt"
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/23/23849_149377-lq.mp3');
              }}
            >
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
                  😊 Express with Emojis
                </Typography>
                <Typography variant="subtitle1">
                  Design with emoji and short text
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link
              href="/product/basic-tshirt"
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/23/23849_149377-lq.mp3');
              }}
            >
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
                  🎨 Bigfoot The Brand
                </Typography>
                <Typography variant="subtitle1">
                  Make Bigfoot yours
                </Typography>
              </Box>
            </Link>
          </Grid>
          
          <Grid item xs={6} md={4}>
            <Box>
              <Box
                sx={{
                  transition: 'transform 0.8s',
                  opacity: 0.3,
                  '&:hover': {
                    transform: 'scaleX(-1)',
                    opacity: 0.6,
                  },
                }}
              >
                <img src="/landing-page/launch.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Launching soon
              </Typography>
              <Typography variant="subtitle1">
                Check within a few days
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box>
              <Box
                sx={{
                  transition: 'transform 0.8s',
                  opacity: 0.6,
                  '&:hover': {
                    transform: 'scaleX(-1)',
                    opacity: 1.0,
                  },
                }}
              >
                <img src="/landing-page/coming-soon.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                🧪 More Coming Soon
              </Typography>
              <Typography variant="subtitle1">
                Our lab is cooking...
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
