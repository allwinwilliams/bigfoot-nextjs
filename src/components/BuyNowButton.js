import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Button, CircularProgress, Box, Typography, Modal, Paper, Divider, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BuyNowButton = ({ color, size, style, type, prompt, songId, songData, songName, storage, db, price = 139900 }) => {
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [openPrePaymentModal, setOpenPrePaymentModal] = useState(false);
  const [openPostPaymentModal, setOpenPostPaymentModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

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

  const handleBuyNow = async () => {
    setOpenPrePaymentModal(true);
  };
  

  const confirmPurchase = async () => {
    setBuyNowLoading(true);
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas ? canvas.toDataURL('image/png') : "";
      
      // const threeCanvas = document.querySelector('#three-canvas canvas');
      // const threeCanvasDataUrl = threeCanvas ? threeCanvas.toDataURL('image/png') : "";

      const storageRef = ref(storage, `orders/${type}-${songId ? songId + '-' : ''}${Date.now()}.png`);
      await uploadString(storageRef, canvasDataUrl, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);

      const dataToStore = {
        color,
        size,
        style,
        type,
        imageUrl,
        timestamp: new Date().toISOString(),
      };

      if (type === "song") {
        dataToStore.songId = songId;
        dataToStore.songName = songData.details?.name || '';
      } else if (type === "ai") {
        dataToStore.prompt = prompt || '';
      }

      const docRef = await addDoc(collection(db, 'orders'), dataToStore);
      const docId = docRef.id;

      setOpenPrePaymentModal(false);

      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: price,
          currency: 'INR',
          receipt: `receipt_${docId}`,
          notes: dataToStore,
          line_items_total: price,
          line_items: [
            {
              type: "e-commerce",
              sku: "1g234",
              variant_id: "12r34",
              price: price,
              tax_amount: `${Math.ceil(price * 0.18)}`,
              quantity: 1,
              name: `${style} tee - ${type === "song" ? songData.details?.name || '' : 'Customised'}`,
              description: `Korean Fit T-Shirt with ${type} artwork`,
              weight: 500,
              dimensions: {
                length: 100,
                width: 50,
                height: 30
              },
              image_url: imageUrl,
              product_url: window.location.href,
              notes: {}
            }
          ]
        })
      });

      const orderData = await response.json();

      if (!orderData.id) {
        throw new Error('Failed to create Razorpay order');
      }

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
            {`Buy Now @ ₹${Math.ceil(price / 100)}`}
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 'normal' }}>
              Limited Time Offer
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
          sx={{ top: "5%" }}
        >
          <Paper sx={{ padding: 4, margin: 'auto', maxWidth: 340, position: 'relative' }}>
            <IconButton
              onClick={() => setOpenPrePaymentModal(false)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Confirm Your Order
            </Typography>
            <Box sx={{ borderRadius: 2, marginY: '16px', border: '1px solid #ddd' }}>
              <canvas ref={canvasRef}  />
            </Box>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
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
                  Size
                </Typography>
                <Typography variant="subtitle1">
                  <strong>{size}</strong>
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
              <Grid item xs={6} md={6}>
                <Typography variant="label">
                  Price
                </Typography>
                <Typography variant="subtitle1">
                  <strong>₹{Math.ceil(price / 100)}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={confirmPurchase}
              fullWidth
              sx={{ marginBottom: 2, fontWeight: 'bold', paddingY: 2, textTransform: 'none' }}
              disabled={buyNowLoading}
            >
              {buyNowLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Order Now'
              )}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenPrePaymentModal(false)}
              fullWidth
              sx={{ marginBottom: 2, fontWeight: 'bold', textTransform: 'none', }}
            >
              Close
            </Button>
            <Typography variant="body2" sx={{color: '#999999'}}>
              Note: You may not be able to retrieve certain designs, if you exit
            </Typography>
          </Paper>
        </Modal>
      </Box>
      <Modal
        open={openPostPaymentModal}
        onClose={() => setOpenPostPaymentModal(false)}
      >
        <Paper sx={{ padding: 4, margin: 'auto', maxWidth: 500, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Order Status
          </Typography>
          {orderDetails && (
            <>
              <Typography variant="body1">
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
                  <Typography variant="body1">
                    Razorpay Signature: {orderDetails.signature}
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