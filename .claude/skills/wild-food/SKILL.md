---
name: wild-food
description: Validate and generate อาหารป่า (Wild/Forest Thai Food) content. Use when working with wild-food recipes, menus, or pages that must follow bold-flavour and foraged-ingredient rules.
---

Audit or generate content for **อาหารป่า** (Wild/Forest Thai Food) in `$ARGUMENTS` (or the current file if empty).

## Category Rules

อาหารป่า must satisfy **all** of the following:

1. **รสจัด (Bold, intense flavour)** — every dish must have spice level `HOT` or `THAI_HOT`. `MEDIUM` or below is a violation.
2. **วัตถุดิบจากป่า (Foraged/wild ingredients)** — primary proteins and produce must come from forest or wild sources. Acceptable examples: หมูป่า (wild boar), กบ/เขียด (frog), ไก่บ้าน (free-range village chicken), เห็ดป่า (wild mushrooms), ผักหวานป่า (wild sweetleaf), มะกอกป่า (wild olive), หน่อไม้ (bamboo shoots). Farm-raised supermarket proteins without a "ป่า/บ้าน" qualifier are a violation.
3. **Dual-language metadata** — every recipe must expose `titleTh` / `titleEn` and `descriptionTh` / `descriptionEn`.

## Reference Menus (อาหารป่า)

| titleTh | titleEn | spiceLevel |
|---|---|---|
| ผัดเผ็ดหมูป่า | Spicy Stir-fried Wild Boar | HOT |
| กบทอดกระเทียม | Garlic Fried Frog | HOT |
| แกงป่าไก่บ้าน | Village Chicken Forest Curry | THAI_HOT |
| ต้มยำเห็ดป่า | Wild Mushroom Tom Yum | HOT |
| ยำผักหวานป่า | Wild Sweetleaf Salad | HOT |
| แกงเผ็ดหมูป่า | Spicy Wild Boar Curry | THAI_HOT |
| ลาบหมูป่า | Wild Boar Larb | THAI_HOT |

## Cooking Method Guidelines (วิธีทำ)

- **ผัดเผ็ดหมูป่า** — ผัดน้ำมันร้อน ใส่เครื่องแกงป่า ใส่หมูป่าหั่น ผัดให้สุก ปรุงด้วยน้ำปลา น้ำตาลปี๊บ ใบมะกรูด พริกชี้ฟ้า
- **กบทอดกระเทียม** — หมักกบด้วยกระเทียม ซีอิ๊วขาว พริกไทย ทอดน้ำมันร้อนจนกรอบ เสิร์ฟกับซอสพริก
- **แกงป่าไก่บ้าน** — ต้มกะทิ (ไม่ใส่กะทิ) ใส่เครื่องแกงป่า ใส่ไก่บ้าน ใส่หน่อไม้ ใบมะกรูด พริก ปรุงรสด้วยน้ำปลา

## Image Specification

Each menu item must include an `imageUrl` string pointing to a real food photograph sourced from Wikimedia Commons (`upload.wikimedia.org`).

- Use `next/image` with `fill` and `objectFit: 'cover'` inside a `position: relative` container of fixed height (200px)
- Set `sizes` for responsive hints: `"(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"`
- `alt` must equal `titleEn` — never empty
- `upload.wikimedia.org` must be present in `next.config.mjs` under `images.remotePatterns`
- No hardcoded pixel dimensions on the `<img>` tag; use `fill` + CSS
- Source images via the Wikipedia REST API: `https://en.wikipedia.org/api/rest_v1/page/summary/{dish_name}` returns `thumbnail.source` with a verified Wikimedia Commons URL

Reference image URLs used:
- ผัดเผ็ดหมูป่า: `.../Basil_fried_crispy_pork_with_rice_-_Chiang_Mai_-_2017-07-11_%28002%29.jpg/330px-...`
- กบทอดกระเทียม: `.../2012_Froschschenkel_anagoria.JPG/330px-...`
- แกงป่าไก่บ้าน: `.../Kaeng_phak_wan.JPG/330px-...`
- ต้มยำเห็ดป่า: `.../Tom_yam_kung_maenam.jpg/330px-...`
- ลาบหมูป่า: `.../LaoFood_LarbNeua.JPG/330px-...`

## Violations to Flag

- `spiceLevel` set to `NON_SPICY`, `MILD`, or `MEDIUM` — must be `HOT` or `THAI_HOT`
- Ingredients that are standard farmed proteins without wild/forest qualifier
- Missing `titleTh` / `titleEn` or `descriptionTh` / `descriptionEn` fields
- กะทิ (coconut milk) used as a base — อาหารป่า curries do NOT use coconut milk

After the audit, list every violation. If none, confirm the content is อาหารป่า-compliant.
