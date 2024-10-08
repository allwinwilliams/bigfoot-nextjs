"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, CircularProgress, Card, Link,
  CardMedia, CardContent, useTheme, Container
} from '@mui/material';
import { CustomiseAppContext } from '../../context/SongCustomiseProvider';
import ThreeScene from '../ThreeScene';
import SpotifySearch from './SpotifySearch'; // Ensure correct import
import { fetchAllSongData } from '@/utils/spotifyUtils';
import AutoScrollCards from '../UIComponents/AutoScrollCards';

import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import SongProductStaticContent from '../ProductStaticContent';

import BuyNowButton from '../UIComponents/BuyNowButton';

import SizeChart from '../SizeChart';

const SongProductPage = () => {
  const theme = useTheme();

  const { songData } = useContext(CustomiseAppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(false);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [songId, setSongId] = useState(searchParams.get('songId') || '5ChkMS8OtdzJeqyybCc9R5');
  const [style, setStyle] = useState(searchParams.get('style') || 'minimal');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  const samples = [
    { imgUrl: '/samples/song/5.png', title: 'Love Story', description: 'Taylor Swift', link: '/product/song-tshirt?color=beige&size=M&songId=1vrd6UOGamcKNGnSHJQlSt&style=analysis' },
    { imgUrl: '/samples/song/6.png', title: 'Lose Yourself', description: 'Eminem', link: '/product/song-tshirt?color=black&size=M&songId=5Z01UMMf7V1o0MzF86s6WJ&style=analysis' },
    { imgUrl: '/samples/song/3.png', title: 'Chaiyya Chaiyya', description: 'Sukhwinder Singh, Sapna Awasthi', link: '/product/song-tshirt?color=beige&size=M&songId=5H4rKylLnO8KrmdXTRhj5s&style=drilldown' },
    { imgUrl: '/samples/song/7.png', title: 'Tum Hi Ho', description: 'Mithoon, Arijit Singh', link: '/product/song-tshirt?color=beige&size=M&songId=56zZ48jdyY2oDXHVnwg5Di&style=minimal' },
    { imgUrl: '/samples/song/8.png', title: 'Baby One More Time', description: 'Britney Spears', link: '/product/song-tshirt?color=beige&size=M&songId=3MjUtNVVq3C8Fn0MP3zhXa&style=concert' },
    { imgUrl: '/samples/song/9.png', title: 'Sandstorm', description: 'Darude', link: '/product/song-tshirt?color=black&size=M&songId=6Sy9BUbgFse0n0LPA5lwy5&style=concert' },
    { imgUrl: '/samples/song/1.png', title: 'Bohemian Rhapsody', description: 'Queen', link: '/product/song-tshirt?color=black&size=M&songId=6l8GvAyoUZwWDgF1e4822w&style=analysis' },
    { imgUrl: '/samples/song/2.png', title: 'Dynamite', description: 'BTS', link: '/product/song-tshirt?color=black&size=M&songId=5QDLhrAOJJdNAmCTJ8xMyW&style=drilldown' },
    { imgUrl: '/samples/song/10.png', title: 'In the End', description: 'Linkin Park', link: '/product/song-tshirt?color=black&size=M&songId=60a0Rd6pjrkxjPbaKzXjfq&style=minimal' },
    { imgUrl: '/samples/song/11.png', title: 'Billie Jean', description: 'Michael Jackson', link: '/product/song-tshirt?color=beige&size=M&songId=5ChkMS8OtdzJeqyybCc9R5&style=analysis' },
    { imgUrl: '/samples/song/12.png', title: 'Viva La Vida', description: 'Coldplay', link: '/product/song-tshirt?color=black&size=M&songId=1mea3bSkSGXuIRvnydlB5b&style=analysis' },
    { imgUrl: '/samples/song/4.png', title: 'Enter Sandman', description: 'Metallica', link: '/product/song-tshirt?color=black&size=M&songId=3VqHuw0wFlIHcIPWkhIbdQ&style=concert' },
  ];

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      songId: '5ChkMS8OtdzJeqyybCc9R5',
      style: 'minimal',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('songId') || !searchParams.get('style')) {
      router.push(`/product/song-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&songId=${songId || defaultParams.songId}&style=${style || defaultParams.style}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setSize(searchParams.get('size') || defaultParams.size);
      setSongId(searchParams.get('songId') || defaultParams.songId);
      setStyle(searchParams.get('style') || defaultParams.style);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    window.history.replaceState(null, '', `/product/song-tshirt?color=${newColor}&size=${size}&songId=${songId}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    const newStyle = event.target.value;
    setStyle(newStyle);

    if (newStyle !== 'minimal' && (color === 'navy' || color === 'maroon')) {
      setColor('black');
      window.history.replaceState(null, '', `/product/song-tshirt?color=black&size=${size}&songId=${songId}&style=${newStyle}`);
    } else {
      window.history.replaceState(null, '', `/product/song-tshirt?color=${color}&size=${size}&songId=${songId}&style=${newStyle}`);
    }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    window.history.replaceState(null, '', `/product/song-tshirt?color=${color}&size=${event.target.value}&songId=${songId}&style=${style}`);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I customised this T-Shirt with a song!! Check it out:',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        // console.log('Thanks for sharing!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 2000);
    }
  };

  // Define color options based on the selected style
  const colorOptions = [
    { value: 'black', label: 'Black' },
    { value: 'beige', label: 'Sand' },
  ];

  if (style === 'minimal') {
    colorOptions.push(
      { value: 'navy', label: 'Navy' },
      { value: 'maroon', label: 'Maroon' },
    );
  }

  return (
    <Box>
      <Box
        sx={{
          maxWidth: 1400,
          marginX: 'auto',
          paddingX: { xs: 2, md: 10 },
          paddingY: 1,
        }}
      >
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
        <Box
          sx={{
            boxShadow: '0 0 32px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            padding: 0,
            marginY: 2,
          }}
        >
          <Grid container spacing={0}>
            <Grid 
              item 
              xs={12} 
              md={7}
              sx={{ 
                display: { xs: 'block', md: 'flex' }, 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <ThreeScene
                color={color}
                type='song'
                values={songData}
                style={style}
                loading={songLoading}
              />
            </Grid>
            <Grid
              item
              sx={{
                padding: { xs: 2, md: 2 },
              }}
              xs={12}
              md={5}
            >
              <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ }}>
                  Customise with a song
                </Typography>
                <SpotifySearch
                  color={color}
                  size={size}
                  style={style}
                  songLoading={songLoading}
                  setSongLoading={setSongLoading}
                />
                
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Choose your style
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {[
                    { value: 'minimal', label: 'Minimal', url: '/product-page/song/minimal.png' },
                    { value: 'concert', label: 'Concert', url: '/product-page/song/concert.png' },
                    { value: 'analysis', label: 'Analysis', url: '/product-page/song/analysis.png' },
                    { value: 'drilldown', label: 'Drill Down', url: '/product-page/song/drilldown.png' },
                  ].map((option) => (
                    <Box
                      key={option.value}
                      onClick={() => handleStyleChange({ target: { value: option.value } })}
                      sx={{
                        cursor: 'pointer',
                        padding: 1,
                        borderRadius: '8px',
                        textAlign: 'center',
                        border: `2px solid ${style === option.value ? theme.palette.primary.main : '#ccc'}`,
                        transition: 'border-color 0.3s',
                        '&:hover': {
                          borderColor: style === option.value ? theme.palette.primary.dark : '#999',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={option.url}
                        alt={option.label}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '4px',
                          mb: 1,
                        }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: style === option.value ? 'bold' : 'normal',
                          color: style === option.value ? theme.palette.primary.main : 'inherit',
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Pick your color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {colorOptions.map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      clickable
                      color={color === option.value ? 'primary' : 'default'}
                      variant={color === option.value ? 'filled' : 'outlined'}
                      onClick={() => handleColorChange({ target: { value: option.value } })}
                      sx={{
                        padding: '24px 16px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '9999px',
                      }}
                      icon={
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: option.value,
                            border: '1px solid',
                            borderColor: color === option.value ? '#444444' : '#eaeaea',
                            borderRadius: '50%',
                            mr: 1,
                          }}
                        />
                      }
                    />
                  ))}
                </Box>
                <Box sx={{ mt: 4 }}>
                  <BuyNowButton
                    color={color}
                    style={style}
                    type="song"
                    data={{songId, songData, songName: songData?.details?.name || ''}}
                    storage={storage}
                    db={db}
                    price={119900}
                  />
                  <Tooltip title="URL copied" open={tooltipOpen} arrow>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{
                        padding: '12px',
                        fontWeight: 'bold',
                        borderRadius: '16px',
                        textTransform: 'none',
                      }}
                      onClick={handleShare}
                    >
                      Share Now
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AutoScrollCards
        itemsRow1={samples}
      />
    </Box>
  );
};

export default SongProductPage;
