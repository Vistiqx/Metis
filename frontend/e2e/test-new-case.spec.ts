import { test, expect } from '@playwright/test';

test('Click New Case and verify modal opens', async ({ page }) => {
  // Navigate to Investigations page directly
  await page.goto('http://localhost:3001/investigations');
  await page.waitForLoadState('networkidle');
  
  // Take screenshot before clicking
  await page.screenshot({ path: 'test-results/before-click.png' });
  
  // Click the "New Case" button
  const newCaseBtn = page.locator('button:has-text("New Case")');
  await expect(newCaseBtn).toBeVisible();
  
  console.log('Button found, clicking...');
  await newCaseBtn.click();
  
  // Wait a moment for modal to appear
  await page.waitForTimeout(1000);
  
  // Take screenshot after clicking
  await page.screenshot({ path: 'test-results/after-click.png', fullPage: true });
  
  // Check if modal/dialog appeared by looking for the title
  const modal = page.locator('text=/Create New Case/i');
  const isModalVisible = await modal.isVisible().catch(() => false);
  
  console.log('Modal visible:', isModalVisible);
  
  if (isModalVisible) {
    console.log('✅ SUCCESS: Modal opened!');
  } else {
    console.log('❌ FAILED: Modal did not open');
    // List all buttons to debug
    const buttons = await page.locator('button').all();
    console.log('Buttons found:', buttons.length);
    for (const btn of buttons) {
      const text = await btn.textContent();
      console.log('  -', text?.trim());
    }
  }
  
  expect(isModalVisible).toBe(true);
});
