// pages/api/getTranslation.js

export default async function handler(req, res) {
  const { word } = req.body;
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides Japanese translations in Katakana script with English pronunciation (phonetics) in JSON format according to a specified schema.',
          },
          {
            role: 'user',
            content: `Translate the word "${word}" to Japanese in Katakana script and provide the pronunciation in English.`,
          },
        ],
        functions: [
          {
            name: "get_word_translation",
            description: "Provides the Japanese translation of a word in Katakana script along with the pronunciation in English and original word according to the schema.",
            parameters: {
              type: "object",
              properties: {
                word: {
                  type: "string",
                  description: "The original word being translated",
                },
                translation: {
                  type: "object",
                  properties: {
                    japanese_word: {
                      type: "string",
                      description: "The translated word in Katakana script",
                    },
                    phonetics: {
                      type: "string",
                      description: "The phonetic transcription in English of the Japanese word",
                    },
                  },
                  required: ["japanese_word", "phonetics"],
                  additionalProperties: false,
                },
              },
              required: ["word", "translation"],
              additionalProperties: false,
            },
          },
        ],
        function_call: { "name": "get_word_translation" },
        temperature: 0,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.function_call?.arguments) {
      const functionArgs = data.choices[0].message.function_call.arguments;

      try {
        const translation = JSON.parse(functionArgs);
        return res.status(200).json({ translation });
      } catch (parseError) {
        console.error('Error parsing function arguments JSON:', parseError);
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
