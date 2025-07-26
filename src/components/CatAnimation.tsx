import React, { useEffect, useRef, useState } from 'react'
import { Emotion } from '../types/captcha'
import lottie from 'lottie-web'

interface CatAnimationProps {
    emotion: Emotion
}

const CatAnimation: React.FC<CatAnimationProps> = ({ emotion }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationInstanceRef = useRef<any>(null)
    const [loadedAnimations, setLoadedAnimations] = useState<Record<Emotion, any | null>>({
        grumpy: null,
        happy: null,
        sad: null,
        bored: null,
    });

    const animationPaths = {
        grumpy: '/animations/cat-grumpy.json',
        happy: '/animations/cat-happy.json',
        sad: '/animations/cat-sad.json',
        bored: '/animations/cat-bored.json'
    }

    // Preload all animations on mount
    useEffect(() => {
        const loadAnimations = async () => {
            const newLoadedAnimations: Record<Emotion, any> = { ...loadedAnimations };
            for (const key in animationPaths) {
                const emotionKey = key as Emotion;
                const path = animationPaths[emotionKey];
                try {
                    const response = await fetch(path);
                    const animationData = await response.json();
                    newLoadedAnimations[emotionKey] = animationData;
                } catch (error) {
                    console.error(`Failed to load animation ${path}:`, error);
                }
            }
            setLoadedAnimations(newLoadedAnimations);
        };

        loadAnimations();
    }, []); // Run only once on mount

    useEffect(() => {
        if (!containerRef.current || !loadedAnimations[emotion]) return;

        // Destroy previous animation instance
        if (animationInstanceRef.current) {
            animationInstanceRef.current.destroy();
        }

        // Load and play new animation
        animationInstanceRef.current = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: emotion === 'grumpy' || emotion === 'bored' || emotion === 'sad' || emotion === 'happy',
            autoplay: true,
            animationData: loadedAnimations[emotion],
        });

        animationInstanceRef.current.addEventListener('data_ready', () => {
            console.log(`Animation for ${emotion} loaded successfully`);
        });

        animationInstanceRef.current.addEventListener('error', (error: any) => {
            console.error(`Animation for ${emotion} failed:`, error);
        });

        // Cleanup on unmount or emotion change
        return () => {
            if (animationInstanceRef.current) {
                animationInstanceRef.current.destroy();
            }
        };
    }, [emotion, loadedAnimations]);

    return (
        <div className="cat-animation-container">
            <div className="text-center">
                <div 
                    ref={containerRef} 
                    className="w-full h-full mx-auto mb-4" 
                    style={{
                        minHeight: '128px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                </div>
            </div>
        </div>
    );
};

export default CatAnimation;
