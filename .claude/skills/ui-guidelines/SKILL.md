---
name: ui-guidelines
description: Validate or generate UI for Thai Cooking app pages. Use when building new pages, reviewing visual design, or checking that dark restaurant theme, typography hierarchy, card patterns, and hover effects are applied consistently.
---

Audit or generate UI code in `$ARGUMENTS` (or the current file if empty) against the Thai Cooking app visual design system.

## Theme Tokens

Always reference MUI theme tokens — never hardcode hex colors.

| Token | Role |
|---|---|
| `primary.main` | Deep red — primary CTA, destructive accents |
| `secondary.main` | Golden amber — labels, accents, decorative rules |
| `grey.900` | Page background (dark restaurant theme) |
| `grey.800` | Card / surface background |
| `white` | Primary text on dark |
| `rgba(255,255,255,0.7)` | Body text on dark |
| `rgba(255,255,255,0.5)` | Subtitle / secondary text on dark |
| `rgba(255,255,255,0.4)` | Caption / meta text on dark |

## Page Background

All category and menu pages use `bgcolor: 'grey.900'` and `minHeight: '100vh'` on the root `Box`. Never use a light background for these pages.

## Page Header Pattern

Every category page (อาหารป่า, อาหารภาคกลาง, etc.) must open with this header structure:

```tsx
<Box sx={{ px: { xs: 3, md: 6 }, pt: { xs: 6, md: 8 }, pb: 5 }}>
  {/* Gold eyebrow label */}
  <Typography sx={{ color: 'secondary.main', letterSpacing: 6, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', mb: 2 }}>
    ✦ &nbsp; Category Name &nbsp; ✦
  </Typography>

  {/* Thai title */}
  <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: 700 }}>
    ชื่อหมวด
  </Typography>

  {/* English subtitle */}
  <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, mt: 0.5, mb: 3 }}>
    English Category Name
  </Typography>

  {/* Gold rule — always 48px wide, 3px tall */}
  <Box sx={{ width: 48, height: 3, bgcolor: 'secondary.main', borderRadius: 1, mb: 3 }} />

  {/* Description */}
  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mb: 3 }}>
    ...
  </Typography>

  {/* Category chips */}
  <Box sx={{ display: 'flex', gap: 1 }}>
    ...chips...
  </Box>
</Box>
```

Violations: missing gold eyebrow label, missing gold rule, light-colored header background.

## Menu Card Pattern

Every food item card uses image-fill with gradient overlay — **no separate CardContent below the image**.

```tsx
<Card sx={{
  position: 'relative',
  height: 340,
  overflow: 'hidden',
  borderRadius: 2,
  bgcolor: 'grey.800',
  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
  '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 },
  '&:hover .menu-img': { transform: 'scale(1.06)' },
}}>
  {/* Image wrapper with zoom transition */}
  <Box className="menu-img" sx={{ position: 'absolute', inset: 0, transition: 'transform 0.45s ease' }}>
    <Image src={item.imageUrl} alt={item.titleEn} fill style={{ objectFit: 'cover' }} sizes="..." />
  </Box>

  {/* Bottom-to-top gradient overlay */}
  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)' }} />

  {/* Text content at bottom */}
  <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5 }}>
    <SpiceLevelBadge spiceLevel={item.spiceLevel} />
    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>{item.titleEn}</Typography>
    <Typography variant="body2" sx={{ color: 'secondary.main' }}>{item.titleTh}</Typography>
    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', WebkitLineClamp: 2, ... }}>{item.descriptionEn}</Typography>
    {/* meta row: ingredient + servings */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{item.mainIngredient}</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{item.servings} servings</Typography>
    </Box>
  </Box>
</Card>
```

Violations: CardContent below the image, light card background, missing hover lift effect, missing image zoom on hover.

## Chip Styling on Dark Background

On dark pages, outlined chips must use theme-aware border and text colors — never rely on MUI defaults which assume a light background:

```tsx
// Gold-outlined chip
<Chip variant="outlined" sx={{ borderColor: 'secondary.main', color: 'secondary.main' }} />

// Muted-outlined chip
<Chip variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }} />
```

## Typography Hierarchy on Dark Pages

| Level | Variant | Color |
|---|---|---|
| Eyebrow | `Typography` custom | `secondary.main`, `letterSpacing: 6`, `0.7rem`, uppercase |
| Page title (TH) | `h3` | `white`, `fontWeight: 700` |
| Page subtitle (EN) | `h5` | `rgba(255,255,255,0.5)`, `fontWeight: 300` |
| Body / description | `body1` | `rgba(255,255,255,0.7)` |
| Card title (EN) | `h6` | `white`, `fontWeight: 700` |
| Card title (TH) | `body2` | `secondary.main` |
| Card description | `body2` | `rgba(255,255,255,0.65)` |
| Caption / meta | custom | `rgba(255,255,255,0.4)`, `0.7rem` |

## Hero Page (Home)

The home page (`/`) has a full-viewport hero with `next/image` background + dark gradient overlay:
- Gradient: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)`
- Category cards: `height: { xs: 260, md: 380 }`, same card pattern as menu cards but taller

## Images

All food images are stored locally in `public/images/food/`. Use `next/image` with `fill` + `objectFit: 'cover'`. No external image domains are configured — never add remote URLs directly to `imageUrl` fields; download and place in `public/images/food/` first.

After the audit, list every violation. If none, confirm the file is UI-compliant.
