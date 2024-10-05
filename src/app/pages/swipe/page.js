"use client";

import { Container, Box, Typography, Link } from "@mui/material";
import Header from "@/components/UIComponents/Header";
import SwipeCards from '@/components/UIComponents/SwipeCards';

export default function ExplainMusic() {
    let swipeItems = [
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
    ]
    return (
      <Container sx={{ mt: 2 }}>
        <Box 
          sx={{
            py: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none'
          }}
          component={Link}
          href={'/'}
        >
          
          <img
            src='/wordmark.svg'
            alt='Bigfoot Logo'
            style={{ width: 96 }}
          />
        </Box>
        <Box style={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Swipe to pick</Typography>
          <SwipeCards items={swipeItems} />
        </Box>
    </Container>
    );
  }