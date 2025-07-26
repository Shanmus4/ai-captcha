import React, { useState } from 'react'
import CatAnimation from './CatAnimation'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import { CaptchaState } from '../types/captcha'

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
            // TODO: Implement AI analysis
            // For now, simulate AI response
            const isPositive = Math.random() > 0.5

            setTimeout(() => {
                setCaptchaState(prev => ({
                    ...prev,
                    isLoading: false,
                    currentEmotion: isPositive ? 'happy' : 'sad',
                    buttonState: isPositive ? 'success' : 'error',
                    isComplete: isPositive
                }))
            }, 2000)
        } catch (error) {
            setCaptchaState(prev => ({
                ...prev,
                isLoading: false,
                buttonState: 'error'
            }))
        }
    }

    return (
        <div className="space-y-6">
            <CatAnimation
                emotion={captchaState.currentEmotion}
                isLoading={captchaState.isLoading}
            />

            <TextInput
                value={captchaState.userInput}
                onChange={handleInputChange}
                placeholder="Tell a joke or say something nice to make the cat happy!"
                disabled={captchaState.isLoading}
            />

            <SubmitButton
                onClick={handleSubmit}
                state={captchaState.buttonState}
                isLoading={captchaState.isLoading}
                disabled={!captchaState.userInput.trim()}
            />

            {captchaState.isComplete && (
                <div className="text-center text-success-600 font-semibold">
                    🎉 Success! The cat is happy now!
                </div>
            )}
        </div>
    )
}

export default CaptchaInterface 