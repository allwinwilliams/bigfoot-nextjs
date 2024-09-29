"use client";

import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/navigation';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    const currentPath = window.location.pathname;
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('locale', language);
    const newUrl = `${currentPath}?${queryParams.toString()}`;
    
    router.push(newUrl);
    handleClose();
  };

  return (
    <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
          >
            {language.flag} {language.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
