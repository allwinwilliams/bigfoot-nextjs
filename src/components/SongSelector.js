"use client";

import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { CustomiseAppContext } from '../context/CustomiseProvider';

const SongSelector = () => {
  const { accessToken, changeSongId, changeSongData } = useContext(CustomiseAppContext);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    console.log("Submit:", inputValue);
    changeSongId(inputValue);
    handleClose();
    if (accessToken) {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${inputValue}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      changeSongData(data);
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleOpen}
        fullWidth
      >
        {inputValue === "" ? "Select a song" : inputValue}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Select a Song</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="song-name"
            name="properties[Song Name]"
            variant="outlined"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SongSelector;
