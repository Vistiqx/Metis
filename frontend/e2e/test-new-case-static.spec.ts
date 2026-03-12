import { test, expect } from '@playwright/test';

test('New Case button works on static build (port 3005)', async ({ page }) => {
  await page.goto('http://192.168.239.197:3005/investigations');
  await page.waitForLoadState('networkidle');
  
  // Click New Case
  const newCaseBtn = page.locator('button:has-text("New Case")');
  await expect(newCaseBtn).toBeVisible();
  await newCaseBtn.click();
  
  // Wait for modal
  await page.waitForTimeout(1000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/new-case-static.png', fullPage: true });
  
  // Check for modal
  const modal = page.locator('text=/Create New Case/i');
  await expect(modal).toBeVisible();
  
  console.log('✅ New Case modal opened successfully!');
});
