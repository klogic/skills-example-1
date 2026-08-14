---
name: domain-rules
description: Validate code against Thai Cooking app domain rules. Use when working with recipe entities, DTOs, ingredient models, spice levels, or any user-facing content that must support Thai and English dual-language.
---

Audit the code in `$ARGUMENTS` (or the current file if no argument given) for compliance with Thai Cooking app domain rules. Flag any violations with file, line, and a concrete fix.

## Dual-Language Metadata

Every user-facing string for recipe titles, descriptions, and ingredients must support both Thai (TH) and English (EN). Check for:
- Fields that only store a single locale (e.g., plain `title: string` instead of `titleTh` / `titleEn` or a locale map)
- Hardcoded English-only strings in response DTOs or DB entities that represent recipe content

## Ingredient Units

Measurements must use standardized units only: `grams`, `milliliters`, `pieces`, `cups`, `tablespoons`. Check for:
- Non-standard or ambiguous unit strings
- Ingredient structures that don't support live quantity scaling (i.e., quantity must be a numeric field, not embedded in a string)

## Spice Level

Spice level must use the project enum — no freeform strings. Valid values:

```
NON_SPICY | MILD | MEDIUM | HOT | THAI_HOT
```

Check for:
- Raw string literals used instead of the enum
- Missing spice level field on recipe entities or DTOs

After the audit, list every violation found. If none, confirm the code is domain-compliant.
