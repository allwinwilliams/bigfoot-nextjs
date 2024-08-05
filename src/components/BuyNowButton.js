import React, { useState } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import NotesIcon from '@mui/icons-material/Notes';

const BuyNowButton = ({ color, size, style, type, prompt, songId, songData, songName, storage, db, price = 139900 }) => {
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  const handleBuyNow = async () => {
    setBuyNowLoading(true);
    try {
      const canvas = document.getElementById('p5-canvas');
      const canvasDataUrl = canvas.toDataURL('image/png');
      const threeCanvas = document.querySelector('#three-canvas canvas');
      const threeCanvasDataUrl = threeCanvas ? threeCanvas.toDataURL('image/png') : "";

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
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert(`Razorpay Signature: ${response.razorpay_signature}`);
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
        alert(`Payment failed! Reason: ${response.error.description}`);
        console.error('Payment failed details:', response);
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
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      sx={{
        mb: 2,
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
  );
};

export default BuyNowButton;
