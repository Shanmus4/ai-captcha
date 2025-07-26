export type Emotion = 'grumpy' | 'happy' | 'sad' | 'angry'

export type ButtonState = 'neutral' | 'success' | 'error'

export interface CaptchaState {
    isComplete: boolean
    currentEmotion: Emotion
    userInput: string
    buttonState: ButtonState
    isLoading: boolean
}

export interface AIAnalysis {
    sentiment: 'positive' | 'negative' | 'neutral'
    humorScore: number
    isAppropriate: boolean
    confidence: number
}

export interface LottieAnimation {
    id: string
    path: string
    emotion: Emotion
} 