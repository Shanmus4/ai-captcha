import React, { useState } from 'react'
import CatAnimation from './CatAnimation'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import { CaptchaState, ButtonState } from '../types/captcha'
import AIService, { Emotion } from '../services/aiService'
import { logUserInput } from '../services/logService'

const aiService = new AIService()

const CaptchaInterface: React.FC = () => {
    const [captchaState, setCaptchaState] = useState<CaptchaState>({
        isComplete: false,
        currentEmotion: 'grumpy',
        userInput: '',
        buttonState: 'neutral',
        isLoading: false,
        aiReasoning: '',
        displayButtonText: 'Tell Grumpy Cat' // New state for button text
    })

    const handleInputChange = (value: string) => {
        setCaptchaState(prev => ({
            ...prev,
            userInput: value,
            // Reset button state and emotion if user starts typing again after a response
            buttonState: 'neutral',
            currentEmotion: 'grumpy',
            isComplete: false,
            aiReasoning: '',
            displayButtonText: 'Tell Grumpy Cat' // Reset button text on new input
        }))
    }

    const handleSubmit = async () => {
        if (!captchaState.userInput.trim()) return

        setCaptchaState(prev => ({
            ...prev,
            isLoading: true,
            buttonState: 'neutral',
            aiReasoning: '',
            displayButtonText: 'Analyzing...' // Set analyzing text while loading
        }))

        logUserInput(captchaState.userInput) // Log user input

        try {
            const analysis = await aiService.analyzeUserInput(captchaState.userInput)
            
            let finalEmotion: Emotion = 'grumpy'; // Default to grumpy
            let newButtonState: ButtonState = 'error';
            let isComplete = false;
            let newDisplayButtonText = 'Try Again';

            // Map AI's emotion to UI emotion
            switch (analysis.emotion) {
                case 'happy':
                    finalEmotion = 'happy';
                    newButtonState = 'success';
                    isComplete = true;
                    newDisplayButtonText = 'Grumpy Cat is Happy!';
                    break;
                case 'sad':
                    finalEmotion = 'sad';
                    newButtonState = 'error';
                    newDisplayButtonText = 'Try Again';
                    break;
                case 'bored':
                    finalEmotion = 'bored'; // Map bored to bored animation
                    newButtonState = 'error';
                    newDisplayButtonText = 'Try Again';
                    break;
                default:
                    finalEmotion = 'grumpy'; // Fallback for any unexpected AI emotion
                    newButtonState = 'error';
                    newDisplayButtonText = 'Try Again';
                    break;
            }

            setCaptchaState(prev => ({
                ...prev,
                isLoading: false,
                currentEmotion: finalEmotion,
                buttonState: newButtonState,
                isComplete: isComplete,
                aiReasoning: analysis.reasoning || '',
                displayButtonText: newDisplayButtonText
            }))

            console.log('AI Analysis:', analysis)
            console.log('Reasoning from AI:', analysis.reasoning)

        } catch (error: any) {
            console.error('AI analysis failed:', error)
            
            let errorMessage = 'My circuits are fried. Try again.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = `Error: ${error.response.data.error.message}`;
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }

            setCaptchaState(prev => ({
                ...prev,
                isLoading: false,
                currentEmotion: 'grumpy', // Default to grumpy on error
                buttonState: 'error',
                isComplete: false,
                aiReasoning: errorMessage,
                displayButtonText: 'Try Again' // Set button text to Try Again on error
            }))
        }
    }

    const handleReset = () => {
        setCaptchaState({
            isComplete: false,
            currentEmotion: 'grumpy',
            userInput: '',
            buttonState: 'neutral',
            isLoading: false,
            aiReasoning: '',
            displayButtonText: 'Tell Grumpy Cat' // Reset button text
        })
    }

    return (
        <div className='flex flex-col h-full justify-between'>
            <div className="cat-and-bubble-group flex-grow flex flex-col justify-center items-center">
                <CatAnimation
                    emotion={captchaState.currentEmotion}
                />

                <div className={`ai-reasoning-bubble ${captchaState.aiReasoning.trim() !== '' ? 'show' : ''}`}>
                    {captchaState.aiReasoning}
                </div>
            </div>

            <div className="input-and-button-group flex-shrink-0">
                <TextInput
                    value={captchaState.userInput}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit} // Pass handleSubmit for Enter key
                    placeholder='Tell a joke or say something nice to make the cat happy!'
                    disabled={captchaState.isLoading}
                />

                <SubmitButton
                    onClick={captchaState.buttonState === 'success' || captchaState.buttonState === 'error' ? handleReset : handleSubmit}
                    state={captchaState.buttonState}
                    isLoading={captchaState.isLoading}
                    disabled={!captchaState.userInput.trim() && captchaState.buttonState === 'neutral'}
                    buttonText={captchaState.displayButtonText}
                />
            </div>
        </div>
    )
}

export default CaptchaInterface
