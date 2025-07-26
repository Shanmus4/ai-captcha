export type Emotion = 'happy' | 'sad' | 'bored' | 'grumpy'

export type ButtonState = 'neutral' | 'success' | 'error'

export interface CaptchaState {
    isComplete: boolean
    currentEmotion: Emotion
    userInput: string
    buttonState: ButtonState
    isLoading: boolean
    aiReasoning: string; // Added aiReasoning
    displayButtonText: string; // Added displayButtonText
}

export interface AIAnalysis {
  emotion: Emotion;
  isFunny: boolean;
  isKind: boolean;
  confidence: number;
  reasoning: string;
}

export interface LottieAnimation {
    id: string
    path: string
    emotion: Emotion
} 