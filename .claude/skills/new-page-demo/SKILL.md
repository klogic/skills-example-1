---
name: new-page-demo
description: Generate a new Thai food category page from scratch. Use when the user asks to create or regenerate a food category page (e.g. "สร้างหน้าอาหารอีสาน", "generate isan food page", "สร้าง page อาหารอีสาน"). Produces the Next.js page file, dish data, and index card entry — all compliant with project UI and domain rules.
---

Generate a complete Thai food category page based on `$ARGUMENTS` (e.g. "isan food", "อาหารอีสาน").

Follow every step below in order. Do not skip sections.

---

## Step 1 — Domain Rules for the Category

Apply the correct rules for the requested category. For **อาหารอีสาน** specifically:

| Rule | Requirement |
|---|---|
| Spice level | `HOT` or `THAI_HOT` only — never MILD/MEDIUM |
| ปลาร้า / น้ำปลาร้า | Required in ตำ, ลาบ, อ่อม, แจ่ว families |
| ข้าวคั่ว | Required in ลาบ and ก้อย families |
| กะทิ | Forbidden — อีสานไม่ใช้กะทิ |
| สมุนไพรสด | ผักชีลาว, ต้นหอม, ใบสะระแหน่, ข่าอ่อน, ตะไคร้ must appear |
| Souring agent | มะนาว (lime) — not tamarind |
| Dual-language | `titleTh`/`titleEn`, `descriptionTh`/`descriptionEn` required |

---

## Step 2 — Reference Dish Data (อาหารอีสาน)

Use this exact data. Do not invent new dishes or change spice levels.

