import { test, expect } from '@playwright/test';

test('print all words', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/syntax-sprint');

  const words = await page.locator(".text-element").allInnerTexts()
  for (const word of words) {
    await page.locator("input").fill(word)
    await page.locator("input").fill(" ")
  }

  await expect(page.locator(".result-text")).not.toHaveText("Your result: 0 programming WPM");
  await expect(page.locator(".result-text")).toContainText("programming WPM");
  await expect(page.locator(".result-text")).toContainText("Your result:");
});

test('print zero words', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/syntax-sprint');

  const words = await page.locator(".text-element").allInnerTexts()
  for (const word of words) {
    await page.locator("input").fill(" ")
  }

  await expect(page.locator(".result-text")).toHaveText("Your result: 0 programming WPM");
});
