import { test, expect } from '@playwright/test';

test('New Case button works on port 3003', async ({ page }) => {
  // Use port 3003 (correct dev server)
  await page.goto('http://localhost:3003/investigations');
  await page.waitForLoadState('networkidle');
  
  console.log('Page loaded, looking for button...');
  
  // List all buttons
  const buttons = await page.locator('button').all();
  console.log('Buttons found:', buttons.length);
  for (const btn of buttons) {
    const text = await btn.textContent();
    console.log('  Button text:', text?.trim());
  }
  
  // Click New Case
  const newCaseBtn = page.locator('button', { hasText: /New Case/i });
  await expect(newCaseBtn).toBeVisible({ timeout: 10000 });
  console.log('Found New Case button, clicking...');
  await newCaseBtn.click();
  
  // Wait for modal
  await page.waitForTimeout(1500);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/new-case-modal-3003.png', fullPage: true });
  
  // Check for modal with more flexible matching
  const modalTitle = page.locator('h2', { hasText: /Create New Case/i });
  const isVisible = await modalTitle.isVisible().catch(() => false);
  
  console.log('Modal visible:', isVisible);
  
  if (!isVisible) {
    // Check what's on the page
    const pageText = await page.locator('body').textContent();
    console.log('Page text contains "Create":', pageText?.includes('Create'));
    console.log('Page text contains "Case":', pageText?.includes('Case'));
  }
  
  expect(isVisible).toBe(true);
});
