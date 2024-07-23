import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Link } from '@mui/material';

const AutoScrollCards = () => {
  const items = [
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'By Micheal Jackson', link: '/product?color=black&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=black&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=standout' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=standout' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=standout' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Thriller', description: 'Micheal Jackson', link: '/product?color=black&size=M&songId=3S2R0EVwBSAVMd5UMgKTL0&style=minimal' },
  ];

  return (
    <Box sx={{ marginX: 'auto', textAlign: 'center', marginTop: 4, paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
        Thousands of options to choose from.. Make it truly yours..
      </Typography>
      <Box
        sx={{
          mt: 4,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingY: 4,
        }}
      >
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          {items.map((item, index) => (
            <Card
              key={index}
              component={Link}
              href={item.link}
              sx={{
                display: 'inline-block',
                width: 350,
                marginRight: 2,
                textDecoration: 'none',
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
                sx={{ borderRadius: 2 }}
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
      </Box>
    </Box>
  );
};

export default AutoScrollCards;
