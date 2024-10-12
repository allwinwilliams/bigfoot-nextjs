"use client";

import NextLink from 'next/link';
import { useRef, useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Card, CardMedia, CardContent, Grid, Link } from '@mui/material';
import ProductStaticContent from '@/components/ProductStaticContent';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import BrushIcon from '@mui/icons-material/Brush';
import VideoIcon from '@mui/icons-material/PlayCircleOutline';
import AutoScrollCards from '@/components/UIComponents/AutoScrollCards';
import Header from '@/components/UIComponents/Header';
import { AspectRatio, Margin, Opacity } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';
import { keyframes } from '@mui/system';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrintIcon from '@mui/icons-material/Print';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Marquee from "react-fast-marquee";
import GallerySection from '@/components/Gallerysection';
import FreeGiftComponent from '@/components/FreeGiftComponent';
import TestimonialSection from '@/components/UIComponents/TestimonialSection';

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
    { imgUrl: '/samples/mockups/song/minimal/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/song-tshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
    { imgUrl: '/samples/mockups/song/minimal/2.png', title: 'Bigfoot', description: 'reading in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=reading%20a%20book&location=a%20Mountain&style=Van%20Gogh' },
    { imgUrl: '/samples/mockups/song/minimal/3.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/song-tshirt?color=black&size=M&songId=5Z01UMMf7V1o0MzF86s6WJ&style=analysis' },
    { imgUrl: '/samples/mockups/song/minimal/4.png', title: '🍣', description: 'すし、ください。', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e0-6-sushi&text=%E3%81%99%E3%81%97%E3%80%81%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82' },
    { imgUrl: '/samples/mockups/song/concert/1.png', title: 'Basic', description: 'Glass', link: '/product/basic-tshirt?color=beige&size=M&style=head' },
    { imgUrl: '/samples/mockups/song/concert/2.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/song-tshirt?color=beige&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=drilldown' },
    { imgUrl: '/samples/mockups/song/analysis/1.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
    { imgUrl: '/samples/mockups/song/analysis/2.png', title: 'A sunflower', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Sunflower&action=lying%20on%20a&location=a%20Forest&style=Van%20Gogh' },
    { imgUrl: '/samples/mockups/japanese/1.png', title: 'Basic', description: '16X16', link: '/product/basic-tshirt?color=black&size=M&style=pixel' },
    { imgUrl: '/samples/mockups/japanese/2.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/song-tshirt?color=black&size=M&songId=6l8GvAyoUZwWDgF1e4822w&style=analysis' },
    { imgUrl: '/samples/mockups/japanese/3.png', title: '🚬', description: 'no smoking', link: '/product/emoji-tshirt?color=white&size=M&style=badge&slug=e0-6-cigarette&text=no+smoking' },
    { imgUrl: '/samples/mockups/japanese/4.png', title: 'Basic', description: 'Face', link: '/product/basic-tshirt?color=beige&size=M&style=tip' },
    { imgUrl: '/samples/mockups/japanese/5.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/song-tshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
    { imgUrl: '/samples/mockups/japanese/6.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/song-tshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
  ];
  
  const sampleData2 = [
    { imgUrl: '/samples/mockups/text/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/song-tshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
    { imgUrl: '/samples/mockups/text/2.png', title: 'Bigfoot', description: 'reading in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=reading%20a%20book&location=a%20Mountain&style=Van%20Gogh' },
    { imgUrl: '/samples/mockups/text/3.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/song-tshirt?color=black&size=M&songId=5Z01UMMf7V1o0MzF86s6WJ&style=analysis' },
    { imgUrl: '/samples/mockups/text/4.png', title: '🍣', description: 'すし、ください。', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e0-6-sushi&text=%E3%81%99%E3%81%97%E3%80%81%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82' },
    { imgUrl: '/samples/mockups/text/5.png', title: 'Basic', description: 'Glass', link: '/product/basic-tshirt?color=beige&size=M&style=head' },
    { imgUrl: '/samples/mockups/text/6.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/song-tshirt?color=beige&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=drilldown' },
    { imgUrl: '/samples/mockups/text/7.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
    { imgUrl: '/samples/mockups/emoji/1.png', title: 'A sunflower', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Sunflower&action=lying%20on%20a&location=a%20Forest&style=Van%20Gogh' },
    { imgUrl: '/samples/mockups/emoji/2.png', title: 'Basic', description: '16X16', link: '/product/basic-tshirt?color=black&size=M&style=pixel' },
    { imgUrl: '/samples/mockups/emoji/3.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/song-tshirt?color=black&size=M&songId=6l8GvAyoUZwWDgF1e4822w&style=analysis' },
    { imgUrl: '/samples/mockups/emoji/4.png', title: '🚬', description: 'no smoking', link: '/product/emoji-tshirt?color=white&size=M&style=badge&slug=e0-6-cigarette&text=no+smoking' },
    { imgUrl: '/samples/mockups/emoji/5.png', title: 'Basic', description: 'Face', link: '/product/basic-tshirt?color=beige&size=M&style=tip' },
    { imgUrl: '/samples/mockups/emoji/6.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/song-tshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
  ];
  
  const sampleData3 = [
    { imgUrl: '/samples/mockups/dictionary/small/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/song-tshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
    { imgUrl: '/samples/mockups/dictionary/small/2.png', title: 'Bigfoot', description: 'reading in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=reading%20a%20book&location=a%20Mountain&style=Van%20Gogh' },
    { imgUrl: '/samples/mockups/dictionary/small/3.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/song-tshirt?color=black&size=M&songId=5Z01UMMf7V1o0MzF86s6WJ&style=analysis' },
    { imgUrl: '/samples/mockups/dictionary/small/4.png', title: '🍣', description: 'すし、ください。', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e0-6-sushi&text=%E3%81%99%E3%81%97%E3%80%81%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82' },
    { imgUrl: '/samples/mockups/dictionary/brat/1.png', title: 'Basic', description: 'Glass', link: '/product/basic-tshirt?color=beige&size=M&style=head' },
    { imgUrl: '/samples/mockups/dictionary/brat/2.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/song-tshirt?color=beige&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=drilldown' },
    { imgUrl: '/samples/mockups/dictionary/brat/3.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
    { imgUrl: '/samples/mockups/dictionary/brat/4.png', title: 'A sunflower', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Sunflower&action=lying%20on%20a&location=a%20Forest&style=Van%20Gogh' },
    { imgUrl: '/samples/mockups/ai/1.png', title: 'Basic', description: '16X16', link: '/product/basic-tshirt?color=black&size=M&style=pixel' },
    { imgUrl: '/samples/mockups/ai/2.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/song-tshirt?color=black&size=M&songId=6l8GvAyoUZwWDgF1e4822w&style=analysis' },
    { imgUrl: '/samples/mockups/ai/3.png', title: '🚬', description: 'no smoking', link: '/product/emoji-tshirt?color=white&size=M&style=badge&slug=e0-6-cigarette&text=no+smoking' },
    { imgUrl: '/samples/mockups/ai/4.png', title: 'Basic', description: 'Face', link: '/product/basic-tshirt?color=beige&size=M&style=tip' },
    { imgUrl: '/samples/mockups/ai/5.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/song-tshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
  ];

  const galleryCards = [
    {
      title: '',
      image: '/gallery/1.png',
      url: '#the-range',
      hoverImage: '/gallery/1c.jpg',
      width: '100%',
      aspectRatio: '50%',
    },
    // {
    //   title: 'Express',
    //   image: '/gallery/2.png',
    //   url: '#the-range',
    //   hoverImage: '/gallery/5.png',
    //   width: '20%',
    //   aspectRatio: '100%',
    // },
    {
      title: 'Music vibes',
      image: '/gallery/3.png',
      hoverImage: '/gallery/4.png',
      url: '#the-range',
      width: '30%',
      aspectRatio: '150%',
    },
    {
      title: 'The gang',
      image: '/gallery/8.png',
      hoverImage: '/gallery/6.png',
      url: '#the-range',
      width: '30%',
      aspectRatio: '150%',
    },
    {
      title: '',
      image: '/gallery/7.png',
      hoverImage: '/gallery/7a.png',
      url: '#the-range',
      width: '30%',
      aspectRatio: '150%',
    },
//     {
//       title: '',
//       image: '',
//       url: '#the-range',
//       width: '25%',
//       aspectRatio: '200%',
//       isTextCard: true,
//       text: `Humans are artisans of their existence, shaping reality from sparks of thought and emotion. Our creativity flows freely, reflecting the unique worlds within. Each expression is personal, shaped by our untamed spirit. We are born to create
// —so go, be creative.`,
//     },
    // {
    //   title: '',
    //   image: '/gallery/6.png',
    //   hoverImage: '/gallery/5.png',
    //   url: '#the-range',
    //   width: '35%',
    //   aspectRatio: '160%',
    // },
  ];
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box 
        sx={{
          width: '100%',
          backgroundColor: '#CCCCCC',
          paddingY: 1.2,
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Marquee gradient={false} speed={40}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mx: 2 }}>
            <FiberManualRecordIcon sx={{ color: '#777', fontSize: 8, mx: 1 }} />
            <Typography variant="subtitle2" sx={{ color: '#777' }}>
              EXPRESS YOURSELF
            </Typography>
            <FiberManualRecordIcon sx={{ color: '#777', fontSize: 8, mx: 1 }} />
            <Typography variant="subtitle2" sx={{ color: '#777' }}>
              FREEDOM OF EXPRESSION
            </Typography>
            <FiberManualRecordIcon sx={{ color: '#777', fontSize: 8, mx: 1 }} />
            <Typography variant="subtitle2" sx={{ color: '#777' }}>
              PREMIUM CONCEPTUAL FASHION
            </Typography>
            <FiberManualRecordIcon sx={{ color: '#777', fontSize: 8, mx: 1 }} />
            <Typography variant="subtitle2" sx={{ color: '#777', display: 'flex', alignItems: 'center' }}>
            <Link
              href="https://wa.me/+918147536059"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', color: '#777', textDecoration: 'none' }}
            >
              <WhatsAppIcon sx={{ marginRight: 1 }} />
              FOR ANY QUERIES, CONTACT +91 814753 6059
            </Link>
          </Typography>
          </Box>
        </Marquee>
      </Box>
      <Box 
        sx={{
          paddingTop: 4,
          paddingBottom: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
        }}
        component={Link}
        href={'/'}
      >
        <img
          src='/logo/logo-face.png'
          alt='Bigfoot Logo'
          style={{ width: 60, marginBottom: 2 }}
        />
        
      </Box>
      
      <AutoScrollCards 
        itemsRow1={sampleData1}
        itemsRow2={sampleData2}
        itemsRow3={sampleData3}
      />
      
      <Container>
        <Box sx={{ mx: 'auto', textAlign: 'center', my: 8 }}>
            <Typography variant='h5'>
              Create your own expression
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              href="#the-range"
              startIcon={<BrushIcon />}
              sx={{
                mt: 4,
                padding: 2,
                textTransform: 'none',
                borderRadius: 4,
                width: {
                  xs: '100%', // 100% width for mobile screens
                  md: '50%',  // 50% width for desktop screens
                },
                background: 'linear-gradient(0deg, #222222 0%, #000000 100%)',
                backgroundSize: '600% 600%',
                animation: 'backgroundMovement 4s ease infinite',
                color: 'white',
                mx: 'auto',
                justifyContent: 'center',
              }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#the-range').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Typography variant='h6'>Start Designing</Typography>
            </Button>
          </Box>
        
        </Container>
    </Box>
  );
}
