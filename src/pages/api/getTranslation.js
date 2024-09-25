export default async function handler(req, res) {
  const { word } = req.body;
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that provides accurate Japanese translations. The translation must be in Katakana script only, and no English strings should be included. The phonetics must be based on the Katakana word and transcribed using English letters. If the word is not commonly translated, transliterate it into Katakana. The response must strictly follow this JSON format:
            {
              "word": "original word in English",
              "translation": {
                "japanese_word": "the Japanese translation or transliteration in Katakana script",
                "phonetics": "English phonetic transcription of the Japanese word based on the Katakana"
              }
            }.`,
          },
          {
            role: 'user',
            content: `Translate the word "${word}" to its true Japanese equivalent in Katakana script and provide the correct pronunciation in English.`,
          },
        ],
        temperature: 0,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.content) {
      const message = data.choices[0].message.content;

      try {
        const translation = JSON.parse(message);
        return res.status(200).json({ translation });
      } catch (parseError) {
        console.error('Error parsing translation response JSON:', parseError);
        return res.status(500).json({ error: 'Error parsing assistant response JSON' });
      }
    } else {
      console.error('Failed to retrieve translation', data);
      return res.status(500).json({ error: 'Failed to retrieve translation' });
    }
  } catch (error) {
    console.error('Error fetching translation:', error);
    return res.status(500).json({ error: 'Error fetching translation' });
  }
}
