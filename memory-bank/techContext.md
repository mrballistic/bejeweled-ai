# Tech Context: Bejeweled Clone with AI Mode

## 🛠️ Technologies Used
1. **⚛️ Frontend Framework**: React 18+
2. **🎨 UI Library**: Material-UI (MUI)
3. **📦 State Management**: React Context
4. **🖱️ Drag-and-Drop**: React DnD with multi-backend support
5. **✨ Animations**: GSAP for smooth transitions
6. **🚀 Build Tool**: Vite
7. **🌐 Deployment**: GitHub Pages

---

## 🖥️ Development Setup
### 📦 Dependencies
```json
{
  "react": "^18.x",
  "@mui/material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",
  "react-dnd": "^16.x",
  "react-dnd-html5-backend": "^16.x",
  "react-dnd-touch-backend": "^16.x",
  "react-dnd-multi-backend": "^8.x",
  "gsap": "^3.x",
  "vite": "^6.x",
  "@vitejs/plugin-react": "^4.x"
}
```

### 🛠️ Environment
- 🌐 Node.js v16+ and npm v7+
- 🖥️ Modern web browsers with ES6+ support
- 📱 Mobile device testing environment
- ✏️ IDE: Visual Studio Code with TypeScript support
- 🔧 Git for version control

### 📝 Configuration Files
1. **vite.config.ts**:
```typescript
export default defineConfig({
  plugins: [react()],
  base: './',  // For GitHub Pages compatibility
});
```

2. **tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 📁 Project Structure
```
src/
├── components/          # React components
│   ├── BoardGrid.tsx   # Pure board rendering
│   ├── GameBoard.tsx   # Game orchestration
│   ├── Jewel.tsx      # Individual jewel
│   └── ScoreDisplay.tsx # Score visualization
├── context/            # React contexts
│   ├── ScoreContext.tsx # Score and multipliers
│   └── ThemeProvider.tsx # Theme management
├── hooks/              # Custom React hooks
│   ├── useGameLogic.ts # Core game mechanics
│   ├── useJewelSwap.ts # Jewel movement
│   └── useScore.ts    # Score management
├── types/              # TypeScript types
│   └── game.ts        # Game-related types
├── utils/             # Utility functions
│   ├── animations.ts  # GSAP animations
│   ├── boardInitializer.ts # Board setup
│   ├── cascadeHandler.ts # Cascade logic
│   ├── hintFinder.ts # Move suggestions
│   ├── matchDetection.ts # Match logic
│   └── sizeCalculator.ts # Responsive sizing
└── main.tsx          # App entry point
```

---

## ⚙️ Technical Constraints
1. 🌐 Browser Compatibility:
   - Modern browsers with ES6+ support
   - Touch device support for mobile interactions
   - Progressive Web App capabilities

2. ⚡ Performance:
   - Smooth animations at 60fps
   - Efficient match detection for large cascades
   - Touch event optimization
   - Mobile battery consideration

3. 🎨 Design:
   - Responsive layout for all screen sizes
   - Dark/light theme support
   - Accessible color contrasts
   - Touch-friendly UI elements

---

## 🔗 Dependencies

### Core Dependencies
1. **⚛️ React**: UI framework with hooks and context
2. **🎨 Material-UI**: Responsive theming and components
3. **🖱️ React DnD**: Multi-backend drag-and-drop support
4. **✨ GSAP**: Advanced animations and transitions
5. **🎨 Emotion**: CSS-in-JS for MUI styling

### Mobile-Specific Dependencies
1. **📱 React DnD Touch Backend**: Touch interaction support
2. **🔄 React DnD Multi Backend**: Input method switching
3. **🎨 Material-UI Responsive**: Mobile-first design utilities

### Development Dependencies
1. **🏗️ Vite**: Fast build tool and dev server
2. **📝 TypeScript**: Type safety and better DX
3. **🧪 ESLint**: Code quality and consistency
4. **🎨 Prettier**: Code formatting

---

## 🚀 Deployment Process
1. **Build Configuration**:
   - Vite with relative asset paths
   - TypeScript compilation
   - Asset optimization
   - Mobile-specific optimizations

2. **GitHub Pages Setup**:
   - Automated deploy script
   - Dependency management
   - Branch synchronization
   - Asset path handling

3. **CI/CD**:
   - Automated deployment via `deploy.sh`
   - Dependency installation
   - Build validation
   - Asset verification
   - Branch synchronization

4. **Mobile Testing**:
   - Touch interaction validation
   - Responsive design verification
   - Performance monitoring
   - Battery usage optimization
