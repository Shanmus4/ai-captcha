import axios from 'axios'

export interface AIAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral'
  humorScore: number // 0-10 scale
  isAppreciative: boolean
  isFunny: boolean
  confidence: number
  reasoning: string
}

export interface AIThresholds {
  humorThreshold: number // Minimum humor score (0-10)
  sentimentThreshold: number // Minimum positive sentiment confidence
  appreciationKeywords: string[] // Keywords that indicate appreciation
}

const DEFAULT_THRESHOLDS: AIThresholds = {
  humorThreshold: 6.0, // Medium humor threshold
  sentimentThreshold: 0.7, // 70% confidence for positive sentiment
  appreciationKeywords: [
    'beautiful', 'amazing', 'wonderful', 'fantastic', 'awesome', 'great',
    'love', 'like', 'appreciate', 'thank', 'grateful', 'blessed',
    'cute', 'adorable', 'sweet', 'lovely', 'charming', 'delightful'
  ]
}

class AIService {
  private apiKey: string
  private thresholds: AIThresholds

  constructor(apiKey?: string, thresholds?: Partial<AIThresholds>) {
    this.apiKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY || ''
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...thresholds }
  }

  async analyzeUserInput(userInput: string): Promise<AIAnalysis> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const prompt = this.buildAnalysisPrompt(userInput)
    
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at analyzing humor, sentiment, and appreciation in text. Provide detailed analysis with specific scores and reasoning.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': Bearer ,
            'Content-Type': 'application/json'
          }
        }
      )

      const analysis = this.parseAIResponse(response.data.choices[0].message.content)
      return this.applyThresholds(analysis, userInput)
    } catch (error) {
      console.error('AI analysis failed:', error)
      throw new Error('Failed to analyze user input')
    }
  }

  private buildAnalysisPrompt(userInput: string): string {
    return 
Analyze the following text for humor, sentiment, and appreciation. Provide your response in JSON format:

Text: \"\"

Please analyze:
1. Sentiment (positive/negative/neutral)
2. Humor score (0-10, where 10 is extremely funny)
3. Whether it shows appreciation for a cat
4. Overall confidence in the analysis
5. Brief reasoning for your assessment

Respond with JSON in this exact format:
{
  \"sentiment\": \"positive|negative|neutral\",
  \"humorScore\": 0-10,
  \"isAppreciative\": true|false,
  \"isFunny\": true|false,
  \"confidence\": 0.0-1.0,
  \"reasoning\": \"brief explanation\"
}

  }

  private parseAIResponse(response: string): AIAnalysis {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }

      const parsed = JSON.parse(jsonMatch[0])
      
      return {
        sentiment: parsed.sentiment || 'neutral',
        humorScore: Math.max(0, Math.min(10, parsed.humorScore || 0)),
        isAppreciative: Boolean(parsed.isAppreciative),
        isFunny: Boolean(parsed.isFunny),
        confidence: Math.max(0, Math.min(1, parsed.confidence || 0)),
        reasoning: parsed.reasoning || 'No reasoning provided'
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      // Fallback analysis
      return {
        sentiment: 'neutral',
        humorScore: 5,
        isAppreciative: false,
        isFunny: false,
        confidence: 0.5,
        reasoning: 'Failed to parse AI response'
      }
    }
  }

  private applyThresholds(analysis: AIAnalysis, userInput: string): AIAnalysis {
    const lowerInput = userInput.toLowerCase()
    
    // Check for appreciation keywords
    const hasAppreciationKeywords = this.thresholds.appreciationKeywords.some(
      keyword => lowerInput.includes(keyword.toLowerCase())
    )

    // Determine if input meets thresholds
    const meetsHumorThreshold = analysis.humorScore >= this.thresholds.humorThreshold
    const meetsSentimentThreshold = analysis.confidence >= this.thresholds.sentimentThreshold
    
    const isAppreciative = analysis.isAppreciative || hasAppreciationKeywords
    const isFunny = analysis.isFunny && meetsHumorThreshold

    return {
      ...analysis,
      isAppreciative,
      isFunny,
      reasoning: ${analysis.reasoning} (Humor threshold: , Sentiment confidence: %)
    }
  }

  // Method to update thresholds
  updateThresholds(newThresholds: Partial<AIThresholds>) {
    this.thresholds = { ...this.thresholds, ...newThresholds }
  }

  // Method to get current thresholds
  getThresholds(): AIThresholds {
    return { ...this.thresholds }
  }

  // Simulate AI response for development/testing
  simulateAnalysis(userInput: string): Promise<AIAnalysis> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerInput = userInput.toLowerCase()
        
        // Simple keyword-based simulation
        const hasHumorKeywords = ['joke', 'funny', 'lol', 'haha', 'hilarious', 'comedy'].some(
          word => lowerInput.includes(word)
        )
        
        const hasAppreciationKeywords = this.thresholds.appreciationKeywords.some(
          keyword => lowerInput.includes(keyword.toLowerCase())
        )

        const hasNegativeKeywords = ['stupid', 'ugly', 'hate', 'terrible', 'awful', 'bad'].some(
          word => lowerInput.includes(word)
        )

        const humorScore = hasHumorKeywords ? 7 + Math.random() * 3 : Math.random() * 5
        const sentiment = hasNegativeKeywords ? 'negative' : (hasAppreciationKeywords ? 'positive' : 'neutral')
        const confidence = 0.6 + Math.random() * 0.3

        resolve({
          sentiment,
          humorScore,
          isAppreciative: hasAppreciationKeywords,
          isFunny: hasHumorKeywords && humorScore >= this.thresholds.humorThreshold,
          confidence,
          reasoning: Simulated analysis: , 
        })
      }, 1000 + Math.random() * 1000) // 1-2 second delay
    })
  }
}

export default AIService
