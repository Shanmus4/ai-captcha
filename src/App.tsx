import { useState } from 'react';
import CaptchaInterface from './components/CaptchaInterface'

function App() {
    const [isSpeechBubbleVisible, setIsSpeechBubbleVisible] = useState(false);

    return (
        <div className="main-container">
            <div className="text-group">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Grumpy Cat Captcha
                </h1>
                <p className="text-center text-gray-600 mb-2">
                    Make the cat happy with a joke or kind words!
                </p>
                </div>
            <CaptchaInterface setIsSpeechBubbleVisible={setIsSpeechBubbleVisible} />
            {!isSpeechBubbleVisible && (
                <p className="github-link text-center text-gray-500 text-sm">
                    GitHub: <a href="https://github.com/Shanmus4/ai-captcha" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Shanmus4/ai-captcha</a>
                </p>
            )}
        </div>
    )
}

export default App 