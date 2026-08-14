---
name: common-pitfalls
description: Scan code for common Thai Cooking app pitfalls: MUI hydration mismatches, missing Thai font assets, and hardcoded API endpoints. Use when reviewing frontend code, setting up layouts, or before committing changes that touch rendering or API calls.
---

Scan the code in `$ARGUMENTS` (or the full project if empty) for these known pitfalls. Report each finding with file path, line number, severity, and a one-line fix.

## 1. MUI Hydration Mismatch

Look for server-rendered values that could diverge from client state:
- Dates or timestamps rendered without consistent locale/timezone handling
- Dynamic ingredient quantities or unit labels rendered in a Server Component without hydration guards
- Theme tokens or MUI component props that differ between SSR and client render

**Fix:** Ensure dynamic values are either deferred to the client (`"use client"`) or stabilized before rendering.

## 2. Missing Thai Font Assets

Check `app/layout.tsx` (or equivalent root layout) for:
- Missing `next/font/google` import for a Thai-compatible font (`Sarabun`, `Prompt`, or `Kanit`)
- Font loaded but not applied to the `<body>` or root element
- Any Thai text rendered in a component that doesn't inherit a Thai-capable font

**Fix:** Add `next/font/google` with a font that covers Thai glyphs and apply it globally.

## 3. Hardcoded API Endpoints

Search for hardcoded URLs or port numbers pointing to the backend:
- Literal `http://localhost:4000` or similar strings in frontend code
- Any `fetch()` or `axios` call with a hardcoded base URL instead of `process.env.NEXT_PUBLIC_API_URL`

**Fix:** Replace with `process.env.NEXT_PUBLIC_API_URL` and ensure the env var is set in `.env.local` and deployment config.

After scanning, summarize: pitfalls found (with locations), pitfalls not found (confirmed safe).
