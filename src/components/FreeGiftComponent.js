import React, { useState } from 'react';
import { Button, Typography, Box, Paper, IconButton, Modal, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const FreeGiftComponent = () => {
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [openPostPaymentModal, setOpenPostPaymentModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handlePayment = async () => {
    setBuyNowLoading(true);
    try {
      // Step 1: Create Razorpay order
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // ₹1 in paise
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: { description: 'Free gift for ₹1' },
          line_items_total: 100, // Sending total as 100 (for demonstration purposes)
          line_items: [
            {
              type: 'free_gift',
              name: 'Surprise Gift',
              price: 100,
              quantity: 1,
              description: 'Get a surprise for ₹1',
            },
          ],
        }),
      });

      const orderData = await response.json();
      if (!orderData.id) {
        throw new Error('Failed to create Razorpay order');
      }

      // Step 2: Razorpay options and payment handling
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Free Gift',
        description: 'Get a surprise for Rs. 1',
        order_id: orderData.id,
        handler: function (response) {
          console.log(response);
          setOrderDetails({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            status: 'Payment successful!',
          });
          setOpenPostPaymentModal(true);
        },
        prefill: {},
        notes: {
          description: 'A surprise gift for ₹1',
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        setOrderDetails({
          paymentId: null,
          orderId: null,
          signature: null,
          status: `Payment failed! Reason: ${response.error.description}`,
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
    <Box sx={{ textAlign: 'center', mt: 4 }} id="free-gift">
      {/* Main Section with Button */}
      <Box
        sx={{
          padding: 4,
          margin: 'auto',
          borderRadius: 4,
          textAlign: 'center',
          mt: 4,
          maxWidth: '600px',
          position: 'relative',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Free gift delivered for ₹1
        </Typography>
        <Typography variant="h1" sx={{ my: 2 }}>
          🎁
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#777777', textAlign: 'center' }}>
          Get a surprise gift sent to you by only paying Rs. 1. Hurry to get yours home delivered within the next few days. 
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={buyNowLoading}
          sx={{
            textTransform: 'none',
            width: {
              xs: '100%',
              md: '50%',
            },
            borderRadius: 2,
            paddingY: 2,
            background: 'linear-gradient(144deg,#833ab4,#fd1d1d,#fcb045)',
            backgroundSize: '300% 300%',
            boxShadow: 0,
            animation: 'backgroundMovement 4s ease infinite',
          }}
        >
          {buyNowLoading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            <Typography variant="h6">Get your gift</Typography>
          )}
        </Button>
      </Box>

      {/* Post-Payment Confirmation Modal */}
      <Modal open={openPostPaymentModal} onClose={() => setOpenPostPaymentModal(false)}>
        <Paper sx={{ padding: 4, margin: 'auto', maxWidth: 400, textAlign: 'center', mt: 8 }}>
          {orderDetails && orderDetails.paymentId ? (
            <>
              <CheckCircleIcon sx={{ color: 'green', fontSize: '3rem' }} />
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Thank you!
              </Typography>
              <Typography variant="body1">
                You'll receive a surprise from Bigfoot within next few days. Have a good day!
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                {orderDetails?.status}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPostPaymentModal(false)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};

export default FreeGiftComponent;
