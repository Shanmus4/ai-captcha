import React, { useEffect, useRef } from 'react'
import { Emotion } from '../types/captcha'
import { Loader2 } from 'lucide-react'
import lottie from 'lottie-web'

interface CatAnimationProps {
    emotion: Emotion
    isLoading: boolean
}

const CatAnimation: React.FC<CatAnimationProps> = ({ emotion, isLoading }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<any>(null)

    // Animation paths for different emotions
    const animationPaths = {
        grumpy: '/animations/cat-grumpy.json',
        happy: '/animations/cat-happy.json',
        sad: '/animations/cat-sad.json',
        angry: '/animations/cat-angry.json'
    }

    useEffect(() => {
        if (!containerRef.current || isLoading) return

        // Destroy previous animation
        if (animationRef.current) {
            animationRef.current.destroy()
        }

        // Load new animation
        const animationPath = animationPaths[emotion]
        
        // For now, use placeholder animations until you provide the actual Lottie files
        // You'll need to provide these JSON files in the public/animations/ directory
        console.log('Loading Lottie animation:', animationPath)
        
        try {
            animationRef.current = lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: emotion === 'grumpy', // Only grumpy loops continuously
                autoplay: true,
                path: animationPath
            })

            // Handle animation events
            animationRef.current.addEventListener('data_ready', () => {
                console.log('Animation loaded successfully')
            })

            animationRef.current.addEventListener('error', (error: any) => {
                console.error('Animation loading failed:', error)
                // Fallback to emoji if animation fails
            })

        } catch (error) {
            console.error('Failed to load Lottie animation:', error)
        }

        // Cleanup on unmount or emotion change
        return () => {
            if (animationRef.current) {
                animationRef.current.destroy()
            }
        }
    }, [emotion, isLoading])

    if (isLoading) {
        return (
            <div className=\"cat-animation-container\">
                <div className=\"flex flex-col items-center space-y-4\">
                    <Loader2 className=\"w-12 h-12 animate-spin text-primary-500\" />
                    <p className=\"text-gray-600\">Analyzing your message...</p>
                </div>
            </div>
        )
    }

    return (
        <div className=\"cat-animation-container\">
            <div className=\"text-center\">
                {/* Lottie animation container */}
                <div 
                    ref={containerRef} 
                    className=\"w-32 h-32 mx-auto mb-4\"
                    style={{ 
                        minHeight: '128px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Fallback emoji if Lottie fails to load */}
                    <span className=\"text-4xl\">
                        {emotion === 'happy' && ''}
                        {emotion === 'sad' && ''}
                        {emotion === 'angry' && ''}
                        {emotion === 'grumpy' && ''}
                    </span>
                </div>
                <p className=\"text-gray-600 capitalize\">
                    Cat is feeling {emotion}
                </p>
            </div>
        </div>
    )
}

export default CatAnimation
