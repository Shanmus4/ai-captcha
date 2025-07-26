import CaptchaInterface from './components/CaptchaInterface'

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="captcha-container">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Grumpy Cat Captcha
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Make the cat happy with a joke or kind words!
                </p>
                <CaptchaInterface />
            </div>
        </div>
    )
}

export default App 