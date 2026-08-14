---
name: central-thai-food
description: Validate and generate อาหารภาคกลาง (Central Thai Food) content. Use when working with central-Thai recipes, menus, or pages that must follow mild-to-medium flavour, coconut-milk-forward, and balanced-sweetness rules.
---

Audit or generate content for **อาหารภาคกลาง** (Central Thai Food) in `$ARGUMENTS` (or the current file if empty).

## Category Rules

อาหารภาคกลาง must satisfy **all** of the following:

1. **รสกลาง (Balanced, gentle flavour)** — spice level must be `NON_SPICY`, `MILD`, or `MEDIUM`. `HOT` or above is a violation; central Thai dishes are not intensely spicy and lean slightly sweet.
2. **เน้นกะทิ (Coconut-milk forward)** — curries and soups should use coconut milk as a primary base. Dishes without coconut milk must have a clear mild-flavour rationale (e.g., แกงจืด = clear broth soup).
3. **รสหวานนำ (Subtle sweetness)** — palm sugar or coconut milk sweetness should be perceptible; not sharply sour or fiery.
4. **Dual-language metadata** — every recipe must expose `titleTh` / `titleEn` and `descriptionTh` / `descriptionEn`.

## Reference Menus (อาหารภาคกลาง)

| titleTh | titleEn | spiceLevel |
|---|---|---|
| แกงเขียวหวาน | Green Curry | MEDIUM |
| พะแนงหมู | Pork Panang Curry | MILD |
| ต้มข่าไก่ | Chicken Galangal Coconut Soup | MILD |
| แกงจืด | Clear Broth Soup | NON_SPICY |
| มัสมั่นไก่ | Chicken Massaman Curry | MILD |
| ฉู่ฉี่กุ้ง | Choo Chee Prawns | MEDIUM |
| แกงเผ็ดเป็ดย่าง | Roast Duck Red Curry | MEDIUM |

## Cooking Method Guidelines (วิธีทำ)

- **แกงเขียวหวาน** — ผัดเครื่องแกงเขียวหวานกับกะทิหัว ใส่ไก่/เนื้อ ใส่กะทิหาง ปรุงด้วยน้ำปลา น้ำตาลปี๊บ ใส่มะเขือเปราะ ใบมะกรูด พริกชี้ฟ้าแดง
- **พะแนงหมู** — ผัดเครื่องแกงพะแนงกับกะทิหัวจนหอม ใส่หมู ใส่กะทิหาง ปรุงด้วยน้ำปลา น้ำตาลปี๊บ โรยใบมะกรูดซอย
- **ต้มข่าไก่** — ต้มน้ำกับข่า ตะไคร้ ใบมะกรูด ใส่กะทิ ไก่ เห็ด ปรุงด้วยน้ำปลา น้ำมะนาว พริก (ใส่น้อย)
- **แกงจืด** — ต้มน้ำซุป ใส่เต้าหู้ หมูสับ วุ้นเส้น ผักบุ้ง ปรุงด้วยซีอิ๊วขาว เกลือ ไม่ใส่พริก

## Image Specification

Each menu item must include an `imageUrl` string pointing to a real food photograph sourced from Wikimedia Commons (`upload.wikimedia.org`).

- Use `next/image` with `fill` and `objectFit: 'cover'` inside a `position: relative` container of fixed height (200px)
- Set `sizes` for responsive hints: `"(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"`
- `alt` must equal `titleEn` — never empty
- `upload.wikimedia.org` must be present in `next.config.mjs` under `images.remotePatterns`
- No hardcoded pixel dimensions on the `<img>` tag; use `fill` + CSS
- Source images via the Wikipedia REST API: `https://en.wikipedia.org/api/rest_v1/page/summary/{dish_name}` returns `thumbnail.source` with a verified Wikimedia Commons URL

Reference image URLs used:
- แกงเขียวหวาน: `.../Thai_green_chicken_curry_and_roti.jpg/330px-...`
- พะแนงหมู: `.../Panang_curry_%2842943883862%29.jpg/330px-...`
- ต้มข่าไก่: `.../Flickr_preppybyday_4711943668--Tom_kha_gai.jpg/330px-...`
- แกงจืด: `.../5-Minute_Egg_Drop_Soup-5_%2832079790121%29.jpg/330px-...`
- มัสมั่นไก่: `.../Kaeng_matsaman_kai.JPG/330px-...`

## Violations to Flag

- `spiceLevel` set to `HOT` or `THAI_HOT` — must be `MEDIUM` or below
- Curries that omit กะทิ (coconut milk) without clear rationale
- Missing `titleTh` / `titleEn` or `descriptionTh` / `descriptionEn` fields
- Intensely sour or fermented-flavour profiles (those belong to อีสาน cuisine, not ภาคกลาง)

After the audit, list every violation. If none, confirm the content is อาหารภาคกลาง-compliant.
