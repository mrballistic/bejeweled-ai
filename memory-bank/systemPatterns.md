# System Patterns: Bejeweled Clone with AI Mode

## 🏗️ System Architecture
The system is divided into three main components:
1. **🖥️ Frontend**: React and Material-UI for responsive UI
2. **🎮 Game Engine**: Core game mechanics and state management
3. **📱 Mobile Layer**: Touch interactions and responsive design

---

## 🔑 Key Technical Decisions
1. **⚛️ Frontend Framework**: React 18+ for component-based architecture
2. **🎨 UI Library**: Material-UI for consistent, responsive design
3. **📦 State Management**: React Context for game and theme state
4. **🎯 Match Detection**: Center-first approach for consecutive matches
5. **✨ Animation System**: GSAP for smooth, performant animations
6. **📱 Mobile Support**: Multi-backend drag-and-drop for touch/mouse
7. **🚀 Deployment**: Automated GitHub Pages with relative paths

---

## 🧩 Design Patterns

### 🧱 Component Architecture
1. **Component-Based Design**:
   - `GameBoard`: Responsive grid with dynamic sizing
   - `Jewel`: Touch and mouse interaction handling
   - `CustomDragLayer`: Enhanced drag preview with touch feedback
   - `ScoreDisplay`: Responsive score and combo tracking

2. **⚙️ Custom Hooks**:
   - `useJewelSwap`: Manages jewel swapping with touch support
   - `useScore`: Handles scoring and combo system
   - `useTheme`: Controls dark/light theme switching

3. **🔄 State Management**:
   - Context providers for global state
   - Ref forwarding for board access
   - Imperative handle for external control

### 🎮 Game Logic Patterns

1. **🎯 Match Detection System**:
   - Center-first scanning for matches
   - Bidirectional checking for consecutive matches
   - Length-based match scoring
   - Cascade effect handling

2. **✨ Animation Patterns**:
   - Sequential animation flow:
     1. Swap/touch animation
     2. Match highlight
     3. Match disappear
     4. Cascade effect
   - Touch feedback animations
   - Selected jewel highlighting
   - Mobile-optimized transitions

3. **📱 Mobile Interaction Patterns**:
   - Touch-to-select with visual feedback
   - Drag-to-swap with preview
   - Multi-backend support for input methods
   - Responsive sizing and layout
   - Touch event optimization

4. **🔄 Game Flow Control**:
   - Async/await for animations
   - State locking during interactions
   - Combo tracking for cascades
   - Touch event debouncing

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

### 🎲 Core Components
1. **GameBoard**:
   - Manages responsive grid layout
   - Handles touch and mouse events
   - Coordinates with animation system
   - Manages match detection and cascades

2. **💎 Jewel**:
   - Handles multi-input interactions
   - Manages visual feedback states
   - Provides touch-specific animations
   - Communicates with GameBoard

3. **📊 Score System**:
   - Tracks points and combos
   - Provides global score context
   - Handles multipliers and bonuses
   - Responsive display layout

4. **✨ Animation System**:
   - Coordinates animation sequences
   - Manages touch feedback
   - Handles transition timing
   - Provides mobile-optimized effects

5. **🎨 Theme System**:
   - Controls dark/light mode
   - Manages consistent styling
   - Handles visual transitions
   - Supports mobile themes
