# System Patterns: Bejeweled Clone with AI Mode

## 🏗️ System Architecture
The system is divided into four main components:
1. **🖥️ Frontend**: React and Material-UI for responsive UI
2. **🎮 Game Engine**: Core game mechanics and state management
3. **📱 Mobile Layer**: Enhanced touch interactions and responsive design
4. **🎯 Score System**: Chain reactions and combo tracking

---

## 🔑 Key Technical Decisions
1. **⚛️ Frontend Framework**: React 18+ for component-based architecture
2. **🎨 UI Library**: Material-UI for consistent, responsive design
3. **📦 State Management**: React Context for game and theme state
4. **🎯 Match Detection**: Center-first approach for consecutive matches
5. **✨ Animation System**: GSAP for smooth, performant animations
6. **📱 Mobile Support**: Custom touch gesture system with multi-backend drag-and-drop
7. **🚀 Deployment**: Automated GitHub Pages with relative paths
8. **🏗️ Code Organization**: Modular architecture with clear separation of concerns

---

## 🧩 Design Patterns

### 🧱 Component Architecture
1. **Core Components**:
   - `GameBoard`: Game state orchestrator
   - `BoardGrid`: Pure rendering component
   - `Jewel`: Touch and mouse interaction handling
   - `CustomDragLayer`: Enhanced drag preview with animations
   - `ScoreDisplay`: Score and multiplier visualization

2. **⚙️ Custom Hooks**:
   - `useGameLogic`: Core game mechanics
   - `useJewelSwap`: Jewel movement handling
   - `useTouchGesture`: Touch interaction management
   - `useScore`: Scoring and multiplier system
   - `useTheme`: Theme management
   - `useViewportCalculator`: Responsive sizing

3. **🔄 State Management**:
   - Context providers for global state
   - Ref forwarding for board access
   - Imperative handle for external control

### 🎮 Game Logic Patterns

1. **🎯 Match Detection System**:
   - Center-first scanning for matches
   - Bidirectional checking
   - Length-based match scoring
   - Cascade effect tracking

2. **🔄 Chain Reaction System**:
   - Cascade level tracking
   - Progressive multipliers
   - Combo system integration
   - Visual feedback for chains

3. **📱 Touch Interaction Patterns**:
   - Gesture-based movement:
     1. Touch start with feedback
     2. Swipe detection with thresholds
     3. Direction calculation
     4. Movement validation
     5. Animation triggers
   - Visual feedback system:
     1. Touch ripple effects
     2. Movement previews
     3. Tilt and scale animations
     4. Success/failure indicators
   - Performance optimizations:
     1. Touch event debouncing
     2. Animation throttling
     3. Hardware acceleration
     4. Efficient rerendering

4. **✨ Animation Patterns**:
   - Sequential animation flow:
     1. Touch/swipe feedback
     2. Movement preview
     3. Match highlight
     4. Match disappear
     5. Cascade effect
   - Mobile optimizations:
     1. Hardware-accelerated transforms
     2. Efficient animation triggers
     3. Battery-conscious effects
     4. Smooth state transitions

### 🚀 Deployment Patterns

1. **📦 Build Process**:
   - Dependency management
   - Asset optimization
   - Path configuration
   - Branch synchronization

2. **🔄 Continuous Deployment**:
   - Automated dependency installation
   - Clean branch creation
   - Asset path handling
   - Branch synchronization
   - Cleanup procedures

---

## 🔗 Component Relationships

### 🎲 Core Game Flow
1. **GameBoard**:
   - Orchestrates game state
   - Manages board initialization
   - Coordinates with game logic
   - Handles window resizing

2. **Touch System**:
   - Manages gesture detection
   - Handles movement validation
   - Coordinates animations
   - Provides haptic feedback

3. **Game Logic**:
   - Processes matches and cascades
   - Manages chain reactions
   - Updates score and multipliers
   - Coordinates animations

4. **Score System**:
   - Tracks base points
   - Manages combo multipliers
   - Handles chain reaction bonuses
   - Updates visual feedback

5. **Utilities**:
   - Board initialization
   - Size calculations
   - Match detection
   - Hint generation
   - Touch gesture processing
