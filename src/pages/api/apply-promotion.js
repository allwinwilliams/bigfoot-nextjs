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
  
    // Mocked promotion validation logic
    const mockPromotionCodes = {
      "50POFF": {
        reference_id: "PROMO123",
        type: "coupon",
        code: "50POFF",
        value: 50,
        value_type: "Fixed amount",
        description: "50% off promotion"
      },
      "EXPIRED": {
        reference_id: "PROMO456",
        type: "coupon",
        code: "EXPIRED",
        value: 0,
        value_type: "Fixed amount",
        description: "Expired promotion"
      }
    };
  
    const promotion = mockPromotionCodes[code];
  
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
  