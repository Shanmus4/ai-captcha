import React, { useEffect, useRef } from 'react'
import { Emotion } from '../types/captcha'
import { Loader2 } from 'lucide-react'

interface CatAnimationProps {
    emotion: Emotion
    isLoading: boolean
}

const CatAnimation: React.FC<CatAnimationProps> = ({ emotion, isLoading }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<any>(null)

    useEffect(() => {
        // TODO: Implement Lottie animation loading
        // For now, show placeholder content
        console.log('Loading animation for emotion:', emotion)
    }, [emotion])

    if (isLoading) {
        return (
            <div className="cat-animation-container">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
                    <p className="text-gray-600">Analyzing your message...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="cat-animation-container">
            <div className="text-center">
                {/* Placeholder for Lottie animation */}
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl">
                        {emotion === 'happy' && '😸'}
                        {emotion === 'sad' && '😿'}
                        {emotion === 'angry' && '😾'}
                        {emotion === 'grumpy' && '😾'}
                    </span>
                </div>
                <p className="text-gray-600 capitalize">
                    Cat is feeling {emotion}
                </p>
            </div>
        </div>
    )
}

export default CatAnimation 