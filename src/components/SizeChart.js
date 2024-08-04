import React, { useState } from 'react';
import { Typography, Link, Modal, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SizeChart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Link
          component="button"
          variant="body2"
          onClick={handleOpen}
          sx={{ marginLeft: 2, textDecoration: 'underline', cursor: 'pointer' }}
        >
          Size chart
        </Link>
      </Box>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="size-chart-modal"
        aria-describedby="size-chart-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                >
                <Typography id="size-chart-modal" variant="h6" component="h2">
                    Size Chart
                </Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{
                    //   position: 'absolute',
                    //   top: 8,
                    //   right: 8,
                    }}
                  >
                    <CloseIcon />
                </IconButton>
            </Box>
            <img
                src="https://image.uniqlo.com/UQ/ST3/in/imagesother/sizechart/graph_bodysize_uq_m_20fw.jpg"
                alt="Size Chart"
                style={{ width: '100%', marginTop: '16px' }}
            />
        </Box>
      </Modal>
    </div>
  );
};

export default SizeChart;