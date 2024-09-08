// pages/api/apply-promotion.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { order_id, contact, email, code } = req.body;
  
    if (!order_id || !code) {
      return res.status(400).json({
        failure_code: "INVALID_PROMOTION",
        failure_reason: "Order ID and Promotion Code are required"
      });
    }
  
    const mockPromotionCodes = {
      "FRIENDS50": {
        reference_id: "PROMO1",
        type: "offer",
        code: "FRIENDS50",
        value: 50,
        value_type: "Percentage",
        description: "Flat 50% off promotion for close friends"
      },
      "VERYSPECIAL": {
        reference_id: "PROMOTERS",
        type: "offer",
        code: "VERYSPECIAL",
        value: 130000,
        value_type: "Fixed amount",
        description: "Rs. 1300 off promotion for promoters"
      },
      "RAZORPAY": {
        reference_id: "RAZORPAY_OFFER",
        type: "offer",
        code: "RAZORPAY",
        value: 70000,
        value_type: "Fixed amount",
        description: "Rs. 700 off for Razorpay"
      },
      "CLOSEFRIENDS": {
        reference_id: "CLOSE_FRIEND_OFFER",
        type: "offer",
        code: "CLOSEFRIENDS",
        value: 70000,
        value_type: "Fixed amount",
        description: "Rs. 700 off for Close Friends"
      },
      "WOXSEN": {
        reference_id: "WOXSEN_OFFER",
        type: "offer",
        code: "WOXSEN",
        value: 60000,
        value_type: "Fixed amount",
        description: "Rs. 600 off for Woxsen"
      },
      "FAM1000": {
        reference_id: "PROMO2",
        type: "coupon",
        code: "FAM1000",
        value: 100000,
        value_type: "Fixed amount",
        description: "Rs. 1000 off across all products - For Closest Friends"
      },
      "COMMUNITY500": {
        reference_id: "PROMO3",
        type: "coupon",
        code: "COMMUNITY500",
        value: 50000,
        value_type: "Fixed amount",
        description: "Rs. 500 off across all products"
      },
      "INTRO200": {
        reference_id: "PROMO4",
        type: "coupon",
        code: "INTRO200",
        value: 20000,
        value_type: "Fixed amount",
        description: "Rs. 200 off for introductory sale across"
      },
      "EXPIRED": {
        reference_id: "TEST",
        type: "coupon",
        code: "EXPIRED",
        value: 10,
        value_type: "Fixed amount",
        description: "Expired promotion"
      }
    };
  
    // const promotion = mockPromotionCodes[code];
    const promotion = mockPromotionCodes[code.toUpperCase()];
  
    if (!promotion) {
      return res.status(400).json({
        failure_code: "INVALID_PROMOTION",
        failure_reason: "Invalid promotion code"
      });
    }
  
    if (code === "EXPIRED") {
      return res.status(400).json({
        failure_code: "INVALID_PROMOTION",
        failure_reason: "Promotion code has expired"
      });
    }
  
    // Successful promotion application
    return res.status(200).json({
      promotion: {
        reference_id: promotion.reference_id,
        type: promotion.type,
        code: promotion.code,
        value: promotion.value,
        value_type: promotion.value_type,
        description: promotion.description
      }
    });
  }
  