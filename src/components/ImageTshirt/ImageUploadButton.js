import React, { useRef, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUploadButton = ({ onFileUpload }) => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        onFileUpload(file);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file) {
        onFileUpload(file);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      sx={{
        border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.grey[400]}`,
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragging ? theme.palette.grey[100] : 'transparent',
        mb: 2,
      }}
    >
      <CloudUploadIcon sx={{ fontSize: '48px', color: theme.palette.primary.main }} />
      <Typography variant="h6" sx={{ mt: 2, color: theme.palette.text.primary }}>
        Drag & Drop your image here
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
        sx={{ mt: 2 }}
      >
        Browse Files
      </Button>
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ImageUploadButton;