```ts
const ISAN_FOOD_ITEMS: IsanFoodItem[] = [
  {
    id: 'isan-1',
    titleTh: 'ส้มตำปลาร้า',
    titleEn: 'Som Tum with Fermented Fish',
    descriptionTh: 'มะละกอซอยโขลกกับกระเทียม พริก น้ำปลาร้าต้มสุก มะนาว น้ำตาลปี๊บ ถั่วฝักยาว มะเขือเทศ รสเปรี้ยวเผ็ดเค็มจัดจ้านแบบอีสานแท้ เสิร์ฟกับข้าวเหนียว',
    descriptionEn: 'Shredded green papaya pounded with garlic, chillies, fermented fish sauce, lime, palm sugar, long beans and tomatoes. Fiercely tangy, hot and salty — the definitive Isan dish.',
    spiceLevel: 'THAI_HOT',
    mainIngredient: 'มะละกอ / น้ำปลาร้า (Papaya · Fermented Fish Sauce)',
    servings: 2,
    imageUrl: '/images/food/somtum.jpg',
  },
  {
    id: 'isan-2',
    titleTh: 'ลาบหมู',
    titleEn: 'Spicy Minced Pork Salad',
    descriptionTh: 'หมูสับสดคลุกกับข้าวคั่วบดหยาบ น้ำปลาร้า น้ำมะนาว พริกป่น ผักชีลาว ใบสะระแหน่ ต้นหอม ข่าอ่อนซอย รสเผ็ดเปรี้ยวหอมกลิ่นสมุนไพรสด',
    descriptionEn: 'Fresh minced pork tossed with toasted rice powder, fermented fish sauce, lime juice, dried chilli, dill, fresh mint, spring onion and young galangal. Bold, herby and fiery.',
    spiceLevel: 'HOT',
    mainIngredient: 'หมูสับ / ข้าวคั่ว (Minced Pork · Toasted Rice Powder)',
    servings: 2,
    imageUrl: '/images/food/ลาบเป็ด.jpg',
  },
  {
    id: 'isan-3',
    titleTh: 'อ่อมหมู',
    titleEn: 'Spicy Pork Stew with Herbs',
    descriptionTh: 'หมูต้มกับเครื่องสมุนไพร ตะไคร้ ข่า ใบมะกรูด ปรุงด้วยน้ำปลาร้า ใส่ผักหวาน ใบแมงลัก ผักชีลาว ต้มจนผักสุกนุ่มหอม รสเผ็ดจัดเครื่องสมุนไพรครบ',
    descriptionEn: 'Pork simmered in a fragrant herb broth of lemongrass, galangal and kaffir lime, seasoned with fermented fish sauce and finished with sweet leaf, lemon basil and dill.',
    spiceLevel: 'HOT',
    mainIngredient: 'หมู / น้ำปลาร้า (Pork · Fermented Fish Sauce)',
    servings: 3,
    imageUrl: '/images/food/aommoo.jpg',
  },
  {
    id: 'isan-4',
    titleTh: 'แจ่วบอง',
    titleEn: 'Roasted Chilli Fermented Fish Dip',
    descriptionTh: 'พริกแห้ง หอมแดง กระเทียมย่างไฟโขลกรวมกับน้ำปลาร้าต้มสุก น้ำมะนาว น้ำตาลปี๊บ รสเผ็ดร้อนจัดหอมกลิ่นย่าง เสิร์ฟกับผักสดและข้าวเหนียว',
    descriptionEn: 'Charred dried chillies, shallots and garlic pounded with boiled fermented fish sauce, lime and palm sugar. An intensely smoky, fiery dip — the backbone of the Isan table.',
    spiceLevel: 'THAI_HOT',
    mainIngredient: 'พริกแห้ง / น้ำปลาร้า (Dried Chilli · Fermented Fish Sauce)',
    servings: 4,
    imageUrl: '/images/food/แจ่วบอง.jpg',
  },
  {
    id: 'isan-5',
    titleTh: 'ก้อยกุ้ง',
    titleEn: 'Spicy Raw Shrimp Salad',
    descriptionTh: 'กุ้งสดคลุกกับข้าวคั่ว น้ำมะนาว พริกป่น ต้นหอม ผักชีลาว ใบสะระแหน่ ตะไคร้ซอย รสเปรี้ยวเผ็ดจัด สมุนไพรหอมตัดกลิ่นคาว',
    descriptionEn: 'Fresh raw shrimp tossed with toasted rice powder, lime juice, dried chilli flakes, spring onion, dill, mint and sliced lemongrass. Sharp, fiery and deeply aromatic.',
    spiceLevel: 'THAI_HOT',
    mainIngredient: 'กุ้งสด / ข้าวคั่ว (Fresh Shrimp · Toasted Rice Powder)',
    servings: 2,
    imageUrl: '/images/food/ก้อยกุ้ง.jpg',
  },
  {
    id: 'isan-6',
    titleTh: 'ซุปหน่อไม้',
    titleEn: 'Spicy Bamboo Shoot Soup',
    descriptionTh: 'หน่อไม้ต้มสุกหั่นชิ้น ต้มกับน้ำปลาร้า ตะไคร้ ใบมะกรูด พริกสด ผักชีลาว ต้นหอม รสเผ็ดเปรี้ยวกลิ่นหน่อไม้หอม เสิร์ฟร้อน',
    descriptionEn: 'Sliced boiled bamboo shoots simmered in a broth seasoned with fermented fish sauce, lemongrass, kaffir lime leaf, fresh chillies, dill and spring onion. Hot, punchy and fragrant.',
    spiceLevel: 'HOT',
    mainIngredient: 'หน่อไม้ / น้ำปลาร้า (Bamboo Shoot · Fermented Fish Sauce)',
    servings: 3,
    imageUrl: '/images/food/ซุปหน่อไม้.jpg',
  },
  {
    id: 'isan-7',
    titleTh: 'ลาบเป็ด',
    titleEn: 'Spicy Minced Duck Salad',
    descriptionTh: 'เป็ดสับละเอียดคลุกกับข้าวคั่วบดหยาบ น้ำปลาร้า น้ำมะนาว พริกป่นจัด ผักชีลาว ใบสะระแหน่ ต้นหอม เครื่องในเป็ดเพิ่มรสชาติเข้มข้น',
    descriptionEn: 'Finely minced duck with toasted rice powder, fermented fish sauce, lime, heavy chilli flakes, dill, mint and spring onion. Richer and bolder than pork larb — a true Isan specialty.',
    spiceLevel: 'THAI_HOT',
    mainIngredient: 'เป็ดสับ / ข้าวคั่ว (Minced Duck · Toasted Rice Powder)',
    servings: 2,
    imageUrl: '/images/food/ลาบเป็ด.jpg',
  },
];
```

**Image files** (already in `apps/web/public/images/food/`):
- `somtum.jpg` — ส้มตำปลาร้า
- `aommoo.jpg` — อ่อมหมู
- `แจ่วบอง.jpg` — แจ่วบอง
- `ก้อยกุ้ง.jpg` — ก้อยกุ้ง
- `ซุปหน่อไม้.jpg` — ซุปหน่อไม้
- `ลาบเป็ด.jpg` — ลาบเป็ด + ลาบหมู (shared placeholder)

