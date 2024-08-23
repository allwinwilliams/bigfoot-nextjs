"use client";

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box, Typography, Grid, Chip, Button,
  Tooltip, CircularProgress, Link,
  useTheme, TextField, InputAdornment, MenuItem, FormControl, Select
} from '@mui/material';
import { AiCustomiseContext } from '../../context/AiCustomiseProvider';
import ThreeScene from '../ThreeScene';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotesIcon from '@mui/icons-material/Notes';
import RefreshIcon from '@mui/icons-material/RefreshOutlined';

import BuyNowButton from '../BuyNowButton';
import AutoScrollCards from '../AutoScrollCards';

import { db, storage } from '../../utils/firebaseConfig'; // Ensure these are correctly imported
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import SizeChart from '../SizeChart';

const RestrictedAiProductPage = () => {
  const theme = useTheme();
  const { generateImage, prompt, details } = useContext(AiCustomiseContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState(searchParams.get('color') || 'black');
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [subject, setSubject] = useState(searchParams.get('subject') || 'A cat');
  const [action, setAction] = useState(searchParams.get('action') || 'sitting');
  const [location, setLocation] = useState(searchParams.get('location') || 'a Mountain');
  const [artstyle, setArtStyle] = useState(searchParams.get('artstyle') || 'Monet');
  const [style, setStyle] = useState(searchParams.get('style') || 'small');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  const sampleData = [
    { imgUrl: '/samples/ai/1.png', title: 'Bigfoot', description: 'reading in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=reading%20a%20book&location=a%20Mountain&artstyle=Van%20Gogh&style=small' },
    { imgUrl: '/samples/ai/8.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&artstyle=Hokusai%20Ukiyo-E&style=large' },
    { imgUrl: '/samples/ai/6.png', title: 'A sunflower', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Sunflower&action=lying%20on%20a&location=a%20Forest&artstyle=Van%20Gogh&style=small' },
    { imgUrl: '/samples/ai/3.png', title: 'Strawberry', description: 'lying in a forest', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Strawberry&action=lying%20on%20a&location=a%20Forest&artstyle=Comics&style=large' },
    { imgUrl: '/samples/ai/4.png', title: 'A cat', description: 'lying in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20cat&action=lying%20on%20a&location=a%20Mountain&artstyle=Monet&style=small' },
    { imgUrl: '/samples/ai/7.png', title: 'A robot', description: ' painting in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20Robot&action=painting&location=a%20Mountain&artstyle=Comics&style=large' },
    { imgUrl: '/samples/ai/2.png', title: 'Bigfoot', description: 'dancing in a mountain', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=dancing&location=a%20Mountain&artstyle=Madhubani%20Painting%20Art%20in%20bright%20colors%20from%20Bihar,%20India&style=small' },
    { imgUrl: '/samples/ai/5.png', title: 'Bigfoot', description: 'walking in Mumbai', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=Bigfoot&action=walking%20on%20a&location=Mumbai&artstyle=Comics&style=small' },
    { imgUrl: '/samples/ai/9.png', title: 'A dog', description: 'sitting in a beach', link: '/product/prompt-generated-tshirt?color=black&size=M&subject=A%20dog&action=sitting%20on%20a&location=a%20Beach&artstyle=Hokusai%20Ukiyo-E&style=large' },
  ];

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      subject: 'A cat',
      action: 'sitting',
      location: 'a Mountain',
      artstyle: 'Monet',
      style: 'small',
    };

    if (!searchParams.get('color') || !searchParams.get('size') || !searchParams.get('subject') || !searchParams.get('action') || !searchParams.get('location') || !searchParams.get('artstyle') || !searchParams.get('style')) {
      router.push(`/product/prompt-generated-tshirt?color=${color || defaultParams.color}&size=${size || defaultParams.size}&subject=${subject || defaultParams.subject}&action=${action || defaultParams.action}&location=${location || defaultParams.location}&artstyle=${artstyle || defaultParams.artstyle}&style=${style || defaultParams.style}`);
    } else {
      setColor(searchParams.get('color') || defaultParams.color);
      setSize(searchParams.get('size') || defaultParams.size);
      setSubject(searchParams.get('subject') || defaultParams.subject);
      setAction(searchParams.get('action') || defaultParams.action);
      setLocation(searchParams.get('location') || defaultParams.location);
      setArtStyle(searchParams.get('artstyle') || defaultParams.artstyle);
      setStyle(searchParams.get('style') || defaultParams.style);
    }

    if (initialLoad.current) {
      window.scrollTo(0, 0);
      initialLoad.current = false;
    }
  }, [searchParams, router]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
    window.history.replaceState(null, '', `/product/prompt-generated-tshirt?color=${event.target.value}&size=${size}&subject=${subject}&action=${action}&location=${location}&artstyle=${artstyle}&style=${style}`);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(null, '', `/product/prompt-generated-tshirt?color=${color}&size=${size}&subject=${subject}&action=${action}&location=${location}&artstyle=${artstyle}&style=${event.target.value}`);
  };

  const handleArtStyleChange = (event) => {
    setArtStyle(event.target.value);
    window.history.replaceState(null, '', `/product/prompt-generated-tshirt?color=${color}&size=${size}&subject=${subject}&action=${action}&location=${location}&artstyle=${event.target.value}&style=${style}`);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    window.history.replaceState(null, '', `/product/prompt-generated-tshirt?color=${color}&size=${event.target.value}&subject=${subject}&action=${action}&location=${location}&artstyle=${artstyle}&style=${style}`);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
    window.history.replaceState(null, '', `/product/prompt-generated-tshirt?color=${color}&size=${size}&subject=${event.target.value}&action=${action}&location=${location}&artstyle=${artstyle}&style=${style}`);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
    window.history.replaceState(null, '', `/product/prompt-generated-tshirt?color=${color}&size=${size}&subject=${subject}&action=${event.target.value}&location=${location}&artstyle=${artstyle}&style=${style}`);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    window.history.replaceState(null, '', `/product/prompt-generated-tshirt?color=${color}&size=${size}&subject=${subject}&action=${action}&location=${event.target.value}&artstyle=${artstyle}&style=${style}`);
  };

  const generate = async () => {
    setLoading(true);
    const fullPrompt = `${subject} ${action} in ${location} in the art style of ${artstyle}`;
    await generateImage(fullPrompt);
    setLoading(false);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I customised this T-Shirt with a prompt!! Check it out:',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        // console.log('Thanks for sharing!');
      }).catch(error => {
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
            Paint with Prompt T-Shirt - Oversized Fit - SoftTouch Cotton
          </Typography>
          <Typography 
            variant='subtitle1'
            sx={{color: '#777777', lineHeight: 1.25}}
          >
            Personalise your T-Shirt based on a prompt. Enter a prompt and see the magic.
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
                  type='prompt'
                  values={details}
                  style={style}
                  loading={loading}
                  loadingDuration={20}
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
              <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 1 }}>
                <Box sx={{ 
                  paddingX: 4, 
                  paddingY: 3, 
                  backgroundColor: '#fafafa', 
                  marginBottom: 2, 
                  borderRadius: 3, 
                  border: '1px solid #dbdbdb', 
                  boxShadow: '0 0 8px rgba(0,0,0,0.06)',
                  }}>
                  <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Construct your prompt
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select value={subject} onChange={handleSubjectChange} displayEmpty>
                      <MenuItem value="A cat">A cat</MenuItem>
                      <MenuItem value="A dog">A dog</MenuItem>
                      <MenuItem value="A Strawberry">A strawberry</MenuItem>
                      <MenuItem value="A Robot">A robot</MenuItem>
                      <MenuItem value="Bigfoot">Bigfoot</MenuItem>
                      <MenuItem value="A Burger(character)">A burger</MenuItem>
                      <MenuItem value="Sushi(character)">A Sushi</MenuItem>
                      <MenuItem value="A Sunflower">A Sunflower</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select value={action} onChange={handleActionChange} displayEmpty>
                      <MenuItem value="sitting">sitting</MenuItem>
                      <MenuItem value="walking">walking</MenuItem>
                      <MenuItem value="lying">lying</MenuItem>
                      <MenuItem value="reading a book">reading</MenuItem>
                      <MenuItem value="eating">eating</MenuItem>
                      <MenuItem value="painting">painting</MenuItem>
                      <MenuItem value="dancing">dancing</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography>in</Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select value={location} onChange={handleLocationChange} displayEmpty>
                      <MenuItem value="a Forest">a Forest</MenuItem>
                      <MenuItem value="a Mountain">a Mountain</MenuItem>
                      <MenuItem value="a Beach">a Beach</MenuItem>
                      <MenuItem value="a Park">a Park</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                      <MenuItem value="a city skyline">city skyline</MenuItem>
                      <MenuItem value="a dance club">a dance club</MenuItem>
                      <MenuItem value="a classroom">classroom</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography>in the art style of</Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select value={artstyle} onChange={handleArtStyleChange} displayEmpty>
                      <MenuItem value="Hokusai">Hokusai</MenuItem>
                      <MenuItem value="Van Gogh">Van Gogh</MenuItem>
                      <MenuItem value="Comics">Comics</MenuItem>
                      <MenuItem value="Madhubani">Madhubani</MenuItem>
                      <MenuItem value="Monet">Monet</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={generate}
                    disabled={loading}
                    sx={{
                      textTransform: 'none',
                      marginBottom: 1,
                      width: '100%',
                      padding: 2,
                      borderRadius: '16px',
                    }}
                  >
                      <AutoAwesomeIcon sx={{ marginRight: '8px' }} />
                      <strong>{loading ? 'Generating... Please wait' : 'Generate'}</strong>
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={generate}
                    disabled={loading}
                    sx={{ textTransform: 'none',
                        marginBottom: 1,
                        width: '100%',
                        padding: 2,
                        borderRadius: '16px',
                    }}
                  >
                    <RefreshIcon sx={{ marginRight: '8px' }} />
                    <strong>Try Again</strong>
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                    Select style
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {[
                  { value: 'small', label: 'Small', disabled: false, url: '/product-page/ai/small.png' },
                  { value: 'large', label: 'Large', disabled: false, url: '/product-page/ai/large.png' },
                ].map((option) => (
                  <Tooltip
                    key={option.value}
                    title={option.disabled ? "Currently out of stock. Please check later." : ""}
                    arrow
                  >
                    <Box
                      onClick={() => !option.disabled && handleStyleChange({ target: { value: option.value } })}
                      sx={{
                        padding: 1,
                        borderRadius: '8px',
                        border: `2px solid ${style === option.value ? theme.palette.primary.main : '#ccc'}`,
                        cursor: option.disabled ? 'not-allowed' : 'pointer',
                        transition: 'border-color 0.3s',
                        opacity: option.disabled ? 0.5 : 1,
                        '&:hover': {
                          borderColor: option.disabled ? '#eaeaea' : '#1976d2',
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
                        variant="body1"
                        sx={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: style === option.value ? '#1976d2' : '#555',
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
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
                    type="Prompt"
                    data={{prompt}}
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
                        width: '100%',
                        borderRadius: '16px',
                        textTransform: 'none',
                      }}
                      onClick={handleShare}
                      disabled={true}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        Exact design is not saved
                        <Typography variant="caption" sx={{ display: 'block', fontWeight: 'normal' }}>
                          Once you leave the page, the design is gone forever
                        </Typography>
                      </Box>
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AutoScrollCards 
        itemsRow1={sampleData}
      />
    </Box>
  );
};

export default RestrictedAiProductPage;