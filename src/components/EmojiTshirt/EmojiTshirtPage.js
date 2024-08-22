"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, Link, useTheme, Tabs, Tab, TextField
} from '@mui/material';

import ThreeScene from '../ThreeScene';
import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported

import AutoScrollCards from '../AutoScrollCards';

import SizeChart from '../SizeChart';
import BuyNowButton from '../BuyNowButton';
import debounce from 'lodash.debounce';

import EmojiSelector from './EmojiSelector';


const EmojiTshirtPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [style, setStyle] = useState(searchParams.get('style') || 'tiny');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  

  const [emojis, setEmojis] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(searchParams.get('slug') || 'e0-6-grinning-face-with-big-eyes');
  const [emojiCharacter, setEmojiCharacter] = useState('');
  const [textInput, setTextInput] = useState(searchParams.get('text') || ' ');
  const [tabValue, setTabValue] = useState(0);

  const initialLoad = useRef(true);

  const samples = [
    { imgUrl: '/samples/emoji/1.png', title: '🍣', description: 'すし、ください。', link: '/product/songtshirt?color=beige&size=M&songId=1D4PL9B8gOg78jiHg3FvBb&style=minimal' },
    { imgUrl: '/samples/emoji/2.png', title: '🐮', description: 'moooooooooooooo', link: '/product/emoji-tshirt?color=beige&size=M&style=tiny&slug=e0-6-cow-face&text=moooooooooooooo' },
    { imgUrl: '/samples/emoji/3.png', title: '🚬', description: 'no smoking', link: '/product/emoji-tshirt?color=white&size=M&style=badge&slug=e0-6-cigarette&text=no+smoking' },
    { imgUrl: '/samples/emoji/4.png', title: '🇵🇸', description: '', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e2-0-flag-palestinian-territories&text=' },
    { imgUrl: '/samples/emoji/5.png', title: '🌈', description: '', link: '/product/emoji-tshirt?color=black&size=M&style=badge&slug=e0-6-rainbow&text=' },
    { imgUrl: '/samples/emoji/6.png', title: '🍑', description: 'beach vacation', link: '/product/emoji-tshirt?color=beige&size=M&style=tiny&slug=e0-6-peach&text=beach+vacation' },
    { imgUrl: '/samples/emoji/7.png', title: '🛕', description: 'mandir yahi banega', link: '/product/emoji-tshirt?color=black&size=M&style=tiny&slug=e12-0-hindu-temple&text=mandir+yahi+banega' },
  ];

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://emoji-api.com/emojis?access_key=9484793b8a1df1aab3b8cf10b2b7becc8236adfe');
        const data = await response.json();

        // Group emojis by 'group' parameter
        const groupedEmojis = data.reduce((acc, emoji) => {
          if (!acc[emoji.group]) {
            acc[emoji.group] = [];
          }
          acc[emoji.group].push(emoji);
          return acc;
        }, {});

        setEmojis(groupedEmojis);
      } catch (error) {
        console.error('Failed to fetch emojis:', error);
      }
    };

    fetchEmojis();
  }, []);


  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      style: 'tiny',
      slug: 'e0-6-grinning-face-with-big-eyes',
      text: '',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('style') || !searchParams.get('slug') || !searchParams.get('text')) {
      router.push(`/product/emoji-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&style=${style || defaultParams.style}&slug=${selectedEmoji || defaultParams.slug}&text=${textInput || defaultParams.text}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setSize(searchParams.get('size') || defaultParams.size);
      setStyle(searchParams.get('style') || defaultParams.style);
      setSelectedEmoji(searchParams.get('slug') || defaultParams.slug);
      setTextInput(searchParams.get('text') || defaultParams.text);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (emojis) {
      const groupKeys = Object.keys(emojis);
      for (let i = 0; i < groupKeys.length; i++) {
        const group = groupKeys[i];
        const foundEmoji = emojis[group].find(emoji => emoji.slug === selectedEmoji);
        if (foundEmoji) {
          setEmojiCharacter(foundEmoji.character);
          break;
        }
      }
    }
  }, [selectedEmoji, emojis]);

  const updateUrlParams = (params, shallow = false) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        updatedParams.set(key, params[key]);
      } else {
        updatedParams.delete(key);
      }
    });
    router.replace(`/product/emoji-tshirt?${updatedParams.toString()}`, undefined, { shallow });
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    updateUrlParams({ color: newColor }, true); // Pass true to indicate shallow routing
  };
  
  const handleStyleChange = (event) => {
    const newStyle = event.target.value;
    setStyle(newStyle);
    updateUrlParams({ style: newStyle }, true);
  };
  
  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    updateUrlParams({ size: newSize }, true);
  };
  
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const filteredEmojis = useMemo(() => {
    let emojiList = [];
    if (tabValue === 0) {
      emojiList = Object.values(emojis).flat();
    } else {
      const currentGroup = Object.keys(emojis)[tabValue - 1];
      if (currentGroup) {
        emojiList = emojis[currentGroup];
      }
    }
    return emojiList.filter((emoji) =>
      emoji.unicodeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, emojis, tabValue]);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji.slug);
    updateUrlParams({ slug: emoji.slug });
  };

  const handleTextInputChange = (e) => {
    const newText = e.target.value;
    setTextInput(newText);
    updateUrlParams({ text: newText }); 
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I customised this T-Shirt with an Emoji!! Check it out:',
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
            paddingTop: 1,
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
            src='/logo.png'
            alt='Bigfoot Logo'
            style={{ width: 48, marginBottom: 8 }}
          />
        </Box>
        <Box sx={{ paddingY: 1, textAlign: 'center' }}>
          <Typography 
            variant="h4"
            gutterBottom 
            sx={{
              fontSize: {
                xs: '1.25rem',
                sm: '1.5rem',
                md: '2rem',
              },
              fontWeight: 'bold'
            }}
          >
            Emoji T-shirt - Regular Fit - Premium Cotton
          </Typography>
          <Typography 
            variant='subtitle1'
            sx={{color: '#777777', lineHeight: 1.25}}
          >
            Pick your emoji. Build your T-Shirt.
          </Typography>
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
                  type='emoji'
                  values={{ renderCount, selectedEmoji: emojiCharacter, textInput }}
                  style={style}
                  loading={loading}
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
                <EmojiSelector emojis={emojis} onEmojiClick={handleEmojiClick}/>
                <Box sx={{ display: 'flex', gap: 1, my: 4 }}>
                  <TextField
                    label="Add a message (Optional - Max 24 characters)"
                    variant="outlined"
                    fullWidth
                    value={textInput}
                    onChange={handleTextInputChange}
                    inputProps={{ maxLength: 24 }}
                  />
                </Box>
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Pick your color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {[
                    { value: 'black', label: 'Black', disabled: false },
                    { value: 'beige', label: 'Sand', disabled: false },
                    { value: 'white', label: 'White', disabled: true },
                  ].map((option) => (
                    <Tooltip
                      key={option.value}
                      title={option.disabled ? "Currently out of stock. Please check later." : ""}
                      arrow
                    >
                      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Chip
                          clickable={!option.disabled}
                          label={option.label}
                          color={color === option.value ? 'primary' : 'default'}
                          variant={color === option.value ? 'filled' : 'outlined'}
                          disabled={option.disabled}
                          onClick={() => !option.disabled && handleColorChange({ target: { value: option.value } })}
                          sx={{
                            padding: '24px 16px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '9999px',
                            cursor: option.disabled ? 'not-allowed' : 'pointer'
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
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
                
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Choose your style
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {[
                    { value: 'tiny', label: 'Tiny' },
                    { value: 'out', label: 'Out there' },
                    { value: 'badge', label: 'Badge' },
                  ].map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      clickable
                      color={style === option.value ? 'primary' : 'default'}
                      variant={style === option.value ? 'filled' : 'outlined'}
                      onClick={() => handleStyleChange({ target: { value: option.value } })}
                      sx={{
                        padding: '24px 16px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '9999px',
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                    Select your size
                  </Typography>
                  <SizeChart />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {['XS','S', 'M', 'L', 'XL'].map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      clickable
                      color={size === option ? 'primary' : 'default'}
                      variant={size === option ? 'filled' : 'outlined'}
                      onClick={() => handleSizeChange({ target: { value: option } })}
                      sx={{
                        padding: '24px 8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        width: '100%',
                        borderRadius: '9999px',
                      }}
                    />
                  ))}
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <BuyNowButton
                    color={color}
                    size={size}
                    style={style}
                    type="Emoji"
                    data={{emoji: selectedEmoji, text: textInput}}
                    storage={storage}
                    db={db}
                    price={139900}
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
      <AutoScrollCards itemsRow1={samples} />
    </Box>
  );
};

export default EmojiTshirtPage;
