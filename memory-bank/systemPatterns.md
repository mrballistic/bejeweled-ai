# System Patterns: Bejeweled Clone with AI Mode

## 🏗️ System Architecture
The system is divided into two main components:
1. **🖥️ Frontend**: Built using React and Material-UI (MUI) for a responsive and modern user interface.
2. **🎮 Game Engine**: Handles core game mechanics, including match detection, cascade effects, and scoring.

---

## 🔑 Key Technical Decisions
1. **⚛️ Frontend Framework**: React 18+ is used for its component-based architecture and state management capabilities.
2. **🎨 UI Library**: Material-UI ensures a consistent and polished design across devices.
3. **📦 State Management**: React Context or Redux is used to manage game state efficiently.
4. **🤖 AI Algorithm**: Minimax or Monte Carlo Tree Search is employed for real-time move evaluation and strategy optimization.

---

## 🧩 Design Patterns
1. **🧱 Component-Based Design**: The UI is structured into reusable React components, such as `GameBoard`, `Jewel`, and `ScoreContext`.
2. **⚙️ Hooks for Logic**: Custom React hooks (e.g., `useJewelSwap`, `useGameFlow`) encapsulate game logic and state management.
3. **🔄 Separation of Concerns**: Game logic is decoupled from UI components, ensuring maintainability and scalability.

---

## 🔗 Component Relationships
1. **🎲 GameBoard Component**: Manages the game grid and initializes the board state.
2. **💎 Jewel Component**: Represents individual game pieces and handles user interactions.
3. **📊 ScoreContext**: Provides a global context for managing and updating the player's score.
4. **🤖 AI Engine**: Evaluates the game board and determines optimal moves for the AI mode.
5. **✨ Animation System**: Handles visual effects for jewel swaps, matches, and cascades.
