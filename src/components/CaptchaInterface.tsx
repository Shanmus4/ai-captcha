import React, { useState } from 'react'
import CatAnimation from './CatAnimation'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import { CaptchaState } from '../types/captcha'
import AIService from '../services/aiService'

const aiService = new AIService()

const CaptchaInterface: React.FC = () => {
    const [captchaState, setCaptchaState] = useState<CaptchaState>({
        isComplete: false,
        currentEmotion: 'grumpy',
        userInput: '',
        buttonState: 'neutral',
        isLoading: false
    })

    const handleInputChange = (value: string) => {
        setCaptchaState(prev => ({
            ...prev,
            userInput: value
        }))
    }

    const handleSubmit = async () => {
        if (!captchaState.userInput.trim()) return

        setCaptchaState(prev => ({
            ...prev,
            isLoading: true,
            buttonState: 'neutral'
        }))

        try {
            // Use real AI analysis instead of random simulation
            const analysis = await aiService.analyzeUserInput(captchaState.userInput)
            
            // Determine if the input is positive based on AI analysis
            const isPositive = analysis.isFunny || analysis.isAppreciative
            
            // Set emotion based on AI analysis
            let emotion: 'happy' | 'sad' | 'angry' | 'grumpy'
            if (isPositive) {
                emotion = 'happy'
            } else if (analysis.sentiment === 'negative') {
                emotion = 'angry'
            } else {
                emotion = 'sad'
            }

            setCaptchaState(prev => ({
                ...prev,
                isLoading: false,
                currentEmotion: emotion,
                buttonState: isPositive ? 'success' : 'error',
                isComplete: isPositive
            }))

            // Log AI analysis for debugging
            console.log('AI Analysis:', analysis)
            
        } catch (error) {
            console.error('AI analysis failed:', error)
            
            // Fallback to simulation if AI fails
            const fallbackAnalysis = await aiService.simulateAnalysis(captchaState.userInput)
            const isPositive = fallbackAnalysis.isFunny || fallbackAnalysis.isAppreciative
            
            setCaptchaState(prev => ({
                ...prev,
                isLoading: false,
                currentEmotion: isPositive ? 'happy' : 'sad',
                buttonState: isPositive ? 'success' : 'error',
                isComplete: isPositive
            }))
        }
    }

    return (
        <div className='space-y-6'>
            <CatAnimation
                emotion={captchaState.currentEmotion}
                isLoading={captchaState.isLoading}
            />

            <TextInput
                value={captchaState.userInput}
                onChange={handleInputChange}
                placeholder='Tell a joke or say something nice to make the cat happy!'
                disabled={captchaState.isLoading}
            />

            <SubmitButton
                onClick={handleSubmit}
                state={captchaState.buttonState}
                isLoading={captchaState.isLoading}
                disabled={!captchaState.userInput.trim()}
            />

            {captchaState.isComplete && (
                <div className='text-center text-success-600 font-semibold'>
                     Success! The cat is happy now!
                </div>
            )}
        </div>
    )
}

export default CaptchaInterface
