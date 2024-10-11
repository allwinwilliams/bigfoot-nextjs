import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Button, CircularProgress, Box, Typography, Modal, Paper, Divider, Grid, IconButton, Chip, Select, MenuItem, ButtonGroup } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SizeChart from '../SizeChart';
import ProductPrice from '../ProductPrice';

const BuyNowButton = ({ color, style, type, data, storage, db, price = 119900 }) => {
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [openPrePaymentModal, setOpenPrePaymentModal] = useState(false);
  const [openPostPaymentModal, setOpenPostPaymentModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [fabric, setFabric] = useState({ id: 'premium', label: 'Premium Cotton', description: '100% Premium Amit Cotton', price: 119900 });
  const [size, setSize] = useState('S');
  const [dynamicPrice, setDynamicPrice] = useState(price);

  const canvasRef = useRef(null);
  
  // useEffect(() => {
  //   if (fabric === 'Premium Cottom') {
  //     setDynamicPrice(109900);
  //   } else if (fabric === 'Luxury') {
  //     setDynamicPrice(119900);
  //   }
  // }, [fabric]);

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

  const handleBuyNow = async () => {
    setOpenPrePaymentModal(true);
    // confirmPurchase();
  };

  const handleFabricChange = (event) => {
    setFabric(event.target.fabric);
    setDynamicPrice(event.target.price);
  }

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  
  const confirmPurchase = async () => {
    setBuyNowLoading(true);
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas ? canvas.toDataURL('image/png') : "";
      
      // const threeCanvas = document.querySelector('#three-canvas canvas');
      // const threeCanvasDataUrl = threeCanvas ? threeCanvas.toDataURL('image/png') : "";
      const timestamp = Date.now();
      const storageRef = ref(storage, `orders/${type}/${style}-${timestamp}.png`);
      await uploadString(storageRef, canvasDataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);

      // if (type === "song") {
      //   dataToStore.data.songId = data.songId ;
      //   dataToStore.data.name = data.songName || '';
      // } else if (type === "ai") {
      //   dataToStore.data.prompt = data.prompt || '';
      // } else if(type === "emoji"){
      //   dataToStore.data.emoji = data.emoji || '';
      //   dataToStore.data.text = data.text || '';
      // } else if(type === "dictionary"){
      //   dataToStore.data.text = data.text || '';
      // } else if(type === "japanese"){
      //   dataToStore.data.word = data.text || '';
      // }

      const dataToStore = {
        color,
        size,
        style,
        type,
        imageUrl,
        data,
        fabric: fabric.id,
        timestamp: new Date().toISOString(),
      };

      

      const docRef = await addDoc(collection(db, 'orders'), dataToStore);
      const docId = docRef.id;

      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: dynamicPrice,
          currency: 'INR',
          receipt: `receipt_${docId}`,
          payment_capture: true,
          notes: { docId, ...dataToStore },
          line_items_total: dynamicPrice,
          line_items: [
            {
              type: "e-commerce",
              sku: `//TEE/${type}/${style}/${fabric.id}/${timestamp}`,
              variant_id: `//TEE/${type}/${style}/${fabric.id}`,
              price: dynamicPrice,
              tax_amount: `${Math.ceil(dynamicPrice * 0.18)}`,
              quantity: 1,
              name: `${type} T-Shirt - ${style}`,
              description: `Oversized Fit T-Shirt with ${type}`,
              // weight: 500,
              // dimensions: {
              //   length: 100,
              //   width: 50,
              //   height: 30
              // },
              image_url: imageUrl,
              // product_url: window.location.href,
              // notes: {
              //  dataToStore
              // }
            }
          ]
        })
      });

      const orderData = await response.json();

      if (!orderData.id) {
        throw new Error('Failed to create Razorpay order');
      }
      setOpenPrePaymentModal(false);
      console.log("Order ID: ", orderData.id);
      const options = {
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        one_click_checkout: true,
        name: 'Bigfoot Clothing',
        order_id: orderData.id,
        show_coupons: true,
        handler: function (response) {
          setOrderDetails({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            status: 'Payment successful!'
          });
          setOpenPostPaymentModal(true);
        },
        prefill: {},
        notes: {}
      };

      if (typeof window.Razorpay === 'undefined') {
        console.error('Razorpay SDK not loaded');
        throw new Error('Razorpay SDK not loaded');
      }

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        setOrderDetails({
          paymentId: null,
          orderId: null,
          signature: null,
          status: `Payment failed! Reason: ${response.error.description}`
        });
        setOpenPostPaymentModal(true);
      });

      rzp1.open();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setBuyNowLoading(false);
    }
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
            {`Select size and fabric`}
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 'normal' }}>
              See prices based on fabric
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
        <Modal
          open={openPrePaymentModal}
          onClose={() => setOpenPrePaymentModal(false)}
          sx={{ top: "4%"}}
        >
          <Paper sx={{ padding: 4, margin: 'auto', maxWidth: '100%', width: '480px', borderRadius: 4, position: 'relative' }}>
            <IconButton
              onClick={() => setOpenPrePaymentModal(false)}
              sx={{ position: 'absolute', top: 16, right: 16 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4">
              Place your order
            </Typography>
            {/* <Box sx={{ borderRadius: 2, marginY: '16px', border: '1px solid #ddd' }}>
              <canvas ref={canvasRef}  />
            </Box> */}
            {/* <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={6} md={6}>
                <Typography variant="label">
                  Color
                </Typography>
                <Typography variant="subtitle1">
                  <strong>{color}</strong>
                </Typography>
              </Grid>
              
              <Grid item xs={6} md={6}>
                <Typography variant="label">
                  Type
                </Typography>
                <Typography variant="subtitle1">
                  <strong>{type} - {style}</strong>
                </Typography>
              </Grid>
            </Grid> */}
            <Box sx={{marginY: 4}}>
              <Box sx={{marginBottom: 2}}>
                <Typography variant="subtitle1" sx={{fontWeight: 800}} >
                  Select your size (Fits like Uniqlo)
                </Typography>
                <SizeChart />
              </Box>
              <Box>
                <Select
                  value={size}
                  onChange={(e) => handleSizeChange(e)}
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
            <Box sx={{marginY: 4}}>
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{fontWeight: 800, marginBottom: '4px'}} >
                  Choose your fabric
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <ButtonGroup variant="outlined" color="primary" aria-label="outlined button group" fullWidth>
                  {[
                    { id: 'premium', label: 'Premium', description: '100% Cotton - Biowashed', price: 119900 },
                    { id: 'luxury', label: 'Luxury', description: '100% Cotton - SoftTouch', price: 149900 },
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
            </Box>
            
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
                    {`Buy Now @ `}
                    <ProductPrice priceInINR={`${Math.ceil(dynamicPrice / 100)}`}  priceInUSD={`${Math.ceil(dynamicPrice / 2000)}`}/>
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: 'none', color: '#AAAAAA' }}>
                    Offers available in next step
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
          </Paper>
        </Modal>
      </Box>
      <Modal
        open={openPostPaymentModal}
        onClose={() => setOpenPostPaymentModal(false)}
      >
        <Paper sx={{ padding: 4, margin: 'auto', maxWidth: 500, textAlign: 'center' }}>
          {orderDetails && (
            <>
              <CheckCircleIcon sx={{ color: 'green', fontSize: '2rem' }} />
            </>
          )}
          <Typography variant="h6" gutterBottom>
            Order Status
          </Typography>
          {orderDetails && (
            <>

              <Typography variant="h4">
                {orderDetails.status}
              </Typography>
              {orderDetails.orderId && (
                <>
                  <Typography variant="body1">
                    Order ID: {orderDetails.orderId}
                  </Typography>
                  <Typography variant="body1">
                    Payment ID: {orderDetails.paymentId}
                  </Typography>
                </>
              )}
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPostPaymentModal(false)}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

export default BuyNowButton;