"use client";

import NextLink from 'next/link';
import { useRef, useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid, Link } from '@mui/material';
import SongProductStaticContent from '../components/ProductStaticContent';
import CreateIcon from '@mui/icons-material/Create';
import AutoScrollCards from '@/components/AutoScrollCards';
import Header from '@/components/Header';
import { Margin, Opacity } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';
import { keyframes } from '@mui/system';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrintIcon from '@mui/icons-material/Print';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Marquee from "react-fast-marquee";

export default function HomePage() {

  const audioControlRef = useRef(null);

  const handlePlayClick = (url = 'https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3') => {
    if (audioControlRef.current) {
      audioControlRef.current.handlePlayClick(url);
    }
  };

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
    { imgUrl: '/samples/song/5.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/song-tshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
    { imgUrl: '/samples/ai/1.png', title: 'Bigfoot', description: 'reading in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=reading%20a%20book&location=a%20Mountain&style=Van%20Gogh' },
    { imgUrl: '/samples/song/6.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/song-tshirt?color=black&size=M&songId=5Z01UMMf7V1o0MzF86s6WJ&style=analysis' },
    { imgUrl: '/samples/emoji/1.png', title: '🍣', description: 'すし、ください。', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e0-6-sushi&text=%E3%81%99%E3%81%97%E3%80%81%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82' },
    { imgUrl: '/samples/basic/2.png', title: 'Basic', description: 'Glass', link: '/product/basic-tshirt?color=beige&size=M&style=head' },
    { imgUrl: '/samples/song/3.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/song-tshirt?color=beige&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=drilldown' },
    { imgUrl: '/samples/ai/8.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
    
    { imgUrl: '/samples/ai/6.png', title: 'A sunflower', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Sunflower&action=lying%20on%20a&location=a%20Forest&style=Van%20Gogh' },
    { imgUrl: '/samples/basic/7.png', title: 'Basic', description: '16X16', link: '/product/basic-tshirt?color=black&size=M&style=pixel' },
    { imgUrl: '/samples/song/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/song-tshirt?color=black&size=M&songId=6l8GvAyoUZwWDgF1e4822w&style=analysis' },
    { imgUrl: '/samples/emoji/3.png', title: '🚬', description: 'no smoking', link: '/product/emoji-tshirt?color=white&size=M&style=badge&slug=e0-6-cigarette&text=no+smoking' },
    { imgUrl: '/samples/basic/4.png', title: 'Basic', description: 'Face', link: '/product/basic-tshirt?color=beige&size=M&style=tip' },
    { imgUrl: '/samples/song/12.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/song-tshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
    
  ];
  
  const sampleData2 = [
    { imgUrl: '/samples/song/11.png', title: 'Billie Jean', description: 'Michael Jackson', link: '/product/song-tshirt?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
    { imgUrl: '/samples/emoji/2.png', title: '🐮', description: 'moooooooooooooo', link: '/product/emoji-tshirt?color=beige&size=M&style=tiny&slug=e0-6-cow-face&text=moooooooooooooo' },
    { imgUrl: '/samples/ai/3.png', title: 'Strawberry', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Strawberry&action=lying%20on%20a&location=a%20Forest&style=Comics' },
    { imgUrl: '/samples/ai/4.png', title: 'A cat', description: 'lying in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20cat&action=lying%20on%20a&location=a%20Mountain&style=Monet' },
    { imgUrl: '/samples/song/2.png', title: 'Dynamite', description: 'BTS', link: '/product/song-tshirt?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=drilldown' },
    { imgUrl: '/samples/emoji/4.png', title: '🇵🇸', description: '', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e2-0-flag-palestinian-territories&text=' },
    { imgUrl: '/samples/emoji/6.png', title: '🍑', description: 'beach vacation', link: '/product/emoji-tshirt?color=beige&size=M&style=tiny&slug=e0-6-peach&text=beach+vacation' },
    { imgUrl: '/samples/song/9.png', title: 'Sandstorm', description: 'Darude', link: '/product/song-tshirt?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=concert' },
    { imgUrl: '/samples/emoji/7.png', title: '🛕', description: 'mandir yahi banega', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e12-0-hindu-temple&text=mandir+yahi+banega' },
    { imgUrl: '/samples/basic/1.png', title: 'Basic', description: 'Glass', link: '/product/basic-tshirt?color=black&size=M&style=head' },
    { imgUrl: '/samples/ai/7.png', title: 'A robot', description: ' painting in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Robot&action=painting&location=a%20Mountain&style=Comics' },
    { imgUrl: '/samples/basic/5.png', title: 'Basic', description: 'Loading...', link: '/product/basic-tshirt?color=black&size=M&style=loading' },
  ];
  
  const sampleData3 = [
    { imgUrl: '/samples/song/7.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product/song-tshirt?color=beige&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
    { imgUrl: '/samples/basic/6.png', title: 'Basic', description: 'Loading...', link: '/product/basic-tshirt?color=white&size=M&style=loading' },
    { imgUrl: '/samples/song/10.png', title: 'In the End', description: 'Linkin Park', link: '/product/song-tshirt?color=black&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=minimal' },
    { imgUrl: '/samples/basic/8.png', title: 'Basic', description: '16X16', link: '/product/basic-tshirt?color=beige&size=M&style=pixel' },
    { imgUrl: '/samples/emoji/5.png', title: '🌈', description: '', link: '/product/emoji-tshirt?color=black&size=M&style=badge&slug=e0-6-rainbow&text=' },
    { imgUrl: '/samples/ai/2.png', title: 'Bigfoot', description: 'dancing in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=dancing&location=a%20Mountain&style=Madhubani%20Painting%20Art%20in%20bright%20colors%20from%20Bihar,%20India' },
    { imgUrl: '/samples/song/8.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product/song-tshirt?color=beige&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=concert' },
    { imgUrl: '/samples/ai/5.png', title: 'Bigfoot', description: 'walking in Mumbai', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=walking%20on%20a&location=Mumbai&style=Comics' },
    { imgUrl: '/samples/song/4.png', title: 'Enter Sandman', description: 'Metallica', link: '/product/song-tshirt?color=black&size=M&songId=3VqHuw0wFlIHcIPWkhIbdQ&style=concert' },
    { imgUrl: '/samples/basic/3.png', title: 'Basic', description: 'Face', link: '/product/basic-tshirt?color=black&size=M&style=tip' },
    { imgUrl: '/samples/ai/9.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
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
      <Box 
        sx={{
          width: '100%',
          backgroundColor: '#000',
          paddingY: 1.2,
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Marquee gradient={false} speed={40}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mx: 2 }}>
            {/* <WhatsAppIcon sx={{ color: '#fff', marginRight: 1 }} /> */}
            <Typography variant="h6" sx={{ color: '#fff' }}>
              FOR FURTHER CUSTOMISATIONS AND GROUP ORDERS, CONTACT 87549 68346
            </Typography>
            <FiberManualRecordIcon sx={{ color: '#fff', fontSize: 8, mx: 1 }} />
            {/* <PrintIcon sx={{ color: '#fff', marginRight: 1 }} /> */}
            <Typography variant="h6" sx={{ color: '#fff' }}>
              CUSTOM T-SHIRT PRINTING
            </Typography>
            <FiberManualRecordIcon sx={{ color: '#fff', fontSize: 8, mx: 1 }} />
            {/* <LocalShippingIcon sx={{ color: '#fff', marginRight: 1 }} /> */}
            <Typography variant="h6" sx={{ color: '#fff' }}>
              FREE DELIVERY
            </Typography>
            <FiberManualRecordIcon sx={{ color: '#fff', fontSize: 8, mx: 1 }} />
          </Box>
        </Marquee>
      </Box>
      <Header />
      <Container>
        <Box sx={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000000',
          borderRadius: 4
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
            mt: 1,
            boxShadow: '0 0 24px rgba(0, 0, 0, 0.12)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ paddingTop: {md: 16, xs: 8} }}>
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
                  Express yourself with personalised fashion
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
                      handlePlayClick('https://cdn.freesound.org/previews/107/107789_1727136-lq.mp3');
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
      
      <Box
        id="the-range"
        sx={{
          background: 'linear-gradient(to bottom, #f7f8fa, #F1F1F1)',
          paddingX: { md: 12, xs: 4 },
          paddingY: 16,
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
          Explore the range
        </Typography>
        <Grid container spacing={2} sx={{my: 8}}>
          <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
            <Link
              LinkComponent={NextLink}
              href="/product/song-tshirt"
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/387/387533_3829977-lq.mp3');
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/song.png" alt="Song T-Shirt Product image. Customised T-Shirt with Songs." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Style Your Song
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Design with your favorite song
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
            <Link
              LinkComponent={NextLink} 
              href="/product/prompt-generated-tshirt" 
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/396/396757_5675578-lq.mp3', 0.3);
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/ai.png" alt="AI generated T-Shirt Product image. Customised T-Shirt with AI prompt." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Paint with Prompt
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Your idea and style generated
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
            <Link
              LinkComponent={NextLink}
              href="/product/emoji-tshirt"
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/528/528007_8033171-lq.mp3', 0.4);
              }}
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/emoji.png" alt="Emoji T-Shirt Product image. Customisable T-Shirts with Emojis." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  😊 Express with Emojis
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Design with emoji and short text
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
            <Link
              LinkComponent={NextLink}
              href="/product/basic-tshirt"
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/335/335217_5899312-lq.mp3', 0.2);
              }}
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.8s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/basic.png" alt="T-Shirt Product image. Customised T-Shirts." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Bigfoot Basics
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  From Bigfoot The Brand
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
            <Link
              LinkComponent={NextLink} 
              href="/product/dictionary-tshirt" 
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/396/396757_5675578-lq.mp3', 0.3);
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/dictionary.png" alt="AI generated T-Shirt Product image. Customised T-Shirt with AI prompt." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Dictionary of whatever
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Find meaning of anyword
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
            <Link
              LinkComponent={NextLink} 
              href="/product/japanese-tshirt" 
              underline="none"
              onClick={(e) => {
                handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
              }}
              onMouseEnter={() => {
                handlePlayClick('https://cdn.freesound.org/previews/396/396757_5675578-lq.mp3', 0.3);
              }}  
            >
              <Box>
                <Box
                  sx={{
                    transition: 'transform 0.9s, opacity 0.4s',
                    opacity: 0.98,
                    '&:hover': {
                      transform: 'scale(1.2)',
                      opacity: 1.0,
                    },
                  }}
                >
                  <img src="/landing-page/japanese.png" alt="AI generated T-Shirt Product image. Customised T-Shirt with AI prompt." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Japanese Style
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Turn any word into japanese
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
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
                onMouseEnter={() => {
                  handlePlayClick('https://cdn.freesound.org/previews/394/394426_5121236-lq.mp3');
                }}  
              >
                <img src="/landing-page/launch.png" alt="T-Shirt Product image. More coming soon." style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Launching soon
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                Check within a few days
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={6} md={3} sx={{mx: 'auto'}}>
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
                onMouseEnter={() => {
                  handlePlayClick('https://cdn.freesound.org/previews/394/394426_5121236-lq.mp3');
                }}  
              >
                <img src="/landing-page/coming-soon.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                More Coming Soon
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                Our lab is cooking 🧪...
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
      <AutoScrollCards 
        itemsRow1={sampleData1}
        itemsRow2={sampleData2}
        itemsRow3={sampleData3}
      />
      <Container>
      <Box sx={{ position: 'relative', width: '100%', backgroundColor: '#000000', borderRadius: 8, mt: 24 }}>
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
              href="/product/prompt-generated-tshirt" 
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
                You design.
                We develop.<br/>
                Take control of the design.<br/>
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
