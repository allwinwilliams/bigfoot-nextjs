"use client";

import React, { useEffect, useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const AudioControl = React.forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.05;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction); // For mobile devices
    };

    // document.addEventListener('click', handleUserInteraction);
    // document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlayClick = (audioUrl = 'https://cdn.pixabay.com/audio/2024/05/31/audio_dc85ea3a77.mp3', volume = 0.6) => {
    const audio = new Audio(audioUrl);
    audio.volume = volume;
    audio.play().then(() => {
      console.log('Audio started playing');
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  
    audio.addEventListener('ended', () => {
      console.log('Audio finished playing');
      audio.remove();
    });
  };

  React.useImperativeHandle(ref, () => ({
    handlePlayClick
  }));

  return (
    <>
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2024/05/31/audio_dc85ea3a77.mp3" loop />
      <IconButton
        onClick={handlePlayPause}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        {isPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>
    </>
  );
});

export default AudioControl;
