# ✨ Bejeweled.ai ✨

## 🌟 Overview
Bejeweled.ai is a web-based match-three puzzle game inspired by Bejeweled 2. It offers:
- 🎮 **Player Mode**: Classic match-three gameplay with drag-and-drop mechanics, score tracking, and level progression.
- 🤖 **AI Mode**: Watch the AI play the game with visualized strategies and performance metrics.

Built with **React** and **Material-UI (MUI)**, the game uses emoji-based game pieces for simplicity and universal compatibility.

https://mrballistic.github.io/bejeweled-ai/

---

## 🕹️ Features

### 🎮 Player Mode
- Drag-and-drop or click-to-swap mechanics with visual feedback
- Touch support for mobile devices
- Score tracking with combo and chain reaction multipliers
- Animated match and cascade effects
- Hint system for finding possible moves
- Special gems and power-ups
- Level progression with increasing difficulty

### 🤖 AI Mode
- Automated gameplay with visual representation of AI decisions
- Adjustable speed controls
- Strategy display and performance metrics

---

## ✨ Recent Updates

### 🔄 Chain Reaction System
- **Score Multipliers**: 
  - Chain reactions double points with each cascade level
  - Combo system for consecutive matches
  - Visual feedback for both multipliers
- **Enhanced Scoring**:
  - Base points: Match-3 (50), Match-4 (100), Match-5 (200)
  - Combo multiplier: 1.5x per consecutive match
  - Chain multiplier: 2x per cascade level (up to 32x)

### 🏗️ Code Refactoring
- **Modular Architecture**:
  - Separated game types and constants
  - Extracted core game logic into hooks
  - Split UI components for better maintainability
- **New Components**:
  - BoardGrid for pure rendering
  - Utility functions for board management
  - Size calculator for responsive design
- **Enhanced Testing**: More modular code enables better unit testing

### 📱 Mobile Support & Touch Interactions
- **Multi-Backend Support**: 
  - Seamless switching between mouse and touch interactions
  - Responsive design for all screen sizes
  - Touch-specific visual feedback and animations
- **Mobile Optimizations**:
  - Dynamic sizing based on viewport
  - Touch-friendly UI elements
  - Improved spacing and layout for mobile devices

### 🎯 Match Detection & Visual Improvements
- **Enhanced Match Detection**: Improved system that properly handles consecutive matches
- **Visual Feedback**:
  - Added blue glow effect for selected jewels
  - Smooth animations for both valid and invalid moves
  - Clear visual indication of match cascades
  - Touch ripple effects for mobile interactions

### 🚀 Deployment Improvements
- **Streamlined Process**: Updated deploy script with:
  - Automatic dependency installation
  - GitHub Pages optimization
  - Main branch synchronization
  - Asset path handling for reliable deployment

---

## 🛠️ Development Setup

### 📋 Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### 🚀 Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bejeweled-ai.git
   cd bejeweled-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the game in your browser at `http://localhost:3000`

---

## 🚀 Deployment

### 📦 GitHub Pages
To deploy the latest version to GitHub Pages:

1. Ensure all changes are committed
2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

The script will automatically:
- Install all dependencies
- Create a fresh gh-pages branch
- Build with relative asset paths
- Deploy to GitHub Pages
- Push changes to main branch
- Handle all necessary cleanup

The deployed site will be available at your GitHub Pages URL.

---

## 🌟 Future Plans
- **Gemini Integration**: Advanced match detection and AI enhancements
- **New Features**:
  - 🌈 Special jewels for matching 4 or 5 in a row
  - 📱 Mobile-specific features:
    - Haptic feedback for matches
    - Gesture controls for hints
    - Portrait/landscape optimization
  - 🎮 Multiple AI difficulty levels
  - 🌐 Online multiplayer functionality
  - 🥇 Leaderboard and achievement systems

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
