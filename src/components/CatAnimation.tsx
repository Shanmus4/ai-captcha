import React, { useEffect, useRef } from 'react'
import { Emotion } from '../types/captcha'
import lottie from 'lottie-web'

interface CatAnimationProps {
    emotion: Emotion
}

const CatAnimation: React.FC<CatAnimationProps> = ({ emotion }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<any>(null)

    // Animation paths for different emotions
    const animationPaths = {
        grumpy: '/animations/cat-grumpy.json',
        happy: '/animations/cat-happy.json',
        sad: '/animations/cat-sad.json',
        bored: '/animations/cat-bored.json'
    }

    useEffect(() => {
        if (!containerRef.current) return

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
                loop: emotion === 'grumpy' || emotion === 'bored' || emotion === 'sad' || emotion === 'happy', // Grumpy, bored, sad, and happy loop continuously
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
    }, [emotion]) // Removed isLoading from dependency array

    return (
        <div className="cat-animation-container">
            <div className="text-center">
                {/* Lottie animation container */}
                <div 
                    ref={containerRef} 
                    className="w-full h-full mx-auto mb-4" // Changed to w-full h-full
                    style={{ 
                        minHeight: '128px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Fallback emoji if Lottie fails to load - REMOVED */}
                </div>
                {/* Removed the <p> tag displaying cat emotion */}
            </div>
        </div>
    )
}

export default CatAnimation
