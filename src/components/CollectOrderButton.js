import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { 
  Button, 
  CircularProgress, 
  Box, 
  Typography, 
  Modal, 
  Paper, 
  Divider, 
  Grid, 
  IconButton, 
  Select, 
  MenuItem, 
  TextField, 
  ButtonGroup 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SizeChart from './SizeChart';

const CollectOrderButton = ({ color, style, type, data, storage, db, price = 89900 }) => {
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [openPrePaymentModal, setOpenPrePaymentModal] = useState(false);
  const [openQRModal, setOpenQRModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [fabric, setFabric] = useState({ id: 'premium', label: 'Premium Cotton', description: '100% Premium Amit Cotton', price: 89900 });
  const [size, setSize] = useState('S');
  const [dynamicPrice, setDynamicPrice] = useState(price);

  // New state variables for user information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');

  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (openPrePaymentModal) {
      const interval = setInterval(() => {
        const threeCanvas = document.querySelector('#three-canvas canvas');
        const currentCanvas = canvasRef.current;

        if (threeCanvas && currentCanvas) {
          const ctx = currentCanvas.getContext('2d');
          const newWidth = 220;
          const newHeight = 260;

          currentCanvas.width = newWidth;
          currentCanvas.height = newHeight;
        
          ctx.clearRect(0, 0, newWidth, newHeight);
          ctx.drawImage(threeCanvas, 0, 0, newWidth, newHeight);

          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [openPrePaymentModal]);

  const handleBuyNow = () => {
    setOpenPrePaymentModal(true);
  };

  const handleFabricChange = (event) => {
    setFabric(event.target.fabric);
    setDynamicPrice(event.target.price);
  }

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  
  // Handlers for user information fields
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  }

  const confirmPurchase = async () => {
    setBuyNowLoading(true);
    try {
      // Validate input fields
      if (!name || !email || !phone || !department) {
        alert('Please fill in all required fields.');
        setBuyNowLoading(false);
        return;
      }

      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas ? canvas.toDataURL('image/png') : "";
      
      const timestamp = Date.now();
      const storageRef = ref(storage, `orders/${type}/${style}-${timestamp}.png`);
      await uploadString(storageRef, canvasDataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);

      const dataToStore = {
        name,
        email,
        phone,
        department,
        color,
        size,
        style,
        type,
        imageUrl,
        fabric: fabric.id,
        timestamp: new Date().toISOString(),
      };

      if (type === "song") {
        dataToStore.songId = data.songId ;
        dataToStore.name = data.songName || '';
      } else if (type === "ai") {
        dataToStore.prompt = data.prompt || '';
      } else if(type === "emoji"){
        dataToStore.emoji = data.emoji || '';
        dataToStore.text = data.text || '';
      }

      const docRef = await addDoc(collection(db, 'orders'), dataToStore);
      const docId = docRef.id;

      // Open QR Modal
      setOpenPrePaymentModal(false);
      setOpenQRModal(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setBuyNowLoading(false);
    }
  };

  const handleDone = () => {
    setOpenQRModal(false);
    setOpenSuccessModal(true);
    // Optionally reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setDepartment('');
    setSize('S');
    setFabric({ id: 'premium', label: 'Premium Cotton', description: '100% Premium Amit Cotton', price: 89900 });
    setDynamicPrice(price);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{
          mb: 1,
          padding: '12px',
          fontWeight: 'bold',
          borderRadius: '16px',
          textTransform: 'none',
        }}
        onClick={handleBuyNow}
        disabled={buyNowLoading}
      >
        {buyNowLoading ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            {/* {`Buy Now @ ₹${Math.ceil(price / 100)}`} */}
            {`Select size`}
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 'normal' }}>
              Enter details to confirm order
            </Typography>
          </Box>
        )}
      </Button>

      <Box
        sx={{
          maxHeight: '80vh',  // Adjust the maximum height as needed
          overflowY: 'auto',   // Enable vertical scrolling
          padding: 1,
        }}
      >
        {/* Pre-Payment Modal */}
        <Modal
          open={openPrePaymentModal}
          onClose={() => setOpenPrePaymentModal(false)}
          sx={{ top: "4%"}}
        >
          <Paper sx={{ padding: 4, margin: 'auto', maxWidth: '100%', width: '480px', borderRadius: 4, position: 'relative' }}>
            <IconButton
              onClick={() => setOpenPrePaymentModal(false)}
              sx={{ position: 'absolute', top: 12, right: 16 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              Confirm your order
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{marginY: 4}}>
              {/* User Information Fields */}
              <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Department"
                    variant="outlined"
                    fullWidth
                    value={department}
                    onChange={handleDepartmentChange}
                    required
                  />
                </Grid>
              </Grid>
              
              {/* Size Selection */}
              <Box sx={{marginBottom: 4}}>
                <Typography variant="subtitle1" sx={{fontWeight: 800}} >
                  Select your size
                </Typography>
                <SizeChart />
                <Box sx={{marginTop: 2}}>
                  <Select
                    value={size}
                    onChange={handleSizeChange}
                    displayEmpty
                    fullWidth
                    sx={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      borderRadius: '9999px',
                    }}
                  >
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>

              {/* Fabric Selection */}
              {/* <Box sx={{marginBottom: 4}}>
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Pick your fabric
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <ButtonGroup variant="outlined" color="primary" aria-label="outlined button group" fullWidth>
                    {[
                      { id: 'premium', label: 'Premium', description: '100% Amid Cotton', price: 89900 },
                      { id: 'luxury', label: 'Luxury', description: '100% SoftTouch Cotton', price: 119900 },
                    ].map((option) => (
                      <Button
                        key={option.id}
                        onClick={() => handleFabricChange({ target: { fabric: option, price: option.price } })}
                        variant={fabric.id === option.id ? 'contained' : 'outlined'}
                        sx={{
                          paddingY: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textTransform: 'none',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'none' }}>
                          {option.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '12px', textTransform: 'none' }}>
                          {option.description}
                        </Typography>
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>
              </Box> */}
              
              {/* Buy Now Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={confirmPurchase}
                fullWidth
                sx={{ marginY: 2, fontWeight: 'bold', paddingY: 2, textTransform: 'none', borderRadius: 2 }}
                disabled={buyNowLoading}
              >
                {buyNowLoading ? (
                  <Box> 
                    <CircularProgress size={24} color="inherit" />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'none' }}>
                      {`Buy Now @ ₹${Math.ceil(dynamicPrice / 100)}`}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px', textTransform: 'none' }}>
                      Scan QR code to pay
                    </Typography>
                  </Box>
                )}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenPrePaymentModal(false)}
                fullWidth
                sx={{ marginBottom: 2, fontWeight: 'bold', textTransform: 'none', borderRadius: 2 }}
                disabled={buyNowLoading}
              >
                Close
              </Button>
              <Typography variant="body2" sx={{color: '#999999'}}>
                Note: Certain designs will be lost, if you exit now. There is no return or exchange unless due to manufacturing damage. So, read information carefully before proceeding.
              </Typography>
            </Box>
          </Paper>
        </Modal>

        {/* QR Code Modal */}
        <Modal
          open={openQRModal}
          onClose={() => setOpenQRModal(false)}
        >
          <Paper sx={{ padding: 4, margin: 'auto', maxWidth: '80%', width: '400px', borderRadius: 4, textAlign: 'center', position: 'relative' }}>
            <IconButton
              onClick={() => setOpenQRModal(false)}
              sx={{ position: 'absolute', top: 16, right: 16 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              Scan to Pay Rs. 899
            </Typography>
            <Box sx={{ marginY: 2 }}>
              {/* Replace the src with your actual QR code image path */}
              <img src="/product-page/woxsen/qr.png" alt="Payment QR Code" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Typography variant="body1" gutterBottom>
              Pay someone@hdfcbank
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDone}
              fullWidth
              sx={{ marginTop: 2, fontWeight: 'bold', paddingY: 1.5, textTransform: 'none', borderRadius: 2 }}
            >
              Payment Done
            </Button>
          </Paper>
        </Modal>

        {/* Success Modal */}
        <Modal
          open={openSuccessModal}
          onClose={() => setOpenSuccessModal(false)}
        >
          <Paper sx={{ padding: 4, margin: 'auto', maxWidth: '400px', width: '90%', borderRadius: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Order Collected Successfully!
            </Typography>
            <Typography variant="body1" sx={{ marginY: 2 }}>
              Thank you for your purchase. Your order is being processed.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenSuccessModal(false)}
              fullWidth
              sx={{ marginTop: 2, fontWeight: 'bold', paddingY: 1.5, textTransform: 'none', borderRadius: 2 }}
            >
              Close
            </Button>
          </Paper>
        </Modal>
      </Box>
    </>
  );
};

export default CollectOrderButton;
