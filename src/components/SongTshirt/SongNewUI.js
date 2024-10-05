import React, { useContext, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Chip,
  Button,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CustomiseAppContext } from '../../context/SongCustomiseProvider';
import ThreeScene from '../ThreeScene';
import SpotifySearch from './SpotifySearch';
import { db, storage } from '../../utils/firebaseConfig';
import BuyNowButton from '../BuyNowButton';

const SongNewUI = () => {
  const theme = useTheme();

  const { songData } = useContext(CustomiseAppContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [songLoading, setSongLoading] = useState(false);

  const [color, setColor] = useState(
    searchParams.get('color') || 'black'
  );
  const [size, setSize] = useState(searchParams.get('size') || 'M');
  const [songId, setSongId] = useState(
    searchParams.get('songId') || '5ChkMS8OtdzJeqyybCc9R5'
  );
  const [style, setStyle] = useState(
    searchParams.get('style') || 'minimal'
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const initialLoad = useRef(true);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [threeSceneHeight, setThreeSceneHeight] = useState(60);

  useEffect(() => {
    const defaultParams = {
      color: 'black',
      size: 'M',
      songId: '5ChkMS8OtdzJeqyybCc9R5',
      style: 'minimal',
    };

    if (
      !searchParams.get('color') ||
      !searchParams.get('size') ||
      !searchParams.get('songId') ||
      !searchParams.get('style')
    ) {
      router.push(
        `/product/new-ui?color=${color || defaultParams.color}&size=${
          size || defaultParams.size
        }&songId=${songId || defaultParams.songId}&style=${
          style || defaultParams.style
        }`
      );
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
    setColor(event.target.value);
    window.history.replaceState(
      null,
      '',
      `/product/new-ui?color=${event.target.value}&size=${size}&songId=${songId}&style=${style}`
    );
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    window.history.replaceState(
      null,
      '',
      `/product/new-ui?color=${color}&size=${size}&songId=${songId}&style=${event.target.value}`
    );
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    window.history.replaceState(
      null,
      '',
      `/product/new-ui?color=${color}&size=${event.target.value}&songId=${songId}&style=${style}`
    );
  };

  const handleShare = () => {
    const shareData = {
      title: 'Check out this T-Shirt',
      text: 'I customised this T-Shirt with a song!! Check it out:',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          // console.log('Thanks for sharing!');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 2000);
    }
  };

  const optionsContainerRef = useRef(null);

  const handleScroll = (e) => {
    if (isMobile) {
      const scrollTop = e.target.scrollTop;
      const maxScroll = e.target.scrollHeight - e.target.clientHeight;
      const scrollFraction = scrollTop / maxScroll;
      const newHeight = Math.max(
        30,
        Math.min(70, 70 - 40 * scrollFraction)
      );
      setThreeSceneHeight(newHeight);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ThreeScene Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isMobile ? `${threeSceneHeight}vh` : '100vh',
          zIndex: 0,
        }}
      >
        <ThreeScene
          color={color}
          type="song"
          values={songData}
          style={style}
          loading={songLoading}
        />
      </Box>

      {/* Options Panel */}
      {isMobile ? (
        // Mobile: Options that scroll over the ThreeScene
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            zIndex: 1,
          }}
          onScroll={handleScroll}
          ref={optionsContainerRef}
        >
          {/* Spacer to push content below the visible ThreeScene */}
          <Box
            sx={{
              height: `${threeSceneHeight}vh`,
            }}
          />
          {/* Options Content */}
          <Box
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '16px 16px 0 0',
              boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)',
              padding: 2,
              minHeight: '100vh',
            }}
          >
            <Typography variant="h5" gutterBottom>
              NEW UI
            </Typography>
            <SpotifySearch
            color={color}
            size={size}
            style={style}
            songLoading={songLoading}
            setSongLoading={setSongLoading}
          />


          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, marginBottom: '4px' }}
          >
            Choose your style
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {[
              {
                value: 'minimal',
                label: 'Minimal',
                url: '/product-page/song/minimal.png',
              },
              {
                value: 'concert',
                label: 'Concert',
                url: '/product-page/song/concert.png',
              },
              {
                value: 'analysis',
                label: 'Analysis',
                url: '/product-page/song/analysis.png',
              },
              {
                value: 'drilldown',
                label: 'Drill Down',
                url: '/product-page/song/drilldown.png',
              },
            ].map((option) => (
              <Box
                key={option.value}
                onClick={() =>
                  handleStyleChange({ target: { value: option.value } })
                }
                sx={{
                  cursor: 'pointer',
                  padding: 0.5,
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: `2px solid ${
                    style === option.value
                      ? theme.palette.primary.main
                      : '#ccc'
                  }`,
                  transition: 'border-color 0.3s',
                  '&:hover': {
                    borderColor:
                      style === option.value
                        ? theme.palette.primary.dark
                        : '#999',
                  },
                }}
              >
                <Box
                  component="img"
                  src={option.url}
                  alt={option.label}
                  sx={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '4px',
                    mb: 1,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: style === option.value ? 'bold' : 'normal',
                    color:
                      style === option.value
                        ? theme.palette.primary.main
                        : 'inherit',
                  }}
                >
                  {option.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, marginBottom: '4px' }}
          >
            Pick your color
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {[
              { value: 'black', label: 'Black' },
              { value: 'beige', label: 'Sand' },
            ].map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                clickable
                color={color === option.value ? 'primary' : 'default'}
                variant={color === option.value ? 'filled' : 'outlined'}
                onClick={() =>
                  handleColorChange({ target: { value: option.value } })
                }
                sx={{
                  padding: '8px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '9999px',
                }}
                icon={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: option.value,
                      border: '1px solid',
                      borderColor:
                        color === option.value ? '#444444' : '#eaeaea',
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
                data={{
                  songId,
                  songData,
                  songName: songData?.details?.name || '',
                }}
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
        </Box>
      ) : (
        // Desktop: Options in Top-Right Corner
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: '360px',
            padding: 2,
            backgroundColor: '#ffffffcc',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            zIndex: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            NEW UI
          </Typography>
          <SpotifySearch
            color={color}
            size={size}
            style={style}
            songLoading={songLoading}
            setSongLoading={setSongLoading}
          />


          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, marginBottom: '4px' }}
          >
            Choose your style
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {[
              {
                value: 'minimal',
                label: 'Minimal',
                url: '/product-page/song/minimal.png',
              },
              {
                value: 'concert',
                label: 'Concert',
                url: '/product-page/song/concert.png',
              },
              {
                value: 'analysis',
                label: 'Analysis',
                url: '/product-page/song/analysis.png',
              },
              {
                value: 'drilldown',
                label: 'Drill Down',
                url: '/product-page/song/drilldown.png',
              },
            ].map((option) => (
              <Box
                key={option.value}
                onClick={() =>
                  handleStyleChange({ target: { value: option.value } })
                }
                sx={{
                  cursor: 'pointer',
                  padding: 0.5,
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: `2px solid ${
                    style === option.value
                      ? theme.palette.primary.main
                      : '#ccc'
                  }`,
                  transition: 'border-color 0.3s',
                  '&:hover': {
                    borderColor:
                      style === option.value
                        ? theme.palette.primary.dark
                        : '#999',
                  },
                }}
              >
                <Box
                  component="img"
                  src={option.url}
                  alt={option.label}
                  sx={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '4px',
                    mb: 1,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: style === option.value ? 'bold' : 'normal',
                    color:
                      style === option.value
                        ? theme.palette.primary.main
                        : 'inherit',
                  }}
                >
                  {option.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, marginBottom: '4px' }}
          >
            Pick your color
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {[
              { value: 'black', label: 'Black' },
              { value: 'beige', label: 'Sand' },
            ].map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                clickable
                color={color === option.value ? 'primary' : 'default'}
                variant={color === option.value ? 'filled' : 'outlined'}
                onClick={() =>
                  handleColorChange({ target: { value: option.value } })
                }
                sx={{
                  padding: '8px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '9999px',
                }}
                icon={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: option.value,
                      border: '1px solid',
                      borderColor:
                        color === option.value ? '#444444' : '#eaeaea',
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
              data={{
                songId,
                songData,
                songName: songData?.details?.name || '',
              }}
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
      )}
    </Box>
  );
};

export default SongNewUI;
