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
            content: `You are a helpful assistant that provides accurate and **popular** Japanese translations for English words. When translating, always prioritize commonly used, contextually appropriate translations in Japanese. If there is a well-known or widely used Japanese word (in Hiragana, Katakana, or Kanji), prefer that. Only use Katakana for phonetic transliteration **if no widely used equivalent exists**. The goal is to provide translations that Japanese speakers would commonly recognize and use in real-world contexts. Return the response in JSON format, strictly following this schema:
            {
              "word": "original word in English",
              "translation": {
                "japanese_word": "the accurate and popular Japanese translation of the word. Use Hiragana, Kanji, or Katakana as appropriate",
                "phonetics": "English pronunciation of the Japanese word using English letters, without brackets or explanations"
              }
            }.`,
          },
          {
            role: 'user',
            content: `Translate the word "${word}" to the most common and popular Japanese equivalent, considering the context, and provide the correct pronunciation in English.`,
          },
        ],
        temperature: 0,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.content) {
      // Parse the content (since no function is called, we'll directly read the content)
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
