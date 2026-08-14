---
name: testing-guidelines
description: Write or audit tests following project Jest and Playwright conventions for the Thai Cooking app. Use when writing new tests, checking test coverage, auditing existing specs, or setting up Playwright E2E scenarios.
---

If `$ARGUMENTS` names a source file or feature, write tests for it following the guidelines below.
If `$ARGUMENTS` is empty or says "audit", scan existing test files and report gaps or convention violations.

## Jest Unit Tests

- Spec files sit adjacent to source: `recipe.service.spec.ts`, `IngredientList.spec.tsx`
- Mock all external API calls and DB connections — never hit a real database in unit tests
- Required edge cases to cover:
  - Thai text search (UTF-8 correctness, empty results)
  - Ingredient unit calculations (scaling by serving size)
  - Empty / null inputs for recipe fields

## Playwright E2E Tests

- E2E files go in `/e2e` or `tests/e2e/`
- Must cover these core user journeys:
  1. Search for a Thai recipe by name — test both English ("Pad Thai") and Thai script ("ผัดไทย")
  2. Adjust serving size dynamically on the recipe detail page and verify ingredient quantities update
  3. Recipe creation / admin workflow
- Always run Playwright headlessly (`npm run test:e2e`) — not UI mode — before marking a feature done

## Output format

When writing new tests, create the file, explain what each test block covers, and note any mocks that need to be set up. When auditing, list files checked, gaps found, and conventions violated.
