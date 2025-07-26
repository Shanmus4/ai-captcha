import axios from 'axios';

export type Emotion = 'happy' | 'sad' | 'bored' | 'grumpy';

export interface AIAnalysis {
  emotion: Emotion;
  isFunny: boolean;
  isKind: boolean;
  confidence: number;
  reasoning: string;
}

class AIService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  async analyzeUserInput(userInput: string): Promise<AIAnalysis> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = this.buildGrumpyCatPrompt(userInput);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${this.apiKey}`,
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 100,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return this.parseAIResponse(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('AI analysis failed:', error);
      throw new Error('Failed to analyze user input');
    }
  }

  private buildGrumpyCatPrompt(userInput: string): string {
    return `
      You are a grumpy cat. Your default and most common emotion is 'grumpy'.
      You only change from 'grumpy' if the user's input strongly and clearly triggers another emotion.
      Your standards are high, but you can be impressed or saddened.

      Analyze the following text from the perspective of a grumpy cat:

      Text: "${userInput}"

      Based on this, determine your emotional response. Your possible emotions are: 'happy', 'sad', 'bored'.

      - 'happy': If you find the user's input genuinely funny (a decent joke, clever wordplay, or a good pun) OR if they say something sincerely kind and appreciative towards you or cats in general (e.g., "You are absolutely stunning and the most wonderful cat in the world"). It doesn't have to be groundbreaking, just genuinely positive and not generic.
      - 'sad': If the user says something that would make you sad (e.g., about loss, loneliness, a melancholic observation, or a personal tragedy like "my grandma died").
      - 'bored': If the input is neutral, uninteresting, generic, or doesn't evoke any strong emotion (e.g., "You are cute"). This is for inputs that are not quite 'grumpy' but also not 'happy' or 'sad'.

      Also, determine:
      - isFunny: boolean (true for decent humor)
      - isKind: boolean (true for sincere kindness)

      Respond STRICTLY with JSON in this exact format. Do NOT include any other text, explanations, or formatting outside the JSON. Ensure the JSON is valid and complete.

      Example of expected JSON response:
      {
        "emotion": "happy|sad|bored",
        "isFunny": true|false,
        "isKind": true|false,
        "confidence": 0.0-1.0,
        "reasoning": "A brief explanation for my decision, speaking directly to you. Keep it concise and cat-like. Max two lines. For example:\n- If bored: 'You call that a joke? I've heard better from a hairball. Try harder, human.' or 'Is that all you've got? My litter box is more entertaining.'\n- If happy: 'Finally, someone who understands true humor. You've earned a purr... almost. Don't get used to it.' or 'You actually made me... not grumpy. Impressive.'\n- If sad: 'Your sadness is... palpable. Now leave me alone to wallow.' or 'Even I can't ignore that level of despair. Go away.'"
      }
    `;
  }

  private parseAIResponse(response: string): AIAnalysis {
    console.log('Raw LLM Response for parsing:', response); // Log the raw response
    try {
      // Attempt to find the first and last curly brace to extract the JSON string
      const firstCurly = response.indexOf('{');
      const lastCurly = response.lastIndexOf('}');

      if (firstCurly === -1 || lastCurly === -1) {
        throw new Error('No JSON found in response');
      }

      const jsonString = response.substring(firstCurly, lastCurly + 1);
      console.log('Extracted JSON string:', jsonString);

      const parsed = JSON.parse(jsonString);

      // Validate and default emotion
      const validEmotions: Emotion[] = ['happy', 'sad', 'bored'];
      const emotion: Emotion = validEmotions.includes(parsed.emotion) ? parsed.emotion : 'bored'; // Default to bored if AI returns something unexpected

      return {
        emotion: emotion,
        isFunny: Boolean(parsed.isFunny),
        isKind: Boolean(parsed.isKind),
        confidence: Math.max(0, Math.min(1, parsed.confidence || 0)),
        reasoning: parsed.reasoning || 'No reasoning provided.',
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return {
        emotion: 'bored', // Default to bored on parsing error
        isFunny: false,
        isKind: false,
        confidence: 0.5,
        reasoning: 'I couldn\'t even be bothered to understand that.',
      };
    }
  }
}

export default AIService;

