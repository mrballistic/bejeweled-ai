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
- Score tracking and time-based gameplay
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

### 🎯 Match Detection & Visual Improvements
- **Enhanced Match Detection**: Improved system that properly handles consecutive matches
- **Visual Feedback**:
  - Added blue glow effect for selected jewels
  - Smooth animations for both valid and invalid moves
  - Clear visual indication of match cascades
- **Deployment Optimization**: Updated for better GitHub Pages compatibility with relative asset paths

### 🔍 Hint System
- **New Functionality**: Added a `findHint` function to calculate potential moves on the game board
- **Integration**: The "Show Hint" button now displays hints for 3 seconds
- **Technical Enhancements**: 
  - Utilized `React.forwardRef` and `useImperativeHandle` to expose the `board` state from the `GameBoard` component
  - Enabled the parent component to access the `board` state for hint calculations

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

1. Ensure all changes are committed to the main branch
2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

The script will:
- Create a fresh gh-pages branch
- Install dependencies
- Build a production version with relative paths
- Clean up unnecessary files
- Move the build to the root directory
- Push to GitHub Pages
- Return to your original branch

The deployed site will be available at your GitHub Pages URL.

---

## 🌟 Future Plans
- **Gemini Integration**: Advanced match detection and AI enhancements
- **New Features**:
  - 🔄 Chain reaction bonuses for cascading matches
  - 🌈 Special jewels for matching 4 or 5 in a row
  - 🏆 Score multipliers and combo system
  - 🎮 Multiple AI difficulty levels
  - 🌐 Online multiplayer functionality
  - 🥇 Leaderboard and achievement systems

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
