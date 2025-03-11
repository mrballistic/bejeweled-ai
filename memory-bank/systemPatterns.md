# System Patterns: Bejeweled Clone with AI Mode

## 🏗️ System Architecture
The system is divided into four main components:
1. **🖥️ Frontend**: React and Material-UI for responsive UI
2. **🎮 Game Engine**: Core game mechanics and state management
3. **📱 Mobile Layer**: Touch interactions and responsive design
4. **🎯 Score System**: Chain reactions and combo tracking

---

## 🔑 Key Technical Decisions
1. **⚛️ Frontend Framework**: React 18+ for component-based architecture
2. **🎨 UI Library**: Material-UI for consistent, responsive design
3. **📦 State Management**: React Context for game and theme state
4. **🎯 Match Detection**: Center-first approach for consecutive matches
5. **✨ Animation System**: GSAP for smooth, performant animations
6. **📱 Mobile Support**: Multi-backend drag-and-drop for touch/mouse
7. **🚀 Deployment**: Automated GitHub Pages with relative paths
8. **🏗️ Code Organization**: Modular architecture with clear separation of concerns

---

## 🧩 Design Patterns

### 🧱 Component Architecture
1. **Core Components**:
   - `GameBoard`: Game state orchestrator
   - `BoardGrid`: Pure rendering component
   - `Jewel`: Touch and mouse interaction handling
   - `CustomDragLayer`: Enhanced drag preview
   - `ScoreDisplay`: Score and multiplier visualization

2. **⚙️ Custom Hooks**:
   - `useGameLogic`: Core game mechanics
   - `useJewelSwap`: Jewel movement handling
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

3. **✨ Animation Patterns**:
   - Sequential animation flow:
     1. Swap/touch animation
     2. Match highlight
     3. Match disappear
     4. Cascade effect
   - Touch feedback animations
   - Selected jewel highlighting
   - Mobile-optimized transitions

4. **📱 Mobile Interaction Patterns**:
   - Touch-to-select with feedback
   - Drag-to-swap with preview
   - Multi-backend support
   - Responsive sizing
   - Touch event optimization

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

2. **BoardGrid**:
   - Pure rendering component
   - Manages layout and styling
   - Handles jewel positioning
   - Provides touch interaction surface

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
