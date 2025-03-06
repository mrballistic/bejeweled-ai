# System Patterns: Bejeweled Clone with AI Mode

## 🏗️ System Architecture
The system is divided into two main components:
1. **🖥️ Frontend**: Built using React and Material-UI (MUI) for a responsive and modern user interface.
2. **🎮 Game Engine**: Handles core game mechanics, including match detection, cascade effects, and scoring.

---

## 🔑 Key Technical Decisions
1. **⚛️ Frontend Framework**: React 18+ is used for its component-based architecture and state management capabilities.
2. **🎨 UI Library**: Material-UI ensures a consistent and polished design across devices.
3. **📦 State Management**: React Context for game state and theme management.
4. **🎯 Match Detection**: Center-first approach for handling consecutive matches.
5. **✨ Animation System**: GSAP for smooth, performant animations.
6. **🚀 Deployment**: GitHub Pages with relative asset paths for reliable hosting.

---

## 🧩 Design Patterns

### 🧱 Component Architecture
1. **Component-Based Design**: UI structured into reusable React components:
   - `GameBoard`: Main game grid and state management
   - `Jewel`: Individual game pieces with drag-and-drop
   - `CustomDragLayer`: Enhanced drag preview
   - `ScoreDisplay`: Score and combo tracking

2. **⚙️ Custom Hooks**:
   - `useJewelSwap`: Manages jewel swapping with animation states
   - `useScore`: Handles scoring and combo system
   - `useTheme`: Controls dark/light theme switching

3. **🔄 State Management**:
   - Context providers for score and theme
   - Ref forwarding for board state access
   - Imperative handle for external board control

### 🎮 Game Logic Patterns

1. **🎯 Match Detection System**:
   - Center-first scanning for matches
   - Bidirectional checking for consecutive matches
   - Length-based match scoring
   - Cascade effect handling

2. **✨ Animation Patterns**:
   - Sequential animation flow:
     1. Swap animation
     2. Match highlight
     3. Match disappear
     4. Cascade effect
   - Invalid move feedback
   - Selected jewel highlighting

3. **🔄 Game Flow Control**:
   - Async/await for animation sequences
   - State locking during animations
   - Combo tracking for cascades

---

## 🔗 Component Relationships

### 🎲 Core Components
1. **GameBoard**:
   - Manages board state and game logic
   - Coordinates with animation system
   - Handles match detection and cascades
   - Forwards board state for hint system

2. **💎 Jewel**:
   - Handles drag-and-drop interactions
   - Manages visual feedback states
   - Communicates with GameBoard for moves

3. **📊 Score System**:
   - Tracks points and combos
   - Provides global score context
   - Handles multipliers and bonuses

4. **✨ Animation System**:
   - Coordinates multiple animation sequences
   - Manages timing and transitions
   - Provides visual feedback for game events

5. **🎨 Theme System**:
   - Controls dark/light mode
   - Manages consistent styling
   - Handles visual transitions
