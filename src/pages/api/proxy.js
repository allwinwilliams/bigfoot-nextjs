import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log('Fetching image from URL:', url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch the image. Status:', response.status, 'Status Text:', response.statusText);
      return res.status(response.status).json({ error: 'Failed to fetch the image' });
    }
    const data = await response.arrayBuffer();
    const contentType = response.headers.get('content-type');
    console.log('Fetched image successfully. Content-Type:', contentType);

    res.setHeader('Content-Type', contentType);
    res.send(Buffer.from(data));
  } catch (error) {
    console.error('Error fetching the image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
