---
name: quick-commands
description: Show available dev commands or run a specific one for the Thai Cooking app monorepo. Use when the user asks about npm scripts, how to start the dev server, run tests, lint, build, or wants to execute a dev command.
---

The user wants help with npm/dev commands for this Thai Cooking monorepo. Use `$ARGUMENTS` to determine intent:

- If `$ARGUMENTS` is empty, list all available commands grouped by scope (Monorepo, Frontend, Backend) with a short description of each.
- If `$ARGUMENTS` matches a command keyword (e.g. "dev", "test", "lint", "e2e", "build"), run the appropriate command and stream the output.

## Available Commands

**Monorepo (run from root):**
- `npm run dev` — Start both Next.js (port 3000) and NestJS (port 4000) concurrently
- `npm run build` — Type-check and build all packages
- `npm run lint` — Run ESLint across all projects

**Frontend (`/apps/web`):**
- `npm run dev` — Next.js dev server on http://localhost:3000
- `npm run test` — Jest unit tests for components and hooks
- `npm run test:e2e` — Playwright E2E tests (headless)
- `npm run test:e2e:ui` — Playwright with interactive UI Mode

**Backend (`/apps/api`):**
- `npm run start:dev` — NestJS with hot reload on http://localhost:4000
- `npm run test` — Jest unit tests
- `npm run test:e2e` — NestJS integration tests (`jest --config ./test/jest-e2e.json`)

When running a command, tell the user which directory it runs from before executing.
