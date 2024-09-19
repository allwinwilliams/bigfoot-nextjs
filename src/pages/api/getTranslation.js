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
            content: `You are a helpful assistant that provides accurate Japanese translations for words. The Japanese translation should be the true equivalent in Japanese, not a phonetic transliteration. You should return the response in JSON format, strictly following this schema:
            {
              "word": "original word in English",
              "translation": {
                "japanese_word": "the accurate Japanese word. If not available, the transliteration in Katakana script",
                "phonetics": "English pronunciation of the japanese word using English letters"
              }
            }.`,
          },
          {
            role: 'user',
            content: `Translate the word "${word}" to the actual Japanese equivalent word in Katakana script and provide the correct pronunciation in English.`,
          },
        ],
        functions: [
          {
            name: "get_word_translation",
            description: "Provides the accurate Japanese translation of a word along with the pronunciation in English and original word according to the schema.",
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
                      description: "The accurate translated word in Japanese (Katakana or other appropriate script)",
                    },
                    phonetics: {
                      type: "string",
                      description: "The English phonetic transcription of the Japanese word using only English letters",
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
        function_call: { name: "get_word_translation" },
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
