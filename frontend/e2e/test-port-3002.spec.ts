import { test, expect } from '@playwright/test';

test('New Case button opens modal on port 3002', async ({ page }) => {
  // Use port 3002 to avoid Docker
  await page.goto('http://localhost:3002/investigations');
  await page.waitForLoadState('networkidle');
  
  // Click New Case
  const newCaseBtn = page.locator('button:has-text("New Case")');
  await expect(newCaseBtn).toBeVisible();
  await newCaseBtn.click();
  
  // Wait for modal
  await page.waitForTimeout(1000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/new-case-3002.png', fullPage: true });
  
  // Check for modal
  const modal = page.locator('text=/Create New Case/i');
  await expect(modal).toBeVisible();
});
