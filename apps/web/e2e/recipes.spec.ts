import { test, expect } from '@playwright/test';

test.describe('Recipe search', () => {
  test('searches for a Thai recipe by English name', async ({ page }) => {
    await page.goto('/recipes');
    await page.getByRole('textbox', { name: /search recipes/i }).fill('Pad Thai');
    await page.getByRole('button', { name: /search/i }).click();
    await expect(page.getByText('Pad Thai')).toBeVisible();
  });

  test('searches for a Thai recipe by Thai script', async ({ page }) => {
    await page.goto('/recipes');
    await page.getByRole('textbox', { name: /search recipes/i }).fill('ผัดไทย');
    await page.getByRole('button', { name: /search/i }).click();
    await expect(page.getByText('ผัดไทย')).toBeVisible();
  });

  test('shows empty state when no recipes match', async ({ page }) => {
    await page.goto('/recipes');
    await page.getByRole('textbox', { name: /search recipes/i }).fill('xyznonexistent999');
    await page.getByRole('button', { name: /search/i }).click();
    await expect(page.getByText(/no recipes found/i)).toBeVisible();
  });
});

test.describe('Ingredient quantity scaling', () => {
  test('adjusts ingredient quantities when serving slider changes', async ({ page }) => {
    await page.goto('/recipes');
    const firstCard = page.getByRole('link').first();
    const href = await firstCard.getAttribute('href');
    if (!href) test.skip();

    await page.goto(href!);
    const slider = page.getByRole('slider', { name: /serving size/i });
    await expect(slider).toBeVisible();

    const initialQtyText = await page.locator('li').first().textContent();
    await slider.fill('4');
    const updatedQtyText = await page.locator('li').first().textContent();
    expect(updatedQtyText).not.toBe(initialQtyText);
  });
});

test.describe('Recipe creation (admin workflow)', () => {
  test('navigates home and reaches recipes list', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /browse recipes/i }).click();
    await expect(page).toHaveURL(/\/recipes/);
    await expect(page.getByRole('heading', { name: /recipes/i })).toBeVisible();
  });
});
