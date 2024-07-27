import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Link } from '@mui/material';
import { keyframes } from '@mui/system';

const AutoScrollCards = () => {
  const items = [
    { imgUrl: '/song-tshirt/option/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product?color=beige&size=M&songId=1D4PL9B8gOg78jiHg3FvBb&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Lose Yourself', description: 'Eminem', link: '/product?color=black&size=M&songId=7MJQ9Nfxzh8LPZ9e9u68Fq&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product?color=black&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product?color=black&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product?color=black&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Sandstorm', description: 'Darude', link: '/product?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=minimal' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product?color=beige&size=M&songId=3z8h0TU7ReDPLIbEnYhWZb&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Dynamite', description: 'BTS', link: '/product?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=concert' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'In the End', description: 'Linkin park', link: '/product?color=beige&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Billie Jean', description: 'Micheal Jackson', link: '/product?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product?color=beige&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=drilldown' },
    { imgUrl: '/song-tshirt/option/1.png', title: 'Enter Sandman', description: 'Metallica', link: '/product?color=black&size=M&songId=5sICkBXVmaCQk5aISGR3x1&style=minimal' },
  ];

  const scroll = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% + 100vw));
    }
  `;

  return (
    <Box sx={{ marginX: 'auto', textAlign: 'center', marginTop: 4, paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
        Thousands of options to choose from.. Make it truly yours..
      </Typography>
      <Box
        sx={{
          mt: 4,
          overflowX: 'hidden', // Hide the scrollbar
          whiteSpace: 'nowrap',
          paddingY: 4,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            animation: `${scroll} 32s linear infinite`,
            '&:hover': {
              animationPlayState: 'paused',
            },
          }}
        >
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