Thai-character filenames are fine — Next.js serves them correctly.

---

## Step 3 — Page File

**Create** `apps/web/src/app/isan-food/page.tsx` mirroring the wild-food page structure exactly.

Key structure:
```tsx
'use client' // not needed — this is a server component
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import type { SpiceLevel } from '@repo/shared';
import SpiceLevelBadge from '@/components/ui/SpiceLevelBadge';
```

### Page header
```tsx
<Box sx={{ bgcolor: 'grey.900', minHeight: '100vh' }}>
  <Box sx={{ px: { xs: 3, md: 6 }, pt: { xs: 6, md: 8 }, pb: 5 }}>
    {/* Gold eyebrow */}
    <Typography sx={{ color: 'secondary.main', letterSpacing: 6, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', mb: 2 }}>
      ✦ &nbsp; Northeastern Thai &nbsp; ✦
    </Typography>
    {/* Thai h3 title */}
    <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.1 }}>
      อาหารอีสาน
    </Typography>
    {/* EN h5 subtitle */}
    <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, mt: 0.5, mb: 3 }}>
      Northeastern Thai Food
    </Typography>
    {/* Gold rule */}
    <Box sx={{ width: 48, height: 3, bgcolor: 'secondary.main', borderRadius: 1, mb: 3 }} />
    {/* Description */}
    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mb: 3 }}>
      อาหารอีสานขึ้นชื่อเรื่องรสชาติจัดจ้าน เผ็ดร้อน เปรี้ยวนำ เค็มลึก ใช้ปลาร้าเป็นฐานอูมามิ และสมุนไพรสดเป็นเอกลักษณ์
    </Typography>
    {/* Chips */}
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Chip label="รสจัด" color="error" size="small" />
      <Chip label="ปลาร้า" size="small" variant="outlined" sx={{ borderColor: 'secondary.main', color: 'secondary.main' }} />
      <Chip label="ไม่ใช้กะทิ" size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }} />
      <Chip label="สมุนไพรสด" size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }} />
    </Box>
  </Box>
```

### Menu grid + card pattern
```tsx
  <Box sx={{ px: { xs: 2, md: 4 }, pb: { xs: 6, md: 10 } }}>
    <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
      {ISAN_FOOD_ITEMS.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card sx={{
            position: 'relative', height: 340, overflow: 'hidden', borderRadius: 2,
            bgcolor: 'grey.800',
            transition: 'transform 0.35s ease, box-shadow 0.35s ease',
            '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 },
            '&:hover .menu-img': { transform: 'scale(1.06)' },
          }}>
            <Box className="menu-img" sx={{ position: 'absolute', inset: 0, transition: 'transform 0.45s ease' }}>
              <Image src={item.imageUrl} alt={item.titleEn} fill style={{ objectFit: 'cover' }}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
            </Box>
            <Box sx={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)' }} />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5 }}>
              <Box sx={{ mb: 1 }}><SpiceLevelBadge spiceLevel={item.spiceLevel} /></Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}>{item.titleEn}</Typography>
              <Typography variant="body2" sx={{ color: 'secondary.main', mt: 0.25 }}>{item.titleTh}</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mt: 1,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.descriptionEn}
              </Typography>
              <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{item.mainIngredient}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{item.servings} servings</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
</Box>
```

---

## Step 4 — Index Page Integration

In `apps/web/src/app/page.tsx`, add to the `CATEGORY_CARDS` array:

```ts
{
  href: '/isan-food',
  category: 'Northeastern Thai',
  labelEn: 'Isan Food',
  labelTh: 'อาหารอีสาน',
  imageUrl: '/images/food/card-larb.jpg',
},
```

Also update the Grid column width from `md={4}` to `md={3}` so all 4 category cards fit in one row:
```tsx
<Grid item xs={12} sm={6} md={3} key={card.href}>
```

---

## Step 5 — Compliance Check

Before finishing, verify:
- [ ] Every dish has `spiceLevel: 'HOT'` or `'THAI_HOT'`
- [ ] ตำ/ลาบ/อ่อม/แจ่ว dishes include ปลาร้า in descriptionTh
- [ ] ลาบ/ก้อย dishes include ข้าวคั่ว in mainIngredient
- [ ] No กะทิ in any dish
- [ ] All 7 imageUrl paths point to files in `public/images/food/`
- [ ] Index card added and grid uses `md={3}`
