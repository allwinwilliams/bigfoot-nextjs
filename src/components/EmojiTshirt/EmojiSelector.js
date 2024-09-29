import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Typography, Tabs, Tab, TextField, Chip, InputAdornment } from '@mui/material';
import debounce from 'lodash.debounce';
import SearchIcon from '@mui/icons-material/Search'

const EmojiSelector = ({ emojis, onEmojiClick }) => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const filteredEmojis = useMemo(() => {
    if (!emojis || !Object.keys(emojis).length) return [];

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

  return (
    <Box sx={{ paddingX: { xs: 1, md: 2 }, paddingY: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ }}>
        Select an Emoji
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        <Tab label="All Emojis" />
        {Object.keys(emojis).map((group, index) => (
          <Tab key={index} label={group.replace(/-/g, ' & ')} />
        ))}
      </Tabs>
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <TextField
            label=""
            placeholder="Search Emojis"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
            fullWidth
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
            }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, height: 180, overflowY: 'scroll' }}>
        {filteredEmojis.map((emoji) => (
          <Chip
            key={emoji.unicodeName}
            label={emoji.character}
            size="small"
            onClick={() => onEmojiClick(emoji)}
            sx={{ fontSize: '24px', padding: 2.5 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EmojiSelector;
