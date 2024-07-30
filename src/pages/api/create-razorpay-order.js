// src/pages/api/create-razorpay-order.js

import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency, receipt, notes, line_items_total, line_items } = req.body;

  if (!amount || !currency || !receipt || !line_items_total || !line_items) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET,
    });

    const options = {
      amount,
      currency,
      receipt,
      notes,
      line_items_total,
      line_items,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
