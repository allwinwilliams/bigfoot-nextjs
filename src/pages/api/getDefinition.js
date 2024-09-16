// pages/api/getDefinition.js

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
            content: 'You are a helpful dictionary assistant that provides word definitions in JSON format according to a specified schema.',
          },
          {
            role: 'user',
            content: `Define the word "${word}".`,
          },
        ],
        functions: [
          {
            name: "get_word_definition",
            description: "Provides the definition of a word according to the schema.",
            parameters: {
              type: "object",
              properties: {
                word: {
                  type: "string",
                  description: "The actual word being defined",
                },
                details: {
                  type: "object",
                  properties: {
                    phonetics: {
                      type: "string",
                      description: "The phonetic transcription of the word",
                    },
                    type: {
                      type: "array",
                      items: {
                        type: "string",
                        enum: [
                          "noun",
                          "verb",
                          "adjective",
                          "adverb",
                          "pronoun",
                          "preposition",
                          "conjunction",
                          "interjection",
                        ],
                      },
                      description: "The part(s) of speech (e.g., noun, verb)",
                    },
                    definition: {
                      type: "string",
                      description: "The dictionary definition of the word",
                    },
                    example: {
                      type: "string",
                      description: "An example sentence using the word",
                    },
                  },
                  required: ["phonetics", "type", "definition", "example"],
                  additionalProperties: false,
                },
              },
              required: ["word", "details"],
              additionalProperties: false,
            },
          },
        ],
        function_call: { "name": "get_word_definition" },
        temperature: 0,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.function_call?.arguments) {
      const functionArgs = data.choices[0].message.function_call.arguments;

      try {
        const definition = JSON.parse(functionArgs);
        return res.status(200).json({ definition });
      } catch (parseError) {
        console.error('Error parsing function arguments JSON:', parseError);
        return res.status(500).json({ error: 'Error parsing assistant response JSON' });
      }
    } else {
      console.error('Failed to retrieve definition', data);
      return res.status(500).json({ error: 'Failed to retrieve definition' });
    }
  } catch (error) {
    console.error('Error fetching definition:', error);
    return res.status(500).json({ error: 'Error fetching definition' });
  }
}
