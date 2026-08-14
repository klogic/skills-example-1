# Thai Cooking App | แอปอาหารไทย

An end-to-end type-safe web application for exploring, searching, and managing authentic Thai food recipes.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), MUI v5, TypeScript |
| Backend | NestJS, TypeORM, SQLite, TypeScript |
| Shared types | `@repo/shared` (DTOs, enums) |
| Testing | Jest (unit), Playwright (E2E) |

## Project Structure

```
thai-cooking-app/
├── apps/
│   ├── api/          # NestJS backend — port 4000
│   └── web/          # Next.js frontend — port 3000
└── packages/
    └── shared/       # @repo/shared — DTOs, SpiceLevel & IngredientUnit enums
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Configure environment

```bash
# Frontend
cp apps/web/.env.local.example apps/web/.env.local

# Backend
cp apps/api/.env.example apps/api/.env
```

### Run in development

```bash
npm run dev
```

Starts both servers concurrently:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## Available Commands

| Command | Scope | Description |
|---|---|---|
| `npm run dev` | Root | Start frontend + backend concurrently |
| `npm run build` | Root | Type-check and build all packages |
| `npm run lint` | Root | ESLint across all projects |
| `npm run test` | `apps/api` or `apps/web` | Jest unit tests |
| `npm run test:e2e` | `apps/web` | Playwright E2E (headless) |
| `npm run test:e2e:ui` | `apps/web` | Playwright with interactive UI |
| `npm run start:dev` | `apps/api` | NestJS with hot reload |

## Domain Rules

- **Dual language** — all recipe titles, descriptions, and ingredient names have both `En` and `Th` fields
- **Spice level** — enum values: `NON_SPICY | MILD | MEDIUM | HOT | THAI_HOT`
- **Ingredient units** — standardized: `grams | milliliters | pieces | cups | tablespoons`
- **Type safety** — no `any`, all request/response types from `@repo/shared`

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/recipes` | List/search recipes (supports `query`, `spiceLevel`, `categoryId`, `page`, `limit`) |
| GET | `/recipes/:id` | Get recipe detail |
| POST | `/recipes` | Create recipe |
| PUT | `/recipes/:id` | Update recipe |
| DELETE | `/recipes/:id` | Delete recipe |
| GET | `/categories` | List categories |
| POST | `/categories` | Create category |
| PUT | `/categories/:id` | Update category |
| DELETE | `/categories/:id` | Delete category |
