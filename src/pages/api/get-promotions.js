// src/pages/api/get-promotions.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { order_id, contact, email } = req.body;
  
    if (!order_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const promotions = [
        // {
        //   code: 'WOXSEN',
        //   summary: 'Rs. 400 instant discount for all orders',
        //   description: 'Rs. 400 OFF - Woxsen Sale',
        //   tnc: [
        //     'Valid only till September 27th'
        //   ]
        // },
        {
          code: 'INTRO200',
          summary: 'Rs. 200 instant discount for all orders',
          description: 'Rs. 200 OFF - Introductory Sale',
          tnc: [
            'Valid only till September 30th',
            'Can be revoked anytime'
          ]
        },
        
        // {
        //   code: 'TEST',
        //   summary: 'short summary 2',
        //   description: 'long description - One time',
        //   tnc: [
        //     'Some T&C',
        //     'Some description'
        //   ]
        // }
      ];

      return res.status(200).json({ promotions });
    } catch (error) {
      console.error('Error fetching promotions:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  