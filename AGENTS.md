# Repository Guidelines

## Project Structure & Module Organization
The Vite-powered React app lives in `src/`. Keep UI elements in `src/components/`, typed hooks in `src/hooks/`, reusable logic in `src/utils/`, and shared interfaces in `src/types/`. `main.tsx` wires the app into `index.html`, while global styles stay in `src/style.css`. Static assets, favicons, and manifest files belong in `public/`. Use the `memory-bank/` notes as living design context—update them when architectural decisions shift.

## Build, Test, and Development Commands
Use `npm install` after dependency changes. `npm run dev` launches the hot-reload dev server on port 5173 by default. Run `npm run build` for a production bundle (`dist/`) and type-checking (`tsc`). `npm run preview` spins up the built output for smoke testing. Deploy via `./deploy.sh`, which rebuilds, force-pushes `gh-pages`, and restores your working branch—only run with a clean git status.

## Coding Style & Naming Conventions
Write TypeScript-first React components using functional patterns. Follow 2-space indentation, PascalCase for components (`BoardGrid.tsx`), camelCase for utilities (`calculateChainScore`), and prefix hooks with `use`. Co-locate component-specific helpers beside the component; cross-cutting helpers stay in `src/utils/`. Favor explicit return types on exported functions and use the definitions in `src/types/` before adding new ones. Keep styling in CSS or MUI’s `sx` prop—avoid inline style objects unless dynamic.

## Testing Guidelines
No automated tests are checked in yet. Introduce Vitest + React Testing Library when adding sizable features; mirror files as `*.test.ts(x)` beside the subject or in a `__tests__/` folder. Prioritize board resolution logic, scoring helpers, and custom hooks for coverage. Whenever the AI logic changes, add scenario-based tests using fixed board states to guard regressions. Run the future `npm run test` (document in `package.json`) locally and in CI before merges.

## Commit & Pull Request Guidelines
Commits in history use concise, lowercase subjects (e.g., `add chain score hook`). Keep them imperative and focused. For PRs, include: purpose-oriented title, summary of functional impact, test plan (`npm run dev`, `npm run build`, etc.), linked issues, and screenshots or GIFs for UI tweaks. Flag deployment-impacting changes and update `tech-brief.md` or `memory-bank/` files when workflows or architecture shift.
