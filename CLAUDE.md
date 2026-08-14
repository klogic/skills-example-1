# Project Overview: Thai Cooking Web Application

An end-to-end type-safe web application for exploring, searching, and managing authentic Thai food recipes.

- **Frontend:** Next.js (App Router), TypeScript, MUI (Material UI)
- **Backend:** NestJS, TypeScript, TypeORM / Prisma (Node.js)
- **Testing:** Jest (Unit / Integration), Playwright (End-to-End)
- **Architecture:** Full-stack Monorepo / Decoupled Client-Server with Shared DTOs for strict end-to-end type safety.

---

## Important Rules

- **No `any` types** — strictly type everything across frontend, backend, and shared DTOs.
- **Ask before assuming** — if requirements are unclear, ask for clarification instead of making assumptions.
- **Shared DTOs** — always use `@repo/shared` for Request/Response types between frontend and backend.
- **No hardcoded values** — no hex colors, raw pixels, or hardcoded API URLs; use theme tokens and env vars.

---

## Reference Docs

Detailed guidelines are in [`.claude/commands/`](.claude/commands/):

- [Quick Commands](.claude/commands/quick-commands.md) — dev, build, test commands for monorepo, frontend, and backend
- [Code Conventions](.claude/commands/code-conventions.md) — type safety, frontend (Next.js + MUI), backend (NestJS)
- [Domain Rules](.claude/commands/domain-rules.md) — Thai/English dual-language, ingredient units, spice level enum
- [Testing Guidelines](.claude/commands/testing-guidelines.md) — Jest unit tests, Playwright E2E tests
- [Common Pitfalls](.claude/commands/common-pitfalls.md) — MUI hydration, Thai fonts, endpoint hardcoding
