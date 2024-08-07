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
      // Mocked promotions data
      const promotions = [
        {
          code: 'rqrqw',
          summary: 'short summary',
          description: 'long description- One time',
          tnc: [
            'Dagdasga',
            'Sahhqw'
          ]
        },
        {
          code: 'abcd',
          summary: 'short summary 2',
          description: 'long description- One time',
          tnc: [
            'Dagdasga',
            'Sahhqw'
          ]
        }
      ];

      return res.status(200).json({ promotions });
    } catch (error) {
      console.error('Error fetching promotions:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  