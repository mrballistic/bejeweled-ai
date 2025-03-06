# Tech Context: Bejeweled Clone with AI Mode

## 🛠️ Technologies Used
1. **⚛️ Frontend Framework**: React 18+
2. **🎨 UI Library**: Material-UI (MUI)
3. **📦 State Management**: React Context
4. **🖱️ Drag-and-Drop**: React DnD with custom drag layer
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
  "gsap": "^3.x",
  "vite": "^6.x",
  "@vitejs/plugin-react": "^4.x"
}
```

### 🛠️ Environment
- 🌐 Node.js v16+ and npm v7+
- 🖥️ Modern web browsers with ES6+ support
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

## ⚙️ Technical Constraints
1. 🌐 Browser Compatibility:
   - Modern browsers with ES6+ support
   - Touch device support for drag-and-drop
2. ⚡ Performance:
   - Smooth animations at 60fps
   - Efficient match detection for large cascades
3. 🎨 Design:
   - Responsive layout for all screen sizes
   - Dark/light theme support
   - Accessible color contrasts

---

## 🔗 Dependencies

### Core Dependencies
1. **⚛️ React**: UI framework with hooks and context
2. **🎨 Material-UI**: Theming and styled components
3. **🖱️ React DnD**: Drag-and-drop with custom preview
4. **✨ GSAP**: Advanced animations and transitions
5. **🎨 Emotion**: CSS-in-JS for MUI styling

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

2. **GitHub Pages Setup**:
   - Custom deploy script
   - Orphan branch approach
   - Asset path handling

3. **CI/CD**:
   - Manual deployment via `deploy.sh`
   - Build validation
   - Asset verification
