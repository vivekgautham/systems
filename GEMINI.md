# Systems Catalog — Project Guidelines

## Overview
A fast, responsive catalog and reference application for open source infrastructure systems, distributed databases, message brokers, container runtimes, and compute frameworks.

## Tech Stack
- **Framework & Bundler**: React 18, Vite, TypeScript
- **UI & Styling**: Material UI (MUI v7), Emotion, JetBrains Mono font, Dark glassmorphic aesthetic
- **State & Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7 (`HashRouter` for GitHub Pages compatibility)

## Key Project Structure
- `src/types/system.ts` — TypeScript interfaces for catalog entries (`SystemItem`, `SystemCategory`).
- `src/data/systems.json` — Static catalog dataset containing metadata, architecture notes, and features.
- `src/api/systemsApi.ts` — React Query hooks (`useSystemsData`, `useSystemDetail`).
- `src/pages/` — `SystemListPage` (filtering & search) and `SystemDetailPage` (deep dive).
- `src/theme/theme.ts` — Centralized dark mode MUI theme configuration.

## Development & Verification Commands
- `npm run dev`: Launch local development server.
- `npm run build`: Typecheck (`tsc`) and compile Vite production bundle.
- `npm run lint`: Run ESLint checks.
- `npm run format`: Format source files with Prettier.

## Contribution & Commit Rules
- **Commit Messages**: Enforced by commitlint (`commitlint.config.cjs`). Must begin with a capital letter and end with a period (e.g., `Add new database entries to systems catalog.`).
- **Pre-commit Hooks**: Keep pre-commit checks clean (`pre-commit run --all-files`).
