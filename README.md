# Grumpy Cat Interactive Captcha

An interactive captcha system featuring a grumpy cat that users must make happy through jokes and appreciation. Instead of solving visual puzzles, users engage with an AI-powered character that responds to humor and kindness.

## 🚀 Live Demo

[Coming Soon - Deploy to Vercel/Netlify]

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 📖 Overview

The Grumpy Cat Interactive Captcha is a fun, engaging web application that turns traditional captcha verification into an entertaining experience. Users interact with a grumpy cat character by telling jokes or showing appreciation. The system uses AI to evaluate user input and triggers appropriate emotional animations based on the content's sentiment and humor level.

**Problem it solves**: Traditional captchas are boring and frustrating. This project creates an engaging, memorable verification experience that users actually enjoy.

**Target users**: Website owners looking for unique captcha solutions, developers wanting to showcase AI integration, and anyone who appreciates humor and interactive experiences.

## ✨ Features

- **Interactive Cat Character**: Animated grumpy cat with multiple emotional states
- **AI-Powered Sentiment Analysis**: Intelligent evaluation of user input
- **Dynamic Emotional Responses**: Cat animations based on AI analysis
- **Visual Feedback System**: Color-coded button states and success indicators
- **Continuous Animation Loop**: Engaging idle animations
- **Responsive Design**: Works on all devices
- **Modern UI**: Clean, accessible interface

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Lottie Web
- **AI Integration**: OpenAI GPT (planned)
- **Icons**: Lucide React
- **Testing**: Vitest
- **Deployment**: Vercel/Netlify

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shanmus4/ai-captcha.git
   cd ai-captcha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   VITE_OPENAI_API_KEY=your-openai-api-key
   VITE_APP_TITLE=Grumpy Cat Captcha
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Basic Usage

1. **See the Grumpy Cat**
   - The cat starts in a grumpy state with continuous animation
   - Watch the idle animation while thinking of what to say

2. **Make the Cat Happy**
   - Type a joke or kind words in the text area
   - Click "Make Cat Happy" to submit your message
   - Wait for AI analysis (simulated for now)

3. **See the Response**
   - If your message is positive: Cat becomes happy with green button
   - If your message is negative: Cat becomes sad with red button
   - Try again if needed!

### Development Mode

Currently, the AI analysis is simulated with random responses. The system will:
- Show loading state for 2 seconds
- Randomly decide if the input is positive or negative
- Trigger appropriate cat emotion and button state

## 🛠️ Development

### Project Structure

```
src/
├── components/          # React components
│   ├── CaptchaInterface.tsx
│   ├── CatAnimation.tsx
│   ├── TextInput.tsx
│   └── SubmitButton.tsx
├── types/              # TypeScript type definitions
│   └── captcha.ts
├── services/           # API services (planned)
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests

### Adding Lottie Animations

1. **Prepare Animation Files**
   - Create Lottie JSON files for each emotion
   - Optimize for web (under 500KB each)
   - Place in `public/animations/` directory

2. **Update CatAnimation Component**
   - Import Lottie player
   - Load animations based on emotion prop
   - Handle animation transitions

3. **Animation States**
   - `grumpy` - Default idle state (continuous loop)
   - `happy` - Success state with thumbs up
   - `sad` - Failure state with frown
   - `angry` - Error state with angry expression

### AI Integration (Planned)

1. **OpenAI API Setup**
   - Add API key to environment variables
   - Create service for API communication
   - Implement sentiment analysis prompts

2. **Analysis Logic**
   - Evaluate humor and sentiment
   - Determine appropriateness
   - Return confidence scores

3. **Error Handling**
   - API rate limiting
   - Network failures
   - Fallback responses

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write tests for new features
- Keep components modular and reusable
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shanmugha Sundaram S S**
- GitHub: [@Shanmus4](https://github.com/Shanmus4)

## 🙏 Acknowledgments

- Lottie team for the amazing animation library
- React team for the incredible frontend framework
- Tailwind CSS for the utility-first styling
- Lucide for the beautiful icons

## 🐛 Known Issues

- AI integration is currently simulated
- Lottie animations need to be implemented
- Mobile responsiveness needs testing
- Accessibility features need enhancement

## 🔮 Roadmap

- [ ] Implement real AI sentiment analysis
- [ ] Add Lottie animations for all emotions
- [ ] Improve mobile responsiveness
- [ ] Add sound effects
- [ ] Implement analytics
- [ ] Create integration examples
- [ ] Add multiple language support 