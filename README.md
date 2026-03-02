# Bejeweled.ai

A polished dark-arcade match-three puzzle game built with React 19, featuring SVG jewels, GSAP animations, and an LLM-powered AI mode (coming soon).

**Live:** [mrballistic.github.io/bejeweled-ai/](https://mrballistic.github.io/bejeweled-ai/)

---

## Features

### Player Mode
- **7 distinct SVG jewel shapes** — diamond, ruby, emerald, sapphire, topaz, amethyst, citrine — each with radial gradients and drop shadows
- **Click, drag, or swipe** to swap adjacent jewels (react-dnd multi-backend for mouse + touch)
- **Animated game loop** — GSAP-powered swap slides, match flash/fade, and cascade drops with bounce easing
- **Chain reaction scoring** — cascades multiply points exponentially (2x, 4x, 8x... up to 32x)
- **Combo multipliers** — simultaneous matches in a cascade step boost score (1.5x–2.5x)
- **Hint system** — brute-force solver highlights a valid move for 3 seconds
- **Deadlock detection** — auto-reshuffles when no moves remain

### AI Mode (Phase 6 — not yet implemented)
- Anthropic API integration for autonomous play
- Adjustable speed controls
- Fallback to deterministic hint solver on invalid AI moves

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 (functional components + hooks) |
| Language | TypeScript (strict mode) |
| Build | Vite (`base: './'` for GitHub Pages) |
| UI | MUI 6 — dark theme, `sx` prop styling |
| Animation | GSAP 3 — promise-wrapped tweens, timeline cascades |
| Drag & Drop | react-dnd + react-dnd-multi-backend |
| Testing | Vitest + React Testing Library |
| Fonts | Orbitron (display) + Rajdhani (body) via Google Fonts |

---

## Architecture

```
App
├── ThemeProvider (MUI dark theme — #1A1A2E background)
│   └── ScoreProvider (score, chain, combo via React Context)
│       └── DndProvider (MultiBackend — mouse + touch)
│           ├── Header (title, score display, mode toggle)
│           ├── GameBoard (owns board state via useState + useRef)
│           │   └── BoardGrid (CSS Grid → 64 Jewel components)
│           │       └── Jewel (SVG shape + click/drag/touch handlers)
│           ├── GameControls (hint + new game)
│           └── CustomDragLayer
```

**Game loop:** `handleSwap → findMatches → animateMatch → removeMatches → handleCascade → animateCascade → recurse`

All async — each step awaits animation completion. `isProcessing` ref lock prevents race conditions.

---

## Development

```bash
npm install          # install dependencies
npm run dev          # vite dev server (port 5173)
npm run build        # typecheck + production build
npm test             # vitest in watch mode
npm run test:run     # vitest single run
npm run preview      # serve dist/ locally
```

### Environment

Copy `.env.example` to `.env` and add your Anthropic API key (needed for AI mode only):

```bash
cp .env.example .env
```

---

## Scoring

| Match | Base Points |
|-------|------------|
| 3-in-a-row | 100 |
| 4-in-a-row | 200 |
| 5-in-a-row | 500 |

**Chain multiplier:** 1x → 2x → 4x → 8x → 16x → 32x (cap) per cascade depth

**Combo multiplier:** 1.5x (2 simultaneous), 2x (3), 2.5x (4+)

---

## Tests

39 tests across 7 test files covering:
- Game types and constants
- Board initializer (no pre-existing matches)
- Match detection (3/4/5-in-a-row, T-shapes, L-shapes, deduplication)
- Cascade handler (gravity, new jewel spawning)
- Hint finder (valid move detection, deadlock detection)
- Scoring math (base points, chain/combo multipliers)
- Adjacency checks

---

## Deployment

```bash
./deploy.sh    # builds and force-pushes to gh-pages branch
```

---

## License

MIT — see [LICENSE](./LICENSE) for details.
