import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Link } from '@mui/material';
import { keyframes } from '@mui/system';
import { handlePlayClick } from './AudioControl';

const AutoScrollCards = ({
  itemsRow1 = [
      { imgUrl: '/samples/song/1.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/songtshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
      { imgUrl: '/samples/song/1.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/songtshirt?color=black&size=M&songId=5Z01UMMf7V1o0MzF86s6WJ&style=analysis' },
      { imgUrl: '/samples/song/1.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/songtshirt?color=beige&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=drilldown' },
      { imgUrl: '/samples/song/1.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product/songtshirt?color=beige&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
      { imgUrl: '/samples/song/1.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product/songtshirt?color=beige&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=concert' },
      { imgUrl: '/samples/song/1.png', title: 'Sandstorm', description: 'Darude', link: '/product/songtshirt?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=concert' },
      { imgUrl: '/samples/song/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/songtshirt?color=black&size=M&songId=6l8GvAyoUZwWDgF1e4822w&style=analysis' },
      { imgUrl: '/samples/song/1.png', title: 'Dynamite', description: 'BTS', link: '/product/songtshirt?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=drilldown' },
      { imgUrl: '/samples/song/11.png', title: 'In the End', description: 'Linkin Park', link: '/product/songtshirt?color=black&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=minimal' },
      { imgUrl: '/samples/song/11.png', title: 'Billie Jean', description: 'Michael Jackson', link: '/product/songtshirt?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
      { imgUrl: '/samples/song/11.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/songtshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
      { imgUrl: '/samples/song/1.png', title: 'Enter Sandman', description: 'Metallica', link: '/product/songtshirt?color=black&size=M&songId=3VqHuw0wFlIHcIPWkhIbdQ&style=concert' },
  ],
  itemsRow2 = null,
  itemsRow3 = null,
}) => {
  const scroll = keyframes`
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(calc(-100% + 100vw));
    }
    100% {
      transform: translateX(0);
    }
  `;

  const reverseScroll = keyframes`
    0% {
      transform: translateX(calc(-100% + 100vw));
    }
    50% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% + 100vw));
    }
  `;

  const getRandomRotation = () => {
    return Math.random() * 10 - 5;
  };

  return (
    <Box>
      <Box sx={{ marginX: 'auto', textAlign: 'center', marginTop: 8, paddingTop: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', margin: 2 }}>
          <strike>Thousands</strike> Millions of options to choose from...<br />Make it truly yours..
        </Typography>
        <Box
          sx={{
            mt: 4,
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
            paddingTop: 4,
            paddingBottom: 0.5,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              animation: `${scroll} 100s linear infinite`,
            }}
          >
            {itemsRow1.map((item, index) => (
              <Card
                key={index}
                component={Link}
                href={item.link}
                onClick={(e) => {
                  handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
                }}
                onMouseEnter={() => {
                  handlePlayClick('https://cdn.freesound.org/previews/582/582295_9713112-lq.mp3', 0.4);
                }} 
                sx={{
                  display: 'inline-block',
                  width: 290,
                  margin: 2,
                  textDecoration: 'none',
                  padding: 2.5,
                  paddingBottom: 0,
                  boxShadow: '0 0 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #eeeeee',
                  transform: `rotate(${getRandomRotation()}deg)`,
                  transition: 'transform 0.9s, border-color 0.8s',
                  '&:hover': {
                    transform: `scale(1.01) rotate(${getRandomRotation()}deg)`,  
                    borderColor: '#777777',
                  },
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imgUrl}
                  alt={item.title}
                  sx={{ borderRadius: 2, padding: 2, backgroundColor: '#EEEEEE' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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
        {itemsRow2 && (
          <Box
            sx={{
              mt: 4,
              overflowX: 'hidden',
              whiteSpace: 'nowrap',
              paddingTop: 0.5,
              paddingBottom: 4,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                animation: `${reverseScroll} 100s linear infinite`,
                transition: ' 4s',
              }}
            >
              {itemsRow2.map((item, index) => (
                <Card
                  key={index}
                  component={Link}
                  href={item.link}
                  onClick={(e) => {
                    handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
                  }}
                  onMouseEnter={() => {
                    handlePlayClick('https://cdn.freesound.org/previews/582/582295_9713112-lq.mp3', 0.4);
                  }}  
                  sx={{
                    display: 'inline-block',
                    width: 290,
                    margin: 2,
                    textDecoration: 'none',
                    padding: 2.5,
                    paddingBottom: 0,
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #eeeeee',
                    transform: `rotate(${getRandomRotation()}deg)`,
                    transition: 'transform 0.9s, border-color 0.8s',
                    '&:hover': {
                      transform: `scale(1.01) rotate(${getRandomRotation()}deg)`,  
                      borderColor: '#777777',
                    },
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imgUrl}
                    alt={item.title}
                    sx={{ borderRadius: 2, padding: 2, backgroundColor: '#EEEEEE' }}
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
        )}
        {itemsRow3 && (
          <Box
            sx={{
              mt: 4,
              overflowX: 'hidden',
              whiteSpace: 'nowrap',
              paddingTop: 0.5,
              paddingBottom: 4,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                animation: `${scroll} 100s linear infinite`,
                transition: ' 4s',
              }}
            >
              {itemsRow3.map((item, index) => (
                <Card
                  key={index}
                  component={Link}
                  href={item.link}
                  onClick={(e) => {
                    handlePlayClick('https://cdn.freesound.org/previews/198/198114_2155835-lq.mp3');
                  }}
                  onMouseEnter={() => {
                    handlePlayClick('https://cdn.freesound.org/previews/582/582295_9713112-lq.mp3', 0.4);
                  }}
                  sx={{
                    display: 'inline-block',
                    width: 290,
                    margin: 2,
                    textDecoration: 'none',
                    padding: 2.5,
                    paddingBottom: 0,
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #eeeeee',
                    transform: `rotate(${getRandomRotation()}deg)`,
                    transition: 'transform 0.9s, border-color 0.8s',
                    '&:hover': {
                      transform: `scale(1.01) rotate(${getRandomRotation()}deg)`,  
                      borderColor: '#777777',
                    },
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imgUrl}
                    alt={item.title}
                    sx={{ borderRadius: 2, padding: 2, backgroundColor: '#EEEEEE' }}
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
        )}
      </Box>
    </Box>
  );
};

export default AutoScrollCards;
