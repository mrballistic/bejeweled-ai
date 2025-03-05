# Bejeweled.ai 🎮

A modern implementation of the classic Bejeweled game with AI capabilities, built using React and TypeScript.

## Features

- 🎯 Classic match-three gameplay
- 🌓 Automatic dark/light mode based on system preferences
- ✨ Smooth animations using GSAP
- 🎯 Drag and drop interface
- 💯 Score tracking with combo system
- 🤖 AI mode (coming soon)

## Technologies

- React 18+
- TypeScript
- Material-UI
- GSAP (GreenSock Animation Platform)
- React DnD (Drag and Drop)

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bejeweled-ai.git

# Navigate to project directory
cd bejeweled-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

## Game Rules

1. Match three or more identical jewels in a row or column
2. Create matches by swapping adjacent jewels
3. Longer matches earn more points
4. Chain reactions (combos) multiply your score

## Scoring System

- 3 matching jewels: 50 points
- 4 matching jewels: 100 points
- 5 matching jewels: 200 points
- Combo multiplier: 1.5x for each consecutive match

## Project Structure

```
src/
├── components/        # React components
├── context/          # React context providers
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
└── memory-bank/      # Project documentation
```

## Development Features

- TypeScript for type safety
- Material-UI for consistent styling
- GSAP for smooth animations
- React DnD for intuitive interactions
- Memory Bank system for comprehensive documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the original Bejeweled game
- Built with modern web technologies
- Designed for both desktop and mobile use
