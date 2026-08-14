---
name: code-conventions
description: Review code against Thai Cooking app project conventions and flag violations. Use when writing new code, reviewing a file, or checking type safety, frontend structure, MUI usage, or NestJS backend patterns.
---

Review the code provided in `$ARGUMENTS` (or the current file if no argument given) against this project's conventions. Report each violation with file path, line number, and a one-line fix instruction.

## Type Safety

- No `any` — all component props, API params, and DB entities must be explicitly typed
- Request/Response DTOs and Enums must be shared via `@repo/shared` — never duplicate types between frontend and backend
- NestJS validation must use `class-validator` + `class-transformer`
- Next.js forms must validate with `zod` or `yup` + `react-hook-form` matching backend schemas

## Frontend (Next.js + MUI)

**File structure:**
- Pages → `app/`
- Reusable UI → `components/ui/`
- Feature components → `components/features/<feature>/`
- Hooks → `hooks/`

**Server vs. Client Components:**
- Default to Server Components (RSC) for recipe pages
- Use `"use client"` only when MUI event handlers or browser interactivity is needed

**MUI Styling:**
- Use `sx` prop or `styled()` with theme tokens (`theme.palette`, `theme.spacing`)
- No hardcoded hex colors or raw pixel values — always reference the MUI theme
- SSR Emotion setup must be maintained in the App Router layout (prevents FOUC)

## Backend (NestJS)

- Group by domain module: `RecipesModule`, `IngredientsModule`, `CategoriesModule`, etc.
- Controllers are thin: only routing, validation, and response shaping — business logic belongs in Services
- `ValidationPipe({ transform: true, whitelist: true })` must be active globally

After the review, output a summary: how many violations found, grouped by category.
