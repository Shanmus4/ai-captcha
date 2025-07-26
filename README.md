# Grumpy Cat Interactive Captcha

An interactive captcha system featuring a grumpy cat that users must make happy through jokes and appreciation. Instead of solving visual puzzles, users engage with an AI-powered character that responds to humor and kindness.

## 🚀 Live Demo

[https://grumpycaptcha.netlify.app](https://grumpycaptcha.netlify.app)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

<a name="overview"></a>
## 📖 Overview

The Grumpy Cat Interactive Captcha is a fun, engaging web application that turns traditional captcha verification into an entertaining experience. Users interact with a grumpy cat character by telling jokes or showing appreciation. The system uses AI to evaluate user input and triggers appropriate emotional animations based on the content's sentiment and humor level.

**Problem it solves**: Traditional captchas are boring and frustrating. This project creates an engaging, memorable verification experience that users actually enjoy.

**Target users**: Website owners looking for unique captcha solutions, developers wanting to showcase AI integration, and anyone who appreciates humor and interactive experiences.

<a name="features"></a>
## ✨ Features

- **Interactive Cat Character**: Animated grumpy cat with multiple emotional states (grumpy, happy, sad, bored)
- **AI-Powered Emotion Analysis**: Intelligent evaluation of user input using Google Gemini API.
- **Dynamic Emotional Responses**: Cat animations based on AI analysis, including specific Lottie animations for each emotion.
- **Visual Feedback System**: Color-coded button states and AI reasoning displayed in a comic-style bubble.
- **Continuous Animation Loop**: Engaging idle animations for grumpy and bored states.
- **Modern UI**: Clean, accessible interface with a fixed max-width and improved spacing.
- **SEO Optimized**: Enhanced meta tags, Open Graph, and Twitter card support.
- **Client-Side Logging**: Basic logging of user inputs with timestamps (for development/debugging only).

<a name="tech-stack"></a>
## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Lottie Web
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React
- **Testing**: Vitest
- **Deployment**: Vercel/Netlify

<a name="installation"></a>
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
   
   Edit `.env` file with your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

<a name="usage"></a>
## 📖 Usage

### Basic Usage

1. **See the Grumpy Cat**
   - The cat starts in a grumpy state with continuous animation.
   - The UI elements are spread out evenly with a fixed max-width.

2. **Make the Cat Happy**
   - Type a joke or kind words in the text area.
   - Press Enter or click "Tell Grumpy Cat" to submit your message.
   - The button text will change to "Analyzing..." while processing.

3. **See the Response**
   - The cat's animation will change based on the AI's emotional analysis (happy, sad, or bored).
   - A comic-style speech bubble will appear with the cat's reasoning, speaking directly to you.
   - If the cat is happy, the button will say "Grumpy Cat is Happy!".
   - If the cat is sad or bored, the button will say "Try Again".
   - Clicking "Try Again" will reset the input and the cat to its grumpy state.

### Client-Side Logging

User inputs are logged to the browser's developer console for debugging purposes. This is not a persistent logging solution for production.

<a name="development"></a>
## 🛠️ Development

### Project Structure

```
ai-captcha/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── types/             # TypeScript type definitions
│   ├── services/          # API services (AI, Logging)
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite environment type definitions
├── public/                # Static assets (Lottie animations)
├── .taskmaster/           # Task management
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests

### Lottie Animations

Lottie animations for `grumpy`, `happy`, `sad`, and `bored` emotions are integrated. The `grumpy` and `bored` animations loop continuously. The `happy` and `sad` animations play once and then revert to the `grumpy` loop.

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

### Environment Variables for Production

Set these environment variables in your hosting platform:

```env
VITE_GEMINI_API_KEY=your-production-gemini-api-key
```

## 🏗️ Technical Overview

### Architecture

- **Frontend**: Single Page Application (SPA) built with React 18
- **State Management**: React hooks (useState, useEffect)
- **Styling**: Utility-first CSS with Tailwind CSS
- **Build Tool**: Vite for fast development and optimized builds
- **Type Safety**: TypeScript for better development experience
- **Animations**: Lottie Web for smooth, performant animations
- **AI Integration**: Google Gemini API for emotion analysis

### Development Workflow

1. **Task Management**: Uses Taskmaster for project planning and task tracking
2. **Type Safety**: TypeScript ensures code quality and prevents runtime errors
3. **Code Quality**: ESLint enforces coding standards
4. **Hot Reload**: Vite provides instant feedback during development
5. **Build Optimization**: Production builds are optimized for performance

<a name="contributing"></a>
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

<a name="license"></a>
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<a name="author"></a>
## 👨‍💻 Author

**Shanmugha Sundaram S S**
- GitHub: [@Shanmus4](https://github.com/Shanmus4)

<a name="acknowledgments"></a>
## 🙏 Acknowledgments

- Lottie team for the amazing animation library
- React team for the incredible frontend framework
- Tailwind CSS for the utility-first styling
- Lucide for the beautiful icons

<a name="known-issues"></a>
## 🐛 Known Issues

- None currently.

<a name="roadmap"></a>
## 🔮 Roadmap

- [ ] Add sound effects
- [ ] Implement analytics
- [ ] Create integration examples
- [ ] Add multiple language support

<a name="security"></a>
## 🔒 Security

- Environment variables are properly configured and never committed to Git
- API keys are stored securely in environment variables
- No sensitive data is exposed in the client-side code
- All dependencies are regularly updated for security patches 