"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import {Box, Typography, Grid, Link} from '@mui/material';
import AutoScrollCards from '@/components/AutoScrollCards';
import Header from '@/components/Header';

export default function ProductType() {
  const sampleData1 = [
    { imgUrl: '/samples/song/5.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/songtshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
    { imgUrl: '/samples/ai/1.png', title: 'Bigfoot', description: 'reading in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=reading%20a%20book&location=a%20Mountain&style=Van%20Gogh' },
    { imgUrl: '/samples/song/6.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/songtshirt?color=black&size=M&songId=5Z01UMMf7V1o0MzF86s6WJ&style=analysis' },
    { imgUrl: '/samples/emoji/1.png', title: '🍣', description: 'すし、ください。', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e0-6-sushi&text=%E3%81%99%E3%81%97%E3%80%81%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82' },
    { imgUrl: '/samples/basic/2.png', title: 'Basic', description: 'Glass', link: '/product/basic-tshirt?color=beige&size=M&style=head' },
    { imgUrl: '/samples/song/3.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/songtshirt?color=beige&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=drilldown' },
    { imgUrl: '/samples/ai/8.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
    
    { imgUrl: '/samples/ai/6.png', title: 'A sunflower', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Sunflower&action=lying%20on%20a&location=a%20Forest&style=Van%20Gogh' },
    { imgUrl: '/samples/basic/7.png', title: 'Basic', description: '16X16', link: '/product/basic-tshirt?color=black&size=M&style=pixel' },
    { imgUrl: '/samples/song/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/songtshirt?color=black&size=M&songId=6l8GvAyoUZwWDgF1e4822w&style=analysis' },
    { imgUrl: '/samples/emoji/3.png', title: '🚬', description: 'no smoking', link: '/product/emoji-tshirt?color=white&size=M&style=badge&slug=e0-6-cigarette&text=no+smoking' },
    { imgUrl: '/samples/basic/4.png', title: 'Basic', description: 'Face', link: '/product/basic-tshirt?color=beige&size=M&style=tip' },
    { imgUrl: '/samples/song/12.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/songtshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
    
  ];
  
  const sampleData2 = [
    { imgUrl: '/samples/song/11.png', title: 'Billie Jean', description: 'Michael Jackson', link: '/product/songtshirt?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
    { imgUrl: '/samples/emoji/2.png', title: '🐮', description: 'moooooooooooooo', link: '/product/emoji-tshirt?color=beige&size=M&style=tiny&slug=e0-6-cow-face&text=moooooooooooooo' },
    { imgUrl: '/samples/ai/3.png', title: 'Strawberry', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Strawberry&action=lying%20on%20a&location=a%20Forest&style=Comics' },
    { imgUrl: '/samples/ai/4.png', title: 'A cat', description: 'lying in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20cat&action=lying%20on%20a&location=a%20Mountain&style=Monet' },
    { imgUrl: '/samples/song/2.png', title: 'Dynamite', description: 'BTS', link: '/product/songtshirt?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=drilldown' },
    { imgUrl: '/samples/emoji/4.png', title: '🇵🇸', description: '', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e2-0-flag-palestinian-territories&text=' },
    { imgUrl: '/samples/emoji/6.png', title: '🍑', description: 'beach vacation', link: '/product/emoji-tshirt?color=beige&size=M&style=tiny&slug=e0-6-peach&text=beach+vacation' },
    { imgUrl: '/samples/song/9.png', title: 'Sandstorm', description: 'Darude', link: '/product/songtshirt?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=concert' },
    { imgUrl: '/samples/emoji/7.png', title: '🛕', description: 'mandir yahi banega', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e12-0-hindu-temple&text=mandir+yahi+banega' },
    { imgUrl: '/samples/basic/1.png', title: 'Basic', description: 'Glass', link: '/product/basic-tshirt?color=black&size=M&style=head' },
    { imgUrl: '/samples/ai/7.png', title: 'A robot', description: ' painting in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Robot&action=painting&location=a%20Mountain&style=Comics' },
    { imgUrl: '/samples/basic/5.png', title: 'Basic', description: 'Loading...', link: '/product/basic-tshirt?color=black&size=M&style=loading' },
  ];
  
  const sampleData3 = [
    { imgUrl: '/samples/song/7.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product/songtshirt?color=beige&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
    { imgUrl: '/samples/basic/6.png', title: 'Basic', description: 'Loading...', link: '/product/basic-tshirt?color=white&size=M&style=loading' },
    { imgUrl: '/samples/song/10.png', title: 'In the End', description: 'Linkin Park', link: '/product/songtshirt?color=black&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=minimal' },
    { imgUrl: '/samples/basic/8.png', title: 'Basic', description: '16X16', link: '/product/basic-tshirt?color=beige&size=M&style=pixel' },
    { imgUrl: '/samples/emoji/5.png', title: '🌈', description: '', link: '/product/emoji-tshirt?color=black&size=M&style=badge&slug=e0-6-rainbow&text=' },
    { imgUrl: '/samples/ai/2.png', title: 'Bigfoot', description: 'dancing in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=dancing&location=a%20Mountain&style=Madhubani%20Painting%20Art%20in%20bright%20colors%20from%20Bihar,%20India' },
    { imgUrl: '/samples/song/8.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product/songtshirt?color=beige&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=concert' },
    { imgUrl: '/samples/ai/5.png', title: 'Bigfoot', description: 'walking in Mumbai', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=walking%20on%20a&location=Mumbai&style=Comics' },
    { imgUrl: '/samples/song/4.png', title: 'Enter Sandman', description: 'Metallica', link: '/product/songtshirt?color=black&size=M&songId=3VqHuw0wFlIHcIPWkhIbdQ&style=concert' },
    { imgUrl: '/samples/basic/3.png', title: 'Basic', description: 'Face', link: '/product/basic-tshirt?color=black&size=M&style=tip' },
    { imgUrl: '/samples/ai/9.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&style=Hokusai%20Ukiyo-E' },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box>
        <Header />
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
            Select from our range of products
          </Typography>
          <Grid container spacing={2} sx={{my: 8}}>
            <Grid item xs={6} md={2.4} sx={{mx: 'auto'}}>
              <Link
                href="/product/songtshirt"
                underline="none"  
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
                    <img src="/landing-page/song.png" alt="Song customisation" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
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
            <Grid item xs={6} md={2.4} sx={{mx: 'auto'}}>
              <Link 
                href="/product/prompt-generated-tshirt" 
                underline="none"  
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
                    <img src="/landing-page/ai.png" alt="AI customisation" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
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
            <Grid item xs={6} md={2.4} sx={{mx: 'auto'}}>
              <Link
                href="/product/emoji-tshirt"
                underline="none"
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
                    <img src="/landing-page/emoji.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
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
            <Grid item xs={6} md={2.4} sx={{mx: 'auto'}}>
              <Link
                href="/product/basic-tshirt"
                underline="none"
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
                    <img src="/landing-page/basic.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
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
            
            <Grid item xs={6} md={2.4} sx={{mx: 'auto'}}>
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
                  <img src="/landing-page/launch.png" alt="Basics" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Launching soon
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#777777' }}>
                  Check within a few days
                </Typography>
              </Box>
            </Grid>
            {/* <Grid item xs={6} md={2.4} sx={{mx: 'auto'}}>
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
      </Box>
    </Suspense>
  );
}
