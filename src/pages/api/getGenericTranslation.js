export default async function handler(req, res) {
    const { word, language } = req.body;
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
              content: `You are a helpful assistant that provides accurate and popular translations of English words into the specified target language. The target language is ${language}.
      
      When translating, always prioritize commonly used, contextually appropriate translations in the target language. If there is a well-known or widely used equivalent in the target language, prefer that. If the input word is a phonetic spelling of a word in the target language, translate it into the correct word in the target language.
      
      The goal is to provide translations that only include the word in the target language and its phonetics (if applicable), without any additional context, brackets, or explanations.
      
      **Do not include the original English word, any brackets, or parentheses in the "translated_word". The "translated_word" should contain only the word in the target language.**
      
      If the input word is already in the target language, return the exact same word and provide its phonetics in English (if applicable).
      
      Return the response in JSON format strictly following this schema:
      {
        "word": "original word in English or target language",
        "translation": {
          "translated_word": "the accurate and popular translation of the word into the target language",
          "phonetics": "pronunciation of the translated word using English letters"
        }
      }.
      
      Do not include any extra text, alternative options, or explanations in the translation. Only provide a single word as the translation.`,
            },
            {
              role: 'user',
              content: `Translate the word "${word}" to the most common and popular equivalent in ${language}, considering the context, and provide the correct pronunciation in English.`,
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
  